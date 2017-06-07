#!/bin/bash

if [ "$NODE_ENV" = "development" ]; then
  npm run dev
elif [ "$NODE_ENV" = "production" ]; then
  npm start
else
  # Remove it later
  npm start
fi
