import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.querySelector('#root'))
export const FOV = 75

root.render(
  <React.StrictMode>
    <Canvas /* camera={{ position: [0, 0, 0] }} */>
      <color args={['white']} attach="background" />
      <OrbitControls makeDefault />
      <App />
    </Canvas>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
