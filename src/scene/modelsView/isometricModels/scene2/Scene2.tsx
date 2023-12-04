import { editable as e } from '@theatre/r3f'
import { useControls } from 'leva'
import React from 'react'
import { useSceneOpacity } from '../../../../hooks/useSceneOpacity'
import { Screens } from './Screens'
import { ShcoolSceneObject } from './ShcoolSceneObject'

export const OPTIONS = {
  position2: {
    value: [0.17, 2.1, 2.45],
    step: 0.01,
  },
}

export function Scene2() {
  const { position2 } = useControls('scene2', OPTIONS)
  const opacity = useSceneOpacity('scene2')

  return (
    <e.group theatreKey="scene2" position={position2}>
      <Screens screanOpacity={opacity} />
      <ShcoolSceneObject opacity={opacity} />
    </e.group>
  )
}
