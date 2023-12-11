import { useGLTF, useTexture } from '@react-three/drei'
import { useControls } from 'leva'
import React from 'react'

const OPTIONS = {
  position1: {
    value: [0.17, -2.3, 2.45],
    step: 0.01,
  },
}

export function Scene1() {
  const { nodes } = useGLTF('./model/scene1/scene.glb')
  const bakedTextures = useTexture('./model/scene1/baked.jpg')
  bakedTextures.flipY = false

  const { position1 } = useControls('isometric', OPTIONS)

  return (
    <mesh
      key={nodes.cinema.name}
      geometry={nodes.cinema.geometry}
      position={position1}
    >
      <meshBasicMaterial map={bakedTextures} />
    </mesh>
  )
}

useGLTF.preload('./model/scene1/scene.glb')
useTexture.preload('./model/scene1/baked.jpg')
