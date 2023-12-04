import { useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { useControls } from 'leva'
import React from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { MeshDescriptor } from '../MeshDescriptor'

/* 
TODO
- Optimisation minimum object from glb 
- floating cube animation
*/

const OPTIONS = {
  upslidePos: {
    value: [0, 0, 0],
    step: 0.01,
  },
}

interface UpslideSceneObjectProps {
  opacity: number
}

export function UpslideSceneObject({ opacity }: UpslideSceneObjectProps) {
  const { upslidePos } = useControls('scene3', OPTIONS)
  const { nodes } = useLoader(GLTFLoader, './model/scene3/scene.glb')

  const bakedTextures = useTexture('./model/scene3/baked.jpg')
  bakedTextures.flipY = false
  const MapMaterial = () => (
    <meshBasicMaterial map={bakedTextures} transparent opacity={opacity} />
  )

  return (
    <>
      <MeshDescriptor
        mesh={nodes.upslide}
        Material={MapMaterial}
        position={upslidePos}
        scene={3}
      />

      <mesh key={'c'} geometry={nodes.c.geometry}>
        <MapMaterial />
      </mesh>
      <mesh key={'ts'} geometry={nodes.ts.geometry}>
        <MapMaterial />
      </mesh>
      <mesh key={'react'} geometry={nodes.react.geometry}>
        <MapMaterial />
      </mesh>

      <mesh key={'laptop'} geometry={nodes.laptop.geometry}>
        <MapMaterial />
      </mesh>
      <mesh key={'chair'} geometry={nodes.chair.geometry}>
        <MapMaterial />
      </mesh>
      <mesh key={'room'} geometry={nodes.room.geometry}>
        <MapMaterial />
      </mesh>
    </>
  )
}
