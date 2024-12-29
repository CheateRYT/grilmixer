#!/bin/sh

SOURCE_DB="/root/server/grilmixer-server/prisma/db"
BACKUP_DIR="/root/backup"
DATE=$(date +%d_%m_%y)
BACKUP_FILE="db_$DATE.db"


cp "$SOURCE_DB" "$BACKUP_DIR/$BACKUP_FILE"

echo "Резервная копия базы данных сохранена как $BACKUP_DIR/$BACKUP_FILE"



