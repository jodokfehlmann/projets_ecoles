---
id: cablage
title: Câblage — Stabilisation Active
sidebar_label: 🔌 Câblage
---
# 🔌 Câblage

## Schéma complet
```
Arduino Uno      MPU6050
───────────      ───────
A4 (SDA) ──────► SDA
A5 (SCL) ──────► SCL
3.3V     ──────► VCC
GND      ──────► GND
D2 (INT) ──────► INT  ← Important pour boucle 200Hz !

Arduino Uno      Servos MG996R
───────────      ─────────────
D9  (PWM)──────► Servo X signal
D10 (PWM)──────► Servo Y signal
Alim 5V ext──── VCC des 2 servos  ← Alimentation SÉPARÉE !
GND      ──────► GND servos

Arduino Uno      Potentiomètres réglage PID
───────────      ──────────────────────────
A0       ──────► Curseur pot Kp
A1       ──────► Curseur pot Ki
A2       ──────► Curseur pot Kd
5V       ──────► Extrémité haute des 3 pots
GND      ──────► Extrémité basse des 3 pots

Arduino Uno      LCD I2C
───────────      ───────
A4 (SDA) ──────► SDA
A5 (SCL) ──────► SCL
5V       ──────► VCC
GND      ──────► GND
```

:::warning Alimentation servos séparée
Les MG996R consomment jusqu'à 2A chacun sous charge.
Ne les alimente JAMAIS depuis le 5V de l'Arduino → utilise une alimentation 5V 3A externe !
:::

## Bibliothèques nécessaires
| Bibliothèque | Auteur |
|-------------|--------|
| `MPU6050` | Electronic Cats |
| `LiquidCrystal I2C` | Frank de Brabander |
| `Servo` | Arduino (incluse) |

✅ → Passe au **[code →](./code)**
