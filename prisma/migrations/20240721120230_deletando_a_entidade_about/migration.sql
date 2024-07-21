/*
  Warnings:

  - You are about to drop the `About` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "About" DROP CONSTRAINT "fk_About_User1";

-- AlterTable
ALTER TABLE "Maintitle" ALTER COLUMN "title" SET DATA TYPE TEXT,
ALTER COLUMN "description" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "About";
