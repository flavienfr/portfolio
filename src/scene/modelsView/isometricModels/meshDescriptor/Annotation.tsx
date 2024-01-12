import React, { useMemo } from 'react'
import { objDescriptor } from '../../../../text/objDescriptor'

export function Annotation({ pressed, annotationPos, meshObj }) {
  const lignes = useMemo(
    () => objDescriptor[meshObj.name].description.split('\n'),
    [meshObj]
  )

  return (
    <div
      style={{
        opacity: pressed ? 1 : 0,
        transition: 'opacity 0.5s',
      }}
      className={annotationPos ? `content${annotationPos}` : 'content'}
    >
      <div className="title">{objDescriptor[meshObj.name].title}</div>

      <div className="ligne" />
      <div className="textLignes">
        {lignes.map((ligne, idx) => (
          <p key={idx}>{ligne}</p>
        ))}
      </div>
    </div>
  )
}
