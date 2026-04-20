---
id: assemblage
title: Assemblage — GPS Tracker
sidebar_label: 🔩 Assemblage
---
# 🔩 Assemblage du GPS Tracker

## Disposition dans le boîtier
```
┌─────────────────────────────┐
│  [OLED]         [LED statut]│ ← Face avant
│                             │
│  [GPS antenne vers haut]    │
│  [Arduino Nano]             │
│  [SD] [RTC] [BMP280]        │
│  [LiPo] ── [TP4056]         │
└─────────────────────────────┘
              [USB-C charge]  ← Dessous
              [Interrupteur]  ← Côté
              [Bouton waypoint]← Côté
```

## Points critiques
1. **Antenne GPS** : doit pointer vers le ciel — pas couverte de métal
2. **LiPo** : colle avec velcro double-face, **pas de vis** (risque perçage)
3. **Joint étanchéité** : applique un cordon de silicone sur le pourtour avant de fermer

## Test avant fermeture
- [ ] Fix GPS obtenu (LED clignote 1×/s)
- [ ] OLED affiche coordonnées
- [ ] Fichier créé sur carte SD
- [ ] Batterie charge bien via USB-C
- [ ] Bouton waypoint fonctionne

✅ → Passe au **[câblage →](./cablage)**
