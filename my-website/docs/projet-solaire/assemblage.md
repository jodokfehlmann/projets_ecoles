---
id: assemblage
title: Assemblage — Monitor Solaire
sidebar_label: 🔩 Assemblage
---
# 🔩 Assemblage

## Étape 1 — Support panneau orientable
1. Monte le **panneau solaire** sur le support imprimé en 3D
2. Le support permet de régler l'angle de 0° à 90°
3. En Algérie, l'angle optimal ≈ latitude locale + 10° (ex: Alger = 37°)

## Étape 2 — Circuit de charge
```
Panneau → INA219 → TP4056 → Accu 18650
                ↕
           Arduino (mesure)
```
1. Connecte le panneau à l'entrée du **TP4056**
2. Connecte l'accu à la sortie du **TP4056**
3. L'**INA219** se place entre le panneau et le TP4056 pour mesurer

## Étape 3 — Boîtier électronique
1. Fixe Arduino + TFT + SD + RTC dans le boîtier
2. Fais passer les câbles du panneau à travers le presse-câble
3. Ferme le boîtier — il doit être étanche si installé dehors

:::warning Installation extérieure
Si la station est installée dehors, utilise du silicone autour des presse-câbles pour l'étanchéité.
:::

✅ **Assemblage terminé !** → Passe au **[câblage →](./cablage)**
