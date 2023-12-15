import { useContext, useEffect, useState } from 'react'
import { currentSceneContext } from '../context/CurrentSceneContext'

export function useIndicationsDisplay(scene: number) {
  const currentScene = useContext(currentSceneContext)
  const [showIndication, setShowIndication] = useState(false)
  const [stop, setStop] = useState(false)

  useEffect(() => {
    if (stop) return
    setShowIndication(scene === Math.abs(currentScene))
  }, [currentScene])

  const updateHideIndications = (status: boolean) => {
    setStop(status)
    setShowIndication(!status)
  }

  return { updateHideIndications, showIndication }
}
