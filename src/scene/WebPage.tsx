import { Html } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react' //TODO remove that
import { HtmlPage } from './tsFiles/HtmlPage.tsx'

//const ESCAPE_SCREAN_ANIMATION_DURATION = 3
const DREI_HTML_SCREEN_RATIO = 400 //680.3
const MAX_WIDTH_SCREEN = 1858
const MAX_HEIGHT_SCREEN = 1043

export function WebPage() {
  //TODO extract mesh in other component and make conditional render of it
  const webScreenRef = useRef(null)
  const { camera, viewport } = useThree() //TODO import ts for camera
  const [planeInfo, setPlaneInfo] = useState({ width: 1000, height: 1000 }) //init value wrong
  const [cameraZ, setCameraZ] = useState(camera.position.z)

  // Scroll
  /* const sheet = useCurrentSheet()
  const scroll = useScroll() */

  useFrame(() => {
    /*   if (sheet.sequence.position < ESCAPE_SCREAN_ANIMATION_DURATION) return
    const sequenceLength = val(sheet.sequence.pointer.length)
    sheet.sequence.position =
      scroll.offset * sequenceLength + ESCAPE_SCREAN_ANIMATION_DURATION */
    //TODO if launch
    if (
      planeInfo.height >= MAX_HEIGHT_SCREEN &&
      planeInfo.width >= MAX_WIDTH_SCREEN
    )
      return
    setCameraZ(camera.position.z)
  })
  //----------------

  useEffect(() => {
    const distance = Math.abs((cameraZ + 0.5) * DREI_HTML_SCREEN_RATIO)
    const height = (distance * camera.getFilmHeight()) / camera.getFocalLength()
    const width = height * camera.aspect

    //TODO if launch / agrandire ratio de la scene ?
    /* if (width > MAX_WIDTH_SCREEN) {
      const finalHeight =
        height > MAX_HEIGHT_SCREEN ? MAX_HEIGHT_SCREEN : height
      setPlaneInfo({ width: MAX_WIDTH_SCREEN, height: finalHeight })
      return
    } */

    setPlaneInfo({ width, height })
  }, [setPlaneInfo, viewport, camera, cameraZ])

  return (
    <>
      <mesh name="Screen" position={[0, 0, -0.5]} ref={webScreenRef}>
        <Html
          transform={true}
          /*  occlude={'blending'} */
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
