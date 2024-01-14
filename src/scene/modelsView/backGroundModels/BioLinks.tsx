import { Html } from '@react-three/drei'
import { useControls } from 'leva'
import React, { useEffect, useState } from 'react'
import { FOV_RANGE, useFov } from '../../../hooks/useFov'

const LINK = {
  github: 'https://github.com/flavienfr',
  linkedin: 'https://www.linkedin.com/in/flavien-roussel-b8bab8170/',
}

const DST_FACTOR_BIO = {
  high2: 10,
  high1: 9,
  low2: 8,
  low1: 7,
  default: 6,
}

const OPTIONS = {
  bioPos: {
    value: [-10.31, 10, -3.4],
    step: 0.1,
  },
}

export function BioLinks(/* opacity */) {
  const { bioPos } = useControls('text', OPTIONS)
  const { fov } = useFov()
  const [dstFactor, setDstFactor] = useState(DST_FACTOR_BIO.default)

  useEffect(() => {
    if (fov == FOV_RANGE.high2) setDstFactor(DST_FACTOR_BIO.high2)
    else if (fov == FOV_RANGE.high1) setDstFactor(DST_FACTOR_BIO.high1)
    else if (fov == FOV_RANGE.low2) setDstFactor(DST_FACTOR_BIO.low2)
    else if (fov == FOV_RANGE.low1) setDstFactor(DST_FACTOR_BIO.low1)
    else setDstFactor(DST_FACTOR_BIO.default)
  }, [fov])

  return (
    <>
      <Html
        distanceFactor={dstFactor}
        transform
        occlude={false}
        sprite
        position={bioPos}
      >
        <div
          className="bioLinks"
          style={{ flexDirection: fov >= FOV_RANGE.low2 ? 'column' : 'row' }}
        >
          <a
            className="github"
            href={LINK.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="./img/github.png" alt="github link" />
          </a>
          <a
            className="linkedin"
            href={LINK.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="./img/linkedin.png" alt="linkedin link" />
          </a>
        </div>
      </Html>
    </>
  )
}
