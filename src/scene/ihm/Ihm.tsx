import React, { useContext, useEffect, useState } from 'react'
import { sceneContext } from '../../context/SceneContext.tsx'
import { currentSceneContext } from '../../context/CurrentSceneContext.tsx'

const SCENE_NAME = ['', 'Welcome', 'School 42', 'First job', '...']

export function Ihm() {
  const { scene, setScene } = useContext(sceneContext)
  const [upOpacity, setUpOpacity] = useState(1)
  const [downOpacity, setDownOpacity] = useState(0)

  const handleClickUp = () => {
    if (scene >= 4) return
    const nextScene = scene + 1
    setUpOpacity(nextScene === 4 ? 0 : 1)
    setDownOpacity(nextScene === 1 ? 0 : 1)
    setScene(nextScene)
  }

  const handleClickDown = () => {
    if (scene <= 1) return
    const nextScene = scene - 1
    setUpOpacity(nextScene === 4 ? 0 : 1)
    setDownOpacity(nextScene === 1 ? 0 : 1)
    setScene(nextScene)
  }
  //TODO title en fonction des scène parcourue
  return (
    <div className="Ihm">
      <div className="buttons">
        <div
          className="arrowDown"
          style={{
            opacity: downOpacity,
            transition: ' opacity 1s',
            cursor: downOpacity === 1 ? 'pointer' : 'auto',
          }}
        >
          <img src="./svg/arrowDown.svg" onClick={handleClickDown} />
        </div>
        <div
          className="arrowUp"
          style={{
            opacity: upOpacity,
            transition: ' opacity 1s',
            cursor: upOpacity === 1 ? 'pointer' : 'auto',
            transform: 'rotate(0.5turn)',
          }}
        >
          <img src="./svg/arrowDown.svg" onClick={handleClickUp} />
        </div>
      </div>
      <div className="sceneTitle">{SCENE_NAME[scene]}</div>
    </div>
  )
}
