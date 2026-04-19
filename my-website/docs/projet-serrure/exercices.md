---
id: exercices
title: Exercices — Serrure Intelligente
sidebar_label: 📝 Exercices
---

# 📝 Exercices — Serrure Intelligente

## 🟢 Niveau 1 — Débutant

### Exercice 1.1 — Lire l'UID de ta carte
Utilise le code de test fourni pour afficher l'UID de ta carte RFID dans le moniteur série. Note-le et remplace le dans le code principal.

### Exercice 1.2 — Changer le code PIN
Modifie `CODE_PIN` pour utiliser un code à 6 chiffres. Adapte aussi la logique de validation.

### Exercice 1.3 — Messages personnalisés
Modifie les messages affichés sur le LCD pour les personnaliser (ton prénom, le nom de la classe, etc.).

---

## 🟡 Niveau 2 — Intermédiaire

### Exercice 2.1 — Multi-cartes avec EEPROM
Stocke jusqu'à 5 UIDs de cartes autorisées dans l'EEPROM. Écris les fonctions `ajouterCarte(uid)` et `supprimerCarte(uid)`.

```cpp
// Structure en EEPROM : adresse 0 = nombre de cartes, puis UIDs de 4 octets chacun
void ajouterCarte(byte* uid, byte taille) {
  byte nbCartes = EEPROM.read(0);
  int adresse = 1 + nbCartes * 4;
  for (byte i = 0; i < taille; i++) {
    EEPROM.write(adresse + i, uid[i]);
  }
  EEPROM.write(0, nbCartes + 1);
}
```

### Exercice 2.2 — Mode administrateur
Appuie sur la touche 'A' du clavier pour entrer en mode admin (avec mot de passe). En mode admin : enregistre la prochaine carte comme autorisée.

### Exercice 2.3 — Journal d'accès
À chaque tentative (réussie ou non), enregistre l'heure et le résultat sur une carte SD ou dans le moniteur série.

---

## 🔴 Niveau 3 — Avancé

### Exercice 3.1 — Double authentification
Pour ouvrir la serrure, il faut **à la fois** une carte RFID valide ET le bon code PIN (comme les banques !).

### Exercice 3.2 — Serrure connectée
Ajoute un module **ESP8266** pour envoyer une notification sur Telegram quand quelqu'un accède au local.

### Exercice 3.3 — Empreinte digitale
Remplace le lecteur RFID par un capteur d'**empreinte digitale AS608**. La bibliothèque `Adafruit_Fingerprint` facilite l'intégration.

---

## 🏆 Défi Final

Construis un système de sécurité complet pour la salle des professeurs :
- 3 niveaux d'accès (élève, professeur, directeur)
- Journal des entrées avec horodatage
- Alarme si tentative de forçage détectée
- Interface web pour gérer les accès à distance
