import { Box, Cylinder, Sphere } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import {
  Vector3Tuple,
  RigidBodyTypeString,
  RigidBody,
  useSphericalJoint,
  RapierRigidBody,
} from '@react-three/rapier'
import { useControls } from 'leva'
import React, {
  forwardRef,
  ReactNode,
  useRef,
  useImperativeHandle,
  createRef,
  RefObject,
  useEffect,
} from 'react'
import { Quaternion } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const ROPE_FRAGMENT_SPACE_BETZEEN = 0.15
const ROPE_FRAGMENT_SIZE = 2
const ROPE_FRAGMENT_DIAMETER = 0.1
const ROPE_FRAGMENT_RESOLUTION = 10 //TODO TO HIGHT
const BOX_HEIHGT = 1

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
    [0, ROPE_FRAGMENT_SIZE / 2 + ROPE_FRAGMENT_SPACE_BETZEEN / 2, 0],
    [0, -ROPE_FRAGMENT_SIZE / 2 - ROPE_FRAGMENT_SPACE_BETZEEN / 2, 0],
  ])
  return null
}

export const Rope = (props: { length: number; obj }) => {
  const refs = useRef(
    Array.from({ length: props.length }).map(() => createRef<RigidBodyApi>())
  )

  /* useFrame(() => {
    const now = performance.now()
    refs.current[0].current?.setNextKinematicRotation(new Quaternion(0, 0, 2))
  }) */

  const box = useLoader(GLTFLoader, './model/box.glb')
  const buildingRef = useRef(createRef<RigidBodyApi>())

  useSphericalJoint(buildingRef, refs.current[refs.current.length - 1], [
    [0, BOX_HEIHGT / 2 + ROPE_FRAGMENT_SPACE_BETZEEN / 2, 0],
    [0, -ROPE_FRAGMENT_SIZE / 2 - ROPE_FRAGMENT_SPACE_BETZEEN / 2, 0],
  ])

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

      <RigidBody
        colliders="cuboid"
        ref={buildingRef}
        type={'dynamic'}
        position={[
          0,
          -refs.current.length *
            (ROPE_FRAGMENT_SIZE + ROPE_FRAGMENT_SPACE_BETZEEN) -
            BOX_HEIHGT / 2 +
            ROPE_FRAGMENT_SIZE / 2,
          0,
        ]}
      >
        {/* -refs.current.length *
            (ROPE_FRAGMENT_SIZE + ROPE_FRAGMENT_SPACE_BETZEEN)  */}
        {/* <primitive object={box.scene} scale={1} ref={buildingRef} /> */}
        <mesh>
          <boxGeometry args={[BOX_HEIHGT, BOX_HEIHGT, BOX_HEIHGT]} />
          <meshBasicMaterial wireframe />
        </mesh>
      </RigidBody>

      {refs.current.map(
        (ref, i) =>
          i > 0 && (
            <RopeJoint a={refs.current[i]} b={refs.current[i - 1]} key={i} />
          )
      )}
    </group>
  )
}
