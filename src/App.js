import { Html, useHelper } from '@react-three/drei'
import { useLoader, useThree } from '@react-three/fiber'
import { CuboidCollider, Debug, Physics, RigidBody } from '@react-three/rapier'
import { Suspense, useEffect, useRef, useState } from 'react'
import { DirectionalLightHelper } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FOV } from '.'

export default function App() {
  /*   const directionalLight = useRef(null)
  useHelper(directionalLight, DirectionalLightHelper, 1, 'red')
  const directionalLight2 = useRef(null)
  useHelper(directionalLight2, DirectionalLightHelper, 1, 'blue')
 */
  return (
    <>
      <Physics>
        <Debug />
        <WebPage />
        {/* <NeonModel /> */}
        <Floor />
        {/*         <directionalLight
          ref={directionalLight}
          position={[20, 20, -20]}
          color="red"
          intensity={0.1}
        />
        <directionalLight
          ref={directionalLight2}
          position={[15, 20, -20]}
          color="blue"
          intensity={0.1}
        /> */}
      </Physics>
    </>
  )
}

/* function LampModel() {
  const { nodes, materials } = useLoader(GLTFLoader, '/model/neon_1/scene.gltf')
  console.log('🚀 ~ file: App.js:23 ~ LampModel ~ materials', materials)

  return (
    <mesh geometry={nodes.Object_4.geometry} material={materials['LichtFront']}>

    </mesh>
  )
} */

function NeonModel() {
  const gltf = useLoader(GLTFLoader, '/model/neon_1/scene.gltf')
  console.log('🚀 ~ file: App.js:34 ~ NeonModel ~ gltf', gltf)
  return (
    <Suspense fallback={null}>
      <primitive object={gltf.scene} />
    </Suspense>
  )
}

function WebPage() {
  const webScreen = useRef()
  const { camera, viewport } = useThree()
  const [planeInfo, setPlaneInfo] = useState({ width: 1, height: 1 })

  useEffect(() => {
    const cameraZ = camera.position.z
    const planeZ = 682
    const distance = Math.abs(cameraZ - planeZ)
    const aspect = viewport.width / viewport.height
    const vFov = (FOV * Math.PI) / 180
    const height = 2 * Math.tan(vFov / 2) * distance
    const width = height * aspect
    setPlaneInfo({ height, width })
  }, [setPlaneInfo, viewport, camera])

  useEffect(() => {
    setTimeout(() => {
      webScreen.current.applyImpulse({ x: 0, y: 0, z: -10 })
    }, 1000)
  }, [webScreen])

  /*   useFrame((state, delta) => {
    webScreen.current.position.z -= delta
  }) */

  return (
    <RigidBody colliders={false} ref={webScreen}>
      <CuboidCollider args={[0.5, 1.5, 0.5]} position={[0, -2, 0]} />

      <mesh name="Screen" position={[0, 0, -0.5]} /* ref={webScreen} */>
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
    </RigidBody>
  )
}

function Floor() {
  return (
    <RigidBody type="fixed">
      <mesh rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -4, 0]}>
        <boxGeometry args={[25, 25, 1]} />
        <meshNormalMaterial attach="material" />
      </mesh>
    </RigidBody>
  )
}
