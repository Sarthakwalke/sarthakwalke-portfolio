import { useEffect, useState } from 'react'
import './App.css'
import { MechanicalScene } from './components/MechanicalScene'
import { portfolioData } from './data/portfolio'

const sectionLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#journey', label: 'Journey' },
  { href: '#contact', label: 'Contact' },
]

function App() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const applyPreference = () => setReducedMotion(media.matches)

    applyPreference()
    media.addEventListener('change', applyPreference)

    return () => media.removeEventListener('change', applyPreference)
  }, [])

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header className="top-nav">
        <a href="#hero" className="brand">
          <span className="brand-mark" aria-hidden="true">
            ⚙
          </span>
          {portfolioData.name}
        </a>
        <nav aria-label="Primary navigation">
          <ul>
            {sectionLinks.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="main-content">
        <section id="hero" className="hero-panel">
          <div className="hero-copy">
            <p className="eyebrow">Engineering + Intelligence</p>
            <h1>
              {portfolioData.name}
              <span>{portfolioData.role}</span>
            </h1>
            <p className="lead">{portfolioData.intro}</p>
            <p className="focus-line">
              Focus: {portfolioData.focus.join(' • ')}
            </p>
            <div className="hero-actions">
              <a className="button solid" href="#projects">
                View Projects
              </a>
              <a className="button ghost" href="#contact">
                Contact
              </a>
            </div>
          </div>
          <MechanicalScene reducedMotion={reducedMotion} />
        </section>

        <section id="about" className="content-section">
          <h2>About</h2>
          <p>{portfolioData.about}</p>
          <p>
            <strong>Location:</strong> {portfolioData.location}
          </p>
          <p>{portfolioData.availability}</p>
        </section>

        <section id="skills" className="content-section">
          <h2>Skills & Tooling</h2>
          <div className="skill-grid">
            {Object.entries(portfolioData.skills).map(([group, items]) => (
              <article key={group} className="card skill-card">
                <h3>{group}</h3>
                <ul>
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="content-section">
          <h2>Featured Projects</h2>
          <div className="project-grid">
            {portfolioData.projects.map((project) => (
              <article key={project.name} className="card project-card">
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <p className="tags">{project.tools.join(' • ')}</p>
                {project.link ? (
                  <a href={project.link} target="_blank" rel="noreferrer">
                    Project link
                  </a>
                ) : (
                  <p className="muted" aria-label="Project link not currently listed">
                    Link not listed yet
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>

        <section id="journey" className="content-section">
          <h2>Education, Experience & Certifications</h2>
          <div className="timeline-grid">
            <article className="card">
              <h3>Education</h3>
              <ul>
                {portfolioData.education.map((item) => (
                  <li key={item.title}>
                    <strong>{item.title}</strong>
                    <p>{item.organization}</p>
                    <p>{item.detail}</p>
                  </li>
                ))}
              </ul>
            </article>

            <article className="card">
              <h3>Experience</h3>
              <ul>
                {portfolioData.experience.map((item) => (
                  <li key={item.title}>
                    <strong>{item.title}</strong>
                    <p>{item.organization}</p>
                    <p>{item.detail}</p>
                  </li>
                ))}
              </ul>
            </article>

            <article className="card">
              <h3>Certifications</h3>
              <ul>
                {portfolioData.certifications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section id="contact" className="content-section">
          <h2>Contact & Social</h2>
          <p>Let&apos;s collaborate on mechanical + intelligent system projects.</p>
          <ul className="social-list">
            {portfolioData.socials.map((social) => (
              <li key={social.label}>
                <a href={social.url} target="_blank" rel="noreferrer">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}

export default App
