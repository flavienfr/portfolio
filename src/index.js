// eslint-disable-next-line no-unused-vars
import { Loader } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { SceneContext } from './context/SceneContext.tsx'
import './index.css'
import { Ihm } from './scene/ihm/Ihm.tsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
  <React.StrictMode>
    <Leva collapsed />
    <Loader />
    <Suspense fallback={null}>
      <Content />
    </Suspense>
  </React.StrictMode>
)

function Content() {
  return (
    <SceneContext>
      <Ihm />
      <Canvas
        flat
        gl={{
          preserveDrawingBuffer: true,
        }}
        className="MainCanvas"
      >
        {/* <OrbitControls enableZoom={false} makeDefault /> */}
        <App />
        {/* <ArcadeScene /> */}
      </Canvas>
    </SceneContext>
  )
}

//TODO next
// - arcade play bande d'arcade fond noir sole noir brillant, btn play into fondue grain like webscreean

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals()

/* TODO Global
- Loading font, images, gif dans le chargement

Improve:
- BTN launch trop petit et aliase en mode small screen quand on est en vue 3d
- welcome transition https://dev.to/link2twenty/future-of-css-scroll-animations-52ia

Final check:
- Check firefox/safary compatibility
- performance test with reportWebVitals
- Remove dev dependencies (perf)

Models:
Improve:
- base de la grue doit etre plus sombre (tester sur photoshop)
- Cable devrait avoir ca propre material
*/
