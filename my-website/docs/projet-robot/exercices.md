---
id: exercices
title: Exercices — Robot Suiveur de Ligne
sidebar_label: 📝 Exercices
---

# 📝 Exercices — Robot Suiveur de Ligne

## 🟢 Niveau 1 — Débutant

### Exercice 1.1 — Calibration
Lance le code de calibration. Note les valeurs sur ligne noire et sur fond blanc pour chaque capteur. Calcule le seuil optimal et mets-le à jour dans le code principal.

### Exercice 1.2 — Réglage de vitesse
Modifie `VITESSE_BASE` entre 100 et 255. À quelle vitesse le robot suit-il le mieux la ligne sur ton parcours ?

### Exercice 1.3 — Circuit simple
Trace un circuit ovale avec du ruban noir. Le robot doit faire 3 tours complets sans sortir de la ligne.

---

## 🟡 Niveau 2 — Intermédiaire

### Exercice 2.1 — Contrôle PID
Le contrôle proportionnel (P) est plus précis qu'un simple if/else. Implémenter un contrôleur P :

```cpp
void loop() {
  int g = analogRead(IR_GAUCHE);
  int c = analogRead(IR_CENTRE);
  int d = analogRead(IR_DROIT);

  // Erreur : différence entre gauche et droite
  int erreur = g - d;  // Positif = ligne à gauche, négatif = droite

  // Correction proportionnelle
  float Kp = 0.5;  // Ajuste ce coefficient
  int correction = Kp * erreur;

  avancer(VITESSE_BASE - correction, VITESSE_BASE + correction);
}
```

### Exercice 2.2 — Détection d'intersection
Quand les 3 capteurs détectent la ligne en même temps, c'est une intersection. Programme le robot pour tourner à droite à chaque intersection.

### Exercice 2.3 — Compteur de tours
Ajoute un capteur (ou utilise les capteurs IR) pour compter combien de fois le robot passe par le point de départ. Affiche le compteur via le moniteur série.

---

## 🔴 Niveau 3 — Avancé

### Exercice 3.1 — PID complet
Implémenter un contrôleur PID complet (Proportionnel + Intégral + Dérivé) pour un suivi de ligne ultra-précis à haute vitesse.

```cpp
float Kp = 0.5, Ki = 0.01, Kd = 0.1;
float erreurPrecedente = 0, sommeErreurs = 0;

float calculerPID(float erreur) {
  sommeErreurs += erreur;
  float derivee = erreur - erreurPrecedente;
  erreurPrecedente = erreur;
  return Kp * erreur + Ki * sommeErreurs + Kd * derivee;
}
```

### Exercice 3.2 — Labyrinthe
Trace un labyrinthe simple. Programme le robot pour le résoudre en utilisant la **règle de la main droite** (toujours longer le mur de droite).

### Exercice 3.3 — Course chronométrée
Organise une **course** entre tous les robots de la classe. Chaque équipe optimise son code pour faire le parcours le plus rapidement possible. Chronomètre avec `millis()` !

---

## 🏆 Défi Final — Compétition de robotique

**Règles :**
- Chaque équipe a 15 minutes pour optimiser son robot
- Le parcours comporte 3 virages serrés et une intersection
- Le robot le plus rapide qui complète 3 tours sans sortir gagne !

**Conseils pour gagner :**
- Augmenter la vitesse progressivement
- Affiner le seuil IR au millimètre
- Tester le PID avec différents coefficients
