---
id: introduction
title: Calculatrice RPN — Introduction
sidebar_label: 📖 Introduction
---

# 🧮 Projet 9 — Calculatrice Scientifique RPN

<div className="info-grid">
  <div className="info-box"><span className="info-value">🟡</span><span className="info-label">Niveau Intermédiaire</span></div>
  <div className="info-box"><span className="info-value">4–6h</span><span className="info-label">Durée estimée</span></div>
  <div className="info-box"><span className="info-value">14–18</span><span className="info-label">Âge recommandé</span></div>
  <div className="info-box"><span className="info-value">8.000</span><span className="info-label">DZD (prix kit)</span></div>
</div>

---

## 🎯 Objectif

Construire une vraie calculatrice scientifique avec un clavier matriciel, un écran OLED, et un boîtier entièrement imprimé en 3D. Ce projet combine mécanique, électronique et algorithmique.

:::info Déjà réalisé !
Ce projet a déjà été construit et fonctionne. La documentation ici te guide pas à pas pour le reproduire ou l'améliorer.
:::

## 🧠 Qu'est-ce que la notation RPN ?

La **notation polonaise inversée** (RPN) est utilisée par les calculatrices professionnelles HP. Au lieu d'écrire `3 + 4 =`, tu écris `3 ENTER 4 +`. C'est plus rapide et élimine les problèmes de parenthèses !

```
Exemple :  (3 + 4) × 5
RPN :      3 ENTER 4 + 5 ×
Résultat : 35
```

## 🎓 Ce que tu vas apprendre

| Compétence | Détail |
|-----------|--------|
| **Clavier matriciel** | Scanner un clavier 4×4 efficacement |
| **Pile (Stack)** | Structure de données fondamentale |
| **Algorithme RPN** | Évaluation d'expressions mathématiques |
| **OLED I2C** | Interface utilisateur sur petit écran |
| **Boîtier 3D** | Conception ergonomique d'un appareil |

## 📐 Fonctionnalités

- ✅ Opérations de base : + - × ÷
- ✅ Fonctions scientifiques : sin, cos, tan, log, √
- ✅ Pile à 4 niveaux (X, Y, Z, T) affichée en temps réel
- ✅ Historique des calculs
- ✅ Boîtier imprimé en 3D avec touches personnalisées

👉 Commence par **[le matériel →](./materiel)**