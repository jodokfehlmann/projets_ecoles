---
id: cablage
title: Câblage — Irrigation Intelligente
sidebar_label: 🔌 Câblage
---

# 🔌 Câblage Électronique

:::danger Sécurité eau + électricité
Le boîtier doit être **complètement fermé et étanche** avant installation dans le jardin. Ne jamais ouvrir le boîtier quand il pleut ou les mains mouillées.
:::

---

## Schéma de câblage

```
Arduino              Composant
──────               ─────────
A0          ────►    Capteur humidité sol 1 (signal)
A1          ────►    Capteur humidité sol 2 (signal)
D2          ────►    DHT22 (données)
D3          ────►    Relais canal 1 (IN1) → Électrovanne zone A
D4          ────►    Relais canal 2 (IN2) → Électrovanne zone B
SDA (A4)    ────►    LCD I2C SDA
SCL (A5)    ────►    LCD I2C SCL
5V          ────►    Capteurs + DHT22 + Relais VCC + LCD VCC
GND         ────►    Tous les GND
```

## Câblage des capteurs d'humidité

| Fil capteur | Arduino |
|-------------|---------|
| VCC (rouge) | 5V |
| GND (noir) | GND |
| AOUT (jaune) | A0 (capteur 1) ou A1 (capteur 2) |

## Câblage du relais vers les électrovannes

```
Alimentation 12V (+) ────┬──── COM relais 1
                         └──── COM relais 2

Relais 1 NO ────►  (+) Électrovanne Zone A
Relais 2 NO ────►  (+) Électrovanne Zone B

12V GND     ────►  (-) des deux électrovannes
```

:::info NO vs NC
Utilise toujours le contact **NO (Normally Open)** du relais. Ainsi en cas de panne, les vannes restent **fermées** — pas d'inondation !
:::

## Câblage du DHT22

| Fil | Arduino |
|-----|---------|
| VCC | 5V |
| GND | GND |
| DATA | D2 |

(Résistance 10kΩ entre VCC et DATA — incluse dans le kit)

---

✅ **Câblage terminé !** → Passe au **[code →](./code)**
