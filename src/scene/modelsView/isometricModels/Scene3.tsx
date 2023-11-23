import { useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { useControls } from 'leva'
import React from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { editable as e } from '@theatre/r3f'
import { useSceneOpacity } from '../../../hooks/useSceneOpacity'

export function Scene3() {
  const { scene } = useLoader(GLTFLoader, './model/scene3/scene.glb')

  const opacity = useSceneOpacity('scene3')

  const bakedTextures = useTexture('./model/scene3/baked.png')
  bakedTextures.flipY = false

  const { position3 } = useControls('isometric', {
    position3: {
      value: [0.17, 6.2, 2.45],
      step: 0.01,
    },
  })

  const geometries: Array<React.JSX.Element> = []
  scene.traverse((child) => {
    geometries.push(
      <mesh geometry={child.geometry} position={position3}>
        <meshBasicMaterial map={bakedTextures} transparent opacity={opacity} />
      </mesh>
    )
  })

  return <e.group theatreKey="scene3">{geometries}</e.group>
}
