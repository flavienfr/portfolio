import React, { useEffect, useState } from 'react'

interface WelcomePageProps {
  scrollFraction: number
}
export function WelcomePage({ scrollFraction }: WelcomePageProps) {
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
