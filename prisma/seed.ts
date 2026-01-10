import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CSV_PATH = path.join(__dirname, 'dataset', 'diem_thi_thpt_2024.csv');
const BATCH_SIZE = 15000; // 10k students
const SCORE_BATCH_SIZE = 80000; // chunk score

interface StudentRow {
  registrationNumber: string;
}
interface ScoreRow {
  registrationNumber: string;
  subjectId: number;
  value: number;
  languageCodeId: number | null;
}

// ===== Helper: insert batch =====
async function insertBatch(students: StudentRow[], scores: ScoreRow[]) {
  await prisma.student.createMany({ data: students, skipDuplicates: true });

  const studentIds = await prisma.student.findMany({
    where: {
      registrationNumber: { in: students.map((s) => s.registrationNumber) },
    },
    select: { id: true, registrationNumber: true },
  });
  const regToId: Record<string, number> = {};
  studentIds.forEach((s) => (regToId[s.registrationNumber] = s.id));

  for (let i = 0; i < scores.length; i += SCORE_BATCH_SIZE) {
    const chunk = scores.slice(i, i + SCORE_BATCH_SIZE).map((s) => ({
      studentId: regToId[s.registrationNumber],
      subjectId: s.subjectId,
      value: s.value,
      languageCodeId: s.languageCodeId,
    }));
    await prisma.score.createMany({ data: chunk, skipDuplicates: true });
  }
}

// ===== Main =====
async function main() {
  // Seed subjects
  const subjects = [
    { code: 'toan', name: 'Toán' },
    { code: 'ngu_van', name: 'Ngữ văn' },
    { code: 'ngoai_ngu', name: 'Ngoại ngữ' },
    { code: 'vat_li', name: 'Vật lý' },
    { code: 'hoa_hoc', name: 'Hóa học' },
    { code: 'sinh_hoc', name: 'Sinh học' },
    { code: 'lich_su', name: 'Lịch sử' },
    { code: 'dia_li', name: 'Địa lý' },
    { code: 'gdcd', name: 'GDCD' },
  ];
  await Promise.all(
    subjects.map((s) =>
      prisma.subject.upsert({ where: { code: s.code }, update: {}, create: s }),
    ),
  );
  console.log('Subjects ');

  // Seed languages
  const languageCodes = ['N1', 'N2', 'N3', 'N4', 'N5', 'N6', 'N7'];
  await Promise.all(
    languageCodes.map((code) =>
      prisma.languageCode.upsert({
        where: { code },
        update: {},
        create: { code },
      }),
    ),
  );
  console.log('Languages ');

  // Build maps
  const subjectsMap: Record<string, number> = {};
  (await prisma.subject.findMany()).forEach(
    (s) => (subjectsMap[s.code] = s.id),
  );
  const langMap: Record<string, number> = {};
  (await prisma.languageCode.findMany()).forEach(
    (l) => (langMap[l.code] = l.id),
  );

  // Stream CSV + batch
  const studentsBatch: StudentRow[] = [];
  const scoresBatch: ScoreRow[] = [];
  const batchQueue: { students: StudentRow[]; scores: ScoreRow[] }[] = [];
  const stream = fs.createReadStream(CSV_PATH).pipe(csv());

  console.log('Start seeding...');

  for await (const row of stream) {
    const {
      sbd,
      toan,
      ngu_van,
      ngoai_ngu,
      vat_li,
      hoa_hoc,
      sinh_hoc,
      lich_su,
      dia_li,
      gdcd,
      ma_ngoai_ngu,
    } = row;
    studentsBatch.push({ registrationNumber: sbd });

    const scoresData: Record<string, string> = {
      toan,
      ngu_van,
      ngoai_ngu,
      vat_li,
      hoa_hoc,
      sinh_hoc,
      lich_su,
      dia_li,
      gdcd,
    };
    for (const [sub, val] of Object.entries(scoresData)) {
      const value = val ? parseFloat(val) : null;
      if (value !== null && subjectsMap[sub]) {
        scoresBatch.push({
          registrationNumber: sbd,
          subjectId: subjectsMap[sub],
          value,
          languageCodeId: ma_ngoai_ngu ? langMap[ma_ngoai_ngu] : null,
        });
      }
    }

    if (studentsBatch.length >= BATCH_SIZE) {
      batchQueue.push({
        students: [...studentsBatch],
        scores: [...scoresBatch],
      });
      studentsBatch.length = 0;
      scoresBatch.length = 0;
    }
  }
  if (studentsBatch.length > 0)
    batchQueue.push({ students: [...studentsBatch], scores: [...scoresBatch] });

  console.log(`Total batches: ${batchQueue.length}`);

  for (const [i, batch] of batchQueue.entries()) {
    console.log(`Inserting batch ${i + 1}/${batchQueue.length} ...`);
    await insertBatch(batch.students, batch.scores);
  }

  console.log('All Students + Scores ');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
