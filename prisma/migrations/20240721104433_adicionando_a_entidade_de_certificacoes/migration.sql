/*
  Warnings:

  - The primary key for the `Especiality` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Maintitle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `project` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "fk_Project_User";

-- AlterTable
ALTER TABLE "Especiality" DROP CONSTRAINT "Especiality_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Especiality_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Especiality_id_seq";

-- AlterTable
ALTER TABLE "Maintitle" DROP CONSTRAINT "Maintitle_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Maintitle_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Maintitle_id_seq";

-- DropTable
DROP TABLE "project";

-- CreateTable
CREATE TABLE "Certifications" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT,
    "file_url" TEXT,
    "file_key" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Certifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "file_path" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "fk_Certifications_user_idx" ON "Certifications"("user_id");

-- CreateIndex
CREATE INDEX "fk_Project_user_idx" ON "Project"("user_id");

-- AddForeignKey
ALTER TABLE "Certifications" ADD CONSTRAINT "Certifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "fk_Project_User" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
