import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCw, 
  Home, 
  Plus, 
  X, 
  Search, 
  Star, 
  Lock, 
  Globe,
  Settings,
  Minus,
  Square,
  MoreVertical,
  UserCircle,
  ShieldCheck,
  ChevronDown,
  LayoutGrid
} from 'lucide-react';

const Chrome = (props) => {
  const DEFAULT_HOME = 'https://www.google.com/webhp?igu=1';
  
  const [tabs, setTabs] = useState(() => {
    const savedUrl = localStorage.getItem("chrome-url");
    const savedTitle = localStorage.getItem("chrome-display-url");
    return [
      { 
        id: Date.now(), 
        title: savedTitle || 'Google', 
        url: savedUrl || DEFAULT_HOME, 
        active: true 
      }
    ];
  });
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMaximized, setIsMaximized] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const activeTab = tabs.find(t => t.active) || tabs[0];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setInputValue(activeTab.url);
    localStorage.setItem("chrome-url", activeTab.url);
    localStorage.setItem("chrome-display-url", activeTab.title);
  }, [activeTab]);

  const navigateTo = (newUrl) => {
    let finalUrl = newUrl.trim();
    if (!finalUrl) return;

    const isUrl = finalUrl.match(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/);
    
    if (!finalUrl.startsWith('http')) {
      if (isUrl) {
        finalUrl = 'https://' + finalUrl;
      } else {
        finalUrl = `https://www.google.com/search?q=${encodeURIComponent(finalUrl)}&igu=1`;
      }
    }

    if (finalUrl.includes("google.com") && !finalUrl.includes("igu=1")) {
        finalUrl = DEFAULT_HOME;
    }

    setIsLoading(true);
    const updatedTabs = tabs.map(t => 
      t.active ? { 
        ...t, 
        url: finalUrl, 
        title: isUrl ? finalUrl.replace(/^https?:\/\//, '').split('/')[0] : 'Search' 
      } : t
    );
    setTabs(updatedTabs);
    setTimeout(() => setIsLoading(false), 800);
  };

  const handleNewTab = () => {
    const newTab = { id: Date.now(), title: 'New Tab', url: DEFAULT_HOME, active: true };
    setTabs(tabs.map(t => ({ ...t, active: false })).concat(newTab));
  };

  const handleCloseTab = (e, id) => {
    e.stopPropagation();
    if (tabs.length === 1) return;
    const newTabs = tabs.filter(t => t.id !== id);
    if (tabs.find(t => t.id === id).active) {
      newTabs[newTabs.length - 1].active = true;
    }
    setTabs(newTabs);
  };

  const switchTab = (id) => {
    setTabs(tabs.map(t => ({ ...t, active: t.id === id })));
  };

  const handleRefresh = () => {
    setIsLoading(true);
    const currentUrl = activeTab.url;
    const updatedTabs = tabs.map(t => t.active ? { ...t, url: '' } : t);
    setTabs(updatedTabs);
    setTimeout(() => {
      setTabs(tabs.map(t => t.active ? { ...t, url: currentUrl } : t));
      setIsLoading(false);
    }, 150);
  };

  return (
    <div className={`flex flex-col h-full w-full bg-[#0f1115] text-[#e1e3e6] font-sans overflow-hidden transition-all duration-500 ease-in-out ${!isMaximized ? 'rounded-2xl border border-[#30343d] shadow-[0_20px_50px_rgba(0,0,0,0.5)] scale-[0.97]' : ''}`}>
      

      {/* Modern Tab Bar */}
      <div className="flex items-center bg-[#181a1f] px-2 h-12 overflow-x-auto no-scrollbar gap-1">
        <div className="flex items-center flex-nowrap min-w-max">
          {tabs.map((tab) => (
            <div 
              key={tab.id}
              onClick={() => switchTab(tab.id)}
              className={`flex items-center h-10 px-4 rounded-xl text-[12px] cursor-default group transition-all duration-300 relative mr-1 border ${
                tab.active 
                ? 'bg-[#21242c] text-white border-[#3b82f6]/40 shadow-lg' 
                : 'bg-transparent text-gray-500 border-transparent hover:bg-white/5 hover:text-gray-300'
              } ${isMobile ? 'max-w-[110px]' : 'min-w-[140px] max-w-[220px]'}`}
            >
              <Globe size={14} className={`mr-2.5 flex-shrink-0 transition-colors ${tab.active ? 'text-[#3b82f6]' : 'text-gray-600'}`} />
              <span className="flex-1 truncate font-semibold tracking-wide">{tab.title}</span>
              <button 
                onClick={(e) => handleCloseTab(e, tab.id)}
                className={`ml-2 p-1 rounded-md transition-all ${tab.active ? 'hover:bg-red-500/20 text-gray-400 hover:text-red-400' : 'opacity-0 group-hover:opacity-100 text-gray-600 hover:text-white hover:bg-white/10'}`}
              >
                <X size={12} strokeWidth={2.5} />
              </button>
              {tab.active && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#3b82f6] rounded-full blur-[1px]"></div>
              )}
            </div>
          ))}
          <button 
            onClick={handleNewTab}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-gray-500 hover:text-[#3b82f6] transition-all flex-shrink-0"
          >
            <Plus size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Unified Toolbar & Search */}
      <div className={`flex ${isMobile ? 'flex-col gap-3' : 'flex-row gap-4'} items-center bg-[#21242c] p-3 border-b border-[#181a1f] shadow-xl relative z-10`}>
        <div className="flex items-center gap-1.5 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-1">
            <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/5 text-gray-400 hover:text-white active:scale-90 transition-all"><ChevronLeft size={20} /></button>
            <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/5 text-gray-400 hover:text-white active:scale-90 transition-all"><ChevronRight size={20} /></button>
            <button onClick={handleRefresh} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all">
              <RotateCw size={18} className={isLoading ? 'animate-spin text-[#3b82f6]' : ''} />
            </button>
            <button onClick={() => navigateTo(DEFAULT_HOME)} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all">
              <Home size={19} />
            </button>
          </div>
          {isMobile && <MoreVertical size={20} className="text-gray-400" />}
        </div>

        {/* Omnibox / Modern Integrated Search */}
        <div className="w-full flex-1 flex items-center bg-[#0f1115] rounded-2xl h-10 px-4 border border-[#30343d] focus-within:border-[#3b82f6]/50 focus-within:ring-4 focus-within:ring-[#3b82f6]/5 transition-all group shadow-inner">
          <div className="flex items-center gap-2 mr-3 border-r border-[#30343d] pr-3 py-1 text-[#3b82f6]">
             <ShieldCheck size={16} strokeWidth={2.5} />
             <Lock size={12} className="opacity-60" />
          </div>
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && navigateTo(inputValue)}
            className="w-full bg-transparent outline-none text-[13px] text-gray-100 font-medium placeholder:text-gray-600"
            placeholder="Explore the network..."
          />
          {!isMobile && (
            <div className="flex items-center gap-2 ml-2">
               <Star size={16} className="text-gray-600 hover:text-yellow-500 cursor-pointer transition-colors" />
               <ChevronDown size={14} className="text-gray-700" />
            </div>
          )}
        </div>

        {!isMobile && (
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all"><LayoutGrid size={18} /></button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all"><UserCircle size={22} /></button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all"><MoreVertical size={20} /></button>
          </div>
        )}
      </div>

      {/* Main Viewport */}
      <div className="flex-1 bg-[#0f1115] relative">
        {isLoading && (
          <div className="absolute inset-0 z-50 bg-[#0f1115] flex flex-col items-center justify-center animate-in fade-in duration-300">
            <div className="relative">
              <div className="w-16 h-16 border-[3px] border-[#3b82f6]/10 rounded-full"></div>
              <div className="absolute top-0 w-16 h-16 border-[3px] border-[#3b82f6] border-t-transparent rounded-full animate-spin"></div>
            </div>
            <span className="mt-6 text-[10px] text-[#3b82f6] font-black uppercase tracking-[0.3em] opacity-80">Syncing...</span>
          </div>
        )}
        
        {activeTab.url ? (
          <iframe 
            src={activeTab.url} 
            title="chrome-viewport"
            className="w-full h-full border-none rounded-b-xl"
            id="chrome-screen"
            sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-white/5 to-white/0 rounded-full flex items-center justify-center mb-6">
              <Search size={40} className="text-gray-700" />
            </div>
            <h2 className="text-gray-500 font-bold uppercase tracking-widest text-xs">Search initialized</h2>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes fade-in { 
          from { opacity: 0; } 
          to { opacity: 1; } 
        }
        .animate-in { animation: fade-in 0.3s ease-out forwards; }
      `}} />
    </div>
  );
};

export default Chrome;

export const displayChrome = () => {
    return <Chrome />;
}