import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  MoreVertical, 
  Zap, 
  SkipBack, 
  SkipForward, 
  ShieldCheck, 
  RotateCcw,
  Settings,
  ListMusic,
  Share2,
  Tv
} from 'lucide-react';

const Vlc = (props) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const playerRef = useRef(null);
  const controlsTimeout = useRef(null);

  // Auto-hide controls logic
  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimeout.current);
    controlsTimeout.current = setTimeout(() => {
      if (playing) setShowControls(false);
    }, 3000);
  };

  const handlePlayPause = (e) => {
    e?.stopPropagation();
    setPlaying(!playing);
  };

  const handleProgress = (state) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekMouseUp = (e) => {
    setSeeking(false);
    playerRef.current.seekTo(parseFloat(e.target.value));
  };

  const formatTime = (seconds) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  return (
    <div 
      id={props.id}
      className="flex flex-col h-full w-full bg-[#0a0c0f] text-[#e1e3e6] font-sans select-none overflow-hidden relative group"
      onMouseMove={handleMouseMove}
    >
      {/* Cinematic Top Overlay */}
      <div className={`absolute top-0 left-0 w-full z-30 transition-all duration-500 transform ${showControls ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#f15a24] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(241,90,36,0.4)]">
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e6/VLC_Icon.svg" alt="VLC" className="w-6 h-6 filter brightness-0 invert" />
            </div>
            <div>
              <h2 className="text-[13px] font-black uppercase tracking-[0.2em] text-white">VLC Media Node</h2>
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1 opacity-70 flex items-center gap-2">
                <ShieldCheck size={10} className="text-[#f15a24]" /> Production ESR v2.5
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex flex-col items-end mr-4">
                <span className="text-[10px] font-black text-[#f15a24] uppercase tracking-widest">Satellite Uplink</span>
                <span className="text-[9px] text-gray-500 font-bold uppercase">1080p // 60 FPS // encrypted</span>
             </div>
             <button className="p-2 hover:bg-white/10 rounded-xl transition-all text-gray-400 hover:text-white"><Share2 size={18}/></button>
             <button className="p-2 hover:bg-white/10 rounded-xl transition-all text-gray-400 hover:text-white"><MoreVertical size={18}/></button>
          </div>
        </div>
      </div>

      {/* Main Player Engine */}
      <div className="flex-1 bg-black relative flex items-center justify-center" onClick={handlePlayPause}>
        <ReactPlayer
          ref={playerRef}
          url='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
          width="100%"
          height="100%"
          playing={playing}
          volume={volume}
          muted={muted}
          onProgress={handleProgress}
          onDuration={(d) => setDuration(d)}
          style={{ position: 'absolute', top: 0, left: 0 }}
          config={{
            youtube: {
              playerVars: { showinfo: 0, rel: 0, modestbranding: 1 }
            }
          }}
        />
        
        {/* Play/Pause Center Indicator (Mobile/Click)  */}
        {!playing && (
            <div className="z-20 p-8 bg-black/40 backdrop-blur-md rounded-full border border-white/10 scale-125 md:scale-150 animate-in fade-in zoom-in-75 duration-300">
                <Play size={48} fill="white" className="text-white ml-2" />
            </div>
        )}
      </div>

      {/* Modern Control Deck */}
      <div className={`absolute bottom-0 left-0 w-full z-30 transition-all duration-500 transform ${showControls ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
        <div className="bg-gradient-to-t from-black/90 via-black/60 to-transparent px-6 pb-8 pt-20">
          
          {/* Progress Bar Container */}
          <div className="group/progress relative mb-6">
            <input 
              type="range"
              min={0}
              max={0.999999}
              step="any"
              value={played}
              onMouseDown={handleSeekMouseDown}
              onChange={handleSeekChange}
              onMouseUp={handleSeekMouseUp}
              className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#f15a24] hover:h-2 transition-all"
            />
            <div 
              className="absolute top-0 left-0 h-1.5 bg-[#f15a24] rounded-full pointer-events-none shadow-[0_0_15px_#f15a24]" 
              style={{ width: `${played * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            {/* Left Controls */}
            <div className="flex items-center gap-2 md:gap-6">
              <div className="flex items-center gap-1 md:gap-2">
                <button className="p-2.5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all active:scale-90"><SkipBack size={20} fill="currentColor" /></button>
                <button 
                  onClick={handlePlayPause}
                  className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 transition-all"
                >
                  {playing ? <Pause size={24} fill="black" className="text-black" /> : <Play size={24} fill="black" className="text-black ml-1" />}
                </button>
                <button className="p-2.5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all active:scale-90"><SkipForward size={20} fill="currentColor" /></button>
              </div>

              <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-2xl border border-white/5">
                <button onClick={() => setMuted(!muted)} className="text-gray-400 hover:text-white transition-colors">
                  {muted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <input 
                  type="range"
                  min={0}
                  max={1}
                  step="any"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-16 md:w-24 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-white"
                />
              </div>

              <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono font-black text-gray-500 tracking-tighter ml-2">
                <span className="text-white">{formatTime(duration * played)}</span>
                <span className="opacity-30">/</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2 md:gap-4">
               <button className="p-2.5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all hidden sm:block"><ListMusic size={20}/></button>
               <button className="p-2.5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all"><Settings size={18}/></button>
               <div className="h-6 w-px bg-white/10 mx-2" />
               <button className="p-2.5 hover:bg-blue-600/20 text-blue-500 rounded-xl transition-all active:scale-90"><Maximize size={20}/></button>
            </div>
          </div>
        </div>
      </div>

      {/* Global Terminal Footer (Optional/Decoration) */}
      <div className="bg-[#181a1f] border-t border-[#2a2e35] px-6 py-2 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 z-[40]">
        <div className="flex gap-8 items-center">
            <span className="flex items-center gap-2 text-emerald-500">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> 
                Stream: Verified
            </span>
            <span className="hidden lg:flex items-center gap-2">
                <Zap size={12}/> Mode: Hardware Accelerated
            </span>
        </div>
        <div className="flex items-center gap-4">
            <span className="hidden sm:inline opacity-40">Codec: H.264 / AAC</span>
            <div className="h-3 w-px bg-white/5" />
            <span className="text-[#f15a24]">VLC Native ESR</span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        input[type='range']::-webkit-slider-thumb {
            appearance: none;
            height: 12px;
            width: 12px;
            border-radius: 50%;
            background: #ffffff;
            cursor: pointer;
            box-shadow: 0 0 10px rgba(0,0,0,0.5);
            border: none;
        }
        input[type='range']:hover::-webkit-slider-thumb {
            background: #f15a24;
            transform: scale(1.2);
        }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e2127; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3b82f6; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-in { animation: fade-in 0.4s ease-out forwards; }
      `}} />
    </div>
  );
};

export default Vlc;

export const displayVlc = (props) => {
    return <Vlc {...props} />;
};