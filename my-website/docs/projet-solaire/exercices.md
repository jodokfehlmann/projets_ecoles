---
id: exercices
title: Exercices — Monitor Solaire
sidebar_label: 📝 Exercices
---
# 📝 Exercices — Monitor Solaire

## 🟢 Niveau 1 — Débutant

### Exercice 1.1 — Orientation optimale
Teste différents angles du panneau solaire (0°, 30°, 45°, 60°, 90°) et note la puissance produite à chaque angle. Trace un graphique. Quel angle est optimal à ton emplacement ?

### Exercice 1.2 — Impact de l'ombre
Couvre partiellement le panneau avec ta main. Observe comment la puissance chute. À quelle fraction de surface couverte la production devient-elle nulle ?

### Exercice 1.3 — Courbe journalière
Laisse la station fonctionner toute une journée. Récupère les données CSV et trace la courbe de puissance. Identifie les heures de pointe.

---

## 🟡 Niveau 2 — Intermédiaire

### Exercice 2.1 — Efficacité du panneau
Calcule le rendement du panneau solaire :
- Surface du panneau (mesure en cm²)
- Irradiance solaire moyenne en Algérie : 5–7 kWh/m²/jour
- Énergie mesurée vs énergie théorique maximale

```
Rendement (%) = (Puissance_mesurée / (Irradiance × Surface)) × 100
```

### Exercice 2.2 — Suivi automatique du soleil
Ajoute deux LDR (résistances photo) pour détecter la direction du soleil. Un servo oriente le panneau automatiquement vers la lumière maximale.

### Exercice 2.3 — Comparaison saisons
Enregistre des données sur plusieurs semaines. Compare la production en été vs en hiver. Calcule le ratio.

---

## 🔴 Niveau 3 — Avancé

### Exercice 3.1 — Calculateur de rentabilité
Programme un calculateur qui, basé sur la production journalière mesurée, estime :
- Le nombre de mois pour rentabiliser l'investissement
- L'économie en DZD par an sur la facture d'électricité
- Le CO₂ économisé (en kg)

### Exercice 3.2 — Dashboard web solaire
Envoie les données vers une API (Thingspeak ou Adafruit IO) et crée un dashboard web accessible depuis n'importe quel smartphone.

### Exercice 3.3 — Mini-centrale de quartier
Connecte 3 panneaux solaires en parallèle et compare leur production individuelle. Quelle configuration (série/parallèle) maximise la puissance totale ?

---

## 🏆 Défi Final — Rapport énergétique

Après 1 semaine de mesures, produis un rapport complet :
- Production totale en Wh
- Heures de pic solaire
- Estimation pour une surface de 10m² de panneaux
- Combien d'ampoules LED la production pourrait alimenter ?
