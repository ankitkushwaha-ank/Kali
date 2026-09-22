import React, { Component } from 'react';
import { 
  Home, 
  Search, 
  Library, 
  PlusSquare, 
  Heart, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Repeat, 
  Shuffle, 
  Volume2, 
  ListMusic, 
  MonitorSpeaker, 
  Maximize2, 
  X, 
  Minus, 
  Square, 
  Globe, 
  MoreHorizontal, 
  Clock,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Terminal,
  Volume1,
  VolumeX,
  Menu,
  Lyrics,
  Mic2,
  Share2
} from 'lucide-react';

class SpotifyApp extends Component {
  constructor(props) {
    super(props);
    
    this.songs = [
      { id: 0, title: "Dooron Dooron", artist: "Josh Brar", cover: "/images/songs/doroon_dorron.jpg", url: "/musics/Dooron Dooron.mp3" },
      { id: 1, title: "Tere Bina Na Guzara", artist: "Josh Brar", cover: "/images/songs/tere_bina_na_gujara.jpg", url: "/musics/JOSH BRAR  Tere Bina Na Guzara E.mp3" },
      { id: 2, title: "Haseen Mashup", artist: "Talwiinder", cover: "/images/songs/talwinder-haseen.jpg", url: "/musics/Talwiinder - Haseen Mashup.mp3" },
      { id: 3, title: "Bulleya", artist: "Papon", cover: "/images/songs/buleya.jpg", url: "/musics/bulleya.mp3" },
      { id: 4, title: "Tum Se Hi", artist: "Mohit Chauhan", cover: "/images/songs/tum_se_hi.jpg", url: "/musics/tum_se_hi.mp3" },
      { id: 5, title: "JUST A BOY Japanese Rap Song", artist: "Asira Official", cover: "/images/songs/just_a_boy.jpg", url: "/musics/just_a_boy.mp3" },
      { id: 6, title: "Banda Kaam Ka", artist: "Chaar Diwaari", cover: "/images/songs/banda_kam_ka.jpg", url: "/musics/banda_kam_ka.mp3" },
      { id: 7, title: "Dhanda Nyoliwala - Ishq Bawla", artist: "Dhanda Nyoliwala", cover: "/images/songs/ishq_bawla.jpg", url: "/musics/ishq_bawla.mp3" },
      { id: 8, title: "For A Reason", artist: "Karan Aujla", cover: "/images/songs/for_a_reason.jpg", url: "/musics/for_a_reason.mp3" }
    ];

    this.state = {
      isPlaying: false,
      isMaximized: true,
      activeTab: 'home',
      isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false,
      currentTrackIndex: 0,
      currentTime: 0,
      duration: 0,
      volume: 0.7,
      showPlayerFull: false, // Mobile toggle
      showDesktopDetail: false // Desktop full detail view toggle
    };

    this.audioRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    const audio = this.audioRef.current;
    if (audio) {
      audio.volume = this.state.volume;
      audio.addEventListener('timeupdate', this.handleTimeUpdate);
      audio.addEventListener('loadedmetadata', this.handleLoadedMetadata);
      audio.addEventListener('ended', this.handleNext);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    const audio = this.audioRef.current;
    if (audio) {
      audio.removeEventListener('timeupdate', this.handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', this.handleLoadedMetadata);
      audio.removeEventListener('ended', this.handleNext);
    }
  }

  handleResize = () => {
    const isMobile = window.innerWidth < 768;
    this.setState({ isMobile });
    if (!isMobile) this.setState({ showPlayerFull: false });
  };

  handleTimeUpdate = () => {
    this.setState({ currentTime: this.audioRef.current.currentTime });
  };

  handleLoadedMetadata = () => {
    this.setState({ duration: this.audioRef.current.duration });
  };

  togglePlay = (e) => {
    if(e) e.stopPropagation();
    if (this.state.isPlaying) {
      this.audioRef.current.pause();
    } else {
      this.audioRef.current.play().catch(err => console.log("Playback error: ", err));
    }
    this.setState({ isPlaying: !this.state.isPlaying });
  };

  playTrack = (index) => {
    this.setState({ currentTrackIndex: index, isPlaying: true }, () => {
      this.audioRef.current.load();
      this.audioRef.current.play();
    });
  };

  handleNext = (e) => {
    if(e) e.stopPropagation();
    let nextIndex = (this.state.currentTrackIndex + 1) % this.songs.length;
    this.playTrack(nextIndex);
  };

  handlePrev = (e) => {
    if(e) e.stopPropagation();
    let prevIndex = (this.state.currentTrackIndex - 1 + this.songs.length) % this.songs.length;
    this.playTrack(prevIndex);
  };

  handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * this.state.duration;
    this.audioRef.current.currentTime = seekTime;
    this.setState({ currentTime: seekTime });
  };

  handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    this.audioRef.current.volume = vol;
    this.setState({ volume: vol });
  };

  formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  renderDesktopDetailView = () => {
    const { currentTrackIndex, isPlaying, currentTime, duration, volume } = this.state;
    const currentTrack = this.songs[currentTrackIndex];
    
    return (
      <div className="absolute inset-0 z-[60] bg-gradient-to-b from-[#444] to-[#121212] animate-in fade-in duration-500 flex flex-col">
        <div className="p-8 flex justify-between items-center">
          <button onClick={() => this.setState({ showDesktopDetail: false })} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ChevronDown size={32} />
          </button>
          <div className="text-center flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Playing From Library</span>
            <span className="text-sm font-bold">Kali High-Fidelity Node</span>
          </div>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <MoreHorizontal size={24} />
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center gap-24 px-20">
          <div className="w-[450px] aspect-square rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden transition-transform duration-700 hover:scale-[1.02]">
            <img src={currentTrack.cover} alt={currentTrack.title} className="w-full h-full object-cover" />
          </div>
          
          <div className="flex-1 max-w-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-6xl font-black tracking-tighter mb-4 text-white">{currentTrack.title}</h1>
                <p className="text-2xl font-medium text-white/60">{currentTrack.artist}</p>
              </div>
              <Heart size={40} className="text-[#1db954]" fill="#1db954" />
            </div>

            <div className="mt-12">
              <div className="flex items-center gap-3 w-full text-sm font-mono font-bold mb-4 opacity-80">
                <span>{this.formatTime(currentTime)}</span>
                <input 
                  type="range"
                  className="flex-1 h-1.5 bg-white/20 rounded-full accent-[#1db954] appearance-none cursor-pointer hover:bg-white/30"
                  min="0"
                  max="100"
                  value={duration ? (currentTime / duration) * 100 : 0}
                  onChange={this.handleSeek}
                />
                <span>{this.formatTime(duration)}</span>
              </div>

              <div className="flex items-center justify-center gap-12 mt-8">
                <Shuffle size={28} className="text-white/40 hover:text-white cursor-pointer" />
                <SkipBack size={48} className="hover:scale-110 transition-transform cursor-pointer" onClick={this.handlePrev} />
                <button 
                  onClick={this.togglePlay}
                  className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-2xl"
                >
                  {isPlaying ? <Pause size={40} fill="black" className="text-black" /> : <Play size={40} fill="black" className="text-black ml-1" />}
                </button>
                <SkipForward size={48} className="hover:scale-110 transition-transform cursor-pointer" onClick={this.handleNext} />
                <Repeat size={28} className="text-white/40 hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 flex justify-center gap-8 items-center text-white/40">
           <Mic2 size={20} className="hover:text-white cursor-pointer" />
           <ListMusic size={20} className="hover:text-white cursor-pointer" />
           <MonitorSpeaker size={20} className="hover:text-white cursor-pointer" />
           <Share2 size={20} className="hover:text-white cursor-pointer" />
        </div>
      </div>
    );
  }

  render() {
    const { isPlaying, isMaximized, activeTab, isMobile, currentTrackIndex, currentTime, duration, volume, showPlayerFull, showDesktopDetail } = this.state;
    const currentTrack = this.songs[currentTrackIndex];

    return (
      <div className={`flex flex-col h-full w-full bg-[#000] text-white font-sans overflow-hidden transition-all duration-500 ${!isMaximized ? 'md:rounded-2xl border border-[#30343d] shadow-2xl scale-[0.98]' : ''}`}>
        
        <audio ref={this.audioRef} src={currentTrack.url} />

        {/* Desktop Detail View Overlay */}
        {!isMobile && showDesktopDetail && this.renderDesktopDetailView()}

        <div className="flex flex-1 overflow-hidden relative">
          {/* Sidebar */}
          {!isMobile && (
            <div className="w-64 bg-[#000] p-4 flex flex-col gap-6 flex-shrink-0 border-r border-white/5">
              <div className="flex flex-col gap-2">
                <div onClick={() => this.setState({activeTab: 'home'})} className={`flex items-center gap-4 px-4 py-2 cursor-pointer transition-all rounded-lg ${activeTab === 'home' ? 'text-white bg-white/5' : 'text-gray-400 hover:text-white'}`}>
                  <Home size={24} className={activeTab === 'home' ? 'text-[#1db954]' : ''} />
                  <span className="text-sm font-bold">Home</span>
                </div>
                <div onClick={() => this.setState({activeTab: 'search'})} className={`flex items-center gap-4 px-4 py-2 cursor-pointer transition-all rounded-lg ${activeTab === 'search' ? 'text-white bg-white/5' : 'text-gray-400 hover:text-white'}`}>
                  <Search size={24} />
                  <span className="text-sm font-bold">Search</span>
                </div>
                <div onClick={() => this.setState({activeTab: 'library'})} className={`flex items-center gap-4 px-4 py-2 cursor-pointer transition-all rounded-lg ${activeTab === 'library' ? 'text-white bg-white/5' : 'text-gray-400 hover:text-white'}`}>
                  <Library size={24} />
                  <span className="text-sm font-bold">Your Library</span>
                </div>
              </div>

              <div className="flex flex-col gap-4 mt-4">
                <div className="px-4 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Playlists</div>
                <div className="flex items-center gap-3 px-4 py-1 text-gray-400 hover:text-white cursor-pointer group">
                  <div className="w-8 h-8 bg-gray-200/10 rounded flex items-center justify-center group-hover:bg-gray-200/20 transition-colors">
                    <PlusSquare size={20} />
                  </div>
                  <span className="text-sm font-bold">Create Playlist</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-1 text-gray-400 hover:text-white cursor-pointer group">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-700 to-blue-300 rounded flex items-center justify-center opacity-80">
                    <Heart size={16} fill="white" className="text-white" />
                  </div>
                  <span className="text-sm font-bold">Liked Songs</span>
                </div>
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div className="flex-1 bg-gradient-to-b from-[#1e1e1e] to-[#121212] overflow-y-auto custom-scrollbar p-4 md:p-8 relative">
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#1db954]/10 to-transparent pointer-events-none" />
            
            <div className="relative z-10 pb-32 md:pb-0">
              <header className="flex items-center justify-between mb-8 sticky top-0 bg-[#121212]/0 backdrop-blur-md md:backdrop-blur-none py-2 px-1 rounded-full z-20 transition-all">
                <div className="flex gap-4">
                  {!isMobile && (
                    <>
                      <button className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center hover:bg-black/60"><ChevronLeft size={20} /></button>
                      <button className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center hover:bg-black/60"><ChevronRight size={20} /></button>
                    </>
                  )}
                  {isMobile && <h1 className="text-2xl font-bold tracking-tight">Good evening</h1>}
                </div>
                <div className="flex items-center gap-4">
                  {isMobile && <div className="p-2 bg-black/40 rounded-full"><Search size={22} className="text-white" /></div>}
                  <div className="flex items-center gap-2">
                    {!isMobile && <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mr-2">Secure Node</span>}
                    <div className="w-9 h-9 rounded-full bg-[#1db954] flex items-center justify-center font-bold text-black text-xs shadow-lg border-2 border-black/20">A</div>
                  </div>
                </div>
              </header>

              <div className="mb-10">
                 <h2 className="text-xl md:text-2xl font-black mb-6 tracking-tight flex items-center justify-between">
                    Your Local Library
                    <span className="text-xs font-bold text-gray-500 hover:underline cursor-pointer uppercase tracking-widest">Show all</span>
                 </h2>
                 
                 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                   {this.songs.map((song, index) => (
                     <div key={song.id} 
                       className={`bg-[#181818] p-3 md:p-4 rounded-xl hover:bg-[#282828] transition-all cursor-pointer group shadow-lg border ${currentTrackIndex === index ? 'border-[#1db954]/40 bg-[#282828]' : 'border-white/5'}`}
                       onClick={() => this.playTrack(index)}
                     >
                       <div className="relative mb-4">
                         <img 
                           src={song.cover} 
                           alt={song.title} 
                           className="w-full aspect-square object-cover rounded-lg shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]" 
                           onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200&h=200&fit=crop"; }}
                         />
                         <div className={`absolute bottom-2 right-2 w-10 h-10 md:w-12 md:h-12 bg-[#1db954] rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-105 active:scale-95 ${currentTrackIndex === index && isPlaying ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                           {currentTrackIndex === index && isPlaying ? <Pause fill="black" className="text-black" size={20} /> : <Play fill="black" className="text-black ml-1" size={20} />}
                         </div>
                       </div>
                       <h3 className={`font-bold text-[13px] md:text-sm mb-1 truncate ${currentTrackIndex === index ? 'text-[#1db954]' : 'text-white'}`}>{song.title}</h3>
                       <p className="text-[11px] md:text-xs text-gray-500 font-medium truncate">{song.artist}</p>
                     </div>
                   ))}
                 </div>
              </div>

              {/* Recents / Quick Access section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                 {this.songs.slice(0, 6).map((song, i) => (
                   <div key={i} onClick={() => this.playTrack(i)} className="bg-white/5 hover:bg-white/10 transition-all rounded-md flex items-center gap-4 overflow-hidden cursor-pointer group pr-4">
                      <img src={song.cover} className="w-16 h-16 object-cover shadow-lg" alt={song.title} />
                      <span className="font-bold text-sm truncate flex-1">{song.title}</span>
                      <button className="w-10 h-10 bg-[#1db954] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-xl transition-all scale-90 group-hover:scale-100">
                         <Play size={18} fill="black" className="text-black ml-1" />
                      </button>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation Bar */}
        {isMobile && (
          <div className="fixed bottom-0 w-full bg-gradient-to-t from-black to-black/90 border-t border-white/5 flex justify-around items-center py-3 z-[60] backdrop-blur-lg">
            <div onClick={() => this.setState({activeTab: 'home'})} className="flex flex-col items-center gap-1">
              <Home size={24} className={activeTab === 'home' ? 'text-white' : 'text-gray-500'} />
              <span className={`text-[10px] font-bold ${activeTab === 'home' ? 'text-white' : 'text-gray-500'}`}>Home</span>
            </div>
            <div onClick={() => this.setState({activeTab: 'search'})} className="flex flex-col items-center gap-1">
              <Search size={24} className={activeTab === 'search' ? 'text-white' : 'text-gray-500'} />
              <span className={`text-[10px] font-bold ${activeTab === 'search' ? 'text-white' : 'text-gray-500'}`}>Search</span>
            </div>
            <div onClick={() => this.setState({activeTab: 'library'})} className="flex flex-col items-center gap-1">
              <Library size={24} className={activeTab === 'library' ? 'text-white' : 'text-gray-500'} />
              <span className={`text-[10px] font-bold ${activeTab === 'library' ? 'text-white' : 'text-gray-500'}`}>Your Library</span>
            </div>
          </div>
        )}

        {/* Playback Bar */}
        <div 
          onClick={() => isMobile ? this.setState({showPlayerFull: !showPlayerFull}) : this.setState({showDesktopDetail: true})}
          className={`${isMobile && showPlayerFull ? 'fixed inset-0 h-screen bg-gradient-to-b from-[#333] to-[#121212] z-[70] p-6 flex flex-col animate-in slide-in-from-bottom duration-300' : 'h-20 md:h-24 bg-black border-t border-white/5 px-2 md:px-4 z-50 fixed md:relative bottom-[60px] md:bottom-0 w-full'} flex items-center justify-between transition-all duration-300`}
        >
          {isMobile && showPlayerFull && (
            <div className="flex justify-between items-center w-full mb-10">
               <button onClick={(e) => {e.stopPropagation(); this.setState({showPlayerFull: false})}} className="p-2"><ChevronDown size={32}/></button>
               <div className="flex flex-col items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Playing From</span>
                  <span className="text-xs font-bold">Kali Production</span>
               </div>
               <button className="p-2"><MoreHorizontal size={24}/></button>
            </div>
          )}

          {/* Song Info */}
          <div className={`${isMobile && showPlayerFull ? 'flex-col items-center text-center w-full mb-10' : 'flex items-center gap-3 w-3/4 md:w-1/3'}`}>
            <img 
              src={currentTrack.cover} 
              alt="Now Playing" 
              className={`${isMobile && showPlayerFull ? 'w-full aspect-square rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-10' : 'w-12 h-12 md:w-14 md:h-14 rounded-md shadow-lg'} transition-transform duration-500 ${isPlaying ? 'scale-[1.02]' : ''}`}
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200&h=200&fit=crop"; }}
            />
            <div className={`${isMobile && showPlayerFull ? 'w-full flex flex-col items-start px-2' : 'overflow-hidden flex flex-col justify-center'}`}>
              <div className={`${isMobile && showPlayerFull ? 'text-2xl font-black mb-1 text-left' : 'text-[13px] md:text-sm font-bold'} hover:underline cursor-pointer truncate w-full`}>{currentTrack.title}</div>
              <div className={`${isMobile && showPlayerFull ? 'text-lg text-gray-400 text-left' : 'text-[11px] text-gray-400 font-medium'} hover:underline cursor-pointer tracking-tight truncate w-full`}>{currentTrack.artist}</div>
            </div>
            {isMobile && showPlayerFull && (
              <div className="w-full flex justify-end mt-[-40px]">
                 <Heart size={28} className="text-[#1db954]" fill="#1db954" />
              </div>
            )}
            {!isMobile && <Heart size={16} className="text-[#1db954] cursor-pointer ml-3 flex-shrink-0" fill="#1db954" />}
          </div>

          {/* Controls Container */}
          <div className={`${isMobile && showPlayerFull ? 'w-full' : 'flex flex-col items-center gap-1 md:gap-2 w-1/3 max-w-[600px]'} ${isMobile && !showPlayerFull ? 'hidden' : 'flex'}`}>
            {/* Play/Pause/Skip Controls */}
            <div className={`flex items-center ${isMobile && showPlayerFull ? 'justify-between w-full mb-10' : 'gap-4 md:gap-6'}`}>
              {(!isMobile || showPlayerFull) && <Shuffle size={isMobile ? 28 : 18} className="text-gray-500 hover:text-white cursor-pointer" />}
              <SkipBack size={isMobile ? 36 : 22} className="text-gray-300 hover:text-white cursor-pointer" fill="currentColor" onClick={this.handlePrev} />
              <button 
                onClick={this.togglePlay}
                className={`${isMobile && showPlayerFull ? 'w-16 h-16 bg-white' : 'w-10 h-10 bg-white'} rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-lg`}
              >
                {isPlaying ? <Pause size={isMobile && showPlayerFull ? 32 : 22} fill="black" className="text-black" /> : <Play size={isMobile && showPlayerFull ? 32 : 22} fill="black" className="text-black ml-1" />}
              </button>
              <SkipForward size={isMobile ? 36 : 22} className="text-gray-300 hover:text-white cursor-pointer" fill="currentColor" onClick={this.handleNext} />
              {(!isMobile || showPlayerFull) && <Repeat size={isMobile ? 28 : 18} className="text-gray-500 hover:text-white cursor-pointer" />}
            </div>
            
            {/* Progress Slider */}
            <div className={`flex items-center gap-3 w-full text-[11px] text-gray-500 font-mono font-bold ${isMobile && !showPlayerFull ? 'hidden' : 'flex'}`}>
              <span>{this.formatTime(currentTime)}</span>
              <input 
                type="range"
                className="flex-1 h-1 bg-[#4d4d4d] rounded-full accent-[#1db954] appearance-none cursor-pointer"
                min="0"
                max="100"
                value={duration ? (currentTime / duration) * 100 : 0}
                onChange={this.handleSeek}
                onClick={(e) => e.stopPropagation()}
              />
              <span>{this.formatTime(duration)}</span>
            </div>

            {/* Mobile Fullscreen footer tools */}
            {isMobile && showPlayerFull && (
              <div className="flex justify-between items-center w-full mt-6 text-gray-400">
                 <MonitorSpeaker size={20} />
                 <div className="flex gap-6">
                    <Share2 size={20} />
                    <ListMusic size={20} />
                 </div>
              </div>
            )}
          </div>

          {/* Right Mobile Compact Icons */}
          {isMobile && !showPlayerFull && (
            <div className="flex items-center gap-4 pr-2">
               <MonitorSpeaker size={22} className="text-[#1db954]" />
               <button onClick={this.togglePlay} className="p-1">
                  {isPlaying ? <Pause size={28} fill="white"/> : <Play size={28} fill="white"/>}
               </button>
            </div>
          )}

          {/* Desktop Right Panel */}
          {!isMobile && (
            <div className="flex items-center gap-4 w-1/3 justify-end">
              <Mic2 size={16} className="text-gray-400 hover:text-white cursor-pointer" />
              <ListMusic size={18} className="text-gray-400 hover:text-white cursor-pointer" />
              <div className="flex items-center gap-3 w-32 group">
                {volume === 0 ? <VolumeX size={18} className="text-gray-400" /> : volume < 0.5 ? <Volume1 size={18} className="text-gray-400" /> : <Volume2 size={18} className="text-gray-400" />}
                <input 
                  type="range"
                  className="flex-1 h-1 bg-[#4d4d4d] rounded-full accent-white group-hover:accent-[#1db954] appearance-none cursor-pointer"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={this.handleVolumeChange}
                />
              </div>
              <Maximize2 size={16} className="text-gray-400 hover:text-white cursor-pointer" onClick={(e) => { e.stopPropagation(); this.setState({showDesktopDetail: true})}} />
            </div>
          )}
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .custom-scrollbar::-webkit-scrollbar { width: 8px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
          input[type='range']::-webkit-slider-thumb { appearance: none; height: 12px; width: 12px; border-radius: 50%; background: #1db954; cursor: pointer; box-shadow: 0 0 10px rgba(0,0,0,0.5); }
          @keyframes slide-up { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          .animate-in { animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
          .fade-in { animation: fade-in 0.5s ease-out; }
          @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        `}} />
      </div>
    );
  }
}

export const Spotify = (props) => <SpotifyApp {...props} />;
export default Spotify;

export const displaySpotify = () => <Spotify />;