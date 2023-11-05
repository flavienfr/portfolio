import { Cylinder } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import {
  RapierRigidBody,
  RigidBody,
  RigidBodyTypeString,
  Vector3Tuple,
  useSphericalJoint,
} from '@react-three/rapier'
import React, {
  ReactNode,
  RefObject,
  createRef,
  forwardRef,
  useRef,
} from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { BuildingIso } from './BuildingIso'

export const ROPE_FRAGMENT_SPACE_BETZEEN = 0.05
export const ROPE_FRAGMENT_SIZE = 1
const ROPE_FRAGMENT_DIAMETER = 0.1
const ROPE_FRAGMENT_RESOLUTION = 10 //TODO ToO HIGHT
export const BOX_HEIHGT = 1

const RopeSegment = forwardRef<
  RapierRigidBody,
  {
    position: Vector3Tuple
    component: ReactNode
    type: RigidBodyTypeString
  }
>(({ position, component, type }, ref) => {
  return (
    <RigidBody colliders="cuboid" ref={ref} type={type} position={position}>
      <Cylinder
        args={[
          ROPE_FRAGMENT_DIAMETER,
          ROPE_FRAGMENT_DIAMETER,
          ROPE_FRAGMENT_SIZE,
          ROPE_FRAGMENT_RESOLUTION,
        ]}
      >
        <meshBasicMaterial
          color={type === 'kinematicPosition' ? 'green' : 'pink'}
          wireframe
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

  return (
    <group>
      {refs.current.map((ref, i) => (
        <RopeSegment
          ref={ref}
          key={i}
          position={[
            0,
            -i * (ROPE_FRAGMENT_SIZE + ROPE_FRAGMENT_SPACE_BETZEEN),
            0,
          ]}
          type={i === 0 ? 'kinematicPosition' : 'dynamic'}
        />
      ))}

      <BuildingIso
        lastRopeSegment={refs.current[refs.current.length - 1]}
        ropeSegmentNumber={refs.current.length}
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
