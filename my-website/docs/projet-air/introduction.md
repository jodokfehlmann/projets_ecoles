---
id: introduction
title: Moniteur Qualité de l'Air — Introduction
sidebar_label: 📖 Introduction
---
# 🌍 Projet 8 — Moniteur de Qualité de l'Air

<div className="info-grid">
  <div className="info-box"><span className="info-value">🟡</span><span className="info-label">Niveau Intermédiaire</span></div>
  <div className="info-box"><span className="info-value">4–5h</span><span className="info-label">Durée estimée</span></div>
  <div className="info-box"><span className="info-value">14–18</span><span className="info-label">Âge recommandé</span></div>
  <div className="info-box"><span className="info-value">9.500</span><span className="info-label">DZD (prix kit)</span></div>
</div>

## 🎯 Objectif
Mesurer la qualité de l'air dans les salles de classe : CO₂, gaz nocifs et particules fines. Une alerte visuelle et sonore se déclenche quand l'air devient mauvais — directement utile pour la santé des élèves !

:::info Pourquoi c'est important ?
Dans une classe avec 30 élèves et fenêtres fermées, le CO₂ peut atteindre des niveaux qui réduisent la concentration et causent de la fatigue. Ce projet mesure ce phénomène en temps réel.
:::

## 🎓 Ce que tu vas apprendre
| Compétence | Détail |
|-----------|--------|
| **Capteurs de gaz** | MQ-135 et calibration |
| **Seuils multiples** | Systèmes d'alerte à plusieurs niveaux |
| **OLED I2C** | Affichage compact et efficace |
| **Santé** | Comprendre les effets de la qualité de l'air |
| **Données** | Enregistrer et analyser sur SD |

## 🚦 Système d'alerte tri-couleur
- 🟢 **Vert** : Air excellent (CO₂ < 800 ppm)
- 🟡 **Jaune** : Air moyen (800–1200 ppm)
- 🔴 **Rouge** : Aérer immédiatement ! (> 1200 ppm)

👉 Commence par **[le matériel →](./materiel)**
