import React from 'react'
import { Scene1 } from './Scene1'
import { Scene2 } from './scene2/Scene2'
import { Scene3 } from './scene3/Scene3'

/* export const OutlineObjContext = createContext({
  objRef: null,
  setObjs: (
    objRef: React.Ref<Mesh<BufferGeometry, Material | Material[]>>
  ) => {},
}) */

export function Isometric() {
  /*  const value = useShowScene() */

  return (
    <>
      {/*   <Scene1 />
      <Scene2 /> */}
      <Scene3 />
    </>
  )
}

//TODO find overliner but low consumer
{
  /*
  const [objRef, setObjs] = useState(null)
  const providerValue = { objRef, setObjs }

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
       <Scene3 />
    </OutlineObjContext.Provider> */
}
