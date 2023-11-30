import { useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { editable as e } from '@theatre/r3f'
import { useControls } from 'leva'
import React from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { useSceneOpacity } from '../../../../hooks/useSceneOpacity'
import { MeshDescriptor } from '../MeshDescriptor'
import { Screens } from './Screens'

export const OPTIONS = {
  position2: {
    value: [0.17, 2.1, 2.45],
    step: 0.01,
  },
}

export function Scene2() {
  const { position2 } = useControls('scene2', OPTIONS)
  const opacity = useSceneOpacity('scene2')

  return (
    <e.group theatreKey="scene2" position={position2}>
      <Screens screanOpacity={opacity} />
      <ShcoolSceneObject />
    </e.group>
  )
}

export const OPTIONS2 = {
  shcoolPos: {
    value: [-1.1, 2.64, -2.18],
    step: 0.01,
  },
  pcPos: {
    value: [0, 0, 0],
    step: 0.01,
  },
  serverPos: {
    value: [0, 0, 0],
    step: 0.01,
  },
  arcadePos: {
    value: [0, 0, 0],
    step: 0.01,
  },
  paintPos: {
    value: [0, 0, 0],
    step: 0.01,
  },
  tvPos: {
    value: [0, 0, 0],
    step: 0.01,
  },
}

function ShcoolSceneObject() {
  const { shcoolPos, pcPos, serverPos, arcadePos, paintPos, tvPos } =
    useControls('screens', OPTIONS2)
  const { nodes } = useLoader(GLTFLoader, './model/scene2/scene.glb')

  const bakedTextures = useTexture('./model/scene2/baked.jpg')
  bakedTextures.flipY = false
  const MapMaterial = () => (
    <meshBasicMaterial map={bakedTextures} transparent opacity={opacity} />
  )

  const opacity = useSceneOpacity('scene2')

  return (
    <>
      <MeshDescriptor
        mesh={nodes.shcool}
        Material={MapMaterial}
        position={shcoolPos}
      />
      <MeshDescriptor mesh={nodes.pc} Material={MapMaterial} position={pcPos} />
      <MeshDescriptor
        mesh={nodes.server}
        Material={MapMaterial}
        position={serverPos}
      />
      <MeshDescriptor
        mesh={nodes.arcade}
        Material={MapMaterial}
        position={arcadePos}
      />
      <MeshDescriptor
        mesh={nodes.paint}
        Material={MapMaterial}
        position={paintPos}
      />
      <MeshDescriptor mesh={nodes.tv} Material={MapMaterial} position={tvPos} />

      <mesh key={'room'} geometry={nodes.room.geometry}>
        <MapMaterial />
      </mesh>
    </>
  )
}

/*   const geometries: Array<React.JSX.Element> = []
  scene.traverse((child) => {
    geometries.push(<mesh key={child.name} geometry={child.geometry}></mesh>)
  }) */
