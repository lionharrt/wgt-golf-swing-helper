import React from 'react'

const SwingProgress = ({ progressWidth }: { progressWidth: number }) => {
  return <div className="swing-progress-rect" style={{ width: `${progressWidth}%` }} />
}

export default SwingProgress
