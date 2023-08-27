import { ScrollControls } from '@react-three/drei'
import { getProject } from '@theatre/core'
import { PerspectiveCamera, SheetProvider } from '@theatre/r3f'
import extension from '@theatre/r3f/dist/extension'
import studio from '@theatre/studio'
import React from 'react' //TODO remove that
import { FOV } from './index.js'
import { WebPage } from './scene/WebPage.tsx'
import flyThroughState from './theater/state.json'

/* studio.extend(extension)
studio.initialize() */

export const SPEED_SPIN_FACTOR = 0.05

export default function App() {
  const project = getProject('Fly Through', { state: flyThroughState })
  const sheet = project.sheet('Scene')

  project.ready.then(() => {
    console.log('Project loaded!')
  })

  return (
    <ScrollControls pages={5}>
      <SheetProvider sheet={sheet}>
        <PerspectiveCamera
          theatreKey="Camera"
          makeDefault
          fov={FOV}
          position={[0, 0, 5]}
          near={0.1}
          far={1000}
        />
        <WebPage />
      </SheetProvider>
    </ScrollControls>
  )
}
