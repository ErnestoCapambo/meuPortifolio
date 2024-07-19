/*
  Warnings:

  - You are about to drop the column `image_path` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "image_path",
ADD COLUMN     "image_key" TEXT,
ADD COLUMN     "image_url" TEXT;
