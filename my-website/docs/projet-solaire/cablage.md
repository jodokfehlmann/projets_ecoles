---
id: cablage
title: Câblage — Monitor Solaire
sidebar_label: 🔌 Câblage
---
# 🔌 Câblage

## Schéma de câblage
```
Panneau 6V       INA219
──────────       ──────
(+) ──────────► VIN+
(-) ──────────► VIN-

INA219           Arduino
──────           ───────
SDA     ──────► A4
SCL     ──────► A5
VCC     ──────► 3.3V
GND     ──────► GND

INA219 → TP4056 → Accu 18650
OUT+ ──────────► IN+  →  BAT+
OUT- ──────────► IN-  →  BAT-

TFT, SD, RTC : même câblage que Projet 3 (Station Météo)
```

## Bibliothèques nécessaires
| Bibliothèque | Auteur |
|-------------|--------|
| `Adafruit INA219` | Adafruit |
| `Adafruit ILI9341` | Adafruit |
| `RTClib` | Adafruit |
| `SD` | Arduino |

✅ **Câblage terminé !** → Passe au **[code →](./code)**
