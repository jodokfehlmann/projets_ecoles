---
id: code
title: Code Arduino — Instrument MIDI
sidebar_label: 💻 Code
---
# 💻 Code Arduino — Instrument MIDI

```cpp title="instrument_midi.ino"
// ============================================
// Arduino EduKit Algérie — Instrument MIDI
// Version 1.0 — Licence MIT
// ============================================

#include <CapacitiveSensor.h>

// === FRÉQUENCES DES NOTES (Hz) ===
const int NOTES[] = {
  262,  // Do4  (C4)
  294,  // Ré4  (D4)
  330,  // Mi4  (E4)
  349,  // Fa4  (F4)
  392,  // Sol4 (G4)
  440,  // La4  (A4)
  494,  // Si4  (B4)
  523   // Do5  (C5)
};
const int NB_NOTES = 8;

// === CAPTEURS TOUCH (broche envoi, broche réception) ===
// La même broche d'envoi (D2) est partagée entre tous les capteurs
CapacitiveSensor touch0 = CapacitiveSensor(2, 3);
CapacitiveSensor touch1 = CapacitiveSensor(2, 4);
CapacitiveSensor touch2 = CapacitiveSensor(2, 5);
CapacitiveSensor touch3 = CapacitiveSensor(2, 6);
CapacitiveSensor touch4 = CapacitiveSensor(2, 7);
CapacitiveSensor touch5 = CapacitiveSensor(2, 8);
CapacitiveSensor touch6 = CapacitiveSensor(2, 9);
CapacitiveSensor touch7 = CapacitiveSensor(2, 10);

CapacitiveSensor* capteurs[] = {
  &touch0, &touch1, &touch2, &touch3,
  &touch4, &touch5, &touch6, &touch7
};

// === BROCHES ===
#define SPEAKER  11
#define LED_R    12
#define LED_G    13
#define LED_B    A0
#define POT_VOL  A1

// === SEUIL TOUCH ===
long SEUIL = 200;  // Ajuster selon sensibilité

// === COULEURS DES TOUCHES ===
// Chaque touche a sa propre couleur LED
int couleursR[] = {255,200,150,100, 50,  0,  0,  0};
int couleursG[] = {  0, 50,100,200,255,200,100, 50};
int couleursB[] = {  0,  0,  0,  0,  0, 50,200,255};

bool toucher(int index) {
  return capteurs[index]->capacitiveSensor(30) > SEUIL;
}

void jouerNote(int index) {
  int volume = analogRead(POT_VOL);  // 0-1023
  int freq = NOTES[index];

  // LED couleur correspondante
  analogWrite(LED_R, couleursR[index]);
  analogWrite(LED_G, couleursG[index]);
  analogWrite(LED_B, couleursB[index]);

  // Jouer la note
  tone(SPEAKER, freq);
}

void eteindreLED() {
  analogWrite(LED_R, 0);
  analogWrite(LED_G, 0);
  analogWrite(LED_B, 0);
}

// === MÉLODIES PRÉPROGRAMMÉES ===
// Format : {note, durée_ms}
int joyeux[][2] = {
  {4,200},{4,200},{5,400},{4,400},{0,400},{7,800},
  {4,200},{4,200},{5,400},{4,400},{1,400},{0,800}
};

void jouerMelodie(int melodie[][2], int nb) {
  for (int i = 0; i < nb; i++) {
    if (melodie[i][0] >= 0) {
      tone(SPEAKER, NOTES[melodie[i][0]], melodie[i][1]);
    } else {
      noTone(SPEAKER);
    }
    delay(melodie[i][1] * 1.1);
  }
  noTone(SPEAKER);
}

void setup() {
  Serial.begin(9600);
  pinMode(SPEAKER, OUTPUT);
  Serial.println("=== Instrument EduKit prêt ===");
  // Note de démarrage
  tone(SPEAKER, 523, 200); delay(300);
  tone(SPEAKER, 659, 200); delay(300);
  tone(SPEAKER, 784, 400); delay(500);
  noTone(SPEAKER);
}

void loop() {
  bool uneToucheActive = false;

  for (int i = 0; i < NB_NOTES; i++) {
    if (toucher(i)) {
      jouerNote(i);
      uneToucheActive = true;
      Serial.print("Note: "); Serial.println(i);
      break;  // Une note à la fois
    }
  }

  if (!uneToucheActive) {
    noTone(SPEAKER);
    eteindreLED();
  }

  delay(10);
}
```

## Calibration de la sensibilité

```cpp title="calibration_touch.ino"
#include <CapacitiveSensor.h>
CapacitiveSensor cs = CapacitiveSensor(2, 3);
void setup() { Serial.begin(9600); }
void loop() {
  long val = cs.capacitiveSensor(30);
  Serial.println(val);  // Note la valeur sans toucher, puis en touchant
  delay(100);
  // SEUIL = (valeur_sans_toucher + valeur_en_touchant) / 2
}
```

✅ **Code chargé !** → Passe aux **[exercices →](./exercices)**
