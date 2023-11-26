import { Html } from '@react-three/drei'
import { Vector3 } from '@react-three/fiber'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { BufferGeometry } from 'three'
import { OutlineObjContext } from './Isometric'

interface InvisibleBoxDescriptorProps {
  position?: Vector3
  children?: any
  keyProps: string
  geometry: BufferGeometry
  Material: any
}

//TODO deal with glith selected obj. Bloqué sur le premier obj trouvé

export function MeshAnnotation({
  position,
  children,
  keyProps,
  geometry,
  Material,
}: InvisibleBoxDescriptorProps) {
  const [hovered, setHovered] = useState(false)
  const objRef = useRef(null)
  const { setObjs } = useContext(OutlineObjContext)

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
    setObjs(hovered ? objRef : null)
  }, [hovered])

  return (
    <>
      <mesh
        key={keyProps}
        geometry={geometry}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        ref={objRef}
      >
        <Material />
      </mesh>

      {hovered && (
        <Html /* position={position} */ transform>
          <div className="annotation" style={{ opacity: 1 }}>
            {/* {children} */}
          </div>
        </Html>
      )}
    </>
  )
}
