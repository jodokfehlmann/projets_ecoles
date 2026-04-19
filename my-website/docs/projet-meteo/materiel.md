---
id: materiel
title: Matériel — Station Météo
sidebar_label: 🔧 Matériel
---

# 🔧 Liste du Matériel

## Composants électroniques

| # | Composant | Qté | Rôle |
|---|-----------|-----|------|
| 1 | Arduino Uno R3 | 1 | Cerveau du système |
| 2 | DHT22 | 1 | Température + humidité de l'air |
| 3 | BMP280 | 1 | Pression atmosphérique + altitude |
| 4 | ML8511 | 1 | Index UV solaire |
| 5 | Écran TFT 2.4" (ILI9341) | 1 | Affichage couleur |
| 6 | Module SD card | 1 | Enregistrement des données |
| 7 | RTC DS3231 | 1 | Horloge temps réel |
| 8 | Résistance 10kΩ | 1 | Pull-up DHT22 |
| 9 | Câble USB | 1 | Programmation |
| 10 | Carte SD (≤32GB, FAT32) | 1 | Stockage données |

## Pièces 3D imprimées

| Pièce | Description |
|-------|-------------|
| Boîtier principal | Contient Arduino + électronique |
| Grille de ventilation | Laisse passer l'air pour le DHT22 |
| Support mural | Fixation au mur ou fenêtre |
| Cache arrière | Fermeture du boîtier |

## Outils nécessaires

- Tournevis cruciforme
- Fer à souder + étain (pour les headers si nécessaire)
- Ordinateur avec Arduino IDE

:::tip Préparer la carte SD
Avant de commencer, formate la carte SD en **FAT32** depuis ton ordinateur. Sur Mac : Utilitaire de disque → Sélectionne la SD → Effacer → Format MS-DOS (FAT).
:::
