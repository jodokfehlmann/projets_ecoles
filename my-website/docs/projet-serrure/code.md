---
id: code
title: Code Arduino — Serrure Intelligente
sidebar_label: 💻 Code
---

# 💻 Code Arduino — Serrure Intelligente

```cpp title="serrure_intelligente.ino"
// ============================================
// Arduino EduKit Algérie — Serrure Intelligente RFID
// Version 1.0 — Licence MIT
// ============================================

#include <SPI.h>
#include <MFRC522.h>
#include <Keypad.h>
#include <LiquidCrystal_I2C.h>
#include <Servo.h>
#include <EEPROM.h>

// === BROCHES ===
#define RST_PIN     9
#define SS_PIN      10
#define SERVO_PIN   1
#define BUZZER      A1
#define LED_VERTE   A2
#define LED_ROUGE   A3

// === PARAMÈTRES ===
#define CODE_PIN        "1234"    // Code PIN par défaut — CHANGE-LE !
#define DUREE_OUVERTURE 3000      // Temps d'ouverture en ms
#define MAX_TENTATIVES  3         // Tentatives avant alarme
#define SERVO_FERME     0         // Angle verrou fermé
#define SERVO_OUVERT    90        // Angle verrou ouvert

// === CLAVIER ===
const byte LIGNES = 4, COLONNES = 4;
char touches[LIGNES][COLONNES] = {
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
};
byte bocheLignes[LIGNES]   = {2, 3, 4, 5};
byte brocheColonnes[COLONNES] = {6, 7, 8, A0};

// === OBJETS ===
MFRC522 rfid(SS_PIN, RST_PIN);
LiquidCrystal_I2C lcd(0x27, 16, 2);
Keypad clavier = Keypad(makeKeymap(touches), bocheLignes, brocheColonnes, LIGNES, COLONNES);
Servo servo;

// === VARIABLES ===
int tentatives = 0;
String saisie = "";
bool enAttenteSaisie = false;

// ============================================
// FONCTIONS
// ============================================

void ouvrir() {
  servo.write(SERVO_OUVERT);
  digitalWrite(LED_VERTE, HIGH);
  tone(BUZZER, 1000, 200);
  lcd.clear();
  lcd.setCursor(0, 0); lcd.print("  ACCES ACCORDE ");
  lcd.setCursor(0, 1); lcd.print("   Bienvenue !  ");
  delay(DUREE_OUVERTURE);
  fermer();
}

void fermer() {
  servo.write(SERVO_FERME);
  digitalWrite(LED_VERTE, LOW);
  tentatives = 0;
  afficherAccueil();
}

void refuser() {
  tentatives++;
  digitalWrite(LED_ROUGE, HIGH);
  tone(BUZZER, 300, 500);
  lcd.clear();
  lcd.setCursor(0, 0); lcd.print("  ACCES REFUSE  ");
  lcd.setCursor(0, 1);
  lcd.print("Tentatives: ");
  lcd.print(tentatives);
  lcd.print("/"); lcd.print(MAX_TENTATIVES);
  delay(1500);
  digitalWrite(LED_ROUGE, LOW);

  if (tentatives >= MAX_TENTATIVES) {
    declencherAlarme();
  } else {
    afficherAccueil();
  }
}

void declencherAlarme() {
  lcd.clear();
  lcd.setCursor(0, 0); lcd.print("!!! ALARME !!!  ");
  lcd.setCursor(0, 1); lcd.print("Trop de tentativ");
  for (int i = 0; i < 10; i++) {
    tone(BUZZER, 2000, 200);
    digitalWrite(LED_ROUGE, HIGH);
    delay(300);
    digitalWrite(LED_ROUGE, LOW);
    delay(200);
  }
  tentatives = 0;
  afficherAccueil();
}

void afficherAccueil() {
  lcd.clear();
  lcd.setCursor(0, 0); lcd.print(" Serrure EduKit ");
  lcd.setCursor(0, 1); lcd.print("Carte ou # code ");
  saisie = "";
  enAttenteSaisie = false;
}

bool verifierCarteRFID(String uid) {
  // Lire les UIDs autorisés depuis l'EEPROM
  // (simplifié : un seul UID stocké en dur pour l'exemple)
  return uid == "A1B2C3D4";  // Remplace par l'UID de ta carte !
}

bool verifierCode(String code) {
  return code == CODE_PIN;
}

// ============================================
// SETUP & LOOP
// ============================================

void setup() {
  Serial.begin(9600);
  SPI.begin();
  rfid.PCD_Init();

  lcd.init();
  lcd.backlight();

  servo.attach(SERVO_PIN);
  servo.write(SERVO_FERME);

  pinMode(BUZZER, OUTPUT);
  pinMode(LED_VERTE, OUTPUT);
  pinMode(LED_ROUGE, OUTPUT);

  afficherAccueil();
  Serial.println("=== Serrure EduKit prête ===");
}

void loop() {
  // Vérifier une carte RFID
  if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {
    String uid = "";
    for (byte i = 0; i < rfid.uid.size; i++) {
      uid += String(rfid.uid.uidByte[i], HEX);
    }
    uid.toUpperCase();
    Serial.print("Carte détectée: "); Serial.println(uid);

    if (verifierCarteRFID(uid)) {
      ouvrir();
    } else {
      refuser();
    }
    rfid.PICC_HaltA();
    return;
  }

  // Vérifier le clavier
  char touche = clavier.getKey();
  if (touche) {
    if (touche == '#') {
      // Touche # : valider le code
      if (verifierCode(saisie)) {
        ouvrir();
      } else {
        refuser();
      }
      saisie = "";
    } else if (touche == '*') {
      // Touche * : effacer
      saisie = "";
      lcd.setCursor(0, 1); lcd.print("Code effacé     ");
      delay(500);
      afficherAccueil();
    } else {
      // Chiffre : ajouter à la saisie
      saisie += touche;
      lcd.setCursor(0, 1);
      for (int i = 0; i < saisie.length(); i++) {
        lcd.print("*");  // Masquer le code
      }
    }
  }
}
```

:::tip Trouver l'UID de ta carte
Lance ce code simple pour lire l'UID de ta carte RFID et noter-le :
```cpp
// Dans loop(), après rfid.PICC_ReadCardSerial() :
Serial.print("UID: ");
for (byte i = 0; i < rfid.uid.size; i++) {
  Serial.print(rfid.uid.uidByte[i], HEX); Serial.print(" ");
}
Serial.println();
```
:::

✅ **Code chargé !** → Passe aux **[exercices →](./exercices)**
