// eslint-disable-next-line no-unused-vars
import { Canvas } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { Leva } from 'leva'
import { OrbitControls } from '@react-three/drei'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
  <React.StrictMode>
    {/* <Leva collapsed /> */}
    <Canvas flat gl={{ preserveDrawingBuffer: true }}>
      {/* <primitive object={new AxesHelper(10)} /> */}
      {/* <color args={['white']} attach="background" /> */}
      <Perf />
      {/* <OrbitControls makeDefault /> */}
      <App />
    </Canvas>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

/* TODO Global
- Transition entre les scènes camera plus opacité 
- vue final to be continued crane + liens github
- intéraction annotation avec les objets
- insertion drei html dans les écrans.
- background + sole brainstorming
- Ajouter les objets 3d a la scene 3 de paralax

Mobile:
- Annotation clikable

Improve:
- BTN launch trop petit et aliase en mode small screen quand on est en vue 3d
- Blender light crane and other model
- Info clickable obj (light)
- Hover animation des objets page launch

Bonus:
- Smooth scroll transition entre les vues

Final check:
- Check firefox/safary compatibility
- performance test with reportWebVitals
- Remove dev dependencies (perf)


Models:
Improve:
- base de la grue doit etre plus sombre (tester sur photoshop)
- Cable devrait avoir ca propre material
*/
