import { useScroll, useTexture } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import { useControls } from 'leva'
import React, { useMemo } from 'react'
import THREE, { MeshBasicMaterial } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { editable as e } from '@theatre/r3f'
import { val } from '@theatre/core'
import { LEAVING_SCREEN_ANIMATION } from '../../WebPage'
import core from '@theatre/studio'
import { useSceneOpacity } from '../../../hooks/useSceneOpacity'
import { Crane } from '../backGroundModels/Crane'

export function Isometric() {
  /* TODO scale to 1.10 in blender on join obj */
  return (
    <>
      <Scene1 />
      <Scene2 />
      <Scene3 />
    </>
  )
}

function Scene1() {
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

function Scene2() {
  const { scene } = useLoader(GLTFLoader, './model/scene2/scene.glb')

  const opacity = useSceneOpacity('scene2')

  const bakedTextures = useTexture('./model/scene2/baked.jpg')
  bakedTextures.flipY = false

  const { position2 } = useControls('isometric', {
    position2: {
      value: [0.17, 2.1, 2.45],
      step: 0.01,
    },
  })

  const geometries: Array<React.JSX.Element> = []
  scene.traverse((child) => {
    geometries.push(
      <mesh geometry={child.geometry} position={position2}>
        <meshBasicMaterial map={bakedTextures} transparent opacity={opacity} />
      </mesh>
    )
  })

  return <e.group theatreKey="scene2">{geometries}</e.group>
}

function Scene3() {
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
