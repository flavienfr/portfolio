import { Html } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { Debug, Physics } from '@react-three/rapier'
import { useEffect, useRef, useState } from 'react'
import { FOV } from '.'

export default function App() {
  return (
    <>
      <Physics>
        <Debug />
        <WebPage />
        <Floor />
      </Physics>
    </>
  )
}

function WebPage() {
  const webScreenRef = useRef()
  const { camera, viewport } = useThree()
  const [planeInfo, setPlaneInfo] = useState({ width: 1, height: 1 })

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

  useEffect(() => {
    /*  setTimeout(() => {
      webScreen.current.applyImpulse({ x: 0, y: 0, z: -10 })
    }, 1000) */
  }, [webScreenRef])

  return (
    <mesh name="Screen" position={[0, 0, -0.5]} ref={webScreenRef}>
      <Html
        /*  occlude */
        transform={true}
        wrapperClass="htmlScreen"
        distanceFactor={3.25}
        style={{
          width: planeInfo.width,
          height: planeInfo.height,
        }}
      >
        <iframe title="myFrame" src="https://bruno-simon.com/html/" />
      </Html>
    </mesh>
  )
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -4, -12]}>
      <boxGeometry args={[25, 25, 1]} />
      <meshNormalMaterial attach="material" />
    </mesh>
  )
}
