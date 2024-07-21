/*
  Warnings:

  - You are about to drop the `Especiality` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Especiality" DROP CONSTRAINT "fk_Especiality_User1";

-- DropTable
DROP TABLE "Especiality";

-- CreateTable
CREATE TABLE "Hability" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(45) NOT NULL,
    "description" VARCHAR(500),
    "image_url" TEXT,
    "image_key" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Hability_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "fk_Hability_User1_idx" ON "Hability"("user_id");

-- AddForeignKey
ALTER TABLE "Hability" ADD CONSTRAINT "fk_hability_User1" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
