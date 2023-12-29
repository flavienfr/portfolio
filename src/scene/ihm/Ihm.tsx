import React, { useContext, useState } from 'react'
import { sceneContext } from '../../context/SceneContext.tsx'

const SCENE_NAME = ['', 'Welcome', 'School 42', 'Company UpSlide', '']

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

  return (
    <div className="Ihm">
      <div className="buttons">
        <button
          onClick={handleClickUp}
          style={{ opacity: upOpacity, transition: ' opacity 1s' }}
        >
          Up
        </button>
        <button
          onClick={handleClickDown}
          style={{ opacity: downOpacity, transition: ' opacity 1s' }}
        >
          Down
        </button>
      </div>
      <div className="sceneTitle">{SCENE_NAME[scene]}</div>
    </div>
  )
}
