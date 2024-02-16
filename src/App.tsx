import { PresentationControls } from '@react-three/drei'
import { getProject } from '@theatre/core'
import { PerspectiveCamera, SheetProvider } from '@theatre/r3f'
import React, { useContext } from 'react'
import {
  CurrentSceneContext,
  currentSceneContext,
} from './context/CurrentSceneContext.tsx'
import { JumpScene } from './hooks/ScrollScene.tsx'
import { useFov } from './hooks/useFov.tsx'
import { WebPage } from './scene/WebPage.tsx'
import { ModelsView } from './scene/modelsView/ModelsView.tsx'
import flyThroughState from './theater/state.json'

/* if (process.env.NODE_ENV === 'development') {
  studio.initialize()
  studio.extend(extension)
} */

export const SPEED_SPIN_FACTOR = 0.05

export default function App() {
  const project = getProject('Fly Through', { state: flyThroughState })
  const sheet = project.sheet('Scene')

  return (
    <SheetProvider sheet={sheet}>
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
        snap={{ mass: 1, tension: 100 }}
        cursor={true}
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
