import { Html, Text } from '@react-three/drei'
import { Vector3, useFrame } from '@react-three/fiber'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Object3D } from 'three'
import { currentSceneContext } from '../../../../context/CurrentSceneContext'
import { pointerDownContext } from '../../../../context/PointerDownContext'
import { Indication } from './Indication'
import { Annotation } from './Annotation'

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
  const [pressed, setPressed] = useState(false)
  const currentScene = useContext(currentSceneContext)
  const { pointerDown, setPointerDown } = useContext(pointerDownContext)

  /* const handleOvered = (hover: boolean) => {
    if (Math.abs(currentScene) !== scene) {
      document.body.style.cursor = 'auto'
      return
    }
    console.log('cursor:', hover ? 'pointer' : 'auto')
    document.body.style.cursor = hover ? 'pointer' : 'auto'
  } */

  const handlePressUp = () => {
    setPointerDown(false)
    setPressed(false)
    updateHideIndications(false)
    document.removeEventListener('pointerdown', handlePressUp)
  }

  const handlePressDown = () => {
    if (pointerDown || Math.abs(currentScene) !== scene) return
    setPointerDown(true)
    setPressed(true)
    updateHideIndications(true)
    setTimeout(() => {
      document.addEventListener('pointerdown', handlePressUp)
    }, 500)
  }

  return (
    <mesh
      key={meshObj.name}
      geometry={meshObj.geometry}
      onPointerDown={handlePressDown}
      /* onPointerOver={() => handleOvered(true)}
      onPointerOut={() => handleOvered(false)} */
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
            pressed={pressed}
            annotationPos={annotationPos}
            meshObj={meshObj}
          />
        )}
      </Html>
    </mesh>
  )
}
