import React, { useEffect, useState } from 'react'

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
  })

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
  return (
    <div className="view btnWrapper">
      <button className="button-92" role="button">
        Launch
      </button>
    </div>
  )
}
