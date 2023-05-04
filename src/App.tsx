import React from 'react' //TODO remove that
import { WebPage } from './scene/WebPage.tsx'

//TODO unset onWheel event from this mesh and put it globaly

export const SPEED_SPIN_FACTOR = 0.05

export default function App() {
  return (
    <>
      <WebPage />
    </>
  )
}
