/*
  Warnings:

  - You are about to drop the column `file_path` on the `Project` table. All the data in the column will be lost.
  - Added the required column `title` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "file_path",
ADD COLUMN     "file_key" TEXT,
ADD COLUMN     "file_url" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;
