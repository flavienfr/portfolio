import React, { useEffect, useState } from 'react'

//TODO
//- adapt font size small screen

//Paire number only
const FIRST_STAGE_SCROLLS = 8

export function HtmlPage() {
  const [wheelValue, setWheelValue] = useState(0)
  const [opacity, setOpacity] = useState(1)

  const handleOnWheel = (e) => {
    const scrollDirection = e.deltaY > 0 ? 1 : -1

    const nextWheelValue =
      wheelValue + scrollDirection > 0 ? wheelValue + scrollDirection : 0
    if (nextWheelValue === wheelValue) return
    setWheelValue(nextWheelValue)

    if (
      nextWheelValue <= FIRST_STAGE_SCROLLS &&
      wheelValue !== FIRST_STAGE_SCROLLS
    ) {
      setOpacity(opacity - scrollDirection * (1 / FIRST_STAGE_SCROLLS))
    }
  }

  return (
    <div onWheel={handleOnWheel}>
      <div className="flex items-center justify-center fixed top-[50%] left-[50%]">
        <h1
          className="text-white text-[10em] translate-x-[-50%] translate-y-[-50%]"
          style={{
            transform: `translate(-50%, -50%) matrix(1, 0, 0, 1, 0, 0) `,
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
