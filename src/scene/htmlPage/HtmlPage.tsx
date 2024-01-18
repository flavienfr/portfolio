import React, { useState } from 'react'
import { BioPage } from './BioPage'
import { LaunchPage } from './LaunchPage'
import { WelcomePage } from './WelcomePage'
import { MAX_SCREEN_HEIGHT } from '../WebPage'

export function HtmlPage({ smallRatio, setScene }) {
  const [scrollFraction, setScrollFraction] = useState(0)

  const handleScroll = (event) => {
    const scrollTop = event.currentTarget.scrollTop
    const maxScrollTop = event.currentTarget.scrollHeight - MAX_SCREEN_HEIGHT
    const scrollFraction = scrollTop / maxScrollTop
    setScrollFraction(scrollFraction)
  }

  return (
    <>
      <div className="whiteNoise"></div>
      <div className="fullwidth" onScroll={handleScroll}>
        <WelcomePage scrollFraction={scrollFraction} />
        <BioPage scrollFraction={scrollFraction} />
        <LaunchPage smallRatio={smallRatio} setScene={setScene} />
      </div>
    </>
  )
}
