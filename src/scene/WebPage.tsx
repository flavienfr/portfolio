import { Html, useScroll } from '@react-three/drei'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react' //TODO remove that
import { FOV } from '../index'
import { HtmlPage } from './introWebsite/HtmlPage.tsx'
import { useCurrentSheet } from '@theatre/r3f'
import { val } from '@theatre/core'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const ESCAPE_SCREAN_ANIMATION_DURATION = 3

export function WebPage() {
  //TODO extract mesh in other component and make conditional render of it
  const webScreenRef = useRef(null)
  const { camera, viewport } = useThree()
  const [planeInfo, setPlaneInfo] = useState({ width: 1000, height: 1000 }) //init value wrong

  // Scroll
  const sheet = useCurrentSheet()
  const scroll = useScroll()

  useFrame(() => {
    /*   if (sheet.sequence.position < ESCAPE_SCREAN_ANIMATION_DURATION) return
    const sequenceLength = val(sheet.sequence.pointer.length)
    sheet.sequence.position =
      scroll.offset * sequenceLength + ESCAPE_SCREAN_ANIMATION_DURATION */
  })
  //----------------

  useEffect(() => {
    const cameraZ = camera.position.z
    const planeZ = 682 //600
    const distance = Math.abs(cameraZ - planeZ)
    const aspect = viewport.width / viewport.height
    const vFov = (FOV * Math.PI) / 180
    const height = 2 * Math.tan(vFov / 2) * distance
    const width = height * aspect
    setPlaneInfo({ height, width })
  }, [setPlaneInfo, viewport, camera])

  const gltf = useLoader(GLTFLoader, './model/iso/iso.glb')

  return (
    <>
      <mesh name="Screen" position={[0, 0, -0.5]} ref={webScreenRef}>
        <Html
          transform={true}
          /* occlude={'blending'} */
          wrapperClass="htmlScreen"
          distanceFactor={3.25}
          style={{
            width: planeInfo.width,
            height: planeInfo.height,
          }}
        >
          <HtmlPage htmlHeight={planeInfo.height} />
        </Html>
      </mesh>
      <SceneStructure width={planeInfo.width} height={planeInfo.height} />
      <primitive object={gltf.scene} />
    </>
  )
}

function SceneStructure({ width, height }) {
  const [structWidth, structHeight] = [width / 245, height / 125]

  return (
    <>
      <mesh position={[structWidth + 0.5, 0, -0.5]}>
        <boxGeometry args={[1.05, structHeight + 0.1, 1]} />
        <meshBasicMaterial color={'blue'} />
      </mesh>
      <mesh position={[-structWidth - 0.5, 0, -0.5]}>
        <boxGeometry args={[1.05, structHeight + 0.1, 1]} />
        <meshBasicMaterial color={'green'} />
      </mesh>
      <mesh
        position={[0, structHeight / 1.75, -0.5]}
        rotation={[Math.PI * 0.5, 0, -Math.PI * 0.5]}
      >
        <boxGeometry args={[1, structWidth * 2 + 2, 1.05]} />
        <meshBasicMaterial color={'orange'} />
      </mesh>
      <mesh
        position={[0, -structHeight / 1.75, 0]}
        rotation={[Math.PI * 0.5, 0, -Math.PI * 0.5]}
      >
        <boxGeometry args={[5, structWidth * 2 + 2, 1.05]} />
        <meshBasicMaterial color={'red'} />
      </mesh>
    </>
  )
}

/* export function Floor() {
  return (
    <mesh rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -4, -12]}>
      <boxGeometry args={[25, 25, 1]} />
      <meshNormalMaterial attach="material" />
    </mesh>
  )
}
 */

//<iframe title="myFrame" src="https://bruno-simon.com/html/" />
