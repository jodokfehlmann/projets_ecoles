---
id: introduction
title: Station Météo — Introduction
sidebar_label: 📖 Introduction
---

# 🌡️ Projet 3 — Station Météo Professionnelle

<div className="info-grid">
  <div className="info-box"><span className="info-value">🟢</span><span className="info-label">Niveau Débutant</span></div>
  <div className="info-box"><span className="info-value">3–4h</span><span className="info-label">Durée estimée</span></div>
  <div className="info-box"><span className="info-value">12–16</span><span className="info-label">Âge recommandé</span></div>
  <div className="info-box"><span className="info-value">7.000</span><span className="info-label">DZD (prix kit)</span></div>
</div>

---

## 🎯 Objectif du projet

Construire une station météo complète qui mesure **température, humidité, pression atmosphérique et index UV**, affiche tout sur un écran couleur TFT et enregistre les données sur carte SD avec horodatage précis.

:::info Utilité réelle
La station peut rester installée **en permanence dans la classe** et servir de thermomètre intelligent. Les données CSV peuvent être analysées en cours de mathématiques ou de sciences naturelles !
:::

---

## 🎓 Ce que tu vas apprendre

| Compétence | Détail |
|-----------|--------|
| **Capteurs multiples** | Faire travailler plusieurs capteurs ensemble |
| **Protocole I2C** | Communication avec BMP280 et RTC |
| **Protocole SPI** | Communication avec l'écran TFT et la SD |
| **Affichage graphique** | Créer une interface colorée sur TFT |
| **Carte SD** | Sauvegarder les données en format CSV |
| **RTC DS3231** | Horodater chaque mesure avec l'heure exacte |
| **Analyse de données** | Ouvrir et tracer les données dans Excel |

---

## 📋 Vue d'ensemble du système

```
[DHT22]──────────────────┐
[BMP280]─── I2C ─────────┤
[ML8511]─────────────────┤──► Arduino ──► Affichage TFT
[DS3231]─── I2C ─────────┤         │
                          │         └──► Carte SD (CSV)
                          │               ↓
                          │          Excel / Graphiques
```

---

## ✅ Prérequis

- [ ] Kit Station Météo reçu complet
- [ ] Arduino IDE 2.x installé
- [ ] Bibliothèques installées (voir page Code)
- [ ] 3 à 4 heures disponibles

👉 Commence par **[la liste du matériel →](./materiel)**
