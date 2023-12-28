import { editable as e } from '@theatre/r3f'
import { useControls } from 'leva'
import React from 'react'
import { useSceneOpacity } from '../../../../hooks/useSceneOpacity'
import { useFadeScreenScene } from '../../../../hooks/useFadeScreenScene'
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
  const { screanOpacity, showScreen } = useFadeScreenScene(3)

  return (
    <e.group theatreKey="scene3" position={position3}>
      <UpslideSceneObject opacity={opacity} />

      {showScreen && <PresentationScreen screanOpacity={screanOpacity} />}
    </e.group>
  )
}
