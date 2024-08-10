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
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shopId" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ingredients" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "bzu" TEXT NOT NULL DEFAULT '',
    "price" TEXT NOT NULL,
    "discount" TEXT DEFAULT '0',
    "imagePath" TEXT NOT NULL,
    "isStopList" BOOLEAN NOT NULL DEFAULT false,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Product" ("category", "discount", "id", "imagePath", "ingredients", "isAvailable", "isStopList", "name", "price", "shopId", "weight") SELECT "category", "discount", "id", "imagePath", "ingredients", "isAvailable", "isStopList", "name", "price", "shopId", "weight" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
