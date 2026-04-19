---
id: code
title: Code Arduino — Qualité de l'Air
sidebar_label: 💻 Code
---
# 💻 Code Arduino — Moniteur Qualité de l'Air

```cpp title="qualite_air.ino"
// ============================================
// Arduino EduKit Algérie — Moniteur Qualité de l'Air
// Version 1.0 — Licence MIT
// ============================================

#include <Wire.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_GFX.h>
#include <DHT.h>

// === BROCHES ===
#define MQ135_PIN    A0
#define GP2Y_LED     2
#define GP2Y_OUT     A1
#define DHT_PIN      3
#define LED_ROUGE    4
#define LED_JAUNE    5
#define LED_VERTE    6
#define BUZZER       7

// === SEUILS DE QUALITÉ ===
#define SEUIL_BON      300   // Valeur brute MQ135 (calibrer !)
#define SEUIL_MOYEN    600
// Au-dessus de SEUIL_MOYEN = mauvais

// === PARAMÈTRES GP2Y1010 ===
#define GP2Y_DELAI_LED    280  // µs : délai avant lecture après allumage LED
#define GP2Y_DELAI_ECHANT 40   // µs : durée de l'échantillon
#define GP2Y_DELAI_TOTAL  10000 // µs : période totale

// === OBJETS ===
Adafruit_SSD1306 oled(128, 64, &Wire, -1);
DHT dht(DHT_PIN, DHT22);

// === VARIABLES ===
int valeurMQ   = 0;
float densitePoussiere = 0;
float temperature = 0, humidite = 0;
String qualite = "";

// ============================================
// FONCTIONS CAPTEURS
// ============================================

int lireMQ135() {
  return analogRead(MQ135_PIN);
}

float lireGP2Y() {
  // Séquence de lecture précise du GP2Y1010
  digitalWrite(GP2Y_LED, LOW);   // Allumer LED IR
  delayMicroseconds(GP2Y_DELAI_LED);
  float voMesure = analogRead(GP2Y_OUT);  // Lire
  delayMicroseconds(GP2Y_DELAI_ECHANT);
  digitalWrite(GP2Y_LED, HIGH);  // Éteindre LED IR
  delayMicroseconds(GP2Y_DELAI_TOTAL - GP2Y_DELAI_LED - GP2Y_DELAI_ECHANT);

  // Convertir en densité (mg/m³)
  float voltage = voMesure * (5.0 / 1024.0);
  float densite = 0.17 * voltage - 0.1;
  return max(densite, 0.0);
}

String evaluerQualite(int mq) {
  if (mq < SEUIL_BON)   return "EXCELLENT";
  if (mq < SEUIL_MOYEN) return "MOYEN";
  return "MAUVAIS!";
}

// ============================================
// FONCTIONS AFFICHAGE ET ALERTE
// ============================================

void mettreAJourLEDs(String q) {
  digitalWrite(LED_ROUGE, LOW);
  digitalWrite(LED_JAUNE, LOW);
  digitalWrite(LED_VERTE, LOW);
  noTone(BUZZER);

  if (q == "EXCELLENT") {
    digitalWrite(LED_VERTE, HIGH);
  } else if (q == "MOYEN") {
    digitalWrite(LED_JAUNE, HIGH);
  } else {
    digitalWrite(LED_ROUGE, HIGH);
    tone(BUZZER, 1500, 500);  // Alarme !
  }
}

void afficherOLED() {
  oled.clearDisplay();
  oled.setTextSize(1);
  oled.setTextColor(WHITE);

  // Titre
  oled.setCursor(0, 0);
  oled.print("== Qualite Air ==");
  oled.drawFastHLine(0, 10, 128, WHITE);

  // Valeur MQ135
  oled.setCursor(0, 14);
  oled.print("CO2/Gaz: ");
  oled.print(valeurMQ);

  // Particules
  oled.setCursor(0, 26);
  oled.print("PM2.5:   ");
  oled.print(densitePoussiere, 2);
  oled.print(" mg/m3");

  // Température et humidité
  oled.setCursor(0, 38);
  oled.print("T:");
  oled.print(temperature, 1);
  oled.print("C H:");
  oled.print((int)humidite);
  oled.print("%");

  // Qualité globale (grande)
  oled.setCursor(0, 52);
  oled.setTextSize(1);
  oled.print("Etat: ");
  oled.setTextSize(1);
  if (qualite == "EXCELLENT") oled.print("BON :)");
  else if (qualite == "MOYEN") oled.print("MOYEN :/");
  else oled.print("AEREZ !!!");

  oled.display();
}

// ============================================
// SETUP & LOOP
// ============================================

void setup() {
  Serial.begin(9600);
  dht.begin();
  pinMode(GP2Y_LED, OUTPUT);
  digitalWrite(GP2Y_LED, HIGH);  // LED éteinte au repos
  pinMode(LED_ROUGE, OUTPUT);
  pinMode(LED_JAUNE, OUTPUT);
  pinMode(LED_VERTE, OUTPUT);
  pinMode(BUZZER, OUTPUT);

  // Initialiser OLED
  if (!oled.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println("ERREUR: OLED non trouvé !");
  }
  oled.clearDisplay();
  oled.setTextColor(WHITE);
  oled.setCursor(10, 20);
  oled.setTextSize(2);
  oled.print("EduKit");
  oled.setCursor(5, 42);
  oled.setTextSize(1);
  oled.print("Qualite de l'Air");
  oled.display();
  delay(2000);

  Serial.println("=== Moniteur Qualité de l'Air prêt ===");
  Serial.println("Préchauffage MQ-135 (30s pour mesures stables)...");
}

void loop() {
  // Lire tous les capteurs
  valeurMQ = lireMQ135();
  densitePoussiere = lireGP2Y();
  temperature = dht.readTemperature();
  humidite    = dht.readHumidity();
  qualite     = evaluerQualite(valeurMQ);

  // Afficher et alerter
  mettreAJourLEDs(qualite);
  afficherOLED();

  // Moniteur série
  Serial.print("MQ135="); Serial.print(valeurMQ);
  Serial.print(" PM2.5="); Serial.print(densitePoussiere, 2);
  Serial.print("mg/m3 T="); Serial.print(temperature);
  Serial.print("C H="); Serial.print(humidite);
  Serial.print("% Qualite="); Serial.println(qualite);

  delay(5000);  // Mesure toutes les 5 secondes
}
```

---

## 📊 Calibration du MQ-135

Le MQ-135 donne des valeurs brutes (0–1023). Pour les convertir en ppm réels :

```cpp
// Après 24h de préchauffage, à l'air frais extérieur :
// Note la valeur brute → c'est ta "valeur de référence" (≈ 400 ppm CO₂ ambiant)
// Ajuste SEUIL_BON et SEUIL_MOYEN en conséquence
```

✅ **Code chargé !** → Passe aux **[exercices →](./exercices)**
