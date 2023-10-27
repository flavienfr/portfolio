import { getProject } from '@theatre/core'
import Parallax from 'parallax-js'
import React, { useEffect, useRef, useState } from 'react'
import flyThroughState from '../../theater/state.json'
import { LEAVING_SCREEN_ANIMATION } from '../WebPage'

export function LaunchPage() {
  const [color, setColor] = useState(false)

  //const sheet = useCurrentSheet() //TODO why can't use it
  const parallaxScene = useRef()

  useEffect(() => {
    if (!parallaxScene || !parallaxScene.current) return
    new Parallax(parallaxScene.current, {
      invertX: false,
      invertY: false,
    })
  }, [])

  const sheet = getProject('Fly Through', { state: flyThroughState }).sheet(
    'Scene'
  )

  const handleClick = () => {
    setColor(true)
    sheet?.sequence.play({ range: [0, LEAVING_SCREEN_ANIMATION] })
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
          <button onClick={handleClick} className="myButton">
            Launch
          </button>
        </div>
      </div>
    </div>
  )
}
