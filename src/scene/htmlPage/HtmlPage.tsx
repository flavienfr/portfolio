import React, { useState } from 'react'
import { WelcomePage } from './WelcomePage'
import { BioPage } from './BioPage'
import { LaunchPage } from './LaunchPage'

//TODO
// SLow paralax effect in 4K
// agrandir l'html une quitter le mode pleinne écran

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
        <BioPage scrollFraction={scrollFraction} />
        <LaunchPage />
      </div>
    </>
  )
}
