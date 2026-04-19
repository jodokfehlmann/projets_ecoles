---
id: assemblage
title: Assemblage — Station Météo
sidebar_label: 🔩 Assemblage
---

# 🔩 Assemblage de la Station Météo

**Durée estimée :** 30 à 45 minutes

---

## Étape 1 — Préparer le boîtier

1. Prends le **boîtier principal** imprimé en 3D
2. Insère l'Arduino dans son logement (4 vis M3 × 10mm)
3. Place le **module SD** à côté de l'Arduino
4. Place le **RTC DS3231** dans son emplacement

## Étape 2 — Monter l'écran TFT

1. L'écran TFT se fixe sur le **couvercle du boîtier**
2. Passe le câble ruban à travers la fente prévue
3. Fixe avec 4 vis M2 × 6mm
4. L'écran doit être **visible de face** quand le boîtier est fermé

## Étape 3 — Positionner les capteurs

```
Vue de côté du boîtier :
┌──────────────────────────┐
│  [Écran TFT]  face avant │
├──────────────────────────┤
│  Arduino + SD + RTC      │
├──────────────────────────┤
│  [Grille] ← DHT22 ici   │ ← Air libre pour mesurer
│  [ML8511] ← UV sensor   │ ← Doit voir le ciel
└──────────────────────────┘
```

- Le **DHT22** doit être près de la grille de ventilation — loin des sources de chaleur
- Le **ML8511** doit pointer vers le haut (vers la lumière)
- Le **BMP280** peut être à l'intérieur (la pression traverse le boîtier)

## Étape 4 — Fermer le boîtier

1. Passe tous les câbles avec soin — pas de fils pincés !
2. Fixe le cache arrière avec 4 vis M3
3. Monte sur le **support mural** si souhaité

---

✅ **Assemblage terminé !** → Passe au **[câblage →](./cablage)**
