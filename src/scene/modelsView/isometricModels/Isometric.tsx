import React from 'react'
import { Scene1 } from './Scene1'
import { Scene2 } from './Scene2'
import { Scene3 } from './Scene3'

export function Isometric() {
  /* TODO scale to 1.10 in blender on join obj */
  return (
    <>
      <Scene1 />
      <Scene2 />
      <Scene3 />
    </>
  )
}
