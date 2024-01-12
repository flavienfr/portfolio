import { useEffect, useState } from 'react'

export function useSmallScreen() {
  const [smallScreen, setSmallScreen] = useState(false)

  useEffect(() => {
    setSmallScreen(window.innerWidth < 760 || window.innerHeight < 750)
  }, [window.innerWidth, window.innerHeight])

  return smallScreen
}
