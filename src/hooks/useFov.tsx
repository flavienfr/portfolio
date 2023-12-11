import { useEffect, useState } from 'react' //TODO remove that
import { useThree } from '@react-three/fiber'

const DEFAULT_FOV = 75

export function useFov() {
  const [fov, setFov] = useState(DEFAULT_FOV)
  const { viewport, camera } = useThree()

  useEffect(() => {
    // console.log('🚀 ~ viewport:', viewport, 'aspect', camera.aspect)
  }, [viewport])

  useEffect(() => {
    if (camera.aspect <= 0.7) setFov(125)
    else if (camera.aspect <= 1) setFov(112)
    else if (camera.aspect <= 1.25) setFov(93)
    else if (camera.aspect <= 1.5) setFov(81)
    else setFov(75)
    // console.log('aspect:', camera.aspect, 'FOV:', camera.fov)
  }, [camera, viewport])

  return { fov: 75 }
}
