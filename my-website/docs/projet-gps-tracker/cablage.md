---
id: cablage
title: Câblage — GPS Tracker
sidebar_label: 🔌 Câblage
---

# 🔌 Câblage du GPS Tracker

## Schéma de câblage complet

```
Arduino Nano     GPS NEO-6M (SoftwareSerial)
────────────     ──────────────────────────
D4 (RX)  ──────► TX du GPS
D5 (TX)  ──────► RX du GPS
5V       ──────► VCC
GND      ──────► GND

Arduino Nano     OLED I2C
────────────     ────────
A4 (SDA) ──────► SDA
A5 (SCL) ──────► SCL
3.3V     ──────► VCC
GND      ──────► GND

Arduino Nano     Module SD (SPI)
────────────     ───────────────
D10      ──────► CS
D11      ──────► MOSI
D12      ──────► MISO
D13      ──────► SCK
5V       ──────► VCC
GND      ──────► GND

Arduino Nano     BMP280 (I2C — même bus que OLED)
────────────     ──────────────────────────────────
A4 (SDA) ──────► SDA  (adresse 0x76)
A5 (SCL) ──────► SCL

Arduino Nano     RTC DS3231 (I2C)
────────────     ────────────────
A4 (SDA) ──────► SDA  (adresse 0x68)
A5 (SCL) ──────► SCL
3.3V     ──────► VCC
GND      ──────► GND

Arduino Nano     Bouton waypoint
────────────     ───────────────
D2       ──────► Bouton → GND (INPUT_PULLUP)

Arduino Nano     LED statut
────────────     ──────────
D3       ──────► LED verte + résistance 220Ω → GND

Batterie LiPo → TP4056 → Interrupteur → VIN Arduino Nano
```

## Bibliothèques nécessaires

| Bibliothèque | Auteur | Usage |
|-------------|--------|-------|
| `TinyGPS++` | Mikal Hart | Décoder les trames NMEA du GPS |
| `Adafruit SSD1306` | Adafruit | Affichage OLED |
| `Adafruit BMP280` | Adafruit | Altitude barométrique |
| `RTClib` | Adafruit | Horodatage |
| `SD` | Arduino | Écriture fichiers |

:::tip Premier fix GPS
La première fois que tu allumes le GPS (à froid), il peut mettre **2 à 10 minutes** à obtenir un fix. Place-toi dehors avec une vue dégagée du ciel. Les fois suivantes, le fix est obtenu en 30–60 secondes.
:::

✅ **Câblage terminé !** → Passe au **[code →](./code)**
