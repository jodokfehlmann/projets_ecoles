---
id: materiel
title: Matériel — CanSat
sidebar_label: 🔧 Matériel
---

# 🔧 Liste du Matériel

## Module satellite (dans la canette)

| # | Composant | Qté | Rôle |
|---|-----------|-----|------|
| 1 | Arduino Nano / Pro Mini | 1 | Cerveau principal |
| 2 | BMP280 | 1 | Pression + altitude + température |
| 3 | MPU6050 | 1 | Accéléromètre + gyroscope 6 axes |
| 4 | Module GPS NEO-6M | 1 | Position géographique |
| 5 | Module LoRa SX1276 433MHz | 1 | Transmission radio sol |
| 6 | Module SD card | 1 | Enregistrement de secours |
| 7 | Servo SG90 | 1 | Déploiement parachute |
| 8 | Batterie LiPo 500mAh | 1 | Alimentation |
| 9 | LED verte (clignotante) | 1 | Indicateur de fonctionnement |
| 10 | Buzzer | 1 | Localisation après atterrissage |

## Station sol (réception)

| # | Composant | Qté | Rôle |
|---|-----------|-----|------|
| 1 | Arduino Uno | 1 | Réception des données |
| 2 | Module LoRa SX1276 433MHz | 1 | Réception radio |
| 3 | Écran LCD 20×4 | 1 | Affichage temps réel |
| 4 | Module SD | 1 | Enregistrement des données reçues |
| 5 | Câble USB | 1 | Transmission vers PC |

## Matériel de construction

| Article | Description |
|---------|-------------|
| Canette de soda 330ml | Structure du satellite |
| Fil nylon solide | Couture du parachute |
| Tissu léger (ripstop) | Parachute (~40cm Ø) |
| Mousse EVA 5mm | Protection interne |
| Fil de pêche 10kg | Suspension parachute |
| Ruban adhésif Kapton | Fixations résistantes à la chaleur |

## Pièces 3D imprimées

| Pièce | Description |
|-------|-------------|
| Plateau interne | Maintient l'électronique dans la canette |
| Mécanisme d'éjection parachute | Actionné par servo |
| Nez de la canette | Aérodynamisme |
| Pied d'atterrissage | Protège à l'impact |

:::warning Fusée séparée
Ce kit ne comprend pas la fusée. Utilise une fusée modèle réduit commerciale (Estes, Klima) avec un moteur de classe C ou D. Respecte toujours les règles de sécurité !
:::