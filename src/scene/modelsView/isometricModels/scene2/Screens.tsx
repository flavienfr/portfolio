import { Html, Text } from '@react-three/drei'
import { useControls } from 'leva'
import React, { useEffect, useRef } from 'react'

const OPTIONS = {
  pongPos: {
    value: [-2.19, 0.555, 0.65],
    step: 0.001,
  },
  pongRot: {
    value: [0, 0.11, 0],
    step: 0.01,
  },
  arcadePos: {
    value: [2.03, 1.9, 0.96],
    step: 0.001,
  },
  arcadeStartPos: {
    value: [1.9, 1.8, 0.96],
    step: 0.001,
  },
  arcadeRot: {
    value: [1.6, -1.88, 1.6],
    step: 0.001,
  },
  PcScreenPos: {
    value: [2, 1.76, -1.23],
    step: 0.001,
  },
  PcScreenRot: {
    value: [-4.5, -1.6, -4.5],
    step: 0.001,
  },
}

interface ScreensProps {
  screanOpacity: number
}

export function Screens({ screanOpacity }: ScreensProps) {
  return (
    <>
      <PongScreen screanOpacity={screanOpacity} />
      {/*  <ArcadeScreen screanOpacity={screanOpacity} /> */}
      <PcScreen screanOpacity={screanOpacity} />
    </>
  )
}

export interface ScreenProps {
  screanOpacity: number
}

function PongScreen({ screanOpacity }: ScreenProps) {
  const { pongPos, pongRot } = useControls('scene2', OPTIONS)

  return (
    <>
      <Html
        wrapperClass="screenWrapper"
        position={pongPos}
        rotation={pongRot}
        occlude={false}
        transform
        scale={0.1}
        style={{
          backgroundColor: 'black',
          opacity: screanOpacity,
        }}
      >
        <div className="pongScrean">
          <div id="half" />
          <div id="sidel" />
          <div id="sider" />
          <div id="ball" />
        </div>
      </Html>
    </>
  )
}

function MatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const initializeMatrix = () => {
      const w = canvas.width
      const h = canvas.height
      const cols = Math.floor(w / 20) + 1
      const ypos = Array(cols).fill(0)

      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, w, h)

      const matrix = () => {
        ctx.fillStyle = '#0001'
        ctx.fillRect(0, 0, w, h)

        ctx.fillStyle = '#0f0'
        ctx.font = '15pt monospace'

        ypos.forEach((y, ind) => {
          const text = String.fromCharCode(Math.random() * 128)
          const x = ind * 20
          ctx.fillText(text, x, y)

          if (y > 100 + Math.random() * 10000) ypos[ind] = 0
          else ypos[ind] = y + 20
        })
      }

      setInterval(matrix, 50)
    }
    initializeMatrix()
  }, [canvasRef])

  return <canvas ref={canvasRef} width={766} height={551} />
}

/* TODO
- optimise wraping arcade
*/
function ArcadeScreen({ screanOpacity }: ScreenProps) {
  const { arcadeStartPos, arcadeRot } = useControls('scene2', OPTIONS)

  const arcadePlay = () => {
    console.log("let's play")
  }

  const handleHover = () => {
    console.log('🚀 ~  Zoom by red ')
  }

  return (
    <>
      <Text
        position={arcadeStartPos}
        rotation={arcadeRot}
        fontSize={0.5}
        onClick={arcadePlay}
        onPointerEnter={handleHover}
        fillOpacity={screanOpacity}
      >
        Play
      </Text>
      {/*  <Html
        wrapperClass="screenWrapper"
        position={arcadePos}
        rotation={arcadeRot}
        occlude={false}
        transform
        distanceFactor={0.4}
        style={{
          opacity: screanOpacity,
        }}
      >
        <iframe
          title="arcadeFrame"
          className="arcadeFrame"
          src="https://tybsi.com/games/wolfenstein-3d/index.html"
          ref={iframeRef}
          onLoad={() => {
            console.log('wolf loaded')
          }}
        />
      </Html> */}
    </>
  )
}

function PcScreen({ screanOpacity }: ScreenProps) {
  const { PcScreenPos, PcScreenRot } = useControls('scene2', OPTIONS)

  return (
    <Html
      wrapperClass="screenWrapper"
      position={PcScreenPos}
      rotation={PcScreenRot}
      occlude={false}
      transform
      distanceFactor={0.36}
      style={{ opacity: screanOpacity }}
    >
      <MatrixCanvas />
    </Html>
  )
}
