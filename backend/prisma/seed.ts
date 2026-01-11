import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const STUDENT_BATCH_SIZE = 20000;
const SCORE_SUB_BATCH_SIZE = 80000;

const CSV_PATH = path.join(__dirname, 'dataset', 'diem_thi_thpt_2024.csv');

// Seed Subjects + LanguageCodes
async function seedStaticData() {
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

  for (const s of subjects) {
    await prisma.subject.upsert({
      where: { code: s.code },
      update: {},
      create: s,
    });
  }

  const languageCodes = ['N1', 'N2', 'N3', 'N4', 'N5', 'N6', 'N7'];
  for (const code of languageCodes) {
    await prisma.languageCode.upsert({
      where: { code },
      update: {},
      create: { code },
    });
  }

  console.log(' Static data seeded');
}

// Insert batch
async function insertBatch(
  students: { registrationNumber: string; languageCodeId: number | null }[],
  scores: { registrationNumber: string; subjectId: number; value: number }[],
) {
  // 1. insert students
  await prisma.student.createMany({
    data: students,
    skipDuplicates: true,
  });

  // 2. map registrationNumber -> studentId
  const studentRows = await prisma.student.findMany({
    where: {
      registrationNumber: {
        in: students.map((s) => s.registrationNumber),
      },
    },
    select: {
      id: true,
      registrationNumber: true,
    },
  });

  const regToId = new Map<string, number>();
  studentRows.forEach((s) => regToId.set(s.registrationNumber, s.id));

  // 3. insert scores (chia nhỏ để PG không chết)
  for (let i = 0; i < scores.length; i += SCORE_SUB_BATCH_SIZE) {
    const chunk = scores.slice(i, i + SCORE_SUB_BATCH_SIZE).map((s) => ({
      studentId: regToId.get(s.registrationNumber)!,
      subjectId: s.subjectId,
      value: s.value,
    }));

    await prisma.score.createMany({
      data: chunk,
      skipDuplicates: true,
    });
  }
}

async function main() {
  await seedStaticData();

  // load maps
  const subjects = await prisma.subject.findMany();
  const subjectMap = new Map(subjects.map((s) => [s.code, s.id]));

  const langs = await prisma.languageCode.findMany();
  const langMap = new Map(langs.map((l) => [l.code, l.id]));

  const studentsBatch: {
    registrationNumber: string;
    languageCodeId: number | null;
  }[] = [];

  const scoresBatch: {
    registrationNumber: string;
    subjectId: number;
    value: number;
  }[] = [];

  console.log('Start seeding CSV...');

  const stream = fs.createReadStream(CSV_PATH).pipe(csv());

  for await (const row of stream) {
    const sbd = row.sbd;
    const maNgoaiNgu = row.ma_ngoai_ngu;

    studentsBatch.push({
      registrationNumber: sbd,
      languageCodeId: maNgoaiNgu ? (langMap.get(maNgoaiNgu) ?? null) : null,
    });

    const scoreCols = [
      'toan',
      'ngu_van',
      'ngoai_ngu',
      'vat_li',
      'hoa_hoc',
      'sinh_hoc',
      'lich_su',
      'dia_li',
      'gdcd',
    ];

    for (const col of scoreCols) {
      if (row[col]) {
        scoresBatch.push({
          registrationNumber: sbd,
          subjectId: subjectMap.get(col)!,
          value: parseFloat(row[col]),
        });
      }
    }

    if (studentsBatch.length >= STUDENT_BATCH_SIZE) {
      await insertBatch([...studentsBatch], [...scoresBatch]);
      studentsBatch.length = 0;
      scoresBatch.length = 0;
      console.log('Inserted batch');
    }
  }

  if (studentsBatch.length > 0) {
    await insertBatch(studentsBatch, scoresBatch);
  }

  console.log(' SEED DONE');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
