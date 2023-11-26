import { useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { editable as e } from '@theatre/r3f'
import { useControls } from 'leva'
import React from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { useSceneOpacity } from '../../../../hooks/useSceneOpacity'
import { MeshAnnotation } from '../InvisibleBoxDescriptor'
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

function ShcoolSceneObject() {
  const { nodes } = useLoader(GLTFLoader, './model/scene2/scene.glb')

  const bakedTextures = useTexture('./model/scene2/baked.jpg')
  bakedTextures.flipY = false
  const MapMaterial = () => (
    <meshBasicMaterial map={bakedTextures} transparent opacity={opacity} />
  )

  const opacity = useSceneOpacity('scene2')

  return (
    <>
      <MeshAnnotation
        keyProps={'shcool'}
        geometry={nodes.shcool.geometry}
        Material={MapMaterial}
      >
        test
      </MeshAnnotation>
      <MeshAnnotation
        keyProps={'paint'}
        geometry={nodes.paint.geometry}
        Material={MapMaterial}
      >
        test
      </MeshAnnotation>
      <MeshAnnotation
        keyProps={'pc'}
        geometry={nodes.pc.geometry}
        Material={MapMaterial}
      >
        test
      </MeshAnnotation>
      <MeshAnnotation
        keyProps={'server'}
        geometry={nodes.server.geometry}
        Material={MapMaterial}
      >
        test
      </MeshAnnotation>
      <MeshAnnotation
        keyProps={'arcade'}
        geometry={nodes.arcade.geometry}
        Material={MapMaterial}
      >
        test
      </MeshAnnotation>
      <MeshAnnotation
        keyProps={'tv'}
        geometry={nodes.tv.geometry}
        Material={MapMaterial}
      >
        test
      </MeshAnnotation>
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
