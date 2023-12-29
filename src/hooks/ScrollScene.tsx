import { useScroll } from '@react-three/drei'
import { val } from '@theatre/core'
import { useCurrentSheet } from '@theatre/r3f'
import React, { useContext, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { LEAVING_SCREEN_ANIMATION } from './useScreenResize'
import { sceneContext } from '../context/SceneContext'

const SEQUENCE_SCENE = [3, 6, 9, 12]

export function ScrollScene() {
  const scroll = useScroll()
  const sheet = useCurrentSheet()

  useFrame(() => {
    if (sheet!.sequence.position < LEAVING_SCREEN_ANIMATION) return
    const sequenceLength = val(sheet!.sequence.pointer.length)
    sheet!.sequence.position =
      scroll.offset * sequenceLength + LEAVING_SCREEN_ANIMATION
  })

  return <></>
}

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
