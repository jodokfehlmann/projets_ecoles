---
id: cablage
title: Câblage — CanSat
sidebar_label: 🔌 Câblage
---

# 🔌 Câblage du CanSat

## Module satellite (dans la canette)

```
Arduino Nano     BMP280 (I2C)
────────────     ────────────
A4 (SDA) ──────► SDA
A5 (SCL) ──────► SCL
3.3V     ──────► VCC
GND      ──────► GND

Arduino Nano     MPU6050 (I2C — même bus)
────────────     ──────────────────────────
A4 (SDA) ──────► SDA  (adresse 0x68)
A5 (SCL) ──────► SCL
3.3V     ──────► VCC
GND      ──────► GND

Arduino Nano     GPS NEO-6M (UART)
────────────     ─────────────────
D4 (SoftRX)──► TX du GPS
D5 (SoftTX)──► RX du GPS
5V       ──────► VCC
GND      ──────► GND

Arduino Nano     LoRa SX1276 (SPI)
────────────     ─────────────────
D10      ──────► NSS (CS)
D11      ──────► MOSI
D12      ──────► MISO
D13      ──────► SCK
D2       ──────► DIO0 (interrupt)
3.3V     ──────► VCC  ⚠️ 3.3V !
GND      ──────► GND

D9       ──────► Servo parachute
D3       ──────► LED verte
D6       ──────► Buzzer
```

## Station sol

```
Arduino Uno      LoRa SX1276 (réception)
───────────      ───────────────────────
D10      ──────► NSS
D11      ──────► MOSI
D12      ──────► MISO
D13      ──────► SCK
D2       ──────► DIO0
3.3V     ──────► VCC
GND      ──────► GND

Connexion PC via USB → moniteur série ou script Python
```