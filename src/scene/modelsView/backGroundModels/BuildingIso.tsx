import { RigidBody, useSphericalJoint } from '@react-three/rapier'
import React, { createRef, useEffect, useRef, useState } from 'react'
import {
  BOX_HEIHGT,
  ROPE_FRAGMENT_SPACE_BETZEEN,
  ROPE_FRAGMENT_SIZE,
} from './Rope'

export interface BuildingIso {
  lastRopeSegment: any
  ropeSegmentNumber: number
}
export function BuildingIso({
  lastRopeSegment,
  ropeSegmentNumber,
}: BuildingIso) {
  //const box = useLoader(GLTFLoader, './model/box.glb')
  const buildingRef = useRef(createRef<RigidBodyApi>())

  useSphericalJoint(buildingRef, lastRopeSegment, [
    [0, BOX_HEIHGT / 2 + ROPE_FRAGMENT_SPACE_BETZEEN / 2, 0],
    [0, -ROPE_FRAGMENT_SIZE / 2 - ROPE_FRAGMENT_SPACE_BETZEEN / 2, 0],
  ])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (buildingRef.current) {
        buildingRef.current.addForce({ x: -2, y: 0, z: -2 }, true)
      }
    }, 1000)

    const timer2 = setTimeout(() => {
      if (buildingRef.current) {
        buildingRef.current.addForce({ x: 2, y: 0, z: 2 }, true)
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
        { x: Math.random() * 2, y: 0, z: Math.random() * 2 },
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
      restitution={10}
      position={[
        0,
        -ropeSegmentNumber *
          (ROPE_FRAGMENT_SIZE + ROPE_FRAGMENT_SPACE_BETZEEN) -
          BOX_HEIHGT / 2 +
          ROPE_FRAGMENT_SIZE / 2,
        0,
      ]}
    >
      <mesh
        onClick={radomePush}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[BOX_HEIHGT, BOX_HEIHGT, BOX_HEIHGT]} />
        <meshBasicMaterial wireframe />
      </mesh>
    </RigidBody>
  )
}
