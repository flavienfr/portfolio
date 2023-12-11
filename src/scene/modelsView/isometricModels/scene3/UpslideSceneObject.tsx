import { useGLTF, useTexture } from '@react-three/drei'
import { useControls } from 'leva'
import React from 'react'
import { MeshDescriptor } from '../MeshDescriptor'

/* 
TODO
- Optimisation minimum object from glb 
- floating cube animation
*/

const OPTIONS = {
  upslidePos: {
    value: [-1.21, 2.79, -3.26],
    step: 0.01,
  },
  cubesPos: {
    value: [-0.79, -0.42, 1.8],
    step: 0.01,
  },
}

interface UpslideSceneObjectProps {
  opacity: number
}

export function UpslideSceneObject({ opacity }: UpslideSceneObjectProps) {
  const { upslidePos, cubesPos } = useControls('scene3', OPTIONS)

  const { nodes } = useGLTF('./model/scene3/scene.glb')
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

      <MeshDescriptor
        mesh={nodes.cubes}
        Material={MapMaterial}
        position={cubesPos}
        annotationPos="Bottom"
        scene={3}
      />

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

useGLTF.preload('./model/scene3/scene.glb')
useTexture.preload('./model/scene3/baked.jpg')
