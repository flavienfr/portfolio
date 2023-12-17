import { Physics } from '@react-three/rapier'
import React, { Suspense } from 'react'
import { useSceneOpacity } from '../../../hooks/useSceneOpacity'
import { Crane } from './Crane'
import { EndText } from './EndText'
import { Rope } from './Rope'

export function BackgroundModels() {
  const opacity = useSceneOpacity('crane')

  return (
    <>
      {/*    <Suspense>
        <Physics gravity={[0, -9.81, 0]}>
          <Crane opacity={opacity} />
          <Rope length={8} opacity={opacity} />
        </Physics>
      </Suspense>
 */}
      <EndText opacity={opacity} />
    </>
  )
}
