import React, { useState } from 'react'
import { WelcomePage } from './WelcomePage'
import { BioPage } from './BioPage'
import { LaunchPage } from './LaunchPage'

//TODO
// agrandir l'html une quitter le mode pleinne écran

export function HtmlPage({ htmlHeight, smallRatio }) {
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
        <BioPage scrollFraction={scrollFraction} />
        <LaunchPage smallRatio={smallRatio} />
      </div>
    </>
  )
}
