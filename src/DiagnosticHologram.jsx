import { useEffect, useRef, useState } from 'react'
import './diagnostic-hologram.css'

const organs = [
  { id: 'thyroid', label: 'Thyroid', detail: 'Thyroid cytopathology and histopathology', side: 'left', position: 'high', hotspot: [50, 20] },
  { id: 'lung', label: 'Lung', detail: 'Thoracic pathology', side: 'left', position: 'upper', hotspot: [45, 31] },
  { id: 'breast', label: 'Breast', detail: 'Breast pathology and IHC', side: 'left', position: 'middle', hotspot: [57, 34] },
  { id: 'stomach', label: 'Stomach', detail: 'Gastric pathology', side: 'left', position: 'lower', hotspot: [54, 44] },
  { id: 'oesophagus', label: 'Oesophagus', detail: 'Upper gastrointestinal pathology', side: 'right', position: 'high', hotspot: [50, 32] },
  { id: 'colorectum', label: 'Colorectum', detail: 'Colorectal pathology', side: 'right', position: 'middle', hotspot: [50, 53] },
  { id: 'cervix', label: 'Cervix', detail: 'Cervical cytopathology and histopathology', side: 'right', position: 'lower', hotspot: [50, 61] },
]

function OrganLabel({ organ, index, active, onHover, onSelect }) {
  return <button
    type="button"
    className={`hologram-label hologram-label--${organ.side} hologram-label--${organ.position}${active ? ' is-active' : ''}`}
    onMouseEnter={() => onHover(organ.id)}
    onMouseLeave={() => onHover(null)}
    onFocus={() => onHover(organ.id)}
    onBlur={() => onHover(null)}
    onClick={() => onSelect(organ.id)}
  >
    <span className="hologram-label-number">{String(index + 1).padStart(2, '0')}</span>
    <span className="hologram-label-name">{organ.label}</span>
    <span className="hologram-label-action">VIEW</span>
  </button>
}

export default function DiagnosticHologram() {
  const [hoveredOrgan, setHoveredOrgan] = useState(null)
  const [selectedOrgan, setSelectedOrgan] = useState(null)
  const closeButtonRef = useRef(null)
  const activeOrgan = hoveredOrgan || selectedOrgan
  const active = organs.find((organ) => organ.id === activeOrgan)
  const selected = organs.find((organ) => organ.id === selectedOrgan)

  useEffect(() => {
    if (!selectedOrgan) return undefined
    closeButtonRef.current?.focus()
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelectedOrgan(null)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [selectedOrgan])

  return <section className={`diagnostic-hologram${selectedOrgan ? ' has-video' : ''}`} aria-labelledby="diagnostic-hologram-title">
    <div className="diagnostic-hologram-heading section-shell">
      <p className="eyebrow">AI ACROSS THE BODY</p>
      <h2 id="diagnostic-hologram-title">One foundation. Multiple organs.</h2>
      <p>Explore common cancer pathways supported by Huayin's diagnostic AI portfolio.</p>
    </div>

    <div className="diagnostic-hologram-explorer section-shell">
      <div className="hologram-panel" aria-label="Interactive diagnostic AI organ explorer">
        <div className="hologram-scanlines" aria-hidden="true" />
        <div className="hologram-body-wrap">
          <img
            className="hologram-body"
            src={`${import.meta.env.BASE_URL}images/diagnostic-hologram-human-light-v3.png`}
            alt="Full-body medical hologram showing internal anatomy"
          />
          <span
            className={`hologram-hotspot${active ? ' is-active' : ''}`}
            style={active ? { '--hotspot-x': `${active.hotspot[0]}%`, '--hotspot-y': `${active.hotspot[1]}%` } : undefined}
            aria-hidden="true"
          />
        </div>

        <div className="hologram-labels">
          {organs.map((organ, index) => <OrganLabel
            key={organ.id}
            organ={organ}
            index={index}
            active={activeOrgan === organ.id}
            onHover={setHoveredOrgan}
            onSelect={setSelectedOrgan}
          />)}
        </div>

        <div className="hologram-readout" aria-live="polite">
          <span>{active?.label || 'PanoPath'}</span>
          <small>{active?.detail || 'Select an organ focus area'}</small>
        </div>
      </div>
    </div>

    {selected && <div className="organ-video-layer" role="dialog" aria-modal="true" aria-labelledby="organ-video-title" onMouseDown={(event) => {
      if (event.target === event.currentTarget) setSelectedOrgan(null)
    }}>
      <div className="organ-video-dialog">
        <header>
          <div><span>DIAGNOSTIC AI</span><h3 id="organ-video-title">{selected.label}</h3></div>
          <button ref={closeButtonRef} type="button" onClick={() => setSelectedOrgan(null)} aria-label="Close video">X</button>
        </header>
        <video autoPlay controls playsInline><source src={`${import.meta.env.BASE_URL}videos/diagnostic-ai-placeholder-web.mp4`} type="video/mp4" /></video>
        <p>{selected.detail}</p>
      </div>
    </div>}
  </section>
}

