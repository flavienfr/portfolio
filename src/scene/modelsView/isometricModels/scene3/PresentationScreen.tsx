import { Html } from '@react-three/drei'
import { useControls } from 'leva'
import React, { useEffect, useRef, useState } from 'react'
import { ScreenProps } from '../scene2/Screens'

const OPTIONS = {
  presPos: {
    value: [0.26, 1.59, 2.44],
    step: 0.001,
  },
  presRot: {
    value: [-0.34, -0.75, -0.24],
    step: 0.001,
  },
}
const upslideVideos = [
  './video/excel-to-powerpoint-link-video.mp4',
  './video/library.mp4',
]
export function PresentationScreen({ screanOpacity }: ScreenProps) {
  const { presPos, presRot } = useControls('screens', OPTIONS)
  const videoRef = useRef(null)
  const [videoIdx, setVideoIdx] = useState(0)

  const videoEnded = (e) => {
    const idx = (videoIdx + 1) % upslideVideos.length
    setVideoIdx(idx)
  }

  useEffect(() => {
    videoRef.current?.load()
  }, [videoIdx])

  return (
    <Html
      wrapperClass="screenWrapper"
      position={presPos}
      rotation={presRot}
      occlude={'blending'}
      transform
      distanceFactor={0.75}
      style={{
        opacity: screanOpacity,
        backgroundColor: 'white',
      }}
    >
      <video
        autoPlay
        muted
        ref={videoRef}
        onEnded={videoEnded}
        className="presentationFrame"
      >
        <source src={upslideVideos[videoIdx]} />
      </video>
    </Html>
  )
}
