import { Html } from '@react-three/drei'
import React, { useRef } from 'react' //TODO remove that
import { useScreenResize } from '../hooks/useScreenResize.tsx'
import { HtmlPage } from './htmlPage/HtmlPage.tsx'

export function WebPage() {
  const webScreenRef = useRef(null)
  const { blending, planeInfo } = useScreenResize()

  return (
    <>
      <mesh name="Screen" position={[0, 0, -0.5]} ref={webScreenRef}>
        <Html
          transform={true}
          occlude={blending ? 'blending' : true}
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
