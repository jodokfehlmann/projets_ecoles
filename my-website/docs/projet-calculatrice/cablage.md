---
id: cablage
title: Câblage — Calculatrice RPN
sidebar_label: 🔌 Câblage
---

# 🔌 Câblage de la Calculatrice

## Schéma de câblage

```
Arduino Nano     Clavier 4×4
────────────     ───────────
D2       ──────► Ligne 1 (R1)
D3       ──────► Ligne 2 (R2)
D4       ──────► Ligne 3 (R3)
D5       ──────► Ligne 4 (R4)
D6       ──────► Colonne 1 (C1)
D7       ──────► Colonne 2 (C2)
D8       ──────► Colonne 3 (C3)
D9       ──────► Colonne 4 (C4)

Arduino Nano     OLED SH1106 I2C
────────────     ───────────────
A4 (SDA) ──────► SDA
A5 (SCL) ──────► SCL
3.3V     ──────► VCC
GND      ──────► GND

Arduino Nano     Buzzer
────────────     ──────
D10      ──────► Buzzer signal
GND      ──────► Buzzer GND

Batterie Li-Po → TP4056 → Interrupteur → VIN Arduino Nano
```

## Bibliothèques nécessaires

| Bibliothèque | Auteur |
|-------------|--------|
| `Keypad` | Mark Stanley |
| `U8g2lib` | olikraus (pour SH1106) |