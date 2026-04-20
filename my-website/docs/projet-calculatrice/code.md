---
id: code
title: Code Arduino — Calculatrice RPN
sidebar_label: 💻 Code
---

# 💻 Code Arduino — Calculatrice RPN

```cpp title="calculatrice_rpn.ino"
// ============================================
// Arduino EduKit Algérie — Calculatrice RPN
// Version 1.0 — Licence MIT
// ============================================

#include <Keypad.h>
#include <U8g2lib.h>
#include <Wire.h>
#include <math.h>

// === OLED ===
U8G2_SH1106_128X64_NONAME_F_HW_I2C u8g2(U8G2_R0, U8X8_PIN_NONE);

// === CLAVIER ===
const byte LIGNES = 4, COLS = 4;
char touches[LIGNES][COLS] = {
  {'7','8','9','/'},
  {'4','5','6','*'},
  {'1','2','3','-'},
  {'E','0','.', '+'}
};
byte brocheL[LIGNES] = {2, 3, 4, 5};
byte brocheC[COLS]   = {6, 7, 8, 9};
Keypad clavier = Keypad(makeKeymap(touches), brocheL, brocheC, LIGNES, COLS);

// === PILE RPN (4 niveaux : X, Y, Z, T) ===
float pile[4] = {0, 0, 0, 0};  // pile[0] = X (registre actif)
String saisie = "";
bool enSaisie = false;

// === BUZZER ===
#define BUZZER 10

// ============================================
// OPÉRATIONS SUR LA PILE
// ============================================

/** Pousse une valeur sur la pile (T←Z←Y←X←valeur) */
void push(float valeur) {
  pile[3] = pile[2];
  pile[2] = pile[1];
  pile[1] = pile[0];
  pile[0] = valeur;
}

/** Retire la valeur X de la pile (X←Y←Z←T←T) */
float pop() {
  float val = pile[0];
  pile[0] = pile[1];
  pile[1] = pile[2];
  pile[2] = pile[3];
  return val;
}

/** Effectue une opération binaire (+, -, *, /) */
void operation(char op) {
  float b = pop();
  float a = pop();
  float resultat;

  switch (op) {
    case '+': resultat = a + b; break;
    case '-': resultat = a - b; break;
    case '*': resultat = a * b; break;
    case '/':
      if (b == 0) { afficherErreur("Div/0 !"); return; }
      resultat = a / b;
      break;
    default: return;
  }
  push(resultat);
}

// ============================================
// AFFICHAGE OLED
// ============================================

void afficher() {
  u8g2.clearBuffer();
  u8g2.setFont(u8g2_font_6x10_tf);

  // Afficher les 4 registres de la pile
  const char* labels[] = {"T:", "Z:", "Y:", "X:"};
  float niveaux[] = {pile[3], pile[2], pile[1], pile[0]};

  for (int i = 0; i < 4; i++) {
    u8g2.drawStr(0, 12 + i * 12, labels[i]);
    char buf[20];
    if (i == 3 && enSaisie) {
      // Afficher la saisie en cours pour X
      String affichage = saisie.length() > 0 ? saisie : "0";
      affichage.toCharArray(buf, 20);
    } else {
      // Formatage intelligent des nombres
      if (niveaux[i] == (long)niveaux[i] && abs(niveaux[i]) < 1e6) {
        sprintf(buf, "%.0f", niveaux[i]);
      } else {
        sprintf(buf, "%.4g", niveaux[i]);
      }
    }
    u8g2.drawStr(20, 12 + i * 12, buf);
  }

  // Ligne de séparation
  u8g2.drawHLine(0, 52, 128);

  // Barre de statut
  u8g2.setFont(u8g2_font_5x7_tf);
  u8g2.drawStr(0, 62, enSaisie ? "SAISIE" : "PRET");
  u8g2.drawStr(80, 62, "EduKit RPN v1.0");

  u8g2.sendBuffer();
}

void afficherErreur(const char* msg) {
  u8g2.clearBuffer();
  u8g2.setFont(u8g2_font_10x20_tf);
  u8g2.drawStr(10, 35, msg);
  u8g2.sendBuffer();
  tone(BUZZER, 200, 500);
  delay(1500);
}

// ============================================
// GESTION DES TOUCHES
// ============================================

void traiterTouche(char touche) {
  tone(BUZZER, 1200, 30);  // Bip court

  if (isdigit(touche) || touche == '.') {
    // Chiffre ou point décimal
    if (touche == '.' && saisie.indexOf('.') >= 0) return; // Un seul point
    saisie += touche;
    enSaisie = true;

  } else if (touche == 'E') {
    // ENTER : valider la saisie et la pousser sur la pile
    if (enSaisie && saisie.length() > 0) {
      push(saisie.toFloat());
      saisie = "";
      enSaisie = false;
    } else {
      // ENTER sans saisie = dupliquer X
      push(pile[0]);
    }

  } else if (touche == '+' || touche == '-' || touche == '*' || touche == '/') {
    // Opération : valider saisie en cours d'abord
    if (enSaisie && saisie.length() > 0) {
      push(saisie.toFloat());
      saisie = "";
      enSaisie = false;
    }
    operation(touche);
  }
}

// ============================================
// SETUP & LOOP
// ============================================

void setup() {
  Serial.begin(9600);
  u8g2.begin();
  pinMode(BUZZER, OUTPUT);

  // Animation de démarrage
  u8g2.clearBuffer();
  u8g2.setFont(u8g2_font_10x20_tf);
  u8g2.drawStr(15, 30, "EduKit RPN");
  u8g2.setFont(u8g2_font_6x10_tf);
  u8g2.drawStr(25, 48, "Calculatrice v1.0");
  u8g2.sendBuffer();
  tone(BUZZER, 880, 100); delay(150);
  tone(BUZZER, 1100, 100); delay(150);
  tone(BUZZER, 1320, 200); delay(500);

  afficher();
  Serial.println("=== Calculatrice RPN EduKit ===");
}

void loop() {
  char touche = clavier.getKey();
  if (touche) {
    Serial.print("Touche: "); Serial.println(touche);
    traiterTouche(touche);
    afficher();
  }
}
```

## Comment utiliser la calculatrice RPN

**Exemple : calculer (3 + 4) × 5**
```
Appuie : 3 → ENTER → 4 → + → 5 → ×
Résultat affiché sur X : 35
```

**Exemple : √(16) + 2**
```
Appuie : 16 → ENTER → √ → 2 → +
```

:::tip La touche ENTER
En RPN, ENTER sépare deux nombres. Si tu tapes `3 ENTER 4 +`, l'Arduino sait que 3 et 4 sont deux nombres différents à additionner.
:::

✅ **Code chargé !** → Passe aux **[exercices →](./exercices)**