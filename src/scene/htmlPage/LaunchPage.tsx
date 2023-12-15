import { getProject } from '@theatre/core'
import Parallax from 'parallax-js'
import React, { useEffect, useRef, useState } from 'react'
import flyThroughState from '../../theater/state.json'
import { LEAVING_SCREEN_ANIMATION } from '../../hooks/useScreenResize'

const LEAVING_SCREEN_DELAY_MS = 2000

export function LaunchPage() {
  const parallaxScene = useRef()

  useEffect(() => {
    if (!parallaxScene || !parallaxScene.current) return
    new Parallax(parallaxScene.current, {
      invertX: true,
      invertY: true,
    })
  }, [parallaxScene])

  const [color, setColor] = useState(false)
  const sheet = getProject('Fly Through', { state: flyThroughState }).sheet(
    'Scene'
  )

  const handleClick = () => {
    setColor(true)

    setTimeout(() => {
      decreaseBackgroundOpacity()
      sheet?.sequence.play({ range: [0, LEAVING_SCREEN_ANIMATION] })
    }, 1000)
  }

  return (
    <div className="view3" /* ref={parallaxScene} */>
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
  let htmlScreen = document.querySelector('.htmlScreen') as HTMLInputElement
  let opacity = 1
  const loopTime = LEAVING_SCREEN_DELAY_MS / (1 / 0.01)
  //TODO clear
  setInterval(() => {
    if (opacity <= 0) return
    opacity -= 0.01
    const grainOpacity = opacity * 0.08
    htmlScreen.style.backgroundColor = `rgba(10, 10, 10, ${opacity})`
    htmlScreen.style.setProperty('--backgroundOpacity', grainOpacity.toString())
  }, loopTime)
}
