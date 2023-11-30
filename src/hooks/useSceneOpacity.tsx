import { useEffect, useState } from 'react'
import { getProject } from '@theatre/core'
import flyThroughState from '../theater/state.json'

//TODO use memo or use call back

export function useSceneOpacity(objTitle: string) {
  const [opacity, setOpacity] = useState(0)

  const sheet = getProject('Fly Through', { state: flyThroughState }).sheet(
    'Scene'
  )

  const obj = sheet.object(`${objTitle}Opacity`, {
    opacity: 0,
  })

  useEffect(() => {
    obj.onValuesChange((obj) => {
      setOpacity(obj.opacity)
    })
  }, [])

  return opacity
}
