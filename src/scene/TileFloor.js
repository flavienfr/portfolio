import { Debug, Physics, useBox, usePlane } from '@react-three/cannon'
import { PointerLockControls } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import React from 'react'
import * as THREE from 'three' //TODO better import ?
import { DoubleSide } from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

const name = (type /* : string */) =>
  `model/Tiles074_1K-JPG/Tiles074_1K_${type}.jpg`

function Plane(props) {
  const [colorMap, displacementMap, normalMap, roughnessMap] = useLoader(
    TextureLoader,
    [name('Color'), name('Displacement'), name('NormalGL'), name('Roughness')]
  )
  colorMap.wrapS = THREE.RepeatWrapping
  colorMap.wrapT = THREE.RepeatWrapping
  colorMap.repeat.set(6, 6)

  colorMap.minFilter = THREE.NearestFilter
  colorMap.generateMipmaps = false
  // colorMap.anisotropy = 3 //renderer.getMaxAnisotropy();

  displacementMap.wrapS = THREE.RepeatWrapping
  displacementMap.wrapT = THREE.RepeatWrapping
  displacementMap.repeat.set(6, 6)

  normalMap.wrapS = THREE.RepeatWrapping
  normalMap.wrapT = THREE.RepeatWrapping
  normalMap.repeat.set(6, 6)

  roughnessMap.wrapS = THREE.RepeatWrapping
  roughnessMap.wrapT = THREE.RepeatWrapping
  roughnessMap.repeat.set(6, 6)

  const [ref] = usePlane(() => ({ ...props }))

  return (
    <mesh ref={ref}>
      <planeGeometry args={[25, 25]} />
      <meshStandardMaterial
        map={colorMap}
        displacementMap={displacementMap}
        displacementScale={0}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        side={DoubleSide}
      />
    </mesh>
  )
}

function Player(props) {
  const [ref] = useBox(() => ({ mass: 1, ...props }))

  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1.8, 1]} />
      <meshNormalMaterial />
    </mesh>
  )
}

export default function TileFloor() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight />
      <Physics allowSleep>
        <Debug>
          <Plane args={[25, 25]} rotation={[-Math.PI * 0.5, 0, 0]} />
          <Player args={[1, 1.8, 1]} position={[0, 0.9, 0]} />
        </Debug>
      </Physics>
      <PointerLockControls />
    </>
  )
}
