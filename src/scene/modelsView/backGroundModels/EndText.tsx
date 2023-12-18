import { Text } from '@react-three/drei'
import { useControls } from 'leva'
import React from 'react'
import sf from '../../../fonts/SFProText.ttf'

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
      <Text
        position={textPos}
        rotation={textRot}
        fontSize={2.5}
        font={sf}
        lineHeight={1}
        color={'#f5f5f7'}
        maxWidth={10}
      >
        To be continued
      </Text>
    </>
  )
}
