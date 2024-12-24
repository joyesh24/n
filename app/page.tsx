'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import VideoPlayer from '@/components/VideoPlayer'
import { Fireworks } from '@/components/Fireworks'

export default function Home() {
  const [showWatchNow, setShowWatchNow] = useState(false)
  const [showVideoPlayer, setShowVideoPlayer] = useState(false)
  const [showFireworks, setShowFireworks] = useState(false)

  useEffect(() => {
    if (showVideoPlayer) {
      setShowFireworks(true)
      const timer = setTimeout(() => setShowFireworks(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [showVideoPlayer])

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-600 via-green-700 to-green-800 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {showFireworks && <Fireworks />}
      <div className="text-center space-y-8 z-10">
        {!showWatchNow && !showVideoPlayer && (
          <Button 
            onClick={() => setShowWatchNow(true)}
            className="bg-yellow-400 hover:bg-yellow-500 text-green-800 font-bold py-6 px-12 rounded-full text-3xl transition-all duration-300 transform hover:scale-105 shadow-lg animate-pulse"
          >
            BPL 2025 Concert
          </Button>
        )}
        {showWatchNow && !showVideoPlayer && (
          <Button 
            onClick={() => setShowVideoPlayer(true)}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-6 px-12 rounded-full text-3xl transition-all duration-300 transform hover:scale-105 shadow-lg animate-bounce"
          >
            Watch Now
          </Button>
        )}
        {showVideoPlayer && (
          <VideoPlayer />
        )}
      </div>
      <footer className="absolute bottom-4 text-center">
        <p className="text-yellow-300 font-semibold text-lg">&copy; 2025 Joyesh Digital</p>
      </footer>
      <div className="absolute inset-0 bg-cricket-pattern opacity-10 z-0"></div>
    </main>
  )
}

