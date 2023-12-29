import React, { ReactNode, createContext, useEffect, useState } from 'react'

type sceneContextType = {
  scene: number
  setScene: React.Dispatch<React.SetStateAction<number>>
}

export const sceneContext = createContext<sceneContextType>({
  scene: 0,
  setScene: () => {},
})

interface SceneContextProps {
  children: ReactNode
}

export function SceneContext({ children }: SceneContextProps) {
  const [scene, setScene] = useState(0)

  return (
    <sceneContext.Provider value={{ scene, setScene }}>
      {children}
    </sceneContext.Provider>
  )
}
