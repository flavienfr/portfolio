import { Html } from '@react-three/drei'
import { Vector3 } from '@react-three/fiber'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Object3D } from 'three'
import { OutlineObjContext } from './Isometric'
import { objDescriptor } from '../../../text/objDescriptor'
import { useSceneOpacity } from '../../../hooks/useSceneOpacity'

interface MeshDescriptorProps {
  position: Vector3
  mesh: Object3D
  Material: () => React.JSX.Element
}

//TODO deal with glith selected obj. Bloqué sur le premier obj trouvé

export function MeshDescriptor({
  position,
  mesh: meshObj,
  Material,
}: MeshDescriptorProps) {
  const [hovered, setHovered] = useState(false)
  const objRef = useRef(null)
  const { setObjs } = useContext(OutlineObjContext)

  const opacity = useSceneOpacity('scene2')

  /*   useEffect(() => {
    console.log('render')
    if (opacity !== 1) return
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
    setObjs(hovered ? objRef : null)
  }, [hovered]) */

  return (
    <mesh
      key={meshObj.name}
      geometry={meshObj.geometry}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      ref={objRef}
    >
      <Material />
      {/*  <boxGeometry /> */}

      {hovered && opacity === 1 /* meshObj.name === 'shcool'  */ && (
        <Html position={position} /*  distanceFactor={10} */>
          <div className="content">
            <div className="title">{objDescriptor[meshObj.name].title}</div>
            <div className="ligne" />
            {objDescriptor[meshObj.name].description}
          </div>
        </Html>
      )}
    </mesh>
  )
}
