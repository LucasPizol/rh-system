/*
  Warnings:

  - You are about to drop the `historic` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "historic" DROP CONSTRAINT "historic_companyId_fkey";

-- DropForeignKey
ALTER TABLE "historic" DROP CONSTRAINT "historic_productId_fkey";

-- DropForeignKey
ALTER TABLE "historic" DROP CONSTRAINT "historic_userId_fkey";

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "type" INTEGER NOT NULL;

-- DropTable
DROP TABLE "historic";
