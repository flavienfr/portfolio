import { useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import React from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Annotation } from './InvisibleBoxDescriptor'
import { useControls } from 'leva'

export function Isometric() {
  const model = useLoader(GLTFLoader, './model/portfolioScreen.glb')

  const bakedTextures = useTexture('./model/baked.jpg')
  bakedTextures.flipY = false

  /* TODO scale to 1.10 in blender on join obj */
  return (
    <>
      {/* <ambientLight intensity={0.5} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} /> */}

      {/*   <primitive
        object={model.scene}
        scale={1}
        position={[0.14, -2.22, 2.44]}
      /> */}

      <ShcoolScene />

      {/*  <mesh
    geometry={model.nodes.Cube042_4.geometry}
    // position={nodes.Walls1.position}
    position={[0, 0, 3.3]}
    // position={[0, 0, 2.5]}
    scale={1.2}
  >
    <meshBasicMaterial map={bakedTextures} transparent opacity={1} />
  </mesh> */}
    </>
  )
}

function ShcoolScene() {
  const model = useLoader(GLTFLoader, './model/Scene2.glb')

  const bakedTextures = useTexture('./model/Texture_baking_light.png')
  bakedTextures.flipY = false

  const { annotationPos } = useControls({
    annotationPos: { value: [2.3, 1.1, 1.0], step: 0.1 },
  })

  return (
    <>
      <mesh
        geometry={model.nodes.Scene_1.geometry}
        // position={nodes.Walls1.position}
        position={[0, 0, 0]}
        // position={[0, 0, 2.5]}
        /* scale={1.2} */
      >
        <meshBasicMaterial map={bakedTextures} transparent opacity={1} />
      </mesh>

      <Annotation position={annotationPos}>My first project</Annotation>
    </>
  )
}
