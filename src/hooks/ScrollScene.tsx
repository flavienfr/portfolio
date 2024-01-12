import { useCurrentSheet } from '@theatre/r3f'
import React, { useContext, useEffect } from 'react'
import { sceneContext } from '../context/SceneContext'

const SEQUENCE_SCENE = [3, 6, 9, 12]

export function JumpScene() {
  const sheet = useCurrentSheet()
  const { scene } = useContext(sceneContext)

  const sequenceGoTo = (nextScene) => {
    if (!sheet) return

    const nextPos = SEQUENCE_SCENE[nextScene - 1]
    const currentPos = sheet.sequence.position

    if (nextPos === currentPos) return

    if (currentPos < nextPos) {
      sheet.sequence.play({
        range: [currentPos, nextPos],
      })
    } else {
      sheet.sequence.play({
        direction: 'reverse',
        range: [nextPos, currentPos],
      })
    }
  }

  useEffect(() => {
    if (scene === 0) return
    sequenceGoTo(scene)
  }, [scene])

  return <></>
}
