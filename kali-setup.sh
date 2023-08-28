#!/bin/bash
if [ "$EUID" -ne 0 ]
        then echo "Uruchom skrypt jako root (np. poprzez sudo)."
        exit
fi

sudo -u kali pip3 install requests Selenium PyCryptoDome pyDes Scapy

apt install -y jupyter-notebook code-oss
