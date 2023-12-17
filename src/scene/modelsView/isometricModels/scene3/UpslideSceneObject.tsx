import { useGLTF, useTexture } from '@react-three/drei'
import { useControls } from 'leva'
import React from 'react'
import { MeshDescriptor } from '../MeshDescriptor'
import { useIndicationsDisplay } from '../../../../hooks/useIndicationsDisplay'

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

const SCENE_3 = 3

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

  const { updateHideIndications, showIndication } =
    useIndicationsDisplay(SCENE_3)

  return (
    <>
      <MeshDescriptor
        mesh={nodes.upslide}
        Material={MapMaterial}
        position={upslidePos}
        scene={SCENE_3}
        updateHideIndications={updateHideIndications}
        displayIndication={showIndication}
      />

      <MeshDescriptor
        mesh={nodes.cubes}
        Material={MapMaterial}
        position={cubesPos}
        annotationPos="Bottom"
        scene={SCENE_3}
        updateHideIndications={updateHideIndications}
        displayIndication={showIndication}
      />

      {/* <mesh key={'laptop'} geometry={nodes.laptop.geometry}>
        <MapMaterial />
      </mesh>
      <mesh key={'chair'} geometry={nodes.chair.geometry}>
        <MapMaterial />
      </mesh>
      <mesh key={'room'} geometry={nodes.room.geometry}>
        <MapMaterial />
      </mesh> */}
    </>
  )
}

useGLTF.preload('./model/scene3/scene.glb')
useTexture.preload('./model/scene3/baked.jpg')
