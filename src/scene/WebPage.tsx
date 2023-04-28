import { Html } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react' //TODO remove that
import { FOV } from '../index'

export function WebPage() {
  //TODO extract mesh in other component and make conditional render of it
  const webScreenRef = useRef(null)
  const [haveDropPage, setHaveDropPage] = useState(false) //on off destroy
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

  useFrame(() => {
    if (haveDropPage) {
      webScreenRef.current.position.y -=
        0.01 + Math.abs(webScreenRef.current.position.y * 0.02)
      if (webScreenRef.current.position.y < -50) setHaveDropPage(false)
    }
  })

  useEffect(() => {
    setTimeout(() => {
      setHaveDropPage(true)
    }, 5000)
  }, [webScreenRef])

  return (
    <mesh name="Screen" position={[0, 0, -0.5]} ref={webScreenRef}>
      <Html
        // occlude
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

export function Floor() {
  return (
    <mesh rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -4, -12]}>
      <boxGeometry args={[25, 25, 1]} />
      <meshNormalMaterial attach="material" />
    </mesh>
  )
}
