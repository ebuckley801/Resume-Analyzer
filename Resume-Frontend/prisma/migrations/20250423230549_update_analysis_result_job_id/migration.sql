/*
  Warnings:

  - You are about to drop the column `job_description_id` on the `analysis_results` table. All the data in the column will be lost.
  - Added the required column `job_id` to the `analysis_results` table without a default value. This is not possible if the table is not empty.

*/
-- Rename the column instead of dropping and adding
ALTER TABLE "analysis_results" RENAME COLUMN "job_description_id" TO "job_id";

-- Update the foreign key constraint
ALTER TABLE "analysis_results" DROP CONSTRAINT "analysis_results_job_description_id_fkey";
ALTER TABLE "analysis_results" ADD CONSTRAINT "analysis_results_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "job_descriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
