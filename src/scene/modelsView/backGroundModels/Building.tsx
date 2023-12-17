import { useGLTF, useTexture } from '@react-three/drei'
import { RigidBody, useSphericalJoint } from '@react-three/rapier'
import { useControls } from 'leva'
import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { currentSceneContext } from '../../../context/CurrentSceneContext'
import { ROPE_FRAGMENT_SIZE, ROPE_FRAGMENT_SPACE_BETZEEN } from './Rope'

const BOX_HEIHGT = 1.25

export interface BuildingIso {
  lastRopeSegment: any
  ropeSegmentNumber: number
  posCable: { x: number; y: number; z: number }
  opacity: number
}
export function Building({
  lastRopeSegment,
  ropeSegmentNumber,
  posCable,
  opacity,
}: BuildingIso) {
  const buildingRef = useRef(createRef<RigidBodyApi>())

  useSphericalJoint(buildingRef, lastRopeSegment, [
    [0, BOX_HEIHGT / 2 + ROPE_FRAGMENT_SPACE_BETZEEN / 2, 0],
    [0, -ROPE_FRAGMENT_SIZE / 2 - ROPE_FRAGMENT_SPACE_BETZEEN / 2, 0],
  ])

  const currentScene = useContext(currentSceneContext)

  /* useEffect(() => {
    if (currentScene !== 3) return

    if (buildingRef.current) {
      buildingRef.current.addForce({ x: -0.5, y: 0, z: -0.5 }, true)
    }

    const timer = setTimeout(() => {
      if (buildingRef.current) {
        try {
          buildingRef.current.addForce({ x: 0.5, y: 0, z: 0.5 }, true)
        } catch {}
      }
    }, 1000)
  }, [currentScene]) */

  const radomePush = () => {
    /*  if (buildingRef.current) {
      buildingRef.current.applyImpulse(
        { x: Math.random() * 0.5, y: 0, z: Math.random() * 0.5 },
        true
      )
    } */
  }

  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  return (
    <RigidBody
      colliders="cuboid"
      ref={buildingRef}
      type={'kinematicPosition'}
      restitution={0}
      density={0.001}
      linearDamping={0.1}
      canSleep={false}
      position={[
        posCable.x,
        posCable.y -
          ropeSegmentNumber *
            (ROPE_FRAGMENT_SIZE + ROPE_FRAGMENT_SPACE_BETZEEN) -
          BOX_HEIHGT / 2 +
          ROPE_FRAGMENT_SIZE / 2,
        posCable.z,
      ]}
    >
      <mesh
        onClick={radomePush}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <BuildingModel opacity={opacity} />
      </mesh>
    </RigidBody>
  )
}

const OPTIONS = {
  positionBuilding: {
    value: [-0.22, -1.86, 0.26],
    step: 0.01,
  },
  rotationBuidling: {
    value: [0, 0, 0],
    step: 0.01,
  },
}

function BuildingModel({ opacity }: { opacity: number }) {
  const model = useGLTF('./model/building/scene.glb')
  const bakedTextures = useTexture('./model/building/baked.jpg')
  bakedTextures.flipY = false

  const { positionBuilding, rotationBuidling } = useControls(
    'building',
    OPTIONS
  )

  return (
    <mesh
      geometry={model.nodes.building.geometry}
      position={positionBuilding}
      rotation={rotationBuidling}
    >
      <meshBasicMaterial map={bakedTextures} transparent opacity={opacity} />
    </mesh>
  )
}

useGLTF.preload('./model/building/scene.glb')
useTexture.preload('./model/building/baked.jpg')
