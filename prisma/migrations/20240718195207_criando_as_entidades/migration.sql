-- CreateTable
CREATE TABLE "about" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "about_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "especiality" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(45) NOT NULL,
    "description" VARCHAR(500),
    "img_path" VARCHAR(200),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "especiality_pkey" PRIMARY KEY ("id","user_id")
);

-- CreateTable
CREATE TABLE "maintitle" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "maintitle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mensage" (
    "id" SERIAL NOT NULL,
    "costumer_name" VARCHAR(50) NOT NULL,
    "costumer_email" VARCHAR(150) NOT NULL,
    "costumer_contact" VARCHAR(45),
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "seen" BOOLEAN DEFAULT false,

    CONSTRAINT "mensage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" SERIAL NOT NULL,
    "file_path" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "contact" VARCHAR(45),
    "image_path" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "fk_About_User1_idx" ON "about"("user_id");

-- CreateIndex
CREATE INDEX "fk_Especiality_User1_idx" ON "especiality"("user_id");

-- CreateIndex
CREATE INDEX "fk_Maintitle_User1_idx" ON "maintitle"("user_id");

-- CreateIndex
CREATE INDEX "fk_Project_user_idx" ON "project"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "email_UNIQUE" ON "user"("email");

-- AddForeignKey
ALTER TABLE "about" ADD CONSTRAINT "fk_About_User1" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "especiality" ADD CONSTRAINT "fk_Especiality_User1" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "maintitle" ADD CONSTRAINT "fk_Maintitle_User1" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "fk_Project_User" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
