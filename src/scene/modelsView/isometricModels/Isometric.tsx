import { useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { useControls } from 'leva'
import React, { useMemo } from 'react'
import { MeshBasicMaterial } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export function Isometric() {
  /* TODO scale to 1.10 in blender on join obj */
  return (
    <>
      <Scene1 />
      <Scene2 />
      <Scene3 />
      <Crane />
      <Building />
    </>
  )
}

function Scene1() {
  const { scene } = useLoader(GLTFLoader, './model/scene1/scene.glb')

  const bakedTextures = useTexture('./model/scene1/baked.jpg')
  bakedTextures.flipY = false
  const bakedMaterial = new MeshBasicMaterial({ map: bakedTextures })

  useMemo(
    () =>
      scene.traverse((obj) => {
        obj.material = bakedMaterial
      }),
    []
  )

  return <primitive object={scene} dispose={null} />
}

function Scene2() {
  const { scene } = useLoader(GLTFLoader, './model/scene2/scene.glb')

  const bakedTextures = useTexture('./model/scene2/baked.jpg')
  bakedTextures.flipY = false
  const bakedMaterial = new MeshBasicMaterial({ map: bakedTextures })

  useMemo(
    () =>
      scene.traverse((obj) => {
        obj.material = bakedMaterial
      }),
    []
  )

  return <primitive object={scene} dispose={null} />
}

function Scene3() {
  const { scene } = useLoader(GLTFLoader, './model/scene3/scene.glb')

  const bakedTextures = useTexture('./model/scene3/baked.png')
  bakedTextures.flipY = false
  const bakedMaterial = new MeshBasicMaterial({ map: bakedTextures })

  useMemo(
    () =>
      scene.traverse((obj) => {
        obj.material = bakedMaterial
      }),
    []
  )

  return <primitive object={scene} dispose={null} />
}

function Crane() {
  const model = useLoader(GLTFLoader, './model/crane/scene.glb')
  const bakedTextures = useTexture('./model/crane/baked.jpg')
  bakedTextures.flipY = false

  return (
    <mesh geometry={model.nodes.crane.geometry} position={[0, 0, 0]}>
      <meshBasicMaterial map={bakedTextures} />
    </mesh>
  )
}

function Building() {
  const model = useLoader(GLTFLoader, './model/building/scene.glb')
  const bakedTextures = useTexture('./model/building/baked.jpg')
  bakedTextures.flipY = false

  return (
    <mesh geometry={model.nodes.building.geometry} position={[0, 0, 0]}>
      <meshBasicMaterial map={bakedTextures} />
    </mesh>
  )
}
