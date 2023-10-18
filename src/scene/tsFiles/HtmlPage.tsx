import { getProject } from '@theatre/core'
import Parallax from 'parallax-js'
import React, { useEffect, useRef, useState } from 'react'
import flyThroughState from '../../theater/state.json'
import { useElementOnScreen } from '../../hooks/useElementOnScreen'
import { Scrollbar } from 'smooth-scrollbar-react'

//TODO
//- adapt font size small screen
//-transition douce zoom & opacity
// SLow paralax effect in 4K

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
    <>
      <div className="whiteNoise"></div>
      <div className="fullwidth" onScroll={handleScroll}>
        {/* <Scrollbar
        className="fullwidth"
        plugins={{
          overscroll: {
            effect: 'bounce',
          },
        }}
      > */}
        <WelcomePage scrollFraction={scrollFraction} />
        <BioPage />
        <LaunchPage />
        {/*   </Scrollbar> */}
      </div>
    </>
  )
}

interface WelcomePageProps {
  scrollFraction: number
}

function WelcomePage({ scrollFraction }: WelcomePageProps) {
  const [opacity, setOpacity] = useState(1)
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    const zoomRatio = Math.min(scrollFraction * 3, 1)
    const zoomTMP = 1 + zoomRatio * 0.35
    setZoom(zoomTMP)

    const opacityRatio = Math.min(Math.max(scrollFraction - 0.15, 0) * 6, 1)
    const opacityTMP = 1 - opacityRatio
    setOpacity(opacityTMP)
  }, [setOpacity, setZoom, scrollFraction])

  return (
    <>
      <div className="h1Wrapper">
        <h1
          style={{
            transform: `matrix(${zoom}, 0, 0, ${zoom}, 0, 0) `,
            opacity: opacity,
          }}
        >
          Welcome
        </h1>
      </div>
      <div
        id="scroll-wrapper"
        style={{
          opacity: opacity,
        }}
      >
        <div id="scroll-wrapper-inner">
          <div id="scroll-title">Scroll</div>
          <div id="scroll-down"></div>
        </div>
      </div>
      <div className="view1"></div>
    </>
  )
}

function BioPage() {
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  })

  /*   useEffect(() => {
    console.log(isVisible ? 'visible' : 'not visible')
  }) */

  return (
    <div className="view2">
      <div className="textWrapper">
        <div ref={containerRef}>
          <div className={isVisible ? 'show s1' : 'unShow'}>
            My name is Flavien Roussel, I am a former student of School 42
          </div>
          <div className={isVisible ? 'show s2' : 'unShow'}>
            Paris. After my studies and working for a year and a half as a
          </div>
          <div className={isVisible ? 'show s3' : 'unShow'}>
            full-stack developer in a company, I made the decision to resign to
          </div>
          <div className={isVisible ? 'show s4' : 'unShow'}>
            become a Creative Developer! To hone my skills, I went through
          </div>
          <div className={isVisible ? 'show s5' : 'unShow'}>
            Bruno Simon's training, the "Three.js Journey". This is how I
          </div>
          <div className={isVisible ? 'show s6' : 'unShow'}>
            introduce my first creative portfolio to you.
          </div>
        </div>
      </div>
    </div>
  )
}

function LaunchPage() {
  const [color, setColor] = useState(false)

  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  })

  const sheet = getProject('Fly Through', { state: flyThroughState }).sheet(
    'Scene'
  )
  //const sheet = useCurrentSheet() //TODO why can't use it
  const parallaxScene = useRef()

  useEffect(() => {
    if (!parallaxScene || !parallaxScene.current) return
    new Parallax(parallaxScene.current, {
      invertX: false,
      invertY: false,
    })
  }, [])

  const handleClick = () => {
    setColor(true)
    /* sheet?.sequence
      .play()
      .finally(() => console.log('Leaving screen animation finished')) */
  }

  useEffect(() => {
    console.log(isVisible)
  }, [isVisible])

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
