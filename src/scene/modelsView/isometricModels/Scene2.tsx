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
    value: [-2.19, 0.555, 0.65],
    step: 0.001,
  },
  shellRot: {
    value: [0, 0.11, 0],
    step: 0.01,
  },
  arcadePos: {
    value: [2.03, 1.9, 0.96],
    step: 0.001,
  },
  arcadeRot: {
    value: [1.6, -1.88, 1.6],
    step: 0.001,
  },
}

export function Scene2() {
  const { position2 } = useControls('scene2', OPTIONS)

  const { scene } = useLoader(GLTFLoader, './model/scene2/scene.glb')
  const bakedTextures = useTexture('./model/scene2/baked.jpg')
  bakedTextures.flipY = false

  const opacity = useSceneOpacity('scene2')

  const geometries: Array<React.JSX.Element> = []
  scene.traverse((child) => {
    geometries.push(
      <mesh geometry={child.geometry}>
        <meshBasicMaterial map={bakedTextures} transparent opacity={opacity} />
      </mesh>
    )
  })

  return (
    <e.group theatreKey="scene2" position={position2}>
      <PongScreen screanOpacity={opacity} />
      <ArcadeScreen screanOpacity={opacity} />
      {geometries}
    </e.group>
  )
}

interface ScreenProps {
  screanOpacity: number
}

function PongScreen({ screanOpacity }: ScreenProps) {
  const { shellPos, shellRot } = useControls('scene2', OPTIONS)

  return (
    <Html
      wrapperClass="screenWrapper"
      position={shellPos}
      rotation={shellRot}
      occlude={'blending'}
      transform
      scale={0.1}
      style={{ backgroundColor: 'black', opacity: screanOpacity }}
    >
      <div className="pongScrean">
        <div id="half" />
        <div id="sidel" />
        <div id="sider" />
        <div id="ball" />
      </div>
    </Html>
  )
}

/* TODO
- auto start
- optimise wraping arcade 
- download site ?
*/
function ArcadeScreen({ screanOpacity }: ScreenProps) {
  const { arcadePos, arcadeRot } = useControls('scene2', OPTIONS)

  return (
    <Html
      wrapperClass="screenWrapper"
      position={arcadePos}
      rotation={arcadeRot}
      occlude={'blending'}
      transform
      distanceFactor={0.4}
      style={{ opacity: screanOpacity }}
    >
      <iframe
        title="arcadeFrame"
        src="https://tybsi.com/games/wolfenstein-3d/index.html"
      />
    </Html>
  )
}
