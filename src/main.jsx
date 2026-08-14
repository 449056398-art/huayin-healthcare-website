import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import './navigation-menu.css'
import './capability-showcase.css'
import './coverage.css'
import './coverage-switch.css'
import './coverage-refine.css'
import './pathology-viewer.css'
import './pathology-drag.css'
import './coverage-svg.css'
import './ecosystem-loop.css'
import './ecosystem-icons.css'
import './ecosystem-layout.css'
import './company-headquarters.css'
import './ecosystem-refine.css'
import './narrative-layout.css'
import './subpages.css'
import './partner-marquee.css'
import './about-headquarters.css'

const navItems = [
  { label: 'Company', items: [
    { label: 'About Us', href: '#/about-us' },
    { label: 'Leadership Team', href: '#/leadership-team' },
    { label: 'Global Presence', href: '#/global-presence' },
  ] },
  { label: 'AI Solutions', items: [
    { label: 'PanoPath Platform', href: '#/panopath-platform' },
    { label: 'AI Diagnostics', href: '#/ai-diagnostics' },
    { label: 'Full-Stack Ecosystem', href: '#/full-stack-ecosystem' },
    { label: 'Clinical & Regulatory', href: '#/clinical-regulatory' },
  ] },
  { label: 'Who We Serve', items: [
    { label: 'Hospitals', href: '#/hospitals' },
    { label: 'Reference Labs', href: '#/reference-labs' },
    { label: 'Pharma & Biotech', href: '#/pharma-biotech' },
  ] },
  { label: 'Resources', items: [
    { label: 'Blog & News', href: '#/blog-news' },
    { label: 'Clinical Evidence', href: '#/clinical-evidence' },
  ] },
  { label: 'Contact', items: [
    { label: 'Global Offices', href: '#/global-offices' },
    { label: 'Partnerships', href: '#/partnerships' },
  ] },
]

const stats = [
  { value: 10, suffix: 'M+', label: 'Whole-slide images in our database' },
  { value: 5, suffix: 'M+', label: 'AI-assisted diagnostic WSIs' },
  { value: 40, suffix: '+', label: 'Disease-specific AI models' },
  { value: 2000, suffix: '+', label: 'Hospital sites' },
]

const partnerLogos = [
  ['partner-01.png', 'Jinfeng Laboratory'],
  ['partner-02.png', 'Fujian Cancer Hospital'],
  ['partner-03.png', 'Nanfang Hospital'],
  ['partner-04.png', 'Xuanwu Hospital Capital Medical University'],
  ['partner-05.png', 'Beijing Tiantan Hospital Capital Medical University'],
  ['partner-06.png', 'The Southwest Hospital of AMU'],
  ['partner-07.png', "Guangdong Provincial People's Hospital"],
  ['partner-08.png', 'The First Hospital of China Medical University'],
  ['partner-09.png', 'Anzhen Hospital'],
  ['partner-10.png', 'Chongqing University Fuling Hospital'],
  ['partner-11.png', 'The First Affiliated Hospital of Zhengzhou University'],
  ['partner-12.png', 'PLA Rocket Force General Hospital'],
  ['partner-13.png', 'Tianjin Medical University General Hospital'],
  ['partner-14.png', 'Chifeng Municipal Hospital'],
  ['partner-15.png', 'Peking University Cancer Hospital Inner Mongolia Hospital'],
  ['partner-16.png', 'Huazhong University of Science and Technology Union Shenzhen Hospital'],
  ['partner-17.png', 'The First Dongguan Affiliated Hospital of Guangdong Medical University'],
  ['partner-18.png', "Xuchang People's Hospital"],
  ['partner-19.png', 'Shanxi Cancer Hospital'],
]

const capabilities = [
  { title: 'Real-world data intelligence', copy: 'PanoPath learns from more than 10 million real-world whole-slide images collected through clinical practice.', image: 'images/capability-real-world.jpg', key: 'real-world' },
  { title: 'Foundation model capabilities', copy: 'A pathology foundation model that delivers leading performance in multi-task evaluation.', image: 'images/capability-foundation-chip.png', key: 'foundation' },
  { title: 'Disease-specific AI', copy: 'More than 40 disease-specific AI models cover 30+ common organ disease types and 200+ cancer types, encompassing 95%+ of hospital pathology diagnostic scenarios.', image: 'images/capability-disease-ai.jpg', key: 'disease-ai' },
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

const subpages = {
  'about-us': {
    eyebrow: 'ABOUT HUAYIN',
    headquarters: true,
    title: 'Pathology-first diagnostics, built at scale.',
    summary: 'A leading digital-intelligent pathology solutions provider, built on our proprietary PanoPath pathology foundation model and an extensive clinical laboratory service network — serving over 10,000 healthcare providers across 30 Chinese provinces.',
    intro: [
      'Huayin Healthcare Group is a pathology-led independent medical laboratory and diagnostics company headquartered in Guangzhou, China. Since 2010, we have built our service network around one clinical question: how do we give every patient access to the same quality of pathological diagnosis, regardless of where they live?',
      'Today, our 18 provincial reference laboratories and the jointly established Southern Medical University – Huayin Pathology Diagnosis Center deliver anatomical pathology, clinical laboratory testing, remote pathology consultation, molecular diagnostics, clinical research support, and public-health screening to over 10,000 institutions. We hold ISO 15189 accreditation and CAP recognition at multiple sites.',
      'In 2025, we released PanoPath — the world\'s first multi-clinical-centre pathology foundation model built on Chinese population data — and integrated it into a closed-loop ecosystem that combines AI, the Pathology Information System (PIS), digital slide scanners, and field service. The same diagnostic intelligence that supports our in-house laboratories is now available to hospital pathology departments worldwide.',
    ],
    stats: [['2009', 'Founded'], ['18', 'Provincial laboratories'], ['30', 'Provinces served'], ['10,000+', 'Institutional customers']],
    sections: [
      ['Pathology-led since 2010', 'Huayin is pathology-centric, not a general laboratory that added AI as an afterthought.'],
      ['Clinical and academic depth', 'The jointly established Southern Medical University – Huayin Pathology Diagnosis Center connects specialist expertise with daily diagnostic practice.'],
      ['AI grounded in practice', 'PanoPath combines foundation-model AI, the Pathology Information System, digital slide scanners, and field service in one closed clinical workflow.'],
    ],
    bullets: [
      'Pathology-centric since 2010 — not a general lab that added AI as an afterthought.',
      'Joint Pathology Diagnosis Center with Southern Medical University, one of China\'s leading medical schools.',
      'Accredited to ISO 15189 and CAP at multiple laboratory sites.',
      'Laboratories established in 18 provinces; service coverage across 30 provinces nationwide.',
      'Over 10,000 institutional customers served.',
      'Foundation-model approach to pathology AI (PanoPath) — the world\'s first multi-clinical-centre pathology foundation model built on Chinese population data.',
      'Ranked No. 1 in China\'s comprehensive digital-intelligent pathology services market by 2024 remote pathology diagnostic volume (Frost & Sullivan).',
    ],
    cta: 'Talk to a Huayin representative',
  },
  'leadership-team': {
    eyebrow: 'LEADERSHIP',
    title: 'Pathologists lead. Engineers support.',
    summary: 'Our clinical leadership sets the standard; our engineering and AI teams follow.',
    intro: [
      'Huayin is a clinically led organisation. The Pathology Expert Group is chaired by Professor Ding Yanqing of Southern Medical University, a leading authority on anatomical pathology in China. The Laboratory Expert Group is chaired by Professor Qiu Yurong, former Director of the Department of Laboratory Medicine at Nanfang Hospital. Both groups shape our diagnostic protocols, labelling standards, and product requirements.',
      'Our AI Innovation Center is led by a core team of 30 technical specialists and closely collaborates with Professor Gao Huang\'s research group at Tsinghua University and the Pazhou Lab Center for AI-Powered Computational Pathology.',
      'This structure means that every product decision flows from a clinical question, not the other way around.',
    ],
    stats: [['Clinical', 'Pathologist-led'], ['30', 'Core AI specialists'], ['10+', 'University partners'], ['1', 'Shared clinical standard']],
    sections: [
      ['Pathology Expert Group', 'Chaired by Professor Ding Yanqing of Southern Medical University, the group guides anatomical pathology standards and clinical priorities.'],
      ['Laboratory Expert Group', 'Chaired by Professor Qiu Yurong, former Director of Laboratory Medicine at Nanfang Hospital, the group supports laboratory quality and diagnostic protocols.'],
      ['AI Innovation Center', 'A core team of 30 technical specialists works with Professor Gao Huang\'s research group at Tsinghua University and the Pazhou Lab Center for AI-Powered Computational Pathology.'],
    ],
    bullets: [
      'Pathology Expert Group — chaired by Prof. Ding Yanqing (Southern Medical University).',
      'Laboratory Expert Group — chaired by Prof. Qiu Yurong (former Director, Nanfang Hospital Laboratory Medicine).',
      'AI Innovation Center — 30 core technical specialists.',
      'Research collaboration with Tsinghua University (Prof. Gao Huang) and Pazhou Lab.',
      'Strategic partnerships with 10+ universities including the University of Pennsylvania.',
    ],
    cta: 'Read full bios',
  },
  'panopath-platform': {
    eyebrow: 'PANOPATH AI',
    title: 'A foundation model for pathology, not a collection of point solutions.',
    summary: 'The world\'s first multi-clinical-centre pathology foundation model built on Chinese population data — one model handles detection, segmentation, classification, prognosis, and multi-omics prediction across solid tumours and cytology.',
    intro: [
      'PanoPath is a single-stage, end-to-end foundation model for whole-slide imaging, jointly developed by Huayin Health and the research group of Professor Gao Huang at Tsinghua University. It is trained on multi-centre cohorts spanning China, North America, and Europe, making it the world\'s first multi-clinical-centre pathology foundation model built on Chinese population data.',
      'Unlike vendor systems that stitch together 40+ narrow classifiers, PanoPath uses one underlying architecture. This means that as new disease subtypes appear in your laboratory, they can often be supported without retraining from scratch — and that performance on rare tasks improves as the foundation model improves.',
    ],
    stats: [['1st', 'Multi-clinical-centre foundation model'], ['100+', 'Cancer types detected'], ['10M+', 'WSIs in production database'], ['5M+', 'AI-assisted diagnostic WSIs']],
    sections: [
      ['One foundation', 'A unified architecture uses local and global attention with efficient long-sequence operators for whole-slide analysis.'],
      ['Multiple clinical tasks', 'Supports pan-cancer detection, lesion-level segmentation, prognosis prediction, gene-mutation prediction, tumour-origin prediction, and spatial transcriptomics interpretation.'],
      ['Multimodal learning', 'Training spans H&E, immunohistochemistry, and molecular data to support connected diagnostic reasoning.'],
    ],
    bullets: [
      'Foundation architecture: a single-stage network with local and global attention and efficient long-sequence operators such as RWKV.',
      'Training data: multi-centre cohorts across China, North America, and Europe; DeepSeek/Qwen-based pipelines support translation and data cleaning; multi-agent collaboration supports pretraining-data construction.',
      'Pan-cancer detection identifies 100+ cancer types.',
      'Ultra-precise segmentation at lesion level supports complex cases.',
      'Multi-task support includes prognosis prediction, gene-mutation prediction, tumour-origin prediction, and spatial transcriptomics interpretation.',
      'All-in-one multimodal training spans H&E, IHC, and molecular data.',
    ],
    visual: 'viewer',
    cta: 'Request a PanoPath demo',
  },
  'ai-diagnostics': {
    eyebrow: 'DIAGNOSTIC AI',
    title: '40+ disease-specific diagnostic models, validated on clinical-grade WSIs.',
    summary: 'Histopathology, cytopathology, immunohistochemistry quantification, and slide quality control, all from the same PanoPath foundation.',
    intro: [
      'Huayin\'s disease-specific AI models cover 30+ common organ disease types and 200+ cancer types, encompassing 95%+ of hospital pathology diagnostic scenarios. They are deployed today in anatomical pathology laboratories and reference laboratories across China.',
      'Each model has been trained on multi-centre data and evaluated against senior pathologist review. We provide full validation dossiers to qualified partners under NDA.',
    ],
    stats: [['40+', 'Disease-specific models'], ['30+', 'Common organ disease types'], ['200+', 'Cancer types'], ['95%+', 'Hospital diagnostic scenarios']],
    sections: [
      ['Histopathology', 'AI-assisted diagnosis across 31 organ systems, including stomach, colorectum, oesophagus, lung, breast, and prostate.'],
      ['Cytopathology', 'Support for TCT, thyroid FNA, respiratory tract, urine, and pleural or peritoneal fluid workflows.'],
      ['IHC quantification', 'Quantitative analysis for ER, PR, HER2, Ki-67, and PD-L1.'],
      ['Slide quality control', 'H&E quality control flags more than 18 common pre-analytical defects before review.'],
    ],
    bullets: [
      'Histopathology AI-assisted diagnosis — 31 organ systems, including stomach, colorectum, oesophagus, lung, breast, and prostate.',
      'Cytopathology AI-assisted diagnosis — TCT, thyroid FNA, respiratory tract, urine, and pleural or peritoneal fluid.',
      'IHC AI-assisted quantitative analysis — ER, PR, HER2, Ki-67, and PD-L1.',
      'H&E slide AI quality control flags 18+ common pre-analytical defects.',
    ],
    visual: 'viewer',
    cta: 'See validation data',
  },
  'full-stack-ecosystem': {
    eyebrow: 'ECOSYSTEM',
    title: 'AI + PIS + Hardware + Services, deployed as one system.',
    summary: 'Most pathology AI vendors sell software only. We deliver the scanner, the information system, the AI, and field service together — so the diagnostic workflow actually closes.',
    intro: [
      'A pathology AI that cannot read slides is a science project. Huayin\'s four-in-one ecosystem ships each component of the diagnostic loop: an automatic digital slide scanner, a full-workflow Pathology Information System, the PanoPath AI suite, and a field-service team that handles installation, training, calibration, and quality assurance.',
      'Customers can adopt the full ecosystem, or they can integrate PanoPath into a scanner or LIS they already own. Both deployment modes are supported.',
    ],
    stats: [['4-in-1', 'Connected ecosystem'], ['6', 'Core solution modules'], ['3', 'Deployment models'], ['24/7', 'Remote workflow support']],
    sections: [
      ['Full ecosystem', 'Scanner, PIS, PanoPath AI, structured reporting, deployment hardware, and field service delivered together.'],
      ['Integrate PanoPath', 'Connect PanoPath to an existing scanner or laboratory information system while preserving current workflows.'],
      ['Per-case service', 'Use Huayin\'s remote pathology network for eligible diagnostic services where local regulation permits.'],
    ],
    bullets: [
      'Remote Pathological Diagnosis System — telediagnosis workflow.',
      'Pathology AI-assisted Diagnosis Platform — PanoPath clinical applications.',
      'Pathological Structured Reporting System — field-structured reports with sign-off.',
      'Automatic Digital Slide Scanner — brightfield, with fluorescence optional.',
      'Full-workflow Pathology Information System (PIS) — request, grossing, embedding, cutting, staining, scanning, AI, sign-out, and archive.',
      'AI Pathology Appliance — on-premise inference hardware for hospital data-centre deployment.',
      'Field services include installation, calibration, pathologist training, and quarterly quality assurance.',
    ],
    cta: 'Compare deployment options',
  },
  hospitals: {
    eyebrow: 'FOR HOSPITALS',
    title: 'Give your pathologists more time for the cases that matter.',
    summary: 'Huayin\'s four-in-one ecosystem integrates with your existing scanners and LIS, then quietly handles the routine — so your team can focus on the difficult cases.',
    intro: [
      'Hospital pathology departments face the same pressure: more cases, fewer specialists, and rising expectations for molecular and IHC reporting. PanoPath assists with the high-volume routine while preserving senior-pathologist review for every final report.',
      'In clinical validation, AI-assisted screening is expected to reduce single-slide screening time to the minute level, routine pathology report turnaround to within three days, and increase pathologist daily diagnostic throughput by over 50%.',
    ],
    stats: [['50%+', 'Daily throughput gain'], ['3 days', 'Routine report turnaround'], ['2,000+', 'Hospital departments served'], ['5M+', 'AI-assisted diagnostic WSIs']],
    sections: [
      ['Integrate', 'Connect to existing scanners and laboratory systems through standard interfaces and file ingestion.'],
      ['Assist', 'AI pre-screening, suspicious-region highlighting, and structured report output support routine workflows.'],
      ['Deploy', 'Choose on-premise appliance, private-cloud deployment, or a per-case service model.'],
    ],
    bullets: [
      'Connects with major whole-slide scanners, including Hamamatsu, Philips, Leica, Aperio, 3DHistech, and KFBIO.',
      'Integrates with LIS through HL7, DICOM, and standard file-system ingest…5286 tokens truncated… and AI result" aria-valuemin="8" aria-valuemax="92" aria-valuenow={Math.round(split)} onPointerDown={startDrag} onPointerMove={drag} onPointerUp={endDrag} onPointerCancel={endDrag} onKeyDown={moveWithKeyboard}><span>↔</span></div>
      <span className="viewer-state original">Original slide</span><span className="viewer-state result">{label}</span>
    </div>
    <label className="viewer-slider"><span>Slide to compare</span><input type="range" min="8" max="92" value={split} onChange={(event) => setSplit(Number(event.target.value))} aria-label="Compare original slide and AI result" /></label>
  </div>
}

function LoopNodeIcon({ type }) {
  const drawings = {
    slide: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 9h10M7 15h5M16 14h1"/></>,
    chip: <><rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M9 2v5M15 2v5M9 17v5M15 17v5M2 9h5M2 15h5M17 9h5M17 15h5M10 10h4v4h-4z"/></>,
    record: <><path d="M6 3h9l3 3v15H6z"/><path d="M15 3v4h4M9 11h6M9 15h6M9 19h4"/></>,
  }
  return <span className={'node-icon node-icon-' + type}><svg viewBox="0 0 24 24" aria-hidden="true">{drawings[type]}</svg></span>
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

function HeadquartersGallery() {
  return <section className="about-headquarters section-shell" aria-labelledby="headquarters-title">
    <div className="about-headquarters-heading"><p className="eyebrow blue">GUANGZHOU HEADQUARTERS</p><h2 id="headquarters-title">A closer look at our headquarters.</h2></div>
    <div className="about-headquarters-gallery">
      <figure className="headquarters-photo headquarters-photo-primary"><img src={assetUrl('images/about-headquarters-building.webp')} alt="Huayin Healthcare Group headquarters building in Guangzhou" loading="lazy" decoding="async" /><figcaption>Huayin Healthcare Group headquarters</figcaption></figure>
      <figure className="headquarters-photo headquarters-photo-secondary"><img src={assetUrl('images/about-headquarters-campus.webp')} alt="Aerial view of the Huayin Healthcare Group headquarters campus in Guangzhou" loading="lazy" decoding="async" /><figcaption>Headquarters campus in Guangzhou, China</figcaption></figure>
    </div>
  </section>
}

function StandardSubpage({ content }) {
  const introParagraphs = Array.isArray(content.intro) ? content.intro : [content.intro]
  return <div className="standard-subpage">
    <section className="subpage-hero"><div className="section-shell"><p className="eyebrow blue">{content.eyebrow}</p><h1>{content.title}</h1><p className="subpage-summary">{content.summary}</p></div></section>
    <section className="subpage-stats section-shell">{content.stats.map(([value, label], index) => <article key={`${value}-${label}-${index}`}><strong>{value}</strong><span>{label}</span></article>)}</section>
    <section className="subpage-intro section-shell"><p className="eyebrow blue">OVERVIEW</p><div className="subpage-intro-copy">{introParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>
    {content.headquarters && <HeadquartersGallery />}
    {content.visual === 'viewer' && <section className="subpage-viewer section-shell"><PathologyViewer /></section>}
    <section className="subpage-grid section-shell">{content.sections.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{copy}</p></article>)}</section>
    <section className="subpage-proof"><div className="section-shell"><div><p className="eyebrow">KEY CAPABILITIES</p><h2>Built for clinical practice.</h2></div><ul>{content.bullets.map(item => <li key={item}>{item}</li>)}</ul></div></section>
    <section className="subpage-cta"><div className="section-shell"><h2>Start a focused conversation with Huayin.</h2><a className="demo-button" href="mailto:intl@huayinlab.com">{content.cta} <span>→</span></a></div></section>
  </div>
}

function RequestDemoPage() {
  return <section className="demo-page"><div className="section-shell demo-page-grid"><div><p className="eyebrow blue">GET STARTED</p><h1>Request a PanoPath demonstration.</h1><div className="demo-copy"><p>Tell us a little about your laboratory and the cases you want to discuss. We will reply within one business day to schedule a remote or on-site demonstration.</p><p>Our international team will route your enquiry to the pathologist and solution architect best suited to your case mix. Indications of urgency, such as an evaluation timeline or tender process, help us prioritise.</p><p>All information you submit is handled under our privacy policy. We will not share your enquiry with third parties.</p></div><div className="demo-trust"><span>ISO 15189</span><span>CAP recognised sites</span><span>Private enquiry handling</span></div></div><form action="mailto:intl@huayinlab.com" method="post" encType="text/plain"><label>Full name<input name="name" required /></label><label>Institution / organisation<input name="organisation" required /></label><label>Role / title<input name="role" required /></label><label>Country<input name="country" required /></label><label>Work email<input type="email" name="email" required /></label><label>Indication of interest<select name="interest" required defaultValue=""><option value="" disabled>Select an option</option><option>Histopathology</option><option>Cytopathology</option><option>IHC Quantification</option><option>Slide QC</option><option>Full-stack ecosystem</option><option>Other</option></select></label><label className="full-field">Approximate annual case volume (optional)<input name="case-volume" /></label><label className="full-field">What would you like to discuss?<textarea name="note" rows="5" placeholder="Evaluation timeline, integration questions, or other context"></textarea></label><label className="demo-consent full-field"><input type="checkbox" name="communications-consent" value="Yes" /><span>I agree to receive invitations to Huayin webinars and events, clinical updates, and relevant product news. I understand that I can withdraw this consent at any time.</span></label><p className="demo-privacy full-field">Huayin will use the information submitted here to respond to your enquiry and manage the requested demonstration. Our <span className="privacy-notice-label">Privacy Notice</span> explains how we handle personal information.</p><button className="demo-button" type="submit">Request a Demo <span>→</span></button></form></div></section>
}

const resolvePage = () => {
  const route = window.location.hash.replace('#/', '')
  if (route === 'request-demo' || subpages[route]) return route
  return 'home'
}

function App() {
  const [page, setPage] = useState(resolvePage)
  const standardPage = subpages[page]

  useEffect(() => {
    const updatePage = () => setPage(resolvePage())
    window.addEventListener('hashchange', updatePage)
    return () => window.removeEventListener('hashchange', updatePage)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [page])

  return <div id="top" className={`${page}-mode ${standardPage ? 'subpage-mode' : ''}`}>
    <Header />
    <main>
      {standardPage && <StandardSubpage content={standardPage} />}
      {page === 'about-us' && <section className="subpage-feature"><div className="section-shell"><section className="china-coverage section-shell" id="coverage"><div className="coverage-copy"><p className="eyebrow blue">CHINA COVERAGE</p><h2>Local reach.<br/>Connected expertise.</h2><p>Huayin serves healthcare partners across 30 provincial-level regions in China. Our network includes 18 provincial reference laboratories supporting customers nationwide.</p><a className="text-button" href="#/global-offices">Connect with Huayin <span>→</span></a></div><div className="coverage-panel" aria-label="China coverage and service site distribution visualization"><div className="coverage-map"><div className="map-stage"></div></div><aside className="coverage-region-list"><div className="coverage-info coverage-info-regions"><span>BUSINESS COVERAGE</span><b>30</b><p>Provinces and regions served across China.</p></div><div className="coverage-info coverage-info-sites"><span>PROVINCIAL LABORATORIES</span><b>18</b><p>Reference laboratories supporting the service network.</p></div></aside></div></section></div></section>}
      {page === 'full-stack-ecosystem' && <section className="subpage-feature"><section className="closed-loop"><div className="section-shell"><div className="closed-loop-heading"><p className="eyebrow">A SELF-REINFORCING ECOSYSTEM</p><h2>Intelligence that keeps<br/>moving forward.</h2><p>Real-world clinical practice makes the ecosystem smarter with every cycle.</p></div><div className="loop-steps"><EcosystemLoop /></div></div></section></section>}
      {page === 'request-demo' && <RequestDemoPage />}
      <section className="hero hero-video">
        <video className="hero-video-media" autoPlay muted loop playsInline aria-hidden="true"><source src={assetUrl('videos/homepage-hero-latest.mp4')} type="video/mp4" /></video>
        <div className="hero-video-overlay"></div>
        <div className="hero-content hero-video-content">
          <p className="eyebrow">COMPREHENSIVE INTELLIGENT PATHOLOGY</p>
          <h1><span>From real-world pathology data</span><span>to real clinical answers.</span></h1>
          <p className="hero-statement">Huayin's PanoPath foundation model and four-in-one ecosystem — adopted by 2,000+ hospital pathology departments and 18 reference laboratories.</p>
          <p className="hero-proof">Independent. Pathology-led since 2010, with over 15 years of pathology expertise. Backed by ISO 15189-accredited laboratories, senior pathologist expertise across 14 subspecialties, and a foundation-model approach to AI.</p>
          <div className="hero-cta-row"><a className="hero-video-link" href="#/request-demo">Request a Demo <span>→</span></a><a className="hero-video-link hero-video-link-secondary" href="#/panopath-platform">See PanoPath <span>→</span></a></div>
        </div>
      </section>

      <section className="stats section-shell">{stats.map((stat) => <AnimatedStat key={stat.label} {...stat} />)}</section>

      <PartnerMarquee />

      <section className="intro section-shell" id="platform"><div><p className="eyebrow blue">THE INTELLIGENCE BEHIND SMARTER PATHOLOGY</p><h2>From every case,<br/>a better next case.</h2></div><p>As a pioneer in telepathology, Huayin has built a real-world pathology data foundation that brings big data, algorithms and clinical scenarios into one continuously improving ecosystem.</p></section>

      <section className="capability-section"><div className="section-shell"><div className="section-heading"><p className="eyebrow blue">WHAT WE ENABLE</p><h2>Built for the next era<br/>of pathology.</h2></div><div className="capability-grid">{capabilities.map(({ title, copy, image, key }) => <article className={'capability-card capability-' + key} key={title}><img className="capability-image" src={assetUrl(image)} alt="" /><div className="capability-card-content"><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div></section>

      <section className="workflow section-shell"><div className="workflow-visual"><PathologyViewer /></div><div className="workflow-copy"><p className="eyebrow blue">THE PanoPath PLATFORM</p><h2>PanoPath: a foundation model for pathology.</h2><p>The world's first multi-clinical-centre pathology foundation model built on Chinese population data, trained on multi-centre cohorts spanning China, North America, and Europe.</p><ul><li>10M+ whole-slide images in the production database</li><li>5M+ AI-assisted diagnostic WSIs</li><li>100+ cancer types detected</li></ul><a className="text-button" href="#/panopath-platform">Explore PanoPath <span>→</span></a></div></section>

      <section className="closed-loop"><div className="section-shell"><div className="closed-loop-heading"><p className="eyebrow">A SELF-REINFORCING ECOSYSTEM</p><h2>Intelligence that keeps<br/>moving forward.</h2><p>Real-world clinical practice makes the ecosystem smarter with every cycle.</p></div><div className="loop-steps"><EcosystemLoop /></div></div></section>

      <section className="clinical-value section-shell" id="resources"><div className="clinical-value-copy"><p className="eyebrow blue">PROVEN IN REAL-WORLD PRACTICE</p><h2>More intelligence.<br/>More value in every diagnosis.</h2><p>As an intelligent pathology assistant, Huayin AI has been proven across millions of real-world cases to help healthcare teams work better.</p></div><div className="value-grid"><article className="value-efficiency"><div className="value-visual" aria-hidden="true"><i></i><i></i><i></i></div><div><span>01 · CLINICAL FLOW</span><h3>Enhance efficiency</h3><p>Support pathologists with timely AI-assisted review and streamlined workflows.</p></div><b aria-hidden="true">↗</b></article><article className="value-cost"><div className="value-visual" aria-hidden="true"><i></i><i></i><i></i></div><div><span>02 · OPERATIONS</span><h3>Reduce costs</h3><p>Help laboratories optimize operations through connected digital pathology.</p></div><b aria-hidden="true">↗</b></article><article className="value-quality"><div className="value-visual" aria-hidden="true"><i></i><i></i><i></i></div><div><span>03 · DIAGNOSTIC QUALITY</span><h3>Improve quality</h3><p>Bring consistent intelligence to more diagnostic decisions, wherever patients are.</p></div><b aria-hidden="true">↗</b></article></div></section>

      <section className="solutions-section" id="solutions"><div className="section-shell"><div className="solutions-intro"><div><p className="eyebrow">SOLUTIONS DESIGNED AROUND YOU</p><h2>One connected ecosystem.<br/>Built for pathology.</h2></div><div className="solutions-summary"><p>AI <span>+</span> PIS <span>+</span> Hardware <span>+</span> Services</p><small>Four-in-one intelligent pathology solution</small></div></div><div className="solution-modules">{solutionModules.map((item, index) => <SolutionModule item={item} index={index} key={item.title} />)}</div></div></section>

      <section className="company-intro" id="company"><div className="section-shell"><div><p className="eyebrow blue">ABOUT HUAYIN HEALTHCARE</p><h2>A global pathology partner, built on clinical practice.</h2></div><div className="company-intro-copy"><p>Huayin is a leading digital-intelligent pathology solutions provider, built on our proprietary PanoPath pathology foundation model and an extensive clinical laboratory service network serving over 10,000 healthcare providers across 30 Chinese provinces.</p><a className="text-button" href="#contact">Connect with Huayin <span>→</span></a></div></div></section>

      <section className="china-coverage section-shell" id="coverage"><div className="coverage-copy"><p className="eyebrow blue">CHINA COVERAGE</p><h2>Local reach.<br/>Connected expertise.</h2><p>Huayin serves healthcare partners across 30 provinces and regions in China. Our network includes 18 provincial reference laboratories and more than 700 jointly established hospital pathology departments.</p><a className="text-button" href="#contact">Connect with Huayin <span>→</span></a></div><div className="coverage-panel" aria-label="China coverage and service site distribution visualization"><div className="coverage-map"><div className="map-stage"><img src={assetUrl('images/china-map-minimal.png')} alt="Line map of China including the South China Sea Islands" /><div className="marker-layer coverage-layer">{coverageMarkers.map(([name, left, top, , labelX, labelY]) => <span className="coverage-pin coverage" style={{ left: `${left}%`, top: `${top}%`, '--label-x': `${labelX}px`, '--label-y': `${labelY}px` }} data-label={name} title={name} aria-label={name} key={name}></span>)}</div><div className="marker-layer service-layer">{coverageMarkers.filter(([, , , type]) => type === 'service').map(([name, left, top, , labelX, labelY]) => <span className="coverage-pin service" style={{ left: `${left}%`, top: `${top}%`, '--label-x': `${labelX}px`, '--label-y': `${labelY}px` }} data-label={name} title={name} aria-label={name} key={name}></span>)}</div></div></div><aside className="coverage-region-list" aria-live="polite"><div className="coverage-info coverage-info-regions"><span>BUSINESS COVERAGE</span><b>30</b><p>Provinces and regions served across China.</p></div><div className="coverage-info coverage-info-sites"><span>PROVINCIAL LABORATORIES</span><b>18</b><p>Reference laboratories supporting the service network:</p><div className="region-names">{laboratoryRegions.map(region => <em key={region}>{region}</em>)}</div></div></aside><div className="coverage-legend"><span className="coverage-view-label"><i className="coverage-dot"></i>Provincial and regional coverage</span><span className="service-view-label"><i className="service-dot"></i>Laboratory distribution</span></div><div className="coverage-totals"><span className="coverage-view-label"><b>30</b> regions covered</span><span className="service-view-label"><b>18</b> provincial laboratories</span></div></div></section>

      <section className="demo-section" id="demo"><div className="section-shell demo-inner"><div><p className="eyebrow">LET'S SHAPE WHAT'S NEXT</p><h2>Ready to transform<br/>your pathology workflow?</h2></div><div><p>Talk with our team about your clinical, operational and deployment needs.</p><a className="demo-button light" href="#/request-demo">Request a demo <span>→</span></a></div></div></section>
    </main>
    <footer id="contact"><div className="section-shell footer-grid"><div><Logo variant="footer" /><p>AI-powered pathology solutions for a more connected global healthcare future.</p></div><div><h4>Explore</h4><a href="#/about-us">Company</a><a href="#/panopath-platform">PanoPath</a><a href="#/full-stack-ecosystem">Solutions</a></div><div><h4>Connect</h4><a href="#/global-offices">Global Offices</a><a href="#/request-demo">Request a Demo</a><a href="mailto:intl@huayinlab.com">Contact us</a></div><div><h4>Legal</h4><a href="#top">Privacy Policy</a><a href="#top">Terms of Use</a><a href="#top">Regulatory Compliance</a></div></div><div className="footer-base section-shell"><span>© 2026 Huayin Healthcare Group. All rights reserved.</span><span>Guangzhou · Global</span></div></footer>
  </div>
}

createRoot(document.getElementById('root')).render(<App />)
