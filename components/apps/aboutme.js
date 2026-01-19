import React, { useState, useEffect } from 'react';
import { 
  User, 
  Terminal, 
  ShieldCheck, 
  Code, 
  Globe, 
  Cpu, 
  Zap, 
  Briefcase, 
  GraduationCap, 
  Linkedin, 
  Mail, 
  MapPin, 
  ExternalLink,
  Github,
  LayoutGrid,
  Lock,
  Search,
  Award,
  Database,
  Rocket,
  MessageSquare,
  Package,
  FileText,
  Download,
  Bot,
  Youtube,
  Layers,
  BookOpen,
  Fingerprint
} from 'lucide-react';

const AboutAnkit = (props) => {
  const [activeSection, setActiveSection] = useState('profile');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const stats = [
    { label: "OS Mastery", val: "Kali / Linux", icon: Terminal },
    { label: "Neural Node", val: "IIT Patna", icon: GraduationCap },
    { label: "Active Code", val: "MERN / PHP", icon: Code },
    { label: "Core Build", val: "BlackOS", icon: Layers }
  ];

  const projects = [
    {
      title: "IKON Digital",
      type: "Startup / Quick Commerce",
      desc: "Revolutionizing quick-commerce for Tier-2 and Tier-3 cities in India. Focused on hyper-local logistics and supply chain optimization.",
      stack: ["PHP", "MySQL", "Hostinger"],
      icon: Package,
      color: "text-blue-400",
      status: "Production"
    },
    {
      title: "Buzzi Social",
      type: "Startup / Networking",
      desc: "A high-engagement social media platform built for modern networking, featuring secure data handling and real-time feeds.",
      stack: ["PHP", "React", "Hostinger"],
      icon: MessageSquare,
      color: "text-purple-400",
      status: "Production"
    },
    {
      title: "IITP Companion",
      type: "Campus Utility / All-in-One",
      desc: "The ultimate survival tool for IIT Patna students. Includes bus/train tracking, food ordering, academic support, and event calendars.",
      stack: ["Full Stack", "Live Tracking"],
      icon: GraduationCap,
      color: "text-emerald-400",
      status: "Active"
    },
    {
      title: "BlackOS",
      type: "Operating System Project",
      desc: "An ambitious initiative to develop a custom operating system environment tailored for performance and cybersecurity research.",
      stack: ["System Design", "Kernel Logic"],
      icon: Layers,
      color: "text-red-500",
      status: "R&D"
    },
    {
      title: "Security Learning Bot",
      type: "Telegram / Automation",
      desc: "A specialized Telegram bot designed to deliver cybersecurity modules, daily ethical hacking challenges, and security news.",
      stack: ["Python", "Telegram API"],
      icon: Bot,
      color: "text-yellow-400",
      status: "Deployed"
    },
    {
      title: "Food Factory",
      type: "Web / E-Commerce",
      desc: "A streamlined food ordering site with focus on UI/UX simplicity and rapid checkout processes.",
      stack: ["React", "Node.js"],
      icon: Rocket,
      color: "text-orange-400",
      status: "Archived"
    }
  ];

  const experience = [
    {
      title: "Team Lead - Hack n Tech",
      org: "IIT Patna",
      date: "May 2025",
      desc: "Led a 5-member team through full-cycle development and successful presentation at the IIT Patna flagship hackathon.",
      icon: Award,
      color: "text-blue-400"
    },
    {
      title: "Team Lead - Hack 4 Brahma",
      org: "Guwahati University",
      date: "2025",
      desc: "Directed architecture and team coordination at a major regional hackathon, focusing on innovative problem solving.",
      icon: Award,
      color: "text-purple-400"
    },
    {
      title: "Google Student Ambassador",
      org: "Google",
      date: "Aug 2025",
      desc: "Representing Google on campus, organizing tech events, and building developer communities.",
      icon: Zap,
      color: "text-yellow-400"
    },
    {
      title: "DevFest Participant",
      org: "Google DevFest Patna",
      date: "Dec 2025",
      desc: "Deep-dived into AI and cloud advancements with industry experts during the Patna DevFest summit.",
      icon: Globe,
      color: "text-blue-500"
    }
  ];

  const education = [
    {
      degree: "Bachelor in Science (Hons.) Computer Science & Data Analytics",
      institution: "Indian Institute of Technology Patna",
      date: "2024 — 2028",
      desc: "Gaining in-depth knowledge of software development, data analytics, and cybersecurity with hands-on project experience.",
      icon: GraduationCap,
      color: "text-blue-500"
    },
    {
      degree: "Senior Secondary (10+2) BSEB Board",
      institution: "Utkramit Madhyamik School Donwar, Yogapatti",
      date: "2023 — 2024",
      desc: "Achieved 81%, building a strong foundation in analytical and problem-solving skills in PCM domain.",
      icon: BookOpen,
      color: "text-emerald-500"
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row items-center gap-10 mb-12">
              <div className="relative group">
                {/* Profile Image with Cyber Glow */}
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-[2.5rem] bg-zinc-900 overflow-hidden border-4 border-white/5 shadow-2xl relative z-10">
                  <img 
                    src="./images/me/ankit.jpg" 
                    alt="Ankit Kumar" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-6xl font-black text-white bg-blue-600">A</div>';
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-blue-500 rounded-[2.5rem] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 p-3 rounded-2xl border-4 border-[#0f1115] z-20 shadow-xl">
                  <ShieldCheck size={24} className="text-white" />
                </div>
              </div>
              <div className="text-center md:text-left flex-1">
                <div className="flex flex-col md:flex-row md:items-end gap-3 mb-3">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase">Ankit Kumar</h1>
                    <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg mb-1 md:mb-2 w-fit mx-auto md:mx-0">Node v2025</span>
                </div>
                <p className="text-blue-400 font-bold tracking-[0.4em] text-[10px] uppercase mb-6 flex items-center justify-center md:justify-start gap-2">
                   <Fingerprint size={16}/> Full Stack Developer | Cyber Security Enthusiast
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                   <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-gray-400"><MapPin size={14}/> Bettiah, Bihar</div>
                   <a href="https://linkedin.com/in/ankitkushwaha-ank" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-gray-400 underline cursor-pointer hover:text-white transition-colors"><Linkedin size={14}/> LinkedIn Profile</a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {stats.map((s, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/5 p-5 rounded-3xl flex flex-col items-center gap-2 transition-all hover:bg-white/[0.07] hover:border-blue-500/20 group">
                   <s.icon size={22} className="text-blue-500 group-hover:scale-110 transition-transform" />
                   <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest">{s.label}</span>
                   <span className="text-[11px] font-bold text-white uppercase tracking-tight">{s.val}</span>
                </div>
              ))}
            </div>

            <div className="bg-blue-600/5 border border-blue-500/20 p-8 rounded-[2rem] relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none"><Cpu size={140} /></div>
               <h3 className="text-blue-400 text-[10px] font-black uppercase tracking-[0.5em] mb-6">Strategic Profile</h3>
               <p className="text-gray-300 text-sm md:text-lg leading-relaxed font-medium">
                  Currently scaling <span className="text-white font-bold">IKON</span> and <span className="text-white font-bold">Buzzi</span> while pursuing 
                  Computer Science & Data Analytics at <span className="text-blue-500 font-bold">IIT Patna</span>. 
                  My focus lies at the intersection of high-performance backend architecture and defensive cybersecurity operations.
               </p>
            </div>
          </div>
        );
      case 'projects':
        return (
          <div className="animate-in fade-in duration-300">
             <div className="flex justify-between items-end mb-10">
                <div>
                   <h2 className="text-3xl font-black tracking-tight text-white uppercase mb-1">Development Arsenal</h2>
                   <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Active nodes and production builds</p>
                </div>
                <Rocket className="text-blue-500" size={32} />
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
                {projects.map((proj, i) => (
                  <div key={i} className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-7 group hover:bg-white/[0.05] hover:border-blue-500/30 transition-all flex flex-col h-full">
                     <div className="flex justify-between items-start mb-6">
                        <div className={`p-4 rounded-2xl bg-black/40 border border-white/5 text-white shadow-xl`}>
                           <proj.icon size={26} />
                        </div>
                        <div className="flex flex-col items-end">
                           <span className="text-[9px] font-black uppercase tracking-widest text-blue-500 mb-1">{proj.status}</span>
                           <span className="text-[8px] text-gray-600 font-bold uppercase tracking-[0.2em]">{proj.type}</span>
                        </div>
                     </div>
                     <h3 className="text-xl font-black text-white uppercase tracking-tight mb-3">{proj.title}</h3>
                     <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">{proj.desc}</p>
                     <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                        {proj.stack.map(tag => (
                          <span key={tag} className="text-[10px] font-bold text-gray-300 px-2 py-1 bg-white/5 rounded-lg border border-white/5">{tag}</span>
                        ))}
                     </div>
                  </div>
                ))}
             </div>
          </div>
        );
      case 'experience':
        return (
          <div className="animate-in fade-in duration-300">
             <h2 className="text-3xl font-black mb-12 tracking-tight text-white uppercase flex items-center gap-4">
                <Terminal className="text-blue-500" /> Activity Log
             </h2>
             <div className="relative border-l-2 border-white/5 ml-4 space-y-12">
                {experience.map((exp, i) => (
                  <div key={i} className="relative pl-10 group">
                     <div className="absolute -left-[11px] top-0 w-5 h-5 bg-[#0f1115] border-2 border-white/10 rounded-full flex items-center justify-center transition-all group-hover:border-blue-500">
                        <div className={`w-1.5 h-1.5 rounded-full ${exp.color.replace('text-', 'bg-')}`} />
                     </div>
                     <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl hover:bg-white/[0.06] transition-all">
                        <div className="flex flex-col md:flex-row justify-between mb-3 gap-2">
                           <h4 className="font-black text-white text-lg uppercase">{exp.title}</h4>
                           <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full h-fit">{exp.date}</span>
                        </div>
                        <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${exp.color}`}>{exp.org}</p>
                        <p className="text-gray-400 text-sm leading-relaxed font-medium">{exp.desc}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        );
      case 'education':
        return (
          <div className="animate-in fade-in duration-300">
            <h2 className="text-3xl font-black mb-12 tracking-tight text-white uppercase flex items-center gap-4">
               <GraduationCap className="text-blue-500" /> Academic Roadmap
            </h2>
            <div className="space-y-8">
               {education.map((edu, i) => (
                 <div key={i} className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl group hover:bg-white/[0.05] transition-all">
                    <div className="flex items-center gap-6 mb-4">
                       <div className={`p-4 rounded-2xl bg-black/40 border border-white/5 ${edu.color} shadow-lg group-hover:scale-110 transition-transform`}>
                          <edu.icon size={24} />
                       </div>
                       <div>
                          <h4 className="font-black text-white text-lg uppercase leading-tight">{edu.institution}</h4>
                          <p className={`text-[10px] font-black uppercase tracking-[0.2em] mt-1 ${edu.color}`}>{edu.degree}</p>
                       </div>
                    </div>
                    <div className="ml-0 md:ml-20">
                       <span className="inline-block text-[10px] font-black text-gray-500 uppercase tracking-widest bg-black/40 px-3 py-1 rounded-lg mb-4">{edu.date}</span>
                       <p className="text-gray-400 text-sm leading-relaxed">{edu.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        );
      case 'resume':
        return (
          <div className="animate-in fade-in duration-300 h-full flex flex-col">
             <div className="flex justify-between items-center mb-8">
                <div>
                   <h2 className="text-3xl font-black tracking-tight text-white uppercase">Identity Credentials</h2>
                   <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Official CV / Resume Node</p>
                </div>
                <a 
                   href="./images/me/Professional CV Resume Ankit.pdf" 
                   download 
                   className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95"
                >
                   Download PDF <Download size={16} />
                </a>
             </div>
             <div className="flex-1 min-h-[550px] bg-white/5 rounded-[2.5rem] overflow-hidden border border-white/10 relative shadow-2xl">
                <iframe 
                   src="./images/me/Professional CV Resume Ankit.pdf#toolbar=0" 
                   className="w-full h-full border-none opacity-90"
                   title="Ankit Resume"
                />
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div id={props.id} className="flex h-full w-full bg-[#0f1115] text-[#eeeeee] font-sans select-none overflow-hidden relative">
      <div className="absolute top-0 right-0 w-2/3 h-full pointer-events-none opacity-25" 
           style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, #2563eb15, transparent 60%)' }} />

      {/* Navigation Sidebar */}
      {!isMobile && (
        <div className="w-64 bg-[#121418] border-r border-white/5 flex flex-col p-8 z-20">
          <div className="mb-12 flex items-center gap-3 px-1">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-transform hover:scale-105"><Zap size={20} className="text-white fill-white" /></div>
            <div className="flex flex-col leading-none">
               <span className="text-[13px] font-black uppercase tracking-[0.2em] text-white">ANKIT NODE</span>
               <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest mt-1">System Admin</span>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            {[
              { id: 'profile', label: 'Identity', icon: User },
              { id: 'projects', label: 'Inventory', icon: LayoutGrid },
              { id: 'education', label: 'Education', icon: BookOpen },
              { id: 'experience', label: 'History', icon: Briefcase },
              { id: 'resume', label: 'Resume', icon: FileText }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest ${activeSection === item.id ? 'bg-blue-600 text-white shadow-xl translate-x-2' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
              >
                <item.icon size={18} /> {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto space-y-4">
             <div className="p-5 bg-white/[0.02] rounded-[1.5rem] border border-white/5">
                <div className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-4">Remote Access</div>
                <div className="flex justify-between items-center px-1">
                   <a href="https://linkedin.com/in/ankitkushwaha-ank" target="_blank" rel="noreferrer" className="p-2 hover:bg-blue-600/20 rounded-xl transition-colors"><Linkedin size={18} className="text-gray-500 hover:text-blue-400" /></a>
                   <a href="https://github.com/ankitkushwaha-ank" target="_blank" rel="noreferrer" className="p-2 hover:bg-white/10 rounded-xl transition-colors"><Github size={18} className="text-gray-500 hover:text-white" /></a>
                   <a href="mailto:Ankitkushwaha.ank@gmail.com" className="p-2 hover:bg-red-600/20 rounded-xl transition-colors"><Mail size={18} className="text-gray-500 hover:text-red-400" /></a>
                   <a href="https://ankit.co.in" target="_blank" rel="noreferrer" className="p-2 hover:bg-emerald-600/20 rounded-xl transition-colors flex items-center justify-center active:scale-90"><Globe size={18} className="text-gray-500 hover:text-emerald-400" /></a>
                </div>
             </div>
             <div className="text-[8px] font-black text-gray-800 uppercase tracking-[0.4em] text-center">Production Build v2.5</div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Mobile Header */}
        {isMobile && (
          <div className="bg-[#121418] border-b border-white/5 p-4 flex justify-between items-center">
             <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-black text-[10px] shadow-lg">A</div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white">Ankit Kumar</span>
             </div>
             <div className="flex gap-2">
                {['profile', 'projects', 'education', 'resume'].map(s => (
                  <button 
                    key={s} 
                    onClick={() => setActiveSection(s)}
                    className={`p-2.5 rounded-xl transition-all ${activeSection === s ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/5 text-gray-500'}`}
                  >
                    {s === 'profile' && <User size={18}/>}
                    {s === 'projects' && <LayoutGrid size={18}/>}
                    {s === 'education' && <BookOpen size={18}/>}
                    {s === 'resume' && <FileText size={18}/>}
                  </button>
                ))}
             </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-8 md:p-20 custom-scrollbar scroll-smooth">
          <div className="max-w-5xl mx-auto">
            {renderContent()}
          </div>
        </div>

        {/* Status Bar Footer */}
        <div className="bg-[#121418]/60 backdrop-blur-2xl border-t border-white/5 p-4 md:px-20 flex justify-between items-center">
           <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" /> Status: Operational
              </span>
              <span className="hidden md:flex items-center gap-2 text-[10px] font-black text-gray-700 uppercase tracking-widest">
                 IIT Patna Terminal Connection Secure
              </span>
           </div>
           <button className="flex items-center gap-2.5 px-7 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-[1.2rem] text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(37,99,235,0.4)] active:scale-95 group">
              Establish Contact <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
           </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e2127; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3b82f6; }
      `}} />
    </div>
  );
};

export default AboutAnkit;

/**
 * EXPORTS: Functional wrappers for the window manager system.
 */
export const displayAboutankit = (props) => <AboutAnkit {...props} />;
export const displayAboutAli = (props) => <AboutAnkit {...props} />;