/*
  Warnings:

  - You are about to drop the column `img_path` on the `Especiality` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Especiality" DROP COLUMN "img_path",
ADD COLUMN     "image_key" TEXT,
ADD COLUMN     "image_url" TEXT;
