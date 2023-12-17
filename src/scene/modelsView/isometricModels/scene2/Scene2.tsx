import { editable as e } from '@theatre/r3f'
import { useControls } from 'leva'
import React, { useContext } from 'react'
import { useSceneOpacity } from '../../../../hooks/useSceneOpacity'
import { Screens } from './Screens'
import { ShcoolSceneObject } from './ShcoolSceneObject'
import { currentSceneContext } from '../../../../context/CurrentSceneContext'

export const OPTIONS = {
  position2: {
    value: [0.17, 2.1, 2.45],
    step: 0.01,
  },
}

//TODO remove abs
export function Scene2() {
  const { position2 } = useControls('scene2', OPTIONS)
  const opacity = useSceneOpacity('scene2')

  const currentScene = useContext(currentSceneContext)

  return (
    <e.group theatreKey="scene2" position={position2}>
      <ShcoolSceneObject opacity={opacity} />

      {/*    {Math.abs(currentScene) >= 2 && Math.abs(currentScene) <= 2 && (
        <Screens screanOpacity={opacity} />
      )} */}
    </e.group>
  )
}
