---
id: parachute
title: Construction du Parachute
sidebar_label: 🪂 Parachute
---

# 🪂 Construction du Parachute

Le parachute est la partie la plus artisanale du projet — et la plus critique ! Un parachute mal dimensionné = CanSat endommagé à l'atterrissage.

---

## 📐 Calcul de la taille du parachute

La vitesse de descente cible est **5 m/s** (assez lent pour ne pas abîmer le CanSat).

**Formule :**
```
Cd × A = (2 × m × g) / (ρ × v²)

Où :
  Cd = coefficient de traînée = 0.75 (parachute hémisphérique)
  m  = masse du CanSat ≈ 0.35 kg (mesure le tien !)
  g  = 9.81 m/s²
  ρ  = densité de l'air = 1.225 kg/m³
  v  = vitesse cible = 5 m/s

→ A = (2 × 0.35 × 9.81) / (0.75 × 1.225 × 25)
→ A ≈ 0.30 m²
→ Diamètre = √(4A/π) ≈ 0.62 m → arrondir à 65 cm
```

:::tip Pèse ton CanSat !
Mesure la masse réelle avec une balance de cuisine avant de calculer. Chaque gramme compte !
:::

---

## ✂️ Patron du parachute

Un parachute hémisphérique se découpe en **8 fuseaux** identiques :

```
        /\
       /  \
      /    \   ← Un fuseau
     /      \     Largeur max = (π × D) / 8
    /________\
    
Pour D = 65cm :
  Largeur max = (3.14 × 65) / 8 = 25.5 cm
  Hauteur     = D / 2 = 32.5 cm
```

**Patron d'un fuseau :**
```
    ↑
   5cm   Cercle de vent (8cm Ø) — ← Optionnel mais recommandé
    ↓
   /  \
  / 25 \  ← Largeur maximale au milieu
 /  cm  \
/________\  ← 32.5 cm de haut
```

---

## 🧵 Instructions de couture

### Matériel de couture
- Fil nylon résistant (min 5kg)
- Aiguille à tissu n°14
- Machine à coudre (ou couture main très serrée)
- Ciseaux de couture + ciseaux à tissu

### Étapes

**1. Découper les 8 fuseaux**
   - Trace le patron sur du tissu ripstop avec un feutre effaçable
   - Ajoute 1cm de marge de couture sur chaque côté
   - Découpe proprement

**2. Assembler les fuseaux**
   - Coud les fuseaux ensemble 2 par 2 (bord à bord)
   - Puis 2 paires → 4 fuseaux, puis 4+4 = dôme complet
   - Point zigzag pour meilleure résistance

**3. Renforcer le bord**
   - Replie le bord extérieur sur 1cm et coud
   - Ajoute une cordelette dans le bord replié comme armature

**4. Attacher les suspentes**
   - 8 suspentes de **longueur = diamètre du parachute** (65cm)
   - Une à chaque jointure entre fuseaux
   - Noue solidement + nœud de sécurité

**5. Rassembler les suspentes**
   - Toutes les suspentes se rejoignent en un anneau central
   - Cet anneau s'accroche au CanSat

**6. Test au sol**
   - Tiens le dôme à bout de bras et lâche
   - Il doit s'ouvrir proprement et ne pas se vriller
   - Test final : lâcher d'une fenêtre du 2ème étage avec le CanSat

---

## 🔧 Mécanisme d'éjection

Le parachute est rangé dans un tube au-dessus du CanSat, retenu par un servo :

```
        [Tube parachute plié]
               │
          [Couvercle servo]  ← Servo maintient fermé
               │
          [CanSat]
               │
          [Mécanisme d'éjection]
```

```cpp
// Éjection à l'apogée détectée par le baromètre
if (vitesseVerticale < 0 && altitude > ALTITUDE_MIN) {
  servo.write(90);  // Ouvre le couvercle → parachute éjecté
  parachuteEjecte = true;
}
```

✅ **Parachute terminé !** → Passe au **[câblage →](./cablage)**