// @ts-check
const { themes } = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Arduino EduKit Algérie',
  tagline: 'Apprenez l\'électronique et la programmation avec des projets réels',
  favicon: 'img/favicon.ico',
  url: 'https://jodokfehlmann.github.io',
  baseUrl: '/projets_ecoles/',
  organizationName: 'jodokfehlmann',
  projectName: 'projets_ecoles',
  trailingSlash: false,
  onBrokenLinks: 'warn',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/arduino-edu-algerie/arduino-edukit/tree/main/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/arduino-edu-algerie/arduino-edukit/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social-card.png',
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: '🤖 Arduino EduKit',
        logo: {
          alt: 'Arduino EduKit Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '📚 Projets',
          },
          {
            to: '/blog',
            label: '📰 Nouveautés',
            position: 'left'
          },
          {
            href: 'https://github.com/arduino-edu-algerie/arduino-edukit',
            label: '💻 GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '📚 Projets',
            items: [
              { label: '✏️ Traceur 2D', to: '/docs/projet-plotter/introduction' },
              { label: '🌱 Irrigation Intelligente', to: '/docs/projet-irrigation/introduction' },
            ],
          },
          {
            title: '🔗 Ressources',
            items: [
              { label: 'Arduino.cc', href: 'https://www.arduino.cc' },
              { label: 'Thingiverse', href: 'https://www.thingiverse.com' },
              { label: 'Binarytech DZ', href: 'https://binarytech-dz.com' },
            ],
          },
          {
            title: '📦 Code Source',
            items: [
              { label: 'GitHub', href: 'https://github.com/arduino-edu-algerie/arduino-edukit' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Arduino EduKit Algérie. Fait avec ❤️ pour les élèves algériens.`,
      },
      prism: {
        theme: themes.github,
        darkTheme: themes.dracula,
        additionalLanguages: ['cpp', 'bash'],
      },
      announcementBar: {
        id: 'new_projects',
        content: '🎉 2 projets disponibles : Traceur 2D et Irrigation Intelligente ! D\'autres arrivent bientôt.',
        backgroundColor: '#1F4E79',
        textColor: '#fff',
        isCloseable: true,
      },
    }),
};

module.exports = config;
