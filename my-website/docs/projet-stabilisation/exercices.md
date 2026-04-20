---
id: exercices
title: Exercices — Stabilisation Active
sidebar_label: 📝 Exercices
---
# 📝 Exercices — Stabilisation Active

## 🟢 Niveau 1 — Comprendre le PID

### Exercice 1.1 — Visualiser les angles
Affiche angleX et angleY dans le moniteur série. Incline le plateau à la main. Les angles correspondent-ils à l'inclinaison réelle ?

### Exercice 1.2 — Effet de Kp seul
Commence avec Ki=0 et Kd=0. Augmente Kp de 0 à 5. Décris ce qui se passe pour chaque valeur. À partir de quelle valeur est-ce instable ?

### Exercice 1.3 — Rôle de Kd
Avec un Kp qui oscille, ajoute progressivement Kd. Observe comment les oscillations s'amortissent. C'est le principe d'un amortisseur !

---

## 🟡 Niveau 2 — Optimisation

### Exercice 2.1 — Auto-tuning Ziegler-Nichols
1. Mets Ki=0, Kd=0
2. Augmente Kp jusqu'aux oscillations stables → note **Ku** et **Tu**
3. Calcule les paramètres optimaux :
   - Kp = 0.6 × Ku
   - Ki = 2 × Kp / Tu  
   - Kd = Kp × Tu / 8

### Exercice 2.2 — Anti-windup
L'intégrale peut "s'emballer" si le système est bloqué mécaniquement. Teste en bloquant le plateau à la main pendant 5 secondes, puis relâche. Que se passe-t-il ? Comment limiter cet effet ?

### Exercice 2.3 — Filtre de Kalman
Remplace le filtre complémentaire par le filtre de Kalman de la bibliothèque `Kalman` pour une estimation d'angle plus précise. Mesure la différence en pratique.

---

## 🔴 Niveau 3 — Applications avancées

### Exercice 3.1 — Gimbal caméra 2 axes
Adapte le code pour stabiliser une caméra GoPro ou smartphone. Le plateau devient un support de caméra qui reste horizontal même si tu te déplaces.

### Exercice 3.2 — Drone — contrôleur de vol
Applique le PID à un vrai drone. Tu dois gérer 3 axes simultanément et mixer les corrections sur 4 moteurs brushless avec cette formule :
```
Moteur1 (avant-gauche) = Base + Tangage - Roulis + Lacet
Moteur2 (avant-droit)  = Base + Tangage + Roulis - Lacet
Moteur3 (arrière-droit)= Base - Tangage + Roulis + Lacet
Moteur4 (arrière-gauche)= Base - Tangage - Roulis - Lacet
```

### Exercice 3.3 — Fusée stabilisée
Monte le système sur une fusée modèle réduit. Des servos actionnent des gouvernes aérodynamiques. Le PID maintient la fusée verticale pendant la montée.

---

## 🏆 Défi Final — Championnat d'équilibre

Pose la bille sur le plateau. Le record à battre : **combien de temps ta bille reste-t-elle sans tomber ?**

Chronomètre depuis le moment où tu poses la bille jusqu'à ce qu'elle tombe. Optimise ton réglage PID pour battre le record de la classe !
