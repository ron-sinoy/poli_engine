#!/bin/bash
cd /home/ronsinoy/playground/gb/frontend
rm -rf temp-vite-app
npx -y create-vite@latest temp-vite-app --template react --no-interactive
cp -r temp-vite-app/* ./
cp temp-vite-app/.gitignore ./
rm -rf temp-vite-app
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
