import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const projects = [
  {
    emoji: '✏️',
    title: 'Traceur 2D (Plotter)',
    description: 'Construis une machine à dessiner avec des moteurs pas-à-pas, des courroies et une structure 100% imprimée en 3D. Programme-la pour tracer des lettres, des formes et des images !',
    level: 'Avancé',
    levelClass: 'badge-avance',
    duration: '6–8 heures',
    link: '/docs/projet-plotter/introduction',
    color: '#2E75B6',
  },
  {
    emoji: '🌱',
    title: 'Irrigation Intelligente',
    description: 'Conçois un système d\'arrosage automatique pour le jardin de l\'école. Des capteurs d\'humidité du sol déclenchent automatiquement des électrovannes quand les plantes ont besoin d\'eau.',
    level: 'Intermédiaire',
    levelClass: 'badge-intermediaire',
    duration: '4–6 heures',
    link: '/docs/projet-irrigation/introduction',
    color: '#1A6B3C',
  },
  {
    emoji: '🌡️',
    title: 'Station Météo',
    description: 'Mesure température, humidité, pression et UV. Affiche les données sur un écran couleur et enregistre-les sur carte SD.',
    level: 'Débutant',
    levelClass: 'badge-debutant',
    duration: '3–4 heures',
    link: '/docs/projet-meteo/introduction',
    color: '#0D6E6E',
  },
  {
    emoji: '🤖',
    title: 'Robot Suiveur de Ligne',
    description: 'Construis un robot autonome avec un châssis imprimé en 3D qui suit une ligne noire sur le sol grâce à des capteurs infrarouges.',
    level: 'Intermédiaire',
    levelClass: 'badge-intermediaire',
    duration: '5–6 heures',
    link: '#',
    color: '#C45A00',
    comingSoon: true,
  },
  {
    emoji: '🔐',
    title: 'Serrure Intelligente',
    description: 'Système de contrôle d\'accès avec lecteur RFID, clavier à codes, afficheur LCD et servo-moteur. Parfait pour apprendre la sécurité électronique.',
    level: 'Intermédiaire',
    levelClass: 'badge-intermediaire',
    duration: '4–5 heures',
    link: '#',
    color: '#5B2D8E',
    comingSoon: true,
  },
  {
    emoji: '⚡',
    title: 'Monitor Solaire',
    description: 'Mesure la puissance produite par un panneau solaire en temps réel. Parfait pour comprendre les énergies renouvelables en Algérie.',
    level: 'Avancé',
    levelClass: 'badge-avance',
    duration: '5–7 heures',
    link: '#',
    color: '#B8860B',
    comingSoon: true,
  },
];

function HeroSection() {
  return (
    <header className="hero hero--primary">
      <div className="container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🤖</div>
        <h1 className="hero__title">Arduino EduKit Algérie</h1>
        <p className="hero__subtitle">
          Apprenez l'électronique et la programmation à travers des projets réels.<br/>
          Des kits 100% fabriqués localement, avec des notices en français et en arabe.
        </p>
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link className="button button--secondary button--lg" to="/docs/intro">
            🚀 Commencer maintenant
          </Link>
          <Link className="button button--outline button--secondary button--lg" to="https://github.com/arduino-edu-algerie/arduino-edukit">
            💻 Voir sur GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}

function StatsSection() {
  const stats = [
    { value: '8', label: 'Projets prévus' },
    { value: '2', label: 'Disponibles maintenant' },
    { value: 'FR + AR', label: 'Langues' },
    { value: '100%', label: 'Fabriqué en Algérie' },
  ];
  return (
    <div style={{ background: '#F5F9FF', padding: '2rem 0' }}>
      <div className="container">
        <div className="info-grid">
          {stats.map((s, i) => (
            <div className="info-box" key={i}>
              <span className="info-value">{s.value}</span>
              <span className="info-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="project-card" style={{ borderTopColor: project.color, borderTopWidth: 4 }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{project.emoji}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
        <h3 style={{ margin: 0, color: project.color }}>{project.title}</h3>
        {project.comingSoon && (
          <span style={{ background: '#eee', color: '#888', borderRadius: 20, padding: '2px 10px', fontSize: '0.75rem' }}>
            Bientôt
          </span>
        )}
      </div>
      <span className={project.levelClass} style={{ marginBottom: '0.5rem', display: 'inline-block' }}>
        {project.level}
      </span>
      <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem', color: '#666' }}>⏱ {project.duration}</span>
      <p style={{ margin: '0.75rem 0 1rem', color: '#555', lineHeight: 1.6 }}>{project.description}</p>
      {!project.comingSoon ? (
        <Link className="button button--primary button--sm" to={project.link}>
          Voir le projet →
        </Link>
      ) : (
        <span style={{ fontSize: '0.85rem', color: '#999', fontStyle: 'italic' }}>Documentation en cours...</span>
      )}
    </div>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="Accueil" description="Kits Arduino éducatifs fabriqués en Algérie pour les écoles et académies">
      <HeroSection />
      <StatsSection />
      <main>
        <div className="container" style={{ padding: '3rem 1rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '2rem' }}>🗂️ Catalogue des Projets</h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '2.5rem' }}>
            Chaque projet est accompagné d'une documentation complète, du code Arduino commenté et d'exercices progressifs.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {projects.map((p, i) => <ProjectCard key={i} project={p} />)}
          </div>

          {/* WHY SECTION */}
          <div style={{ marginTop: '4rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🇩🇿 Pourquoi Arduino EduKit Algérie ?</h2>
            <p style={{ color: '#666', maxWidth: 600, margin: '0 auto 2rem' }}>
              Les kits importés coûtent cher et les notices sont en anglais. Nous fabriquons localement avec des pièces imprimées en 3D et rédigeons la documentation en français et en arabe.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', maxWidth: 900, margin: '0 auto' }}>
              {[
                { icon: '💰', title: 'Prix accessible', desc: 'Kits à partir de 6.000 DZD — 3× moins cher que les importations' },
                { icon: '🇫🇷', title: 'En français & arabe', desc: 'Toute la documentation dans les langues de nos élèves' },
                { icon: '🔧', title: '100% local', desc: 'Pièces imprimées en 3D en Algérie, livraison rapide' },
                { icon: '📚', title: 'Pédagogique', desc: 'Conçu avec des enseignants pour correspondre aux programmes scolaires' },
              ].map((f, i) => (
                <div key={i} style={{ padding: '1.5rem', background: '#F5F9FF', borderRadius: 12, border: '1px solid #e0ecf8' }}>
                  <div style={{ fontSize: '2rem' }}>{f.icon}</div>
                  <strong style={{ display: 'block', margin: '0.5rem 0 0.25rem' }}>{f.title}</strong>
                  <span style={{ fontSize: '0.9rem', color: '#666' }}>{f.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
