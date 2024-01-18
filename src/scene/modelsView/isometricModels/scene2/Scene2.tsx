import { editable as e } from '@theatre/r3f'
import { useControls } from 'leva'
import React from 'react'
import { useSceneOpacity } from '../../../../hooks/useSceneOpacity'
import { Screens } from './Screens'
import { ShcoolSceneObject } from './ShcoolSceneObject'
import { useFadeScreenScene } from '../../../../hooks/useFadeScreenScene'
import { ScreenClickedContext } from '../../../../context/screenClikedContext'

export const OPTIONS = {
  position2: {
    value: [0.17, 2.1, 2.45],
    step: 0.01,
  },
}

export function Scene2() {
  const { position2 } = useControls('scene2', OPTIONS)
  const opacity = useSceneOpacity('scene2')
  const { screanOpacity, showScreen } = useFadeScreenScene(2)

  return (
    <ScreenClickedContext>
      <e.group theatreKey="scene2" position={position2}>
        <ShcoolSceneObject opacity={opacity} />
        {showScreen && <Screens screanOpacity={screanOpacity} />}
      </e.group>
    </ScreenClickedContext>
  )
}
