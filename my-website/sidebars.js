/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: '🏠 Accueil',
    },
    {
      type: 'category',
      label: '✏️ Projet 1 — Traceur 2D',
      collapsible: true,
      collapsed: false,
      link: { type: 'doc', id: 'projet-plotter/introduction' },
      items: [
        'projet-plotter/introduction',
        'projet-plotter/materiel',
        'projet-plotter/assemblage-mecanique',
        'projet-plotter/cablage',
        'projet-plotter/code',
        'projet-plotter/calibration',
        'projet-plotter/projets-avances',
        'projet-plotter/exercices',
      ],
    },
    {
      type: 'category',
      label: '🌱 Projet 2 — Irrigation Intelligente',
      collapsible: true,
      collapsed: false,
      link: { type: 'doc', id: 'projet-irrigation/introduction' },
      items: [
        'projet-irrigation/introduction',
        'projet-irrigation/materiel',
        'projet-irrigation/assemblage',
        'projet-irrigation/cablage',
        'projet-irrigation/code',
        'projet-irrigation/installation',
        'projet-irrigation/exercices',
      ],
    },
  ],
};

module.exports = sidebars;
