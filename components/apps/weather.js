import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { 
  Search, 
  Wind, 
  Droplets, 
  Thermometer, 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudLightning, 
  CloudSnow, 
  MapPin, 
  Navigation,
  RefreshCcw,
  AlertCircle,
  Eye, 
  Gauge,
  Zap,
  Sunrise,
  Sunset,
  CloudFog,
  Waves,
  CloudDrizzle,
  ShieldCheck
} from 'lucide-react';

const Weather = (props) => {
  const [data, setData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [units, setUnits] = useState('metric'); // 'metric' (°C) or 'imperial' (°F)

  const apiKey = '895284fb2d2c50a520ea537456963d9c';
  
  const fetchWeatherData = useCallback(async (city) => {
    if (!city) return;
    setLoading(true);
    setError(null);
    
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;
    
    try {
      const [currentRes, forecastRes] = await Promise.all([
        axios.get(currentUrl),
        axios.get(forecastUrl)
      ]);
      
      setData(currentRes.data);
      // OpenWeather 5-day forecast gives data every 3 hours. Filter for one entry per day (every 8th index).
      const dailyForecast = forecastRes.data.list.filter((_, index) => index % 8 === 0);
      setForecast(dailyForecast);
    } catch (err) {
      setError(err.response?.data?.message || 'Node connection timeout');
      setData(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  }, [units, apiKey]);

  useEffect(() => {
    fetchWeatherData('Patna');
  }, [fetchWeatherData]);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && location.trim() !== '') {
      fetchWeatherData(location);
      setLocation('');
    }
  };

  const getWeatherIcon = (condition, size = 64) => {
    const color = "text-blue-400";
    switch (condition?.toLowerCase()) {
      case 'clouds': return <Cloud size={size} className={color} />;
      case 'clear': return <Sun size={size} className="text-yellow-400 animate-pulse" />;
      case 'rain': return <CloudRain size={size} className={color} />;
      case 'drizzle': return <CloudDrizzle size={size} className="text-emerald-400" />;
      case 'thunderstorm': return <CloudLightning size={size} className="text-purple-400" />;
      case 'snow': return <CloudSnow size={size} className="text-white" />;
      case 'mist':
      case 'smoke':
      case 'haze':
      case 'fog': return <CloudFog size={size} className="text-gray-400 opacity-80" />;
      default: return <Cloud size={size} className={color} />;
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#0a0c0f] text-[#e1e3e6] font-sans select-none overflow-hidden relative">
      {/* Background Cyber Mesh */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)', backgroundSize: '45px 45px' }} />
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-10 bg-[radial-gradient(circle_at_top_right,_#2563eb,_transparent_70%)]" />

      {/* Modern Kali Toolstrip */}
      <div className="flex items-center justify-between bg-[#181a1f]/90 backdrop-blur-xl px-6 py-3 border-b border-[#2a2e35] z-20">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <Zap size={22} className="text-white fill-white" />
          </div>
          <div>
            <h2 className="text-[13px] font-black uppercase tracking-[0.2em] text-white">Kali Weather</h2>
            <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest leading-none">System Terminal v2.5</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
            <div className="flex bg-black/40 p-1 rounded-xl border border-white/5 shadow-inner">
                {['metric', 'imperial'].map((u) => (
                    <button 
                        key={u}
                        onClick={() => setUnits(u)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${units === u ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-600 hover:text-gray-400'}`}
                    >
                        {u === 'metric' ? '°C' : '°F'}
                    </button>
                ))}
            </div>
            <div className="h-4 w-px bg-white/10 mx-1" />
            <button 
                onClick={() => data && fetchWeatherData(data.name)}
                className={`p-2.5 hover:bg-white/5 rounded-xl transition-all ${loading ? 'animate-spin text-blue-500' : 'text-gray-500 hover:text-white'}`}
                aria-label="Refresh data"
            >
                <RefreshCcw size={18} />
            </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar z-10">
        {/* Cinematic Search */}
        <div className="max-w-3xl mx-auto mb-12">
            <div className="relative group">
                <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-blue-500 transition-colors" />
                <input 
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyDown={handleSearch}
                    placeholder="Enter city to fetch atmospheric node data..."
                    className="w-full bg-[#050505] border border-[#2a2e35] rounded-2xl pl-16 pr-6 py-5 text-sm outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-gray-800 font-medium tracking-tight"
                />
            </div>
        </div>

        {loading && !data && (
            <div className="flex flex-col items-center justify-center py-40 animate-pulse">
                <div className="w-16 h-16 border-[3px] border-blue-500/10 border-t-blue-500 rounded-full animate-spin mb-6" />
                <p className="text-[11px] font-black uppercase tracking-[0.6em] text-blue-500">Decrypting Satellite Feed...</p>
            </div>
        )}

        {error && (
            <div className="max-w-md mx-auto bg-red-500/5 border border-red-500/20 p-10 rounded-[2.5rem] flex flex-col items-center text-center animate-in fade-in zoom-in-95">
                <AlertCircle size={48} className="text-red-500 mb-6 drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]" />
                <h3 className="text-lg font-black uppercase tracking-[0.2em] text-red-500 mb-3">Gateway Error</h3>
                <p className="text-xs text-gray-500 font-bold uppercase leading-relaxed">{error}</p>
                <button 
                    onClick={() => fetchWeatherData('Patna')}
                    className="mt-8 px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] transition-all active:scale-95"
                >
                    Restore Primary Node
                </button>
            </div>
        )}

        {data && (
            <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
                {/* Hero Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Primary Stats Card */}
                    <div className="lg:col-span-8 bg-white/[0.02] border border-white/5 rounded-[3.5rem] p-10 md:p-16 relative overflow-hidden group shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
                        <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none rotate-6">
                            {getWeatherIcon(data.weather[0].main, 320)}
                        </div>
                        
                        <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
                            <div className="text-center md:text-left flex-1">
                                <div className="flex items-center justify-center md:justify-start gap-3 text-blue-500 mb-8 bg-blue-500/5 w-fit px-5 py-2 rounded-full border border-blue-500/10">
                                    <MapPin size={18} />
                                    <span className="text-[12px] font-black uppercase tracking-[0.3em]">{data.name}, {data.sys.country}</span>
                                </div>
                                <div className="flex items-start justify-center md:justify-start gap-2 mb-4">
                                    <h1 className="text-[9rem] md:text-[13rem] font-black tracking-tighter text-white leading-none">
                                        {data.main.temp.toFixed()}
                                    </h1>
                                    <span className="text-5xl md:text-7xl font-black text-blue-500/30 mt-8 md:mt-12">°</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black text-white/40 uppercase tracking-[0.5em] mt-8">{data.weather[0].main}</h2>
                            </div>
                            
                            <div className="flex flex-col items-center gap-10">
                                <div className="drop-shadow-[0_0_50px_rgba(37,99,235,0.4)] hover:scale-105 transition-transform duration-700">
                                    {getWeatherIcon(data.weather[0].main, 160)}
                                </div>
                                <div className="grid grid-cols-2 gap-3 w-full">
                                    <div className="bg-black/40 border border-white/5 rounded-2xl p-4 flex flex-col items-center">
                                        <span className="text-[9px] font-black text-gray-600 uppercase mb-1">Max</span>
                                        <span className="text-sm font-bold text-white">{data.main.temp_max.toFixed()}°</span>
                                    </div>
                                    <div className="bg-black/40 border border-white/5 rounded-2xl p-4 flex flex-col items-center">
                                        <span className="text-[9px] font-black text-gray-600 uppercase mb-1">Min</span>
                                        <span className="text-sm font-bold text-white">{data.main.temp_min.toFixed()}°</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Solar & Secondary Grid */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Solar Module */}
                        <div className="bg-white/[0.02] border border-white/5 rounded-[3.5rem] p-10 shadow-2xl relative overflow-hidden h-full">
                            <h3 className="text-[11px] font-black text-gray-600 uppercase tracking-[0.5em] mb-10 text-center">Solar Node Access</h3>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-6 bg-white/[0.03] rounded-3xl border border-white/5 hover:bg-white/[0.05] transition-all">
                                    <div className="flex items-center gap-5">
                                        <div className="p-3 bg-orange-500/10 text-orange-400 rounded-xl shadow-lg border border-orange-500/10">
                                            <Sunrise size={24} />
                                        </div>
                                        <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Sunrise</span>
                                    </div>
                                    <span className="text-md font-bold text-white tracking-tight">{formatTime(data.sys.sunrise)}</span>
                                </div>
                                <div className="flex items-center justify-between p-6 bg-white/[0.03] rounded-3xl border border-white/5 hover:bg-white/[0.05] transition-all">
                                    <div className="flex items-center gap-5">
                                        <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl shadow-lg border border-purple-500/10">
                                            <Sunset size={24} />
                                        </div>
                                        <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Sunset</span>
                                    </div>
                                    <span className="text-md font-bold text-white tracking-tight">{formatTime(data.sys.sunset)}</span>
                                </div>
                            </div>
                            <div className="mt-12 p-6 bg-blue-600/5 rounded-3xl border border-blue-500/10 text-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-5 transition-opacity" />
                                <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2">Conditions Overview</p>
                                <p className="text-sm font-bold text-white uppercase tracking-tight">{data.weather[0].description}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Technical Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { label: 'Wind Power', val: `${data.wind.speed} ${units === 'metric' ? 'm/s' : 'mph'}`, icon: Wind, color: 'text-blue-400', rotation: data.wind.deg },
                        { label: 'Air Humidity', val: `${data.main.humidity}%`, icon: Droplets, color: 'text-emerald-400' },
                        { label: 'Barometric', val: `${data.main.pressure} hPa`, icon: Gauge, color: 'text-purple-400' },
                        { label: 'Visibility', val: `${(data.visibility / 1000).toFixed(1)} km`, icon: Eye, color: 'text-orange-400' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white/[0.02] border border-white/5 p-8 rounded-[3rem] flex flex-col items-center gap-4 hover:bg-white/[0.05] hover:border-blue-500/20 transition-all group shadow-xl">
                            <div className={`p-4 bg-white/5 rounded-2xl ${stat.color} group-hover:scale-110 transition-transform shadow-inner border border-white/5`}>
                                <stat.icon 
                                  size={28} 
                                  style={stat.rotation !== undefined ? { transform: `rotate(${stat.rotation}deg)` } : {}}
                                />
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em] mb-1">{stat.label}</span>
                                <span className="text-xl font-black text-white tracking-tighter uppercase">{stat.val}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Neural Forecast Node */}
                {forecast && (
                    <div className="bg-[#050505] border border-white/5 rounded-[4rem] p-12 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative overflow-hidden">
                        <div className="flex items-center justify-between mb-12 px-4">
                             <h3 className="text-[13px] font-black text-blue-500 uppercase tracking-[0.6em] flex items-center gap-4">
                                <Waves size={20}/> 5-Day Neural Forecast
                             </h3>
                             <span className="px-3 py-1 bg-blue-600/10 text-blue-500 text-[9px] font-black uppercase tracking-widest rounded-lg border border-blue-500/20">Satellite Linked</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
                            {forecast.map((day, i) => (
                                <div key={i} className="flex flex-col items-center p-8 bg-white/[0.01] border border-white/5 rounded-[2.5rem] hover:bg-white/[0.04] transition-all group">
                                    <span className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em] mb-6 group-hover:text-blue-400 transition-colors">
                                        {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                                    </span>
                                    <div className="mb-8 group-hover:scale-110 transition-transform drop-shadow-[0_0_15px_rgba(37,99,235,0.2)]">
                                        {getWeatherIcon(day.weather[0].main, 48)}
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-3xl font-black text-white tracking-tighter">{day.main.temp.toFixed()}°</span>
                                        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mt-2">{day.weather[0].main}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        )}
      </div>

      {/* Kali System Footer */}
      <div className="bg-[#181a1f] border-t border-[#2a2e35] px-8 py-3 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 z-20">
        <div className="flex gap-10 items-center">
            <span className="flex items-center gap-2.5">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_12px_#10b981]" /> 
                Sat-Link: Operational
            </span>
            <span className="hidden lg:flex items-center gap-2 text-gray-700">
                <ShieldCheck size={14}/> Node Security: Verified
            </span>
        </div>
        <div className="flex items-center gap-4">
            <span className="hidden sm:inline opacity-40 uppercase tracking-widest">Polling: {data?.name || 'Local'} Cluster</span>
            <div className="h-3 w-px bg-white/5" />
            <span className="text-blue-600 tracking-widest">OpenWeather API v2.5</span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #222; border-radius: 10px; border: 3px solid transparent; background-clip: content-box; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3b82f6; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: fade-in 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
      `}} />
    </div>
  );
};

export default Weather;

export const displayWeather = () => {
    return <Weather />;
};