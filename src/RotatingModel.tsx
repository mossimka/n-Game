// src/RotatingModel.tsx
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

type Props = {
  top?: number
  left?: number
  width?: number
  height?: number
  modelName: string // <--- Новый проп!
}

type ModelProps = {
  modelName: string
}

function Model({ modelName }: ModelProps) {
  const modelRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF(`/${modelName}.glb`)
  
  // Создаем рандомные скорости для каждой оси при инициализации
  const rotationSpeeds = useRef({
    x: (Math.random() - 0.5) * 0.02, // От -0.01 до 0.01
    y: (Math.random() - 0.5) * 0.02,
    z: (Math.random() - 0.5) * 0.02
  })

  useFrame(() => {
    if (modelRef.current) {
      // Вращаем по всем осям с рандомными скоростями
      modelRef.current.rotation.x += rotationSpeeds.current.x
      modelRef.current.rotation.y += rotationSpeeds.current.y
      modelRef.current.rotation.z += rotationSpeeds.current.z
    }
  })

  return <primitive ref={modelRef} object={scene} scale={1.5} />
}

export default function RotatingModel({
  top = 0,
  left = 0,
  width = 400,
  height = 400,
  modelName
}: Props) {
  return (
    <div
      style={{
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
        pointerEvents: 'none',
        zIndex: 10
      }}
    >
      <Canvas 
        camera={{ position: [0, 1, 3], fov: 50 }}
        gl={{ 
          toneMapping: THREE.ACESFilmicToneMapping, 
          toneMappingExposure: 2.5,
          outputColorSpace: THREE.SRGBColorSpace 
        }}
      >
        {/* Очень яркое окружающее освещение */}
        <ambientLight intensity={3} color="#ffffff" />
        
        {/* Множественные направленные источники света */}
        <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
        <directionalLight position={[-5, 5, 5]} intensity={2} color="#ffffff" />
        <directionalLight position={[0, -5, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[0, 5, -5]} intensity={1.5} color="#ffffff" />
        
        {/* Точечные источники света */}
        <pointLight position={[2, 3, 2]} intensity={2} color="#ffffff" />
        <pointLight position={[-2, 3, 2]} intensity={2} color="#ffffff" />
        <pointLight position={[0, -2, 3]} intensity={1} color="#ffffff" />
        
        {/* Полусферическое освещение для равномерности */}
        <hemisphereLight 
          args={["#ffffff", "#666666", 2]}
        />
        
        <OrbitControls enableZoom={false} />
        <Model modelName={modelName} />
      </Canvas>
    </div>
  )
}
