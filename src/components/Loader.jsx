import React from 'react'
import { Html } from '@react-three/drei'

const Loader = ({ 
  size = 'md', 
  variant = 'random',
  color = 'random',
  text = ''
}) => {
  // Random variant selection
  const variants = ['spinner', 'gradient', 'dots', 'pulse', 'double']
  const colors = ['blue', 'purple', 'pink', 'green', 'orange', 'cyan']
  
  const [randomVariant] = React.useState(() => 
    variant === 'random' ? variants[Math.floor(Math.random() * variants.length)] : variant
  )
  
  const [randomColor] = React.useState(() => 
    color === 'random' ? colors[Math.floor(Math.random() * colors.length)] : color
  )
  
  const actualVariant = variant === 'random' ? randomVariant : variant
  const actualColor = color === 'random' ? randomColor : color
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  }

  const colorClasses = {
    blue: 'border-blue-500',
    purple: 'border-purple-500',
    pink: 'border-pink-500',
    green: 'border-green-500',
    orange: 'border-orange-500',
    cyan: 'border-cyan-500'
  }

  // Gradient Spinner
  if (actualVariant === 'gradient') {
    return (
      <Html center>
        <div className='flex flex-col justify-center items-center gap-4'>
          <div className='relative'>
            <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 animate-spin`}></div>
            <div className={`absolute inset-2 bg-white rounded-full`}></div>
          </div>
          {text && <p className='text-gray-600 font-medium animate-pulse'>{text}</p>}
        </div>
      </Html>
    )
  }

  // Dots Loader
  if (actualVariant === 'dots') {
    return (
      <Html center>
        <div className='flex flex-col justify-center items-center gap-4'>
          <div className='flex gap-2'>
            <div className={`w-4 h-4 ${colorClasses[actualColor]} bg-current rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
            <div className={`w-4 h-4 ${colorClasses[actualColor]} bg-current rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
            <div className={`w-4 h-4 ${colorClasses[actualColor]} bg-current rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
          </div>
          {text && <p className='text-gray-600 font-medium'>{text}</p>}
        </div>
      </Html>
    )
  }

  // Pulse Loader
  if (actualVariant === 'pulse') {
    return (
      <Html center>
        <div className='flex flex-col justify-center items-center gap-4'>
          <div className='relative'>
            <div className={`${sizeClasses[size]} ${colorClasses[actualColor]} bg-current rounded-full opacity-75 animate-ping absolute`}></div>
            <div className={`${sizeClasses[size]} ${colorClasses[actualColor]} bg-current rounded-full`}></div>
          </div>
          {text && <p className='text-gray-600 font-medium animate-pulse'>{text}</p>}
        </div>
      </Html>
    )
  }

  // Double Ring
  if (actualVariant === 'double') {
    return (
      <Html center>
        <div className='flex flex-col justify-center items-center gap-4'>
          <div className='relative'>
            <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin`}></div>
            <div className={`absolute inset-2 border-4 border-gray-200 border-t-purple-500 rounded-full animate-spin`} style={{ animationDirection: 'reverse' }}></div>
          </div>
          {text && <p className='text-gray-600 font-medium'>{text}</p>}
        </div>
      </Html>
    )
  }

  // Default Enhanced Spinner
  return (
    <Html center>
      <div className='flex flex-col justify-center items-center gap-4'>
        <div className='relative'>
          <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-transparent rounded-full animate-spin`}></div>
          <div className={`absolute inset-0 ${sizeClasses[size]} border-4 ${colorClasses[actualColor]} border-t-transparent rounded-full animate-spin`}></div>
        </div>
        {text && <p className='text-gray-600 font-medium'>{text}</p>}
      </div>
    </Html>
  )
}
export default Loader

