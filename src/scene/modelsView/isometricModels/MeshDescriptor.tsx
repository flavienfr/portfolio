import { Html } from '@react-three/drei'
import { Vector3 } from '@react-three/fiber'
import React, { useMemo, useState } from 'react'
import { Object3D } from 'three'
import { useShowScene } from '../../../hooks/useSceneOpacity'
import { objDescriptor } from '../../../text/objDescriptor'

interface MeshDescriptorProps {
  position: Vector3
  mesh: Object3D
  Material: () => React.JSX.Element
  annotationPos?: 'Left' | 'Bottom'
  scene: number
}

//TODO deal with glith selected obj. Bloqué sur le premier obj trouvé

export function MeshDescriptor({
  position,
  mesh: meshObj,
  Material,
  annotationPos,
  scene,
}: MeshDescriptorProps) {
  const [hovered, setHovered] = useState(false)
  const currentScene = useShowScene()

  const handleHovered = (hover: boolean) => {
    if (currentScene !== scene) {
      if (hovered) setHovered(false)
      document.body.style.cursor = 'auto'
      return
    }
    document.body.style.cursor = hover ? 'pointer' : 'auto'
    setHovered(hover)
  }

  const lignes = useMemo(
    () => objDescriptor[meshObj.name].description.split('\n'),
    [meshObj]
  )

  return (
    <mesh
      key={meshObj.name}
      geometry={meshObj.geometry}
      onPointerOver={() => handleHovered(true)}
      onPointerOut={() => handleHovered(false)}
      /* onPointerDown={() => () => handleHovered(!hovered)} */
    >
      <Material />

      {/* <mesh position={position}>
        <boxGeometry />
      </mesh> */}

      <Html
        position={position}
        wrapperClass="wrapAnnotation"
        style={{
          opacity: /* meshObj.name === 'arcade' */ hovered ? 1 : 0,
          transition: 'opacity 0.5s',
        }}
      >
        <div className={annotationPos ? `content${annotationPos}` : 'content'}>
          <div className="title">{objDescriptor[meshObj.name].title}</div>

          <div className="ligne" />

          <div className="textLignes">
            {lignes.map((ligne, idx) => (
              <p key={idx}>{ligne}</p>
            ))}
          </div>
        </div>
      </Html>
    </mesh>
  )
}
