-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LanguageCode" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LanguageCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Score" (
    "id" SERIAL NOT NULL,
    "value" DOUBLE PRECISION,
    "studentId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "languageCodeId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_registrationNumber_key" ON "Student"("registrationNumber");

-- CreateIndex
CREATE INDEX "Student_registrationNumber_idx" ON "Student"("registrationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_code_key" ON "Subject"("code");

-- CreateIndex
CREATE INDEX "Subject_code_idx" ON "Subject"("code");

-- CreateIndex
CREATE UNIQUE INDEX "LanguageCode_code_key" ON "LanguageCode"("code");

-- CreateIndex
CREATE INDEX "Score_studentId_idx" ON "Score"("studentId");

-- CreateIndex
CREATE INDEX "Score_subjectId_idx" ON "Score"("subjectId");

-- CreateIndex
CREATE INDEX "Score_languageCodeId_idx" ON "Score"("languageCodeId");

-- CreateIndex
CREATE UNIQUE INDEX "Score_studentId_subjectId_key" ON "Score"("studentId", "subjectId");

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_languageCodeId_fkey" FOREIGN KEY ("languageCodeId") REFERENCES "LanguageCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddConstraint
ALTER TABLE "Score"
ADD CONSTRAINT score_value_range
CHECK (
  value IS NULL OR (value >= 0 AND value <= 10)
);
