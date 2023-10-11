import { getProject } from '@theatre/core'
import Parallax from 'parallax-js'
import React, { useEffect, useRef, useState } from 'react'
import flyThroughState from '../../theater/state.json'

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
    <>
      <div className="whiteNoise"></div>
      <div className="fullwidth" onScroll={handleScroll}>
        <WelcomePage scrollFraction={scrollFraction} />
        <BioPage />
        <LaunchPage />
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
    console.log('🚀 ~ zoomTMP:', zoomTMP)

    const opacityRatio = Math.min(Math.max(scrollFraction - 0.15, 0) * 6, 1)
    const opacityTMP = 1 - opacityRatio
    setOpacity(opacityTMP)
    console.log('🚀 ~ opacityTMP:', opacityTMP)
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
    sheet?.sequence
      .play()
      .finally(() => console.log('Leaving screen animation finished'))
  }

  const [color, setColor] = useState(false)

  useEffect(() => {
    const delay = 2000

    const timer = setTimeout(() => {
      setColor(true)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className="view3" ref={parallaxScene}>
      <div
        className={`"layer img1 " + ${color ? 'imgColor' : 'imgBlack'}`}
        data-depth="1"
      >
        <img
          src="./img/seatCompress.png"
          alt="3d glasses"
          className="glasses"
        />
      </div>
      <div className="layer img2" data-depth="0.75">
        <img
          src="./img/seatCompress.png"
          alt="3d glasses"
          className="glasses1"
        />
      </div>
      <div className="layer img3" data-depth="0.2">
        <img
          src="./img/seatCompress.png"
          alt="3d glasses"
          className="glasses2"
        />
      </div>
      <div className="btnWrapper">
        <div className="btnInnerWrapper">
          <button onClick={handleClick} className="button-92">
            Launch
          </button>
        </div>
      </div>
    </div>
  )
}

function useElementOnScreen(options) {
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  const callbackFunction = (entries) => {
    const [entry] = entries
    setIsVisible(entry.isIntersecting)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options)
    if (containerRef.current) observer.observe(containerRef.current)

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current)
    }
  }, [containerRef, options])

  return [containerRef, isVisible]
}

/* 
"My name is Flavien Roussel, and I am a former student of School 42 Paris. 
After my studies and working for a year and a half as a full-stack 
developer in a company, I made the decision to resign to become a Creative Developer!
To hone my skills, I went through Bruno Simon's training, the "Three.js Journey". 
This is how I introduce my first creative portfolio to you."
*/
