import { useCurrentSheet } from '@theatre/r3f'
import { useEffect, useState } from 'react'

export function useSceneOpacity(objTitle: string) {
  const [opacity, setOpacity] = useState(0)

  const sheet = useCurrentSheet()

  const obj = sheet!.object(`${objTitle}Opacity`, {
    opacity: 0,
  })

  useEffect(() => {
    obj.onValuesChange((obj) => {
      setOpacity(obj.opacity)
    })
  }, [obj])

  return opacity
}
