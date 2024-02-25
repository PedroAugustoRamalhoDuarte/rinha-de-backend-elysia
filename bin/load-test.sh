#!/bin/bash -e

docker-compose stop

docker-compose start db

npx prisma migrate reset

bun seed

docker-compose up -d --build

./bin/executar-teste-local.sh
