---
id: exercices
title: Exercices — GPS Tracker
sidebar_label: 📝 Exercices
---

# 📝 Exercices — GPS Tracker

## 🟢 Niveau 1 — Débutant

### Exercice 1.1 — Premier fix GPS
Sors dehors avec le tracker allumé. Note combien de temps il faut pour obtenir le premier fix GPS (LED clignote lentement). Répète le lendemain — est-ce plus rapide ?

### Exercice 1.2 — Mesure de distance
Trace un carré d'exactement 100 mètres de côté dans la cour de l'école (mesure avec un mètre ruban). Le tracker affiche-t-il 400m de distance totale à la fin ?

### Exercice 1.3 — Marquage de lieux
Utilise les waypoints pour marquer :
- L'entrée de l'école
- La cantine
- La salle de sport

Visualise ensuite les points sur Google Earth. Sont-ils aux bons endroits ?

---

## 🟡 Niveau 2 — Intermédiaire

### Exercice 2.1 — Calculer la vitesse moyenne
Ajoute dans le code le calcul de la vitesse moyenne du trajet :
```cpp
float vitesseMoyenne = (distTotale / 1000.0) / (tempsTotal / 3600000.0); // km/h
```

### Exercice 2.2 — Alarme de zone (Geofence)
Programme une alarme si tu t'éloignes de plus de 500m d'un point de départ défini :
```cpp
float dist = distanceMetres(LAT_BASE, LON_BASE, gps.location.lat(), gps.location.lng());
if (dist > 500) { tone(6, 1000, 500); } // Alarme !
```

### Exercice 2.3 — Comparaison GPS vs baromètre
L'altitude GPS et l'altitude barométrique (BMP280) sont différentes. Trace les deux sur Excel et analyse les différences. Laquelle est plus précise dans différentes conditions ?

---

## 🔴 Niveau 3 — Avancé

### Exercice 3.1 — Navigation vers un point
Programme un "navigateur" qui indique la direction et la distance vers un point cible (comme un geocaching) :

```cpp
float bearingDeg = gps.courseTo(
  gps.location.lat(), gps.location.lng(),
  LAT_CIBLE, LON_CIBLE
);
float distance = gps.distanceBetween(
  gps.location.lat(), gps.location.lng(),
  LAT_CIBLE, LON_CIBLE
);
// Affiche une flèche directionnelle sur l'OLED
```

### Exercice 3.2 — Transmission LoRa
Ajoute un module LoRa pour envoyer la position en temps réel à une station de base. Visualise la progression sur un PC depuis la station.

### Exercice 3.3 — Application web de suivi
Crée un serveur web sur Raspberry Pi qui reçoit les données LoRa et affiche la position sur une carte Leaflet.js en temps réel. Partage le lien avec ta classe pendant la balade !

---

## 🏆 Défi Final — Rallye GPS

**Organisation :**
Organise un rallye GPS pour toute la classe. Chaque équipe reçoit une liste de coordonnées GPS à visiter dans l'ordre. La première équipe à passer par tous les points et à revenir au départ gagne !

**Règle spéciale :** chaque équipe doit avoir un tracker actif — l'enseignant peut vérifier les traces GPX après le rallye pour confirmer que tous les points ont bien été visités !

Bonne aventure ! 🗺️
