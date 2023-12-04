import { useEffect, useState } from 'react'
import { getProject } from '@theatre/core'
import flyThroughState from '../theater/state.json'
import { useCurrentSheet } from '@theatre/r3f'

//TODO use memo or use call back

export function useSceneOpacity(objTitle: string) {
  const [opacity, setOpacity] = useState(0)

  const sheet = useCurrentSheet()

  const obj = sheet!.object(`${objTitle}Opacity`, {
    opacity: 0,
  })

  useEffect(() => {
    const unsub = obj.onValuesChange((obj) => {
      setOpacity(obj.opacity)
    })
    /*TODO return unsub() */
  }, [obj])

  return opacity
}

export function useShowScene() {
  const [showScene, setShowScene] = useState(0)

  const sheet = useCurrentSheet()

  const obj = sheet!.object('showScene', {
    showScene: 0,
  })

  useEffect(() => {
    const unsub = obj.onValuesChange((obj) => {
      console.log('(obj.showScene', obj.showScene)
      setShowScene(obj.showScene)
    })

    return () => {
      unsub()
    }
  }, [obj])

  return showScene
}
