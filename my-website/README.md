# 🤖 Arduino EduKit Algérie

[![Deploy to GitHub Pages](https://github.com/arduino-edu-algerie/arduino-edukit/actions/workflows/deploy.yml/badge.svg)](https://github.com/arduino-edu-algerie/arduino-edukit/actions/workflows/deploy.yml)
[![Licence MIT](https://img.shields.io/badge/Licence-MIT-blue.svg)](LICENSE)
[![Docusaurus](https://img.shields.io/badge/Powered%20by-Docusaurus-green.svg)](https://docusaurus.io)

> Kits Arduino éducatifs fabriqués localement en Algérie pour les écoles, lycées et académies de coding.  
> Documentation complète en **français** avec instructions d'assemblage, code commenté et exercices progressifs.

🌐 **Site en ligne :** https://arduino-edu-algerie.github.io/arduino-edukit/

---

## 📦 Projets disponibles

| # | Projet | Niveau | Status |
|---|--------|--------|--------|
| 1 | [✏️ Traceur 2D (Plotter CNC)](docs/projet-plotter/) | 🔴 Avancé | ✅ Complet |
| 2 | [🌱 Irrigation Intelligente](docs/projet-irrigation/) | 🟡 Intermédiaire | ✅ Complet |
| 3 | 🌡️ Station Météo | 🟢 Débutant | 🔧 En cours |
| 4 | 🤖 Robot Suiveur de Ligne | 🟡 Intermédiaire | 🔧 En cours |
| 5 | 🔐 Serrure Intelligente RFID | 🟡 Intermédiaire | 🔧 En cours |
| 6 | ⚡ Monitor Solaire | 🔴 Avancé | 🔧 En cours |

---

## 🚀 Lancer la documentation en local

### Prérequis
- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/arduino-edu-algerie/arduino-edukit.git
cd arduino-edukit

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm start
# → Ouvre http://localhost:3000
```

### Build de production

```bash
npm run build
npm run serve
```

---

## 📁 Structure du projet

```
arduino-edukit/
├── docs/
│   ├── intro.md                          # Page d'accueil
│   ├── projet-plotter/                   # Projet Traceur 2D
│   │   ├── introduction.md
│   │   ├── materiel.md
│   │   ├── assemblage-mecanique.md
│   │   ├── cablage.md
│   │   ├── code.md
│   │   ├── calibration.md
│   │   ├── projets-avances.md
│   │   └── exercices.md
│   └── projet-irrigation/               # Projet Irrigation
│       ├── introduction.md
│       ├── materiel.md
│       ├── assemblage.md
│       ├── cablage.md
│       ├── code.md
│       ├── installation.md
│       └── exercices.md
├── src/
│   ├── css/custom.css                   # Styles personnalisés
│   └── pages/index.js                   # Page d'accueil interactive
├── static/                              # Images et fichiers statiques
├── .github/workflows/deploy.yml        # Déploiement automatique
├── docusaurus.config.js                 # Configuration Docusaurus
├── sidebars.js                          # Structure de la navigation
└── package.json
```

---

## 🤝 Contribuer

Les contributions sont les bienvenues !

1. **Fork** ce dépôt
2. Crée une **branche** : `git checkout -b feature/nouveau-projet`
3. **Commit** tes changements : `git commit -m "Ajout : Station Météo"`
4. **Push** : `git push origin feature/nouveau-projet`
5. Ouvre une **Pull Request**

### Idées de contribution
- 📝 Traduire la documentation en arabe
- 🐛 Corriger des erreurs dans le code Arduino
- 📸 Ajouter des photos d'assemblage
- 🆕 Documenter un nouveau projet
- 🌍 Proposer des exercices supplémentaires

---

## 📄 Licence

Ce projet est sous licence **MIT** — libre de l'utiliser, modifier et partager, y compris dans un contexte commercial.

---

## 📞 Contact

- 📧 Email : contact@arduino-edu-algerie.com  
- 📱 Facebook : [@ArduinoEduKitAlgerie](https://facebook.com)
- 🐛 Bugs & questions : [GitHub Issues](https://github.com/arduino-edu-algerie/arduino-edukit/issues)

---

*Fait avec ❤️ pour les élèves algériens 🇩🇿*
