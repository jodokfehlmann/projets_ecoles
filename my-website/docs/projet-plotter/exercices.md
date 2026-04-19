---
id: exercices
title: Exercices — Traceur 2D
sidebar_label: 📝 Exercices
---

# 📝 Exercices & Défis — Traceur 2D

Les exercices sont classés en **3 niveaux** progressifs. Commence par le niveau 1 même si tu as de l'expérience !

---

## 🟢 Niveau 1 — Débutant

### Exercice 1.1 — Mon premier dessin
**Objectif :** Dessiner les initiales de ton prénom

1. Sur papier millimétré, dessine tes initiales lettre par lettre
2. Note les coordonnées (X, Y) de chaque point important
3. Traduis en appels `dessinerLigne()` dans le code
4. Téléverse et observe !

**Aide :** La lettre "A" peut être faite avec 3 lignes :
```cpp
// Lettre A (exemple)
dessinerLigne(10, 10, 20, 40);   // Jambe gauche
dessinerLigne(20, 40, 30, 10);   // Jambe droite
dessinerLigne(14, 25, 26, 25);   // Barre du milieu
```

---

### Exercice 1.2 — La maison
**Objectif :** Dessiner une maison simple avec des fonctions existantes

Dessine une maison qui ressemble à ça :
```
      /\
     /  \
    /    \
   /      \
  /________\
  |   ||   |
  |   ||   |
  |___|____|
```

Utilise : `dessinerRectangle()`, `dessinerLigne()` et `dessinerCercle()` (pour la fenêtre ronde !)

**Question :** Combien de `dessinerLigne()` faut-il pour dessiner le toit ?

---

### Exercice 1.3 — Spirale carrée
**Objectif :** Comprendre les boucles `for`

Complète ce code pour dessiner une spirale carrée :
```cpp
void spiraleCarree() {
  float x = 50, y = 50;  // Centre
  allerA(x, y);
  styloBas();
  
  for (int i = 1; i <= 10; i++) {
    float taille = i * 5;  // Chaque carré est plus grand
    // ??? Que faire ici ???
    // Indice : déplace-toi de +taille sur X, puis +taille sur Y,
    //          puis -taille sur X, puis -taille sur Y
  }
  styloHaut();
}
```

---

## 🟡 Niveau 2 — Intermédiaire

### Exercice 2.1 — Étoile à 5 branches
**Objectif :** Utiliser les fonctions trigonométriques

Une étoile à 5 branches peut être dessinée en reliant 5 points placés sur un cercle, **en sautant un point** à chaque fois.

```cpp
void etoile(float cx, float cy, float r) {
  // Calculer les 5 points de l'étoile
  float points[5][2];
  for (int i = 0; i < 5; i++) {
    float angle = i * (2.0 * PI / 5) - PI/2;  // -PI/2 pour commencer en haut
    points[i][0] = cx + r * cos(angle);
    points[i][1] = cy + r * sin(angle);
  }
  
  // Relier les points dans l'ordre 0→2→4→1→3→0
  int ordre[] = {0, 2, 4, 1, 3, 0};
  allerA(points[0][0], points[0][1]);
  styloBas();
  for (int i = 1; i <= 5; i++) {
    allerA(points[ordre[i]][0], points[ordre[i]][1]);
  }
  styloHaut();
}
```

**Défi :** Modifie la fonction pour dessiner une étoile à **6 branches** (hexagone étoilé).

---

### Exercice 2.2 — Générateur de polygones
**Objectif :** Créer une fonction générique réutilisable

Écris une fonction `dessinerPolygone(cx, cy, r, n)` qui dessine un polygone régulier à `n` côtés :

```cpp
void dessinerPolygone(float cx, float cy, float r, int n) {
  // À compléter !
  // Indice : angle entre chaque sommet = 360° / n
  // En radians : 2*PI / n
}
```

**Test :** Appelle ta fonction avec n=3 (triangle), n=4 (carré), n=6 (hexagone), n=12.

---

### Exercice 2.3 — Vitesse variable
**Objectif :** Comprendre l'impact de la vitesse sur la qualité

1. Dessine le même carré 3 fois avec des vitesses différentes :
   - Lent : `VITESSE_MAX = 200`
   - Normal : `VITESSE_MAX = 1000`  
   - Rapide : `VITESSE_MAX = 3000`

2. Observe et réponds :
   - Quelle vitesse donne la meilleure qualité de trait ?
   - Pourquoi les coins sont-ils moins précis à haute vitesse ?
   - Quel est le meilleur compromis vitesse/qualité selon toi ?

---

## 🔴 Niveau 3 — Avancé

### Exercice 3.1 — Portrait pixelisé
**Objectif :** Transformer une image en dessin

1. Prends une image simple (smiley, cœur, logo)
2. Redimensionne-la à 20×20 pixels dans Paint ou GIMP
3. Convertis chaque pixel noir en un carré de 5mm
4. Génère automatiquement le code Arduino avec Excel ou Python

**Bonus :** Écris un script Python qui lit une image PNG et génère le code Arduino !

---

### Exercice 3.2 — Machine à écrire
**Objectif :** Créer une police de caractères vectorielle

Crée une bibliothèque de caractères où chaque lettre est définie par une série de lignes :

```cpp
// Structure d'un caractère
struct Caractere {
  // Séquence de mouvements : {x, y, stylo}
  // stylo = 0 (levé) ou 1 (posé)
  float moves[20][3];
  int nbMoves;
};

void ecrireCaractere(char c, float x, float y, float taille) {
  // Dessiner le caractère 'c' à la position (x,y)
  // avec une hauteur de 'taille' mm
}

void ecrireTexte(String texte, float x, float y, float taille) {
  for (int i = 0; i < texte.length(); i++) {
    ecrireCaractere(texte[i], x + i * taille * 0.8, y, taille);
  }
}
```

**Défi :** Implémente au minimum les lettres A, B, C, D, E et les chiffres 0-9.

---

### Exercice 3.3 — Interpréteur G-Code complet
**Objectif :** Implémenter un vrai protocole CNC

Améliore la fonction `traiterCommande()` pour supporter :

| Commande | Action |
|----------|--------|
| `G0 X50 Y30` | Déplacement rapide (stylo levé) |
| `G1 X80 Y80` | Traçage ligne droite |
| `G28` | Retour origine |
| `G90` | Mode absolu |
| `G91` | Mode relatif |
| `M3` | Stylo bas |
| `M5` | Stylo haut |
| `F1500` | Changer la vitesse |

**Test final :** Charge un fichier G-Code depuis Inkscape et dessine-le !

---

## 🏆 Défi Final — Concours de dessin

**Règle :** Tu as 15 minutes pour programmer le traceur afin qu'il dessine la plus belle image possible.

**Critères d'évaluation :**
- 🎨 Créativité du dessin (5 points)
- 🎯 Précision des traits (3 points)
- 💻 Qualité du code commenté (2 points)

**Bonne chance !** 🚀
