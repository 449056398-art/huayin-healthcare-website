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
    summary: 'A leading digital-intelligent pathology solutions provider, built on our proprietary PanoPath pathology foundation model and an extensive clinical laboratory service network â€” serving over 10,000 healthcare providers across 30 Chinese provinces.',
    intro: [
      'Huayin Healthcare Group is a pathology-led independent medical laboratory and diagnostics company headquartered in Guangzhou, China. Since 2010, we have built our service network around one clinical question: how do we give every patient access to the same quality of pathological diagnosis, regardless of where they live?',
      'Today, our 18 provincial reference laboratories and the jointly established Southern Medical University â€“ Huayin Pathology Diagnosis Center deliver anatomical pathology, clinical laboratory testing, remote pathology consultation, molecular diagnostics, clinical research support, and public-health screening to over 10,000 institutions. We hold ISO 15189 accreditation and CAP recognition at multiple sites.',
      'In 2025, we released PanoPath â€” the world\'s first multi-clinical-centre pathology foundation model built on Chinese population data â€” and integrated it into a closed-loop ecosystem that combines AI, the Pathology Information System (PIS), digital slide scanners, and field service. The same diagnostic intelligence that supports our in-house laboratories is now available to hospital pathology departments worldwide.',
    ],
    stats: [['2009', 'Founded'], ['18', 'Provincial laboratories'], ['30', 'Provinces served'], ['10,000+', 'Institutional customers']],
    sections: [
      ['Pathology-led since 2010', 'Huayin is pathology-centric, not a general laboratory that added AI as an afterthought.'],
      ['Clinical and academic depth', 'The jointly established Southern Medical University â€“ Huayin Pathology Diagnosis Center connects specialist expertise with daily diagnostic practice.'],
      ['AI grounded in practice', 'PanoPath combines foundation-model AI, the Pathology Information System, digital slide scanners, and field service in one closed clinical workflow.'],
    ],
    bullets: [
      'Pathology-centric since 2010 â€” not a general lab that added AI as an afterthought.',
      'Joint Pathology Diagnosis Center with Southern Medical University, one of China\'s leading medical schools.',
      'Accredited to ISO 15189 and CAP at multiple laboratory sites.',
      'Laboratories established in 18 provinces; service coverage across 30 provinces nationwide.',
      'Over 10,000 institutional customers served.',
      'Foundation-model approach to pathology AI (PanoPath) â€” the world\'s first multi-clinical-centre pathology foundation model built on Chinese population data.',
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
      'Pathology Expert Group â€” chaired by Prof. Ding Yanqing (Southern Medical University).',
      'Laboratory Expert Group â€” chaired by Prof. Qiu Yurong (former Director, Nanfang Hospital Laboratory Medicine).',
      'AI Innovation Center â€” 30 core technical specialists.',
      'Research collaboration with Tsinghua University (Prof. Gao Huang) and Pazhou Lab.',
      'Strategic partnerships with 10+ universities including the University of Pennsylvania.',
    ],
    cta: 'Read full bios',
  },
  'panopath-platform': {
    eyebrow: 'PANOPATH AI',
    title: 'A foundation model for pathology, not a collection of point solutions.',
    summary: 'The world\'s first multi-clinical-centre pathology foundation model built on Chinese population data â€” one model handles detection, segmentation, classification, prognosis, and multi-omics prediction across solid tumours and cytology.',
    intro: [
      'PanoPath is a single-stage, end-to-end foundation model for whole-slide imaging, jointly developed by Huayin Health and the research group of Professor Gao Huang at Tsinghua University. It is trained on multi-centre cohorts spanning China, North America, and Europe, making it the world\'s first multi-clinical-centre pathology foundation model built on Chinese population data.',
      'Unlike vendor systems that stitch together 40+ narrow classifiers, PanoPath uses one underlying architecture. This means that as new disease subtypes appear in your laboratory, they can often be supported without retraining from scratch â€” and that performance on rare tasks improves as the foundation model improves.',
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
      'Each model has been trained on multi-centre data and evaluated against senior pathologist review. We provide full validation dossiers to quali×MüÚÚ$z{-®éÜj×7V'vR×&ööb#ãÆF—b6Æ74æÖSÒ'6V7F–öâ×6†VÆÂ#ãÆF—cãÇ6Æ74æÖSÒ&W–V'&÷r#ä´U’4$”Ä•D”U3Â÷ãÆƒ#ä'V–ÇBf÷"6Æ–æ–6Â&7F–6RãÂöƒ#ãÂöF—cãÇVÃç¶6öçFVçBæ'VÆÆWG2æÖ†—FVÒÓâÆÆ’¶W“×¶—FV×Óç¶—FV×ÓÂöÆ“â—ÓÂ÷VÃãÂöF—cãÂ÷6V7F–öãà¢Ç6V7F–öâ6Æ74æÖSÒ'7V'vRÖ7F#ãÆF—b6Æ74æÖSÒ'6V7F–öâ×6†VÆÂ#ãÆƒ#å7F'Bfö7W6VB6öçfW'6F–öâv—F‚‡V––âãÂöƒ#ãÆ6Æ74æÖSÒ&FVÖòÖ'WGFöâ"‡&VcÒ&Ö–ÇFó¦–çFÄ‡V––æÆ"æ6öÒ#ç¶6öçFVçBæ7FÒÇ7ãî(i#Â÷7ããÂöãÂöF—cãÂ÷6V7F–öãà¢ÂöF—cà§Ğ ¦gVæ7F–öâ&WVW7DFVÖõvR‚’°¢&WGW&âÇ6V7F–öâ6Æ74æÖSÒ&FVÖò×vR#ãÆF—b6Æ74æÖSÒ'6V7F–öâ×6†VÆÂFVÖò×vRÖw&–B#ãÆF—cãÇ6Æ74æÖSÒ&W–V'&÷r&ÇVR#ätUB5D%DTCÂ÷ãÆƒå&WVW7BæõF‚FVÖöç7G&F–öâãÂöƒãÆF—b6Æ74æÖSÒ&FVÖòÖ6÷’#ãÇåFVÆÂW2Æ—GFÆR&÷WB–÷W"Æ&÷&F÷'’æBF†R66W2–÷RvçBFòF—67W72âvRv–ÆÂ&WÇ’v—F†–âöæR'W6–æW72F’Fò66†VGVÆR&VÖ÷FR÷"öâ×6—FRFVÖöç7G&F–öâãÂ÷ãÇä÷W"–çFW&æF–öæÂFVÒv–ÆÂ&÷WFR–÷W"VçV—'’FòF†RF†öÆöv—7BæB6öÇWF–öâ&6†—FV7B&W7B7V—FVBFò–÷W"66RÖ—‚â–æF–6F–öç2öbW&vVæ7’Â7V6‚2âWfÇVF–öâF–ÖVÆ–æR÷"FVæFW"&ö6W72Â†VÇW2&–÷&—F—6RãÂ÷ãÇäÆÂ–æf÷&ÖF–öâ–÷R7V&Ö—B—2†æFÆVBVæFW"÷W"&—f7’öÆ–7’âvRv–ÆÂæ÷B6†&R–÷W"VçV—'’v—F‚F†—&B'F–W2ãÂ÷ãÂöF—cãÆF—b6Æ74æÖSÒ&FVÖò×G'W7B#ãÇ7ãä•4òSƒ“Â÷7ããÇ7ãä4&V6övæ—6VB6—FW3Â÷7ããÇ7ãå&—fFRVçV—'’†æFÆ–æsÂ÷7ããÂöF—cãÂöF—cãÆf÷&Ò7F–öãÒ&Ö–ÇFó¦–çFÄ‡V––æÆ"æ6öÒ"ÖWF†öCÒ'÷7B"Væ5G—SÒ'FW‡B÷Æ–â#ãÆÆ&VÃägVÆÂæÖSÆ–çWBæÖSÒ&æÖR"&WV—&VBóãÂöÆ&VÃãÆÆ&VÃä–ç7F—GWF–öâò÷&væ—6F–öãÆ–çWBæÖSÒ&÷&væ—6F–öâ"&WV—&VBóãÂöÆ&VÃãÆÆ&VÃå&öÆRòF—FÆSÆ–çWBæÖSÒ'&öÆR"&WV—&VBóãÂöÆ&VÃãÆÆ&VÃä6÷VçG'“Æ–çWBæÖSÒ&6÷VçG'’"&WV—&VBóãÂöÆ&VÃãÆÆ&VÃåv÷&²VÖ–ÃÆ–çWBG—SÒ&VÖ–Â"æÖSÒ&VÖ–Â"&WV—&VBóãÂöÆ&VÃãÆÆ&VÃä–æF–6F–öâöb–çFW&W7CÇ6VÆV7BæÖSÒ&–çFW&W7B"&WV—&VBFVfVÇEfÇVSÒ"#ãÆ÷F–öâfÇVSÒ""F—6&ÆVCå6VÆV7Bâ÷F–öãÂö÷F–öããÆ÷F–öãä†—7F÷F†öÆöw“Âö÷F–öããÆ÷F–öãä7—F÷F†öÆöw“Âö÷F–öããÆ÷F–öãä”„2VçF–f–6F–öãÂö÷F–öããÆ÷F–öãå6Æ–FR3Âö÷F–öããÆ÷F–öãägVÆÂ×7F6²V6÷7—7FVÓÂö÷F–öããÆ÷F–öãä÷F†W#Âö÷F–öããÂ÷6VÆV7CãÂöÆ&VÃãÆÆ&VÂ6Æ74æÖSÒ&gVÆÂÖf–VÆB#ä&÷†–ÖFRæçVÂ66RföÇVÖR†÷F–öæÂ“Æ–çWBæÖSÒ&66R×föÇVÖR"óãÂöÆ&VÃãÆÆ&VÂ6Æ74æÖSÒ&gVÆÂÖf–VÆB#åv†Bv÷VÆB–÷RÆ–¶RFòF—67W73óÇFW‡F&VæÖSÒ&æ÷FR"&÷w3Ò#R"Æ6V†öÆFW#Ò$WfÇVF–öâF–ÖVÆ–æRÂ–çFVw&F–öâVW7F–öç2Â÷"÷F†W"6öçFW‡B#ãÂ÷FW‡F&VãÂöÆ&VÃãÆÆ&VÂ6Æ74æÖSÒ&FVÖòÖ6öç6VçBgVÆÂÖf–VÆB#ãÆ–çWBG—SÒ&6†V6¶&÷‚"æÖSÒ&6öÖ×Væ–6F–öç2Ö6öç6VçB"fÇVSÒ%–W2"óãÇ7ãä’w&VRFò&V6V—fR–çf—FF–öç2Fò‡V––âvV&–æ'2æBWfVçG2Â6Æ–æ–6ÂWFFW2ÂæB&VÆWfçB&öGV7BæWw2â’VæFW'7FæBF†B’6âv—F†G&rF†—26öç6VçBBç’F–ÖRãÂ÷7ããÂöÆ&VÃãÇ6Æ74æÖSÒ&FVÖò×&—f7’gVÆÂÖf–VÆB#ä‡V––âv–ÆÂW6RF†R–æf÷&ÖF–öâ7V&Ö—GFVB†W&RFò&W7öæBFò–÷W"VçV—'’æBÖævRF†R&WVW7FVBFVÖöç7G&F–öââ÷W"Ç7â6Æ74æÖSÒ'&—f7’Öæ÷F–6RÖÆ&VÂ#å&—f7’æ÷F–6SÂ÷7ãâW‡Æ–ç2†÷rvR†æFÆRW'6öæÂ–æf÷&ÖF–öâãÂ÷ãÆ'WGFöâ6Æ74æÖSÒ&FVÖòÖ'WGFöâ"G—SÒ'7V&Ö—B#å&WVW7BFVÖòÇ7ãî(i#Â÷7ããÂö'WGFöããÂöf÷&ÓãÂöF—cãÂ÷6V7F–öãà§Ğ ¦6öç7B&W6öÇfUvRÒ‚’Óâ°¢6öç7B&÷WFRÒv–æF÷ræÆö6F–öâæ†6‚ç&WÆ6R‚r2òrÂrr¢–b‡&÷WFRÓÓÒw&WVW7BÖFVÖòrÇÂ7V'vW5·&÷WFUÒ’&WGW&â&÷WFP¢&WGW&âv†öÖRp§Ğ ¦gVæ7F–öâ‚’°¢6öç7B·vRÂ6WEvUÒÒW6U7FFR‡&W6öÇfUvR¢6öç7B7FæF&EvRÒ7V'vW5·vUĞ ¢W6TVffV7B‚‚’Óâ°¢6öç7BWFFUvRÒ‚’Óâ6WEvR‡&W6öÇfUvR‚’¢v–æF÷ræFDWfVçDÆ—7FVæW"‚v†6†6†ævRrÂWFFUvR¢&WGW&â‚’Óâv–æF÷rç&VÖ÷fTWfVçDÆ—7FVæW"‚v†6†6†ævRrÂWFFUvR¢ÒÂµÒ ¢W6TVffV7B‚‚’Óâ°¢v–æF÷rç67&öÆÅFò‡²F÷¢Â&V†f–÷#¢vWFòrÒ¢ÒÂ·vUÒ ¢&WGW&âÆF—b–CÒ'F÷"6Æ74æÖS×¶G·vWÒÖÖöFRG·7FæF&EvRòw7V'vRÖÖöFRr¢rwÖÓà¢Ä†VFW"óà¢ÆÖ–ãà¢·7FæF&EvRbbÅ7FæF&E7V'vR6öçFVçC×·7FæF&EvWÒóçĞ¢·vRÓÓÒv&÷WB×W2rbbÇ6V7F–öâ6Æ74æÖSÒ'7V'vRÖfVGW&R#ãÆF—b6Æ74æÖSÒ'6V7F–öâ×6†VÆÂ#ãÇ6V7F–öâ6Æ74æÖSÒ&6†–æÖ6÷fW&vR6V7F–öâ×6†VÆÂ"–CÒ&6÷fW&vR#ãÆF—b6Æ74æÖSÒ&6÷fW&vRÖ6÷’#ãÇ6Æ74æÖSÒ&W–V'&÷r&ÇVR#ä4„”ä4õdU$tSÂ÷ãÆƒ#äÆö6Â&V6‚ãÆ'"óä6öææV7FVBW‡W'F—6RãÂöƒ#ãÇä‡V––â6W'fW2†VÇF†6&R'FæW'27&÷723&÷f–æ6–ÂÖÆWfVÂ&Vv–öç2–â6†–æâ÷W"æWGv÷&²–æ6ÇVFW2‚&÷f–æ6–Â&VfW&Væ6RÆ&÷&F÷&–W27W÷'F–ær7W7FöÖW'2æF–öçv–FRãÂ÷ãÆ6Æ74æÖSÒ'FW‡BÖ'WGFöâ"‡&VcÒ"2övÆö&ÂÖöff–6W2#ä6öææV7Bv—F‚‡V––âÇ7ãî(i#Â÷7ããÂöãÂöF—cãÆF—b6Æ74æÖSÒ&6÷fW&vR×æVÂ"&–ÖÆ&VÃÒ$6†–æ6÷fW&vRæB6W'f–6R6—FRF—7G&–'WF–öâf—7VÆ—¦F–öâ#ãÆF—b6Æ74æÖSÒ&6÷fW&vRÖÖ#ãÆF—b6Æ74æÖSÒ&Ö×7FvR#ãÂöF—cãÂöF—cãÆ6–FR6Æ74æÖSÒ&6÷fW&vR×&Vv–öâÖÆ—7B#ãÆF—b6Æ74æÖSÒ&6÷fW&vRÖ–æfò6÷fW&vRÖ–æfò×&Vv–öç2#ãÇ7ãä%U4”äU524õdU$tSÂ÷7ããÆ#ã3Âö#ãÇå&÷f–æ6W2æB&Vv–öç26W'fVB7&÷726†–æãÂ÷ãÂöF—cãÆF—b6Æ74æÖSÒ&6÷fW&vRÖ–æfò6÷fW&vRÖ–æfò×6—FW2#ãÇ7ãå$õd”ä4”ÂÄ$õ$Dõ$”U3Â÷7ããÆ#ãƒÂö#ãÇå&VfW&Væ6RÆ&÷&F÷&–W27W÷'F–ærF†R6W'f–6RæWGv÷&²ãÂ÷ãÂöF—cãÂö6–FSãÂöF—cãÂ÷6V7F–öããÂöF—cãÂ÷6V7F–öãçĞ¢·vRÓÓÒvgVÆÂ×7F6²ÖV6÷7—7FVÒrbbÇ6V7F–öâ6Æ74æÖSÒ'7V'vRÖfVGW&R#ãÇ6V7F–öâ6Æ74æÖSÒ&6Æ÷6VBÖÆö÷#ãÆF—b6Æ74æÖSÒ'6V7F–öâ×6†VÆÂ#ãÆF—b6Æ74æÖSÒ&6Æ÷6VBÖÆö÷Ö†VF–ær#ãÇ6Æ74æÖSÒ&W–V'&÷r#ä4TÄbÕ$T”ädõ$4”ärT4õ5•5DTÓÂ÷ãÆƒ#ä–çFVÆÆ–vVæ6RF†B¶VW3Æ'"óæÖ÷f–ærf÷'v&BãÂöƒ#ãÇå&VÂ×v÷&ÆB6Æ–æ–6Â&7F–6RÖ¶W2F†RV6÷7—7FVÒ6Ö'FW"v—F‚WfW'’7–6ÆRãÂ÷ãÂöF—cãÆF—b6Æ74æÖSÒ&Æö÷×7FW2#ãÄV6÷7—7FVÔÆö÷óãÂöF—cãÂöF—cãÂ÷6V7F–öããÂ÷6V7F–öãçĞ¢·vRÓÓÒw&WVW7BÖFVÖòrbbÅ&WVW7DFVÖõvRóçĞ¢Ç6V7F–öâ6Æ74æÖSÒ&†W&ò†W&ò×f–FVò#à¢Çf–FVò6Æ74æÖSÒ&†W&ò×f–FVòÖÖVF–"WFõÆ’×WFVBÆö÷Æ—4–æÆ–æR&–Ö†–FFVãÒ'G'VR#ãÇ6÷W&6R7&3×¶76WEW&Â‚wf–FV÷2ö†öÖWvRÖ†W&òÖÆFW7Bæ×Br—ÒG—SÒ'f–FVòö×B"óãÂ÷f–FVóà¢ÆF—b6Æ74æÖSÒ&†W&ò×f–FVòÖ÷fW&Æ’#ãÂöF—cà¢ÆF—b6Æ74æÖSÒ&†W&òÖ6öçFVçB†W&ò×f–FVòÖ6öçFVçB#à¢Ç6Æ74æÖSÒ&W–V'&÷r#ä4ôÕ$T„Tå4•dR”åDTÄÄ”tTåBD„ôÄôu“Â÷à¢ÆƒãÇ7ãäg&öÒ&VÂ×v÷&ÆBF†öÆöw’FFÂ÷7ããÇ7ãçFò&VÂ6Æ–æ–6Âç7vW'2ãÂ÷7ããÂöƒà¢Ç6Æ74æÖSÒ&†W&ò×7FFVÖVçB#ä‡V––âw2æõF‚f÷VæFF–öâÖöFVÂæBf÷W"Ö–âÖöæRV6÷7—7FVÒ(	BF÷FVB'’"Ã²†÷7—FÂF†öÆöw’FW'FÖVçG2æB‚&VfW&Væ6RÆ&÷&F÷&–W2ãÂ÷à¢Ç6Æ74æÖSÒ&†W&ò×&ööb#ä–æFWVæFVçBâF†öÆöw’ÖÆVB6–æ6R#Âv—F‚÷fW"R–V'2öbF†öÆöw’W‡W'F—6Râ&6¶VB'’•4òSƒ’Ö67&VF—FVBÆ&÷&F÷&–W2Â6Væ–÷"F†öÆöv—7BW‡W'F—6R7&÷72B7V'7V6–ÇF–W2ÂæBf÷VæFF–öâÖÖöFVÂ&ö6‚Fò’ãÂ÷à¢ÆF—b6Æ74æÖSÒ&†W&òÖ7F×&÷r#ãÆ6Æ74æÖSÒ&†W&ò×f–FVòÖÆ–æ²"‡&VcÒ"2÷&WVW7BÖFVÖò#å&WVW7BFVÖòÇ7ãî(i#Â÷7ããÂöãÆ6Æ74æÖSÒ&†W&ò×f–FVòÖÆ–æ²†W&ò×f–FVòÖÆ–æ²×6V6öæF'’"‡&VcÒ"2÷æ÷F‚×ÆFf÷&Ò#å6VRæõF‚Ç7ãî(i#Â÷7ããÂöãÂöF—cà¢ÂöF—cà¢Â÷6V7F–öãà ¢Ç6V7F–öâ6Æ74æÖSÒ'7FG26V7F–öâ×6†VÆÂ#ç·7FG2æÖ‚‡7FB’ÓâÄæ–ÖFVE7FB¶W“×·7FBæÆ&VÇÒ²ââç7FGÒóâ—ÓÂ÷6V7F–öãà ¢Å'FæW$Ö'VVRóà ¢Ç6V7F–öâ6Æ74æÖSÒ&–çG&ò6V7F–öâ×6†VÆÂ"–CÒ'ÆFf÷&Ò#ãÆF—cãÇ6Æ74æÖSÒ&W–V'&÷r&ÇVR#åD„R”åDTÄÄ”tTä4R$T„”äB4Ô%DU"D„ôÄôu“Â÷ãÆƒ#äg&öÒWfW'’66RÃÆ'"óæ&WGFW"æW‡B66RãÂöƒ#ãÂöF—cãÇä2–öæVW"–âFVÆWF†öÆöw’Â‡V––â†2'V–ÇB&VÂ×v÷&ÆBF†öÆöw’FFf÷VæFF–öâF†B'&–æw2&–rFFÂÆv÷&—F†×2æB6Æ–æ–6Â66Væ&–÷2–çFòöæR6öçF–çV÷W6Ç’–×&÷f–ærV6÷7—7FVÒãÂ÷ãÂ÷6V7F–öãà ¢Ç6V7F–öâ6Æ74æÖSÒ&6&–Æ—G’×6V7F–öâ#ãÆF—b6Æ74æÖSÒ'6V7F–öâ×6†VÆÂ#ãÆF—b6Æ74æÖSÒ'6V7F–öâÖ†VF–ær#ãÇ6Æ74æÖSÒ&W–V'&÷r&ÇVR#åt„BtRTä$ÄSÂ÷ãÆƒ#ä'V–ÇBf÷"F†RæW‡BW&Æ'"óæöbF†öÆöw’ãÂöƒ#ãÂöF—cãÆF—b6Æ74æÖSÒ&6&–Æ—G’Öw&–B#ç¶6&–Æ—F–W2æÖ‚‡²F—FÆRÂ6÷’Â–ÖvRÂ¶W’Ò’ÓâÆ'F–6ÆR6Æ74æÖS×²v6&–Æ—G’Ö6&B6&–Æ—G’Òr²¶W—Ò¶W“×·F—FÆWÓãÆ–Ör6Æ74æÖSÒ&6&–Æ—G’Ö–ÖvR"7&3×¶76WEW&Â†–ÖvR—ÒÇCÒ""óãÆF—b6Æ74æÖSÒ&6&–Æ—G’Ö6&BÖ6öçFVçB#ãÆƒ3ç·F—FÆWÓÂöƒ3ãÇç¶6÷—ÓÂ÷ãÂöF—cãÂö'F–6ÆSâ—ÓÂöF—cãÂöF—cãÂ÷6V7F–öãà ¢Ç6V7F–öâ6Æ74æÖSÒ'v÷&¶fÆ÷r6V7F–öâ×6†VÆÂ#ãÆF—b6Æ74æÖSÒ'v÷&¶fÆ÷r×f—7VÂ#ãÅF†öÆöw•f–WvW"óãÂöF—cãÆF—b6Æ74æÖSÒ'v÷&¶fÆ÷rÖ6÷’#ãÇ6Æ74æÖSÒ&W–V'&÷r&ÇVR#åD„RæõF‚ÄDdõ$ÓÂ÷ãÆƒ#åæõFƒ¢f÷VæFF–öâÖöFVÂf÷"F†öÆöw’ãÂöƒ#ãÇåF†Rv÷&ÆBw2f—'7B×VÇF’Ö6Æ–æ–6ÂÖ6VçG&RF†öÆöw’f÷VæFF–öâÖöFVÂ'V–ÇBöâ6†–æW6R÷VÆF–öâFFÂG&–æVBöâ×VÇF’Ö6VçG&R6ö†÷'G27ææ–ær6†–æÂæ÷'F‚ÖW&–6ÂæBWW&÷RãÂ÷ãÇVÃãÆÆ“ãÒ²v†öÆR×6Æ–FR–ÖvW2–âF†R&öGV7F–öâFF&6SÂöÆ“ãÆÆ“ãTÒ²’Ö76—7FVBF–væ÷7F–2u4—3ÂöÆ“ãÆÆ“ã²6æ6W"G—W2FWFV7FVCÂöÆ“ãÂ÷VÃãÆ6Æ74æÖSÒ'FW‡BÖ'WGFöâ"‡&VcÒ"2÷æ÷F‚×ÆFf÷&Ò#äW‡Æ÷&RæõF‚Ç7ãî(i#Â÷7ããÂöãÂöF—cãÂ÷6V7F–öãà ¢Ç6V7F–öâ6Æ74æÖSÒ&6Æ÷6VBÖÆö÷#ãÆF—b6Æ74æÖSÒ'6V7F–öâ×6†VÆÂ#ãÆF—b6Æ74æÖSÒ&6Æ÷6VBÖÆö÷Ö†VF–ær#ãÇ6Æ74æÖSÒ&W–V'&÷r#ä4TÄbÕ$T”ädõ$4”ärT4õ5•5DTÓÂ÷ãÆƒ#ä–çFVÆÆ–vVæ6RF†B¶VW3Æ'"óæÖ÷f–ærf÷'v&BãÂöƒ#ãÇå&VÂ×v÷&ÆB6Æ–æ–6Â&7F–6RÖ¶W2F†RV6÷7—7FVÒ6Ö'FW"v—F‚WfW'’7–6ÆRãÂ÷ãÂöF—cãÆF—b6Æ74æÖSÒ&Æö÷×7FW2#ãÄV6÷7—7FVÔÆö÷óãÂöF—cãÂöF—cãÂ÷6V7F–öãà ¢Ç6V7F–öâ6Æ74æÖSÒ&6Æ–æ–6Â×fÇVR6V7F–öâ×6†VÆÂ"–CÒ'&W6÷W&6W2#ãÆF—b6Æ74æÖSÒ&6Æ–æ–6Â×fÇVRÖ6÷’#ãÇ6Æ74æÖSÒ&W–V'&÷r&ÇVR#å$õdTâ”â$TÂÕtõ$ÄB$5D”4SÂ÷ãÆƒ#äÖ÷&R–çFVÆÆ–vVæ6RãÆ'"óäÖ÷&RfÇVR–âWfW'’F–væ÷6—2ãÂöƒ#ãÇä2â–çFVÆÆ–vVçBF†öÆöw’76—7FçBÂ‡V––â’†2&VVâ&÷fVâ7&÷72Ö–ÆÆ–öç2öb&VÂ×v÷&ÆB66W2Fò†VÇ†VÇF†6&RFV×2v÷&²&WGFW"ãÂ÷ãÂöF—cãÆF—b6Æ74æÖSÒ'fÇVRÖw&–B#ãÆ'F–6ÆR6Æ74æÖSÒ'fÇVRÖVff–6–Væ7’#ãÆF—b6Æ74æÖSÒ'fÇVR×f—7VÂ"&–Ö†–FFVãÒ'G'VR#ãÆ“ãÂö“ãÆ“ãÂö“ãÆ“ãÂö“ãÂöF—cãÆF—cãÇ7ãã+r4Ä”ä”4ÂdÄõsÂ÷7ããÆƒ3äVæ†æ6RVff–6–Væ7“Âöƒ3ãÇå7W÷'BF†öÆöv—7G2v—F‚F–ÖVÇ’’Ö76—7FVB&Wf–WræB7G&VÖÆ–æVBv÷&¶fÆ÷w2ãÂ÷ãÂöF—cãÆ"&–Ö†–FFVãÒ'G'VR#î(isÂö#ãÂö'F–6ÆSãÆ'F–6ÆR6Æ74æÖSÒ'fÇVRÖ6÷7B#ãÆF—b6Æ74æÖSÒ'fÇVR×f—7VÂ"&–Ö†–FFVãÒ'G'VR#ãÆ“ãÂö“ãÆ“ãÂö“ãÆ“ãÂö“ãÂöF—cãÆF—cãÇ7ãã"+rõU$D”ôå3Â÷7ããÆƒ3å&VGV6R6÷7G3Âöƒ3ãÇä†VÇÆ&÷&F÷&–W2÷F–Ö—¦R÷W&F–öç2F‡&÷Vv‚6öææV7FVBF–v—FÂF†öÆöw’ãÂ÷ãÂöF—cãÆ"&–Ö†–FFVãÒ'G'VR#î(isÂö#ãÂö'F–6ÆSãÆ'F–6ÆR6Æ74æÖSÒ'fÇVR×VÆ—G’#ãÆF—b6Æ74æÖSÒ'fÇVR×f—7VÂ"&–Ö†–FFVãÒ'G'VR#ãÆ“ãÂö“ãÆ“ãÂö“ãÆ“ãÂö“ãÂöF—cãÆF—cãÇ7ãã2+rD”täõ5D”2TÄ•E“Â÷7ããÆƒ3ä–×&÷fRVÆ—G“Âöƒ3ãÇä'&–ær6öç6—7FVçB–çFVÆÆ–vVæ6RFòÖ÷&RF–væ÷7F–2FV6—6–öç2Âv†W&WfW"F–VçG2&RãÂ÷ãÂöF—cãÆ"&–Ö†–FFVãÒ'G'VR#î(isÂö#ãÂö'F–6ÆSãÂöF—cãÂ÷6V7F–öãà ¢Ç6V7F–öâ6Æ74æÖSÒ'6öÇWF–öç2×6V7F–öâ"–CÒ'6öÇWF–öç2#ãÆF—b6Æ74æÖSÒ'6V7F–öâ×6†VÆÂ#ãÆF—b6Æ74æÖSÒ'6öÇWF–öç2Ö–çG&ò#ãÆF—cãÇ6Æ74æÖSÒ&W–V'&÷r#å4ôÅUD”ôå2DU4”täTB$õTäB”õSÂ÷ãÆƒ#äöæR6öææV7FVBV6÷7—7FVÒãÆ'"óä'V–ÇBf÷"F†öÆöw’ãÂöƒ#ãÂöF—cãÆF—b6Æ74æÖSÒ'6öÇWF–öç2×7VÖÖ'’#ãÇä’Ç7ãâ³Â÷7ãâ•2Ç7ãâ³Â÷7ãâ†&Gv&RÇ7ãâ³Â÷7ãâ6W'f–6W3Â÷ãÇ6ÖÆÃäf÷W"Ö–âÖöæR–çFVÆÆ–vVçBF†öÆöw’6öÇWF–öãÂ÷6ÖÆÃãÂöF—cãÂöF—cãÆF—b6Æ74æÖSÒ'6öÇWF–öâÖÖöGVÆW2#ç·6öÇWF–öäÖöGVÆW2æÖ‚†—FVÒÂ–æFW‚’ÓâÅ6öÇWF–öäÖöGVÆR—FVÓ×¶—FV×Ò–æFWƒ×¶–æFW‡Ò¶W“×¶—FVÒçF—FÆWÒóâ—ÓÂöF—cãÂöF—cãÂ÷6V7F–öãà ¢Ç6V7F–öâ6Æ74æÖSÒ&6ö×ç’Ö–çG&ò"–CÒ&6ö×ç’#ãÆF—b6Æ74æÖSÒ'6V7F–öâ×6†VÆÂ#ãÆF—cãÇ6Æ74æÖSÒ&W–V'&÷r&ÇVR#ä$õUB…T””â„TÅD„4$SÂ÷ãÆƒ#ävÆö&ÂF†öÆöw’'FæW"Â'V–ÇBöâ6Æ–æ–6Â&7F–6RãÂöƒ#ãÂöF—cãÆF—b6Æ74æÖSÒ&6ö×ç’Ö–çG&òÖ6÷’#ãÇä‡V––â—2ÆVF–ærF–v—FÂÖ–çFVÆÆ–vVçBF†öÆöw’6öÇWF–öç2&÷f–FW"Â'V–ÇBöâ÷W"&÷&–WF'’æõF‚F†öÆöw’f÷VæFF–öâÖöFVÂæBâW‡FVç6—fR6Æ–æ–6ÂÆ&÷&F÷'’6W'f–6RæWGv÷&²6W'f–ær÷fW"Ã†VÇF†6&R&÷f–FW'27&÷7236†–æW6R&÷f–æ6W2ãÂ÷ãÆ6Æ74æÖSÒ'FW‡BÖ'WGFöâ"‡&VcÒ"66öçF7B#ä6öææV7Bv—F‚‡V––âÇ7ãî(i#Â÷7ããÂöãÂöF—cãÂöF—cãÂ÷6V7F–öãà ¢Ç6V7F–öâ6Æ74æÖSÒ&6†–æÖ6÷fW&vR6V7F–öâ×6†VÆÂ"–CÒ&6÷fW&vR#ãÆF—b6Æ74æÖSÒ&6÷fW&vRÖ6÷’#ãÇ6Æ74æÖSÒ&W–V'&÷r&ÇVR#ä4„”ä4õdU$tSÂ÷ãÆƒ#äÆö6Â&V6‚ãÆ'"óä6öææV7FVBW‡W'F—6RãÂöƒ#ãÇä‡V––â6W'fW2†VÇF†6&R'FæW'27&÷723&÷f–æ6W2æB&Vv–öç2–â6†–æâ÷W"æWGv÷&²–æ6ÇVFW2‚&÷f–æ6–Â&VfW&Væ6RÆ&÷&F÷&–W2æBÖ÷&RF†âs¦ö–çFÇ’W7F&Æ—6†VB†÷7—FÂF†öÆöw’FW'FÖVçG2ãÂ÷ãÆ6Æ74æÖSÒ'FW‡BÖ'WGFöâ"‡&VcÒ"66öçF7B#ä6öææV7Bv—F‚‡V––âÇ7ãî(i#Â÷7ããÂöãÂöF—cãÆF—b6Æ74æÖSÒ&6÷fW&vR×æVÂ"&–ÖÆ&VÃÒ$6†–æ6÷fW&vRæB6W'f–6R6—FRF—7G&–'WF–öâf—7VÆ—¦F–öâ#ãÆF—b6Æ74æÖSÒ&6÷fW&vRÖÖ#ãÆF—b6Æ74æÖSÒ&Ö×7FvR#ãÆ–Ör7&3×¶76WEW&Â‚v–ÖvW2ö6†–æÖÖÖÖ–æ–ÖÂçærr—ÒÇCÒ$Æ–æRÖöb6†–æ–æ6ÇVF–ærF†R6÷WF‚6†–æ6V—6ÆæG2"óãÆF—b6Æ74æÖSÒ&Ö&¶W"ÖÆ–W"6÷fW&vRÖÆ–W"#ç¶6÷fW&vTÖ&¶W'2æÖ‚…¶æÖRÂÆVgBÂF÷ÂÂÆ&VÅ‚ÂÆ&VÅ•Ò’ÓâÇ7â6Æ74æÖSÒ&6÷fW&vR×–â6÷fW&vR"7G–ÆS×·²ÆVgC¢G¶ÆVgGÒVÂF÷¢G·F÷ÒVÂrÒÖÆ&VÂ×‚s¢G¶Æ&VÅ‡×†ÂrÒÖÆ&VÂ×’s¢G¶Æ&VÅ—×†×ÒFFÖÆ&VÃ×¶æÖWÒF—FÆS×¶æÖWÒ&–ÖÆ&VÃ×¶æÖWÒ¶W“×¶æÖWÓãÂ÷7ãâ—ÓÂöF—cãÆF—b6Æ74æÖSÒ&Ö&¶W"ÖÆ–W"6W'f–6RÖÆ–W"#ç¶6÷fW&vTÖ&¶W'2æf–ÇFW"‚…²ÂÂÂG—UÒ’ÓâG—RÓÓÒw6W'f–6Rr’æÖ‚…¶æÖRÂÆVgBÂF÷ÂÂÆ&VÅ‚ÂÆ&VÅ•Ò’ÓâÇ7â6Æ74æÖSÒ&6÷fW&vR×–â6W'f–6R"7G–ÆS×·²ÆVgC¢G¶ÆVgGÒVÂF÷¢G·F÷ÒVÂrÒÖÆ&VÂ×‚s¢G¶Æ&VÅ‡×†ÂrÒÖÆ&VÂ×’s¢G¶Æ&VÅ—×†×ÒFFÖÆ&VÃ×¶æÖWÒF—FÆS×¶æÖWÒ&–ÖÆ&VÃ×¶æÖWÒ¶W“×¶æÖWÓãÂ÷7ãâ—ÓÂöF—cãÂöF—cãÂöF—cãÆ6–FR6Æ74æÖSÒ&6÷fW&vR×&Vv–öâÖÆ—7B"&–ÖÆ—fSÒ'öÆ—FR#ãÆF—b6Æ74æÖSÒ&6÷fW&vRÖ–æfò6÷fW&vRÖ–æfò×&Vv–öç2#ãÇ7ãä%U4”äU524õdU$tSÂ÷7ããÆ#ã3Âö#ãÇå&÷f–æ6W2æB&Vv–öç26W'fVB7&÷726†–æãÂ÷ãÂöF—cãÆF—b6Æ74æÖSÒ&6÷fW&vRÖ–æfò6÷fW&vRÖ–æfò×6—FW2#ãÇ7ãå$õd”ä4”ÂÄ$õ$Dõ$”U3Â÷7ããÆ#ãƒÂö#ãÇå&VfW&Væ6RÆ&÷&F÷&–W27W÷'F–ærF†R6W'f–6RæWGv÷&³£Â÷ãÆF—b6Æ74æÖSÒ'&Vv–öâÖæÖW2#ç¶Æ&÷&F÷'•&Vv–öç2æÖ‡&Vv–öâÓâÆVÒ¶W“×·&Vv–öçÓç·&Vv–öçÓÂöVÓâ—ÓÂöF—cãÂöF—cãÂö6–FSãÆF—b6Æ74æÖSÒ&6÷fW&vRÖÆVvVæB#ãÇ7â6Æ74æÖSÒ&6÷fW&vR×f–WrÖÆ&VÂ#ãÆ’6Æ74æÖSÒ&6÷fW&vRÖF÷B#ãÂö“å&÷f–æ6–ÂæB&Vv–öæÂ6÷fW&vSÂ÷7ããÇ7â6Æ74æÖSÒ'6W'f–6R×f–WrÖÆ&VÂ#ãÆ’6Æ74æÖSÒ'6W'f–6RÖF÷B#ãÂö“äÆ&÷&F÷'’F—7G&–'WF–öãÂ÷7ããÂöF—cãÆF—b6Æ74æÖSÒ&6÷fW&vR×F÷FÇ2#ãÇ7â6Æ74æÖSÒ&6÷fW&vR×f–WrÖÆ&VÂ#ãÆ#ã3Âö#â&Vv–öç26÷fW&VCÂ÷7ããÇ7â6Æ74æÖSÒ'6W'f–6R×f–WrÖÆ&VÂ#ãÆ#ãƒÂö#â&÷f–æ6–ÂÆ&÷&F÷&–W3Â÷7ããÂöF—cãÂöF—cãÂ÷6V7F–öãà ¢Ç6V7F–öâ6Æ74æÖSÒ&FVÖò×6V7F–öâ"–CÒ&FVÖò#ãÆF—b6Æ74æÖSÒ'6V7F–öâ×6†VÆÂFVÖòÖ–ææW"#ãÆF—cãÇ6Æ74æÖSÒ&W–V'&÷r#äÄUBu24„Rt„Bu2äU…CÂ÷ãÆƒ#å&VG’FòG&ç6f÷&ÓÆ'"óç–÷W"F†öÆöw’v÷&¶fÆ÷sóÂöƒ#ãÂöF—cãÆF—cãÇåFÆ²v—F‚÷W"FVÒ&÷WB–÷W"6Æ–æ–6ÂÂ÷W&F–öæÂæBFWÆ÷–ÖVçBæVVG2ãÂ÷ãÆ6Æ74æÖSÒ&FVÖòÖ'WGFöâÆ–v‡B"‡&VcÒ"2÷&WVW7BÖFVÖò#å&WVW7BFVÖòÇ7ãî(i#Â÷7ããÂöãÂöF—cãÂöF—cãÂ÷6V7F–öãà¢ÂöÖ–ãà¢Æfö÷FW"–CÒ&6öçF7B#ãÆF—b6Æ74æÖSÒ'6V7F–öâ×6†VÆÂfö÷FW"Öw&–B#ãÆF—cãÄÆövòf&–çCÒ&fö÷FW""óãÇä’×÷vW&VBF†öÆöw’6öÇWF–öç2f÷"Ö÷&R6öææV7FVBvÆö&Â†VÇF†6&RgWGW&RãÂ÷ãÂöF—cãÆF—cãÆƒCäW‡Æ÷&SÂöƒCãÆ‡&VcÒ"2ö&÷WB×W2#ä6ö×ç“ÂöãÆ‡&VcÒ"2÷æ÷F‚×ÆFf÷&Ò#åæõFƒÂöãÆ‡&VcÒ"2ögVÆÂ×7F6²ÖV6÷7—7FVÒ#å6öÇWF–öç3ÂöãÂöF—cãÆF—cãÆƒCä6öææV7CÂöƒCãÆ‡&VcÒ"2övÆö&ÂÖöff–6W2#ävÆö&Âöff–6W3ÂöãÆ‡&VcÒ"2÷&WVW7BÖFVÖò#å&WVW7BFVÖóÂöãÆ‡&VcÒ&Ö–ÇFó¦–çFÄ‡V––æÆ"æ6öÒ#ä6öçF7BW3ÂöãÂöF—cãÆF—cãÆƒCäÆVvÃÂöƒCãÆ‡&VcÒ"7F÷#å&—f7’öÆ–7“ÂöãÆ‡&VcÒ"7F÷#åFW&×2öbW6SÂöãÆ‡&VcÒ"7F÷#å&VwVÆF÷'’6ö×Æ–æ6SÂöãÂöF—cãÂöF—cãÆF—b6Æ74æÖSÒ&fö÷FW"Ö&6R6V7F–öâ×6†VÆÂ#ãÇ7ãì*’##b‡V––â†VÇF†6&Rw&÷WâÆÂ&–v‡G2&W6W'fVBãÂ÷7ããÇ7ãäwVæw¦†÷R+rvÆö&ÃÂ÷7ããÂöF—cãÂöfö÷FW#à¢ÂöF—cà§Ğ ¦7&VFU&ö÷B†Fö7VÖVçBævWDVÆVÖVçD'”–B‚w&ö÷Br’’ç&VæFW"ƒÄóâ 