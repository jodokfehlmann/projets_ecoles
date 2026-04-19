---
id: assemblage
title: Assemblage — Irrigation Intelligente
sidebar_label: 🔩 Assemblage
---

# 🔩 Assemblage du Système

**Durée estimée :** 45 à 60 minutes

---

## Étape 1 — Préparer le boîtier

1. Imprime ou récupère le **boîtier principal** (pièce 3D incluse dans le kit)
2. Insère les **presse-câbles** dans les trous latéraux
3. Fixe le **support LCD** sur le couvercle

## Étape 2 — Monter l'électronique dans le boîtier

1. Fixe l'**Arduino** avec 4 vis M3
2. Fixe le **module relais** à côté de l'Arduino
3. Fixe le **module I2C + LCD** sur le couvercle
4. Laisse dépasser les câbles des capteurs par les presse-câbles

## Étape 3 — Préparer les capteurs d'humidité

:::info Capteur capacitif vs résistif
Le kit utilise des capteurs **capacitifs** (dorés) — ils durent bien plus longtemps en terre que les capteurs résistifs (argentés qui rouillent).
:::

1. Dénude 10cm de chaque fil des capteurs
2. Passe les câbles dans les presse-câbles du boîtier
3. Les capteurs seront enfoncés dans la terre lors de l'installation finale

## Étape 4 — Raccordement hydraulique

```
Arrivée eau
    │
    ├──────── Électrovanne 1 ──── Zone A (fleurs)
    │
    └──────── Électrovanne 2 ──── Zone B (légumes)
```

1. Coupe le tuyau principal en T
2. Connecte chaque branche à une électrovanne
3. Les câbles des électrovannes rentrent dans le boîtier par les presse-câbles
4. Serre les presse-câbles pour l'étanchéité

---

✅ **Assemblage terminé !** → Passe au **[câblage →](./cablage)**
