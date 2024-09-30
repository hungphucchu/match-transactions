-- CreateTable
CREATE TABLE `Order` (
    `order_id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_uuid` VARCHAR(191) NOT NULL,
    `customerName` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `product` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,

    UNIQUE INDEX `Order_order_uuid_key`(`order_uuid`),
    PRIMARY KEY (`order_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `transaction_id` INTEGER NOT NULL AUTO_INCREMENT,
    `transaction_uuid` VARCHAR(191) NOT NULL,
    `customerName` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `order_id` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `product` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `transactionType` VARCHAR(191) NOT NULL,
    `transactionDate` DATETIME(3) NOT NULL,
    `transactionAmount` DOUBLE NOT NULL,

    UNIQUE INDEX `Transaction_transaction_uuid_key`(`transaction_uuid`),
    PRIMARY KEY (`transaction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order`(`order_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
