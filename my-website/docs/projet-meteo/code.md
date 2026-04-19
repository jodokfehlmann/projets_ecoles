---
id: code
title: Code Arduino — Station Météo
sidebar_label: 💻 Code
---

# 💻 Code Arduino — Station Météo

## Bibliothèques nécessaires

| Bibliothèque | Auteur | Installation |
|-------------|--------|-------------|
| `DHT sensor library` | Adafruit | Gestionnaire de bibliothèques |
| `Adafruit BMP280` | Adafruit | Gestionnaire de bibliothèques |
| `Adafruit GFX` | Adafruit | Gestionnaire de bibliothèques |
| `Adafruit ILI9341` | Adafruit | Gestionnaire de bibliothèques |
| `RTClib` | Adafruit | Gestionnaire de bibliothèques |
| `SD` | Arduino | Déjà incluse |

---

## Code complet commenté

```cpp title="station_meteo.ino"
// ============================================
// Arduino EduKit Algérie — Station Météo
// Version 1.0 — Licence MIT
// ============================================

#include <DHT.h>
#include <Adafruit_BMP280.h>
#include <Adafruit_GFX.h>
#include <Adafruit_ILI9341.h>
#include <RTClib.h>
#include <SD.h>
#include <SPI.h>

// === BROCHES ===
#define PIN_DHT      2
#define PIN_UV       A0
#define PIN_UV_REF   A1   // Relier à 3.3V pour référence
#define TFT_CS       10
#define TFT_DC       9
#define TFT_RST      8
#define SD_CS        4

// === PARAMÈTRES ===
#define INTERVALLE_MESURE  60000  // 1 mesure par minute (ms)
#define NOM_FICHIER        "meteo.csv"

// === OBJETS ===
DHT dht(PIN_DHT, DHT22);
Adafruit_BMP280 bmp;
Adafruit_ILI9341 tft(TFT_CS, TFT_DC, TFT_RST);
RTC_DS3231 rtc;

// === COULEURS TFT (RGB565) ===
#define BLEU_FOND    0x001F
#define BLANC        0xFFFF
#define JAUNE        0xFFE0
#define VERT         0x07E0
#define ROUGE        0xF800
#define CYAN         0x07FF
#define ORANGE       0xFD20

// === VARIABLES ===
float temperature = 0, humidite = 0, pression = 0, uv = 0;
unsigned long derniereMesure = 0;
bool sdPresente = false;

// ============================================
// FONCTIONS CAPTEURS
// ============================================

/**
 * Lire tous les capteurs et mettre à jour les variables globales
 */
void lireCapteurs() {
  // DHT22 : température et humidité de l'air
  float t = dht.readTemperature();
  float h = dht.readHumidity();
  if (!isnan(t)) temperature = t;
  if (!isnan(h)) humidite    = h;

  // BMP280 : pression atmosphérique
  pression = bmp.readPressure() / 100.0;  // Convertir Pa → hPa

  // ML8511 : index UV
  // Formule officielle du datasheet ML8511
  float uvVoltage = analogRead(PIN_UV) * (3.3 / 1023.0);
  float refVoltage = 3.3;
  uv = mapFloat(uvVoltage, 0.99, 2.9, 0.0, 15.0);
  uv = constrain(uv, 0, 15);
}

float mapFloat(float x, float in_min, float in_max, float out_min, float out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

// ============================================
// FONCTIONS AFFICHAGE TFT
// ============================================

/**
 * Dessiner l'interface principale (appelé une fois au démarrage)
 */
void dessinerInterface() {
  tft.fillScreen(BLEU_FOND);

  // Titre
  tft.setTextColor(BLANC);
  tft.setTextSize(2);
  tft.setCursor(10, 5);
  tft.print("Station Meteo EduKit");

  // Ligne de séparation
  tft.drawFastHLine(0, 25, 320, CYAN);

  // Labels fixes
  tft.setTextSize(1);
  tft.setTextColor(CYAN);
  tft.setCursor(10, 35);  tft.print("TEMPERATURE");
  tft.setCursor(170, 35); tft.print("HUMIDITE");
  tft.setCursor(10, 115); tft.print("PRESSION");
  tft.setCursor(170, 115);tft.print("INDEX UV");
  tft.setCursor(10, 195); tft.print("HEURE");
  tft.setCursor(170, 195);tft.print("STATUT SD");

  // Ligne séparation bas
  tft.drawFastHLine(0, 190, 320, CYAN);
}

/**
 * Mettre à jour uniquement les valeurs (sans redessiner toute l'interface)
 */
void mettreAJourAffichage() {
  // Effacer les anciennes valeurs (rectangles noirs)
  tft.fillRect(10, 50, 150, 60, BLEU_FOND);
  tft.fillRect(170, 50, 150, 60, BLEU_FOND);
  tft.fillRect(10, 130, 150, 55, BLEU_FOND);
  tft.fillRect(170, 130, 150, 55, BLEU_FOND);
  tft.fillRect(10, 205, 150, 25, BLEU_FOND);
  tft.fillRect(170, 205, 150, 25, BLEU_FOND);

  // Température avec couleur selon valeur
  uint16_t couleurTemp = (temperature > 35) ? ROUGE : (temperature < 15) ? CYAN : VERT;
  tft.setTextColor(couleurTemp);
  tft.setTextSize(3);
  tft.setCursor(10, 55);
  tft.print(temperature, 1);
  tft.setTextSize(2);
  tft.print(" C");

  // Humidité
  tft.setTextColor(BLANC);
  tft.setTextSize(3);
  tft.setCursor(170, 55);
  tft.print((int)humidite);
  tft.setTextSize(2);
  tft.print(" %");

  // Pression
  tft.setTextColor(JAUNE);
  tft.setTextSize(2);
  tft.setCursor(10, 135);
  tft.print(pression, 1);
  tft.print(" hPa");

  // Index UV avec couleur danger
  uint16_t couleurUV = (uv > 8) ? ROUGE : (uv > 5) ? ORANGE : VERT;
  tft.setTextColor(couleurUV);
  tft.setTextSize(3);
  tft.setCursor(170, 135);
  tft.print(uv, 1);

  // Heure depuis RTC
  DateTime now = rtc.now();
  tft.setTextColor(BLANC);
  tft.setTextSize(2);
  tft.setCursor(10, 207);
  if (now.hour() < 10) tft.print("0");
  tft.print(now.hour()); tft.print(":");
  if (now.minute() < 10) tft.print("0");
  tft.print(now.minute()); tft.print(":");
  if (now.second() < 10) tft.print("0");
  tft.print(now.second());

  // Statut SD
  tft.setTextColor(sdPresente ? VERT : ROUGE);
  tft.setCursor(170, 207);
  tft.print(sdPresente ? "OK - LOG" : "ABSENT");
}

// ============================================
// ENREGISTREMENT SD
// ============================================

/**
 * Écrire une ligne de données dans le fichier CSV
 */
void enregistrerSD() {
  if (!sdPresente) return;

  DateTime now = rtc.now();
  File fichier = SD.open(NOM_FICHIER, FILE_WRITE);

  if (fichier) {
    // Format : date,heure,temp,hum,pression,uv
    fichier.print(now.year()); fichier.print("-");
    if (now.month() < 10) fichier.print("0");
    fichier.print(now.month()); fichier.print("-");
    if (now.day() < 10) fichier.print("0");
    fichier.print(now.day()); fichier.print(",");

    if (now.hour() < 10) fichier.print("0");
    fichier.print(now.hour()); fichier.print(":");
    if (now.minute() < 10) fichier.print("0");
    fichier.print(now.minute()); fichier.print(",");

    fichier.print(temperature, 1); fichier.print(",");
    fichier.print(humidite, 1); fichier.print(",");
    fichier.print(pression, 1); fichier.print(",");
    fichier.println(uv, 1);

    fichier.close();
    Serial.println("Données enregistrées sur SD");
  }
}

/**
 * Créer l'en-tête CSV (une seule fois au premier démarrage)
 */
void creerEnTeteCSV() {
  if (!SD.exists(NOM_FICHIER)) {
    File fichier = SD.open(NOM_FICHIER, FILE_WRITE);
    if (fichier) {
      fichier.println("Date,Heure,Temperature_C,Humidite_%,Pression_hPa,UV_Index");
      fichier.close();
      Serial.println("Fichier CSV créé avec en-tête");
    }
  }
}

// ============================================
// SETUP & LOOP
// ============================================

void setup() {
  Serial.begin(9600);
  Serial.println("=== Station Météo Arduino EduKit ===");

  // Initialiser l'écran TFT
  tft.begin();
  tft.setRotation(1);  // Paysage
  tft.fillScreen(BLEU_FOND);
  tft.setTextColor(BLANC);
  tft.setTextSize(2);
  tft.setCursor(10, 100);
  tft.println("Initialisation...");

  // Initialiser les capteurs
  dht.begin();

  if (!bmp.begin(0x76)) {
    Serial.println("ERREUR: BMP280 non trouvé !");
    tft.setTextColor(ROUGE);
    tft.println("ERREUR BMP280!");
  }

  if (!rtc.begin()) {
    Serial.println("ERREUR: RTC non trouvé !");
  } else {
    // Décommente la ligne suivante UNIQUEMENT pour régler l'heure (une seule fois) :
    // rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
  }

  // Initialiser la carte SD
  if (SD.begin(SD_CS)) {
    sdPresente = true;
    creerEnTeteCSV();
    Serial.println("Carte SD OK");
  } else {
    Serial.println("Carte SD non trouvée - données non enregistrées");
  }

  // Première mesure immédiate
  lireCapteurs();
  dessinerInterface();
  mettreAJourAffichage();
  enregistrerSD();

  derniereMesure = millis();
  Serial.println("Système prêt !");
}

void loop() {
  // Mesure selon l'intervalle
  if (millis() - derniereMesure >= INTERVALLE_MESURE) {
    derniereMesure = millis();
    lireCapteurs();
    mettreAJourAffichage();
    enregistrerSD();

    // Afficher aussi dans le moniteur série
    Serial.print("T="); Serial.print(temperature);
    Serial.print("°C H="); Serial.print(humidite);
    Serial.print("% P="); Serial.print(pression);
    Serial.print("hPa UV="); Serial.println(uv);
  }
}
```

---

## 📊 Analyser les données avec Excel

1. Retire la carte SD de la station
2. Insère-la dans ton ordinateur
3. Ouvre `meteo.csv` avec Excel ou LibreOffice Calc
4. Sélectionne les colonnes → Insertion → Graphique en courbes
5. Tu peux voir l'évolution de la température sur la journée !

---

✅ **Code chargé !** → Passe aux **[exercices →](./exercices)**
