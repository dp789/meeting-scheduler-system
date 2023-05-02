#!/bin/bash
set -x

yarn

# purely for LOCAL setup.
export ENVIRONMENT_NAME=local
export NODE_ENV=local
npx sequelize db:drop
npx sequelize db:create
npx sequelize db:migrate
