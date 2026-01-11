export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data?: T;
}

export type ScoreLevel = "EXCELLENT" | "GOOD" | "AVERAGE" | "BELOW_AVERAGE";

export const SCORE_LEVELS = {
  EXCELLENT: "EXCELLENT",
  GOOD: "GOOD",
  AVERAGE: "AVERAGE",
  BELOW_AVERAGE: "BELOW_AVERAGE",
} as const;

export interface SubjectScoreDto {
  subjectCode: string;
  subjectName: string;
  value: number;
}

export interface StudentScoreDto {
  registrationNumber: string;
  languageCode: string | null;
  scores: SubjectScoreDto[];
}

export interface ScoreLevelStatsDto {
  level: ScoreLevel;
  description: string;
  count: number;
  percentage: number;
}

export interface SubjectScoreLevelStatsDto {
  subjectCode: string;
  subjectName: string;
  totalStudents: number;
  levels: ScoreLevelStatsDto[];
}

export interface SubjectScoreDetailDto {
  subjectCode: string;
  subjectName: string;
  score: number;
}

export interface Top10GroupAStudentDto {
  rank: number;
  registrationNumber: string;
  totalScore: number;
  scores: SubjectScoreDetailDto[];
}

export interface Top10GroupADto {
  students: Top10GroupAStudentDto[];
  total: number;
}

export interface DashboardStatsDto {
  totalStudents: number;
  totalSubjects: number;
}

export interface SubjectDto {
  code: string;
  name: string;
}

export interface SubjectListDto {
  subjects: SubjectDto[];
}
