#!/bin/bash

npm run build
cd dist
sudo cp -r * /var/www/80087355.xyz/html
