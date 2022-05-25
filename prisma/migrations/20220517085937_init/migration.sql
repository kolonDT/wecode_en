-- CreateTable
CREATE TABLE `cars` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `brand` VARCHAR(191) NOT NULL,
    `car_number` VARCHAR(191) NOT NULL,
    `model_name` VARCHAR(191) NOT NULL,
    `model_year` INTEGER NOT NULL,
    `driving_distance` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `fuel_id` INTEGER NOT NULL,
    `mission_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `cars_car_number_key`(`car_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fuels` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fuel_name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `missions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mission_name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `registered_cars` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `car_id` INTEGER NOT NULL,
    `progress_id` INTEGER NOT NULL,
    `more_info` LONGTEXT NOT NULL,
    `contact` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `registered_cars_car_id_key`(`car_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `registered_car_options` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reg_car_id` INTEGER NOT NULL,
    `option_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `options` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `option_name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `progresses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `progress` VARCHAR(191) NOT NULL,
    `is_completed` BOOLEAN NOT NULL DEFAULT false,
    `is_new` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cars` ADD CONSTRAINT `cars_fuel_id_fkey` FOREIGN KEY (`fuel_id`) REFERENCES `fuels`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cars` ADD CONSTRAINT `cars_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `missions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `registered_cars` ADD CONSTRAINT `registered_cars_car_id_fkey` FOREIGN KEY (`car_id`) REFERENCES `cars`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `registered_cars` ADD CONSTRAINT `registered_cars_progress_id_fkey` FOREIGN KEY (`progress_id`) REFERENCES `progresses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `registered_car_options` ADD CONSTRAINT `registered_car_options_reg_car_id_fkey` FOREIGN KEY (`reg_car_id`) REFERENCES `registered_cars`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `registered_car_options` ADD CONSTRAINT `registered_car_options_option_id_fkey` FOREIGN KEY (`option_id`) REFERENCES `options`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
