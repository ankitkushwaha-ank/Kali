import React, { useEffect, useRef } from 'react';

// Categorised groupings of the app ids defined in apps.config.js, mirroring the
// real Kali Linux "Applications" menu layout (Information Gathering, Vulnerability
// Analysis, Web Applications, etc.) while keeping the portfolio-specific apps
// grouped up front for recruiters who don't know Kali's tool taxonomy.
const CATEGORIES = [
  {
    label: "Portfolio",
    apps: ["about-me", "home", "gedit", "terminal", "vakmann", "ikon", "buzzi"]
  },
  {
    label: "Information Gathering",
    apps: ["nmap", "shadon", "zoomeye", "tracer"]
  },
  {
    label: "Vulnerability Analysis",
    apps: ["metasploit", "sqlmap", "exploit-database"]
  },
  {
    label: "Web Applications",
    apps: ["firefox", "chrome", "apache", "github"]
  },
  {
    label: "System Tools",
    apps: ["root-terminal", "calc", "vscode", "editor", "cherrytree", "crypt"]
  },
  {
    label: "Accessories",
    apps: ["spotify", "vlc", "weather", "message", "trash", "settings"]
  }
];

export default function ApplicationsMenu({ apps, openApp, onClose, onOpenSearch }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) onClose();
    };
    const handleEscape = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const findApp = (id) => apps.find(a => a.id === id);

  const handleSelect = (id) => {
    openApp(id);
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className="absolute top-8 left-0 z-[60] w-[560px] max-w-[92vw] bg-[#1b1d21]/95 backdrop-blur-xl border border-white/10 rounded-b-xl shadow-2xl overflow-hidden animate-in fade-in duration-150"
    >
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
        <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">Applications</span>
        <button
          onClick={() => { onOpenSearch(); onClose(); }}
          className="text-[10px] font-bold text-blue-400 hover:text-blue-300 uppercase tracking-widest transition-colors"
        >
          Search All →
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-0 max-h-[70vh] overflow-y-auto">
        {CATEGORIES.map((cat) => (
          <div key={cat.label} className="p-3 border-b border-r border-white/5">
            <div className="text-[9px] font-black uppercase tracking-widest text-blue-400 mb-2 px-1">{cat.label}</div>
            <div className="space-y-0.5">
              {cat.apps.map((id) => {
                const app = findApp(id);
                if (!app) return null;
                return (
                  <button
                    key={id}
                    onClick={() => handleSelect(id)}
                    title={app.title}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/10 text-left transition-colors group"
                  >
                    <img src={app.icon} alt="" className="h-4 w-4 flex-shrink-0" />
                    <span className="text-[11px] text-gray-300 group-hover:text-white truncate">{app.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
