/*
  Warnings:

  - You are about to drop the column `job_id` on the `analysis_results` table. All the data in the column will be lost.
  - Added the required column `job_description_id` to the `analysis_results` table without a default value. This is not possible if the table is not empty.
  - Made the column `password_hash` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "analysis_results" DROP CONSTRAINT "analysis_results_job_id_fkey";

-- DropIndex
DROP INDEX "job_descriptions_content_hash_key";

-- AlterTable
ALTER TABLE "analysis_results" DROP COLUMN "job_id",
ADD COLUMN     "analysis_version" VARCHAR(20),
ADD COLUMN     "industry" VARCHAR(50),
ADD COLUMN     "job_description_id" INTEGER NOT NULL,
ADD COLUMN     "job_description_text" TEXT,
ADD COLUMN     "score" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "uploads" ALTER COLUMN "processed_text" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "password_hash" SET NOT NULL,
ALTER COLUMN "first_name" DROP NOT NULL,
ALTER COLUMN "last_name" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Analysis" (
    "id" SERIAL NOT NULL,
    "job_id" INTEGER NOT NULL,
    "resume_text" TEXT NOT NULL,
    "analysis_data" JSONB NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Analysis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Analysis_user_id_idx" ON "Analysis"("user_id");

-- CreateIndex
CREATE INDEX "Analysis_job_id_idx" ON "Analysis"("job_id");

-- AddForeignKey
ALTER TABLE "analysis_results" ADD CONSTRAINT "analysis_results_job_description_id_fkey" FOREIGN KEY ("job_description_id") REFERENCES "job_descriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
