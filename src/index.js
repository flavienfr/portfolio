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
        <App />
      </Canvas>
    </SceneContext>
  )
}
