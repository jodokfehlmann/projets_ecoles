---
id: projets-avances
title: Projets Avancés — Traceur 2D
sidebar_label: 🚀 Projets Avancés
---

# 🚀 Projets Avancés

Tu maîtrises les bases du traceur ? Voici des idées pour aller encore plus loin !

---

## 💡 Idée 1 — Dessiner avec Inkscape (G-Code réel)

**Inkscape** est un logiciel gratuit de dessin vectoriel. Avec l'extension **Inkscape2GCode**, tu peux dessiner n'importe quoi et l'envoyer au traceur !

### Installation
1. Télécharge [Inkscape](https://inkscape.org) (gratuit)
2. Installe l'extension [J-Tech Photonics GCode](https://jtechphotonics.com)
3. Dessine dans Inkscape
4. Extensions → J-Tech Photonics → Generate G-Code
5. Envoie via le moniteur série d'Arduino IDE

---

## 💡 Idée 2 — Contrôle Bluetooth

Ajoute un module **HC-05** pour piloter le traceur depuis ton smartphone !

```cpp
// Remplace Serial.available() par mySerial.available()
#include <SoftwareSerial.h>
SoftwareSerial mySerial(10, 11); // RX, TX

void setup() {
  mySerial.begin(9600);
  // ...
}
void loop() {
  if (mySerial.available()) {
    String cmd = mySerial.readStringUntil('\n');
    traiterCommande(cmd);
  }
}
```

---

## 💡 Idée 3 — Transformer en graveuse laser

Remplace le servo + stylo par un **module laser 500mW** pour graver du bois ou du carton !

:::danger Sécurité laser
- Toujours porter des **lunettes de protection** laser
- Ne jamais pointer vers des yeux ou des personnes
- Utiliser dans un espace bien ventilé
- Ne jamais laisser le laser sans surveillance
:::

```cpp
#define PIN_LASER 11  // PWM pour puissance variable

void laserOn(int puissance) {   // 0-255
  analogWrite(PIN_LASER, puissance);
}
void laserOff() {
  analogWrite(PIN_LASER, 0);
}
```

---

## 💡 Idée 4 — Générateur d'art mathématique

Dessine des courbes mathématiques fascinantes automatiquement !

```cpp
// Courbe de Lissajous — Dessine des figures hypnotiques
void lissajous(float a, float b, float delta, float r, float cx, float cy) {
  int steps = 360;
  allerA(cx + r * sin(a * 0 + delta), cy + r * sin(b * 0));
  styloBas();
  for (int t = 1; t <= steps * 2; t++) {
    float angle = t * (2.0 * PI / steps);
    float x = cx + r * sin(a * angle + delta);
    float y = cy + r * sin(b * angle);
    allerA(x, y);
  }
  styloHaut();
}

// Dans setup() — essaie différentes valeurs !
lissajous(3, 2, PI/4, 40, 80, 80);  // Figure en forme de nœud
lissajous(5, 4, PI/3, 40, 80, 80);  // Figure plus complexe
```
