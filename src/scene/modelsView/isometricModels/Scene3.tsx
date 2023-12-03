import { Html, useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { useControls } from 'leva'
import React, { useEffect, useRef, useState } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { editable as e } from '@theatre/r3f'
import { useSceneOpacity } from '../../../hooks/useSceneOpacity'
import { ScreenProps } from './scene2/Screens'

export function Scene3() {
  const { scene } = useLoader(GLTFLoader, './model/scene3/scene.glb')

  const opacity = useSceneOpacity('scene3')

  const bakedTextures = useTexture('./model/scene3/baked.jpg')
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
      <mesh key={child.name} geometry={child.geometry} position={position3}>
        <meshBasicMaterial map={bakedTextures} transparent opacity={opacity} />
      </mesh>
    )
  })

  return (
    <e.group theatreKey="scene3">
      <PresentationScreen screanOpacity={opacity} />
      {geometries}
    </e.group>
  )
}

const OPTIONS = {
  presPos: {
    value: [0.43, 7.79, 4.89],
    step: 0.001,
  },
  presRot: {
    value: [-0.34, -0.75, -0.24],
    step: 0.001,
  },
}

/* const upslideVideos = [
  'https://upslide.net/wp-content/uploads/2023/11/Template-Toc.mp4',
  'https://upslide.net/wp-content/uploads/2023/11/Library-Formatting.mp4',
  'https://upslide.net/wp-content/uploads/2023/11/Links1.mp4',
  'https://upslide.net/wp-content/uploads/2023/11/Slidecheck-Finalize.mp4',
] */

const upslideVideos = [
  './video/excel-to-powerpoint-link-video.mp4',
  './video/library.mp4',
]

function PresentationScreen({ screanOpacity }: ScreenProps) {
  const { presPos, presRot } = useControls('scene3', OPTIONS)
  const videoRef = useRef(null)
  const [videoIdx, setVideoIdx] = useState(0)

  const videoEnded = (e) => {
    console.log('🚀 ~ e:', e)
    const idx = (videoIdx + 1) % upslideVideos.length
    console.log('==>', idx)
    setVideoIdx(idx)
  }

  useEffect(() => {
    console.log('icic')
    videoRef.current?.load()
  }, [videoIdx])

  return (
    <Html
      wrapperClass="screenWrapper"
      position={presPos}
      rotation={presRot}
      occlude={'blending'}
      transform
      distanceFactor={0.75}
      style={{
        opacity: screanOpacity,
        backgroundColor: 'white',
      }}
    >
      <video
        autoPlay
        muted
        ref={videoRef}
        onEnded={videoEnded}
        className="presentationFrame"
      >
        <source src={upslideVideos[videoIdx]} />
      </video>
    </Html>
  )
}
