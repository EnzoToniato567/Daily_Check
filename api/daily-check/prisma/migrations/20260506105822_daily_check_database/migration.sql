-- CreateTable
CREATE TABLE `Tarefa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `data_inicio` DATETIME(3) NOT NULL,
    `data_termino` DATETIME(3) NOT NULL,
    `imagem` VARCHAR(191) NULL,
    `data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
