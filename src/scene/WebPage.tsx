import { Html } from '@react-three/drei'
import React, { useContext } from 'react'
import { currentSceneContext } from '../context/CurrentSceneContext.tsx'
import { useScreenResize } from '../hooks/useScreenResize.tsx'
import { HtmlPage } from './htmlPage/HtmlPage.tsx'
import { sceneContext } from '../context/SceneContext.tsx'

export function WebPage() {
  const { blending, planeInfo, smallRatio } = useScreenResize()
  const currentScene = useContext(currentSceneContext)
  const { setScene } = useContext(sceneContext)

  return (
    //TODO stop blending and replace by smooth opacity to 0 into cut off
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
          <HtmlPage
            htmlHeight={planeInfo.height}
            smallRatio={smallRatio}
            setScene={setScene}
          />
        </Html>
      )}
    </>
  )
}
