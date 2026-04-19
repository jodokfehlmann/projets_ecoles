/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    { type: 'doc', id: 'intro', label: '🏠 Accueil' },
    {
      type: 'category', label: '✏️ Projet 1 — Traceur 2D',
      collapsible: true, collapsed: true,
      link: { type: 'doc', id: 'projet-plotter/introduction' },
      items: ['projet-plotter/introduction','projet-plotter/materiel','projet-plotter/assemblage-mecanique','projet-plotter/cablage','projet-plotter/code','projet-plotter/calibration','projet-plotter/projets-avances','projet-plotter/exercices'],
    },
    {
      type: 'category', label: '🌱 Projet 2 — Irrigation Intelligente',
      collapsible: true, collapsed: true,
      link: { type: 'doc', id: 'projet-irrigation/introduction' },
      items: ['projet-irrigation/introduction','projet-irrigation/materiel','projet-irrigation/assemblage','projet-irrigation/cablage','projet-irrigation/code','projet-irrigation/installation','projet-irrigation/exercices'],
    },
    {
      type: 'category', label: '🌡️ Projet 3 — Station Météo',
      collapsible: true, collapsed: true,
      link: { type: 'doc', id: 'projet-meteo/introduction' },
      items: ['projet-meteo/introduction','projet-meteo/materiel','projet-meteo/assemblage','projet-meteo/cablage','projet-meteo/code','projet-meteo/exercices'],
    },
    {
      type: 'category', label: '🤖 Projet 4 — Robot Suiveur de Ligne',
      collapsible: true, collapsed: true,
      link: { type: 'doc', id: 'projet-robot/introduction' },
      items: ['projet-robot/introduction','projet-robot/materiel','projet-robot/assemblage','projet-robot/cablage','projet-robot/code','projet-robot/exercices'],
    },
    {
      type: 'category', label: '🔐 Projet 5 — Serrure Intelligente',
      collapsible: true, collapsed: true,
      link: { type: 'doc', id: 'projet-serrure/introduction' },
      items: ['projet-serrure/introduction','projet-serrure/materiel','projet-serrure/assemblage','projet-serrure/cablage','projet-serrure/code','projet-serrure/exercices'],
    },
    {
      type: 'category', label: '⚡ Projet 6 — Monitor Solaire',
      collapsible: true, collapsed: true,
      link: { type: 'doc', id: 'projet-solaire/introduction' },
      items: ['projet-solaire/introduction','projet-solaire/materiel','projet-solaire/assemblage','projet-solaire/cablage','projet-solaire/code','projet-solaire/exercices'],
    },
    {
      type: 'category', label: '🎵 Projet 7 — Instrument MIDI',
      collapsible: true, collapsed: true,
      link: { type: 'doc', id: 'projet-instrument/introduction' },
      items: ['projet-instrument/introduction','projet-instrument/materiel','projet-instrument/assemblage','projet-instrument/cablage','projet-instrument/code','projet-instrument/exercices'],
    },
    {
      type: 'category', label: "🌍 Projet 8 — Qualité de l'Air",
      collapsible: true, collapsed: true,
      link: { type: 'doc', id: 'projet-air/introduction' },
      items: ['projet-air/introduction','projet-air/materiel','projet-air/assemblage','projet-air/cablage','projet-air/code','projet-air/exercices'],
    },
  ],
};
module.exports = sidebars;
