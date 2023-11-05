import { useControls } from 'leva'
import React from 'react' //TODO remove that
import { BackgroundModels } from './backGroundModels/BackgroundModels'
import { Isometric } from './isometricModels/Isometric'

export function ModelsView() {
  return (
    <>
      <BackgroundModels />
      <Isometric />
    </>
  )
}
