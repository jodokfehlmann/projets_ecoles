---
id: code
title: Code Arduino — Monitor Solaire
sidebar_label: 💻 Code
---
# 💻 Code Arduino — Monitor Solaire

```cpp title="monitor_solaire.ino"
// ============================================
// Arduino EduKit Algérie — Monitor Solaire
// Version 1.0 — Licence MIT
// ============================================

#include <Wire.h>
#include <Adafruit_INA219.h>
#include <Adafruit_GFX.h>
#include <Adafruit_ILI9341.h>
#include <RTClib.h>
#include <SD.h>

#define TFT_CS 10
#define TFT_DC  9
#define TFT_RST 8
#define SD_CS   4

Adafruit_INA219 ina219;
Adafruit_ILI9341 tft(TFT_CS, TFT_DC, TFT_RST);
RTC_DS3231 rtc;

float tensionV   = 0;
float courantMA  = 0;
float puissanceMW= 0;
float energieWH  = 0;
unsigned long dernieresMesure = 0;
unsigned long derniereEnergie = 0;

void setup() {
  Serial.begin(9600);
  ina219.begin();
  tft.begin(); tft.setRotation(1);
  rtc.begin();
  SD.begin(SD_CS);
  tft.fillScreen(0x0000);
  afficherInterface();
}

void lireCapteur() {
  tensionV    = ina219.getBusVoltage_V();
  courantMA   = ina219.getCurrent_mA();
  if (courantMA < 0) courantMA = 0;  // Pas de courant négatif
  puissanceMW = tensionV * courantMA;

  // Calcul énergie (Wh) = intégration de la puissance dans le temps
  unsigned long maintenant = millis();
  float deltaHeures = (maintenant - derniereEnergie) / 3600000.0;
  energieWH += (puissanceMW / 1000.0) * deltaHeures;
  derniereEnergie = maintenant;
}

void afficherInterface() {
  tft.setTextColor(0xFFFF);
  tft.setTextSize(1);
  tft.setCursor(5, 5);   tft.print("TENSION (V)");
  tft.setCursor(165, 5); tft.print("COURANT (mA)");
  tft.setCursor(5, 85);  tft.print("PUISSANCE (mW)");
  tft.setCursor(165, 85);tft.print("ENERGIE (Wh)");
  tft.drawFastHLine(0, 170, 320, 0x07FF);
  tft.setCursor(5, 175); tft.print("Heure");
  tft.setCursor(165, 175);tft.print("Enreg. SD");
}

void mettreAJour() {
  // Effacer les valeurs précédentes
  tft.fillRect(5, 20, 155, 55, 0x0000);
  tft.fillRect(165, 20, 155, 55, 0x0000);
  tft.fillRect(5, 100, 155, 55, 0x0000);
  tft.fillRect(165, 100, 155, 55, 0x0000);
  tft.fillRect(5, 185, 310, 30, 0x0000);

  uint16_t couleur = (tensionV > 4.5) ? 0x07E0 : (tensionV > 3.0) ? 0xFFE0 : 0xF800;
  tft.setTextColor(couleur); tft.setTextSize(3);
  tft.setCursor(5, 25);   tft.print(tensionV, 2); tft.print("V");
  tft.setTextColor(0xFFFF);
  tft.setCursor(165, 25); tft.print(courantMA, 1); tft.print("mA");
  tft.setCursor(5, 105);  tft.print(puissanceMW, 1); tft.print("mW");
  tft.setTextColor(0xFFE0);
  tft.setCursor(165, 105);tft.print(energieWH, 3); tft.print("Wh");

  DateTime now = rtc.now();
  tft.setTextColor(0xFFFF); tft.setTextSize(2);
  tft.setCursor(5, 187);
  char buf[9]; sprintf(buf, "%02d:%02d:%02d", now.hour(), now.minute(), now.second());
  tft.print(buf);
}

void enregistrerSD() {
  DateTime now = rtc.now();
  File f = SD.open("solaire.csv", FILE_WRITE);
  if (f) {
    char date[20];
    sprintf(date, "%04d-%02d-%02d,%02d:%02d", now.year(), now.month(), now.day(), now.hour(), now.minute());
    f.print(date); f.print(",");
    f.print(tensionV, 3); f.print(",");
    f.print(courantMA, 2); f.print(",");
    f.print(puissanceMW, 2); f.print(",");
    f.println(energieWH, 4);
    f.close();
    tft.setTextColor(0x07E0); tft.setTextSize(2);
    tft.setCursor(165, 187); tft.print("OK");
  }
}

void loop() {
  if (millis() - dernieresMesure >= 30000) {  // Toutes les 30 secondes
    dernieresMesure = millis();
    lireCapteur();
    mettreAJour();
    enregistrerSD();
    Serial.print(tensionV); Serial.print("V ");
    Serial.print(courantMA); Serial.print("mA ");
    Serial.print(puissanceMW); Serial.println("mW");
  }
}
```

✅ **Code chargé !** → Passe aux **[exercices →](./exercices)**
