import React, { useEffect, useState } from 'react'
import { WelcomePageProps } from './WelcomePage'

export function BioPage({ scrollFraction }: WelcomePageProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (scrollFraction >= 0.3) setIsVisible(true)
    else if (isVisible && scrollFraction < 0.3) setIsVisible(false)
  }, [scrollFraction])

  return (
    <div className="view2">
      <div className="textWrapper">
        <div style={{ opacity: isVisible ? 1 : 0 }}>
          My name is Flavien Roussel, I am a former student of School 42 Paris.
          After my studies and working for a year and a half as a full-stack
          developer in a company, I made the decision to resign to become a
          Creative Developer! To hone my skills, I went through Bruno Simon's
          training, the "Three.js Journey". This is how I introduce my first
          creative portfolio to you.
        </div>
      </div>
    </div>
  )
}
