---
id: exercices
title: Exercices — Instrument MIDI
sidebar_label: 📝 Exercices
---
# 📝 Exercices — Instrument MIDI

## 🟢 Niveau 1 — Débutant

### Exercice 1.1 — Jouer une mélodie
Programme l'instrument pour jouer « Joyeux Anniversaire » automatiquement quand tu appuies sur la touche 'A' du clavier.

### Exercice 1.2 — Changer d'octave
Ajoute un bouton qui change d'octave (×2 toutes les fréquences = octave supérieure).

### Exercice 1.3 — Mode batterie
Reprogramme 4 touches pour jouer des sons de percussion (grosse caisse, caisse claire, charleston, tom).

---

## 🟡 Niveau 2 — Intermédiaire

### Exercice 2.1 — Theremin ultrasonique
Ajoute un capteur ultrasonique HC-SR04. La distance de ta main détermine la hauteur du son !

```cpp
long distance = mesurer();  // 5 à 50 cm
int freq = map(distance, 5, 50, 200, 2000);
tone(SPEAKER, freq);
```

### Exercice 2.2 — Enregistreur de mélodie
Enregistre jusqu'à 32 notes jouées par l'utilisateur en mémoire. Rejoue ensuite la mélodie enregistrée en appuyant sur un bouton spécial.

### Exercice 2.3 — Duo musical
Connecte deux instruments ensemble via les broches série (TX/RX). Quand l'un joue une note, l'autre répond automatiquement une tierce plus haut.

---

## 🔴 Niveau 3 — Avancé

### Exercice 3.1 — MIDI USB réel
Utilise la bibliothèque `MIDIUSB` pour que l'Arduino apparaisse comme un vrai instrument MIDI sur ton ordinateur. Connecte-le à GarageBand ou FL Studio !

```cpp
#include <MIDIUSB.h>
void jouerNoteMIDI(byte note, byte velocity) {
  midiEventPacket_t noteOn = {0x09, 0x90, note, velocity};
  MidiUSB.sendMIDI(noteOn);
  MidiUSB.flush();
}
```

### Exercice 3.2 — Synthétiseur polyphonique
Utilise un **Arduino Due** (plus puissant) pour jouer plusieurs notes simultanément via la sortie audio DAC.

### Exercice 3.3 — Composition algorithmique
Programme l'Arduino pour composer et jouer de la musique automatiquement en suivant des règles harmoniques simples (gamme, accords, rythme aléatoire).

---

## 🏆 Défi Final — Concert de classe

Organise un **mini-concert** où chaque groupe joue une mélodie avec son instrument. Critères :
- Mélodie reconnaissable (5 pts)
- Qualité sonore / volume (3 pts)
- Effets visuels LED (2 pts)

Bonne chance aux musiciens ! 🎵
