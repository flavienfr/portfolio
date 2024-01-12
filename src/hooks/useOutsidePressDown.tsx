import { useEffect } from 'react'

function useOutsidePressDown() {
  useEffect(() => {
    document.addEventListener('pointerdown', () => console.log('Touch outsite'))

    return () => {
      document.removeEventListener('pointerdown', () => console.log('Destroy'))
    }
  }, [document])
}
