/*
  Warnings:

  - You are about to drop the column `currency` on the `MetalPrice` table. All the data in the column will be lost.
  - You are about to drop the column `fetchedAt` on the `MetalPrice` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerGram` on the `MetalPrice` table. All the data in the column will be lost.
  - Added the required column `percentChange` to the `MetalPrice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pricePerGramINR` to the `MetalPrice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pricePerOzUSD` to the `MetalPrice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usdInrRate` to the `MetalPrice` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "MetalPrice_metal_fetchedAt_idx";

-- AlterTable
ALTER TABLE "MetalPrice" DROP COLUMN "currency",
DROP COLUMN "fetchedAt",
DROP COLUMN "pricePerGram",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "percentChange" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "pricePerGramINR" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "pricePerOzUSD" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "usdInrRate" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "source" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "MetalPrice_metal_createdAt_idx" ON "MetalPrice"("metal", "createdAt");
