import { ISheet, onChange } from '@theatre/core'
import React, { ReactNode, createContext, useEffect, useState } from 'react' //TODO remove that
import { FOV } from '../App'
import { useCurrentSheet } from '@theatre/r3f'

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

      if (pos >= SCENE_2.start && pos <= SCENE_2.end)
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
