---
id: code
title: Code Arduino — Traceur 2D
sidebar_label: 💻 Code
---

# 💻 Code Arduino — Traceur 2D

---

## 📦 Bibliothèques nécessaires

Installe ces bibliothèques via **Arduino IDE → Outils → Gérer les bibliothèques** :

| Bibliothèque | Version | Usage |
|-------------|---------|-------|
| `AccelStepper` | ≥ 1.64 | Contrôle des moteurs pas-à-pas |
| `Servo` | intégrée | Contrôle du servo-moteur |

---

## 🔢 Code complet commenté

Copie ce code dans Arduino IDE et téléverse-le sur ta carte :

```cpp title="traceur_2d.ino"
// ============================================
// Arduino EduKit Algérie — Traceur 2D (Plotter)
// Version 1.0 — Licence MIT
// Documentation : https://arduino-edu-algerie.github.io
// ============================================

#include <AccelStepper.h>
#include <Servo.h>

// === CONFIGURATION DES BROCHES ===
// Moteur axe X (gauche-droite)
#define STEP_X    3    // Broche STEP du driver X
#define DIR_X     4    // Broche DIR du driver X

// Moteur axe Y (avant-arrière)
#define STEP_Y    5    // Broche STEP du driver Y
#define DIR_Y     6    // Broche DIR du driver Y

// Activation des drivers (LOW = activé)
#define ENABLE    8

// Servo pour lever/poser le stylo
#define PIN_SERVO 9

// Bouton de remise à zéro
#define BOUTON_RESET 2

// === PARAMÈTRES MÉCANIQUES ===
// Nombre de pas par millimètre
// Calcul : (pas_par_tour × micro_pas) ÷ (pas_poulie × pas_courroie)
// NEMA17 = 200 pas/tour, micro_pas = 1/16, poulie = 20 dents, GT2 = 2mm
#define PAS_PAR_MM  80.0   // Ajuste si les distances sont incorrectes

// Vitesse et accélération
#define VITESSE_MAX     1500  // pas/seconde (augmenter = plus rapide)
#define ACCELERATION    800   // pas/seconde² (augmenter = démarrage plus brusque)

// Angles du servo
#define SERVO_STYLO_HAUT  80  // Stylo levé (ne dessine pas)
#define SERVO_STYLO_BAS   45  // Stylo posé (dessine)

// === CRÉATION DES OBJETS ===
// AccelStepper : type 1 = driver externe (STEP+DIR)
AccelStepper moteurX(AccelStepper::DRIVER, STEP_X, DIR_X);
AccelStepper moteurY(AccelStepper::DRIVER, STEP_Y, DIR_Y);
Servo servo;

// === VARIABLES GLOBALES ===
float positionX = 0;  // Position actuelle X en mm
float positionY = 0;  // Position actuelle Y en mm

// ============================================
// FONCTIONS DE BASE
// ============================================

/**
 * Lever le stylo (arrêter de dessiner)
 */
void styloHaut() {
  servo.write(SERVO_STYLO_HAUT);
  delay(200);  // Attendre que le servo finisse
}

/**
 * Poser le stylo (commencer à dessiner)
 */
void styloBas() {
  servo.write(SERVO_STYLO_BAS);
  delay(200);
}

/**
 * Convertir des millimètres en pas moteur
 */
long mmEnPas(float mm) {
  return (long)(mm * PAS_PAR_MM);
}

/**
 * Déplacer vers une position absolue (en mm)
 * Le stylo doit être levé avant d'appeler cette fonction pour un déplacement sans dessin
 */
void allerA(float x, float y) {
  moteurX.moveTo(mmEnPas(x));
  moteurY.moveTo(mmEnPas(y));
  
  // Attendre que les deux moteurs arrivent à destination
  while (moteurX.distanceToGo() != 0 || moteurY.distanceToGo() != 0) {
    moteurX.run();
    moteurY.run();
  }
  
  positionX = x;
  positionY = y;
}

/**
 * Déplacer EN DESSINANT vers une position absolue
 */
void tracerVers(float x, float y) {
  styloBas();        // Poser le stylo
  allerA(x, y);      // Se déplacer
  styloHaut();       // Lever le stylo
}

/**
 * Remettre à zéro (retour au point d'origine)
 */
void remiseAZero() {
  styloHaut();
  allerA(0, 0);
  moteurX.setCurrentPosition(0);
  moteurY.setCurrentPosition(0);
  positionX = 0;
  positionY = 0;
}

// ============================================
// FORMES GÉOMÉTRIQUES
// ============================================

/**
 * Dessiner un carré
 * @param xDepart  Position X du coin inférieur gauche (mm)
 * @param yDepart  Position Y du coin inférieur gauche (mm)
 * @param cote     Longueur du côté (mm)
 */
void dessinerCarre(float xDepart, float yDepart, float cote) {
  allerA(xDepart, yDepart);          // Aller au point de départ
  styloBas();                         // Poser le stylo
  allerA(xDepart + cote, yDepart);   // Côté bas
  allerA(xDepart + cote, yDepart + cote); // Côté droit
  allerA(xDepart, yDepart + cote);   // Côté haut
  allerA(xDepart, yDepart);          // Fermer le carré
  styloHaut();                        // Lever le stylo
}

/**
 * Dessiner un rectangle
 */
void dessinerRectangle(float x, float y, float largeur, float hauteur) {
  allerA(x, y);
  styloBas();
  allerA(x + largeur, y);
  allerA(x + largeur, y + hauteur);
  allerA(x, y + hauteur);
  allerA(x, y);
  styloHaut();
}

/**
 * Dessiner un cercle approximé (avec 36 segments)
 * @param cx  Centre X (mm)
 * @param cy  Centre Y (mm)
 * @param r   Rayon (mm)
 */
void dessinerCercle(float cx, float cy, float r) {
  int segments = 36;  // Plus de segments = cercle plus lisse
  float angleStep = 2.0 * PI / segments;
  
  // Aller au premier point
  allerA(cx + r, cy);
  styloBas();
  
  for (int i = 1; i <= segments; i++) {
    float angle = i * angleStep;
    float x = cx + r * cos(angle);
    float y = cy + r * sin(angle);
    allerA(x, y);
  }
  
  styloHaut();
}

/**
 * Dessiner une ligne droite de (x1,y1) à (x2,y2)
 */
void dessinerLigne(float x1, float y1, float x2, float y2) {
  allerA(x1, y1);
  styloBas();
  allerA(x2, y2);
  styloHaut();
}

// ============================================
// PROGRAMME PRINCIPAL
// ============================================

void setup() {
  // Initialisation du port série (pour débogage)
  Serial.begin(9600);
  Serial.println("=== Traceur 2D Arduino EduKit ===");
  
  // Configuration des moteurs
  moteurX.setMaxSpeed(VITESSE_MAX);
  moteurX.setAcceleration(ACCELERATION);
  moteurY.setMaxSpeed(VITESSE_MAX);
  moteurY.setAcceleration(ACCELERATION);
  
  // Activer les drivers (LOW = activé)
  pinMode(ENABLE, OUTPUT);
  digitalWrite(ENABLE, LOW);
  
  // Initialiser le servo
  servo.attach(PIN_SERVO);
  styloHaut();  // Stylo levé au démarrage
  
  // Bouton de reset
  pinMode(BOUTON_RESET, INPUT_PULLUP);
  
  // Attendre 2 secondes avant de démarrer
  Serial.println("Démarrage dans 2 secondes...");
  delay(2000);
  
  // ============================================
  // DÉMO : Dessiner quelques formes
  // Modifie cette section pour ton dessin !
  // ============================================
  
  Serial.println("Dessin d'un carré...");
  dessinerCarre(10, 10, 50);        // Carré 50mm à (10,10)
  
  delay(500);
  
  Serial.println("Dessin d'un cercle...");
  dessinerCercle(85, 85, 30);       // Cercle r=30mm centré en (85,85)
  
  delay(500);
  
  Serial.println("Dessin d'un rectangle...");
  dessinerRectangle(10, 80, 40, 20); // Rectangle 40×20mm
  
  // Retour à l'origine
  Serial.println("Retour à l'origine...");
  remiseAZero();
  
  Serial.println("Terminé !");
}

void loop() {
  // Vérifier le bouton de reset
  if (digitalRead(BOUTON_RESET) == LOW) {
    delay(50);  // Anti-rebond
    if (digitalRead(BOUTON_RESET) == LOW) {
      Serial.println("Reset manuel !");
      remiseAZero();
    }
  }
  
  // === COMMUNICATION SÉRIE (mode avancé) ===
  // Lit des commandes depuis le port série
  // Format : "G0 X50 Y30" = aller à X=50mm, Y=30mm sans dessiner
  //          "G1 X80 Y80" = tracer jusqu'à X=80mm, Y=80mm
  if (Serial.available()) {
    String commande = Serial.readStringUntil('\n');
    commande.trim();
    traiterCommande(commande);
  }
}

/**
 * Interpréteur de G-Code simplifié
 * Supporte G0 (déplacement rapide) et G1 (traçage)
 */
void traiterCommande(String cmd) {
  Serial.print("Commande reçue : ");
  Serial.println(cmd);
  
  float x = positionX;  // Valeur par défaut = position actuelle
  float y = positionY;
  
  // Extraire X si présent
  int idxX = cmd.indexOf('X');
  if (idxX >= 0) {
    x = cmd.substring(idxX + 1).toFloat();
  }
  
  // Extraire Y si présent
  int idxY = cmd.indexOf('Y');
  if (idxY >= 0) {
    y = cmd.substring(idxY + 1).toFloat();
  }
  
  if (cmd.startsWith("G0")) {
    // Déplacement sans dessin
    styloHaut();
    allerA(x, y);
    Serial.println("OK");
  } else if (cmd.startsWith("G1")) {
    // Traçage
    styloBas();
    allerA(x, y);
    styloHaut();
    Serial.println("OK");
  } else if (cmd.startsWith("G28")) {
    // Retour à l'origine
    remiseAZero();
    Serial.println("OK - Origine");
  } else {
    Serial.println("Commande inconnue");
  }
}
```

---

## 🧪 Test rapide

Avant de dessiner des formes complexes, teste les mouvements de base :

```cpp title="test_moteurs.ino"
// Test simple — copiez dans un nouveau fichier Arduino
#include <AccelStepper.h>

AccelStepper moteurX(AccelStepper::DRIVER, 3, 4);
AccelStepper moteurY(AccelStepper::DRIVER, 5, 6);

void setup() {
  pinMode(8, OUTPUT);
  digitalWrite(8, LOW);  // Activer les drivers
  
  moteurX.setMaxSpeed(1000);
  moteurX.setAcceleration(500);
  moteurY.setMaxSpeed(1000);
  moteurY.setAcceleration(500);
  
  // Test axe X : aller à 100 pas, revenir à 0
  moteurX.moveTo(100);
  while (moteurX.distanceToGo() != 0) moteurX.run();
  delay(500);
  moteurX.moveTo(0);
  while (moteurX.distanceToGo() != 0) moteurX.run();
}

void loop() {}
```

---

## ⚙️ Calibration du PAS_PAR_MM

Si les distances dessinées ne sont pas correctes :

1. Dessine un carré de 50mm avec le code
2. Mesure la taille réelle avec une règle
3. Calcule la correction :

```
PAS_PAR_MM_CORRECT = PAS_PAR_MM_ACTUEL × (50 / taille_mesurée)
```

**Exemple :** Tu as demandé 50mm mais le carré fait 45mm →  
`PAS_PAR_MM = 80 × (50 / 45) = 88.9`

---

✅ **Code chargé !** → Passe à la **[calibration →](./calibration)**
