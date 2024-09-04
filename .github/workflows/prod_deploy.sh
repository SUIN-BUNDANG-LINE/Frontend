#!/bin/sh
# ubuntu 권한으로 모든 명령어 실행
sudo -u ubuntu sh <<EOF
cd ~/Frontend
git checkout main
git pull
echo "$ENV_CONTENT" | base64 -d > .env.local
npm install
npm run build
pm2 start pm2.config.js
EOF