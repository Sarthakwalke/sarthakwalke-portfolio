import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

type MechanicalSceneProps = {
  reducedMotion: boolean
}

const supportsWebGL = () => {
  const canvas = document.createElement('canvas')
  return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
}

export function MechanicalScene({ reducedMotion }: MechanicalSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const webglAvailable = useMemo(() => supportsWebGL(), [])
  const [hasError, setHasError] = useState(!webglAvailable)
  const [isLoading, setIsLoading] = useState(webglAvailable)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) {
      return
    }

    if (!webglAvailable) {
      return
    }

    let frameId = 0
    let readyFrameId = 0
    const cleanups: Array<() => void> = []

    try {
      const scene = new THREE.Scene()
      scene.background = null

      const camera = new THREE.PerspectiveCamera(
        48,
        mount.clientWidth / mount.clientHeight,
        0.1,
        100,
      )
      camera.position.set(0, 0.8, 6)

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(mount.clientWidth, mount.clientHeight)
      renderer.outputColorSpace = THREE.SRGBColorSpace
      mount.append(renderer.domElement)

      const ambient = new THREE.AmbientLight('#6bb3ff', 0.85)
      const key = new THREE.DirectionalLight('#ffd08a', 1.35)
      key.position.set(4, 5, 3)
      const rim = new THREE.DirectionalLight('#2d7eff', 1)
      rim.position.set(-5, 3, -4)
      scene.add(ambient, key, rim)

      const rig = new THREE.Group()
      scene.add(rig)

      const turbineGeometry = new THREE.TorusGeometry(1.55, 0.2, 22, 88)
      const turbineMaterial = new THREE.MeshStandardMaterial({
        color: '#6f84a4',
        metalness: 0.9,
        roughness: 0.25,
      })
      const turbine = new THREE.Mesh(turbineGeometry, turbineMaterial)
      rig.add(turbine)

      const bladeGeometry = new THREE.BoxGeometry(0.1, 0.72, 0.26)
      const bladeMaterial = new THREE.MeshStandardMaterial({
        color: '#f7a659',
        metalness: 0.55,
        roughness: 0.3,
      })

      for (let i = 0; i < 16; i += 1) {
        const blade = new THREE.Mesh(bladeGeometry, bladeMaterial)
        const angle = (i / 16) * Math.PI * 2
        blade.position.set(Math.cos(angle) * 1.55, Math.sin(angle) * 1.55, 0)
        blade.rotation.z = angle
        rig.add(blade)
      }

      const particleCount = 340
      const particles = new Float32Array(particleCount * 3)
      for (let i = 0; i < particleCount * 3; i += 3) {
        particles[i] = (Math.random() - 0.5) * 8
        particles[i + 1] = (Math.random() - 0.5) * 6
        particles[i + 2] = (Math.random() - 0.5) * 7
      }

      const particleGeometry = new THREE.BufferGeometry()
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particles, 3))
      const particleMaterial = new THREE.PointsMaterial({
        color: '#5da4ff',
        size: 0.026,
        transparent: true,
        opacity: 0.8,
      })
      const particleField = new THREE.Points(particleGeometry, particleMaterial)
      scene.add(particleField)

      const renderScene = () => {
        const t = performance.now() * 0.001
        if (!reducedMotion) {
          rig.rotation.z = t * 0.52
          rig.rotation.y = Math.sin(t * 0.4) * 0.26
          particleField.rotation.y = t * 0.06
        }
        renderer.render(scene, camera)
      }

      const animate = () => {
        renderScene()
        frameId = window.requestAnimationFrame(animate)
      }

      const handleResize = () => {
        camera.aspect = mount.clientWidth / mount.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(mount.clientWidth, mount.clientHeight)
        renderScene()
      }

      if (reducedMotion) {
        renderScene()
      } else {
        animate()
      }
      readyFrameId = window.requestAnimationFrame(() => setIsLoading(false))

      window.addEventListener('resize', handleResize)
      cleanups.push(() => window.removeEventListener('resize', handleResize))
      cleanups.push(() => window.cancelAnimationFrame(frameId))
      cleanups.push(() => window.cancelAnimationFrame(readyFrameId))
      cleanups.push(() => {
        scene.traverse((obj: THREE.Object3D) => {
          if (obj instanceof THREE.Mesh) {
            obj.geometry.dispose()
            if (Array.isArray(obj.material)) {
              obj.material.forEach((mat: THREE.Material) => mat.dispose())
            } else {
              obj.material.dispose()
            }
          }
        })
      })
      cleanups.push(() => {
        particleGeometry.dispose()
        particleMaterial.dispose()
      })
      cleanups.push(() => {
        renderer.dispose()
        if (renderer.domElement.parentElement === mount) {
          mount.removeChild(renderer.domElement)
        }
      })
    } catch {
      queueMicrotask(() => {
        setHasError(true)
        setIsLoading(false)
      })
      return
    }

    return () => {
      cleanups.forEach((cleanup) => cleanup())
    }
  }, [reducedMotion, webglAvailable])

  return (
    <div className="scene-shell" aria-label="Interactive 3D engineering scene">
      <div ref={mountRef} className="scene-canvas" aria-hidden="true" />
      {isLoading && !hasError && (
        <p className="scene-message" role="status" aria-live="polite">
          Loading 3D engineering scene...
        </p>
      )}
      {hasError && (
        <div className="scene-fallback" role="status" aria-live="polite">
          <p>3D preview unavailable on this device.</p>
          <p>The portfolio content remains fully accessible below.</p>
        </div>
      )}
    </div>
  )
}
