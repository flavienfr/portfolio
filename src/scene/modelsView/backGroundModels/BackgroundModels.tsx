import { Physics } from '@react-three/rapier'
import React, { Suspense } from 'react' //TODO remove that
import { Rope } from './Rope'
import { Crane } from './Crane'
import { useSceneOpacity } from '../../../hooks/useSceneOpacity'
import { Html } from '@react-three/drei'

//TODO remove debug

export function BackgroundModels() {
  const opacity = useSceneOpacity('crane')

  return (
    <>
      <Suspense>
        <Physics /* debug */ gravity={[0, -9.81, 0]}>
          <Crane opacity={opacity} />
          <Html>
            <h1>Construction in progress</h1>
          </Html>
          <Rope length={8} />
        </Physics>
      </Suspense>
    </>
  )
}
