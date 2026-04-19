---
id: code
title: Code Arduino — Irrigation Intelligente
sidebar_label: 💻 Code
---

# 💻 Code Arduino — Irrigation Intelligente

---

## 📦 Bibliothèques nécessaires

Installe via **Arduino IDE → Outils → Gérer les bibliothèques** :

| Bibliothèque | Auteur | Usage |
|-------------|--------|-------|
| `DHT sensor library` | Adafruit | Capteur température/humidité |
| `LiquidCrystal I2C` | Frank de Brabander | Afficheur LCD |

---

## 🔢 Code complet commenté

```cpp title="irrigation_intelligente.ino"
// ============================================
// Arduino EduKit Algérie — Irrigation Intelligente
// Version 1.0 — Licence MIT
// Documentation : https://arduino-edu-algerie.github.io
// ============================================

#include <DHT.h>
#include <LiquidCrystal_I2C.h>

// === CONFIGURATION DES BROCHES ===
#define PIN_CAPTEUR_1    A0   // Capteur humidité sol zone A
#define PIN_CAPTEUR_2    A1   // Capteur humidité sol zone B
#define PIN_DHT          2    // Capteur température/humidité air
#define PIN_RELAIS_1     3    // Relais → Électrovanne zone A
#define PIN_RELAIS_2     4    // Relais → Électrovanne zone B

// === PARAMÈTRES DU SYSTÈME ===
// Seuil d'humidité : en dessous = arroser, au dessus = ne pas arroser
// Valeur entre 0 (très sec) et 100 (très humide)
#define SEUIL_HUMIDITE       35   // % d'humidité minimale
#define DUREE_ARROSAGE       10   // Secondes d'arrosage à chaque fois
#define INTERVALLE_MESURE    30   // Secondes entre chaque mesure
#define PAUSE_APRES_ARROSAGE 300  // Secondes d'attente après arrosage (5 min)

// === INITIALISATION DES OBJETS ===
DHT dht(PIN_DHT, DHT22);
// Adresse I2C du LCD : 0x27 ou 0x3F selon le modèle
LiquidCrystal_I2C lcd(0x27, 16, 2);

// === VARIABLES GLOBALES ===
float humidite1 = 0;    // Humidité sol zone A (%)
float humidite2 = 0;    // Humidité sol zone B (%)
float tempAir   = 0;    // Température de l'air (°C)
float humAir    = 0;    // Humidité de l'air (%)
bool arrosageA  = false; // État arrosage zone A
bool arrosageB  = false; // État arrosage zone B
unsigned long derniereMesure = 0;

// === CARACTÈRES PERSONNALISÉS POUR LE LCD ===
// Petite goutte d'eau 💧
byte goutte[8] = {
  0b00100, 0b00100, 0b01110, 0b01110,
  0b11111, 0b11111, 0b01110, 0b00000
};

// ============================================
// FONCTIONS CAPTEURS
// ============================================

/**
 * Lire un capteur d'humidité du sol
 * Retourne un pourcentage 0-100%
 * 0% = complètement sec, 100% = saturé d'eau
 * 
 * Les capteurs capacitifs donnent une valeur analogique :
 * - Sec  → valeur haute (environ 800)
 * - Humide → valeur basse (environ 400)
 * On inverse et normalise pour avoir 0=sec, 100=humide
 */
float lireHumiditeSol(int broche) {
  // Plusieurs lectures pour plus de stabilité
  long somme = 0;
  for (int i = 0; i < 5; i++) {
    somme += analogRead(broche);
    delay(10);
  }
  float valeur = somme / 5.0;
  
  // Calibration : ajuste ces valeurs selon ton capteur !
  // VALEUR_SEC  = valeur lue quand le capteur est en l'air
  // VALEUR_EAU  = valeur lue quand le capteur est dans l'eau
  const int VALEUR_SEC = 780;
  const int VALEUR_EAU = 380;
  
  // Convertir en pourcentage et contraindre entre 0 et 100
  float pourcentage = map(valeur, VALEUR_SEC, VALEUR_EAU, 0, 100);
  return constrain(pourcentage, 0, 100);
}

/**
 * Lire la température et l'humidité de l'air
 */
void lireDHT() {
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  
  // Vérifier que la lecture est valide
  if (!isnan(h) && !isnan(t)) {
    humAir  = h;
    tempAir = t;
  }
}

// ============================================
// FONCTIONS ARROSAGE
// ============================================

/**
 * Ouvrir la vanne d'une zone (commencer l'arrosage)
 * Le relais est actif à LOW (active low)
 */
void ouvrirVanne(int zone) {
  if (zone == 1) {
    digitalWrite(PIN_RELAIS_1, LOW);   // LOW = relais activé
    arrosageA = true;
    Serial.println("Zone A : Arrosage DÉMARRÉ");
  } else {
    digitalWrite(PIN_RELAIS_2, LOW);
    arrosageB = true;
    Serial.println("Zone B : Arrosage DÉMARRÉ");
  }
}

/**
 * Fermer la vanne d'une zone (arrêter l'arrosage)
 */
void fermerVanne(int zone) {
  if (zone == 1) {
    digitalWrite(PIN_RELAIS_1, HIGH);  // HIGH = relais désactivé
    arrosageA = false;
    Serial.println("Zone A : Arrosage ARRÊTÉ");
  } else {
    digitalWrite(PIN_RELAIS_2, HIGH);
    arrosageB = false;
    Serial.println("Zone B : Arrosage ARRÊTÉ");
  }
}

/**
 * Arroser une zone pendant X secondes
 * Pendant l'arrosage, l'écran affiche un compte à rebours
 */
void arroserZone(int zone, int secondes) {
  Serial.print("Arrosage zone ");
  Serial.print(zone);
  Serial.print(" pendant ");
  Serial.print(secondes);
  Serial.println(" secondes");
  
  ouvrirVanne(zone);
  
  // Compte à rebours affiché sur le LCD
  for (int t = secondes; t > 0; t--) {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Arrosage Zone ");
    lcd.print(zone);
    lcd.setCursor(0, 1);
    lcd.write(0);  // Icône goutte
    lcd.print(" Reste: ");
    lcd.print(t);
    lcd.print("s  ");
    delay(1000);
  }
  
  fermerVanne(zone);
}

// ============================================
// FONCTIONS AFFICHAGE LCD
// ============================================

/**
 * Afficher les données en mode normal (2 pages qui alternent)
 */
void afficherDonnees() {
  // Page 1 : Humidité des zones
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("ZA:");
  lcd.print((int)humidite1);
  lcd.print("%");
  lcd.write(0);  // Goutte
  lcd.print(" ZB:");
  lcd.print((int)humidite2);
  lcd.print("%");
  lcd.write(0);
  lcd.setCursor(0, 1);
  lcd.print("T:");
  lcd.print(tempAir, 1);
  lcd.print("C H:");
  lcd.print((int)humAir);
  lcd.print("%");
  delay(3000);
  
  // Page 2 : État des vannes
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Zone A: ");
  lcd.print(arrosageA ? "ARROSE " : (humidite1 < SEUIL_HUMIDITE ? "SEC!   " : "OK     "));
  lcd.setCursor(0, 1);
  lcd.print("Zone B: ");
  lcd.print(arrosageB ? "ARROSE " : (humidite2 < SEUIL_HUMIDITE ? "SEC!   " : "OK     "));
  delay(3000);
}

// ============================================
// PROGRAMME PRINCIPAL
// ============================================

void setup() {
  Serial.begin(9600);
  Serial.println("=== Irrigation Intelligente Arduino EduKit ===");
  
  // Configuration des relais (HIGH = vanne fermée au démarrage)
  pinMode(PIN_RELAIS_1, OUTPUT);
  pinMode(PIN_RELAIS_2, OUTPUT);
  digitalWrite(PIN_RELAIS_1, HIGH);
  digitalWrite(PIN_RELAIS_2, HIGH);
  
  // Initialisation DHT22
  dht.begin();
  
  // Initialisation LCD
  lcd.init();
  lcd.backlight();
  lcd.createChar(0, goutte);  // Créer le caractère goutte
  
  // Message de démarrage
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("  EduKit v1.0  ");
  lcd.setCursor(0, 1);
  lcd.print(" Irrigation DZ ");
  delay(2000);
  
  // Première mesure immédiate
  derniereMesure = millis() - (INTERVALLE_MESURE * 1000UL);
  
  Serial.println("Système prêt !");
}

void loop() {
  unsigned long maintenant = millis();
  
  // Effectuer une mesure selon l'intervalle défini
  if (maintenant - derniereMesure >= INTERVALLE_MESURE * 1000UL) {
    derniereMesure = maintenant;
    
    // Lire tous les capteurs
    humidite1 = lireHumiditeSol(PIN_CAPTEUR_1);
    humidite2 = lireHumiditeSol(PIN_CAPTEUR_2);
    lireDHT();
    
    // Afficher dans le moniteur série
    Serial.println("--- Nouvelle mesure ---");
    Serial.print("Zone A : "); Serial.print(humidite1); Serial.println("%");
    Serial.print("Zone B : "); Serial.print(humidite2); Serial.println("%");
    Serial.print("Temp   : "); Serial.print(tempAir); Serial.println("°C");
    Serial.print("Hum air: "); Serial.print(humAir); Serial.println("%");
    
    // Décision d'arrosage Zone A
    if (humidite1 < SEUIL_HUMIDITE) {
      Serial.println("Zone A trop sèche → arrosage !");
      arroserZone(1, DUREE_ARROSAGE);
      delay(PAUSE_APRES_ARROSAGE * 1000UL);
    }
    
    // Décision d'arrosage Zone B
    if (humidite2 < SEUIL_HUMIDITE) {
      Serial.println("Zone B trop sèche → arrosage !");
      arroserZone(2, DUREE_ARROSAGE);
      delay(PAUSE_APRES_ARROSAGE * 1000UL);
    }
  }
  
  // Affichage continu des données
  afficherDonnees();
}
```

---

## 🎨 Personnaliser les paramètres

Voici les valeurs à modifier selon ton jardin :

```cpp
// Ajuste le seuil selon le type de plante :
// Cactus / plantes du désert : 15-20%
// Fleurs standard            : 30-40%  ← valeur par défaut
// Légumes / tomates          : 45-55%
// Gazon                      : 50-60%
#define SEUIL_HUMIDITE  35

// Durée d'arrosage selon la taille de ta zone :
// Petit pot (30cm)           : 5-10 secondes
// Carré de jardin (1m²)      : 15-30 secondes
// Grande zone (5m²)          : 60-120 secondes
#define DUREE_ARROSAGE  10
```

---

## 🔍 Calibrer les capteurs

Chaque capteur est légèrement différent. Pour une mesure précise :

```cpp title="calibration_capteur.ino"
// Étape 1 : Capteur en l'air → note la valeur (VALEUR_SEC)
// Étape 2 : Capteur dans un verre d'eau → note la valeur (VALEUR_EAU)
void setup() {
  Serial.begin(9600);
}
void loop() {
  Serial.print("Capteur 1 = ");
  Serial.print(analogRead(A0));
  Serial.print("  |  Capteur 2 = ");
  Serial.println(analogRead(A1));
  delay(500);
}
```

Note les deux valeurs et remplace dans le code principal :
```cpp
const int VALEUR_SEC = ???;  // Valeur en l'air
const int VALEUR_EAU = ???;  // Valeur dans l'eau
```

---

✅ **Code prêt !** → Passe à **[l'installation au jardin →](./installation)**
