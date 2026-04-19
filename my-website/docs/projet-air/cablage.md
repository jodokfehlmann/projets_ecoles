---
id: cablage
title: Câblage — Qualité de l'Air
sidebar_label: 🔌 Câblage
---
# 🔌 Câblage du Moniteur

## Schéma de câblage
```
Arduino          MQ-135
───────          ──────
A0       ──────► AOUT
5V       ──────► VCC
GND      ──────► GND

Arduino          GP2Y1010 (particules)
───────          ──────────────────────
D2       ──────► LED (via 150Ω + 220µF)
A1       ──────► VO (sortie analogique)
5V       ──────► VCC
GND      ──────► GND

Arduino          DHT22
───────          ─────
D3       ──────► DATA (+ 10kΩ vers 5V)
5V       ──────► VCC
GND      ──────► GND

Arduino          OLED I2C
───────          ────────
A4 (SDA) ──────► SDA
A5 (SCL) ──────► SCL
3.3V     ──────► VCC
GND      ──────► GND

Arduino          LEDs ampel
───────          ──────────
D4       ──────► LED rouge  (+220Ω)
D5       ──────► LED jaune  (+220Ω)
D6       ──────► LED verte  (+220Ω)
D7       ──────► Buzzer (+)
```

## Schéma GP2Y1010 (détail)
```
Arduino 5V ──── 150Ω ──┬──── LED (broche 3 GP2Y)
                       │
                      220µF
                       │
Arduino GND ───────────┴──── GND (broche 2 GP2Y)

Arduino D2 ──────────────── LED-GND (broche 1 GP2Y)
Arduino A1 ──────────────── VO (broche 4 GP2Y)
```

## Bibliothèques nécessaires
| Bibliothèque | Auteur |
|-------------|--------|
| `Adafruit SSD1306` | Adafruit |
| `Adafruit GFX` | Adafruit |
| `DHT sensor library` | Adafruit |

✅ **Câblage terminé !** → Passe au **[code →](./code)**
