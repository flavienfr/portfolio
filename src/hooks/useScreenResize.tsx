import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useState } from 'react' //TODO remove that
import { useCurrentSheet } from '@theatre/r3f'

const DREI_HTML_SCREEN_RATIO = 400
const MAX_SCREEN_WIDTH = 2080
const MAX_SCREEN_HEIGHT = 1043
export const LEAVING_SCREEN_ANIMATION = 3

export function useScreenResize() {
  const sheet = useCurrentSheet()
  const { camera, viewport } = useThree() //TODO import ts for camera
  const [planeInfo, setPlaneInfo] = useState({ width: 1000, height: 1000 }) //init value wrong
  const [cameraZ, setCameraZ] = useState(camera.position.z)
  const [blending, setBlending] = useState(false)

  //TODO use useframe is optimised ? bha non
  useFrame(() => {
    setCameraZ(camera.position.z)
    //TODO I put 0 insted of LEAVING_SCREEN_ANIMATION, to remove scroll bar.
    if (sheet.sequence.position > LEAVING_SCREEN_ANIMATION) setBlending(true)
  })

  useEffect(() => {
    const distance = Math.abs(
      (camera.position.z + 0.5) * DREI_HTML_SCREEN_RATIO
    )
    let height = (distance * camera.getFilmHeight()) / camera.getFocalLength()
    let width = height * camera.aspect
    console.log('Update', { width, height })

    width = width > MAX_SCREEN_WIDTH ? MAX_SCREEN_WIDTH : width
    height = MAX_SCREEN_HEIGHT // TODO height > MAX_SCREEN_HEIGHT ? MAX_SCREEN_HEIGHT : height

    setPlaneInfo({ width, height })
  }, [setPlaneInfo, viewport, camera, cameraZ])

  return { blending, planeInfo }
}
