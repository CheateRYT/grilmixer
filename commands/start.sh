#!/bin/bash


PROJECT_DIR=~/server/grilmixer-server


screen -dmS backend bash -c "cd $PROJECT_DIR && npm run start:prod && echo 'Сервер запущен'"


screen -dmS prisma bash -c "cd $PROJECT_DIR && npx prisma studio && echo 'Prisma ORM запущена'"


echo "Запущен сервер и Prisma ORM."