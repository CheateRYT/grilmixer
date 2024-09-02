-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Admin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "login" TEXT NOT NULL,
    "password" TEXT,
    "token" TEXT NOT NULL
);
INSERT INTO "new_Admin" ("id", "login", "password", "token") SELECT "id", "login", "password", "token" FROM "Admin";
DROP TABLE "Admin";
ALTER TABLE "new_Admin" RENAME TO "Admin";
CREATE UNIQUE INDEX "Admin_login_key" ON "Admin"("login");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
