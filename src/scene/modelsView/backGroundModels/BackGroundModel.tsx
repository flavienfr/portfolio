import React from 'react' //TODO remove that
import { useControls } from 'leva'
import { useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const OPTIONS = {
  posSol: {
    value: [-3, 22.5, 7.4],
    step: 0.1,
  },
  rotSol: {
    value: [0, -Math.PI, 0],
    step: 0.01,
  },
}

export function BackGroundModel() {
  const { posSol, rotSol } = useControls('sol', OPTIONS)
  const map = useTexture('./model/background/texture.png')
  const { nodes } = useLoader(GLTFLoader, './model/background/scene.glb')

  return (
    <mesh position={posSol} rotation={rotSol} geometry={nodes.cube.geometry}>
      <meshMatcapMaterial matcap={map} />
    </mesh>
  )
}
