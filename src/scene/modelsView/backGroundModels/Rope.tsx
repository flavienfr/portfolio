import { Cylinder } from '@react-three/drei'
import {
  RapierRigidBody,
  RigidBody,
  RigidBodyTypeString,
  Vector3Tuple,
  useSphericalJoint,
} from '@react-three/rapier'
import { useControls } from 'leva'
import React, { RefObject, createRef, forwardRef, useRef } from 'react'
import { useSceneOpacity } from '../../../hooks/useSceneOpacity'
import { Building } from './Building'

export const ROPE_FRAGMENT_SPACE_BETZEEN = 0.05
export const ROPE_FRAGMENT_SIZE = 0.5
const ROPE_FRAGMENT_DIAMETER = 0.1
const ROPE_FRAGMENT_RESOLUTION = 10 //TODO Too HIGHT

const RopeSegment = forwardRef<
  RapierRigidBody,
  {
    position: Vector3Tuple
    type: RigidBodyTypeString
  }
>(({ position, type }, ref) => {
  const opacity = useSceneOpacity('crane') //TODO one call au lieu de 3

  return (
    <RigidBody
      colliders="cuboid"
      restitution={0}
      linearDamping={0.9}
      ref={ref}
      type={type}
      position={position}
    >
      <Cylinder
        args={[
          ROPE_FRAGMENT_DIAMETER,
          ROPE_FRAGMENT_DIAMETER,
          ROPE_FRAGMENT_SIZE,
          ROPE_FRAGMENT_RESOLUTION,
        ]}
      >
        <meshBasicMaterial
          color={type === 'kinematicPosition' ? '#38383A' : '#D03030'}
          transparent
          opacity={opacity}
        />
      </Cylinder>
    </RigidBody>
  )
})

const RopeJoint = ({
  a,
  b,
}: {
  a: RefObject<RapierRigidBody>
  b: RefObject<RapierRigidBody>
}) => {
  useSphericalJoint(a, b, [
    [0, ROPE_FRAGMENT_SIZE / 2 + ROPE_FRAGMENT_SPACE_BETZEEN / 2, 0],
    [0, -ROPE_FRAGMENT_SIZE / 2 - ROPE_FRAGMENT_SPACE_BETZEEN / 2, 0],
  ])
  return null
}

export function Rope({ length }: { length: number }) {
  const refs = useRef(
    Array.from({ length: length }).map(() => createRef<RigidBodyApi>())
  )

  const { posCable } = useControls('building', {
    posCable: {
      value: { x: 2.67, y: 20, z: 3.53 },
      step: 0.01,
    },
  })

  return (
    <group>
      {refs.current.map((ref, i) => (
        <RopeSegment
          ref={ref}
          key={i}
          position={[
            posCable.x,
            posCable.y - i * (ROPE_FRAGMENT_SIZE + ROPE_FRAGMENT_SPACE_BETZEEN),
            posCable.z,
          ]}
          type={i === 0 ? 'kinematicPosition' : 'dynamic'}
        />
      ))}

      <Building
        lastRopeSegment={refs.current[refs.current.length - 1]}
        ropeSegmentNumber={refs.current.length}
        posCable={posCable}
      />

      {refs.current.map(
        (ref, i) =>
          i > 0 && (
            <RopeJoint a={refs.current[i]} b={refs.current[i - 1]} key={i} />
          )
      )}
    </group>
  )
}
