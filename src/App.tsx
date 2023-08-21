import React from 'react' //TODO remove that
import { WebPage } from './scene/WebPage.tsx'
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'
import { getProject } from '@theatre/core'
import { PerspectiveCamera, SheetProvider } from '@theatre/r3f'
import { FOV } from './index.js'
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
    <SheetProvider sheet={sheet}>
      <PerspectiveCamera
        theatreKey="Camera"
        makeDefault
        fov={FOV}
        position={[0, 0, 5]} /*  position: {[0, 1.8, 10] } */
        near={0.1}
        far={1000}
      />
      <WebPage />
    </SheetProvider>
  )
}
