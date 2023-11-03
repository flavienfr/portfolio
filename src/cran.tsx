import { Box, Cylinder, Sphere } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import {
  Vector3Tuple,
  RigidBodyTypeString,
  RigidBody,
  useSphericalJoint,
  RapierRigidBody,
} from '@react-three/rapier'
import React, {
  forwardRef,
  ReactNode,
  useRef,
  useImperativeHandle,
  createRef,
  RefObject,
} from 'react'
import { Quaternion } from 'three'
const ROPE_FRAGMENT_SIZE = 10

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
      <Cylinder args={[1, 1, ROPE_FRAGMENT_SIZE - 1, 20]}>
        <meshBasicMaterial
          color={type === 'kinematicPosition' ? 'red' : 'blue'}
        />
      </Cylinder>
    </RigidBody>
  )
})

/**
 * We can wrap our hook in a component in order to initiate
 * them conditionally and dynamically
 */
const RopeJoint = ({
  a,
  b,
}: {
  a: RefObject<RapierRigidBody>
  b: RefObject<RapierRigidBody>
}) => {
  useSphericalJoint(a, b, [
    [0, ROPE_FRAGMENT_SIZE / 2, 0],
    [0, -ROPE_FRAGMENT_SIZE / 2, 0],
  ])
  return null
}

export const Rope = (props: { length: number }) => {
  const refs = useRef(
    Array.from({ length: props.length }).map(() => createRef<RigidBodyApi>())
  )

  /*  useFrame(() => {
    const now = performance.now()
    refs.current[0].current?.setNextKinematicRotation(new Quaternion(0, 0, 0))
  }) */

  return (
    <group>
      {refs.current.map((ref, i) => (
        <RopeSegment
          ref={ref}
          key={i}
          position={[0, i * ROPE_FRAGMENT_SIZE, 0]}
          type={i === 0 ? 'kinematicPosition' : 'dynamic'}
        />
      ))}
      {/**
       * Multiple joints can be initiated dynamically by
       * mapping out wrapped components containing the hooks
       */}
      {refs.current.map(
        (ref, i) =>
          i > 0 && (
            <RopeJoint a={refs.current[i]} b={refs.current[i - 1]} key={i} />
          )
      )}
    </group>
  )
}
