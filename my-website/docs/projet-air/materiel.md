---
id: materiel
title: Matériel — Qualité de l'Air
sidebar_label: 🔧 Matériel
---
# 🔧 Liste du Matériel

| # | Composant | Qté | Rôle |
|---|-----------|-----|------|
| 1 | Arduino Uno R3 | 1 | Cerveau |
| 2 | MQ-135 (CO₂, NH₃, benzène) | 1 | Capteur de gaz principal |
| 3 | DSM501A ou GP2Y1010 | 1 | Capteur particules fines PM2.5 |
| 4 | DHT22 | 1 | Température et humidité |
| 5 | OLED 0.96" I2C (SSD1306) | 1 | Affichage compact |
| 6 | LED rouge, jaune, verte | 3 | Ampel (feux tricolores) |
| 7 | Buzzer actif | 1 | Alarme sonore |
| 8 | Module SD | 1 | Enregistrement données |
| 9 | Résistances 220Ω | 3 | LEDs |
| 10 | Résistance 150Ω | 1 | LED interne GP2Y1010 |

## Pièces 3D imprimées
| Pièce | Description |
|-------|-------------|
| Boîtier mural | Se fixe au mur de la classe |
| Façade avec fenêtre OLED | Affichage visible |
| Grille d'aération | Laisse l'air circuler vers les capteurs |
| Support ampel | Maintient les 3 LEDs verticalement |

:::warning Préchauffage MQ-135
Le capteur MQ-135 nécessite **24 heures de préchauffage** lors de la première utilisation pour être stable. Les premières mesures peuvent être inexactes.
:::
