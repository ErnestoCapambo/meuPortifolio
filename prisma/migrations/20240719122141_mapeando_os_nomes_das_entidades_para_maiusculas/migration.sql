/*
  Warnings:

  - You are about to drop the `about` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `especiality` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `maintitle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mensage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "about" DROP CONSTRAINT "fk_About_User1";

-- DropForeignKey
ALTER TABLE "especiality" DROP CONSTRAINT "fk_Especiality_User1";

-- DropForeignKey
ALTER TABLE "maintitle" DROP CONSTRAINT "fk_Maintitle_User1";

-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "fk_Project_User";

-- DropTable
DROP TABLE "about";

-- DropTable
DROP TABLE "especiality";

-- DropTable
DROP TABLE "maintitle";

-- DropTable
DROP TABLE "mensage";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "About" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Especiality" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(45) NOT NULL,
    "description" VARCHAR(500),
    "img_path" VARCHAR(200),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Especiality_pkey" PRIMARY KEY ("id","user_id")
);

-- CreateTable
CREATE TABLE "Maintitle" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Maintitle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "costumer_name" VARCHAR(50) NOT NULL,
    "costumer_email" VARCHAR(150) NOT NULL,
    "costumer_contact" VARCHAR(45),
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "seen" BOOLEAN DEFAULT false,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "contact" VARCHAR(45),
    "image_url" TEXT,
    "image_key" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "fk_About_User1_idx" ON "About"("user_id");

-- CreateIndex
CREATE INDEX "fk_Especiality_User1_idx" ON "Especiality"("user_id");

-- CreateIndex
CREATE INDEX "fk_Maintitle_User1_idx" ON "Maintitle"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "email_UNIQUE" ON "User"("email");

-- AddForeignKey
ALTER TABLE "About" ADD CONSTRAINT "fk_About_User1" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Especiality" ADD CONSTRAINT "fk_Especiality_User1" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Maintitle" ADD CONSTRAINT "fk_Maintitle_User1" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "fk_Project_User" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
