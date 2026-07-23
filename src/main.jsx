import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import './coverage.css'
import './coverage-switch.css'
import './coverage-refine.css'
import './pathology-viewer.css'
import './coverage-svg.css'
import './ecosystem-loop.css'
import './ecosystem-layout.css'
import './company-headquarters.css'
import './ecosystem-refine.css'
import './narrative-layout.css'

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
  ['Heilongjiang', 77, 15, 'service', 7, -8], ['Jilin', 73, 20, 'coverage', 7, 5], ['Liaoning', 70, 24, 'service', 7, -8],
  ['Inner Mongolia', 58, 17, 'coverage', -36, -8], ['Beijing', 67, 27, 'coverage', 7, -9], ['Tianjin', 69, 28, 'service', 7, 5],
  ['Hebei', 65, 30, 'coverage', -27, 7], ['Shandong', 69, 35, 'service', 7, -8], ['Shanxi', 60, 34, 'coverage', -28, -7],
  ['Ningxia', 48, 34, 'service', -29, -7], ['Gansu', 45, 39, 'coverage', -25, 8], ['Qinghai', 40, 43, 'coverage', -28, -7],
  ['Shaanxi', 55, 40, 'service', -30, 7], ['Henan', 62, 40, 'service', 7, 7], ['Jiangsu', 70, 44, 'service', 7, -8],
  ['Shanghai', 74, 46, 'coverage', 7, 7], ['Anhui', 66, 45, 'coverage', -26, 8], ['Zhejiang', 70, 50, 'coverage', 7, -6],
  ['Hubei', 61, 48, 'service', -27, -7], ['Sichuan', 52, 50, 'service', -28, -7], ['Chongqing', 56, 52, 'service', 7, 8],
  ['Jiangxi', 66, 52, 'service', 7, 7], ['Hunan', 61, 55, 'service', -26, 7], ['Fujian', 70, 55, 'service', 7, 7],
  ['Guizhou', 56, 57, 'service', -31, 6], ['Yunnan', 49, 60, 'service', -25, -8], ['Guangxi', 55, 63, 'service', -28, 7],
  ['Guangdong', 63, 62, 'service', 7, 7], ['Hainan', 61, 70, 'coverage', 7, -7],
]

const laboratoryRegions = ['Guangdong', 'Sichuan', 'Guangxi', 'Jiangsu', 'Guizhou', 'Tianjin', 'Fujian', 'Chongqing', 'Jiangxi', 'Shandong', 'Liaoning', 'Shaanxi', 'Hunan', 'Henan', 'Yunnan', 'Hubei', 'Ningxia', 'Heilongjiang']

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

function PathologyViewer() {
  const [mode, setMode] = useState('heatmap')
  const [split, setSplit] = useState(52)
  const [dragging, setDragging] = useState(false)
  const updateSplit = (event) => {
    if (!dragging && event.type === 'pointermove') return
    const bounds = event.currentTarget.getBoundingClientRect()
    setSplit(Math.max(8, Math.min(92, ((event.clientX - bounds.left) / bounds.width) * 100)))
  }
  const overlay = mode === 'heatmap' ? 'images/panopath-slide-heatmap-v2.png' : 'images/panopath-slide-lesion-v2.png'
  const label = mode === 'heatmap' ? 'AI heatmap' : 'Lesion distribution'
  return <div className="pathology-viewer">
    <div className="viewer-toolbar"><span><i></i>AI-assisted review</span><div><button className={mode === 'heatmap' ? 'active' : ''} onClick={() => setMode('heatmap')}>Heatmap</button><button className={mode === 'lesion' ? 'active' : ''} onClick={() => setMode('lesion')}>Lesion map</button></div></div>
    <div className="viewer-canvas" onPointerDown={(event) => { setDragging(true); event.currentTarget.setPointerCapture(event.pointerId); updateSplit(event) }} onPointerMove={updateSplit} onPointerUp={() => setDragging(false)} onPointerLeave={() => setDragging(false)}>
      <img src={assetUrl('images/panopath-slide-original-v2.png')} alt="Original pathology slide" />
      <div className="viewer-overlay" style={{ clipPath: `inset(0 0 0 ${split}%)` }}><img src={assetUrl(overlay)} alt={`${label} result`} /></div>
      <div className="viewer-divider" style={{ left: `${split}%` }}><span>↔</span></div>
      <span className="viewer-state original">Original slide</span><span className="viewer-state result">{label}</span>
    </div>
    <label className="viewer-slider"><span>Slide to compare</span><input type="range" min="8" max="92" value={split} onChange={(event) => setSplit(Number(event.target.value))} aria-label="Compare original slide and AI result" /></label>
  </div>
}

function EcosystemLoop() {
  return <div className="ecosystem-loop" aria-label="Self-reinforcing pathology intelligence loop">
    <svg className="ecosystem-lines" viewBox="0 0 720 430" aria-hidden="true"><defs><marker id="loop-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0L9 5L0 10z" fill="#087dc1"/></marker></defs><path className="loop-segment segment-one" d="M303 128L158 301" markerEnd="url(#loop-arrow)"/><path className="loop-segment segment-two" d="M194 358L525 358" markerEnd="url(#loop-arrow)"/><path className="loop-segment segment-three" d="M562 300L417 128" markerEnd="url(#loop-arrow)"/><circle className="orbit orbit-one" cx="231" cy="214" r="5"/><circle className="orbit orbit-two" cx="360" cy="358" r="5"/><circle className="orbit orbit-three" cx="489" cy="214" r="5"/></svg>
    <div className="loop-node node-data"><span className="node-icon">⌁</span><b>Real-world<br/>data</b><small>10M+ whole-slide images</small></div>
    <div className="loop-node node-algorithm"><span className="node-icon">✦</span><b>PanoPath<br/>algorithms</b><small>Foundation model intelligence</small></div>
    <div className="loop-node node-practice"><span className="node-icon">◌</span><b>Clinical<br/>practice</b><small>AI-assisted daily workflows</small></div>
    <div className="loop-core"><i>∞</i><b>Continuous<br/>learning</b><span>Feedback · train · deploy</span></div>
    <span className="loop-label label-data">DATA FEEDBACK</span><span className="loop-label label-train">MODEL TRAINING</span><span className="loop-label label-deploy">DEPLOYED INSIGHTS</span>
  </div>
}

function App() {
  useEffect(() => {
    const mount = document.querySelector('.workflow-visual')
    if (!mount) return undefined
    const viewerRoot = createRoot(mount)
    viewerRoot.render(<PathologyViewer />)
    return () => viewerRoot.unmount()
  }, [])
  useEffect(() => {
    const mount = document.querySelector('.loop-steps')
    if (!mount) return undefined
    const loopRoot = createRoot(mount)
    loopRoot.render(<EcosystemLoop />)
    return () => loopRoot.unmount()
  }, [])
  return <div id="top">
    <Header />
    <main>
      <section className="hero hero-video">
        <video className="hero-video-media" autoPlay muted loop playsInline aria-hidden="true"><source src={assetUrl('videos/homepage-hero-v3.mp4')} type="video/mp4" /></video>
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

      <section className="china-coverage section-shell" id="coverage"><div className="coverage-copy"><p className="eyebrow blue">CHINA COVERAGE</p><h2>Local reach.<br/>Connected expertise.</h2><p>Huayin serves healthcare partners across 29 provincial-level regions in China. Our network includes 22 provincial-level service sites, with multiple sites operating in selected cities to meet local clinical and operational needs.</p><a className="text-button" href="#contact">Connect with Huayin <span>→</span></a></div><div className="coverage-panel" aria-label="China coverage and service site distribution visualization"><div className="coverage-map"><div className="map-stage"><img src={assetUrl('images/china-map-minimal.png')} alt="Line map of China including the South China Sea Islands" /><div className="marker-layer coverage-layer">{coverageMarkers.map(([name, left, top, , labelX, labelY]) => <span className="coverage-pin coverage" style={{ left: `${left}%`, top: `${top}%`, '--label-x': `${labelX}px`, '--label-y': `${labelY}px` }} data-label={name} title={name} aria-label={name} key={name}></span>)}</div><div className="marker-layer service-layer">{coverageMarkers.filter(([, , , type]) => type === 'service').map(([name, left, top, , labelX, labelY]) => <span className="coverage-pin service" style={{ left: `${left}%`, top: `${top}%`, '--label-x': `${labelX}px`, '--label-y': `${labelY}px` }} data-label={name} title={name} aria-label={name} key={name}></span>)}</div></div></div><aside className="coverage-region-list" aria-live="polite"><div className="coverage-info coverage-info-regions"><span>BUSINESS COVERAGE</span><b>29</b><p>Provincial-level regions across mainland China.</p></div><div className="coverage-info coverage-info-sites"><span>SERVICE SITE NETWORK</span><b>22</b><p>Service sites across these provincial-level regions:</p><div className="region-names">{laboratoryRegions.map(region => <em key={region}>{region}</em>)}</div></div></aside><div className="coverage-legend"><span className="coverage-view-label"><i className="coverage-dot"></i>Provincial-level coverage</span><span className="service-view-label"><i className="service-dot"></i>Service site distribution</span></div><div className="coverage-totals"><span className="coverage-view-label"><b>29</b> regions covered</span><span className="service-view-label"><b>22</b> service sites</span></div></div></section>

      <section className="demo-section" id="demo"><div className="section-shell demo-inner"><div><p className="eyebrow">LET'S SHAPE WHAT'S NEXT</p><h2>Ready to transform<br/>your pathology workflow?</h2></div><div><p>Talk with our team about your clinical, operational and deployment needs.</p><a className="demo-button light" href="mailto:international@huayinhealthcare.com">Request a demo <span>→</span></a></div></div></section>
    </main>
    <footer id="contact"><div className="section-shell footer-grid"><div><Logo variant="footer" /><p>AI-powered pathology solutions for a more connected global healthcare future.</p></div><div><h4>Explore</h4><a href="#company">Company</a><a href="#platform">PanoPath</a><a href="#solutions">Solutions</a></div><div><h4>Connect</h4><a href="#contact">Global Offices</a><a href="#demo">Request a Demo</a><a href="mailto:international@huayinhealthcare.com">Contact us</a></div><div><h4>Legal</h4><a href="#top">Privacy Policy</a><a href="#top">Terms of Use</a><a href="#top">Regulatory Compliance</a></div></div><div className="footer-base section-shell"><span>© 2026 Huayin Healthcare Group. All rights reserved.</span><span>Guangzhou · Global</span></div></footer>
  </div>
}

createRoot(document.getElementById('root')).render(<App />)
