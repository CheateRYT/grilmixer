/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Admin_token_key" ON "Admin"("token");
