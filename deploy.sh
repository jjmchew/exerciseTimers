#!/bin/bash
if [ -z "$1" ]; then
  echo "Please enter domain name as argument"
  exit 1
fi

npm run build
cd /var/www/$1/html
sudo rm -rf assets

cd ~/apps/exerciseTimers/dist
sudo cp -r * /var/www/$1/html
