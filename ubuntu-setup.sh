#!/bin/bash
if [ "$EUID" -ne 0 ]
	then echo "Uruchom skrypt jako root (np. poprzez sudo)."
	exit
fi

apt-get update -y
apt-get install -y git npm ca-certificates curl gnupg

apt install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg

echo \
"deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
"$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
tee /etc/apt/sources.list.d/docker.list > /dev/null

apt-get update

apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-compose

git clone https://github.com/LeftarCode/sekurak-academy-python-hacking.git
chown -R $SUDO_USER:$SUDO_USER sekurak-academy-python-hacking

cd ./sekurak-academy-python-hacking
chmod +x run.sh

cd ./react-frontend

npm install
npm run build
