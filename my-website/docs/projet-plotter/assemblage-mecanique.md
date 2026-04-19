---
id: assemblage-mecanique
title: Assemblage Mécanique — Traceur 2D
sidebar_label: 🔩 Assemblage
---

# 🔩 Assemblage Mécanique

:::tip Conseil avant de commencer
Lis **toutes les étapes** une fois avant de commencer. Prépare tous tes outils et pièces sur une surface propre et bien éclairée.
:::

**Durée estimée :** 90 à 120 minutes

---

## Étape 1 — Monter les moteurs sur le cadre

### 1.1 Moteur axe Y (gauche)

1. Prends le **support moteur Y gauche** (pièce imprimée en 3D)
2. Insère le moteur NEMA 17 dans l'emplacement prévu
3. Fixe avec **4 vis M3 × 10mm** — ne serre pas trop fort pour l'instant

```
Vue de dessus :
┌─────────────┐
│  [Moteur Y] │ ← Fils sortent par le bas
│   gauche    │
└──────┬──────┘
       │ arbre
       ▼ (poulie ici)
```

4. Glisse la **poulie GT2** sur l'arbre du moteur
5. Positionne-la à **2mm** du bas du moteur
6. Serre la vis de blocage (clé hexagonale 2mm) sur la **partie plate** de l'arbre

:::warning Très important
La poulie doit être alignée parfaitement horizontalement. Un mauvais alignement fera sauter la courroie !
:::

### 1.2 Moteur axe Y (droit)
Répète exactement la même procédure pour le côté droit.

### 1.3 Moteur axe X
1. Fixe le moteur sur le **support axe X** avec 4 vis M3 × 10mm
2. Monte la poulie comme précédemment

---

## Étape 2 — Assembler le cadre principal

### 2.1 Relier les deux côtés

1. Place les deux **cadres principaux** à plat sur ta table, face à face
2. Insère les **tiges de guidage** (ou rails) dans les emplacements
3. Vérifie que les deux côtés sont **parallèles** — utilise une règle !

```
Vue de face :
[Cadre gauche]────────────[Cadre droit]
      │    axe X (rail)        │
      │    ←───────────→       │
      │                        │
    [Moteur Y]           [Moteur Y]
     gauche                 droit
```

### 2.2 Fixer les supports de courroie

1. Monte les **tendeurs de courroie** aux extrémités du cadre
2. Ils doivent pouvoir coulisser pour ajuster la tension plus tard

---

## Étape 3 — Installer le chariot porte-stylo

### 3.1 Le chariot sur l'axe X

1. Glisse le **chariot** sur le rail de l'axe X
2. Il doit coulisser librement — ni trop lâche, ni trop serré
3. Si ça accroche : vérifier l'alignement du rail

### 3.2 Fixer le servo-moteur sur le chariot

1. Insère le **servo SG90** dans son logement sur le chariot
2. Fixe avec 2 vis M3 × 10mm
3. Attache le **bras du servo** (celui fourni avec le servo) — choisir le bras simple droit

```
Chariot vue de côté :
     ┌──────────────┐
     │  [Servo SG90]│ ← Stylo levé quand angle = 90°
     │      │       │ ← Stylo posé quand angle = 45°
     │   [Stylo]    │
     └──────────────┘
```

### 3.3 Installer la pince à stylo

1. Fixe la **pince à stylo** sur le bras du servo
2. Insère un **stylo à bille standard** (ø ~8mm)
3. Ajuste la hauteur : quand le servo est à 45°, la pointe du stylo doit effleurer la surface

:::tip Quel stylo utiliser ?
Un stylo **BIC classique** fonctionne parfaitement. Pour des traits plus fins : stylo gel 0.5mm.
:::

---

## Étape 4 — Installer les courroies

### 4.1 Courroie axe X

1. Coupe une longueur de courroie GT2 = **largeur du cadre + 100mm**
2. Passe la courroie dans le chariot (l'encoche prévue)
3. Enroule autour de la **poulie moteur X**
4. Passe dans le **tendeur** côté opposé
5. Fixe les extrémités dans les encoches du chariot

### 4.2 Courroies axe Y (il y en a 2 !)

L'axe Y utilise **2 courroies** — une de chaque côté.

Pour chaque côté :
1. Coupe une longueur = **profondeur du cadre + 100mm**
2. Attache une extrémité au chariot (côté correspondant)
3. Enroule autour de la poulie du moteur Y
4. Passe dans le tendeur arrière
5. Attache l'autre extrémité

### 4.3 Tension des courroies

:::info Bonne tension
Pince la courroie et lâche-la. Elle doit vibrer comme une **corde de guitare** — ni trop molle (ça claque), ni trop tendue (ça force sur les moteurs).
:::

Ajuste les tendeurs jusqu'à obtenir la bonne tension, puis serre les vis de blocage.

---

## Étape 5 — Vérification finale

Avant de câbler, vérifie :

- [ ] Tous les moteurs sont solidement fixés
- [ ] Les poulies sont alignées horizontalement
- [ ] Le chariot se déplace librement sur les deux axes
- [ ] Les courroies ont la bonne tension
- [ ] Le servo est bien fixé sur le chariot
- [ ] La pince à stylo tient le stylo fermement

### Test manuel

Déplace le chariot à la main dans toutes les directions :
- ✅ Doit être fluide et sans accroc
- ✅ Les courroies doivent rester en place
- ❌ Si ça grince → vérifier l'alignement des rails
- ❌ Si la courroie saute → mauvais alignement des poulies

---

✅ **Assemblage terminé !** → Passe au **[câblage électronique →](./cablage)**
