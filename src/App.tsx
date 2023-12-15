import { ScrollControls } from '@react-three/drei'
import { getProject } from '@theatre/core'
import { PerspectiveCamera, SheetProvider } from '@theatre/r3f'
import React, { useEffect } from 'react' //TODO remove that
import { ModelsView } from './scene/modelsView/ModelsView.tsx'
import flyThroughState from './theater/state.json'
import { WebPage } from './scene/WebPage.tsx'
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'
import { CurrentSceneContext } from './context/CurrentSceneContext.tsx'
import { useFov } from './hooks/useFov.tsx'
import { ScrollScene } from './hooks/ScrollScene.tsx'

/* studio.extend(extension)
studio.initialize() */

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
    <ScrollControls pages={3}>
      <SheetProvider sheet={sheet}>
        <ScrollScene />
        <CurrentSceneContext>
          <WebPage />
          <CameraScene />
          <ModelsView />
        </CurrentSceneContext>
      </SheetProvider>
    </ScrollControls>
  )
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
