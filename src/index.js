// eslint-disable-next-line no-unused-vars
import { OrbitControls, PointerLockControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { AxesHelper } from 'three'
import App from './App.tsx'
import './index.css'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.querySelector('#root'))
export const FOV = 75

//camera={{ position: [0, 1.8, 10] }}
root.render(
  <React.StrictMode>
    <Canvas near={0.1} far={1000}>
      <primitive object={new AxesHelper(10)} />
      <color args={['white']} attach="background" />
      <OrbitControls makeDefault />
      {/*       <PointerLockControls /> */}
      <App />
    </Canvas>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
