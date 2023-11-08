import { Html } from '@react-three/drei'
import { Vector3 } from '@react-three/fiber'
import React, { useState } from 'react'

interface InvisibleBoxDescriptorProps {
  position: Vector3
  children: any
}
export function Annotation({
  position,
  children,
}: InvisibleBoxDescriptorProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      ></mesh>

      {hovered && (
        <Html position={position} transform>
          <div className="annotation" style={{ opacity: 1 }}>
            {children}
          </div>
        </Html>
      )}
    </>
  )
}
