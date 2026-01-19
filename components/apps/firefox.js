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
  ShieldAlert,
  Menu,
  Terminal
} from 'lucide-react';

const Firefox = (props) => {
  const HOME_PAGE = 'firefox://home';
  const SEARCH_BASE = 'https://www.google.com/search?igu=1&q=';

  // State for tabs with robust initialization
  const [tabs, setTabs] = useState(() => {
    try {
      const savedUrl = localStorage.getItem("firefox-url");
      const savedTitle = localStorage.getItem("firefox-display-url");
      return [
        { 
          id: Date.now(), 
          title: savedTitle || 'New Tab', 
          url: savedUrl || HOME_PAGE, 
          active: true 
        }
      ];
    } catch (e) {
      return [{ id: Date.now(), title: 'New Tab', url: HOME_PAGE, active: true }];
    }
  });
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMaximized, setIsMaximized] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Safely find the active tab
  const activeTab = tabs.find(t => t.active) || tabs[0] || { url: HOME_PAGE, title: 'New Tab' };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (activeTab) {
      setInputValue(activeTab.url === HOME_PAGE ? '' : activeTab.url);
      try {
        localStorage.setItem("firefox-url", activeTab.url);
        localStorage.setItem("firefox-display-url", activeTab.title);
      } catch (e) {}
    }
  }, [activeTab]);

  const navigateTo = (input) => {
    let finalUrl = input.trim();
    if (!finalUrl) return;

    const isUrl = finalUrl.match(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/);
    
    if (!finalUrl.startsWith('http') && !finalUrl.startsWith('firefox://')) {
      if (isUrl) {
        finalUrl = 'https://' + finalUrl;
      } else {
        finalUrl = `${SEARCH_BASE}${encodeURIComponent(finalUrl)}`;
      }
    }

    setIsLoading(true);
    setTabs(prev => prev.map(t => 
      t.active ? { 
        ...t, 
        url: finalUrl, 
        title: finalUrl === HOME_PAGE ? 'New Tab' : (isUrl ? finalUrl.replace(/^https?:\/\//, '').split('/')[0] : 'Search') 
      } : t
    ));
    setTimeout(() => setIsLoading(false), 600);
  };

  const handleNewTab = () => {
    setTabs(prev => {
      const newTabs = prev.map(t => ({ ...t, active: false }));
      return [...newTabs, { id: Date.now(), title: 'New Tab', url: HOME_PAGE, active: true }];
    });
  };

  const handleCloseTab = (e, id) => {
    e.stopPropagation();
    setTabs(prev => {
      if (prev.length === 1) {
        return [{ id: Date.now(), title: 'New Tab', url: HOME_PAGE, active: true }];
      }
      const filtered = prev.filter(t => t.id !== id);
      const wasActive = prev.find(t => t.id === id)?.active;
      if (wasActive) {
        filtered[filtered.length - 1].active = true;
      }
      return filtered;
    });
  };

  const switchTab = (id) => {
    setTabs(prev => prev.map(t => ({ ...t, active: t.id === id })));
  };

  const handleRefresh = () => {
    if (activeTab.url === HOME_PAGE) return;
    setIsLoading(true);
    const currentUrl = activeTab.url;
    setTabs(prev => prev.map(t => t.active ? { ...t, url: '' } : t));
    setTimeout(() => {
      setTabs(prev => prev.map(t => t.active ? { ...t, url: currentUrl } : t));
      setIsLoading(false);
    }, 150);
  };

  const goHome = () => navigateTo(HOME_PAGE);

  // Internal Home Page
  const FirefoxHome = () => (
    <div className="w-full h-full bg-[#1c1b22] flex flex-col items-center justify-center p-6 overflow-y-auto overflow-x-hidden transition-opacity duration-300 opacity-100">
      <div className="flex flex-col items-center w-full max-w-2xl">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#ff7139] to-[#ff1a6a] rounded-2xl flex items-center justify-center shadow-2xl">
            <Globe size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold tracking-tighter text-white">Firefox</h1>
        </div>

        <div className="w-full relative group mb-12">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-500 group-focus-within:text-[#ff7139] transition-colors" />
          </div>
          <input 
            type="text"
            placeholder="Search with Google"
            className="w-full h-14 bg-[#2b2a33] border border-[#42414d] rounded-xl pl-14 pr-6 text-lg text-white outline-none focus:ring-4 focus:ring-[#ff7139]/20 focus:border-[#ff7139]/50 transition-all shadow-xl"
            onKeyDown={(e) => e.key === 'Enter' && navigateTo(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-6 w-full">
          {[
            { name: 'Google', icon: <Search size={20} />, url: 'https://www.google.com/search?igu=1' },
            { name: 'Kali Linux', icon: <Terminal size={20} />, url: 'https://www.kali.org/' },
            { name: 'YouTube', icon: <Globe size={20} />, url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { name: 'GitHub', icon: <Globe size={20} />, url: 'https://github.com' },
            { name: 'Facebook', icon: <Globe size={20} />, url: 'https://facebook.com' },
            { name: 'Wikipedia', icon: <Globe size={20} />, url: 'https://wikipedia.org' },
            { name: 'Reddit', icon: <Globe size={20} />, url: 'https://reddit.com' },
            { name: 'Add', icon: <Plus size={20} />, url: HOME_PAGE, secondary: true },
          ].map((site, i) => (
            <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer" onClick={() => navigateTo(site.url)}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${site.secondary ? 'bg-white/5 border border-white/10 hover:bg-white/10' : 'bg-[#2b2a33] border border-[#42414d] group-hover:border-[#ff7139]/50 group-hover:shadow-[0_0_15px_rgba(255,113,57,0.2)] shadow-lg hover:bg-[#32323d]'}`}>
                <span className={site.secondary ? 'text-gray-500' : 'text-[#ff7139]'}>{site.icon}</span>
              </div>
              <span className="text-[11px] text-gray-400 font-medium group-hover:text-white truncate w-full text-center">{site.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`flex flex-col h-full w-full bg-[#0f1115] text-[#e1e3e6] font-sans overflow-hidden transition-all duration-500 ease-in-out ${!isMaximized ? 'rounded-2xl border border-[#30343d] shadow-[0_20px_50px_rgba(0,0,0,0.6)]' : ''}`}>
      

      {/* Tabs */}
      <div className="flex items-center bg-[#181a1f] px-2 h-12 overflow-x-auto scrollbar-hide gap-1 shadow-md flex-shrink-0">
        <div className="flex items-center flex-nowrap min-w-max h-full">
          {tabs.map((tab) => (
            <div 
              key={tab.id}
              onClick={() => switchTab(tab.id)}
              className={`flex items-center h-10 px-4 rounded-xl text-[12px] cursor-default group transition-all duration-300 relative mr-1 border ${
                tab.active 
                ? 'bg-[#21242c] text-white border-[#ff7139]/40 shadow-lg' 
                : 'bg-transparent text-gray-500 border-transparent hover:bg-white/5 hover:text-gray-300'
              } ${isMobile ? 'max-w-[110px]' : 'min-w-[140px] max-w-[220px]'}`}
            >
              <Globe size={14} className={`mr-2.5 flex-shrink-0 transition-colors ${tab.active ? 'text-[#ff7139]' : 'text-gray-600'}`} />
              <span className="flex-1 truncate font-semibold tracking-wide">{tab.title}</span>
              <button onClick={(e) => handleCloseTab(e, tab.id)} className={`ml-2 p-1 rounded-md transition-all ${tab.active ? 'hover:bg-red-500/20 text-gray-400 hover:text-red-400' : 'opacity-0 group-hover:opacity-100 text-gray-600 hover:text-white'}`}><X size={12} strokeWidth={2.5} /></button>
              {tab.active && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#ff7139] rounded-full"></div>}
            </div>
          ))}
          <button onClick={handleNewTab} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-gray-500 hover:text-[#ff7139] transition-all flex-shrink-0"><Plus size={20} strokeWidth={2.5} /></button>
        </div>
      </div>

      {/* Toolbar */}
      <div className={`flex ${isMobile ? 'flex-col gap-3' : 'flex-row gap-4'} items-center bg-[#21242c] p-3 border-b border-[#181a1f] shadow-xl z-10 flex-shrink-0`}>
        <div className="flex items-center gap-1.5 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-1">
            <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all"><ChevronLeft size={20} /></button>
            <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all"><ChevronRight size={20} /></button>
            <button onClick={handleRefresh} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all"><RotateCw size={18} className={isLoading ? 'animate-spin text-[#ff7139]' : ''} /></button>
            <button onClick={goHome} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all"><Home size={19} /></button>
          </div>
          {isMobile && <MoreVertical size={20} className="text-gray-400" />}
        </div>

        <div className="w-full flex-1 flex items-center bg-[#0f1115] rounded-2xl h-10 px-4 border border-[#30343d] focus-within:border-[#ff7139]/50 transition-all group shadow-inner">
          <div className="flex items-center gap-2 mr-3 border-r border-[#30343d] pr-3 py-1 text-[#ff7139]">
             <ShieldCheck size={16} strokeWidth={2.5} />
             <Lock size={12} className="opacity-60" />
          </div>
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (navigateTo(inputValue), e.target.blur())}
            className="w-full bg-transparent outline-none text-[13px] text-gray-100 font-medium placeholder:text-gray-600"
            placeholder="Search or enter address"
            spellCheck={false}
            autoComplete="off"
          />
          {!isMobile && <Star size={16} className="text-gray-600 hover:text-yellow-500 cursor-pointer ml-2" />}
        </div>

        {!isMobile && (
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all"><ShieldAlert size={18} /></button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all"><Menu size={22} /></button>
          </div>
        )}
      </div>

      {/* Viewport */}
      <div className="flex-1 bg-[#1c1b22] relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 z-50 bg-[#0f1115]/80 flex flex-col items-center justify-center backdrop-blur-sm transition-opacity duration-300">
            <div className="w-16 h-16 border-[3px] border-[#ff7139] border-t-transparent rounded-full animate-spin" />
            <span className="mt-4 text-[10px] text-[#ff7139] font-black uppercase tracking-widest">Loading...</span>
          </div>
        )}
        
        {activeTab.url === HOME_PAGE ? (
            <FirefoxHome />
        ) : activeTab.url ? (
          <iframe 
            src={activeTab.url} 
            key={activeTab.id + activeTab.url}
            title="firefox-viewport"
            className="w-full h-full border-none bg-white"
            id="firefox-screen"
            sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
             <RotateCw size={32} className="text-gray-800 animate-spin" />
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default Firefox;
export const displayFirefox = () => <Firefox />;
export const displayfilemanager = () => <Firefox />;