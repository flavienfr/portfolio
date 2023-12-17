import { Html } from '@react-three/drei'
import React, { useContext } from 'react'
import { currentSceneContext } from '../context/CurrentSceneContext.tsx'
import { useScreenResize } from '../hooks/useScreenResize.tsx'
import { HtmlPage } from './htmlPage/HtmlPage.tsx'

export function WebPage() {
  const { blending, planeInfo, smallRatio } = useScreenResize()
  const currentScene = useContext(currentSceneContext)

  return (
    <>
      {Math.abs(currentScene) < 2 && (
        <Html
          position={[0, 0, -0.5]}
          transform={true}
          occlude={blending ? 'blending' : false}
          wrapperClass="htmlScreen"
          distanceFactor={1}
          style={{
            width: planeInfo.width,
            height: planeInfo.height,
          }}
        >
          <HtmlPage htmlHeight={planeInfo.height} smallRatio={smallRatio} />
        </Html>
      )}
    </>
  )
}
