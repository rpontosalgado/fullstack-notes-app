#!/bin/sh
echo "Running migrations..."
node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d dist/database/data-source.js
echo "Running seed..."
node dist/database/seed.js
echo "Starting server..."
node dist/main