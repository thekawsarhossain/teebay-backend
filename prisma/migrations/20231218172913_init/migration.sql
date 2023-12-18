/*
  Warnings:

  - You are about to drop the column `category` on the `Product` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Categories" AS ENUM ('ELECTRONICS', 'FURNITURE', 'HOME_APPLIANCES', 'SPORTING_GOODS', 'OUTDOOR', 'TOYS');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "category",
ADD COLUMN     "categories" "Categories"[];

-- DropEnum
DROP TYPE "Category";
