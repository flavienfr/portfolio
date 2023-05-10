import React, { useState } from 'react'

//TODO
//- adapt font size small screen
//-transition douce zoom & opacity

const FIRST_STAGE_ZOOM = 2 //Pair number only
const FIRST_STAGE_OPACITY = 5 //Pair number only
// const FIRST_STAGE_TRANSITION = 2

const START_LEVEL = 0
const FIRST_LEVEL = FIRST_STAGE_ZOOM //TODO mettre -1 iici et parametre en haut
const SECOND_LEVEL = FIRST_LEVEL + FIRST_STAGE_OPACITY
// const THRID_LEVEL = SECOND_LEVEL + FIRST_STAGE_TRANSITION

export function HtmlPage() {
  const [wheelValue, setWheelValue] = useState(0)
  const [opacity, setOpacity] = useState(1)
  const [zoom, setZoom] = useState(1)

  const handleOnWheel = (e) => {
    const scrollDirection = e.deltaY > 0 ? 1 : -1
    const nextWheelValue = wheelValue + scrollDirection
    if (nextWheelValue < 0) return
    setWheelValue(nextWheelValue)
    console.log('nextWheelValue', nextWheelValue)

    if (nextWheelValue >= START_LEVEL && nextWheelValue < SECOND_LEVEL) {
      const ceiling = SECOND_LEVEL - 1
      const range = ceiling - START_LEVEL

      if (nextWheelValue === START_LEVEL) setZoom(1)
      else if (nextWheelValue === ceiling) setZoom(1.2)
      else setZoom(zoom + (0.2 / range) * scrollDirection)
    }
    if (nextWheelValue >= FIRST_LEVEL && nextWheelValue < SECOND_LEVEL) {
      const ceiling = SECOND_LEVEL - 1
      const incrementValue = 1 / (ceiling - FIRST_LEVEL)

      if (nextWheelValue === FIRST_LEVEL) setOpacity(1)
      else if (nextWheelValue === ceiling) setOpacity(0)
      else setOpacity(opacity - incrementValue * scrollDirection)
    }

    /*  if (nextWheelValue <= FIRST_ZOOM_LEVEL) {
      setOpacity(1)
      setZoom(1 + (0.2 / FIRST_STAGE_ZOOM) * nextWheelValue)
    } else if (nextWheelValue <= FIRST_OPACITY_LEVEL) {
      setOpacity2(0)
      if (scrollDirection > 0 && opacity !== 0)
        setOpacity(opacity - 1 / FIRST_STAGE_OPACITY)
      else if (scrollDirection < 0 && opacity !== 1)
        setOpacity(opacity + 1 / FIRST_STAGE_OPACITY)
    } else if (nextWheelValue <= FIRST_TRANSITION_LEVEL) {
      setOpacity(0)
      if (scrollDirection > 0 && opacity !== 1)
        setOpacity2(opacity2 + 1 / FIRST_STAGE_TRANSITION)
      else if (scrollDirection < 0 && opacity2 !== 0)
        setOpacity2(opacity2 - 1 / FIRST_STAGE_TRANSITION)
    } */
    /* if (nextWheelValue <= FIRST_ZOOM_LEVEL) {
      //012
      setOpacity(1)
      setZoom(1 + (0.2 / FIRST_STAGE_ZOOM) * nextWheelValue)
    } else if (nextWheelValue <= FIRST_OPACITY_LEVEL) {
      setOpacity2(0)
      const targetOpacity = scrollDirection > 0 ? 0 : 1
      if (opacity !== targetOpacity)
        setOpacity(opacity - (1 / FIRST_STAGE_OPACITY) * scrollDirection)
    } else if (nextWheelValue <= FIRST_TRANSITION_LEVEL) {
      setOpacity(0)
      const targetOpacity2 = scrollDirection > 0 ? 1 : 0
      if (opacity2 !== targetOpacity2)
        setOpacity2(opacity2 + (1 / FIRST_STAGE_TRANSITION) * scrollDirection)
    } */
  }

  return (
    <div onWheel={handleOnWheel}>
      <div className="flex items-center justify-center fixed top-[50%] left-[50%]">
        <h1
          className="text-white text-[10em] translate-x-[-50%] translate-y-[-50%]"
          style={{
            transform: `translate(-50%, -50%) matrix(${zoom}, 0, 0, ${zoom}, 0, 0) `,
            opacity: opacity,
          }}
        >
          Welcome
        </h1>
      </div>
    </div>
  )
}

{
  /* <div className="border-solid border-4 border-[#421F10] rounded py-10 mb-5 bg-[#EFE2D2]">
<h1 className="font-mono font-bold text-9xl text-center text-[#421F10]">
  Welcome
</h1>
</div>

<div className="flex flex-row">
<div className="border-solid border-4 border-[#421F10] rounded mr-5 bg-[#EFE2D2]">
  <p>
    Hi, my name is Flavien Roussel I am a passionate developer,
    enthusiastic about becoming a creative developer
  </p>
</div>
<div className="border-solid border-4 border-[#421F10] rounded bg-[#EFE2D2]">
  <img src="https://media.licdn.com/dms/image/D4D03AQG8DU6lCbwMnw/profile-displayphoto-shrink_800_800/0/1680097445712?e=1688601600&v=beta&t=3YPut_IRPWFdUfPQAkZX5aDWFBKatR07mI3Cz4Gu0Hw" />
</div>
</div>

<div>
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
  Button
</button>
</div> */
}

/* display: flex;
align-items: center;
justify-content: center;
position: relative; */
