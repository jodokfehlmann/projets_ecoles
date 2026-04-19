---
id: exercices
title: Exercices — Irrigation Intelligente
sidebar_label: 📝 Exercices
---

# 📝 Exercices & Défis — Irrigation Intelligente

---

## 🟢 Niveau 1 — Débutant

### Exercice 1.1 — Comprendre les valeurs analogiques

Lance le code de calibration et note dans un tableau :

| État | Valeur capteur 1 | Valeur capteur 2 |
|------|-----------------|-----------------|
| En l'air (sec) | ??? | ??? |
| Terre sèche | ??? | ??? |
| Terre humide | ??? | ??? |
| Dans l'eau | ??? | ??? |

**Questions :**
1. Pourquoi la valeur **diminue** quand l'humidité augmente ?
2. Quelle est la plage de variation de ton capteur ?
3. À quelle valeur brute correspond 35% d'humidité selon ta calibration ?

---

### Exercice 1.2 — Tester le relais

```cpp
// Contrôle manuel du relais via le moniteur série
// Tape '1' pour activer, '0' pour désactiver
void loop() {
  if (Serial.available()) {
    char c = Serial.read();
    if (c == '1') {
      digitalWrite(PIN_RELAIS_1, LOW);
      Serial.println("Vanne OUVERTE");
    } else if (c == '0') {
      digitalWrite(PIN_RELAIS_1, HIGH);
      Serial.println("Vanne FERMÉE");
    }
  }
}
```

Ajoute ce code dans ton programme et teste l'ouverture/fermeture manuelle de la vanne.

---

### Exercice 1.3 — Modifier les seuils

1. Change `SEUIL_HUMIDITE` à **20%** — que se passe-t-il ?
2. Change à **80%** — que se passe-t-il ?
3. Quel serait le seuil idéal pour des tomates ? Cherche sur internet !

---

## 🟡 Niveau 2 — Intermédiaire

### Exercice 2.1 — Arrosage par horaire

Au lieu d'arroser selon l'humidité seulement, ajoute un arrosage forcé chaque matin à 7h00.

Pour cela, il te faut un **module RTC DS3231** (non inclus dans le kit de base, disponible séparément).

```cpp
#include <RTClib.h>
RTC_DS3231 rtc;

void setup() {
  rtc.begin();
  // Régler l'heure (une seule fois) :
  // rtc.adjust(DateTime(2026, 4, 19, 7, 0, 0));
}

void loop() {
  DateTime now = rtc.now();
  
  // Arroser à 7h00 pendant 30 secondes
  if (now.hour() == 7 && now.minute() == 0 && now.second() == 0) {
    arroserZone(1, 30);
    arroserZone(2, 30);
  }
  
  // ... reste du code normal
}
```

**Défi :** Ajoute aussi un arrosage du soir à **18h30**.

---

### Exercice 2.2 — Économie d'eau

Modifie le système pour calculer et afficher la consommation d'eau :

```cpp
// Débit de la vanne : environ 2 litres par minute
const float DEBIT_LPM = 2.0;

float eauTotale = 0;  // Litres consommés au total

void arroserZone(int zone, int secondes) {
  // ... code existant ...
  
  // Calculer l'eau utilisée
  float eauZone = (secondes / 60.0) * DEBIT_LPM;
  eauTotale += eauZone;
  
  Serial.print("Eau utilisée cette fois : ");
  Serial.print(eauZone, 2);
  Serial.println(" L");
  Serial.print("Total depuis démarrage : ");
  Serial.print(eauTotale, 2);
  Serial.println(" L");
}
```

**Question :** Si le système arrose 2 fois par jour pendant 10 secondes, combien de litres consomme-t-il par semaine ?

---

### Exercice 2.3 — Alerte de panne

Détecte quand un capteur est **déconnecté** ou **défaillant** :

```cpp
float lireHumiditeSolSecurise(int broche) {
  float valeur = lireHumiditeSol(broche);
  
  // Si la valeur est hors plage → capteur défaillant
  if (valeur < 0 || valeur > 100) {
    Serial.println("⚠️ ERREUR : Capteur défaillant !");
    lcd.clear();
    lcd.print("ERREUR CAPTEUR!");
    // Ne pas arroser en cas d'erreur
    return -1;
  }
  return valeur;
}
```

**Défi :** Fais clignoter le rétroéclairage du LCD quand une erreur est détectée.

---

## 🔴 Niveau 3 — Avancé

### Exercice 3.1 — Interface web avec ESP8266

Remplace l'Arduino Uno par un **Arduino Uno WiFi** ou ajoute un module **ESP8266** pour créer une interface web accessible depuis n'importe quel téléphone sur le réseau de l'école.

```cpp
#include <ESP8266WebServer.h>
ESP8266WebServer server(80);

void handleRoot() {
  String html = "<html><body>";
  html += "<h1>🌱 Irrigation EduKit</h1>";
  html += "<p>Zone A : " + String(humidite1) + "% </p>";
  html += "<p>Zone B : " + String(humidite2) + "% </p>";
  html += "<p>Température : " + String(tempAir) + "°C</p>";
  html += "<form action='/arroser'>";
  html += "<button name='zone' value='1'>💧 Arroser Zone A</button>";
  html += "<button name='zone' value='2'>💧 Arroser Zone B</button>";
  html += "</form></body></html>";
  server.send(200, "text/html", html);
}

void setup() {
  WiFi.begin("NomDuWiFiEcole", "MotDePasse");
  server.on("/", handleRoot);
  server.on("/arroser", handleArrosage);
  server.begin();
}

void loop() {
  server.handleClient();
  // ... reste du code ...
}
```

---

### Exercice 3.2 — Enregistrement des données sur SD

Enregistre toutes les mesures sur une **carte SD** pour analyser les données avec Excel :

```cpp
#include <SD.h>
File fichierLog;

void enregistrerMesure() {
  fichierLog = SD.open("log.csv", FILE_WRITE);
  if (fichierLog) {
    // Format CSV : heure,hum1,hum2,temp,hum_air
    fichierLog.print(millis() / 1000);  fichierLog.print(",");
    fichierLog.print(humidite1);        fichierLog.print(",");
    fichierLog.print(humidite2);        fichierLog.print(",");
    fichierLog.print(tempAir);          fichierLog.print(",");
    fichierLog.println(humAir);
    fichierLog.close();
  }
}
```

**Analyse avec Excel :**
1. Ouvre `log.csv` dans Excel
2. Crée un graphique de l'humidité du sol sur 24h
3. Identifie les heures où l'arrosage se déclenche
4. Compare l'évaporation par temps chaud vs temps frais

---

### Exercice 3.3 — Système multi-zones complet

Étends le système à **4 zones** avec des seuils différents par zone :

```cpp
// Configuration par zone
struct Zone {
  int brocheCapteur;   // Broche du capteur
  int brocheRelais;    // Broche du relais
  int seuil;           // Seuil d'arrosage (%)
  int duree;           // Durée d'arrosage (s)
  String nom;          // Nom de la zone
};

Zone zones[] = {
  {A0, 3, 35, 10, "Fleurs"},     // Zone 1 : Fleurs
  {A1, 4, 45, 15, "Légumes"},    // Zone 2 : Légumes
  {A2, 5, 25, 8,  "Cactus"},     // Zone 3 : Cactus (nécessite une carte Mega !)
  {A3, 6, 55, 20, "Gazon"},      // Zone 4 : Gazon
};

void loop() {
  for (int i = 0; i < 4; i++) {
    float h = lireHumiditeSol(zones[i].brocheCapteur);
    if (h < zones[i].seuil) {
      Serial.print("Zone ");
      Serial.print(zones[i].nom);
      Serial.println(" → Arrosage !");
      arroserZone(zones[i].brocheRelais, zones[i].duree);
    }
  }
}
```

:::info Arduino Mega nécessaire
Pour 4 zones avec 4 relais et 4 capteurs, il te faudra un **Arduino Mega** qui a plus de broches. Le code est identique !
:::

---

## 🏆 Défi Final — Présentation à l'école

Prépare une **présentation de 5 minutes** pour expliquer ton système :

1. **Problème :** Pourquoi arroser manuellement est inefficace
2. **Solution :** Comment fonctionne ton système (schéma)
3. **Démonstration :** Montre en live le système arroser
4. **Données :** Présente un graphique de consommation d'eau
5. **Amélioration :** Qu'est-ce que tu ferais si tu avais plus de temps ?

**Critères d'évaluation :**
- 🗣️ Clarté de l'explication (3 points)
- 🔧 Fonctionnement du système (4 points)
- 📊 Utilisation des données (2 points)
- 💡 Créativité des améliorations (1 point)
