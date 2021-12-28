import React, { useCallback, useEffect, useRef, useState } from 'react'
import handleMouseMove from '../Utils/handleMouseMove'
import './SwingGauge.css'
import SwingProgress from './SwingProgress'

const SwingGauge = () => {
  const [isCharging, setIsCharging] = useState(false)
  const [isSwinging, setIsSwinging] = useState(false)
  const [firstPartOfSwingCompleted, setFirstPartOfSwingCompleted] = useState(false)
  const [progressWidth, setProgressWidth] = useState(0)
  const [maxProgressWidth, setMaxProgressWidth] = useState(65)
  const [progressSpeed, setProgressSpeed] = useState(2.5)

  const handleProgressWidthChange = (pageX: number) => {
    console.log('Progress: ' + progressWidth + ', New Progress: ' + (1000 / pageX) * 100)

    setProgressWidth((1000 / pageX) * 100 - 95)
  }

  const handleCharge = () => {
    setIsCharging(true)
    const handleMouseUp = (e: MouseEvent) => {
      handleSwing()
      window.document.removeEventListener('mouseup', handleMouseUp)
    }

    window.document.addEventListener('mouseup', handleMouseUp)
  }

  const handleSwing = () => {
    setIsCharging(false)
    setIsSwinging(true)
  }

  const mouseMoveListenerFunction = useCallback((e: MouseEvent) => handleMouseMove(e, handleProgressWidthChange), [])

  useEffect(() => {
    console.log(isCharging)
    if (isCharging) {
      console.log('added')
      window.document.addEventListener('mousemove', mouseMoveListenerFunction)
    } else {
      console.log('removed')
      window.document.removeEventListener('mousemove', mouseMoveListenerFunction)
    }
  }, [isCharging, mouseMoveListenerFunction])

  useEffect(() => {
    console.log(progressWidth)
  }, [progressWidth])
  return (
    <div className="swing-container">
      <button onMouseDown={handleCharge} onMouseUp={handleSwing} className="swing-button">
        {isSwinging ? 'Swing' : 'Strike'}
      </button>
      <div className="swing-gauge-rect">
        <SwingProgress progressWidth={progressWidth} />
        <div className="vert-divider" />
        <div className="ding-pointer" />
      </div>
    </div>
  )
}

export default SwingGauge
