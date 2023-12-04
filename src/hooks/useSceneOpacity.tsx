import { useCurrentSheet } from '@theatre/r3f'
import { useEffect, useState } from 'react'

//TODO use memo or use call back

export function useSceneOpacity(objTitle: string) {
  const [opacity, setOpacity] = useState(0)

  const sheet = useCurrentSheet()

  const obj = sheet!.object(`${objTitle}Opacity`, {
    opacity: 0,
  })

  useEffect(() => {
    /* const unsub =  */ obj.onValuesChange((obj) => {
      setOpacity(obj.opacity)
    })
    /*TODO return unsub() */
  }, [obj])

  return opacity
}

export function useShowScene() {
  //TODO setShowScene too many time
  const [showScene, setShowScene] = useState(0)

  const sheet = useCurrentSheet()

  const obj = sheet!.object('showScene', {
    showScene: 0,
  })

  useEffect(() => {
    obj.onValuesChange((obj) => {
      const state = obj.showScene
      if (state >= 5.7 && state <= 8.0) setShowScene(2)
      else if (state >= 9.0 && state <= 10.0) setShowScene(3)
      else setShowScene(0)
    })
  }, [obj])

  return showScene
}
