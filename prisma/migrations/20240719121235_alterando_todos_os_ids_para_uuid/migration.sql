/*
  Warnings:

  - The primary key for the `about` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `mensage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `project` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "about" DROP CONSTRAINT "about_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "about_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "about_id_seq";

-- AlterTable
ALTER TABLE "mensage" DROP CONSTRAINT "mensage_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "mensage_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "mensage_id_seq";

-- AlterTable
ALTER TABLE "project" DROP CONSTRAINT "project_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "project_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "project_id_seq";
