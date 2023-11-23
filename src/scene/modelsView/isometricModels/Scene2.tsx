import { Html, useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { useControls } from 'leva'
import React, { useEffect, useState } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { editable as e } from '@theatre/r3f'
import { useSceneOpacity } from '../../../hooks/useSceneOpacity'

const OPTIONS = {
  position2: {
    value: [0.17, 2.1, 2.45],
    step: 0.01,
  },
  shellPos: {
    value: [-2.02, 2.65, 3.1],
    step: 0.01,
  },
  shellRot: {
    value: [0, 0.11, 0],
    step: 0.01,
  },
}

export function Scene2() {
  const { position2 } = useControls('scene2', OPTIONS)

  const { scene } = useLoader(GLTFLoader, './model/scene2/scene.glb')
  const bakedTextures = useTexture('./model/scene2/baked.jpg')
  bakedTextures.flipY = false

  const opacity = useSceneOpacity('scene2')
  const [screanOn, setScreanON] = useState(false)

  useEffect(() => {
    if (opacity === 1) setScreanON(true)
    else if (screanOn) setScreanON(false)
  }, [opacity])

  const geometries: Array<React.JSX.Element> = []
  scene.traverse((child) => {
    geometries.push(
      <mesh geometry={child.geometry} position={position2}>
        <meshBasicMaterial map={bakedTextures} transparent opacity={opacity} />
      </mesh>
    )
  })

  return (
    <>
      <PongScreen screanOn={screanOn} />
      <e.group theatreKey="scene2">{geometries}</e.group>
    </>
  )
}

interface PongScreenProps {
  screanOn: boolean
}
//TODO make screan follow iso scene with opacity
function PongScreen({ screanOn }: PongScreenProps) {
  const { shellPos, shellRot } = useControls('scene2', OPTIONS)

  useEffect(() => {
    console.log('screanOn', screanOn)
  }, [screanOn])

  return (
    <Html
      wrapperClass="pongWrapper"
      position={shellPos}
      rotation={shellRot}
      occlude={'blending'}
      transform
      scale={0.1}
      visible={screanOn}
      style={{ backgroundColor: 'black' }}
    >
      {screanOn && (
        <div className="pongScrean">
          <div id="half" />
          <div id="sidel" />
          <div id="sider" />
          <div id="ball" />
        </div>
      )}
    </Html>
  )
}
