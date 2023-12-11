import { useContext, useEffect, useState } from 'react'
import { currentSceneContext } from '../context/CurrentSceneContext'

export function useSceneScreenBlending(scene: number) {
  const currentScene = useContext(currentSceneContext)
  const [blending, setBlending] = useState(false)

  useEffect(() => {
    setBlending(Math.abs(currentScene) >= scene)
  }, [currentScene, setBlending])

  return blending
}
