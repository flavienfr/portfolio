import { getProject } from '@theatre/core'
import React, { useState } from 'react'
import flyThroughState from '../../theater/state.json'
import { LEAVING_SCREEN_ANIMATION } from '../../hooks/useFov'

export function LaunchPage({ smallRatio, setScene }) {
  const [color, setColor] = useState(false)
  const sheet = getProject('Fly Through', { state: flyThroughState }).sheet(
    'Scene'
  )

  const handleClick = () => {
    setColor(true)

    setTimeout(() => {
      decreaseBackgroundOpacity()

      const promise = sheet?.sequence.play({
        range: [0, LEAVING_SCREEN_ANIMATION],
      })
      promise.finally(() => {
        setScene(1)
      })
    }, 1000)
  }

  return (
    <div className="view3">
      {!smallRatio && (
        <div className="fixedView">
          <img
            src="./img/seat.png"
            className={` seat + ${color ? 'imgColor' : 'imgBlack'}`}
            alt="cinema seat"
          />

          <img
            src="./img/arcade.png"
            className={` arcade  + ${color ? 'imgColor' : 'imgBlack'}`}
            alt="arcade machine"
          />

          <img
            src="./img/pong.png"
            className={` pong  + ${color ? 'imgColor' : 'imgBlack'}`}
            alt="old console and tv with pong on it"
          />

          <img
            src="./img/school.png"
            className={` school + ${color ? 'imgColor' : 'imgBlack'}`}
            alt="42 logo"
          />

          <img
            src="./img/cube.png"
            className={` cube  + ${color ? 'imgColor' : 'imgBlack'}`}
            alt="programming logo languages on cubes"
          />

          <img
            src="./img/desk.png"
            className={` desk  + ${color ? 'imgColor' : 'imgBlack'}`}
            alt="desktop with pc"
          />
        </div>
      )}

      <div className="btnWrapper">
        <div className="btnInnerWrapper">
          <button onClick={handleClick} className="myButton" disabled={color}>
            Launch
          </button>
        </div>
      </div>
    </div>
  )
}

function decreaseBackgroundOpacity() {
  document.documentElement.style.setProperty(
    '--backGroundColorOpacity',
    'rgba(10,10,10,0)'
  )
  document.documentElement.style.setProperty('--backgroundBeforeOpacity', '0')
}
