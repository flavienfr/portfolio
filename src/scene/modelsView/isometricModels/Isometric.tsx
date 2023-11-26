import React, { createContext, useState } from 'react'
import { Scene1 } from './Scene1'
import { Scene3 } from './Scene3'
import { Scene2 } from './scene2/Scene2'
import { EffectComposer, Outline } from '@react-three/postprocessing'
import { Mesh, BufferGeometry, Material } from 'three'

export const OutlineObjContext = createContext({
  objRef: null,
  setObjs: (
    objRef: React.Ref<Mesh<BufferGeometry, Material | Material[]>>
  ) => {},
})

export function Isometric() {
  const [objRef, setObjs] = useState(null)
  const providerValue = { objRef, setObjs }

  return (
    <OutlineObjContext.Provider value={providerValue}>
      <EffectComposer multisampling={8} autoClear={false}>
        <Outline
          selection={objRef ? [objRef] : objRef}
          selectionLayer={10}
          visibleEdgeColor={0xffffff}
          edgeStrength={100}
        />
      </EffectComposer>
      <Scene1 />
      <Scene2 />
      {/*<Scene3 /> */}
    </OutlineObjContext.Provider>
  )
}
