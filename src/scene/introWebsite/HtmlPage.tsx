import { getProject } from '@theatre/core'
import React, { useEffect, useRef, useState } from 'react'
import flyThroughState from '../../theater/state.json'
import Parallax from 'parallax-js'

//TODO
//- adapt font size small screen
//-transition douce zoom & opacity
// dynamic htmlHeight value

export const TOTAL_SLIDE = 3

export function HtmlPage({ htmlHeight }) {
  const [scrollFraction, setScrollFraction] = useState(0)

  const handleScroll = (event) => {
    const scrollTop = event.currentTarget.scrollTop
    const maxScrollTop = event.currentTarget.scrollHeight - htmlHeight
    const scrollFraction = scrollTop / maxScrollTop

    setScrollFraction(scrollFraction)
  }

  return (
    <div className="fullwidth" onScroll={handleScroll}>
      <WelcomePage scrollFraction={scrollFraction} />
      <BioPage />
      <LaunchPage />
    </div>
  )
}

interface WelcomePageProps {
  scrollFraction: number
}

function WelcomePage({ scrollFraction }: WelcomePageProps) {
  const [opacity, setOpacity] = useState(1)
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    const opacityTmp = 1 - scrollFraction / (1 / TOTAL_SLIDE)
    const zoomTMP = 1 + scrollFraction / (1 / TOTAL_SLIDE)
    setOpacity(opacityTmp)
    setZoom(zoomTMP)
  }, [setOpacity, setZoom, scrollFraction])

  return (
    <>
      <div className="h1Wrapper flex items-center justify-center absolute top-[50%] left-[50%] font-['Open_Sans']">
        <h1
          className="text-white text-[10em] translate-x-[-50%] translate-y-[-50%] select-none"
          style={{
            transform: `translate(-50%, -50%) matrix(${zoom}, 0, 0, ${zoom}, 0, 0) `,
            opacity: opacity,
          }}
        >
          Welcome
        </h1>
      </div>
      <div className="view"></div>
    </>
  )
}

function BioPage() {
  return (
    <div className="view">
      <div className="textWrapper">
        <p className="text">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum,
          tempora libero ea laudantium repellendus aperiam cumque? Nobis
          voluptatum unde explicabo fuga accusamus nihil, cum at repellat
          distinctio similique libero hic!
        </p>
      </div>
    </div>
  )
}

function LaunchPage() {
  const sheet = getProject('Fly Through', { state: flyThroughState }).sheet(
    'Scene'
  )
  //const sheet = useCurrentSheet() //TODO why can't use it
  const parallaxScene = useRef()

  useEffect(() => {
    var parallaxInstance = new Parallax(parallaxScene.current, {
      invertX: false,
      invertY: false,
    })
  })

  const handleClick = () => {
    sheet?.sequence
      .play()
      .finally(() => console.log('Leaving screen animation finished'))
  }

  return (
    <div className="view " ref={parallaxScene}>
      <div className="layer img1" data-depth="1">
        <img src="./img/lunette.png" alt="3d glasses" className="glasses" />
      </div>
      <div className="layer img2" data-depth="0.75">
        <img src="./img/lunette.png" alt="3d glasses" className="glasses1" />
      </div>
      <div className="layer img3" data-depth="0.2">
        <img src="./img/lunette.png" alt="3d glasses" className="glasses2" />
      </div>
      <div className="layer" data-depth="0.5">
        <div className="btnWrapper">
          <button onClick={handleClick} className="button-92">
            Launch
          </button>
        </div>
      </div>
    </div>
  )
}
