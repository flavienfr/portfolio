import { val } from '@theatre/core'
import React, { useState } from 'react'
import { WelcomePage } from './WelcomePage'
import { BioPage } from './BioPage'
import { LaunchPage } from './LaunchPage'

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
        <WelcomePage scrollFraction={scrollFraction} />
        <BioPage />
        <LaunchPage />
      </div>
    </>
  )
}
