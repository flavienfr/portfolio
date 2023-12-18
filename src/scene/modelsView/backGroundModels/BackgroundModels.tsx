import { Physics } from '@react-three/rapier'
import React, { Suspense, useEffect } from 'react'
import { useSceneOpacity } from '../../../hooks/useSceneOpacity'
import { Crane } from './Crane'
import { EndText } from './EndText'
import { Rope } from './Rope'

interface BackGroundModelProps {
  render: boolean
}

export function BackgroundModels({ render }: BackGroundModelProps) {
  const opacity = useSceneOpacity('crane')

  return (
    <>
      <Suspense>
        <Physics gravity={[0, -9.81, 0]} paused={!render}>
          <Crane opacity={opacity} />
          <Rope length={8} opacity={opacity} />
        </Physics>
      </Suspense>

      {render && <EndText opacity={opacity} />}
    </>
  )
}
