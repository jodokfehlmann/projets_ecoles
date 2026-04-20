---
id: assemblage
title: Assemblage — Stabilisation Active
sidebar_label: 🔩 Assemblage
---
# 🔩 Assemblage — Ball-Balancing Platform

## Structure générale
```
       [Bille en acier]
      ___________________
     |     PLATEAU 3D    |  ← Inclinable sur 2 axes
     |___________________|
    /|                   |\
   / |                   | \
[Bras X]             [Bras Y]
   |                       |
[Servo X]             [Servo Y]
   |                       |
   └───── BASE FIXE ────────┘
```

## Étape 1 — Monter la base
1. Imprime la base fixe en PETG (plus rigide que PLA)
2. Fixe les deux supports servo perpendiculaires l'un à l'autre
3. Les axes de rotation doivent se croiser exactement au centre

## Étape 2 — Installer les servos
1. Fixe servo X dans le support gauche/droite
2. Fixe servo Y dans le support avant/arrière
3. Vérifie que chaque servo tourne librement sans forcer

## Étape 3 — Plateau et bras de liaison
1. Attache les bras de liaison au bord du plateau
2. Connecte chaque bras à son servo
3. En position neutre (90°), le plateau doit être parfaitement horizontal

## Étape 4 — Fixer le MPU6050
Le MPU6050 doit être fixé **au centre exact** du plateau, bien à plat.
Une légère erreur de positionnement introduit un biais constant.

## Test mécanique
Incline doucement le plateau avec la main. Les servos doivent pouvoir le ramener à plat librement.

✅ → Passe au **[câblage →](./cablage)**
