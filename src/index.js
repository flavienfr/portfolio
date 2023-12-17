// eslint-disable-next-line no-unused-vars
import { Canvas } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { Leva } from 'leva'
import { Loader, OrbitControls } from '@react-three/drei'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
  <React.StrictMode>
    <Leva collapsed />
    <Loader />
    <Suspense fallback={null}>
      <Canvas flat /* antialias={false} */ gl={{ preserveDrawingBuffer: true }}>
        {/* <primitive object={new AxesHelper(10)} /> */}
        {/* <color args={['white']} attach="background" /> */}
        {/* <OrbitControls makeDefault /> */}
        {/* <Perf /> */}
        <App />
      </Canvas>
    </Suspense>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

/* TODO Global
- Loading font, images, gif dans le chargement
- vue final liens github

Mobile:
- Annotation clikable
- BTN fleche pour changer de scnène (anti lag)
- Does show images if ratio bad

Improve:
- BTN launch trop petit et aliase en mode small screen quand on est en vue 3d
- Info clickable obj (light)
- had shadow on the floor

Bonus:
- Smooth scroll transition entre les vues

Final check:
- Check firefox/safary compatibility
- performance test with reportWebVitals
- Remove dev dependencies (perf)

Models:
Improve:
- Blender add light to scenes
- base de la grue doit etre plus sombre (tester sur photoshop)
- Cable devrait avoir ca propre material

Scroll trop loin
welcome wmooth
*/
