---
id: cablage
title: Câblage — Robot Suiveur de Ligne
sidebar_label: 🔌 Câblage
---

# 🔌 Câblage du Robot

## Schéma de câblage

```
Arduino          Driver L298N
───────          ────────────
D5 (PWM) ──────► ENA   (vitesse moteur gauche)
D6 (PWM) ──────► ENB   (vitesse moteur droit)
D7       ──────► IN1   (direction moteur gauche)
D8       ──────► IN2   (direction moteur gauche)
D9       ──────► IN3   (direction moteur droit)
D10      ──────► IN4   (direction moteur droit)

Arduino          Capteurs IR (×3)
───────          ────────────────
A0       ──────► Capteur GAUCHE (OUT)
A1       ──────► Capteur CENTRE (OUT)
A2       ──────► Capteur DROIT  (OUT)
5V       ──────► VCC des 3 capteurs
GND      ──────► GND des 3 capteurs

Batterie 9V     Driver L298N
───────────     ────────────
(+)      ──────► VIN (12V max)
(-)      ──────► GND

Driver L298N    Arduino
────────────    ───────
5V (sortie)──► 5V Arduino (alimente l'Arduino !)
GND      ──────► GND Arduino
```

:::info Le driver alimente l'Arduino
Le L298N a une sortie 5V régulée. On peut l'utiliser pour alimenter l'Arduino — pas besoin de câble USB pendant le fonctionnement !
:::

## Tableau de connexion rapide

| Composant | Broche | Arduino |
|-----------|--------|---------|
| L298N ENA | PWM moteur G | D5 |
| L298N ENB | PWM moteur D | D6 |
| L298N IN1 | Direction G | D7 |
| L298N IN2 | Direction G | D8 |
| L298N IN3 | Direction D | D9 |
| L298N IN4 | Direction D | D10 |
| IR gauche | Signal | A0 |
| IR centre | Signal | A1 |
| IR droit | Signal | A2 |

✅ **Câblage terminé !** → Passe au **[code →](./code)**
