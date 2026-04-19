---
id: exercices
title: Exercices — Qualité de l'Air
sidebar_label: 📝 Exercices
---
# 📝 Exercices — Moniteur Qualité de l'Air

## 🟢 Niveau 1 — Débutant

### Exercice 1.1 — Expérience en classe
Installe le moniteur dans la classe. Enregistre la qualité de l'air :
- À l'ouverture (classe vide)
- Après 30 minutes avec 30 élèves, fenêtres fermées
- Juste après avoir ouvert les fenêtres 5 minutes

**Question :** De combien la valeur MQ135 augmente-t-elle avec les élèves ?

### Exercice 1.2 — Sources de pollution
Approche doucement (à 30cm) différentes sources :
- Désodorisant en spray
- Marqueur permanent ouvert
- Cuisine (vapeur de cuisson)
- Tabac (ne pas inhaler !)

Note les valeurs et classe par ordre de dangerosité.

### Exercice 1.3 — Changer les seuils
Modifie `SEUIL_BON` et `SEUIL_MOYEN` selon tes mesures de calibration. La LED verte doit s'allumer à l'air frais extérieur.

---

## 🟡 Niveau 2 — Intermédiaire

### Exercice 2.1 — Enregistrement SD
Ajoute un module SD et enregistre toutes les mesures dans un fichier CSV avec horodatage RTC. Analyse les données dans Excel le lendemain.

### Exercice 2.2 — Comparaison multi-salles
Fabrique 3 moniteurs et installe-les dans :
- La classe
- La bibliothèque
- La salle de sport
Laquelle a la meilleure qualité d'air ? Pourquoi ?

### Exercice 2.3 — Ventilation automatique
Ajoute un petit ventilateur (via relais). Quand la qualité devient mauvaise, le ventilateur démarre automatiquement.

---

## 🔴 Niveau 3 — Avancé

### Exercice 3.1 — Indice AQI (Air Quality Index)
Implémenter le calcul de l'**indice AQI** officiel utilisé par les météorologues :
```
AQI = f(concentration_PM2.5, concentration_CO2, ...)
```
Affiche l'AQI sur l'OLED avec les catégories officielles (Bon, Modéré, Mauvais pour la santé...).

### Exercice 3.2 — Rapport automatique par email
Avec un ESP8266 WiFi, envoie un rapport quotidien par email avec les statistiques de la journée (min, max, moyenne, heures critiques).

### Exercice 3.3 — Réseau de capteurs LoRa
Utilise des modules **LoRa SX1276** pour créer un réseau de capteurs couvrant toute l'école, sans WiFi. Une station centrale agrège toutes les données.

---

## 🏆 Défi Final — Rapport environnemental

Après 1 semaine de mesures dans différentes pièces, produis un **rapport environnemental de l'école** avec :
- Cartographie de la qualité de l'air par salle
- Heures critiques (quand aérer ?)
- Recommandations concrètes pour améliorer la qualité de l'air
- Présentation au directeur de l'école

Ce rapport peut avoir un **vrai impact** sur la santé des élèves et des professeurs ! 🌱
