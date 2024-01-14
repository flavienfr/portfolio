import React, { ReactNode, createContext, useState } from 'react'

type SCREENS_NAMES = 'tv' | 'pc'

type screenClickedType = {
  screenName: SCREENS_NAMES | undefined
  setScreenName: React.Dispatch<React.SetStateAction<SCREENS_NAMES | undefined>>
}

export const screenClickedContext = createContext<screenClickedType>({
  screenName: undefined,
  setScreenName: () => {},
})

interface ScreenClickedContextProps {
  children: ReactNode
}

export function ScreenClickedContext({ children }: ScreenClickedContextProps) {
  const [screenName, setScreenName] = useState<SCREENS_NAMES | undefined>()

  return (
    <screenClickedContext.Provider value={{ screenName, setScreenName }}>
      {children}
    </screenClickedContext.Provider>
  )
}
