---
id: introduction
title: CanSat — Introduction
sidebar_label: 📖 Introduction
---

# 🛸 Projet 10 — CanSat (Mini-Satellite dans une Canette)

<div className="info-grid">
  <div className="info-box"><span className="info-value">🔴</span><span className="info-label">Niveau Avancé</span></div>
  <div className="info-box"><span className="info-value">15–20h</span><span className="info-label">Durée estimée</span></div>
  <div className="info-box"><span className="info-value">15–18</span><span className="info-label">Âge recommandé</span></div>
  <div className="info-box"><span className="info-value">25.000</span><span className="info-label">DZD (prix kit)</span></div>
</div>

---

## 🎯 Objectif

Construire un **CanSat** — un satellite miniaturisé qui tient dans une canette de soda (330ml). Le CanSat est lancé par une fusée modèle réduite, déployé en hauteur, puis descend avec un **parachute cousu à la main**. Pendant toute la descente, il enregistre et transmet des données en temps réel.

:::info Compétition internationale
Le concept CanSat est utilisé dans des **compétitions internationales** (ESA CanSat, ESERO...). Ce projet te prépare à y participer !
:::

---

## 🚀 Mission complète

```
Phase 1 — Lancement
    Fusée propulse le CanSat à ~100m d'altitude

Phase 2 — Déploiement
    Parachute s'ouvre automatiquement (servos)
    
Phase 3 — Descente (30–60 secondes)
    Mesures : altitude, pression, température,
              accélération, vitesse de descente
    Transmission radio en temps réel

Phase 4 — Récupération
    GPS indique la position d'atterrissage
    Données analysées au sol
```

---

## 🎓 Ce que tu vas apprendre

| Compétence | Détail |
|-----------|--------|
| **Radio LoRa** | Transmission de données sans fil |
| **GPS** | Géolocalisation en temps réel |
| **IMU MPU6050** | Accéléromètre + gyroscope |
| **Parachute** | Couture et calcul de taille |
| **Analyse de données** | Tracer la trajectoire de vol |
| **Gestion d'énergie** | Optimiser la consommation de batterie |
| **Travail d'équipe** | Rôles sol et satellite |

---

## 👥 Organisation en équipe

Ce projet se fait en **équipe de 3 à 5 personnes** :

| Rôle | Responsabilité |
|------|---------------|
| **Ingénieur systèmes** | Architecture générale, intégration |
| **Ingénieur capteurs** | Électronique de mesure |
| **Ingénieur communication** | Radio LoRa, station sol |
| **Ingénieur mécanique** | Boîtier, parachute |
| **Ingénieur données** | Analyse, graphiques, rapport |

👉 Commence par **[le matériel →](./materiel)**