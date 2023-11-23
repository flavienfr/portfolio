import { useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { useControls } from 'leva'
import React from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export function Scene1() {
  const { scene } = useLoader(GLTFLoader, './model/scene1/scene.glb')

  const bakedTextures = useTexture('./model/scene1/baked.jpg')
  bakedTextures.flipY = false

  const { position1 } = useControls('isometric', {
    position1: {
      value: [0.17, -2.3, 2.45],
      step: 0.01,
    },
  })

  const geometries: Array<React.JSX.Element> = []
  scene.traverse((child) => {
    geometries.push(
      <mesh geometry={child.geometry} position={position1}>
        <meshBasicMaterial map={bakedTextures} />
      </mesh>
    )
  })

  return <>{geometries}</>
}
