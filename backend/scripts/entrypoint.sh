#!/bin/sh
echo "Running seed..."
node dist/database/seed.js
echo "Starting server..."
node dist/main