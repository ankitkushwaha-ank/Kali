import React, { useState, useEffect } from 'react';
import { 
  Monitor, 
  Image as ImageIcon, 
  Wifi, 
  Bluetooth, 
  User, 
  Info, 
  ChevronRight, 
  Search, 
  ShieldCheck, 
  Zap,
  Moon,
  Sun,
  Volume2,
  Smartphone,
  Lock,
  Globe,
  Bell,
  BellOff,
  UserPlus,
  Shield,
  Key,
  HardDrive,
  Cpu,
  ArrowLeft,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

export function Settings(props) {
    const [activeTab, setActiveTab] = useState(typeof window !== 'undefined' && window.innerWidth < 768 ? null : 'background');
    // Brightness is a controlled prop from Kali (persisted to localStorage and
    // applied as a CSS filter on the whole screen) — fall back to local state
    // only if the app is somehow rendered without those props wired up.
    const brightness = props.brightness !== undefined ? props.brightness : 100;
    const setBrightness = (value) => {
        const num = Number(value);
        if (props.changeBrightness) props.changeBrightness(num);
    };
    const [wifiEnabled, setWifiEnabled] = useState(true);
    const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
    const [dnd, setDnd] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (!mobile && activeTab === null) setActiveTab('background');
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [activeTab]);

    const wallpapers = {
        "wall-1": "./images/wallpapers/wall-1.webp",
        "wall-2": "./images/wallpapers/wall-2.webp",
        "wall-3": "./images/wallpapers/wall-3.webp",
        "wall-4": "./images/wallpapers/wall-4.webp",
        "wall-5": "./images/wallpapers/wall-5.webp",
        "wall-6": "./images/wallpapers/wall-6.webp",
        "wall-7": "./images/wallpapers/wall-7.webp",
        "wall-8": "./images/wallpapers/wall-8.webp",
    };

    const categories = [
        { id: 'background', label: 'Background', icon: ImageIcon, color: 'text-purple-400' },
        { id: 'display', label: 'Display', icon: Monitor, color: 'text-blue-400' },
        { id: 'network', label: 'Wi-Fi', icon: Wifi, color: 'text-emerald-400' },
        { id: 'bluetooth', label: 'Bluetooth', icon: Bluetooth, color: 'text-blue-500' },
        { id: 'notifications', label: 'Notifications', icon: Bell, color: 'text-yellow-400' },
        { id: 'users', label: 'Users', icon: User, color: 'text-orange-400' },
        { id: 'about', label: 'About', icon: Info, color: 'text-blue-300' },
    ];

    const renderContent = () => {
        const header = isMobile && (
            <button 
                onClick={() => setActiveTab(null)}
                className="flex items-center gap-2 mb-6 text-blue-500 font-bold text-sm transition-colors active:opacity-50"
            >
                <ArrowLeft size={18} /> Settings
            </button>
        );

        switch (activeTab) {
            case 'background':
                return (
                    <div className="duration-150">
                        {header}
                        <h2 className="text-xl md:text-2xl font-black mb-6 tracking-tight">Desktop Background</h2>
                        <div className="relative w-full aspect-video rounded-xl md:rounded-2xl overflow-hidden mb-6 md:mb-8 border border-white/10 shadow-lg">
                            <img 
                                src={wallpapers[props.currBgImgName] || wallpapers["wall-1"]} 
                                className="w-full h-full object-cover" 
                                alt="Current Preview" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute bottom-4 left-4 flex items-center gap-2">
                                <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg">
                                    <ShieldCheck size={16} className="text-white" />
                                </div>
                                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Production ESR v2025</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
                            {Object.keys(wallpapers).map((name) => (
                                <div 
                                    key={name}
                                    onClick={() => props.changeBackgroundImage(name)}
                                    className={`relative aspect-video rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-150 ${props.currBgImgName === name ? 'border-blue-500 shadow-md scale-95' : 'border-transparent active:scale-95'}`}
                                >
                                    <img src={wallpapers[name]} className="w-full h-full object-cover" alt={name} />
                                    {props.currBgImgName === name && (
                                        <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                                            <ShieldCheck size={20} className="text-white" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'network':
                return (
                    <div className="max-w-2xl">
                        {header}
                        <h2 className="text-xl md:text-2xl font-black mb-6 tracking-tight">Wi-Fi</h2>
                        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                            <div className="p-4 md:p-6 flex items-center justify-between border-b border-white/5 bg-white/[0.02]">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2.5 rounded-xl transition-colors ${wifiEnabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-500/10 text-gray-500'}`}>
                                        <Wifi size={20} />
                                    </div>
                                    <div>
                                        <div className="font-bold">Wi-Fi Network</div>
                                        <div className="text-[10px] text-gray-500">{wifiEnabled ? 'Connected to Kali-Secure' : 'Hardware disabled'}</div>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setWifiEnabled(!wifiEnabled)}
                                    className={`w-11 h-6 rounded-full relative transition-colors duration-150 ${wifiEnabled ? 'bg-emerald-600' : 'bg-white/10'}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-150 ${wifiEnabled ? 'right-1' : 'left-1'}`} />
                                </button>
                            </div>
                            {wifiEnabled ? (
                                <div className="p-2 md:p-4 space-y-1">
                                    {['Kali-Secure', 'NSA_Public_WiFi', 'Guest-Network'].map((net, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
                                            <div className="flex items-center gap-3 text-gray-300">
                                                <Wifi size={16} className={i === 0 ? "text-emerald-400" : "text-gray-500"} />
                                                <span className={`text-sm font-medium ${i === 0 ? "text-emerald-400" : ""}`}>{net}</span>
                                            </div>
                                            {i === 0 ? <span className="text-[9px] font-black text-emerald-500 uppercase">Connected</span> : <Lock size={12} className="text-gray-600" />}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-10 text-center text-gray-600 italic text-sm">Wi-Fi is turned off</div>
                            )}
                        </div>
                    </div>
                );

            case 'bluetooth':
                return (
                    <div className="max-w-2xl">
                        {header}
                        <h2 className="text-xl md:text-2xl font-black mb-6 tracking-tight">Bluetooth</h2>
                        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                            <div className="p-4 md:p-6 flex items-center justify-between border-b border-white/5 bg-white/[0.02]">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2.5 rounded-xl transition-colors ${bluetoothEnabled ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/10 text-gray-500'}`}>
                                        <Bluetooth size={20} />
                                    </div>
                                    <div>
                                        <div className="font-bold">Bluetooth Radio</div>
                                        <div className="text-[10px] text-gray-500">Kali-Station-Alpha</div>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
                                    className={`w-11 h-6 rounded-full relative transition-colors duration-150 ${bluetoothEnabled ? 'bg-blue-600' : 'bg-white/10'}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-150 ${bluetoothEnabled ? 'right-1' : 'left-1'}`} />
                                </button>
                            </div>
                            {bluetoothEnabled && (
                                <div className="p-2 md:p-4 space-y-1">
                                    {['Sony WH-1000XM4', 'MX Master 3S'].map((dev, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
                                            <div className="flex items-center gap-3 text-gray-300">
                                                <Smartphone size={16} className="text-gray-500" />
                                                <span className="text-sm font-medium">{dev}</span>
                                            </div>
                                            <span className="text-[9px] font-bold text-blue-500 uppercase tracking-tighter">Connected</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 'notifications':
                return (
                    <div className="max-w-2xl">
                        {header}
                        <h2 className="text-xl md:text-2xl font-black mb-6 tracking-tight">Notifications</h2>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6 flex items-center justify-between shadow-lg">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl ${dnd ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                    {dnd ? <BellOff size={22} /> : <Bell size={22} />}
                                </div>
                                <div>
                                    <div className="font-bold text-sm">Do Not Disturb</div>
                                    <div className="text-[10px] text-gray-500 uppercase font-black">Pause all alerts</div>
                                </div>
                            </div>
                            <button 
                                onClick={() => setDnd(!dnd)}
                                className={`w-11 h-6 rounded-full relative transition-colors duration-150 ${dnd ? 'bg-orange-600' : 'bg-white/10'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-150 ${dnd ? 'right-1' : 'left-1'}`} />
                            </button>
                        </div>
                        <div className="space-y-2">
                            {['Firefox Browser', 'System Terminal', 'Music Hub'].map(app => (
                                <div key={app} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                    <span className="text-sm font-bold">{app}</span>
                                    <span className="text-[9px] font-black text-blue-400 uppercase bg-blue-400/10 px-2 py-1 rounded">Enabled</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'display':
                return (
                    <div className="max-w-2xl">
                        {header}
                        <h2 className="text-xl md:text-2xl font-black mb-6 tracking-tight">Display</h2>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-4">
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center gap-3 text-gray-300">
                                    <Sun size={20} className="text-yellow-400" />
                                    <div className="font-bold text-sm">Brightness</div>
                                </div>
                                <span className="text-xs font-mono text-blue-400 font-bold">{brightness}%</span>
                            </div>
                            <input 
                                type="range" 
                                min="20"
                                max="100"
                                value={brightness} 
                                onChange={(e) => setBrightness(e.target.value)}
                                className="w-full h-1.5 bg-white/10 rounded-full accent-blue-500 appearance-none cursor-pointer" 
                            />
                        </div>
                    </div>
                );

            case 'users':
                return (
                    <div className="max-w-2xl">
                        {header}
                        <h2 className="text-xl md:text-2xl font-black mb-6 tracking-tight">Users</h2>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col items-center text-center">
                            <div className="relative mb-6">
                                <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-4xl font-black text-white shadow-2xl border-4 border-white/10">A</div>
                                <div className="absolute bottom-0 right-0 p-1.5 bg-emerald-500 rounded-full border-4 border-[#1e2127]">
                                    <Shield size={16} className="text-white" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-black tracking-tight">Ankit kushwaha</h3>
                            <span className="text-xs font-black text-blue-500 uppercase tracking-[0.2em] mb-8">System Administrator</span>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-left">
                                <div className="p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                                    <Key size={18} className="text-orange-400 mb-2" />
                                    <div className="text-sm font-bold">Authentication</div>
                                    <div className="text-[10px] text-gray-500">Change password & keys</div>
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                                    <UserPlus size={18} className="text-blue-400 mb-2" />
                                    <div className="text-sm font-bold">Account Access</div>
                                    <div className="text-[10px] text-gray-500">Manage login sessions</div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'about':
                return (
                    <div className="text-center py-4 max-w-md mx-auto">
                        {isMobile && <div className="text-left">{header}</div>}
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-700 to-blue-400 rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-6 border border-white/20">
                            <ShieldCheck size={40} className="text-white" />
                        </div>
                        <h2 className="text-3xl font-black mb-1 tracking-tighter text-white">Kali Linux</h2>
                        <p className="text-[9px] font-black text-blue-500 uppercase tracking-[0.4em] mb-8 opacity-80">Rolling Release 2025</p>
                        
                        <div className="bg-white/5 rounded-2xl border border-white/10 p-1">
                            {[
                                { icon: Cpu, label: 'CPU', val: 'AMD Ryzen™ 9' },
                                { icon: Zap, label: 'RAM', val: '16.0 GB' },
                                { icon: HardDrive, label: 'Disk', val: '512 GB SSD' }
                            ].map((spec, i) => (
                                <div key={i} className="flex items-center justify-between p-3.5 hover:bg-white/5 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <spec.icon size={14} className="text-gray-500" />
                                        <span className="text-[11px] font-bold text-gray-500">{spec.label}</span>
                                    </div>
                                    <span className="text-[11px] font-bold text-gray-200">{spec.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="flex flex-col items-center justify-center py-10 opacity-40">
                        {header}
                        <Zap size={48} className="mb-4" />
                        <p className="text-sm font-bold uppercase tracking-widest">Select a Module</p>
                    </div>
                );
        }
    };

    return (
        <div className="flex h-full w-full bg-[#181a1f] text-[#eeeeee] font-sans select-none overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900 via-transparent to-transparent" />

            {/* Sidebar Navigation */}
            <div className={`
                ${isMobile && activeTab !== null ? 'hidden' : 'flex'}
                w-full md:w-72 bg-[#121418] border-r border-[#2a2e35] flex-col p-4 flex-shrink-0 z-10
            `}>
                <div className="relative mb-6">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input 
                        type="text" 
                        placeholder="Search Settings" 
                        className="w-full bg-[#0a0c0f] border border-[#30343d] rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none focus:border-blue-500/50"
                    />
                </div>

                <div className="flex-1 space-y-1 overflow-y-auto">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        const isSelected = activeTab === cat.id;
                        return (
                            <div 
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className={`flex items-center justify-between px-4 py-3.5 rounded-xl cursor-default transition-colors duration-150 ${isSelected ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-white/5 text-gray-400 active:bg-white/10'}`}
                            >
                                <div className="flex items-center gap-3.5">
                                    <Icon size={18} className={isSelected ? 'text-white' : `${cat.color}`} />
                                    <span className="text-[13px] font-bold tracking-tight uppercase">{cat.label}</span>
                                </div>
                                {!isSelected && <ChevronRight size={14} className="opacity-20" />}
                            </div>
                        );
                    })}
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-4 px-2" onClick={() => setActiveTab('users')}>
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-black text-xs text-white">A</div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-[12px] font-black tracking-tight">Ankit kushwaha</span>
                        <span className="text-[9px] text-gray-600 font-bold uppercase">Root Admin</span>
                    </div>
                </div>
            </div>

            {/* Main Content Pane */}
            <div className={`
                ${isMobile && activeTab === null ? 'hidden' : 'flex'}
                flex-1 overflow-y-auto p-5 md:p-12 bg-[#1e2127]
            `}>
                <div className="w-full max-w-4xl mx-auto">
                    {renderContent()}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #2a2e35; border-radius: 10px; }
                input[type='range']::-webkit-slider-thumb { 
                    appearance: none; 
                    height: 16px; 
                    width: 16px; 
                    border-radius: 50%; 
                    background: #ffffff; 
                    cursor: pointer; 
                    box-shadow: 0 2px 5px rgba(0,0,0,0.5); 
                    border: 2px solid #2563eb; 
                }
            `}} />
        </div>
    );
}

export default Settings;

export const displaySettings = (props) => {
    return <Settings {...props} />;
};