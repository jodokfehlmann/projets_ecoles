---
id: materiel
title: Liste du Matériel — Traceur 2D
sidebar_label: 🔧 Matériel
---

# 🔧 Liste du Matériel

Tous les composants suivants sont inclus dans ton kit **Arduino EduKit Plotter**. Vérifie chaque élément avant de commencer.

---

## ✅ Checklist de vérification

### 🖨️ Pièces imprimées en 3D (incluses dans le kit)

| # | Pièce | Quantité | Description |
|---|-------|----------|-------------|
| 1 | Cadre principal | 2 | Côtés gauche et droit |
| 2 | Support axe X | 1 | Rail horizontal |
| 3 | Chariot porte-stylo | 1 | Se déplace sur l'axe X |
| 4 | Support moteur Y (gauche) | 1 | |
| 5 | Support moteur Y (droit) | 1 | |
| 6 | Tendeur courroie X | 2 | |
| 7 | Tendeur courroie Y | 2 | |
| 8 | Support Arduino | 1 | Fixé sous le cadre |
| 9 | Boîtier électronique | 1 | Protection des drivers |
| 10 | Pince stylo | 1 | Ajustable pour différents stylos |

### ⚙️ Composants électroniques

| # | Composant | Quantité | Rôle |
|---|-----------|----------|------|
| 1 | Arduino Uno R3 | 1 | Cerveau du système |
| 2 | Moteur pas-à-pas NEMA 17 | 2 | Mouvements X et Y |
| 3 | Driver A4988 | 2 | Contrôle des moteurs |
| 4 | Servo-moteur SG90 | 1 | Lever/poser le stylo |
| 5 | Alimentation 12V 2A | 1 | Alimente les moteurs |
| 6 | Condensateur 100µF | 2 | Protection des drivers |
| 7 | Câble USB A-B | 1 | Connexion PC |
| 8 | Fils de connexion | 20 | Câblage |
| 9 | Bouton reset | 1 | Remise à zéro position |

### 🔩 Visserie et mécanique

| # | Pièce | Quantité |
|---|-------|----------|
| 1 | Courroie GT2 (mètre) | 2 |
| 2 | Poulie GT2 20 dents | 4 |
| 3 | Vis M3 × 10mm | 20 |
| 4 | Vis M3 × 20mm | 8 |
| 5 | Écrous M3 | 30 |
| 6 | Rondelles M3 | 20 |
| 7 | Ressort de pression stylo | 1 |

### 🛠️ Outils nécessaires (non inclus)

| Outil | Usage |
|-------|-------|
| Tournevis cruciforme | Visserie principale |
| Clé hexagonale 2mm | Vis de blocage poulies |
| Pince coupante | Couper les courroies |
| Multimètre (optionnel) | Vérifier le câblage |
| Ordinateur | Programmer l'Arduino |

---

## 📏 Dimensions finales du traceur

```
Largeur totale  : ~350 mm
Profondeur      : ~300 mm
Hauteur         : ~120 mm
Zone de dessin  : ~200 × 200 mm (format A4 coupé)
```

---

## 🔍 Identifier les composants

### Le moteur NEMA 17
```
    ┌─────────┐
    │  NEMA   │  ← Logo ou inscription
    │   17    │
    │ ■ ■ ■ ■ │  ← 4 fils (2 paires)
    └────┬────┘
         │ arbre de sortie
```
:::warning Attention
Les moteurs NEMA 17 ont **4 fils**. Ne pas confondre avec les servo-moteurs qui ont **3 fils** !
:::

### Le driver A4988
```
    ┌──────────────┐
    │  A4988       │
    │  ┌──┐        │  ← Potentiomètre de courant
    │  └──┘        │
    └──────────────┘
    Broches : STEP, DIR, ENABLE, VCC, GND...
```

### Le servo SG90
```
    ┌──────────┐
    │  SG90    │──── Marron  = GND
    │   ════   │──── Rouge   = 5V
    └──────────┘──── Orange  = Signal (PWM)
```

---

## ⚠️ Avant de continuer

Vérifie que **toutes les pièces** sont présentes avant de commencer le montage. Si une pièce manque, contacte-nous par email.

✅ **Tout est là ?** → Passe à **[l'assemblage mécanique →](./assemblage-mecanique)**
