import { useScroll } from '@react-three/drei'
import { val } from '@theatre/core'
import { useCurrentSheet } from '@theatre/r3f'
import React from 'react'
import { useFrame } from '@react-three/fiber'
import { LEAVING_SCREEN_ANIMATION } from './useScreenResize'

export function ScrollScene() {
  const scroll = useScroll()
  const sheet = useCurrentSheet()

  useFrame(() => {
    /*   if (sheet!.sequence.position < LEAVING_SCREEN_ANIMATION) return */
    const sequenceLength = val(sheet!.sequence.pointer.length)
    sheet!.sequence.position =
      scroll.offset * sequenceLength + LEAVING_SCREEN_ANIMATION
  })

  return <></>
}
