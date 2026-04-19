---
id: exercices
title: Exercices — Station Météo
sidebar_label: 📝 Exercices
---

# 📝 Exercices — Station Météo

## 🟢 Niveau 1 — Débutant

### Exercice 1.1 — Lire les données en série
Lance le code et ouvre le **Moniteur Série** (Arduino IDE → Outils → Moniteur Série, 9600 bauds). Note dans un tableau les mesures toutes les 5 minutes pendant 30 minutes.

**Questions :**
1. La température change-t-elle quand tu souffles sur le capteur ?
2. Quelle est la différence entre pression au sol et pression en montagne ?
3. Quel index UV as-tu à l'intérieur ? Et dehors en plein soleil ?

---

### Exercice 1.2 — Changer l'intervalle de mesure
Modifie `INTERVALLE_MESURE` pour avoir une mesure toutes les **10 secondes** au lieu d'une minute. Observe comment les données changent plus vite.

```cpp
#define INTERVALLE_MESURE  10000  // 10 secondes
```

**Question :** Combien de lignes ta carte SD va-t-elle accumuler en 1 heure avec ce réglage ?

---

### Exercice 1.3 — Alerte température
Ajoute un buzzer sur la broche D6. Fais-le biper quand la température dépasse **35°C** (utile en été !).

```cpp
if (temperature > 35.0) {
  tone(6, 1000, 500);  // Bip 1 seconde
  delay(1000);
}
```

---

## 🟡 Niveau 2 — Intermédiaire

### Exercice 2.1 — Deuxième page d'affichage
La station affiche actuellement une seule page. Ajoute une **deuxième page** qui s'affiche alternativement toutes les 5 secondes avec un graphique en barres de l'historique de température (garder les 10 dernières valeurs en mémoire).

```cpp
float historique[10];  // Tableau des 10 dernières températures
int indexHisto = 0;

void ajouterHistorique(float t) {
  historique[indexHisto] = t;
  indexHisto = (indexHisto + 1) % 10;  // Circulaire
}

void afficherGraphique() {
  // Dessiner les 10 barres
  for (int i = 0; i < 10; i++) {
    int hauteur = map(historique[i], 0, 50, 0, 80);
    tft.fillRect(10 + i * 30, 160 - hauteur, 25, hauteur, VERT);
  }
}
```

---

### Exercice 2.2 — Indice de confort thermique
Calcule et affiche l'**indice de chaleur** (Heat Index) — la température ressentie qui tient compte de l'humidité. La bibliothèque DHT a cette fonction intégrée !

```cpp
float chaleurRessentie = dht.computeHeatIndex(temperature, humidite, false);
// false = résultat en Celsius
```

**Question :** Quelle est la différence entre température réelle et ressentie quand l'humidité est à 80% ?

---

### Exercice 2.3 — Prévision météo simple
La pression atmosphérique permet de **prévoir le temps** :
- Pression qui monte → beau temps
- Pression qui descend → mauvais temps

Enregistre la pression toutes les heures et compare avec la valeur de l'heure précédente pour afficher une icône météo simple.

```cpp
float pressionPrecedente = 0;

String prevision() {
  float diff = pression - pressionPrecedente;
  if (diff > 0.5)  return "Beau temps :)";
  if (diff < -0.5) return "Pluie possible :(";
  return "Stable";
}
```

---

## 🔴 Niveau 3 — Avancé

### Exercice 3.1 — Station WiFi avec dashboard web
Remplace l'Arduino Uno par un **ESP32** et envoie les données vers un serveur web accessible depuis le réseau de l'école. Utilise la bibliothèque `ESPAsyncWebServer`.

Le dashboard web affiche les données en temps réel avec des graphiques JavaScript (bibliothèque Chart.js chargée depuis CDN).

---

### Exercice 3.2 — Analyse statistique avec Python
Récupère le fichier `meteo.csv` de la carte SD et écris un script Python pour :
1. Calculer la température moyenne, minimale et maximale de la journée
2. Tracer un graphique avec `matplotlib`
3. Identifier les heures les plus chaudes

```python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('meteo.csv')
df['Heure'] = pd.to_datetime(df['Heure'])

plt.figure(figsize=(12, 6))
plt.plot(df['Heure'], df['Temperature_C'], color='red', label='Température')
plt.fill_between(df['Heure'], df['Temperature_C'], alpha=0.3)
plt.title('Température — Station Météo EduKit')
plt.xlabel('Heure'); plt.ylabel('Température (°C)')
plt.legend(); plt.grid(True)
plt.savefig('temperature.png')
plt.show()
```

---

### Exercice 3.3 — Réseau de stations
Connecte **3 stations météo** dans différents endroits de l'école (classe, cour, bibliothèque) via des modules **nRF24L01** (radio 2.4GHz). Une station centrale agrège et affiche toutes les données.

**Défi :** Quelle station est la plus chaude ? Pourquoi ?

---

## 🏆 Défi Final — Rapport météo mensuel

À la fin du mois, analyse les données CSV et crée un **rapport météo** avec :
- Températures min/max/moyenne par jour
- Jour le plus chaud et le plus froid
- Évolution de la pression
- Prédictions pour le mois suivant

Présente ce rapport comme un vrai bulletin météo en classe ! 🌤️
