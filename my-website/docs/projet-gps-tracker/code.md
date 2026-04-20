---
id: code
title: Code Arduino — GPS Tracker
sidebar_label: 💻 Code
---

# 💻 Code Arduino — GPS Tracker

```cpp title="gps_tracker.ino"
// ============================================
// Arduino EduKit Algérie — GPS Tracker
// Version 1.0 — Licence MIT
// ============================================

#include <TinyGPS++.h>
#include <SoftwareSerial.h>
#include <Wire.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_BMP280.h>
#include <RTClib.h>
#include <SD.h>

// === BROCHES ===
#define GPS_RX      4
#define GPS_TX      5
#define SD_CS       10
#define LED_STATUT  3
#define BTN_WAYPOINT 2

// === OBJETS ===
TinyGPSPlus       gps;
SoftwareSerial    gpsSerial(GPS_RX, GPS_TX);
Adafruit_SSD1306  oled(128, 64, &Wire, -1);
Adafruit_BMP280   bmp;
RTC_DS3231        rtc;

// === VARIABLES ===
String nomFichier  = "";
int    nbPoints    = 0;
int    nbWaypoints = 0;
bool   sdOk        = false;
float  distTotale  = 0;
float  latPrec = 0, lonPrec = 0;
unsigned long dernierEnreg = 0;
#define INTERVALLE_ENREG 5000  // 1 point toutes les 5 secondes

// ============================================
// FORMAT GPX — standard universel de traces GPS
// ============================================

void creerFichierGPX() {
  DateTime now = rtc.now();
  char buf[20];
  sprintf(buf, "TR%02d%02d%02d.gpx", now.day(), now.hour(), now.minute());
  nomFichier = String(buf);

  File f = SD.open(nomFichier, FILE_WRITE);
  if (f) {
    f.println("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
    f.println("<gpx version=\"1.1\" creator=\"Arduino EduKit\">");
    f.println("  <trk><name>Trace EduKit</name><trkseg>");
    f.close();
    sdOk = true;
    Serial.print("Fichier GPX: "); Serial.println(nomFichier);
  }
}

void ajouterPointGPX(float lat, float lon, float alt, DateTime& now) {
  File f = SD.open(nomFichier, FILE_WRITE);
  if (f) {
    char ligne[120];
    sprintf(ligne,
      "    <trkpt lat=\"%.6f\" lon=\"%.6f\"><ele>%.1f</ele>"
      "<time>%04d-%02d-%02dT%02d:%02d:%02dZ</time></trkpt>",
      lat, lon, alt,
      now.year(), now.month(), now.day(),
      now.hour(), now.minute(), now.second()
    );
    f.println(ligne);
    f.close();
    nbPoints++;
  }
}

void ajouterWaypoint(float lat, float lon, int num) {
  File f = SD.open(nomFichier, FILE_WRITE);
  if (f) {
    char ligne[100];
    sprintf(ligne,
      "  <wpt lat=\"%.6f\" lon=\"%.6f\"><name>WP%d</name></wpt>",
      lat, lon, num
    );
    f.println(ligne);
    f.close();
    nbWaypoints++;
  }
}

void fermerFichierGPX() {
  File f = SD.open(nomFichier, FILE_WRITE);
  if (f) {
    f.println("  </trkseg></trk>");
    f.println("</gpx>");
    f.close();
  }
}

// ============================================
// CALCUL DE DISTANCE (Formule Haversine)
// ============================================

float distanceMetres(float lat1, float lon1, float lat2, float lon2) {
  float R = 6371000; // Rayon Terre en mètres
  float dLat = (lat2 - lat1) * PI / 180.0;
  float dLon = (lon2 - lon1) * PI / 180.0;
  float a = sin(dLat/2) * sin(dLat/2) +
            cos(lat1 * PI/180.0) * cos(lat2 * PI/180.0) *
            sin(dLon/2) * sin(dLon/2);
  return R * 2 * atan2(sqrt(a), sqrt(1-a));
}

// ============================================
// AFFICHAGE OLED
// ============================================

void afficherOLED() {
  oled.clearDisplay();
  oled.setTextColor(WHITE);

  if (!gps.location.isValid()) {
    // En attente de fix GPS
    oled.setTextSize(1);
    oled.setCursor(0, 0);  oled.print("Recherche GPS...");
    oled.setCursor(0, 16); oled.print("Satellites: ");
    oled.print(gps.satellites.value());
    oled.setCursor(0, 32); oled.print("Reste dehors");
    oled.setCursor(0, 48); oled.print("vue sur le ciel");
  } else {
    // Fix obtenu — afficher données
    oled.setTextSize(1);

    // Coordonnées
    oled.setCursor(0, 0);
    oled.print("Lat: "); oled.print(gps.location.lat(), 5);
    oled.setCursor(0, 10);
    oled.print("Lon: "); oled.print(gps.location.lng(), 5);

    // Vitesse et altitude
    oled.setCursor(0, 22);
    oled.print("Alt: "); oled.print(bmp.readAltitude(1013.25), 0); oled.print("m");
    oled.setCursor(64, 22);
    oled.print("Vit: "); oled.print(gps.speed.kmph(), 1); oled.print("km/h");

    // Distance totale
    oled.setCursor(0, 34);
    oled.print("Dist: ");
    if (distTotale >= 1000) {
      oled.print(distTotale/1000, 2); oled.print("km");
    } else {
      oled.print(distTotale, 0); oled.print("m");
    }

    // Statut SD et nb points
    oled.setCursor(0, 46);
    oled.print(sdOk ? "SD:OK" : "SD:ERR");
    oled.print(" Pts:"); oled.print(nbPoints);
    oled.print(" WP:"); oled.print(nbWaypoints);

    // Sats
    oled.setCursor(0, 56);
    oled.print("Sats:"); oled.print(gps.satellites.value());
    oled.print(" HDOP:"); oled.print(gps.hdop.value()/100.0, 1);
  }

  oled.display();
}

// ============================================
// SETUP & LOOP
// ============================================

void setup() {
  Serial.begin(115200);
  gpsSerial.begin(9600);
  Wire.begin();

  // OLED
  oled.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  oled.clearDisplay();
  oled.setTextColor(WHITE);
  oled.setTextSize(2);
  oled.setCursor(10, 10); oled.print("GPS");
  oled.setCursor(10, 30); oled.print("Tracker");
  oled.display();
  delay(2000);

  // BMP280 et RTC
  bmp.begin(0x76);
  rtc.begin();

  // Bouton waypoint
  pinMode(BTN_WAYPOINT, INPUT_PULLUP);
  pinMode(LED_STATUT, OUTPUT);

  // SD
  if (SD.begin(SD_CS)) {
    creerFichierGPX();
  } else {
    Serial.println("SD non trouvée !");
  }

  Serial.println("GPS Tracker EduKit prêt !");
}

void loop() {
  // Lire données GPS
  while (gpsSerial.available()) {
    gps.encode(gpsSerial.read());
  }

  // LED clignote = actif, fixe = pas de fix
  if (gps.location.isValid()) {
    digitalWrite(LED_STATUT, (millis() / 500) % 2);
  } else {
    digitalWrite(LED_STATUT, (millis() / 100) % 2); // Clignotement rapide = recherche
  }

  // Enregistrer un point toutes les 5 secondes (si fix GPS)
  if (gps.location.isValid() && millis() - dernierEnreg >= INTERVALLE_ENREG) {
    dernierEnreg = millis();
    float lat = gps.location.lat();
    float lon = gps.location.lng();
    DateTime now = rtc.now();

    // Calculer distance depuis dernier point
    if (latPrec != 0) {
      distTotale += distanceMetres(latPrec, lonPrec, lat, lon);
    }
    latPrec = lat; lonPrec = lon;

    // Enregistrer dans le GPX
    ajouterPointGPX(lat, lon, bmp.readAltitude(1013.25), now);

    Serial.print(lat, 6); Serial.print(",");
    Serial.print(lon, 6); Serial.print(",");
    Serial.println(gps.speed.kmph());
  }

  // Bouton waypoint
  if (digitalRead(BTN_WAYPOINT) == LOW) {
    delay(50); // Anti-rebond
    if (digitalRead(BTN_WAYPOINT) == LOW && gps.location.isValid()) {
      ajouterWaypoint(gps.location.lat(), gps.location.lng(), nbWaypoints + 1);
      // Bip de confirmation (si buzzer connecté sur D6)
      Serial.print("Waypoint "); Serial.print(nbWaypoints); Serial.println(" enregistré !");
      while (digitalRead(BTN_WAYPOINT) == LOW); // Attendre relâchement
    }
  }

  afficherOLED();
  delay(200);
}
```

---

## 📍 Visualiser ta trace sur Google Earth

1. Retire la carte SD du tracker
2. Copie le fichier `.gpx` sur ton ordinateur
3. Ouvre **Google Earth** → Fichier → Ouvrir → sélectionne le `.gpx`
4. Ta trace apparaît en rouge sur la carte !

Ou utilise **GPSVisualizer.com** en ligne — colle le contenu du fichier et génère une carte interactive.

✅ **Code chargé !** → Passe aux **[exercices →](./exercices)**
