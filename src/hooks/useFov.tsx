import { useThree } from '@react-three/fiber'
import { useCurrentSheet } from '@theatre/r3f'
import { useContext, useEffect, useState } from 'react'
import { currentSceneContext } from '../context/CurrentSceneContext'

export const FOV_RANGE = {
  high2: 125,
  high1: 112,
  low2: 93,
  low1: 81,
  default: 75,
}

export const LEAVING_SCREEN_ANIMATION = 3
const STEP_FOV = 0.25
const TRANSITION_DURATION = 1500 // lower than (SCENE_1.end - SCENE_1.start)*1000

export function useFov() {
  const [fov, setFov] = useState(FOV_RANGE.default)
  const { viewport, camera } = useThree()
  const sheet = useCurrentSheet()
  const currentScene = useContext(currentSceneContext)

  const calculateFov = () => {
    if (camera.aspect <= 0.7) return FOV_RANGE.high2
    else if (camera.aspect <= 1) return FOV_RANGE.high1
    else if (camera.aspect <= 1.25) return FOV_RANGE.low2
    else if (camera.aspect <= 1.5) return FOV_RANGE.low1
    else return FOV_RANGE.default
  }

  useEffect(() => {
    if (currentScene !== 1) return
    const newFov = calculateFov()

    const gap = newFov - FOV_RANGE.default
    const stepNumber = gap / STEP_FOV
    const intervalTime = TRANSITION_DURATION / stepNumber

    let timer = setTimeout(function tick() {
      const nextFov = Math.min(camera.fov + 0.25, newFov)

      setFov(nextFov)
      if (nextFov < newFov) timer = setTimeout(tick, intervalTime)
    }, intervalTime)

    return () => {
      clearTimeout(timer)
    }
  }, [currentScene])

  useEffect(() => {
    if (!sheet || sheet.sequence.position < LEAVING_SCREEN_ANIMATION) return
    const newFov = calculateFov()
    setFov(newFov)
  }, [camera, viewport, currentScene])

  return { fov }
}
