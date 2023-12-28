import { Environment, Html, useGLTF, useTexture } from '@react-three/drei'
import React from 'react'

//TODO mutli import

export function ArcadeScene() {
  const arcade = useGLTF('./model/sceneArcade/sceneArcade.glb')
  /*   const bakedTextures = useTexture('./model/scene2/baked.jpg')
  bakedTextures.flipY = false
 */
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[0, 0, 5]} />
      <primitive object={arcade.scene} />
    </>

    /*   <mesh key={nodes.arcade.name} geometry={nodes.arcade.geometry}>
      <meshBasicMaterial map={bakedTextures} />
    </mesh> */
  )
}

function ArcadeScreen({ screanOpacity }: ScreenProps) {
  /* const { arcadePos, arcadeStartPos, arcadeRot } = useControls(
    'sceneArcade',
    OPTIONS
  ) */

  return (
    <Html
      wrapperClass="screenWrapper"
      /*  position={arcadePos}
      rotation={arcadeRot} */
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
        onLoad={() => {
          console.log('wolf loaded')
        }}
      />
    </Html>
  )
}
