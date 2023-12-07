import { useCurrentSheet } from '@theatre/r3f'
import { useEffect, useState } from 'react'

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
      if (state >= 5.7 && state <= 8) setShowScene(2)
      else if (state >= 8.7 && state <= 10) setShowScene(3)
      else setShowScene(0)
    })
  }, [obj])

  return showScene
}
