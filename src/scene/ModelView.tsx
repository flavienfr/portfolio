import { useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import React from 'react' //TODO remove that
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { useControls } from 'leva'

export function ModelView() {
  const model = useLoader(GLTFLoader, './model/portfolioScreen.glb')

  const bakedTextures = useTexture('./model/baked.jpg')
  bakedTextures.flipY = false

  /*  const { position } = useControls({
    position: {
      value: { x: 0.14, y: -2.22, z: 2.44 },
      step: 0.01,
    },
  }) */

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />

      <primitive
        object={model.scene}
        scale={1} /* TODO scale to 1.10 in blender on join obj */
        position={[0.14, -2.22, 2.44]}
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
