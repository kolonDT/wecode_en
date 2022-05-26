/*
  Warnings:

  - You are about to drop the column `price` on the `cars` table. All the data in the column will be lost.
  - You are about to drop the column `is_completed` on the `progresses` table. All the data in the column will be lost.
  - You are about to drop the column `more_info` on the `registered_cars` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[car_id_number]` on the table `cars` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[progress_id]` on the table `registered_cars` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `car_id_number` to the `cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_original` to the `cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_used` to the `cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `additional_info` to the `registered_cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lat` to the `registered_cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lon` to the `registered_cars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cars` DROP COLUMN `price`,
    ADD COLUMN `car_id_number` VARCHAR(191) NOT NULL,
    ADD COLUMN `price_original` INTEGER NOT NULL,
    ADD COLUMN `price_used` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `progresses` DROP COLUMN `is_completed`,
    ADD COLUMN `dealer_assigned` DATETIME(3) NULL,
    ADD COLUMN `dealer_consulting` DATETIME(3) NULL,
    ADD COLUMN `quote_requested` DATETIME(3) NULL,
    ADD COLUMN `selling_completed` DATETIME(3) NULL,
    ADD COLUMN `selling_requested` DATETIME(3) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL,
    MODIFY `is_new` INTEGER NOT NULL DEFAULT -1;

-- AlterTable
ALTER TABLE `registered_cars` DROP COLUMN `more_info`,
    ADD COLUMN `additional_info` LONGTEXT NOT NULL,
    ADD COLUMN `address_detail` VARCHAR(191) NULL,
    ADD COLUMN `lat` VARCHAR(191) NOT NULL,
    ADD COLUMN `lon` VARCHAR(191) NOT NULL,
    MODIFY `image` LONGTEXT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `cars_car_id_number_key` ON `cars`(`car_id_number`);

-- CreateIndex
CREATE UNIQUE INDEX `registered_cars_progress_id_key` ON `registered_cars`(`progress_id`);
