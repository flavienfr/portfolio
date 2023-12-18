import { Html, Text } from '@react-three/drei'
import { Vector3, useFrame } from '@react-three/fiber'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Object3D } from 'three'
import { currentSceneContext } from '../../../context/CurrentSceneContext'
import { objDescriptor } from '../../../text/objDescriptor'

interface MeshDescriptorProps {
  position: Vector3
  mesh: Object3D
  Material: () => React.JSX.Element
  annotationPos?: 'Left' | 'Bottom'
  scene: number
  updateHideIndications: (status: boolean) => void
  displayIndication: boolean
}

export function MeshDescriptor({
  position,
  mesh: meshObj,
  Material,
  annotationPos,
  scene,
  updateHideIndications,
  displayIndication,
}: MeshDescriptorProps) {
  const [hovered, setHovered] = useState(false)
  const currentScene = useContext(currentSceneContext)

  const handleHovered = (hover: boolean) => {
    if (Math.abs(currentScene) !== scene) {
      setHovered(false)
      document.body.style.cursor = 'auto'
      return
    }
    document.body.style.cursor = hover ? 'pointer' : 'auto'
    setHovered(hover)
    updateHideIndications(hover)
  }

  /* TODO explore  mesh insted of HTML */
  /*   const indicRef = useRef(null)
  useFrame((state) => {})

  useEffect(() => {
    if (!indicRef || !indicRef.current) return
    console.log('state', indicRef.current.material.opacity)
    indicRef.current.material.opacity = 0
    indicRef.current.needsUpdate = true
  }, [indicRef]) */

  return (
    <mesh
      key={meshObj.name}
      geometry={meshObj.geometry}
      onPointerOver={() => handleHovered(true)}
      onPointerOut={() => handleHovered(false)}
    >
      <Material />
      {/*     <mesh position={position} ref={indicRef}>
        <boxGeometry />
        <meshBasicMaterial opacity={0.5} />
      </mesh>
 */}
      <Html
        position={position}
        wrapperClass="wrapAnnotation"
        occlude={false}
        zIndexRange={[16777271, 16777260]}
        sprite
      >
        {displayIndication && (
          <Indication
            displayIndication={displayIndication}
            annotationConfig={annotationPos === 'Bottom' ? 2 : 1}
          />
        )}
        {Math.abs(currentScene) === scene && (
          <Annotation
            hovered={hovered}
            annotationPos={annotationPos}
            meshObj={meshObj}
          />
        )}
      </Html>
    </mesh>
  )
}

interface IndicationProps {
  displayIndication: boolean
  annotationConfig: 1 | 2
}

function Indication({ displayIndication, annotationConfig }: IndicationProps) {
  return (
    <div
      style={{
        opacity: displayIndication ? 1 : 0,
        transition: 'opacity 1s',
        position: 'relative',
        right: '10px',
        top: annotationConfig === 1 ? '20px' : '-34px',
      }}
      className="fireflyWrapper"
    >
      <div className="firefly" />
      <div className="fireflyInner" />
    </div>
  )
}

function Annotation({ hovered, annotationPos, meshObj }) {
  const lignes = useMemo(
    () => objDescriptor[meshObj.name].description.split('\n'),
    [meshObj]
  )

  return (
    <div
      style={{
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.5s',
      }}
      className={annotationPos ? `content${annotationPos}` : 'content'}
    >
      <div className="title">{objDescriptor[meshObj.name].title}</div>

      <div className="ligne" />
      <div className="textLignes">
        {lignes.map((ligne, idx) => (
          <p key={idx}>{ligne}</p>
        ))}
      </div>
    </div>
  )
}
