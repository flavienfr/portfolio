import { useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import React from 'react' //TODO remove that
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { useControls } from 'leva'

export function ModelView() {
  const model = useLoader(GLTFLoader, './model/portfolioSquare.glb')

  const bakedTextures = useTexture('./model/baked.jpg')
  bakedTextures.flipY = false

  /*   const { position } = useControls({
    position: {
      value: { x: 0.17, y: -2, z: 2.5 },
      step: 0.01,
    },
  })
 */
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />

      <primitive
        object={model.scene}
        scale={1} /* TODO scale in render */
        position={[0.8, -1.78, 2.45]}
      />

      {/* <mesh
        geometry={model.nodes.Walls1.geometry}
        // position={nodes.Walls1.position}
        position={[0, 0, 3.3]}
        // position={[0, 0, 2.5]}
        scale={1.2}
      >
        <meshBasicMaterial map={bakedTextures} />
      </mesh> */}
    </>
  )
}
