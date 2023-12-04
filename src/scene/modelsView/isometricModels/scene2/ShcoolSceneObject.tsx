import { useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { useControls } from 'leva'
import React from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { MeshDescriptor } from '../MeshDescriptor'

export const OPTIONS = {
  shcoolPos: {
    value: [-1.57, 2.64, -2.18],
    step: 0.01,
  },
  pcPos: {
    value: [2.75, 1.89, -1.25],
    step: 0.01,
  },
  serverPos: {
    value: [0.4, 1.97, -3.01],
    step: 0.01,
  },
  arcadePos: {
    value: [1.98, 2.03, 0.21],
    step: 0.01,
  },
  paintPos: {
    value: [2.61, 2.57, 1.7],
    step: 0.01,
  },
  tvPos: {
    value: [-1.31, 0.24, 0.36],
    step: 0.01,
  },
}

interface ShcoolSceneObjectProps {
  opacity: number
}

export function ShcoolSceneObject({ opacity }: ShcoolSceneObjectProps) {
  const { shcoolPos, pcPos, serverPos, arcadePos, paintPos, tvPos } =
    useControls('screens', OPTIONS)
  const { nodes } = useLoader(GLTFLoader, './model/scene2/scene.glb')

  const bakedTextures = useTexture('./model/scene2/baked.jpg')
  bakedTextures.flipY = false
  const MapMaterial = () => (
    <meshBasicMaterial map={bakedTextures} transparent opacity={opacity} />
  )

  return (
    <>
      <MeshDescriptor
        mesh={nodes.shcool}
        Material={MapMaterial}
        position={shcoolPos}
        scene={2}
      />
      <MeshDescriptor
        mesh={nodes.pc}
        Material={MapMaterial}
        position={pcPos}
        scene={2}
      />
      <MeshDescriptor
        mesh={nodes.server}
        Material={MapMaterial}
        position={serverPos}
        scene={2}
      />
      <MeshDescriptor
        mesh={nodes.arcade}
        Material={MapMaterial}
        position={arcadePos}
        annotationPos="Left"
        scene={2}
      />
      <MeshDescriptor
        mesh={nodes.paint}
        Material={MapMaterial}
        position={paintPos}
        annotationPos="Left"
        scene={2}
      />
      <MeshDescriptor
        mesh={nodes.tv}
        Material={MapMaterial}
        position={tvPos}
        annotationPos="Bottom"
        scene={2}
      />

      <mesh key={'room'} geometry={nodes.room.geometry}>
        <MapMaterial />
      </mesh>
    </>
  )
}
