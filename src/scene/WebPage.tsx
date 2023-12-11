import { Html, useScroll } from '@react-three/drei'
import React, { useRef } from 'react' //TODO remove that
import { HtmlPage } from './htmlPage/HtmlPage.tsx'
import { getProject, val } from '@theatre/core'
import flyThroughState from '../theater/state.json'
import { useFov } from '../hooks/useFov.tsx'
import { useScreenResize } from '../hooks/useScreenResize.tsx'

export function WebPage() {
  const webScreenRef = useRef(null)
  const { blending, planeInfo } = useScreenResize()

  return (
    <>
      <mesh name="Screen" position={[0, 0, -0.5]} ref={webScreenRef}>
        <Html
          transform={true}
          occlude={blending ? 'blending' : undefined}
          wrapperClass="htmlScreen"
          distanceFactor={1}
          style={{
            width: planeInfo.width,
            height: planeInfo.height,
          }}
        >
          <HtmlPage htmlHeight={planeInfo.height} />
        </Html>
      </mesh>
    </>
  )
}
