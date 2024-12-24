'use client'

import { useState, useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { Slider } from "@/components/ui/slider"
import { Volume2, VolumeX, Play, Pause, Maximize, Minimize, Settings, RefreshCw, SkipBack, SkipForward } from 'lucide-react'

export default function VideoPlayer() {
  const [playing, setPlaying] = useState(true)
  const [volume, setVolume] = useState(0.5)
  const [muted, setMuted] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [quality, setQuality] = useState('auto')
  const [playbackRate, setPlaybackRate] = useState(1)
  const [progress, setProgress] = useState(0)
  const playerRef = useRef<ReactPlayer>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ" // Example URL, replace with actual live stream URL

  const handlePlayPause = () => setPlaying(!playing)
  const handleVolumeChange = (value: number[]) => setVolume(value[0])
  const handleToggleMute = () => setMuted(!muted)
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setFullscreen(true)
    } else {
      document.exitFullscreen()
      setFullscreen(false)
    }
  }

  const handleProgress = (state: { played: number }) => {
    setProgress(state.played)
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - bounds.left) / bounds.width
    playerRef.current?.seekTo(percent)
  }

  const handleSkip = (amount: number) => {
    const player = playerRef.current
    if (player) {
      const currentTime = player.getCurrentTime()
      player.seekTo(currentTime + amount)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const qualityOptions = ['auto', '1080p', '720p', '480p', '360p']
  const playbackRateOptions = [0.5, 1, 1.5, 2]

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto bg-black rounded-lg overflow-hidden shadow-2xl">
      <div className="relative pt-[56.25%]">
        <ReactPlayer
          ref={playerRef}
          url={url}
          playing={playing}
          volume={volume}
          muted={muted}
          playbackRate={playbackRate}
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0 }}
          onProgress={handleProgress}
          config={{
            youtube: {
              playerVars: { modestbranding: 1 }
            }
          }}
        />
      </div>
      <div className="p-4 bg-gradient-to-t from-gray-900 to-gray-800">
        <div 
          className="w-full h-1 bg-gray-700 rounded-full mb-2 cursor-pointer"
          onClick={handleSeek}
        >
          <div 
            className="h-full bg-red-500 rounded-full"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePlayPause}
              className="text-white hover:text-yellow-400 transition-colors"
            >
              {playing ? <Pause size={28} /> : <Play size={28} />}
            </button>
            <button
              onClick={() => handleSkip(-10)}
              className="text-white hover:text-yellow-400 transition-colors"
            >
              <SkipBack size={24} />
            </button>
            <button
              onClick={() => handleSkip(10)}
              className="text-white hover:text-yellow-400 transition-colors"
            >
              <SkipForward size={24} />
            </button>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleToggleMute}
                className="text-white hover:text-yellow-400 transition-colors"
              >
                {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>
              <Slider
                value={[volume]}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                className="w-24"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <button className="text-white hover:text-yellow-400 transition-colors">
                <Settings size={24} />
              </button>
              <div className="absolute right-0 bottom-full mb-2 w-48 bg-gray-800 rounded-md shadow-lg hidden group-hover:block">
                <div className="p-2">
                  <label className="block text-sm text-white mb-1">Quality</label>
                  <select
                    value={quality}
                    onChange={(e) => setQuality(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded p-1"
                  >
                    {qualityOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className="p-2">
                  <label className="block text-sm text-white mb-1">Playback Speed</label>
                  <select
                    value={playbackRate}
                    onChange={(e) => setPlaybackRate(Number(e.target.value))}
                    className="w-full bg-gray-700 text-white rounded p-1"
                  >
                    {playbackRateOptions.map(option => (
                      <option key={option} value={option}>{option}x</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <button
              onClick={() => playerRef.current?.seekTo(0)}
              className="text-white hover:text-yellow-400 transition-colors"
            >
              <RefreshCw size={24} />
            </button>
            <button
              onClick={handleToggleFullscreen}
              className="text-white hover:text-yellow-400 transition-colors"
            >
              {fullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <span className="text-white text-sm bg-red-500 px-2 py-1 rounded-full">BPL 2025 Live</span>
        </div>
      </div>
    </div>
  )
}

