---
id: assemblage
title: Assemblage — Robot Suiveur de Ligne
sidebar_label: 🔩 Assemblage
---

# 🔩 Assemblage du Robot

**Durée estimée :** 60 à 90 minutes

## Étape 1 — Monter les moteurs

1. Insère le **moteur gauche** dans son support 3D (l'arbre dépasse vers l'extérieur)
2. Fixe avec 2 vis M3 × 10mm
3. Répète pour le **moteur droit**
4. Clipse les deux supports sur le **châssis principal**

```
Vue de dessus :
[Moteur G] ←── Châssis ──→ [Moteur D]
                  │
              [Batterie]
                  │
              [Arduino]
                  │
             [Capteurs IR]──→ (face avant)
```

## Étape 2 — Monter les roues

1. Pousse la **roue** sur l'arbre du moteur
2. Serre la vis de blocage (clé hexagonale 2mm)
3. La roue ne doit pas être bancale
4. Monte la **roue folle** à l'arrière du châssis

## Étape 3 — Fixer l'électronique

1. Colle ou visse l'**Arduino** sur le châssis (support prévu)
2. Fixe le **driver L298N** à côté
3. Place le **support de batterie** dans son logement

## Étape 4 — Barre de capteurs

1. Monte les **3 capteurs IR** sur la barre frontale
   - Capteur gauche / centre / droite
   - Espacement : environ 15mm entre chaque
2. La barre se fixe à l'avant du châssis à **5-8mm du sol**

:::warning Hauteur des capteurs
Les capteurs doivent être à **5 à 10mm** du sol. Trop haut = ne détecte pas. Trop bas = frottement.
:::

## Étape 5 — Vérification mécanique

- [ ] Les roues tournent librement à la main
- [ ] La roue folle touche le sol
- [ ] Les capteurs sont à la bonne hauteur et ne frottent pas
- [ ] Le châssis est stable (ne bascule pas)

✅ **Assemblage terminé !** → Passe au **[câblage →](./cablage)**
