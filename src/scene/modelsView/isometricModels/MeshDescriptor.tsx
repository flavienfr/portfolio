import { Html } from '@react-three/drei'
import { Vector3 } from '@react-three/fiber'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Object3D } from 'three'
import { useSceneOpacity } from '../../../hooks/useSceneOpacity'
import { objDescriptor } from '../../../text/objDescriptor'

interface MeshDescriptorProps {
  position: Vector3
  mesh: Object3D
  Material: () => React.JSX.Element
  annotationPos?: 'Left' | 'Bottom'
}

//TODO deal with glith selected obj. Bloqué sur le premier obj trouvé

export function MeshDescriptor({
  position,
  mesh: meshObj,
  Material,
  annotationPos,
}: MeshDescriptorProps) {
  const [hovered, setHovered] = useState(false)
  const objRef = useRef(null)
  /*  const { setObjs } = useContext(OutlineObjContext) */

  const opacity = useSceneOpacity('scene2')

  useEffect(() => {
    if (opacity !== 1) return
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
    /* setObjs(hovered ? objRef : null) */
  }, [hovered])

  const lignes = useMemo(
    () => objDescriptor[meshObj.name].description.split('\n'),
    [objDescriptor]
  )

  return (
    <mesh
      key={meshObj.name}
      geometry={meshObj.geometry}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      ref={objRef}
    >
      <Material />

      {/*    <mesh position={position}>
        <boxGeometry />
      </mesh>
 */}
      {hovered /* meshObj.name === 'pc' */ && opacity === 1 && (
        <Html position={position}>
          <div
            className={annotationPos ? `content${annotationPos}` : 'content'}
          >
            <div className="title">{objDescriptor[meshObj.name].title}</div>
            <div className="ligne" />
            {lignes.map((ligne, idx) => (
              <p key={idx}>{ligne}</p>
            ))}
          </div>
        </Html>
      )}
    </mesh>
  )
}
