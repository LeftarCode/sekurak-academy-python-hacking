# Czy Pythonem można hackować wszystko?
Repozytorium to zawiera niezbędny kod potrzebny do aktywnego uczestnictwa w szkoleniu organizowanym w ramach [Sekurak Academy](https://sekurak.academy/). Oprócz tego repozytorium zawiera kod, wraz z komentarzami i niezbędnymi notatki, który został napisany w trakcie samego szkolenia.

## Konfiguracja środowiska
A tej sekcji znajduje się krótka opisowa instrukcja w jaki sposób należy skonfigurować sobie środowisko, aby móc przetestować napisane exploity. W trakie szkolenie używaliśmy VirtualBox, ale jeżeli preferujesz alternatywne rozwiązanie to nic nie stoi na przeszkodzie.
### Ubuntu
- Ustawienia wirtualnej maszyny:
    - Karta sieciowa 1:
        - Tryb działania: `NAT`
        - Adresajca: `DHCP`
    - Karta sieciowa 2:
        - Tryb działania: `Sieć wewnątrzna`
        - Adresacja:
            - IP: 10.255.255.10/24
- Konfiguracja maszynu:
    1. Zainstalowanie niezbędnego oprogramowania:
    ```sh
    wget https://raw.githubusercontent.com/LeftarCode/sekurak-academy-python-hacking/main/ubuntu-setup.sh
    chmod +x ./ubuntu-setup.sh
    sudo ./ubuntu-setup.sh
    ```
    2. Uruchomienie środowiska:
    ```sh
    cd ./sekurak-academy-python-hacking
    chmod +x ./run.sh
    sudo ./run.sh
    ```
### Kali Linux
- Ustawienia wirtualnej maszyny:
    - Karta sieciowa 1:
        - Tryb działania: `NAT`
        - Adresajca: `DHCP`
    - Karta sieciowa 2:
        - Tryb działania: `Sieć wewnątrzna`
        - Adresacja:
            - IP: 10.255.255.100/24
- Konfiguracja maszynu:
    1. Zainstalowanie niezbędnego oprogramowania:
    ```sh
    wget https://raw.githubusercontent.com/LeftarCode/sekurak-academy-python-hacking/main/kali-setup.sh
    chmod +x ./kali-setup.sh
    sudo ./kali-setup.sh
    ```