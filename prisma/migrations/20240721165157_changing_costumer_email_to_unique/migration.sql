/*
  Warnings:

  - A unique constraint covering the columns `[costumer_email]` on the table `Message` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "email_Unique" ON "Message"("costumer_email");
