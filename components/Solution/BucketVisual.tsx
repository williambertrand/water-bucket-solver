import React, { FC } from 'react'
import { motion } from 'framer-motion'

const MIN_BUCKET_HEIGHT = 50
const MAX_BUCKET_HEIGHT = 200

interface BucketVisualProps {
  fill: number
  total: number
  name: string
  max: number
}

const styleForState = (fill: number, total: number, bucketHeight: number): any => {

  return {
    position: 'absolute',
    height: `${bucketHeight * (fill / total)}px`,
    backgroundColor: '#2563eb',
    borderRadius: '8px',
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: 5
  }
}

export const BucketVisual: FC<BucketVisualProps> = ({ name, fill, total, max }) => {

  const bucketHeight = Math.max((total / max) * MAX_BUCKET_HEIGHT, MIN_BUCKET_HEIGHT)

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', width: '20%', minWidth: '120px'}}>
      <div style={{ backgroundColor: '#DDD', borderRadius: '8px', width: '100%', position: 'relative', height: `${bucketHeight}px`, zIndex: 1}}>
        <motion.div
          layout
          transition={{
            type: "ease-out",
            stiffness: 200,
            damping: 10,
            duration: 0.75,
          }}
          style={styleForState(fill, total, bucketHeight)}
        />
        <p style={{position: 'absolute', margin: 'auto', top: '50%', zIndex: 10, fontSize: '24px', fontWeight: '600', textAlign: 'center', width: '100%'}}>{fill}</p>
      </div>
      <h4>{name}</h4>
    </div>
  )
}