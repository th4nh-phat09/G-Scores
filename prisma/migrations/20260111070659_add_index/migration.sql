-- DropIndex
DROP INDEX "Score_subjectId_idx";

-- DropIndex
DROP INDEX "Student_registrationNumber_idx";

-- DropIndex
DROP INDEX "Subject_code_idx";

-- CreateIndex
CREATE INDEX "Score_subjectId_value_idx" ON "Score"("subjectId", "value");
