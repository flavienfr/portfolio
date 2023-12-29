import { useContext, useEffect, useState } from 'react'
import { currentSceneContext } from '../context/CurrentSceneContext'

export function useFadeScreenScene(sceneId: number) {
  const [opacity, setOpacity] = useState(0)
  const currentScene = useContext(currentSceneContext)
  const [lastState, setLastState] = useState(currentScene)
  const [showScreen, setShowScreen] = useState(false)

  const Animation = (opacityToReach: number) => {
    let opacityTmp = opacityToReach === 0 ? 1 : 0

    const innerAnimation = () => {
      const timer = setTimeout(() => {
        opacityTmp += 0.05 * (opacityToReach === 0 ? -1 : 1)
        setOpacity(opacityTmp)
        if (
          (opacityToReach === 1 && opacityTmp <= opacityToReach) ||
          (opacityToReach === 0 && opacityTmp >= opacityToReach)
        )
          innerAnimation()
        else if (opacityToReach === 0) setShowScreen(false)
      }, 10)
    }
    innerAnimation()
    return () => clearTimeout(timer)
  }

  useEffect(() => {
    if (Math.abs(currentScene) === sceneId && lastState !== sceneId) {
      setShowScreen(true)
      Animation(1)
    } else if (Math.abs(currentScene) !== sceneId && lastState === sceneId)
      Animation(0)
    setLastState(Math.abs(currentScene))
  }, [setOpacity, currentScene])

  return { screanOpacity: opacity, showScreen }
}
