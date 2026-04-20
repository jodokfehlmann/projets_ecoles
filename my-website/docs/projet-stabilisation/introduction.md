---
id: introduction
title: Stabilisation Active — Introduction
sidebar_label: 📖 Introduction
---

# ✈️ Projet 11 — Stabilisation Active (Drone / Avion / Fusée)

<div className="info-grid">
  <div className="info-box"><span className="info-value">🔴</span><span className="info-label">Niveau Expert</span></div>
  <div className="info-box"><span className="info-value">10–15h</span><span className="info-label">Durée estimée</span></div>
  <div className="info-box"><span className="info-value">16–18</span><span className="info-label">Âge recommandé</span></div>
  <div className="info-box"><span className="info-value">20.000</span><span className="info-label">DZD (prix kit)</span></div>
</div>

---

## 🎯 Objectif

Construire un système de **stabilisation active** basé sur un contrôleur PID qui utilise un gyroscope/accéléromètre (MPU6050) pour maintenir un objet en équilibre. On commence par une plateforme d'équilibrage, puis on peut appliquer le même principe à un drone ou une fusée.

## 🧠 Principe — Le contrôleur PID

```
         ┌──────────────────────────────────────────┐
         │                                          │
Angle    │   Erreur      Contrôleur   Servos /     │
cible ──►├──►(cible  ──►   PID    ──► Moteurs──► Objet├──► Angle
         │   -mesuré)                              mesuré│
         │                       MPU6050 ──────────────┘
         └──────────────────────────────────────────┘

P = Proportionnel  → Corrige en fonction de l'erreur actuelle
I = Intégral       → Corrige l'erreur accumulée dans le temps
D = Dérivé         → Anticipe et amortit les oscillations
```

## 🎓 Ce que tu vas apprendre

| Compétence | Détail |
|-----------|--------|
| **Algorithme PID** | Le contrôleur le plus utilisé en industrie |
| **MPU6050** | Gyroscope + accéléromètre 6 axes |
| **Filtre complémentaire** | Combiner gyro + accéléro |
| **Réglage PID** | Méthode Ziegler-Nichols |
| **Temps réel** | Boucle de contrôle à 200 Hz |
| **PWM servos** | Contrôle précis de position |

## 📦 Versions disponibles

| Version | Difficulté | Description |
|---------|-----------|-------------|
| **Plateforme Ball-Balancing** | 🟡 Intermédiaire | Maintenir une bille au centre d'un plateau |
| **Gimbal caméra** | 🟡 Intermédiaire | Stabiliser une caméra sur 2 axes |
| **Drone simplifié** | 🔴 Avancé | 4 moteurs, 3 axes de rotation |

👉 Commence par **[le matériel →](./materiel)**
