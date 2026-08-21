import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import './diagnostic-hologram.css'

const organs = [
  { id: 'thyroid', label: 'Thyroid', detail: 'Thyroid cytopathology and histopathology' },
  { id: 'lung', label: 'Lung', detail: 'Thoracic pathology' },
  { id: 'breast', label: 'Breast', detail: 'Breast pathology and IHC' },
  { id: 'oesophagus', label: 'Oesophagus', detail: 'Upper gastrointestinal pathology' },
  { id: 'stomach', label: 'Stomach', detail: 'Gastric pathology' },
  { id: 'colorectum', label: 'Colorectum', detail: 'Colorectal pathology' },
  { id: 'cervix', label: 'Cervix', detail: 'Cervical cytopathology and histopathology' },
]

const bodyMaterial = () => new THREE.MeshPhysicalMaterial({
  color: 0xcdeffa,
  emissive: 0x0b77a6,
  emissiveIntensity: 0.45,
  roughness: 0.22,
  metalness: 0.45,
  transparent: true,
  opacity: 0.12,
  depthWrite: false,
  side: THREE.DoubleSide,
})

function addBodyPart(group, geometry, position, rotation = [0, 0, 0], scale = [1, 1, 1]) {
  const mesh = new THREE.Mesh(geometry, bodyMaterial())
  mesh.position.set(...position)
  mesh.rotation.set(...rotation)
  mesh.scale.set(...scale)
  group.add(mesh)

  const outline = new THREE.LineSegments(
    new THREE.EdgesGeometry(geometry, 22),
    new THREE.LineBasicMaterial({ color: 0x65d9ff, transparent: true, opacity: 0.52 }),
  )
  outline.position.copy(mesh.position)
  outline.rotation.copy(mesh.rotation)
  outline.scale.copy(mesh.scale)
  group.add(outline)
}

function createHumanBody() {
  const body = new THREE.Group()
  addBodyPart(body, new THREE.SphereGeometry(0.52, 28, 20), [0, 4.62, 0], [0, 0, 0], [0.88, 1.08, 0.82])
  addBodyPart(body, new THREE.CylinderGeometry(0.24, 0.29, 0.48, 20), [0, 4.04, 0])
  addBodyPart(body, new THREE.CapsuleGeometry(0.78, 1.72, 12, 24), [0, 2.78, 0], [0, 0, 0], [1.02, 1, 0.62])
  addBodyPart(body, new THREE.SphereGeometry(0.82, 28, 18), [0, 1.36, 0], [0, 0, 0], [1.06, 0.63, 0.68])

  const upperArm = new THREE.CapsuleGeometry(0.2, 1.25, 8, 16)
  const forearm = new THREE.CapsuleGeometry(0.17, 1.1, 8, 16)
  addBodyPart(body, upperArm, [-1.02, 2.92, 0], [0, 0, -0.12])
  addBodyPart(body, upperArm, [1.02, 2.92, 0], [0, 0, 0.12])
  addBodyPart(body, forearm, [-1.17, 1.73, 0], [0, 0, -0.08])
  addBodyPart(body, forearm, [1.17, 1.73, 0], [0, 0, 0.08])

  const thigh = new THREE.CapsuleGeometry(0.27, 1.42, 8, 18)
  const calf = new THREE.CapsuleGeometry(0.2, 1.35, 8, 18)
  addBodyPart(body, thigh, [-0.43, 0.05, 0], [0, 0, -0.03])
  addBodyPart(body, thigh, [0.43, 0.05, 0], [0, 0, 0.03])
  addBodyPart(body, calf, [-0.45, -1.37, 0], [0, 0, 0.025])
  addBodyPart(body, calf, [0.45, -1.37, 0], [0, 0, -0.025])
  addBodyPart(body, new THREE.SphereGeometry(0.24, 18, 12), [-0.45, -2.2, 0.08], [0, 0, 0], [1, 0.45, 1.55])
  addBodyPart(body, new THREE.SphereGeometry(0.24, 18, 12), [0.45, -2.2, 0.08], [0, 0, 0], [1, 0.45, 1.55])
  return body
}

function organMaterial() {
  return new THREE.MeshPhysicalMaterial({
    color: 0xbcebf4,
    emissive: 0x159dca,
    emissiveIntensity: 0.75,
    roughness: 0.28,
    metalness: 0.22,
    transparent: true,
    opacity: 0.88,
  })
}

function tagOrgan(root, id, targets, materials) {
  root.traverse((child) => {
    if (!child.isMesh) return
    child.userData.organId = id
    child.material = organMaterial()
    targets.push(child)
    materials.push(child.material)
  })
}

function createOrgans() {
  const root = new THREE.Group()
  const targets = []
  const materials = []
  const groups = {}

  const add = (id, object) => {
    groups[id] = object
    tagOrgan(object, id, targets, materials)
    root.add(object)
  }

  const thyroid = new THREE.Group()
  const thyroidLobe = new THREE.SphereGeometry(0.13, 18, 12)
  const leftThyroid = new THREE.Mesh(thyroidLobe)
  const rightThyroid = new THREE.Mesh(thyroidLobe)
  leftThyroid.position.x = -0.14
  rightThyroid.position.x = 0.14
  thyroid.add(leftThyroid, rightThyroid)
  const thyroidBridge = new THREE.Mesh(new THREE.CapsuleGeometry(0.055, 0.18, 6, 12))
  thyroidBridge.rotation.z = Math.PI / 2
  thyroid.add(thyroidBridge)
  thyroid.position.set(0, 4.03, 0.33)
  add('thyroid', thyroid)

  const lungs = new THREE.Group()
  const lungShape = new THREE.SphereGeometry(0.42, 24, 18)
  const leftLung = new THREE.Mesh(lungShape)
  const rightLung = new THREE.Mesh(lungShape)
  leftLung.position.set(-0.43, 0, 0)
  rightLung.position.set(0.43, 0, 0)
  leftLung.scale.set(0.82, 1.4, 0.72)
  rightLung.scale.set(0.82, 1.4, 0.72)
  lungs.add(leftLung, rightLung)
  lungs.position.set(0, 3.25, 0.1)
  add('lung', lungs)

  const breasts = new THREE.Group()
  const breastShape = new THREE.SphereGeometry(0.22, 20, 14)
  const leftBreast = new THREE.Mesh(breastShape)
  const rightBreast = new THREE.Mesh(breastShape)
  leftBreast.position.x = -0.45
  rightBreast.position.x = 0.45
  leftBreast.scale.z = 0.62
  rightBreast.scale.z = 0.62
  breasts.add(leftBreast, rightBreast)
  breasts.position.set(0, 3.15, 0.56)
  add('breast', breasts)

  const oesophagus = new THREE.Group()
  const oesophagusMesh = new THREE.Mesh(new THREE.CapsuleGeometry(0.07, 1.18, 8, 14))
  oesophagusMesh.position.set(0, 3.08, 0.38)
  oesophagus.add(oesophagusMesh)
  add('oesophagus', oesophagus)

  const stomach = new THREE.Group()
  const stomachMesh = new THREE.Mesh(new THREE.CapsuleGeometry(0.22, 0.45, 10, 18))
  stomachMesh.rotation.z = -0.48
  stomachMesh.scale.set(1.05, 1, 0.72)
  stomachMesh.position.set(0.32, 2.28, 0.4)
  stomach.add(stomachMesh)
  add('stomach', stomach)

  const colon = new THREE.Group()
  const colonCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.53, 1.55, 0.37),
    new THREE.Vector3(-0.53, 2.12, 0.37),
    new THREE.Vector3(0, 2.25, 0.37),
    new THREE.Vector3(0.53, 2.12, 0.37),
    new THREE.Vector3(0.53, 1.55, 0.37),
    new THREE.Vector3(0.25, 1.34, 0.37),
    new THREE.Vector3(-0.25, 1.34, 0.37),
  ], true, 'centripetal')
  colon.add(new THREE.Mesh(new THREE.TubeGeometry(colonCurve, 72, 0.075, 10, true)))
  const rectum = new THREE.Mesh(new THREE.CapsuleGeometry(0.065, 0.34, 7, 12))
  rectum.position.set(0, 1.13, 0.31)
  colon.add(rectum)
  add('colorectum', colon)

  const cervix = new THREE.Group()
  const cervixMesh = new THREE.Mesh(new THREE.CapsuleGeometry(0.12, 0.18, 8, 14))
  cervixMesh.position.set(0, 1.02, 0.43)
  cervix.add(cervixMesh)
  add('cervix', cervix)

  return { root, targets, groups, materials }
}

function HologramCanvas({ activeOrgan, onHover, onSelect, softened }) {
  const mountRef = useRef(null)
  const activeRef = useRef(activeOrgan)
  const hoverRef = useRef(onHover)
  const selectRef = useRef(onSelect)

  useEffect(() => { activeRef.current = activeOrgan }, [activeOrgan])
  useEffect(() => { hoverRef.current = onHover }, [onHover])
  useEffect(() => { selectRef.current = onSelect }, [onSelect])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(31, 1, 0.1, 100)
    camera.position.set(0, 2.3, 15.8)
    camera.lookAt(0, 1.25, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mount.appendChild(renderer.domElement)

    scene.add(new THREE.HemisphereLight(0xc9f5ff, 0x082e55, 2.1))
    const frontLight = new THREE.PointLight(0x8be6ff, 28, 22)
    frontLight.position.set(2.5, 4.5, 7)
    scene.add(frontLight)
    const rimLight = new THREE.PointLight(0xffffff, 22, 18)
    rimLight.position.set(-4, 2, -2)
    scene.add(rimLight)

    const figure = new THREE.Group()
    figure.add(createHumanBody())
    const organData = createOrgans()
    figure.add(organData.root)
    figure.position.y = 0.35
    scene.add(figure)

    const floor = new THREE.Mesh(
      new THREE.RingGeometry(1.5, 1.56, 96),
      new THREE.MeshBasicMaterial({ color: 0x3ec6ff, transparent: true, opacity: 0.38, side: THREE.DoubleSide }),
    )
    floor.rotation.x = Math.PI / 2
    floor.position.y = -1.88
    scene.add(floor)

    const scanRings = [0.82, 1.05, 1.28].map((radius, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.008, 5, 80),
        new THREE.MeshBasicMaterial({ color: index === 1 ? 0xeafcff : 0x52ceff, transparent: true, opacity: 0.27 }),
      )
      ring.rotation.x = Math.PI / 2
      ring.position.y = 0.1 + index * 1.55
      figure.add(ring)
      return ring
    })

    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2(4, 4)
    let pointedOrgan = null
    let targetRotation = 0
    const orange = new THREE.Color(0xff8a2b)
    const cyan = new THREE.Color(0xbcebf4)
    const orangeGlow = new THREE.Color(0xe85f00)
    const cyanGlow = new THREE.Color(0x159dca)

    const updateMaterials = () => {
      organData.targets.forEach((mesh) => {
        const highlighted = mesh.userData.organId === activeRef.current
        mesh.material.color.copy(highlighted ? orange : cyan)
        mesh.material.emissive.copy(highlighted ? orangeGlow : cyanGlow)
        mesh.material.emissiveIntensity = highlighted ? 1.5 : 0.75
      })
    }

    const setPointer = (event) => {
      const bounds = renderer.domElement.getBoundingClientRect()
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
      pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1
      targetRotation = pointer.x * 0.07
      raycaster.setFromCamera(pointer, camera)
      const hit = raycaster.intersectObjects(organData.targets, false)[0]
      const nextOrgan = hit?.object.userData.organId || null
      if (nextOrgan !== pointedOrgan) {
        pointedOrgan = nextOrgan
        renderer.domElement.style.cursor = nextOrgan ? 'pointer' : 'default'
        hoverRef.current(nextOrgan)
      }
    }

    const chooseOrgan = () => {
      if (pointedOrgan) selectRef.current(pointedOrgan)
    }

    const handlePointerDown = (event) => {
      setPointer(event)
      chooseOrgan()
    }

    const clearPointer = () => {
      pointedOrgan = null
      pointer.set(4, 4)
      targetRotation = 0
      renderer.domElement.style.cursor = 'default'
      hoverRef.current(null)
    }

    renderer.domElement.addEventListener('pointermove', setPointer)
    renderer.domElement.addEventListener('pointerdown', handlePointerDown)
    renderer.domElement.addEventListener('pointerleave', clearPointer)

    const resize = () => {
      const width = Math.max(1, mount.clientWidth)
      const height = Math.max(1, mount.clientHeight)
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    const observer = new ResizeObserver(resize)
    observer.observe(mount)
    resize()

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const startTime = performance.now()
    let frame
    const render = () => {
      const elapsed = (performance.now() - startTime) / 1000
      figure.rotation.y += (targetRotation - figure.rotation.y) * 0.035
      if (!reduceMotion) {
        figure.position.y = 0.35 + Math.sin(elapsed * 0.72) * 0.035
        scanRings.forEach((ring, index) => {
          ring.material.opacity = 0.18 + Math.sin(elapsed * 1.05 + index) * 0.08
        })
      }
      updateMaterials()
      renderer.render(scene, camera)
      frame = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      renderer.domElement.removeEventListener('pointermove', setPointer)
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown)
      renderer.domElement.removeEventListener('pointerleave', clearPointer)
      scene.traverse((object) => {
        object.geometry?.dispose()
        if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose())
        else object.material?.dispose()
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={mountRef} className={`hologram-canvas${softened ? ' is-softened' : ''}`} aria-hidden="true" />
}

export default function DiagnosticHologram() {
  const [hoveredOrgan, setHoveredOrgan] = useState(null)
  const [selectedOrgan, setSelectedOrgan] = useState(null)
  const activeOrgan = hoveredOrgan || selectedOrgan
  const selected = organs.find((organ) => organ.id === selectedOrgan)

  useEffect(() => {
    if (!selectedOrgan) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelectedOrgan(null)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [selectedOrgan])

  return <section className={`diagnostic-hologram${selectedOrgan ? ' has-video' : ''}`} aria-labelledby="diagnostic-hologram-title">
    <div className="diagnostic-hologram-inner section-shell">
      <div className="diagnostic-hologram-copy">
        <p className="eyebrow">AI ACROSS THE BODY</p>
        <h2 id="diagnostic-hologram-title">One foundation.<br />Multiple organs.</h2>
        <p>Explore common cancer pathways supported by Huayin's diagnostic AI portfolio.</p>
        <div className="organ-index" aria-label="Cancer pathology focus areas">
          {organs.map((organ, index) => <button
            type="button"
            key={organ.id}
            className={activeOrgan === organ.id ? 'is-active' : ''}
            onMouseEnter={() => setHoveredOrgan(organ.id)}
            onMouseLeave={() => setHoveredOrgan(null)}
            onFocus={() => setHoveredOrgan(organ.id)}
            onBlur={() => setHoveredOrgan(null)}
            onClick={() => setSelectedOrgan(organ.id)}
          ><span>{String(index + 1).padStart(2, '0')}</span>{organ.label}</button>)}
        </div>
      </div>
      <div className="diagnostic-hologram-stage">
        <div className="hologram-axis" aria-hidden="true"><span></span><span></span><span></span></div>
        <HologramCanvas activeOrgan={activeOrgan} onHover={setHoveredOrgan} onSelect={setSelectedOrgan} softened={Boolean(selectedOrgan)} />
        <div className="active-organ-readout" aria-live="polite">
          <span>{activeOrgan ? organs.find((organ) => organ.id === activeOrgan)?.label : 'PanoPath'}</span>
          <small>{activeOrgan ? organs.find((organ) => organ.id === activeOrgan)?.detail : 'Multi-organ diagnostic intelligence'}</small>
        </div>
      </div>
    </div>

    {selected && <div className="organ-video-layer" role="dialog" aria-modal="true" aria-labelledby="organ-video-title" onMouseDown={(event) => {
      if (event.target === event.currentTarget) setSelectedOrgan(null)
    }}>
      <div className="organ-video-dialog">
        <header><div><span>DIAGNOSTIC AI</span><h3 id="organ-video-title">{selected.label}</h3></div><button type="button" onClick={() => setSelectedOrgan(null)} aria-label="Close video">X</button></header>
        <video autoPlay controls playsInline><source src={`${import.meta.env.BASE_URL}videos/homepage-hero-latest.mp4`} type="video/mp4" /></video>
        <p>{selected.detail}</p>
      </div>
    </div>}
  </section>
}

