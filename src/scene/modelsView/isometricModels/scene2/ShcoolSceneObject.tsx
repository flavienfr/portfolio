import { Html, useGLTF, useTexture } from '@react-three/drei'
import { useControls } from 'leva'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { MeshDescriptor } from '../MeshDescriptor'
import { currentSceneContext } from '../../../../context/CurrentSceneContext'

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

  const { updateHideIndications, showIndication } = useIndicationsDisplay(6, 2)

  return (
    <>
      <MeshDescriptor
        mesh={nodes.shcool}
        Material={MapMaterial}
        position={shcoolPos}
        scene={2}
        updateHideIndications={updateHideIndications}
        displayIndication={showIndication[0]}
      />
      <MeshDescriptor
        mesh={nodes.server}
        Material={MapMaterial}
        position={serverPos}
        scene={2}
        updateHideIndications={updateHideIndications}
        displayIndication={showIndication[2]}
      />
      <MeshDescriptor
        mesh={nodes.pc}
        Material={MapMaterial}
        position={pcPos}
        scene={2}
        updateHideIndications={updateHideIndications}
        displayIndication={showIndication[1]}
      />
      <MeshDescriptor
        mesh={nodes.arcade}
        Material={MapMaterial}
        position={arcadePos}
        annotationPos="Left"
        scene={2}
        updateHideIndications={updateHideIndications}
        displayIndication={showIndication[3]}
      />
      <MeshDescriptor
        mesh={nodes.paint}
        Material={MapMaterial}
        position={paintPos}
        annotationPos="Left"
        scene={2}
        updateHideIndications={updateHideIndications}
        displayIndication={showIndication[4]}
      />
      <MeshDescriptor
        mesh={nodes.tv}
        Material={MapMaterial}
        position={tvPos}
        annotationPos="Bottom"
        scene={2}
        updateHideIndications={updateHideIndications}
        displayIndication={showIndication[5]}
      />

      <mesh key={'room'} geometry={nodes.room.geometry}>
        <MapMaterial />
      </mesh>
    </>
  )
}

useGLTF.preload('./model/scene2/scene.glb')
useTexture.preload('./model/scene2/baked.jpg')

//TODO remove array and set only one state for all
//TODO not redender when not currentScene
export function useIndicationsDisplay(indicNumber: number, scene: number) {
  const currentScene = useContext(currentSceneContext)

  /*  const [hideIndications, setHideIndications] = useState(false) */
  const [showIndication, setShowIndication] = useState(
    new Array(indicNumber).fill(false)
  )

  /*   useEffect(() => {
    let newIdx = 0

    const timer = setInterval(() => {
      if (hideIndications) return
      setShowIndication(
        new Array(indicNumber).fill(false).map((_, idx) => idx === newIdx)
      )
      newIdx = (newIdx + 1) % indicNumber
    }, 3000)
    return () => clearInterval(timer)
  }, [hideIndications]) */

  useEffect(() => {
    setShowIndication(
      new Array(indicNumber).fill(scene === Math.abs(currentScene))
    )
  }, [currentScene])

  const updateHideIndications = (status: boolean) => {
    /* setHideIndications(status) */
    setShowIndication(new Array(indicNumber).fill(!status))
  }

  return { updateHideIndications, showIndication }
}
