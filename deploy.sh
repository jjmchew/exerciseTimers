#!/bin/bash

npm run build
cd /var/www/80087355.xyz/html
sudo rm -rf assets

cd ~/apps/exerciseTimers/dist
sudo cp -r * /var/www/80087355.xyz/html
