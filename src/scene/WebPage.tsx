import { Html } from '@react-three/drei'
import React, { useContext, useEffect } from 'react'
import { currentSceneContext } from '../context/CurrentSceneContext.tsx'
import { useScreenResize } from '../hooks/useScreenResize.tsx'
import { HtmlPage } from './htmlPage/HtmlPage.tsx'
import { sceneContext } from '../context/SceneContext.tsx'

export const MAX_SCREEN_WIDTH = 2080
export const MAX_SCREEN_HEIGHT = 1043

export function WebPage() {
  const { smallRatio } = useScreenResize()
  const currentScene = useContext(currentSceneContext)
  const { setScene } = useContext(sceneContext)

  return (
    <>
      {Math.abs(currentScene) < 2 && (
        <Html
          position={[0, 0, -0.5]}
          transform={true}
          occlude={currentScene > 1 ? 'blending' : false}
          wrapperClass="htmlScreen"
          distanceFactor={1}
          style={{
            width: MAX_SCREEN_WIDTH,
            height: MAX_SCREEN_HEIGHT,
          }}
        >
          <HtmlPage smallRatio={smallRatio} setScene={setScene} />
        </Html>
      )}
    </>
  )
}
