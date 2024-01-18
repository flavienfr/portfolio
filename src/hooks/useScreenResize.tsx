import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { MAX_SCREEN_WIDTH } from '../scene/WebPage'

const DREI_HTML_SCREEN_RATIO = 400

export function useScreenResize() {
  const { camera, viewport } = useThree()
  const [smallRatio, setSmallRatio] = useState(false)

  useEffect(() => {
    setSmallRatio(camera.aspect < 1)

    const distance = Math.abs(
      (camera.position.z + 0.5) * DREI_HTML_SCREEN_RATIO
    )
    let height = (distance * camera.getFilmHeight()) / camera.getFocalLength()
    let width = height * camera.aspect

    width = width > MAX_SCREEN_WIDTH ? MAX_SCREEN_WIDTH : width

    document.documentElement.style.setProperty(
      '--dynamicWidth',
      `${width.toString()}px`
    )
  }, [viewport, camera])

  return { smallRatio }
}
