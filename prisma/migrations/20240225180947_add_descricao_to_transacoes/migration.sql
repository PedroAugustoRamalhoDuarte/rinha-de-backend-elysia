/*
  Warnings:

  - Added the required column `descricao` to the `Transacoes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transacoes" ADD COLUMN     "descricao" TEXT NOT NULL;
