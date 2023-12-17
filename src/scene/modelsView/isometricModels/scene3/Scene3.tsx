import { editable as e } from '@theatre/r3f'
import { useControls } from 'leva'
import React, { useContext } from 'react'
import { currentSceneContext } from '../../../../context/CurrentSceneContext'
import { useSceneOpacity } from '../../../../hooks/useSceneOpacity'
import { PresentationScreen } from './PresentationScreen'
import { UpslideSceneObject } from './UpslideSceneObject'

const OPTIONS = {
  position3: {
    value: [0.17, 6.2, 2.45],
    step: 0.01,
  },
}

export function Scene3() {
  const { position3 } = useControls('isometric', OPTIONS)
  const opacity = useSceneOpacity('scene3')

  const currentScene = useContext(currentSceneContext)

  return (
    <e.group theatreKey="scene3" position={position3}>
      <UpslideSceneObject opacity={opacity} />

      {/*   {Math.abs(currentScene) >= 3 && Math.abs(currentScene) < 4 && (
        <PresentationScreen screanOpacity={opacity} />
      )} */}
    </e.group>
  )
}
