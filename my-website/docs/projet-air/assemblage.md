---
id: assemblage
title: Assemblage — Qualité de l'Air
sidebar_label: 🔩 Assemblage
---
# 🔩 Assemblage du Moniteur

## Étape 1 — Positionner les capteurs
Les capteurs doivent être **exposés à l'air ambiant** — pas dans une poche fermée.
```
Vue de face du boîtier mural :
┌─────────────────────────┐
│  [OLED]  [LED R/J/V]   │ ← Façade visible
├─────────────────────────┤
│  [MQ-135] [DHT22]      │ ← Derrière grille ventilation
│  [GP2Y1010]            │ ← Capteur particules
│  Arduino               │
└─────────────────────────┘
     ↑ Grille d'aération (air entre ici)
```

## Étape 2 — Câbler le GP2Y1010 (capteur particules)
Ce capteur a une LED interne IR qui s'allume brièvement. Le câblage est précis :
1. La LED IR du capteur se connecte via une résistance **150Ω** + condensateur **220µF**
2. Voir le câblage exact sur la page suivante

## Étape 3 — Monter le boîtier mural
1. Fixe l'Arduino et l'électronique à l'intérieur
2. Monte les LEDs dans le support ampel (rouge en haut, vert en bas)
3. L'OLED se clippe dans la fenêtre de la façade
4. Visse le boîtier au mur à hauteur des yeux

✅ **Assemblage terminé !** → Passe au **[câblage →](./cablage)**
