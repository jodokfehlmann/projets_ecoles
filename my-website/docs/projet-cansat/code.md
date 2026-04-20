---
id: code
title: Code Arduino — CanSat
sidebar_label: 💻 Code
---

# 💻 Code Arduino — CanSat

## Bibliothèques nécessaires

| Bibliothèque | Usage |
|-------------|-------|
| `Adafruit BMP280` | Pression et altitude |
| `MPU6050` | Accéléromètre et gyroscope |
| `TinyGPS++` | Décodage GPS NMEA |
| `RadioHead (RH_RF95)` | Communication LoRa |
| `SD` | Enregistrement données |
| `Servo` | Éjection parachute |

---

## Code Satellite (dans la canette)

```cpp title="cansat_satellite.ino"
// ============================================
// Arduino EduKit Algérie — CanSat Satellite
// Version 1.0 — Licence MIT
// ============================================

#include <Wire.h>
#include <Adafruit_BMP280.h>
#include <MPU6050.h>
#include <TinyGPS++.h>
#include <SoftwareSerial.h>
#include <RH_RF95.h>
#include <SD.h>
#include <Servo.h>

// === CONFIGURATION ===
#define ALTITUDE_LANCEMENT   200   // Altitude de lancement (m) — mesure avant !
#define VITESSE_EJECTION    -2.0   // Vitesse verticale pour éjecter (m/s)
#define INTERVALLE_MESURE    100   // ms entre chaque mesure

// === OBJETS ===
Adafruit_BMP280 bmp;
MPU6050 mpu;
TinyGPSPlus gps;
SoftwareSerial gpsSerial(4, 5);
RH_RF95 lora(10, 2);
Servo servoParachute;

// === VARIABLES ===
float altitudePrecedente = 0;
float altitudeDepart     = 0;
bool parachuteEjecte     = false;
unsigned long tDepart    = 0;
int compteurPaquets      = 0;

struct DonneesVol {
  float altitude;
  float temperature;
  float pression;
  float accelX, accelY, accelZ;
  float vitesseVertical;
  float latitude, longitude;
  unsigned long temps;
};

// ============================================
// FONCTIONS
// ============================================

DonneesVol lireCapteurs() {
  DonneesVol d;
  d.temps = millis() - tDepart;

  // BMP280
  d.pression    = bmp.readPressure() / 100.0;
  d.temperature = bmp.readTemperature();
  d.altitude    = bmp.readAltitude(1013.25) - altitudeDepart;

  // Vitesse verticale (m/s)
  d.vitesseVertical = (d.altitude - altitudePrecedente) / (INTERVALLE_MESURE / 1000.0);
  altitudePrecedente = d.altitude;

  // MPU6050
  int16_t ax, ay, az, gx, gy, gz;
  mpu.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);
  d.accelX = ax / 16384.0;  // Convertir en g
  d.accelY = ay / 16384.0;
  d.accelZ = az / 16384.0;

  // GPS
  while (gpsSerial.available()) gps.encode(gpsSerial.read());
  d.latitude  = gps.location.isValid() ? gps.location.lat() : 0;
  d.longitude = gps.location.isValid() ? gps.location.lng() : 0;

  return d;
}

void transmettreLoRa(DonneesVol& d) {
  char paquet[80];
  snprintf(paquet, sizeof(paquet),
    "%d,%.1f,%.1f,%.1f,%.2f,%.2f,%.2f,%.6f,%.6f",
    compteurPaquets++,
    d.altitude, d.temperature, d.pression,
    d.accelX, d.accelY, d.accelZ,
    d.latitude, d.longitude
  );
  lora.send((uint8_t*)paquet, strlen(paquet));
  lora.waitPacketSent();
}

void enregistrerSD(DonneesVol& d) {
  File f = SD.open("vol.csv", FILE_WRITE);
  if (f) {
    f.print(d.temps); f.print(",");
    f.print(d.altitude, 2); f.print(",");
    f.print(d.temperature, 2); f.print(",");
    f.print(d.pression, 2); f.print(",");
    f.print(d.accelX, 3); f.print(",");
    f.print(d.accelY, 3); f.print(",");
    f.print(d.accelZ, 3); f.print(",");
    f.print(d.latitude, 6); f.print(",");
    f.println(d.longitude, 6);
    f.close();
  }
}

void gererParachute(DonneesVol& d) {
  if (!parachuteEjecte && d.altitude > 10 && d.vitesseVertical < VITESSE_EJECTION) {
    servoParachute.write(90);  // Éjecter !
    parachuteEjecte = true;
    // Bip d'éjection
    for (int i = 0; i < 3; i++) {
      digitalWrite(6, HIGH); delay(100);
      digitalWrite(6, LOW);  delay(100);
    }
  }
}

// ============================================
// SETUP & LOOP
// ============================================

void setup() {
  Serial.begin(9600);
  gpsSerial.begin(9600);
  Wire.begin();

  // Initialisation capteurs
  bmp.begin(0x76);
  mpu.initialize();
  lora.init();
  lora.setFrequency(433.0);
  SD.begin(8);
  servoParachute.attach(9);
  servoParachute.write(0);  // Parachute fermé

  pinMode(3, OUTPUT);  // LED
  pinMode(6, OUTPUT);  // Buzzer

  // Calibration altitude de départ
  delay(1000);
  altitudeDepart = bmp.readAltitude(1013.25);
  tDepart = millis();

  // Créer en-tête CSV
  File f = SD.open("vol.csv", FILE_WRITE);
  if (f) {
    f.println("temps_ms,altitude_m,temp_C,pression_hPa,accelX,accelY,accelZ,lat,lon");
    f.close();
  }

  // Signal prêt : 3 bips
  for (int i = 0; i < 3; i++) {
    tone(6, 1000, 200); delay(300);
  }
  Serial.println("CanSat prêt !");
}

void loop() {
  DonneesVol donnees = lireCapteurs();
  gererParachute(donnees);
  transmettreLoRa(donnees);
  enregistrerSD(donnees);

  // LED clignotante = satellite actif
  digitalWrite(3, (millis() / 500) % 2);

  // Après atterrissage : bip de localisation
  if (parachuteEjecte && abs(donnees.vitesseVertical) < 0.5) {
    tone(6, 880, 200);
  }

  delay(INTERVALLE_MESURE);
}
```

---

## Code Station Sol

```cpp title="cansat_station_sol.ino"
#include <RH_RF95.h>
#include <SPI.h>

RH_RF95 lora(10, 2);

void setup() {
  Serial.begin(115200);
  lora.init();
  lora.setFrequency(433.0);
  Serial.println("paquet,altitude,temp,pression,accelX,accelY,accelZ,lat,lon,RSSI");
}

void loop() {
  if (lora.available()) {
    uint8_t buf[80];
    uint8_t len = sizeof(buf);
    if (lora.recv(buf, &len)) {
      buf[len] = '\0';
      Serial.print((char*)buf);
      Serial.print(",");
      Serial.println(lora.lastRssi());  // Force du signal
    }
  }
}
```

✅ **Code chargé !** → Passe aux **[exercices →](./exercices)**