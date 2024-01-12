import { Html } from '@react-three/drei'
import { Vector3 } from '@react-three/fiber'
import React, { useContext, useEffect, useState } from 'react'
import { Object3D } from 'three'
import { currentSceneContext } from '../../../../context/CurrentSceneContext'
import { pointerDownContext } from '../../../../context/PointerDownContext'
import { useSmallScreen } from '../../../../hooks/useSmallScreen'
import { Annotation } from './Annotation'
import { Indication } from './Indication'

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

  const smallScreen = useSmallScreen()

  const myStateRef = React.useRef(Math.abs(currentScene))
  useEffect(() => {
    myStateRef.current = Math.abs(currentScene)
  }, [currentScene])

  const handlePressUp = () => {
    setPointerDown(false)
    if (myStateRef.current !== scene) return
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

      {/*  <mesh position={position}>
        <boxGeometry />
        <meshBasicMaterial color={'black'} opacity={0.5} />
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
        {Math.abs(currentScene) === scene && !smallScreen && (
          <Annotation
            pressed={pressed}
            annotationPos={annotationPos}
            meshObj={meshObj}
          />
        )}
      </Html>

      {smallScreen && Math.abs(currentScene) === scene && (
        <Html
          center
          wrapperClass="wrapAnnotationMobile"
          occlude={false}
          zIndexRange={[16777271, 16777260]}
        >
          <Annotation
            pressed={pressed}
            annotationPos={'Mobile'}
            meshObj={meshObj}
          />
        </Html>
      )}
    </mesh>
  )
}
