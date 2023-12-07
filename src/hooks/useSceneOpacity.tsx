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
