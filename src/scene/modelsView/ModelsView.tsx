import React, { Suspense } from 'react' //TODO remove that
import { BackGroundModel } from './backGroundModels/BackGroundModel'
import { BackgroundModels } from './backGroundModels/BackgroundModels'
import { Scene1 } from './isometricModels/scene1/Scene1'
import { Scene2 } from './isometricModels/scene2/Scene2'
import { Scene3 } from './isometricModels/scene3/Scene3'
import { Loader } from '@react-three/drei'

export function ModelsView() {
  return (
    <>
      <BackGroundModel />
      <Scene1 />
      <Scene2 />
      <Scene3 />
      <BackgroundModels />
    </>
  )
}
