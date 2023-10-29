import React, { useEffect, useState } from 'react'
import { useElementOnScreen } from '../../hooks/useElementOnScreen'

export function BioPage() {
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.8,
  })

  return (
    <div className="view2">
      <div className="textWrapper">
        <div ref={containerRef}>
          <div className={isVisible ? 'show s1' : 'unShow'}>
            My name is Flavien Roussel, I am a former student of School 42
          </div>
          <div className={isVisible ? 'show s2' : 'unShow'}>
            Paris. After my studies and working for a year and a half as a
          </div>
          <div className={isVisible ? 'show s3' : 'unShow'}>
            full-stack developer in a company, I made the decision to resign to
          </div>
          <div className={isVisible ? 'show s4' : 'unShow'}>
            become a Creative Developer! To hone my skills, I went through
          </div>
          <div className={isVisible ? 'show s5' : 'unShow'}>
            Bruno Simon's training, the "Three.js Journey". This is how I
          </div>
          <div className={isVisible ? 'show s6' : 'unShow'}>
            introduce my first creative portfolio to you.
          </div>
        </div>
      </div>
    </div>
  )
}
