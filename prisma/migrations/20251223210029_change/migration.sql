/*
  Warnings:

  - You are about to drop the column `traceId` on the `Trace` table. All the data in the column will be lost.
  - Added the required column `spanId` to the `Trace` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Trace" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "spanId" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Trace" ("duration", "id", "route", "service", "status", "timestamp") SELECT "duration", "id", "route", "service", "status", "timestamp" FROM "Trace";
DROP TABLE "Trace";
ALTER TABLE "new_Trace" RENAME TO "Trace";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
