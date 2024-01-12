import React from 'react'

interface IndicationProps {
  displayIndication: boolean
  annotationConfig: 1 | 2
}
export function Indication({
  displayIndication,
  annotationConfig,
}: IndicationProps) {
  return (
    <div
      style={{
        opacity: displayIndication ? 1 : 0,
        transition: 'opacity 1s',
        position: 'relative',
        right: '10px',
        top: annotationConfig === 1 ? '20px' : '-34px',
      }}
      className="fireflyWrapper"
    >
      <div className="firefly" />
      <div className="fireflyInner" />
    </div>
  )
}
