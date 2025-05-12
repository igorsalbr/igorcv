"use client"

import { useEffect, useState, memo } from "react"

interface TowerVisualizerProps {
  towerHeight: number
  onResetTower: () => void
}

export const TowerVisualizer = memo(function TowerVisualizer({ towerHeight, onResetTower }: TowerVisualizerProps) {
  const [exploding, setExploding] = useState(false)

  // If towerHeight >= 100, trigger explosion, then reset after animation
  useEffect(() => {
    if (towerHeight >= 100) {
      setExploding(true)
      const timer = setTimeout(() => {
        setExploding(false)
        onResetTower()
      }, 1500) // explosion duration
      return () => clearTimeout(timer)
    } else {
      setExploding(false)
    }
  }, [towerHeight, onResetTower])

  // Tower grows in VH while under 100, visually 1 towerHeight = 1vh
  const currentHeight = exploding ? 100 : Math.min(towerHeight, 100)

  return (
    <div className="relative w-20 border border-gray-500 items-center " style={{ height: "auto" }}>
      {/* The actual tower */}
      <div className="transition-all duration-300 bg-red-500" style={{ height: `${currentHeight}vh` }} />
      {/* Explosion overlay when it reaches 100% */}
      {exploding && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white text-xl font-bold animate-pulse">
          BOOM!
        </div>
      )}
    </div>
  )
})
