---
id: cablage
title: Câblage Électronique — Traceur 2D
sidebar_label: 🔌 Câblage
---

# 🔌 Câblage Électronique

:::danger Sécurité — À lire avant de commencer
- **Débranche** toujours l'alimentation avant de toucher aux câbles
- Ne jamais connecter/déconnecter les moteurs **sous tension** — cela détruit les drivers A4988 !
- Vérifie deux fois avant d'alimenter
:::

---

## 🗺️ Schéma de câblage complet

```
                    ┌─────────────────────────┐
                    │       ARDUINO UNO        │
                    │                          │
   Servo SG90 ─────►│ D9  (PWM servo)          │
                    │                          │
   Driver A4988 X   │                          │
   ├── STEP ────────►│ D3                       │
   ├── DIR  ────────►│ D4                       │
   └── ENABLE ─────►│ D8                       │
                    │                          │
   Driver A4988 Y   │                          │
   ├── STEP ────────►│ D5                       │
   ├── DIR  ────────►│ D6                       │
   └── ENABLE ─────►│ D8  (partagé !)          │
                    │                          │
   Bouton Reset ───►│ D2  (INPUT_PULLUP)       │
                    │                          │
                    │ GND ◄───── GND commun    │
                    │ 5V  ────►  Drivers (VDD) │
                    └─────────────────────────┘
                    
   Alimentation 12V ─────► Drivers VMOT + condensateur 100µF
```

---

## Étape 1 — Câbler les drivers A4988

### 1.1 Identifier les broches du A4988

```
        A4988 — Vue de dessus
    ┌────────────────────────┐
    │ ENABLE  MS1  MS2  MS3  │
    │                        │
    │ RESET   SLEEP          │
    ├────────────────────────┤
    │ STEP                   │
    │ DIR                    │
    ├────────────────────────┤
    │ VDD    GND             │  ← Alimentation logique (5V)
    │ VMOT   GND             │  ← Alimentation moteur (12V)
    ├────────────────────────┤
    │ 1A   1B   2A   2B      │  ← Bobines du moteur
    └────────────────────────┘
```

### 1.2 Connexions Driver X (moteur axe X)

| Broche A4988 | Connexion |
|--------------|-----------|
| VMOT | +12V (alimentation) |
| GND (côté VMOT) | GND alimentation |
| VDD | +5V Arduino |
| GND (côté VDD) | GND Arduino |
| STEP | D3 Arduino |
| DIR | D4 Arduino |
| ENABLE | D8 Arduino |
| RESET | Relier à SLEEP |
| SLEEP | Relier à RESET |
| 1A, 1B | Bobine 1 moteur X (fils noirs/verts) |
| 2A, 2B | Bobine 2 moteur X (fils rouges/bleus) |

:::warning Condensateur obligatoire !
Place un condensateur **100µF** entre VMOT et GND, **aussi proche que possible** du driver. Sans lui, les pics de tension des moteurs peuvent détruire le driver en quelques minutes !
:::

### 1.3 Connexions Driver Y (moteur axe Y)

Identique au driver X, avec les exceptions suivantes :

| Broche A4988 | Connexion |
|--------------|-----------|
| STEP | **D5** Arduino |
| DIR | **D6** Arduino |
| ENABLE | D8 Arduino (partagé avec X) |
| 1A, 1B | Bobine 1 moteur Y |
| 2A, 2B | Bobine 2 moteur Y |

---

## Étape 2 — Câbler le servo-moteur

Le servo SG90 a **3 fils** :

| Couleur fil | Connexion |
|-------------|-----------|
| 🟤 Marron | GND Arduino |
| 🔴 Rouge | 5V Arduino |
| 🟠 Orange | **D9** Arduino (PWM) |

---

## Étape 3 — Câbler le bouton reset

```
Arduino D2 ──────┬──── Bouton ──── GND
                 │
            (INPUT_PULLUP activé dans le code)
```

Le code utilise `INPUT_PULLUP` donc **pas besoin de résistance externe**.

---

## Étape 4 — Régler le courant des drivers A4988

:::danger Étape critique
Un courant trop élevé **surchauffe et détruit** les moteurs. Un courant trop faible → moteurs qui sautent des pas.
:::

### Calcul de la tension de référence (Vref)

**Formule :** `Vref = Courant_moteur × 8 × R_sense`

Pour les moteurs NEMA 17 du kit (courant = 0.8A) et R_sense = 0.1Ω :
```
Vref = 0.8 × 8 × 0.1 = 0.64V
```

### Comment régler

1. **Alimente le circuit** (sans moteurs connectés d'abord)
2. Mesure la tension entre le **potentiomètre** du A4988 et le **GND**
3. Tourne le potentiomètre avec un tournevis plat **très doucement**
4. Vise **0.64V** (±0.05V)
5. Répète pour le second driver

```
   Multimètre rouge ──── Potentiomètre du A4988
   Multimètre noir  ──── GND
   Lire la tension et ajuster
```

---

## Étape 5 — Vérification avant mise sous tension

Utilise cette checklist **avant** d'alimenter le circuit :

- [ ] Condensateurs 100µF en place sur les deux drivers
- [ ] RESET et SLEEP reliés ensemble sur chaque driver
- [ ] Bobines moteur correctement connectées (pas de court-circuit)
- [ ] Servo branché sur D9 avec la bonne polarité
- [ ] 12V et GND de l'alimentation connectés aux bons endroits
- [ ] Vref réglé à ~0.64V sur les deux drivers

### Test de démarrage

1. Connecte le câble USB à l'Arduino (pas encore l'alimentation 12V)
2. La LED verte de l'Arduino doit s'allumer → ✅ 5V OK
3. Branche l'alimentation 12V
4. Les drivers ne doivent **pas chauffer** au toucher en 30 secondes → ✅
5. Si un driver chauffe fort → **débranche immédiatement** et vérifie le câblage

---

✅ **Câblage terminé !** → Passe au **[code Arduino →](./code)**
