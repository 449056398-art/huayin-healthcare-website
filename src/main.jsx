import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import './coverage.css'
import './coverage-switch.css'

const navItems = [
  { label: 'Company', items: ['About Huayin', 'Mission & Vision', 'Leadership', 'China Coverage'] },
  { label: 'AI Solutions', items: ['PanoPath AI Platform', 'AI Diagnostics', 'Digital Pathology Workflow', 'Biomarker Analysis'] },
  { label: 'Products & Platform', items: ['AI Diagnostic Platform', 'Digital Slide Scanner', 'Cloud Pathology', 'LIS & Integration'] },
  { label: 'Solutions', items: ['Hospitals & Health Systems', 'Reference Labs', 'Pharma & Biotech', 'Research Institutions'] },
  { label: 'Resources', items: ['Clinical Evidence', 'Case Studies', 'News & Insights'] },
]

const stats = [
  { value: 10, suffix: 'M+', label: 'Real-world whole-slide images' },
  { value: 40, suffix: '+', label: 'Disease-specific AI models' },
  { value: 99, suffix: '%', label: 'Routine diagnostic scenarios covered' },
  { value: 2400, suffix: '+', label: 'Healthcare institutions served' },
]

const capabilities = [
  ['Real-world data intelligence', 'PanoPath learns from more than 10 million real-world whole-slide images collected through clinical practice.'],
  ['Foundation model capabilities', 'A pathology foundation model that delivers leading performance in multi-task evaluation.'],
  ['Disease-specific AI', 'More than 40 disease-specific AI models support over 99% of routine diagnostic scenarios.'],
]

const coverageMarkers = [
  ['Heilongjiang', 67, 27, 'coverage'], ['Jilin', 66, 30, 'coverage'], ['Liaoning', 63, 35, 'service'], ['Inner Mongolia', 53, 25, 'coverage'], ['Beijing', 56, 40, 'coverage'], ['Tianjin', 58, 40, 'service'], ['Hebei', 56, 43, 'coverage'], ['Shandong', 60, 47, 'service'], ['Shanxi', 53, 44, 'coverage'], ['Ningxia', 44, 44, 'service'], ['Gansu', 41, 47, 'coverage'], ['Qinghai', 37, 49, 'coverage'], ['Shaanxi', 49, 51, 'service'], ['Henan', 54, 50, 'service'], ['Jiangsu', 60, 54, 'service'], ['Shanghai', 63, 55, 'coverage'], ['Anhui', 57, 54, 'coverage'], ['Zhejiang', 60, 59, 'coverage'], ['Hubei', 54, 56, 'service'], ['Sichuan', 46, 57, 'service'], ['Chongqing', 48, 59, 'service'], ['Jiangxi', 57, 60, 'service'], ['Hunan', 53, 62, 'service'], ['Fujian', 59, 65, 'service'], ['Guizhou', 48, 66, 'service'], ['Yunnan', 42, 70, 'service'], ['Guangxi', 49, 73, 'service'], ['Guangdong', 55, 72, 'service'], ['Hainan', 51, 78, 'coverage'],
]

const solutionModules = [
  { icon: 'ai', title: 'Pathology AI-assisted Diagnosis Platform', detail: 'AI-assisted review for confident diagnostic decisions.' },
  { icon: 'report', title: 'Pathological Structured Reporting System', detail: 'Standardized reporting built for efficiency and consistency.' },
  { icon: 'pis', title: 'Full-workflow Pathology Information System', detail: 'A connected information backbone for pathology operations.' },
  { icon: 'remote', title: 'Remote Pathological Diagnosis System', detail: 'Secure collaboration and expert review across locations.' },
  { icon: 'scanner', title: 'Automatic Digital Slide Scanner', detail: 'High-quality whole-slide imaging for a digital workflow.' },
  { icon: 'appliance', title: 'AI Pathology Appliance', detail: 'Integrated computing infrastructure for flexible deployment.' },
]

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`

function Logo({ variant = 'header' }) {
  const logoFile = variant === 'footer' ? 'images/huayin-logo-footer.png' : 'images/huayin-logo-header.png'
  return <a className={`brand brand-${variant}`} href="#top" aria-label="Huayin Healthcare home"><img src={assetUrl(logoFile)} alt="Huayin Healthcare Group" /></a>
}

function Header() {
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState(null)
  return <header className="site-header">
    <div className="nav-wrap">
      <Logo />
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu"><span></span><span></span><span></span></button>
      <nav className={open ? 'main-nav open' : 'main-nav'}>
        {navItems.map(({ label, items }) => <div className="nav-item" key={label} onMouseEnter={() => setMenu(label)} onMouseLeave={() => setMenu(null)}>
          <button onClick={() => setMenu(menu === label ? null : label)}>{label}<span className="chevron">⌄</span></button>
          {menu === label && <div className="dropdown">{items.map(item => <a href="#solutions" key={item}>{item}</a>)}</div>}
        </div>)}
        <a className="contact-link" href="#contact">Contact</a>
        <a className="language" href="#top">EN <span>/</span> 中</a>
        <a className="demo-button nav-demo" href="#demo">Request a demo <span>→</span></a>
      </nav>
    </div>
  </header>
}

function AnimatedStat({ value, suffix, label }) {
  const [current, setCurrent] = useState(0)
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return undefined
    let frameId
    const animate = () => {
      const startedAt = performance.now()
      const duration = 1500
      const tick = (now) => {
        const progress = Math.min((now - startedAt) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCurrent(Math.round(value * eased))
        if (progress < 1) frameId = requestAnimationFrame(tick)
      }
      frameId = requestAnimationFrame(tick)
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        animate()
        observer.disconnect()
      }
    }, { threshold: 0.45 })
    observer.observe(element)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frameId)
    }
  }, [value])

  return <article ref={elementRef}><strong>{current.toLocaleString('en-US')}{suffix}</strong><span>{label}</span></article>
}

function SolutionIcon({ type }) {
  const paths = {
    ai: <><path d="M7 4h10l3 3v10l-3 3H7l-3-3V7z"/><path d="M9 12h6M12 9v6M2 10v4M22 10v4M10 2v2M14 2v2M10 20v2M14 20v2"/></>,
    report: <><path d="M6 3h9l4 4v14H6z"/><path d="M15 3v5h5M9 12h6M9 16h6M9 8h2"/></>,
    pis: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M8 9h8M8 13h4M6 22h12M12 19v3"/></>,
    remote: <><path d="M5 18a7 7 0 1 1 14 0"/><path d="M8 18v2a2 2 0 0 1-2 2H5v-5h3M16 18v2a2 2 0 0 0 2 2h1v-5h-3M12 5v6l3 2"/></>,
    scanner: <><path d="M5 3h14v7H5zM3 12h18v8H3z"/><path d="M8 7h8M8 16h8M7 20v2M17 20v2"/></>,
    appliance: <><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 12h2M8 16h2M15 12h1M15 16h1"/></>,
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[type]}</svg>
}

function SolutionModule({ item, index }) {
  const [position, setPosition] = useState({ x: '50%', y: '50%' })
  const updatePointer = (event) => {
    const box = event.currentTarget.getBoundingClientRect()
    setPosition({ x: `${event.clientX - box.left}px`, y: `${event.clientY - box.top}px` })
  }
  return <article className="solution-module" onMouseMove={updatePointer} style={{ '--pointer-x': position.x, '--pointer-y': position.y }}>
    <span className="module-index">0{index + 1}</span><div className="module-icon"><SolutionIcon type={item.icon} /></div><h3>{item.title}</h3><p>{item.detail}</p><a href="#demo">Explore <span>→</span></a>
  </article>
}

function App() {
  return <div id="top">
    <Header />
    <main>
      <section className="hero hero-video">
        <video className="hero-video-media" autoPlay muted loop playsInline aria-hidden="true"><source src={assetUrl('videos/homepage-hero.mp4')} type="video/mp4" /></video>
        <div className="hero-video-overlay"></div>
        <div className="hero-content hero-video-content">
          <p className="eyebrow">HUAYIN HEALTHCARE GROUP</p>
          <h1><span>Beyond</span><span>Diagnosis.</span></h1>
          <p className="hero-statement">Building the future of smart pathology with the collective intelligence of millions of cases.</p>
          <a className="hero-video-link" href="#platform">Discover PanoPath <span>→</span></a>
        </div>
      </section>

      <section className="stats section-shell">{stats.map((stat) => <AnimatedStat key={stat.label} {...stat} />)}</section>

      <section className="intro section-shell" id="platform"><div><p className="eyebrow blue">THE INTELLIGENCE BEHIND SMARTER PATHOLOGY</p><h2>From every case,<br/>a better next case.</h2></div><p>As a pioneer in telepathology, Huayin has built a real-world pathology data foundation that brings big data, algorithms and clinical scenarios into one continuously improving ecosystem.</p></section>

      <section className="capability-section"><div className="section-shell"><div className="section-heading"><p className="eyebrow blue">WHAT WE ENABLE</p><h2>Built for the next era<br/>of pathology.</h2><a className="text-button" href="#solutions">Discover our capabilities <span>→</span></a></div><div className="capability-grid">{capabilities.map(([title, copy], i) => <article className="capability-card" key={title}><span className={'card-number n' + i}>0{i + 1}</span><div className="card-icon">{i === 0 ? '✦' : i === 1 ? '◫' : '◌'}</div><h3>{title}</h3><p>{copy}</p><a href="#demo" aria-label={`Learn about ${title}`}>Learn more <span>→</span></a></article>)}</div></div></section>

      <section className="workflow section-shell"><div className="workflow-visual"><div className="workflow-circle"><span>DATA</span><span>LEARN</span><span>ASSIST</span><b>AI</b></div></div><div className="workflow-copy"><p className="eyebrow blue">THE PanoPath PLATFORM</p><h2>PanoPath: a foundation model for pathology.</h2><p>Trained on Huayin's large real-world WSI database, PanoPath achieves leading performance in multi-task evaluation and turns accumulated clinical intelligence into practical diagnostic assistance.</p><ul><li>10M+ real-world whole-slide images</li><li>40+ disease-specific AI models</li><li>Clinical intelligence designed for daily practice</li></ul><a className="text-button" href="#demo">Explore PanoPath <span>→</span></a></div></section>

      <section className="closed-loop"><div className="section-shell"><div className="closed-loop-heading"><p className="eyebrow">A SELF-REINFORCING ECOSYSTEM</p><h2>Intelligence that keeps<br/>moving forward.</h2><p>Real-world clinical practice makes the ecosystem smarter with every cycle.</p></div><div className="loop-steps"><article><span>01</span><h3>Big data</h3><p>Millions of whole-slide images from real clinical practice.</p></article><i>→</i><article><span>02</span><h3>Algorithms</h3><p>PanoPath and disease-specific AI models learn from data.</p></article><i>→</i><article><span>03</span><h3>Clinical scenarios</h3><p>AI supports everyday pathology decisions and workflows.</p></article><i>→</i><article><span>04</span><h3>Continuous iteration</h3><p>Clinical feedback strengthens the next generation of intelligence.</p></article></div></div></section>

      <section className="clinical-value section-shell"><div className="clinical-value-copy"><p className="eyebrow blue">PROVEN IN REAL-WORLD PRACTICE</p><h2>More intelligence.<br/>More value in every diagnosis.</h2><p>As an intelligent pathology assistant, Huayin AI has been proven across millions of real-world cases to help healthcare teams work better.</p></div><div className="value-grid"><article><span>01</span><h3>Enhance efficiency</h3><p>Support pathologists with timely AI-assisted review and streamlined workflows.</p></article><article><span>02</span><h3>Reduce costs</h3><p>Help laboratories optimize operations through connected digital pathology.</p></article><article><span>03</span><h3>Improve quality</h3><p>Bring consistent intelligence to more diagnostic decisions, wherever patients are.</p></article></div></section>

      <section className="solutions-section" id="solutions"><div className="section-shell"><div className="solutions-intro"><div><p className="eyebrow">SOLUTIONS DESIGNED AROUND YOU</p><h2>One connected ecosystem.<br/>Built for pathology.</h2></div><div className="solutions-summary"><p>AI <span>+</span> PIS <span>+</span> Hardware <span>+</span> Services</p><small>Four-in-one intelligent pathology solution</small></div></div><div className="solution-modules">{solutionModules.map((item, index) => <SolutionModule item={item} index={index} key={item.title} />)}</div></div></section>

      <section className="company-intro" id="company"><div className="section-shell"><div><p className="eyebrow blue">ABOUT HUAYIN HEALTHCARE</p><h2>A global pathology partner, built on clinical practice.</h2></div><div className="company-intro-copy"><p>Guangzhou Huayin Healthcare Group is a global provider of pathology-focused independent clinical laboratory services. As a pioneer in telepathology, we connect clinical expertise, data and technology to advance smarter pathology worldwide.</p><a className="text-button" href="#contact">Connect with Huayin <span>→</span></a></div></div></section>

      <section className="china-coverage section-shell" id="coverage"><div className="coverage-copy"><p className="eyebrow blue">CHINA COVERAGE</p><h2>Local reach.<br/>Connected expertise.</h2><p>Huayin serves healthcare partners across 29 provincial-level regions in China. Our network includes 22 provincial-level service sites, with multiple sites operating in selected cities to meet local clinical and operational needs.</p><a className="text-button" href="#contact">Connect with Huayin <span>→</span></a></div><div className="coverage-panel" aria-label="China coverage and service site distribution visualization"><div className="coverage-caption"><span className="coverage-view-label"><i></i>Provincial-level coverage</span><span className="service-view-label"><i></i>Service site distribution</span></div><div className="coverage-map"><div className="map-stage"><img src={assetUrl('images/china-standard-map.jpg')} alt="Standard map of China including the South China Sea Islands" /><div className="marker-layer coverage-layer">{coverageMarkers.map(([name, left, top]) => <span className="coverage-pin coverage" style={{ left: `${left}%`, top: `${top}%` }} title={name} aria-label={name} key={name}></span>)}</div><div className="marker-layer service-layer">{coverageMarkers.filter(([, , , type]) => type === 'service').map(([name, left, top]) => <span className="coverage-pin service" style={{ left: `${left}%`, top: `${top}%` }} title={name} aria-label={name} key={name}></span>)}</div></div></div><div className="coverage-legend"><span className="coverage-view-label"><i className="coverage-dot"></i>Coverage regions</span><span className="service-view-label"><i className="service-dot"></i>Service sites</span></div><div className="coverage-totals"><span className="coverage-view-label"><b>29</b> regions covered</span><span className="service-view-label"><b>22</b> service sites</span></div><details className="regional-locations"><summary>Key regional locations <span>+</span></summary><p>Guangzhou · Chengdu · Guangxi · Nanjing · Guizhou · Tianjin · Xiamen · Chongqing · Nanchang · Jinan · Liaoning · Shaanxi · Changsha · Zhengzhou · Kunming · Wuhan · Shizuishan · Heilongjiang</p></details></div></section>

      <section className="demo-section" id="demo"><div className="section-shell demo-inner"><div><p className="eyebrow">LET'S SHAPE WHAT'S NEXT</p><h2>Ready to transform<br/>your pathology workflow?</h2></div><div><p>Talk with our team about your clinical, operational and deployment needs.</p><a className="demo-button light" href="mailto:international@huayinhealthcare.com">Request a demo <span>→</span></a></div></div></section>
    </main>
    <footer id="contact"><div className="section-shell footer-grid"><div><Logo variant="footer" /><p>AI-powered pathology solutions for a more connected global healthcare future.</p></div><div><h4>Explore</h4><a href="#company">Company</a><a href="#platform">PanoPath</a><a href="#solutions">Solutions</a></div><div><h4>Connect</h4><a href="#contact">Global Offices</a><a href="#demo">Request a Demo</a><a href="mailto:international@huayinhealthcare.com">Contact us</a></div><div><h4>Legal</h4><a href="#top">Privacy Policy</a><a href="#top">Terms of Use</a><a href="#top">Regulatory Compliance</a></div></div><div className="footer-base section-shell"><span>© 2026 Huayin Healthcare Group. All rights reserved.</span><span>Guangzhou · Global</span></div></footer>
  </div>
}

createRoot(document.getElementById('root')).render(<App />)
