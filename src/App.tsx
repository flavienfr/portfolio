import { Html, PresentationControls, ScrollControls } from '@react-three/drei'
import { getProject } from '@theatre/core'
import { PerspectiveCamera, SheetProvider } from '@theatre/r3f'
import { memo, useContext, useEffect, useState } from 'react'
import { ModelsView } from './scene/modelsView/ModelsView.tsx'
import flyThroughState from './theater/state.json'
import { WebPage } from './scene/WebPage.tsx'
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'
import {
  CurrentSceneContext,
  currentSceneContext,
} from './context/CurrentSceneContext.tsx'
import { useFov } from './hooks/useFov.tsx'
import { JumpScene, ScrollScene } from './hooks/ScrollScene.tsx'
import React from 'react'

studio.extend(extension)
studio.initialize()

export const SPEED_SPIN_FACTOR = 0.05

export default function App() {
  const project = getProject('Fly Through', { state: flyThroughState })
  const sheet = project.sheet('Scene')

  useEffect(() => {
    project.ready.then(() => {
      console.log('Project loaded!') //TODO deal with loading
    })
  }, [project])

  return (
    <SheetProvider sheet={sheet}>
      {/* <ScrollScene /> */}
      <JumpScene />
      <CurrentSceneContext>
        <CameraScene />
        <AppContent />
      </CurrentSceneContext>
    </SheetProvider>
  )

  function AppContent() {
    const currentScene = useContext(currentSceneContext)

    return (
      <PresentationControls
        global
        enabled={Math.abs(currentScene) >= 1}
        polar={[0, 0]}
        azimuth={[-0.5, 0.5]}
        config={{ mass: 1, tension: 100 }}
        snap={{ mass: 1, tension: 100 }}
      >
        <WebPage />
        <ModelsView />
      </PresentationControls>
    )
  }
}

function CameraScene() {
  const { fov } = useFov()

  return (
    <>
      <PerspectiveCamera
        theatreKey="Camera"
        makeDefault
        fov={fov}
        position={[0, 0, 1.2]}
        near={0.1}
        far={1000}
      />
    </>
  )
}
