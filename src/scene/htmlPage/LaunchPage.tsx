import { getProject } from '@theatre/core'
import Parallax from 'parallax-js'
import React, { useEffect, useRef, useState } from 'react'
import flyThroughState from '../../theater/state.json'
import { LEAVING_SCREEN_ANIMATION } from '../WebPage'

const LEAVING_SCREEN_DELAY_MS = 2000

export function LaunchPage() {
  const parallaxScene = useRef()

  useEffect(() => {
    if (!parallaxScene || !parallaxScene.current) return
    new Parallax(parallaxScene.current, {
      invertX: false,
      invertY: false,
    })
  }, [])

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
    <div className="view3" ref={parallaxScene}>
      <div
        className={`layer img1 + ${color ? 'imgColor' : 'imgBlack'}`}
        data-depth="1"
      >
        <img
          src="./img/seatCompress.png"
          alt="3d glasses"
          className="glasses"
        />
      </div>

      <div
        className={`layer img2  + ${color ? 'imgColor' : 'imgBlack'}`}
        data-depth="0.6"
      >
        <img
          src="./img/seatCompress.png"
          alt="3d glasses"
          className="glasses1"
        />
      </div>
      <div
        className={`layer 3  + ${color ? 'imgColor' : 'imgBlack'}`}
        data-depth="0.2"
      >
        <img src="./img/arcade.png" alt="3d glasses" className="glasses2" />
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

  setInterval(() => {
    if (opacity <= 0) return
    opacity -= 0.01
    const grainOpacity = opacity * 0.08
    htmlScreen.style.backgroundColor = `rgba(10, 10, 10, ${opacity})`
    htmlScreen.style.setProperty('--backgroundOpacity', grainOpacity.toString())
  }, loopTime)
}
