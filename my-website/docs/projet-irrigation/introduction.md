---
id: introduction
title: Irrigation Intelligente — Introduction
sidebar_label: 📖 Introduction
---

# 🌱 Projet 2 — Système d'Irrigation Intelligente

<div className="info-grid">
  <div className="info-box">
    <span className="info-value">🟡</span>
    <span className="info-label">Niveau Intermédiaire</span>
  </div>
  <div className="info-box">
    <span className="info-value">4–6h</span>
    <span className="info-label">Durée estimée</span>
  </div>
  <div className="info-box">
    <span className="info-value">13–17</span>
    <span className="info-label">Âge recommandé</span>
  </div>
  <div className="info-box">
    <span className="info-value">9.000</span>
    <span className="info-label">DZD (prix kit)</span>
  </div>
</div>

---

## 🎯 Objectif du projet

Construire un système qui **arrose automatiquement** le jardin de l'école quand la terre est trop sèche — sans intervention humaine.

:::info Utilité réelle
Ce système sera **installé dans le vrai jardin de l'école** ! Tu construis quelque chose qui servira concrètement. Les plantes te remercieront 🌿
:::

---

## 🧠 Comment ça fonctionne ?

```
Capteur d'humidité du sol
        │
        ▼
   [Arduino mesure]
        │
   Humidité < seuil ?
   ┌────┴────┐
  OUI       NON
   │         │
   ▼         ▼
Relais ON  Relais OFF
   │
   ▼
Électrovanne ouvre
   │
   ▼
💧 Arrosage pendant X secondes
   │
   ▼
Électrovanne ferme
```

---

## 🎓 Ce que tu vas apprendre

| Compétence | Détail |
|-----------|--------|
| **Capteurs analogiques** | Lire l'humidité du sol |
| **Relais** | Contrôler des charges 12V avec Arduino |
| **Logique de seuil** | Décider quand arroser |
| **Affichage LCD** | Communiquer les données à l'utilisateur |
| **Protocole I2C** | Communication avec le LCD |
| **Systèmes réels** | Installer dans un vrai jardin |

---

👉 Commence par **[la liste du matériel →](./materiel)**
