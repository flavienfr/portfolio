import { useGLTF, useTexture } from '@react-three/drei'
import { ThreeEvent } from '@react-three/fiber'
import { useControls } from 'leva'
import React from 'react' //TODO remove that
import { SPEED_SPIN_FACTOR } from '../App.js'

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
