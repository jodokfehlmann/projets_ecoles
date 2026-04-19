---
id: cablage
title: Câblage — Serrure Intelligente
sidebar_label: 🔌 Câblage
---

# 🔌 Câblage de la Serrure

## Schéma de câblage

```
Arduino          RFID MFRC522 (SPI)
───────          ──────────────────
D10      ──────► SDA (CS)
D11      ──────► MOSI
D12      ──────► MISO
D13      ──────► SCK
D9       ──────► RST
3.3V     ──────► VCC  ⚠️ 3.3V uniquement !
GND      ──────► GND

Arduino          Clavier 4×4
───────          ───────────
D2 à D5  ──────► Lignes (R1-R4)
D6 à D8,A0──────► Colonnes (C1-C4)

Arduino          LCD I2C
───────          ───────
A4 (SDA) ──────► SDA
A5 (SCL) ──────► SCL
5V       ──────► VCC
GND      ──────► GND

Arduino          Autres
───────          ──────
D1 (PWM) ──────► Servo SG90 (signal)
A1       ──────► Buzzer (+)
A2       ──────► LED verte (+ résistance 220Ω)
A3       ──────► LED rouge (+ résistance 220Ω)
```

:::danger 3.3V pour le RFID !
Le MFRC522 fonctionne en **3.3V**. Le brancher sur 5V le détruira instantanément !
:::

## Bibliothèques nécessaires

| Bibliothèque | Auteur |
|-------------|--------|
| `MFRC522` | miguelbalboa |
| `Keypad` | Mark Stanley |
| `LiquidCrystal I2C` | Frank de Brabander |
| `Servo` | Arduino (incluse) |

✅ **Câblage terminé !** → Passe au **[code →](./code)**
