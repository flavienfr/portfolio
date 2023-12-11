import { useGLTF, useTexture } from '@react-three/drei'
import { CuboidCollider, RigidBody } from '@react-three/rapier'
import { useControls } from 'leva'
import React from 'react'

const OPTIONS = {
  positionCrane: {
    value: [10.8, 16.6, 9],
    step: 0.1,
  },
  rotationCrane: {
    value: [0, -0.85, 0],
    step: 0.01,
  },
  posCranCollider: {
    value: [5.2, 21.7, 5.2],
    step: 0.1,
  },

  rotCranCollider: {
    value: [0, -0.6, 0],
    step: 0.1,
  },
}

interface CraneProps {
  opacity: number
}

export function Crane({ opacity }: CraneProps) {
  const model = useGLTF('./model/crane/scene.glb')
  const bakedTextures = useTexture('./model/crane/baked.jpg')
  bakedTextures.flipY = false

  const { positionCrane, rotationCrane, posCranCollider, rotCranCollider } =
    useControls('building', OPTIONS)

  return (
    <RigidBody colliders={false} type={'kinematicPosition'}>
      <CuboidCollider
        args={[10, 1, 1]}
        position={posCranCollider}
        rotation={rotCranCollider}
      />
      <mesh
        geometry={model.nodes.crane.geometry}
        position={positionCrane}
        rotation={rotationCrane}
        scale={0.9}
      >
        <meshBasicMaterial map={bakedTextures} transparent opacity={opacity} />
      </mesh>
    </RigidBody>
  )
}

useGLTF.preload('./model/crane/scene.glb')
useTexture.preload('./model/crane/baked.jpg')
