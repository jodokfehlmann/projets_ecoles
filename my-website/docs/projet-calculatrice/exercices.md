---
id: exercices
title: Exercices — Calculatrice RPN
sidebar_label: 📝 Exercices
---

# 📝 Exercices — Calculatrice RPN

## 🟢 Niveau 1 — Débutant

### Exercice 1.1 — Premiers calculs RPN
Utilise la calculatrice pour résoudre ces expressions en notation RPN :
1. `15 + 27` → Comment l'écrire en RPN ?
2. `(8 + 2) × 3`
3. `100 ÷ (5 × 4)`

### Exercice 1.2 — Ajouter la touche CLR
Ajoute une touche `C` (Clear) qui remet tout à zéro :
```cpp
} else if (touche == 'C') {
  pile[0] = pile[1] = pile[2] = pile[3] = 0;
  saisie = "";
  enSaisie = false;
}
```

### Exercice 1.3 — Feedback visuel
Fais clignoter le fond de l'écran brièvement quand une erreur se produit (division par zéro, etc.).

---

## 🟡 Niveau 2 — Intermédiaire

### Exercice 2.1 — Fonctions scientifiques
Ajoute une touche de **shift** (comme les vraies calculatrices HP). En mode shift, les touches prennent des fonctions secondaires :

```cpp
bool modeShift = false;

void traiterToucheShift(char touche) {
  if (touche == '7') {
    // Shift + 7 = sin
    push(sin(pop() * PI / 180.0));  // Entrée en degrés
  } else if (touche == '8') {
    push(cos(pop() * PI / 180.0));
  } else if (touche == '9') {
    push(tan(pop() * PI / 180.0));
  } else if (touche == '4') {
    push(sqrt(abs(pop())));  // Racine carrée
  } else if (touche == '5') {
    push(log10(abs(pop()))); // Log base 10
  } else if (touche == '6') {
    push(log(abs(pop())));   // Ln
  }
  modeShift = false;
}
```

### Exercice 2.2 — Mémoire M+/MR
Implémente une mémoire simple :
- `M+` : stocker X en mémoire
- `MR` : rappeler la valeur mémoire

### Exercice 2.3 — Historique des calculs
Enregistre les 5 dernières opérations et permets de les revoir en appuyant sur une touche dédiée.

---

## 🔴 Niveau 3 — Avancé

### Exercice 3.1 — Mode algébrique
Ajoute un mode de calcul algébrique classique (avec gestion des priorités opératoires) en utilisant l'**algorithme de Shunting-Yard** de Dijkstra.

### Exercice 3.2 — Programmabilité
Implémente un mini-langage de programmation : l'utilisateur peut enregistrer une séquence de touches comme un "programme" et le rejouer sur différentes valeurs.

**Exemple :** Programme pour calculer la surface d'un cercle `πr²`
```
Enregistrer : ENTER PI * X² (où X est le rayon entré au départ)
```

### Exercice 3.3 — Communication série
Fais communiquer la calculatrice avec Python via USB :
```python
import serial
calc = serial.Serial('/dev/ttyUSB0', 9600)
calc.write(b'3 4 +\n')  # Envoyer un calcul
result = calc.readline()  # Lire le résultat
print(result)  # → 7.0
```

---

## 🏆 Défi Final — Calculatrice personnalisée

Conçois **ta propre calculatrice** pour un usage spécifique :
- Calculatrice de **résistances en série/parallèle** pour les cours d'électronique
- Calculatrice de **conversions** (°C↔°F, km↔miles, DZD↔EUR)
- Calculatrice de **trigonométrie** pour les cours de mathématiques

Présente ton projet à la classe avec une démonstration en direct ! 🧮