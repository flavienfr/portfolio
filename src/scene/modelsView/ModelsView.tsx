import React from 'react' //TODO remove that
import { BackgroundModels } from './backGroundModels/BackgroundModels'
import { BackGroundModel } from './backGroundModels/BackGroundModel'
import { Scene1 } from './isometricModels/scene1/Scene1'
import { Scene2 } from './isometricModels/scene2/Scene2'
import { Scene3 } from './isometricModels/scene3/Scene3'

export function ModelsView() {
  return (
    <>
      <BackgroundModels />
      <BackGroundModel />
      <Scene1 />
      <Scene2 />
      <Scene3 />
    </>
  )
}
