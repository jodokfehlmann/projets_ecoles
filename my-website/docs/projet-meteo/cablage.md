---
id: cablage
title: Câblage — Station Météo
sidebar_label: 🔌 Câblage
---

# 🔌 Câblage de la Station Météo

---

## Schéma de câblage complet

```
Arduino          Composant
───────          ─────────
D2       ──────► DHT22 (DATA) + résistance 10kΩ vers 5V
A0       ──────► ML8511 (OUT)
3V3      ──────► ML8511 (3.3V REF) + ML8511 (EN)

── Bus I2C ──────────────────────────────
SDA (A4) ──────► BMP280 SDA
                 DS3231 SDA
SCL (A5) ──────► BMP280 SCL
                 DS3231 SCL

── Bus SPI ──────────────────────────────
D13 (SCK)──────► TFT CLK + SD CLK
D12 (MISO)─────► SD MISO
D11 (MOSI)─────► TFT MOSI + SD MOSI
D10      ──────► TFT CS
D9       ──────► TFT DC/RS
D8       ──────► TFT RST
D4       ──────► SD CS

── Alimentation ─────────────────────────
5V       ──────► DHT22 VCC + TFT VCC + SD VCC
3.3V     ──────► BMP280 VCC + DS3231 VCC + ML8511 VCC
GND      ──────► Tous les GND
```

:::warning I2C partagé
Le BMP280 et le DS3231 partagent le même bus I2C (SDA/SCL). C'est normal et prévu — ils ont des adresses différentes (0x76 et 0x68).
:::

## Tableau de connexion rapide

| Composant | Broche | Arduino |
|-----------|--------|---------|
| DHT22 | VCC | 5V |
| DHT22 | GND | GND |
| DHT22 | DATA | D2 |
| BMP280 | VCC | 3.3V |
| BMP280 | GND | GND |
| BMP280 | SDA | A4 |
| BMP280 | SCL | A5 |
| ML8511 | VCC | 3.3V |
| ML8511 | GND | GND |
| ML8511 | OUT | A0 |
| ML8511 | EN | 3.3V |
| TFT | VCC | 5V |
| TFT | GND | GND |
| TFT | CS | D10 |
| TFT | RST | D8 |
| TFT | DC | D9 |
| TFT | MOSI | D11 |
| TFT | CLK | D13 |
| SD | CS | D4 |
| SD | MOSI | D11 |
| SD | MISO | D12 |
| SD | CLK | D13 |
| DS3231 | VCC | 3.3V |
| DS3231 | GND | GND |
| DS3231 | SDA | A4 |
| DS3231 | SCL | A5 |

---

✅ **Câblage terminé !** → Passe au **[code →](./code)**
