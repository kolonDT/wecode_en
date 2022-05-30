/*
  Warnings:

  - You are about to drop the column `progress` on the `progresses` table. All the data in the column will be lost.
  - Added the required column `driving_distance` to the `registered_cars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `progresses` DROP COLUMN `progress`;

-- AlterTable
ALTER TABLE `registered_cars` ADD COLUMN `driving_distance` INTEGER NOT NULL,
    MODIFY `lat` VARCHAR(191) NULL,
    MODIFY `lon` VARCHAR(191) NULL;
