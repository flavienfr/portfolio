import React, { useContext, useState } from 'react'
import { sceneContext } from '../../context/SceneContext.tsx'

const SCENE_NAME = ['', 'Welcome', 'School 42', 'First job', 'To be continued']

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
      <div
        className="buttons"
        style={{ opacity: scene >= 1 ? 1 : 0, transition: 'opacity 1s' }}
      >
        <div
          className="arrowDown"
          style={{
            opacity: downOpacity,
            cursor: downOpacity === 1 ? 'pointer' : 'auto',
          }}
        >
          <img
            src="./svg/arrowDown.svg"
            onClick={handleClickDown}
            alt="up arrow"
          />
        </div>
        <div
          className={scene === 1 ? 'arrowUpLight' : 'arrowUp'}
          style={{
            opacity: upOpacity,
            cursor: upOpacity === 1 ? 'pointer' : 'auto',
            transform: 'rotate(0.5turn)',
          }}
        >
          <img
            src="./svg/arrowDown.svg"
            onClick={handleClickUp}
            alt="down arrow"
          />
        </div>
      </div>
      <div
        className="sceneTitle"
        style={{ opacity: scene >= 1 ? 1 : 0, transition: 'opacity 1s' }}
      >
        {SCENE_NAME[scene]}
      </div>
    </div>
  )
}
