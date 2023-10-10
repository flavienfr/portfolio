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
            transform: `translate(-50%, -50%) matrix(${zoom}, 0, 0, ${zoom}, 0, 0) `,
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
            I’m a multi-disciplinary art director with a focus on Digital
            Design,
          </div>
          <div className={isVisible ? 'show s2' : 'unShow'}>
            Interaction Design, and Photo Editing. I've been delivering creative
          </div>
          <div className={isVisible ? 'show s3' : 'unShow'}>
            and engaging solutions across brand identity, website, app, and
          </div>
          <div className={isVisible ? 'show s4' : 'unShow'}>
            digital media for almost 10 years. I'm currently working as a
            digital
          </div>
          <div className={isVisible ? 'show s5' : 'unShow'}>
            designer at Studio MINSK, a branding agency with devotion to motion,
            in Amsterdam.
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

  return (
    <div className="view3" ref={parallaxScene}>
      <div className="layer img1" data-depth="1">
        <img src="./img/lunette.png" alt="3d glasses" className="glasses" />
      </div>
      <div className="layer img2" data-depth="0.75">
        <img src="./img/lunette.png" alt="3d glasses" className="glasses1" />
      </div>
      <div className="layer img3" data-depth="0.2">
        <img src="./img/lunette.png" alt="3d glasses" className="glasses2" />
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
Je suis Flavien Roussel, un développeur full stack. Après un an de
            travail, j'ai pris la décision de quitter mon emploi pour voyager,
            me former, et découvrir ma voie. Mon objectif était de devenir le
            meilleur développeur créatif. Mon voyage m'a permis d'acquérir de
            nouvelles compétences et de repousser mes limites. Aujourd'hui, je
            suis fier d'être devenu ce développeur créatif prêt à relever tous
            les défis technologiques. */
