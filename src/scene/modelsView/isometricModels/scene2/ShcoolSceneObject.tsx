import { useGLTF, useTexture } from '@react-three/drei'
import { useControls } from 'leva'
import React from 'react'
import { useIndicationsDisplay } from '../../../../hooks/useIndicationsDisplay'
import { MeshDescriptor } from '../meshDescriptor/MeshDescriptor'

export const OPTIONS = {
  shcoolPos: {
    value: [-1.51, 2.69, -2.18],
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
    value: [2.18, 2.55, 0.21],
    step: 0.01,
  },
  paintPos: {
    value: [2.15, 3.03, 1.77],
    step: 0.01,
  },
  tvPos: {
    value: [-1.31, 0.24, 0.36],
    step: 0.01,
  },
}

const SCENE_2 = 2

interface ShcoolSceneObjectProps {
  opacity: number
}

export function ShcoolSceneObject({ opacity }: ShcoolSceneObjectProps) {
  const { shcoolPos, pcPos, serverPos, arcadePos, paintPos, tvPos } =
    useControls('screens', OPTIONS)

  const { nodes } = useGLTF('./model/scene2/scene.glb')
  const bakedTextures = useTexture('./model/scene2/baked.jpg')
  bakedTextures.flipY = false
  const MapMaterial = () => (
    <meshBasicMaterial map={bakedTextures} transparent opacity={opacity} />
  )

  const { updateHideIndications, showIndication } =
    useIndicationsDisplay(SCENE_2)

  return (
    <>
      <MeshDescriptor
        mesh={nodes.shcool}
        Material={MapMaterial}
        position={shcoolPos}
        scene={SCENE_2}
        updateHideIndications={updateHideIndications}
        displayIndication={showIndication}
      />
      <MeshDescriptor
        mesh={nodes.server}
        Material={MapMaterial}
        position={serverPos}
        scene={SCENE_2}
        updateHideIndications={updateHideIndications}
        displayIndication={showIndication}
      />
      <MeshDescriptor
        mesh={nodes.pc}
        Material={MapMaterial}
        position={pcPos}
        scene={SCENE_2}
        updateHideIndications={updateHideIndications}
        displayIndication={showIndication}
      />
      <MeshDescriptor
        mesh={nodes.arcade}
        Material={MapMaterial}
        position={arcadePos}
        annotationPos="Left"
        scene={SCENE_2}
        updateHideIndications={updateHideIndications}
        displayIndication={showIndication}
      />
      <MeshDescriptor
        mesh={nodes.paint}
        Material={MapMaterial}
        position={paintPos}
        annotationPos="Left"
        scene={SCENE_2}
        updateHideIndications={updateHideIndications}
        displayIndication={showIndication}
      />
      <MeshDescriptor
        mesh={nodes.tv}
        Material={MapMaterial}
        position={tvPos}
        annotationPos="Bottom"
        scene={SCENE_2}
        updateHideIndications={updateHideIndications}
        displayIndication={showIndication}
      />

      <mesh key={'room'} geometry={nodes.room.geometry}>
        <MapMaterial />
      </mesh>
    </>
  )
}

useGLTF.preload('./model/scene2/scene.glb')
useTexture.preload('./model/scene2/baked.jpg')
