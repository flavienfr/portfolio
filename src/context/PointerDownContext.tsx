import React, { ReactNode, createContext, useState } from 'react'

type pointerDownContextType = {
  pointerDown: boolean
  setPointerDown: React.Dispatch<React.SetStateAction<boolean>>
}

export const pointerDownContext = createContext<pointerDownContextType>({
  pointerDown: false,
  setPointerDown: () => {},
})

interface PointerDownProps {
  children: ReactNode
}

export function PointerDownContext({ children }: PointerDownProps) {
  const [pointerDown, setPointerDown] = useState(false)

  return (
    <pointerDownContext.Provider value={{ pointerDown, setPointerDown }}>
      {children}
    </pointerDownContext.Provider>
  )
}
