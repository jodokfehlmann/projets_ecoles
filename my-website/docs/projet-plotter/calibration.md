---
id: calibration
title: Calibration — Traceur 2D
sidebar_label: 🎯 Calibration
---

# 🎯 Calibration du Traceur

La calibration est l'étape qui transforme une machine "qui bouge" en machine "qui dessine précisément". Prends le temps de bien la faire !

---

## Étape 1 — Calibrer le servo (stylo)

### Position "stylo levé"
1. Téléverse ce code de test :

```cpp
#include <Servo.h>
Servo s;
void setup() {
  s.attach(9);
  s.write(80);  // Angle stylo levé
}
void loop() {}
```

2. Observe : le stylo doit être **clairement soulevé** de la surface (2-3mm minimum)
3. Si trop bas → augmenter l'angle (90, 95, 100...)
4. Si trop haut → diminuer (70, 60...)
5. Note l'angle qui fonctionne → remplace `SERVO_STYLO_HAUT` dans le code principal

### Position "stylo posé"
1. Change `s.write(80)` par `s.write(45)`
2. Le stylo doit **effleurer** la surface — pas appuyer fort, pas flotter
3. Ajuste jusqu'à trouver l'angle idéal
4. Note-le → remplace `SERVO_STYLO_BAS` dans le code principal

---

## Étape 2 — Calibrer les distances (PAS_PAR_MM)

```cpp title="test_calibration.ino"
// Dessine un carré de 100mm × 100mm
// Mesure ensuite avec une règle et compare
#include <AccelStepper.h>
#include <Servo.h>

AccelStepper mX(AccelStepper::DRIVER, 3, 4);
AccelStepper mY(AccelStepper::DRIVER, 5, 6);
Servo servo;

float PAS_PAR_MM = 80.0;  // ← Modifier selon résultats

void setup() {
  pinMode(8, OUTPUT); digitalWrite(8, LOW);
  mX.setMaxSpeed(1000); mX.setAcceleration(500);
  mY.setMaxSpeed(1000); mY.setAcceleration(500);
  servo.attach(9); servo.write(80); delay(500);
  
  // Dessiner le carré de test
  auto mv = [&](float x, float y) {
    mX.moveTo(x * PAS_PAR_MM); mY.moveTo(y * PAS_PAR_MM);
    while (mX.distanceToGo() || mY.distanceToGo()) { mX.run(); mY.run(); }
  };
  
  mv(0, 0); servo.write(45); delay(200);
  mv(100, 0); mv(100, 100); mv(0, 100); mv(0, 0);
  servo.write(80);
}
void loop() {}
```

**Mesure le carré obtenu et applique la correction :**

| Mesuré | Formule | Nouveau PAS_PAR_MM |
|--------|---------|-------------------|
| 90 mm (demandé 100) | 80 × 100/90 | **88.9** |
| 110 mm (demandé 100) | 80 × 100/110 | **72.7** |
| 100 mm ✅ | Parfait ! | **80.0** |

---

## Étape 3 — Test final de précision

Dessine le motif suivant et vérifie visuellement :

```cpp
// Dans setup(), après la configuration :
dessinerCarre(10, 10, 50);
dessinerCercle(60, 60, 25);
dessinerLigne(10, 80, 90, 80);
remiseAZero();
```

✅ **Bon résultat :** Formes nettes, lignes droites, cercle presque parfait  
⚠️ **Problème fréquent :** Lignes en biais → vérifier l'alignement des courroies

---

✅ **Calibration terminée !** → Passe aux **[exercices →](./exercices)**
