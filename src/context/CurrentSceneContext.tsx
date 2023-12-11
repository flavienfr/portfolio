import { onChange } from '@theatre/core'
import { useCurrentSheet } from '@theatre/r3f'
import React, { ReactNode, createContext, useEffect, useState } from 'react' //TODO remove that

export const SCENE_1 = { start: 0.25, end: 3 }
const SCENE_2 = { start: 5.7, end: 8 }
const SCENE_3 = { start: 8.7, end: 10 }

export const currentSceneContext = createContext(0)

interface CurrentSceneContextProps {
  children: ReactNode
}

/* currentScene is negative when scroll down esle positive*/
export function CurrentSceneContext({ children }: CurrentSceneContextProps) {
  const [currentScene, setCurrentScene] = useState(0)
  const sheet = useCurrentSheet()

  useEffect(() => {
    let lastPos = 0

    const unsub = onChange(sheet!.sequence.pointer.position, (pos) => {
      const direction = lastPos < pos ? 1 : -1
      lastPos = pos

      if (pos >= SCENE_1.start && pos <= SCENE_1.end) setCurrentScene(1)
      else if (pos >= SCENE_2.start && pos <= SCENE_2.end)
        setCurrentScene(2 * direction)
      else if (pos >= SCENE_3.start && pos <= SCENE_3.end)
        setCurrentScene(3 * direction)
      else if (pos > SCENE_3.end) setCurrentScene(4 * direction)
      else setCurrentScene(0)
    })

    return () => {
      unsub()
    }
  }, [sheet])

  return (
    <currentSceneContext.Provider value={currentScene}>
      {children}
    </currentSceneContext.Provider>
  )
}
