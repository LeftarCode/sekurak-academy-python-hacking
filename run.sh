#!/bin/bash
if [ "$EUID" -ne 0 ]
	then echo "Uruchom skrypt jako root (np. poprzez sudo)."
	exit
fi

git stash && git pull
chown -R $SUDO_USER:$SUDO_USER .

cd react-frontend

npm install
npm run build

docker-compose up --build