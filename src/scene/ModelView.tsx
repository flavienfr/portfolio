import { useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import React from 'react' //TODO remove that
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export function ModelView() {
  const model = useLoader(GLTFLoader, './model/portfolioSquare.glb')

  const bakedTextures = useTexture('./model/baked.jpg')
  bakedTextures.flipY = false

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />

      <primitive
        object={model.scene}
        scale={1.25} /* TODO scale in render */
        position={[0.17, -2.31, 2.15]}
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
