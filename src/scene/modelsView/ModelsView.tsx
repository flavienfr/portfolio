import React, { useContext } from 'react'
import { currentSceneContext } from '../../context/CurrentSceneContext'
import { BackGroundModel } from './backGroundModels/BackGroundModel'
import { BackgroundModels } from './backGroundModels/BackgroundModels'
import { Scene1 } from './isometricModels/scene1/Scene1'
import { Scene2 } from './isometricModels/scene2/Scene2'
import { Scene3 } from './isometricModels/scene3/Scene3'

//TODO optimise rendu progressif des scène
export function ModelsView() {
  const currentScene = useContext(currentSceneContext)

  return (
    <>
      {/* <BackGroundModel /> */}
      {/* <Scene1 /> */}
      {Math.abs(currentScene) >= 1.5 && <Scene2 />}
      {Math.abs(currentScene) >= 2 && <Scene3 />}
      {Math.abs(currentScene) >= 3 && <BackgroundModels />}
    </>
  )
}
