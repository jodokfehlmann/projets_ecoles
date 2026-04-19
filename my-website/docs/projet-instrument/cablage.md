---
id: cablage
title: Câblage — Instrument MIDI
sidebar_label: 🔌 Câblage
---
# 🔌 Câblage de l'Instrument

## Câblage des électrodes touch capacitives
```
Pour CHAQUE électrode (×8) :
Arduino broche ──── Résistance 1MΩ ──── Électrode (alu)
```
| Touche | Broche Arduino |
|--------|---------------|
| Do (C4) | D2 |
| Ré (D4) | D3 |
| Mi (E4) | D4 |
| Fa (F4) | D5 |
| Sol (G4)| D6 |
| La (A4) | D7 |
| Si (B4) | D8 |
| Do (C5) | D9 |

## Câblage audio
```
Arduino D10 ──► PAM8403 IN+ ──► Haut-parleur +
Arduino GND ──► PAM8403 IN- ──► Haut-parleur -
Arduino 5V  ──► PAM8403 VCC
Potentiomètre sur PAM8403 volume
```

## Câblage LEDs RGB (×4)
```
D11, D12, D13, A0 ──► LED R/G/B via résistances 220Ω
```

## Bibliothèques nécessaires
| Bibliothèque | Auteur |
|-------------|--------|
| `CapacitiveSensor` | Paul Badger |

✅ **Câblage terminé !** → Passe au **[code →](./code)**
