import React from 'react' //TODO remove that
import { Html } from '@react-three/drei'
import { useControls } from 'leva'

const OPTIONS = {
  textPos: {
    value: [-14, 20, -10],
    step: 1,
  },
}

interface EndTextProps {
  opacity: number
}

export function EndText({ opacity }: EndTextProps) {
  const { textPos } = useControls('text', OPTIONS)

  return (
    <>
      {/* <mesh position={textPos}>
        <boxGeometry />
      </mesh> */}
      <Html
        position={textPos}
        wrapperClass="endTextWrapper"
        style={{ opacity: opacity }}
      >
        <h1>To be continued</h1>
      </Html>
    </>
  )
}
