import React from 'react' /
import { Html } from '@react-three/drei'
import { useControls } from 'leva'

const OPTIONS = {
  textPos: {
    value: [-10.31, 14.04, -1.4],
    step: 0.01,
  },
  textRot: {
    value: [0, -0.56, 0],
    step: 0.01,
  },
}

interface EndTextProps {
  opacity: number
}

export function EndText({ opacity }: EndTextProps) {
  const { textPos, textRot } = useControls('text', OPTIONS)

  return (
    <>
      {/*  <mesh position={textPos}>
        <boxGeometry />
      </mesh> */}
      <Html
        position={textPos}
        rotation={textRot}
        wrapperClass="endTextWrapper"
        style={{ opacity: opacity }}
        transform
      >
        <h1>
          To be
          <br />
          continued
        </h1>
      </Html>
    </>
  )
}
