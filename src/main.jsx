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
  { value: 10, suffix: 'M+', label: 'Real-world whole-slide images' },
  { value: 40, suffix: '+', label: 'Disease-specific AI models' },
  { value: 99, suffix: '%', label: 'Routine diagnostic scenarios covered' },
  { value: 2400, suffix: '+', label: 'AI-enabled pathology institutions' },
]

const capabilities = [
  { title: 'Real-world data intelligence', copy: 'PanoPath learns from more than 10 million real-world whole-slide images collected through clinical practice.', image: 'images/capability-real-world.jpg', key: 'real-world' },
  { title: 'Foundation model capabilities', copy: 'A pathology foundation model that delivers leading performance in multi-task evaluation.', image: 'images/capability-foundation-chip.png', key: 'foundation' },
  { title: 'Disease-specific AI', copy: 'More than 40 disease-specific AI models support over 99% of routine diagnostic scenarios.', image: 'images/capability-disease-ai.jpg', key: 'disease-ai' },
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
    title: 'Pathology-first diagnostics, built at scale.',
    summary: 'A specialist reference laboratory and AI diagnostics company serving more than 12,800 healthcare providers across 29 Chinese provinces.',
    intro: [
      'Huayin Healthcare Group is a pathology-led independent medical laboratory and diagnostics company headquartered in Guangzhou, China. Since 2012, we have built our service network around one clinical question: how do we give every patient access to the same quality of pathological diagnosis, regardless of where they live?',
      'Today, our 22 provincial reference laboratories and the jointly established Southern Medical University – Huayin Pathology Diagnosis Center deliver anatomical pathology, clinical laboratory testing, remote pathology consultation, molecular diagnostics, clinical research support, and public-health screening to more than 12,800 institutions. We hold ISO 15189 accreditation and CAP recognition at multiple sites.',
      'In 2025, we released PanoPath, our proprietary pathology foundation model, and integrated it into a closed-loop ecosystem that combines AI, the Pathology Information System (PIS), digital slide scanners, and field service. The same diagnostic intelligence that supports our in-house laboratories is now available to hospital pathology departments worldwide.',
    ],
    stats: [['2012', 'Founded'], ['22', 'Provincial laboratories'], ['29', 'Provinces served'], ['12,800+', 'Institutional partners nationwide']],
    sections: [
      ['Pathology-led since 2012', 'Huayin is pathology-centric, not a general laboratory that added AI as an afterthought.'],
      ['Clinical and academic depth', 'The jointly established Southern Medical University – Huayin Pathology Diagnosis Center connects specialist expertise with daily diagnostic practice.'],
      ['AI grounded in practice', 'PanoPath combines foundation-model AI, the Pathology Information System, digital slide scanners, and field service in one closed clinical workflow.'],
    ],
    bullets: [
      'Pathology-centric since 2012 — not a general lab that added AI as an afterthought.',
      'Joint Pathology Diagnosis Center with Southern Medical University, one of China\'s leading medical schools.',
      'Accredited to ISO 15189 and CAP at multiple laboratory sites.',
      'Active in 29 provinces; more than 12,800 institutional customers served.',
      'Foundation-model approach to pathology AI (PanoPath), not a patchwork of narrow classifiers.',
    ],
    cta: 'Talk to a Huayin representative',
  },
  'leadership-team': {
    eyebrow: 'CLINICAL LEADERSHIP',
    title: 'Pathologists lead. Engineers support.',
    summary: 'Our clinical leadership sets the standard; our engineering and AI teams follow.',
    intro: [
      'Huayin is a clinically led organisation. The Pathology Expert Group is chaired by Professor Ding Yanqing of Southern Medical University, a leading authority on anatomical pathology in China. The Laboratory Expert Group is chaired by Professor Qiu Yurong, former Director of the Department of Laboratory Medicine at Nanfang Hospital. Both groups shape our diagnostic protocols, labelling standards, and product requirements.',
      'Our AI Innovation Center is led by a core team of 30 technical specialists and closely collaborates with Professor Gao Huang\'s research group at Tsinghua University and the Pazhou Lab Center for AI-Powered Computational Pathology.',
      'This structure means that every product decision flows from a clinical question, not the other way around.',
    ],
    stats: [['240', 'Pathologists'], ['14', 'Subspecialties'], ['30', 'Core AI specialists'], ['10+', 'University partners']],
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
    summary: 'One model handles detection, segmentation, classification, prognosis, and multi-omics prediction across solid tumours and cytology.',
    intro: [
      'PanoPath is a single-stage, end-to-end foundation model for whole-slide imaging, jointly developed by Huayin Healthcare and the research group of Professor Gao Huang at Tsinghua University. It is trained on more than 3 million whole-slide images from multi-centre cohorts spanning China, North America, and Europe.',
      'Unlike vendor systems that stitch together 40+ narrow classifiers, PanoPath uses one underlying architecture. This means that as new disease subtypes appear in your laboratory, they can often be supported without retraining from scratch — and that performance on rare tasks improves as the foundation model improves.',
    ],
    stats: [['3M+', 'WSIs in training corpus'], ['100+', 'Cancer types detected'], ['10M+', 'WSIs in production database'], ['5M+', 'AI-assisted diagnostic WSIs']],
    sections: [
      ['One foundation', 'A unified architecture uses local and global attention with efficient long-sequence operators for whole-slide analysis.'],
      ['Multiple clinical tasks', 'Supports pan-cancer detection, lesion-level segmentation, prognosis prediction, gene-mutation prediction, tumour-origin prediction, and spatial transcriptomics interpretation.'],
      ['Multimodal learning', 'Training spans H&E, immunohistochemistry, and molecular data to support connected diagnostic reasoning.'],
    ],
    bullets: [
      'Foundation architecture: a single-stage network with local and global attention and efficient long-sequence operators such as RWKV.',
      'Training data: 3M+ whole-slide images across China, North America, and Europe; DeepSeek/Qwen-based pipelines support translation and data cleaning; multi-agent collaboration supports pretraining-data construction.',
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
      'Huayin\'s disease-specific AI models cover more than 99% of daily diagnostic scenarios in tertiary hospitals. They are deployed today in anatomical pathology laboratories and reference laboratories across China.',
      'Each model has been trained on multi-centre data and evaluated against senior pathologist review. We provide full validation dossiers to qualified partners under NDA.',
    ],
    stats: [['40+', 'Disease-specific models'], ['31', 'Histopathology organ systems'], ['99%+', 'Routine scenarios covered'], ['18+', 'Slide defects flagged']],
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
      'In deployed sites, AI-assisted workflow has been associated with single-case efficiency gains of approximately 70% and a near-95% concordance with senior pathologist review across the routine case mix.',
    ],
    stats: [['70%', 'Per-case efficiency gain'], ['95%+', 'Concordance with senior review'], ['2,400+', 'AI-enabled pathology institutions'], ['5M+', 'AI-assisted diagnostic WSIs']],
    sections: [
      ['Integrate', 'Connect to existing scanners and laboratory systems through standard interfaces and file ingestion.'],
      ['Assist', 'AI pre-screening, suspicious-region highlighting, and structured report output support routine workflows.'],
      ['Deploy', 'Choose on-premise appliance, private-cloud deployment, or a per-case service model.'],
    ],
    bullets: [
      'Connects with major whole-slide scanners, including Hamamatsu, Philips, Leica, Aperio, 3DHistech, and KFBIO.',
      'Integrates with LIS through HL7, DICOM, and standard file-system ingestion.',
      'On-premise AI appliance, private-cloud, and per-case service models are supported.',
      'Structured-report output aligns with existing report templates.',
      'Quarterly quality-assurance review is included with deployment.',
    ],
    cta: 'Plan a site assessment',
  },
  'global-offices': {
    eyebrow: 'CONTACT',
    title: 'Reach Huayin, by region and by topic.',
    summary: 'Headquarters in Guangzhou, with regional representatives across Central Asia, the Middle East, Eastern Europe, and South-East Asia.',
    intro: 'For commercial discussions, technical questions, or partnership enquiries, contact the Huayin office nearest to you. We aim to acknowledge every enquiry within one business day.',
    stats: [['1', 'Business day response target'], ['29', 'Provinces served'], ['22', 'Provincial laboratories'], ['12,800+', 'Institutional partners nationwide']],
    sections: [
      ['International enquiries', 'gbd@huayinlab.com'],
      ['Group headquarters', 'No. 33 Binhe Road, Huangpu District, Guangzhou, Guangdong Province, China.'],
      ['Pathology Diagnosis Center', '2nd Floor, Life Science Building, Southern Medical University, No. 1023–1063 Shatai South Road, Baiyun District, Guangzhou, China.'],
    ],
    bullets: ['Headquarters international enquiries: gbd@huayinlab.com.', 'General switchboard: 400-888-1223 (China).', 'Group headquarters: No. 33 Binhe Road, Huangpu District, Guangzhou, Guangdong Province, China.', 'Pathology Diagnosis Center: Southern Medical University, Guangzhou, China.', 'Group website: www.huayinlab.com.'],
    cta: 'Send a message',
  },
  'global-presence': {
    eyebrow: 'WHERE WE OPERATE',
    title: 'From China, serving pathologists worldwide.',
    summary: 'An established China-wide service network, now extending to international partners.',
    intro: [
      'Huayin\'s service network spans 29 provinces and regions in China, with 22 provincial reference laboratories and more than 700 jointly established hospital pathology departments. More than 12,800 institutional customers rely on our testing and remote consultation services.',
      'We are now extending PanoPath AI and the Huayin four-in-one pathology ecosystem to selected international partners — through local deployment, private-cloud installation, and per-case diagnostic services. Current active regions include Central Asia, the Middle East, Eastern Europe, and South-East Asia.',
    ],
    stats: [['29', 'Provinces and regions'], ['700+', 'Pathology departments'], ['12,800+', 'Institutional partners'], ['2,980+', 'Deep pathology partners']],
    sections: [['China-wide network', 'Twenty-two provincial reference laboratories support testing, pathology, and remote consultation services.'], ['International deployment', 'Current active focus includes Central Asia, the Middle East, Eastern Europe, and South-East Asia.'], ['Flexible support', 'Worldwide shipping and remote support are available for eligible PanoPath deployments.']],
    bullets: ['29 Chinese provinces and regions served.', '22 provincial reference laboratories.', '700+ hospital pathology departments jointly established.', '2,980+ deep collaboration customers in pathology.', 'Worldwide shipping and remote support are available for PanoPath deployments.', 'Active international focus: Central Asia, the Middle East, Eastern Europe, and South-East Asia.'],
    cta: 'Discuss your region',
  },
  'clinical-regulatory': {
    eyebrow: 'EVIDENCE & COMPLIANCE',
    title: 'We will tell you when the AI is good. We will also tell you when it is not.',
    summary: 'Validation studies, intended-use statements, regulatory pathways, and quality standards gathered in one place for review.',
    intro: [
      'Every disease-specific model has been evaluated against senior pathologist consensus on multi-centre cohorts. We publish sensitivity, specificity, and reader-study results, including the failure modes we have observed, such as rare subtypes and low cellularity.',
      'PanoPath and its deployment components are in active regulatory pathways. Regional availability of any given model depends on local regulatory clearance; we provide a country-by-country summary to qualified partners.',
    ],
    stats: [['ISO 15189', 'Laboratory accreditation'], ['CAP', 'Recognition at multiple sites'], ['95%+', 'Average AI diagnostic accuracy'], ['70%', 'Average efficiency gain']],
    sections: [['Clinical validation', 'Multi-centre study summaries identify cohort size, reference standard, performance, and observed limitations.'], ['Intended use', 'Each product is documented with its intended-use statement and applicable deployment constraints.'], ['Regulatory status', 'Country and region status is supplied on request, including where a model remains under review and is not yet cleared.']],
    bullets: ['Multi-centre validation studies with cohort size reported.', 'Intended-use statements for each product.', 'Regulatory status by country or region is available on request under NDA.', 'Quality management includes ISO 13485 process discipline; multiple laboratories hold ISO 15189 and CAP recognition.', 'Quality-control AI flags 18+ common pre-analytical slide defects.', 'Per-case diagnostic services are available where local regulation permits a service-based model.'],
    cta: 'Request regulatory summary',
  },
  'reference-labs': {
    eyebrow: 'FOR REFERENCE LABS',
    title: 'Throughput your lab can price with confidence.',
    summary: 'PanoPath runs the same case mix at higher throughput, so you can quote per-case pricing with predictable margin.',
    intro: [
      'Reference laboratories operate on per-case economics. PanoPath\'s workflow — automated quality control, AI pre-screening, structured reporting, and integration with sign-out — was designed inside a high-volume reference laboratory and is now in production across Huayin\'s own 22 provincial reference laboratories.',
      'We offer laboratories two engagement models: deploy the AI on site with annual licensing and per-case economics, or send overflow cases to Huayin\'s remote diagnostic network under a per-case service agreement.',
    ],
    stats: [['22', 'Provincial reference labs'], ['520,000+', 'GI diagnostic WSIs'], ['400+', 'Multimodal reports'], ['160+', 'Labelling specialists']],
    sections: [['On-site deployment', 'Annual licensing and per-case economics for laboratories operating PanoPath in their own environment.'], ['Overflow service', 'Eligible cases can be routed to Huayin\'s remote diagnostic network under a per-case service agreement.'], ['Multimodal reporting', 'Clinical data, IHC, pathology, imaging, and NGS can be combined into one structured report.']],
    bullets: ['Per-case pricing aligned with your commercial model, with no per-slide surprises.', 'AI-assisted GI biopsy module: 520,000+ diagnostic WSIs processed to date.', '99.9% sensitivity on adenocarcinomas and common benign lesions, including segmentation guidance.', 'Multimodal reporting combines clinical data, IHC, pathology, imaging, and NGS in one structured report.', '400+ multimodal reports generated to date within Huayin\'s network.', 'Co-developed labelling quality assurance is supported by more than 160 high-level labelling personnel.'],
    cta: 'Talk pricing model',
  },
  'pharma-biotech': {
    eyebrow: 'FOR PHARMA & BIOTECH',
    title: 'AI biomarker endpoints your regulators can audit.',
    summary: 'Quantitative IHC scoring, biomarker discovery, and AI-assisted pathology endpoints for clinical-trial and companion-diagnostics workflows.',
    intro: [
      'PanoPath\'s quantitative IHC module scores HER2, Ki-67, ER, PR, and PD-L1 with reproducible, audit-ready image analysis. Pathologist-supervised and pathologist-confirmed workflows support both clinical-trial endpoints and companion-diagnostics development.',
      'Huayin\'s 240 pathologists across 14 subspecialties provide the expert committee that signs off on biomarker outputs and reviews edge cases. Cohorts spanning 3M+ whole-slide images — including multi-centre data from China, North America, and Europe — give sponsors globalisable training and validation data.',
    ],
    stats: [['240', 'Pathologists'], ['14', 'Subspecialties'], ['5', 'Core IHC biomarkers'], ['3M+', 'Training WSIs']],
    sections: [['AI scoring', 'Reproducible quantitative IHC analysis for HER2, Ki-67, ER, PR, and PD-L1.'], ['Expert adjudication', 'A pathologist committee signs off biomarker outputs and reviews edge cases.'], ['Co-development', 'Multi-centre validation and companion-diagnostics collaboration models are available.']],
    bullets: ['AI-assisted quantitative IHC scoring for HER2, Ki-67, ER, PR, and PD-L1.', 'Pathologist committee for biomarker sign-off and adjudication.', 'Tamper-evident signed image outputs aligned with 21 CFR Part 11 expectations where applicable.', 'Multi-centre data for globalisable validation.', 'Spatial transcriptomics interpretation and tumour-origin prediction available on request.', 'Companion-diagnostics co-development agreements are available.'],
    cta: 'Discuss a trial partnership',
  },
  'blog-news': {
    eyebrow: 'INSIGHTS',
    title: 'What we are seeing in AI-assisted pathology.',
    summary: 'Company updates, conference participation, and short notes from our pathology and AI teams.',
    intro: 'Updates from Huayin\'s pathology practice, our AI Innovation Center, and our partners. We aim for substance over volume — expect two to three posts a month, written by working pathologists and engineers.',
    stats: [['2–3', 'Planned posts per month'], ['4', 'Content categories'], ['Clinical', 'Named expert authors'], ['Clear', 'Conflict disclosures']],
    sections: [['Model releases', 'Disease-model updates and concise validation notes.'], ['Events and research', 'Conference presentations, posters, and scientific collaboration.'], ['Workflow guidance', 'Practical notes for laboratories adopting AI-assisted pathology.']],
    bullets: ['New disease-model releases and validation notes.', 'Conference presentations and posters.', 'Partnership announcements.', 'Workflow guides for adopting AI in the laboratory.'],
    cta: 'Subscribe to updates',
  },
  'clinical-evidence': {
    eyebrow: 'EVIDENCE',
    title: 'Studies, validation reports, and post-market data.',
    summary: 'Validation methodology, sensitivity and specificity by indication, and reader-study results — with study size, reference standard, and failure modes clearly stated.',
    intro: [
      'We publish evidence in the format most useful to a pathologist evaluating a new tool: study design, cohort size, reference standard, sensitivity and specificity, and a frank description of where the model underperforms. We distinguish between internal validation, multi-centre validation, and post-market surveillance.',
      'Qualified partners can request full validation dossiers and raw benchmark data under NDA.',
    ],
    stats: [['n=', 'Cohort size stated'], ['Sensitivity', 'Reported by indication'], ['Specificity', 'Reported by indication'], ['NDA', 'Full dossiers on request']],
    sections: [['Validation summaries', 'Multi-centre summaries organised by disease module and indication.'], ['Reader studies', 'Pathologist concordance results with the reference standard stated.'], ['Post-market evidence', 'Surveillance updates, scanner compatibility, and labelling methodology where available.']],
    bullets: ['Multi-centre validation summaries by disease module.', 'Reader-study results with pathologist concordance.', 'Post-market surveillance updates where available.', 'Labelling and ground-truth methodology.', 'Scanner-compatibility validation.'],
    cta: 'Request the clinical dossier',
  },
  partnerships: {
    eyebrow: 'PARTNERS',
    title: 'Local deployment partners, integration partners, and clinical collaborators.',
    summary: 'We work with local distributors, hospital IT integrators, and academic centres to bring PanoPath into new regions. Tell us what you bring to the table.',
    intro: [
      'Huayin\'s international expansion is partnership-led. We are looking for regional partners who can deliver on-the-ground deployment, integration, training, and customer support — combined with our technology and clinical expertise.',
      'Engagement models include distribution, co-deployment for hospital groups, and joint clinical research.',
    ],
    stats: [['3', 'Core partnership models'], ['4', 'Priority regions'], ['10+', 'University partners'], ['1', 'International team']],
    sections: [['Distribution', 'Regional commercial partners support market access, customer relationships, and local service.'], ['Deployment and integration', 'Hospital IT integrators and technical partners support on-premise and private-cloud delivery.'], ['Research', 'Academic and industry collaborators work with Huayin on validation and product development.']],
    bullets: ['Regional distribution across Central Asia, the Middle East, Eastern Europe, and South-East Asia.', 'On-premise and private-cloud deployment partners.', 'Clinical research collaboration with academic centres.', 'Scanner and LIS integration partners.', 'Companion-diagnostics co-development with pharma and biotech.'],
    cta: 'Apply to partner with us',
  },
}

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`

function Logo({ variant = 'header' }) {
  const logoFile = variant === 'footer' ? 'images/huayin-logo-footer.png' : 'images/huayin-logo-header.png'
  return <a className={`brand brand-${variant}`} href="#top" aria-label="Huayin Healthcare home" onClick={() => { if (window.location.hash.startsWith('#/')) window.location.hash = '' }}><img src={assetUrl(logoFile)} alt="Huayin Healthcare Group" /></a>
}

function Header() {
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState(null)
  const closeNavigation = () => {
    setOpen(false)
    setMenu(null)
  }
  const closeMenuOnPointerLeave = () => {
    if (window.matchMedia('(hover: hover)').matches) setMenu(null)
  }
  const toggleMenu = (label) => {
    const canHover = window.matchMedia('(hover: hover)').matches
    setMenu((current) => canHover ? label : (current === label ? null : label))
  }
  return <header className="site-header">
    <div className="nav-wrap">
      <Logo />
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}><span></span><span></span><span></span></button>
      <nav className={open ? 'main-nav open' : 'main-nav'}>
        {navItems.map(({ label, items }) => <div className="nav-item" key={label} onMouseEnter={() => setMenu(label)} onMouseLeave={closeMenuOnPointerLeave}>
          <button onClick={() => toggleMenu(label)} aria-expanded={menu === label}>{label}<span className="chevron">⌄</span></button>
          {menu === label && <div className="dropdown">{items.map(item => <a href={item.href} onClick={closeNavigation} key={item.label}>{item.label}</a>)}</div>}
        </div>)}
        <a className="language" href="#top">EN <span>/</span> 中</a>
        <a className="demo-button nav-demo" href="#/request-demo" onClick={closeNavigation}>Request a demo <span>→</span></a>
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
  const canvasRef = useRef(null)
  const draggingRef = useRef(false)
  const updateSplit = (event) => {
    const bounds = canvasRef.current?.getBoundingClientRect()
    if (!bounds) return
    setSplit(Math.max(8, Math.min(92, ((event.clientX - bounds.left) / bounds.width) * 100)))
  }
  const startDrag = (event) => {
    event.preventDefault()
    draggingRef.current = true
    setDragging(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }
  const drag = (event) => {
    if (draggingRef.current) updateSplit(event)
  }
  const endDrag = (event) => {
    draggingRef.current = false
    setDragging(false)
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
  }
  const moveWithKeyboard = (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    setSplit((current) => Math.max(8, Math.min(92, current + (event.key === 'ArrowRight' ? 4 : -4))))
  }
  const overlay = mode === 'heatmap' ? 'images/panopath-slide-heatmap-v2.png' : 'images/panopath-slide-lesion-v2.png'
  const label = mode === 'heatmap' ? 'AI heatmap' : 'Lesion distribution'
  return <div className="pathology-viewer">
    <div className="viewer-toolbar"><span><i></i>AI-assisted review</span><div><button className={mode === 'heatmap' ? 'active' : ''} onClick={() => setMode('heatmap')}>Heatmap</button><button className={mode === 'lesion' ? 'active' : ''} onClick={() => setMode('lesion')}>Lesion map</button></div></div>
    <div className="viewer-canvas" ref={canvasRef}>
      <img src={assetUrl('images/panopath-slide-original-v2.png')} alt="Original pathology slide" />
      <div className="viewer-overlay" style={{ clipPath: 'inset(0 0 0 ' + split + '%)' }}><img src={assetUrl(overlay)} alt={label + ' result'} /></div>
      <div className={'viewer-divider ' + (dragging ? 'is-dragging' : '')} style={{ left: split + '%' }} role="slider" tabIndex="0" aria-label="Drag to compare original slide and AI result" aria-valuemin="8" aria-valuemax="92" aria-valuenow={Math.round(split)} onPointerDown={startDrag} onPointerMove={drag} onPointerUp={endDrag} onPointerCancel={endDrag} onKeyDown={moveWithKeyboard}><span>↔</span></div>
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

function StandardSubpage({ content }) {
  const introParagraphs = Array.isArray(content.intro) ? content.intro : [content.intro]
  return <div className="standard-subpage">
    <section className="subpage-hero"><div className="section-shell"><p className="eyebrow blue">{content.eyebrow}</p><h1>{content.title}</h1><p className="subpage-summary">{content.summary}</p></div></section>
    <section className="subpage-stats section-shell">{content.stats.map(([value, label], index) => <article key={`${value}-${label}-${index}`}><strong>{value}</strong><span>{label}</span></article>)}</section>
    <section className="subpage-intro section-shell"><p className="eyebrow blue">OVERVIEW</p><div className="subpage-intro-copy">{introParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>
    {content.visual === 'viewer' && <section className="subpage-viewer section-shell"><PathologyViewer /></section>}
    <section className="subpage-grid section-shell">{content.sections.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{copy}</p></article>)}</section>
    <section className="subpage-proof"><div className="section-shell"><div><p className="eyebrow">KEY CAPABILITIES</p><h2>Built for clinical practice.</h2></div><ul>{content.bullets.map(item => <li key={item}>{item}</li>)}</ul></div></section>
    <section className="subpage-cta"><div className="section-shell"><h2>Start a focused conversation with Huayin.</h2><a className="demo-button" href="mailto:gbd@huayinlab.com">{content.cta} <span>→</span></a></div></section>
  </div>
}

function RequestDemoPage() {
  return <section className="demo-page"><div className="section-shell demo-page-grid"><div><p className="eyebrow blue">GET STARTED</p><h1>Request a PanoPath demonstration.</h1><div className="demo-copy"><p>Tell us a little about your laboratory and the cases you want to discuss. We will reply within one business day to schedule a remote or on-site demonstration.</p><p>Our international team will route your enquiry to the pathologist and solution architect best suited to your case mix. Indications of urgency, such as an evaluation timeline or tender process, help us prioritise.</p><p>All information you submit is handled under our privacy policy. We will not share your enquiry with third parties.</p></div><div className="demo-trust"><span>ISO 15189</span><span>CAP recognised sites</span><span>Private enquiry handling</span></div></div><form action="mailto:gbd@huayinlab.com" method="post" encType="text/plain"><label>Full name<input name="name" required /></label><label>Institution / organisation<input name="organisation" required /></label><label>Role / title<input name="role" required /></label><label>Country<input name="country" required /></label><label>Work email<input type="email" name="email" required /></label><label>Indication of interest<select name="interest" required defaultValue=""><option value="" disabled>Select an option</option><option>Histopathology</option><option>Cytopathology</option><option>IHC Quantification</option><option>Slide QC</option><option>Full-stack ecosystem</option><option>Other</option></select></label><label className="full-field">Approximate annual case volume (optional)<input name="case-volume" /></label><label className="full-field">What would you like to discuss?<textarea name="note" rows="5" placeholder="Evaluation timeline, integration questions, or other context"></textarea></label><button className="demo-button" type="submit">Request a Demo <span>→</span></button></form></div></section>
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
      {page === 'about-us' && <section className="subpage-feature"><div className="section-shell"><section className="china-coverage section-shell" id="coverage"><div className="coverage-copy"><p className="eyebrow blue">CHINA COVERAGE</p><h2>Local reach.<br/>Connected expertise.</h2><p>Huayin serves healthcare partners across 29 provincial-level regions in China. Our network includes 22 provincial-level service sites, with multiple sites operating in selected cities.</p><a className="text-button" href="#/global-offices">Connect with Huayin <span>→</span></a></div><div className="coverage-panel" aria-label="China coverage and service site distribution visualization"><div className="coverage-map"><div className="map-stage"></div></div><aside className="coverage-region-list"><div className="coverage-info coverage-info-regions"><span>BUSINESS COVERAGE</span><b>29</b><p>Provincial-level regions across mainland China.</p></div><div className="coverage-info coverage-info-sites"><span>SERVICE SITE NETWORK</span><b>22</b><p>Provincial reference laboratories supporting the service network.</p></div></aside></div></section></div></section>}
      {page === 'full-stack-ecosystem' && <section className="subpage-feature"><section className="closed-loop"><div className="section-shell"><div className="closed-loop-heading"><p className="eyebrow">A SELF-REINFORCING ECOSYSTEM</p><h2>Intelligence that keeps<br/>moving forward.</h2><p>Real-world clinical practice makes the ecosystem smarter with every cycle.</p></div><div className="loop-steps"><EcosystemLoop /></div></div></section></section>}
      {page === 'request-demo' && <RequestDemoPage />}
      <section className="hero hero-video">
        <video className="hero-video-media" autoPlay muted loop playsInline aria-hidden="true"><source src={assetUrl('videos/homepage-hero-latest.mp4')} type="video/mp4" /></video>
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

      <section className="capability-section"><div className="section-shell"><div className="section-heading"><p className="eyebrow blue">WHAT WE ENABLE</p><h2>Built for the next era<br/>of pathology.</h2><a className="text-button" href="#solutions">Discover our capabilities <span>→</span></a></div><div className="capability-grid">{capabilities.map(({ title, copy, image, key }) => <article className={'capability-card capability-' + key} key={title}><img className="capability-image" src={assetUrl(image)} alt="" /><div className="capability-card-content"><h3>{title}</h3><p>{copy}</p><a href="#demo" aria-label={'Learn about ' + title}>Learn more <span>→</span></a></div></article>)}</div></div></section>

      <section className="workflow section-shell"><div className="workflow-visual"><PathologyViewer /></div><div className="workflow-copy"><p className="eyebrow blue">THE PanoPath PLATFORM</p><h2>PanoPath: a foundation model for pathology.</h2><p>Trained on Huayin's large real-world WSI database, PanoPath achieves leading performance in multi-task evaluation and turns accumulated clinical intelligence into practical diagnostic assistance.</p><ul><li>10M+ real-world whole-slide images</li><li>40+ disease-specific AI models</li><li>Clinical intelligence designed for daily practice</li></ul><a className="text-button" href="#/panopath-platform">Explore PanoPath <span>→</span></a></div></section>

      <section className="closed-loop"><div className="section-shell"><div className="closed-loop-heading"><p className="eyebrow">A SELF-REINFORCING ECOSYSTEM</p><h2>Intelligence that keeps<br/>moving forward.</h2><p>Real-world clinical practice makes the ecosystem smarter with every cycle.</p></div><div className="loop-steps"><EcosystemLoop /></div></div></section>

      <section className="clinical-value section-shell" id="resources"><div className="clinical-value-copy"><p className="eyebrow blue">PROVEN IN REAL-WORLD PRACTICE</p><h2>More intelligence.<br/>More value in every diagnosis.</h2><p>As an intelligent pathology assistant, Huayin AI has been proven across millions of real-world cases to help healthcare teams work better.</p></div><div className="value-grid"><article className="value-efficiency"><div className="value-visual" aria-hidden="true"><i></i><i></i><i></i></div><div><span>01 · CLINICAL FLOW</span><h3>Enhance efficiency</h3><p>Support pathologists with timely AI-assisted review and streamlined workflows.</p></div><b aria-hidden="true">↗</b></article><article className="value-cost"><div className="value-visual" aria-hidden="true"><i></i><i></i><i></i></div><div><span>02 · OPERATIONS</span><h3>Reduce costs</h3><p>Help laboratories optimize operations through connected digital pathology.</p></div><b aria-hidden="true">↗</b></article><article className="value-quality"><div className="value-visual" aria-hidden="true"><i></i><i></i><i></i></div><div><span>03 · DIAGNOSTIC QUALITY</span><h3>Improve quality</h3><p>Bring consistent intelligence to more diagnostic decisions, wherever patients are.</p></div><b aria-hidden="true">↗</b></article></div></section>

      <section className="solutions-section" id="solutions"><div className="section-shell"><div className="solutions-intro"><div><p className="eyebrow">SOLUTIONS DESIGNED AROUND YOU</p><h2>One connected ecosystem.<br/>Built for pathology.</h2></div><div className="solutions-summary"><p>AI <span>+</span> PIS <span>+</span> Hardware <span>+</span> Services</p><small>Four-in-one intelligent pathology solution</small></div></div><div className="solution-modules">{solutionModules.map((item, index) => <SolutionModule item={item} index={index} key={item.title} />)}</div></div></section>

      <section className="company-intro" id="company"><div className="section-shell"><div><p className="eyebrow blue">ABOUT HUAYIN HEALTHCARE</p><h2>A global pathology partner, built on clinical practice.</h2></div><div className="company-intro-copy"><p>Guangzhou Huayin Healthcare Group is a global provider of pathology-focused independent clinical laboratory services. As a pioneer in telepathology, we connect clinical expertise, data and technology to advance smarter pathology worldwide.</p><a className="text-button" href="#contact">Connect with Huayin <span>→</span></a></div></div></section>

      <section className="china-coverage section-shell" id="coverage"><div className="coverage-copy"><p className="eyebrow blue">CHINA COVERAGE</p><h2>Local reach.<br/>Connected expertise.</h2><p>Huayin serves healthcare partners across 29 provincial-level regions in China. Our network includes 22 provincial-level service sites, with multiple sites operating in selected cities to meet local clinical and operational needs.</p><a className="text-button" href="#contact">Connect with Huayin <span>→</span></a></div><div className="coverage-panel" aria-label="China coverage and service site distribution visualization"><div className="coverage-map"><div className="map-stage"><img src={assetUrl('images/china-map-minimal.png')} alt="Line map of China including the South China Sea Islands" /><div className="marker-layer coverage-layer">{coverageMarkers.map(([name, left, top, , labelX, labelY]) => <span className="coverage-pin coverage" style={{ left: `${left}%`, top: `${top}%`, '--label-x': `${labelX}px`, '--label-y': `${labelY}px` }} data-label={name} title={name} aria-label={name} key={name}></span>)}</div><div className="marker-layer service-layer">{coverageMarkers.filter(([, , , type]) => type === 'service').map(([name, left, top, , labelX, labelY]) => <span className="coverage-pin service" style={{ left: `${left}%`, top: `${top}%`, '--label-x': `${labelX}px`, '--label-y': `${labelY}px` }} data-label={name} title={name} aria-label={name} key={name}></span>)}</div></div></div><aside className="coverage-region-list" aria-live="polite"><div className="coverage-info coverage-info-regions"><span>BUSINESS COVERAGE</span><b>29</b><p>Provincial-level regions across mainland China.</p></div><div className="coverage-info coverage-info-sites"><span>SERVICE SITE NETWORK</span><b>22</b><p>Service sites across these provincial-level regions:</p><div className="region-names">{laboratoryRegions.map(region => <em key={region}>{region}</em>)}</div></div></aside><div className="coverage-legend"><span className="coverage-view-label"><i className="coverage-dot"></i>Provincial-level coverage</span><span className="service-view-label"><i className="service-dot"></i>Service site distribution</span></div><div className="coverage-totals"><span className="coverage-view-label"><b>29</b> regions covered</span><span className="service-view-label"><b>22</b> service sites</span></div></div></section>

      <section className="demo-section" id="demo"><div className="section-shell demo-inner"><div><p className="eyebrow">LET'S SHAPE WHAT'S NEXT</p><h2>Ready to transform<br/>your pathology workflow?</h2></div><div><p>Talk with our team about your clinical, operational and deployment needs.</p><a className="demo-button light" href="mailto:international@huayinhealthcare.com">Request a demo <span>→</span></a></div></div></section>
    </main>
    <footer id="contact"><div className="section-shell footer-grid"><div><Logo variant="footer" /><p>AI-powered pathology solutions for a more connected global healthcare future.</p></div><div><h4>Explore</h4><a href="#/about-us">Company</a><a href="#/panopath-platform">PanoPath</a><a href="#/full-stack-ecosystem">Solutions</a></div><div><h4>Connect</h4><a href="#/global-offices">Global Offices</a><a href="#/request-demo">Request a Demo</a><a href="mailto:gbd@huayinlab.com">Contact us</a></div><div><h4>Legal</h4><a href="#top">Privacy Policy</a><a href="#top">Terms of Use</a><a href="#top">Regulatory Compliance</a></div></div><div className="footer-base section-shell"><span>© 2026 Huayin Healthcare Group. All rights reserved.</span><span>Guangzhou · Global</span></div></footer>
  </div>
}

createRoot(document.getElementById('root')).render(<App />)
