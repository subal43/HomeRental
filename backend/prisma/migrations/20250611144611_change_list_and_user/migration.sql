/*
  Warnings:

  - You are about to drop the column `contact` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `owner` on the `Listing` table. All the data in the column will be lost.
  - Added the required column `bathrooms` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rooms` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Listing" DROP CONSTRAINT "Listing_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_listingId_fkey";

-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "contact",
DROP COLUMN "owner",
ADD COLUMN     "bathrooms" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "rooms" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "contact" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
