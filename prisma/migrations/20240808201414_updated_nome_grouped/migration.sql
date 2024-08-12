/*
  Warnings:

  - You are about to drop the column `groupde` on the `event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `event` DROP COLUMN `groupde`,
    ADD COLUMN `grouped` BOOLEAN NOT NULL DEFAULT false;
