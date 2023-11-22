import {
  CuboidCollider,
  RigidBody,
  useSphericalJoint,
} from '@react-three/rapier'
import React, { createRef, useEffect, useRef, useState } from 'react'
import { ROPE_FRAGMENT_SPACE_BETZEEN, ROPE_FRAGMENT_SIZE } from './Rope'
import { useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { useControls } from 'leva'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useSceneOpacity } from '../../../hooks/useSceneOpacity'

const BOX_HEIHGT = 1.25

export interface BuildingIso {
  lastRopeSegment: any
  ropeSegmentNumber: number
  posCable: { x: number; y: number; z: number }
}
export function Building({
  lastRopeSegment,
  ropeSegmentNumber,
  posCable,
}: BuildingIso) {
  const buildingRef = useRef(createRef<RigidBodyApi>())

  useSphericalJoint(buildingRef, lastRopeSegment, [
    [0, BOX_HEIHGT / 2 + ROPE_FRAGMENT_SPACE_BETZEEN / 2, 0],
    [0, -ROPE_FRAGMENT_SIZE / 2 - ROPE_FRAGMENT_SPACE_BETZEEN / 2, 0],
  ])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (buildingRef.current) {
        buildingRef.current.addForce({ x: -1, y: 0, z: -1 }, true)
      }
    }, 1000)

    const timer2 = setTimeout(() => {
      if (buildingRef.current) {
        buildingRef.current.addForce({ x: 1, y: 0, z: 1 }, true)
      }
    }, 2000)

    return () => {
      clearTimeout(timer)
      clearTimeout(timer2)
    }
  }, [])

  const radomePush = () => {
    console.log('Click')
    if (buildingRef.current) {
      buildingRef.current.applyImpulse(
        { x: Math.random() * 0.5, y: 0, z: Math.random() * 0.5 },
        true
      )
    }
  }

  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
    //TODO highlight obj
  }, [hovered])

  return (
    <RigidBody
      colliders="cuboid"
      ref={buildingRef}
      type={'dynamic'}
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
      {/*  <CuboidCollider args={[2.5, 2.5, 2.5]} /> */}
      <mesh
        onClick={radomePush}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/*  <boxGeometry args={[BOX_HEIHGT, BOX_HEIHGT, BOX_HEIHGT]} />
        <meshBasicMaterial wireframe /> */}
        <BuildingModel />
      </mesh>
    </RigidBody>
  )
}

function BuildingModel() {
  const model = useLoader(GLTFLoader, './model/building/scene.glb')
  const bakedTextures = useTexture('./model/building/baked.jpg')
  bakedTextures.flipY = false

  const opacity = useSceneOpacity('crane')

  const { positionBuilding, rotationBuidling } = useControls({
    positionBuilding: {
      value: [-0.22, -1.86, 0.26],
      step: 0.01,
    },
    rotationBuidling: {
      value: [0, 0, 0],
      step: 0.01,
    },
  })

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
