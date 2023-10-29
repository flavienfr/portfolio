import { Html, useScroll } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react' //TODO remove that
import { HtmlPage } from './htmlPage/HtmlPage.tsx'
import { getProject, val } from '@theatre/core'
import flyThroughState from '../theater/state.json'

const DREI_HTML_SCREEN_RATIO = 400 //680.3
const MAX_SCREEN_WIDTH = 2080 //
const MAX_SCREEN_HEIGHT = 1043 //2086
export const LEAVING_SCREEN_ANIMATION = 3

export function WebPage() {
  const webScreenRef = useRef(null)
  const { camera, viewport } = useThree() //TODO import ts for camera
  const [planeInfo, setPlaneInfo] = useState({ width: 1000, height: 1000 }) //init value wrong
  const [cameraZ, setCameraZ] = useState(camera.position.z)
  const [blending, setBlending] = useState(false)

  //**** Screen resizer ****
  //TODO use useFframe is optimised ?
  useFrame(() => {
    setCameraZ(camera.position.z)
    //TODO I put 0 insted of LEAVING_SCREEN_ANIMATION, to remove scroll bar.
    if (sheet.sequence.position > LEAVING_SCREEN_ANIMATION) setBlending(true)
  })

  useEffect(() => {
    const distance = Math.abs((cameraZ + 0.5) * DREI_HTML_SCREEN_RATIO)
    let height = (distance * camera.getFilmHeight()) / camera.getFocalLength()
    let width = height * camera.aspect

    width = width > MAX_SCREEN_WIDTH ? MAX_SCREEN_WIDTH : width
    height = MAX_SCREEN_HEIGHT // TODO height > MAX_SCREEN_HEIGHT ? MAX_SCREEN_HEIGHT : height

    setPlaneInfo({ width, height })
  }, [setPlaneInfo, viewport, camera, cameraZ])
  // **** **** **** **** ****

  //**** Scroll animation ****
  const scroll = useScroll()
  const sheet = getProject('Fly Through', { state: flyThroughState }).sheet(
    'Scene'
  )

  useFrame(() => {
    if (sheet.sequence.position < LEAVING_SCREEN_ANIMATION) return
    const sequenceLength = val(sheet.sequence.pointer.length)
    sheet.sequence.position =
      scroll.offset * sequenceLength + LEAVING_SCREEN_ANIMATION
  })
  // **** **** **** **** ****

  return (
    <>
      <mesh name="Screen" position={[0, 0, -0.5]} ref={webScreenRef}>
        <Html
          transform={true}
          occlude={blending ? 'blending' : undefined}
          wrapperClass="htmlScreen"
          distanceFactor={1}
          style={{
            width: planeInfo.width,
            height: planeInfo.height,
          }}
        >
          <HtmlPage htmlHeight={planeInfo.height} />
        </Html>
      </mesh>
    </>
  )
}

//<iframe title="myFrame" src="https://bruno-simon.com/html/" />
//<iframe title="myFrame" src="https://www.snokido.fr/jeu/wolfenstein-3d" />
