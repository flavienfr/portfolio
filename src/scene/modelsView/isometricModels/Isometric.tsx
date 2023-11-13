import { useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { useControls } from 'leva'
import React, { useMemo } from 'react'
import { MeshBasicMaterial } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export function Isometric() {
  const model = useLoader(GLTFLoader, './model/portfolioScreen.glb')

  const bakedTextures = useTexture('./model/baked.jpg')
  bakedTextures.flipY = false

  /* TODO scale to 1.10 in blender on join obj */
  return (
    <>
      <Scene3 />
      <Crane />
    </>
  )
}

function Scene3() {
  const { scene } = useLoader(GLTFLoader, './model/scene3/Scene.glb')

  const bakedTextures = useTexture('./model/scene3/Baking_light.png')
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
  const model = useLoader(GLTFLoader, './model/crane/crane.glb')
  const bakedTextures = useTexture('./model/crane/baked.jpg')
  bakedTextures.flipY = false

  return (
    <mesh geometry={model.nodes.crane.geometry} position={[0, 0, 0]}>
      <meshBasicMaterial map={bakedTextures} />
    </mesh>
  )
}
