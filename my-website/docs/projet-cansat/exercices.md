---
id: exercices
title: Exercices — CanSat
sidebar_label: 📝 Exercices
---

# 📝 Exercices — CanSat

## 🟢 Niveau 1 — Test au sol

### Exercice 1.1 — Test de tous les capteurs
Avant de voler, teste chaque capteur individuellement :
1. BMP280 : monte et descends l'escalier — l'altitude change-t-elle ?
2. MPU6050 : incline dans tous les sens — les accélérations répondent-elles ?
3. GPS : attends le fix GPS dehors (peut prendre 2–5 min)
4. LoRa : jusqu'à quelle distance reçois-tu les paquets ?

### Exercice 1.2 — Simulation de vol
Simule un vol depuis un immeuble :
1. Allume le CanSat au sol (calibration)
2. Monte au 5ème étage avec le CanSat
3. La station sol reçoit-elle les données en temps réel ?
4. Le GPS montre-t-il ta position ?

### Exercice 1.3 — Test du parachute
Test de l'éjection du parachute depuis une fenêtre du 2ème étage :
- Le parachute s'ouvre-t-il avant l'impact ?
- Le CanSat est-il intact après l'atterrissage ?
- Mesure la vitesse réelle avec le baromètre

---

## 🟡 Niveau 2 — Analyse des données

### Exercice 2.1 — Tracer la trajectoire
Récupère les données CSV de la carte SD et trace avec Python :
```python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('vol.csv')

fig, axes = plt.subplots(2, 2, figsize=(12, 8))
axes[0,0].plot(df['temps_ms']/1000, df['altitude_m'])
axes[0,0].set_title('Altitude vs Temps')
axes[0,1].plot(df['temps_ms']/1000, df['accelZ'])
axes[0,1].set_title('Accélération verticale')
# ... etc.
plt.show()
```

### Exercice 2.2 — Calculer la vitesse de descente réelle
À partir des données d'altitude, calcule :
- La vitesse de descente moyenne (m/s)
- La vitesse maximale (apogée)
- Comparer avec la vitesse théorique calculée pour ton parachute

### Exercice 2.3 — Carte de vol
Utilise les coordonnées GPS pour tracer la trajectoire sur une carte :
```python
import folium
m = folium.Map(location=[lat_depart, lon_depart], zoom_start=16)
folium.PolyLine(list(zip(df['lat'], df['lon'])), color='red').add_to(m)
m.save('trajectoire.html')
```

---

## 🔴 Niveau 3 — Mission scientifique

### Exercice 3.1 — Mesure du gradient de température
L'atmosphère se refroidit d'environ 6.5°C par 1000m (gradient adiabatique). Vérifie cette valeur avec tes mesures :
- Trace température vs altitude
- Calcule le gradient mesuré
- Compare avec la valeur théorique

### Exercice 3.2 — Détection d'apogée automatique
Améliore l'algorithme de détection d'apogée pour qu'il soit plus robuste (filtrage du bruit barométrique) :
```cpp
// Filtre passe-bas sur la vitesse verticale
float vitesseFiltree = 0.8 * vitesseFiltree + 0.2 * vitesseBrute;
if (vitesseFiltree < -1.0 && altitude > 20) { /* éjecter */ }
```

### Exercice 3.3 — Mission secondaire
Ajoute un capteur supplémentaire de ton choix :
- Capteur UV (mesure le rayonnement en altitude)
- Capteur de poussière (qualité de l'air en altitude)
- Caméra (photo à l'apogée)

---

## 🏆 Défi Final — Vol réel

**Prérequis de sécurité :**
- [ ] Permission du terrain (champ ouvert, loin des habitations)
- [ ] Fusée commerciale certifiée (Estes, Klima)
- [ ] Adulte responsable présent
- [ ] Conditions météo : vent < 10 km/h, ciel clair
- [ ] Tous les tests au sol réussis

**Mission :**
1. Lancer le CanSat à ~50–100m d'altitude
2. Récupérer toutes les données en temps réel
3. Analyser les données après vol
4. Rédiger un rapport de mission complet

**Rapport de mission doit inclure :**
- Altitude maximale atteinte
- Vitesse de descente mesurée
- Gradient de température
- Carte de trajectoire GPS
- Analyse des accélérations au lancement

Bonne chance, futur astronaute ! 🚀🇩🇿