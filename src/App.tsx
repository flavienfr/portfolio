import { useGLTF, useTexture } from '@react-three/drei'
import { ThreeEvent } from '@react-three/fiber'
import { useControls } from 'leva'
import React from 'react' //TODO remove that

//TODO unset onWheel event from this mesh and put it globaly

const SPEED_SPIN_FACTOR = 0.05

export default function App() {
  return (
    <>
      {/* <WebPage /> */}
      <SandPlanet />
    </>
  )
}

function SandPlanet() {
  const { position, wireframe, color, visible } = useControls({
    position: { value: { y: -5.25, z: 5 }, step: 0.01 },
    wireframe: false,
    color: '#ff0000',
    visible: true,
  })

  const { nodes } = useGLTF('./model/sandPlanet/portfolio.glb')
  const sphereTexture = useTexture('./model/sandPlanet/baked.jpg')
  sphereTexture.flipY = false

  const sphereMesh = React.useRef()

  const onWheelHandler = (e: ThreeEvent<WheelEvent>) => {
    const wheelWay = e.deltaY / 100
    sphereMesh.current.rotation.x += SPEED_SPIN_FACTOR * wheelWay
  }

  return (
    <>
      {/* <mesh geometry={nodes.baked.geometry}>
        <meshBasicMaterial map={sphereTexture} />
      </mesh> */}

      <mesh
        position={[0, position.y, position.z]}
        ref={sphereMesh}
        /* onWheel={onWheelHandler} */
        visible={visible}
        geometry={nodes.baked.geometry}
      >
        <meshBasicMaterial map={sphereTexture} wireframe={wireframe} />
      </mesh>
    </>
  )
}
