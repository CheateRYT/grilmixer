-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "paymentType" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "shopId" INTEGER NOT NULL,
    "amount" TEXT NOT NULL,
    "personCount" INTEGER NOT NULL DEFAULT 1,
    "phoneNumber" TEXT NOT NULL,
    "deliveryAddress" TEXT,
    "email" TEXT,
    "clientName" TEXT NOT NULL,
    "createdTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedTime" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'Новый',
    "productsCount" TEXT NOT NULL
);
INSERT INTO "new_Order" ("amount", "clientName", "completedTime", "createdTime", "deliveryAddress", "email", "id", "ip", "paymentType", "phoneNumber", "productsCount", "shopId", "status", "type") SELECT "amount", "clientName", "completedTime", "createdTime", "deliveryAddress", "email", "id", "ip", "paymentType", "phoneNumber", "productsCount", "shopId", "status", "type" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
