import { Physics } from '@react-three/rapier'
import React, { Suspense } from 'react' //TODO remove that
import { Rope } from './Rope'

export function BackgroundModels() {
  return (
    <>
      <Suspense>
        <Physics debug gravity={[0, -9.81, 0]}>
          <Rope length={10} />
        </Physics>
      </Suspense>
    </>
  )
}
