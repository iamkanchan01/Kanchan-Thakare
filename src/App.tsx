import { useEffect, useRef, useState } from 'react'
import { experience, process, proficiency, profile, projects, roles, skills } from './data/portfolio'
import './App.css'

const sections = ['about', 'skills', 'projects', 'experience', 'contact']

type Theme = 'light' | 'dark'

function getInitialTheme(): Theme {
  const saved = localStorage.getItem('theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// function DataProtectionBanner() {
//   return (
//     <div className="dp-banner" role="note" aria-label="Data protection notice">

//     </div>
//   )
// }

// Adds the "in" class to every .reveal element once it scrolls into view.
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.15 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return progress
}

function Typewriter({ words }: { words: string[] }) {
  const [text, setText] = useState(reducedMotion ? words[0] : '')
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reducedMotion) return
    const word = words[index % words.length]
    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), 1800)
      return () => clearTimeout(t)
    }
    const t = setTimeout(
      () => {
        if (deleting && text.length <= 1) {
          setDeleting(false)
          setIndex((i) => i + 1)
        }
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1))
      },
      deleting ? 35 : 70,
    )
    return () => clearTimeout(t)
  }, [text, deleting, index, words])

  return (
    <span className="typewriter" aria-label={words[0]}>
      {text}
      <span className="caret" aria-hidden="true" />
    </span>
  )
}

// Counts from 0 to `to` when scrolled into view.
function CountUp({ to, decimals = 0, suffix = '' }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(reducedMotion ? to : 0)

  useEffect(() => {
    if (reducedMotion || !ref.current) return
    let frame = 0
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min((now - start) / 1400, 1)
        setValue(to * (1 - Math.pow(1 - t, 3)))
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    })
    io.observe(ref.current)
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [to])

  return (
    <span ref={ref}>
      {value.toFixed(decimals)}
      {suffix}
    </span>
  )
}

const year = new Date().getFullYear()
const techCount =new Set(skills.flatMap((g) => g.items)).size
const numbers = [
  { to: 5.5, decimals: 1, label: 'Years building software' },
  { to: techCount, suffix: '+', label: 'Technologies & tools' },
  { to: skills.length, label: 'Skill domains' },
  { to: projects.length, label: 'Featured projects' },
]

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [menuOpen, setMenuOpen] = useState(false)
  const progress = useScrollProgress()
  useReveal()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />

      <header className="nav">
        <div className="container nav-inner">
          <a href="#top" className="logo">
            <span className="logo-mark">{profile.name.split(' ').map((w) => w[0]).join('')}</span>
            {profile.name}
          </a>
          <button
            className="menu-btn"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            ☰
          </button>
          <nav className={menuOpen ? 'open' : ''}>
            {sections.map((s) => (
              <a key={s} href={`#${s}`} onClick={() => setMenuOpen(false)}>
                {s[0].toUpperCase() + s.slice(1)}
              </a>
            ))}
            <button
              className="theme-btn"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? '☀' : '☾'}
            </button>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="blobs" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="container hero-inner">
            <div className="hero-text">
              <p className="eyebrow">
                <span className="wave">👋</span> Hi, I'm
              </p>
              <h1 className="gradient-text">{profile.name}</h1>
              <p className="hero-role">
                <Typewriter words={roles} />
              </p>
              <p className="tagline">{profile.tagline}</p>
              <div className="actions">
                <a className="btn primary" href="#projects">
                  View my work
                </a>
                <a className="btn" href={profile.resumeUrl} target="_blank" rel="noreferrer">
                  View Résumé
                </a>
              </div>
            </div>

            <div className="code-card" aria-hidden="true">
              <div className="code-dots">
                <i />
                <i />
                <i />
                <span>developer.ts</span>
              </div>
              <pre>
                <code>
                  <b className="k">const</b> developer = {'{'}
                  {'\n'}  name: <b className="s">'{profile.name}'</b>,
                  {'\n'}  location: <b className="s">'{profile.location}'</b>,
                  {'\n'}  stack: [<b className="s">'.NET'</b>, <b className="s">'Angular'</b>, <b className="s">'React'</b>, <b className="s">'Next.js'</b>],
                  {'\n'}  cloud: <b className="s">'Azure'</b>,
                  {'\n'}  loves: <b className="s">'clean code'</b>,
                  {'\n'}  available: <b className="k">true</b>,
                  {'\n'}{'}'}
                  <span className="caret" />
                </code>
              </pre>
            </div>
          </div>

          <ul className="container stats">
            {profile.highlights.map((h, i) => (
              <li key={h.label} className="reveal" style={{ transitionDelay: `${i * 120}ms` }}>
                <strong>{h.value}</strong>
                <span>{h.label}</span>
              </li>
            ))}
          </ul>

          <a href="#about" className="scroll-hint" aria-label="Scroll to About">
            <span />
          </a>
        </section>

        <section id="about" className="container">
          <h2 className="section-title reveal">About me</h2>
          <div className="about-grid">
            <div>
              {profile.about.map((p, i) => (
                <p key={p} className="lead reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                  {p}
                </p>
              ))}
              <p className="muted reveal">📍 {profile.location}</p>
            </div>
            <ul className="numbers">
              {numbers.map((n, i) => (
                <li key={n.label} className="reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                  <strong>
                    <CountUp to={n.to} decimals={n.decimals} suffix={n.suffix} />
                  </strong>
                  <span>{n.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="container">
          <h2 className="section-title reveal">How I work</h2>
          <ol className="process">
            {process.map((p, i) => (
              <li key={p.title} className="reveal" style={{ transitionDelay: `${i * 120}ms` }}>
                <span className="process-icon">{p.icon}</span>
                <span className="process-step">Step {i + 1}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="skills" className="container">
          <h2 className="section-title reveal">Skills</h2>

          <div className="card proficiency reveal">
            <h3>Core proficiency</h3>
            <ul>
              {proficiency.map((p, i) => (
                <li key={p.skill} title={`${p.skill}: ${p.level}%`}>
                  <div className="bar-label">
                    <span>{p.skill}</span>
                    <span className="muted">{p.level}%</span>
                  </div>
                  <div
                    className="bar"
                    role="meter"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={p.level}
                    aria-label={p.skill}
                  >
                    <span style={{ width: `${p.level}%`, transitionDelay: `${i * 90}ms` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid">
            {skills.map((g, i) => (
              <div key={g.group} className="card reveal" style={{ transitionDelay: `${(i % 3) * 100}ms` }}>
                <h3>{g.group}</h3>
                <ul className="tags">
                  {g.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="container">
          <h2 className="section-title reveal">Projects</h2>
          <div className="grid">
            {projects.map((p, i) => (
              <article key={p.title} className="card project reveal" style={{ transitionDelay: `${(i % 2) * 120}ms` }}>
                <span className="project-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <ul className="tags">
                  {p.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <div className="links">
                  {p.repoUrl && (
                    <a href={p.repoUrl} target="_blank" rel="noreferrer">
                      Code →
                    </a>
                  )}
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noreferrer">
                      Live →
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="container">
          <h2 className="section-title reveal">Experience</h2>
          <ol className="timeline reveal">
            {experience.map((e, i) => (
              <li key={e.role + e.company} className="reveal" style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="timeline-head">
                  <h3>
                    {e.role} · <span className="accent">{e.company}</span>
                  </h3>
                  <span className="pill">{e.period}</span>
                </div>
                <p className="timeline-project">
                  <strong>Project:</strong> {e.project}
                </p>
                <ul>
                  {e.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section id="contact" className="container contact">
          <div className="contact-card reveal">
            <h2 className="section-title">Let's build something great</h2>
            <p className="lead">I'm open to new opportunities and collaborations. Feel free to reach out!</p>
            <a className="btn primary pulse" href={`mailto:${profile.email}`}>
              Say hello ✉
            </a>
            <div className="socials">
              {profile.socials.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <nav className="footer-links" aria-label="Footer">
          {sections.map((s) => (
            <a key={s} href={`#${s}`}>
              {s[0].toUpperCase() + s.slice(1)}
            </a>
          ))}
          <a href="./sitemap.xml">Sitemap</a>
        </nav>
        <p>
          © {year} {profile.name}. All rights reserved.
        </p>
        <p className="footer-note">
          Content, design and code on this site are the property of {profile.name} and may not be reproduced
          without permission. Built with React.
        </p>
      </footer>

      <a href="#top" className={`to-top ${progress > 0.15 ? 'show' : ''}`} aria-label="Back to top">
        ↑
      </a>
    </>
  )
}

export default App
