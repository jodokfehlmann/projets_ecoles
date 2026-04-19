---
id: code
title: Code Arduino — Robot Suiveur de Ligne
sidebar_label: 💻 Code
---

# 💻 Code Arduino — Robot Suiveur de Ligne

## Code complet commenté

```cpp title="robot_suiveur.ino"
// ============================================
// Arduino EduKit Algérie — Robot Suiveur de Ligne
// Version 1.0 — Licence MIT
// ============================================

// === BROCHES MOTEURS ===
#define ENA  5   // PWM vitesse moteur gauche
#define IN1  7   // Direction moteur gauche
#define IN2  8
#define ENB  6   // PWM vitesse moteur droit
#define IN3  9   // Direction moteur droit
#define IN4  10

// === BROCHES CAPTEURS IR ===
#define IR_GAUCHE  A0
#define IR_CENTRE  A1
#define IR_DROIT   A2

// === PARAMÈTRES ===
int VITESSE_BASE   = 180;  // 0-255 (ajuste selon ton robot)
int VITESSE_VIRAGE = 120;  // Vitesse du moteur intérieur en virage
int SEUIL_IR       = 500;  // Seuil de détection ligne (calibrer !)

// ============================================
// FONCTIONS MOTEURS
// ============================================

void avancer(int vitG, int vitD) {
  // Moteur gauche en avant
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, vitG);
  // Moteur droit en avant
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
  analogWrite(ENB, vitD);
}

void arreter() {
  analogWrite(ENA, 0);
  analogWrite(ENB, 0);
}

void tournerGauche() {
  avancer(VITESSE_VIRAGE, VITESSE_BASE);
}

void tournerDroit() {
  avancer(VITESSE_BASE, VITESSE_VIRAGE);
}

void virageSerreGauche() {
  // Moteur gauche en arrière, droit en avant
  digitalWrite(IN1, LOW); digitalWrite(IN2, HIGH);
  digitalWrite(IN3, HIGH); digitalWrite(IN4, LOW);
  analogWrite(ENA, VITESSE_BASE);
  analogWrite(ENB, VITESSE_BASE);
}

void virageSerreDroit() {
  digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);  digitalWrite(IN4, HIGH);
  analogWrite(ENA, VITESSE_BASE);
  analogWrite(ENB, VITESSE_BASE);
}

// ============================================
// FONCTIONS CAPTEURS
// ============================================

bool ligneSousGauche() { return analogRead(IR_GAUCHE) < SEUIL_IR; }
bool ligneSousCentre() { return analogRead(IR_CENTRE) < SEUIL_IR; }
bool ligneSousDroit()  { return analogRead(IR_DROIT)  < SEUIL_IR; }

// ============================================
// SETUP & LOOP
// ============================================

void setup() {
  Serial.begin(9600);
  pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT); pinMode(IN4, OUTPUT);
  pinMode(ENA, OUTPUT); pinMode(ENB, OUTPUT);

  Serial.println("=== Robot Suiveur de Ligne EduKit ===");
  Serial.println("Calibration en cours...");

  // Petit délai pour poser le robot sur la piste
  delay(3000);
  Serial.println("Go !");
}

void loop() {
  bool g = ligneSousGauche();
  bool c = ligneSousCentre();
  bool d = ligneSousDroit();

  // Afficher état capteurs dans le moniteur série
  Serial.print("G="); Serial.print(g);
  Serial.print(" C="); Serial.print(c);
  Serial.print(" D="); Serial.println(d);

  // === LOGIQUE DE SUIVI ===
  if (!g && c && !d) {
    // Ligne au centre → avancer tout droit
    avancer(VITESSE_BASE, VITESSE_BASE);
  }
  else if (!g && !c && d) {
    // Ligne à droite → tourner à droite
    tournerDroit();
  }
  else if (g && !c && !d) {
    // Ligne à gauche → tourner à gauche
    tournerGauche();
  }
  else if (!g && !c && !d) {
    // Plus de ligne → dernier mouvement ou arrêt
    arreter();
  }
  else if (g && c && !d) {
    // Virage serré à gauche
    virageSerreGauche();
  }
  else if (!g && c && d) {
    // Virage serré à droite
    virageSerreDroit();
  }
  else if (g && c && d) {
    // Intersection → avancer tout droit
    avancer(VITESSE_BASE, VITESSE_BASE);
  }
}
```

## Calibrer le seuil IR

```cpp title="calibration_ir.ino"
void setup() { Serial.begin(9600); }
void loop() {
  Serial.print("G="); Serial.print(analogRead(A0));
  Serial.print(" C="); Serial.print(analogRead(A1));
  Serial.print(" D="); Serial.println(analogRead(A2));
  delay(100);
}
// Sur ligne noire → note la valeur (ex: 200)
// Sur fond blanc  → note la valeur (ex: 800)
// SEUIL = (200 + 800) / 2 = 500
```

✅ **Code chargé !** → Passe aux **[exercices →](./exercices)**
