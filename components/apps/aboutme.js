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
  Search,
  Award,
  Database,
  Rocket,
  Package,
  FileText,
  Download,
  Layers,
  BookOpen,
  Fingerprint,
  Instagram,
  GitBranch,
  Server
} from 'lucide-react';

// ===== Single source of truth for Ankit's real profile/resume data =====
// ===== Auto-calculating academic year =====
// Program: B.Sc. (Hons.) CS & Data Analytics, IIT Patna — 4-year program,
// batch admitted in 2024 (academic year 2024-25), expected completion July 2028.
// IIT Patna's academic year rolls over around July/August, so a student's
// "year" ticks up once per year on that boundary — this keeps the resume
// accurate automatically instead of needing a manual edit every year.
const PROGRAM_START_YEAR = 2024;
const PROGRAM_DURATION_YEARS = 4;
const PROGRAM_END_MONTH = 6; // July (0-indexed: June=5, July=6)
const PROGRAM_END_YEAR = PROGRAM_START_YEAR + PROGRAM_DURATION_YEARS; // 2028
const ACADEMIC_ROLLOVER_MONTH = 7; // August (0-indexed) — new academic year begins

function getCurrentAcademicYear(referenceDate = new Date()) {
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();

  // Before the program even starts (shouldn't happen in practice, but keep it safe)
  if (year < PROGRAM_START_YEAR) return { yearNumber: 0, label: "Incoming", isGraduated: false };

  // Number of academic rollovers (Augusts) that have passed since admission
  let yearsElapsed = year - PROGRAM_START_YEAR;
  if (month < ACADEMIC_ROLLOVER_MONTH) yearsElapsed -= 1; // hasn't rolled over yet this calendar year
  let yearNumber = yearsElapsed + 1;

  const isGraduated = year > PROGRAM_END_YEAR || (year === PROGRAM_END_YEAR && month > PROGRAM_END_MONTH);

  if (isGraduated) return { yearNumber: PROGRAM_DURATION_YEARS, label: "Graduate", isGraduated: true };
  if (yearNumber < 1) yearNumber = 1;
  if (yearNumber > PROGRAM_DURATION_YEARS) yearNumber = PROGRAM_DURATION_YEARS;

  const ordinal = ["", "First", "Second", "Third", "Fourth"][yearNumber] || `${yearNumber}th`;
  return { yearNumber, label: `${ordinal}-year`, isGraduated: false };
}

const ACADEMIC_STATUS = getCurrentAcademicYear();

const PROFILE = {
  name: "Ankit Kumar",
  title: "Full Stack Developer | Cyber Security Enthusiast",
  tagline: "B.Sc. (Hons.) Computer Science & Data Analytics, IIT Patna",
  cgpa: "9.3 / 10",
  location: "Bettiah, Bihar, India",
  email: "ankitkushwaha.ank@gmail.com",
  collegeEmail: "ankit_24a12res854@iitp.ac.in",
  linkedin: "https://www.linkedin.com/in/ankitkushwaha-ank/",
  github: "https://github.com/ankitkushwaha-ank/",
  instagram: "https://www.instagram.com/ankitkushwaha.ank/",
  resumePath: "./images/me/Ankit_Kumar_Resume_IITP.pdf",
  academicYearLabel: ACADEMIC_STATUS.label,
  internshipStatus: "ISRO Intern — Joining Oct 2026",
  summary: `${ACADEMIC_STATUS.isGraduated ? "Graduate" : ACADEMIC_STATUS.label} B.Sc. (Hons.) Computer Science and Data Analytics student at IIT Patna (CGPA: 9.3/10) with production-grade full-stack development experience across the MERN stack, PHP, and Django. Independently architected and delivered two live client platforms serving 1,000+ active users with real e-commerce transactions. Proficient in RESTful API design, relational and NoSQL databases, cloud deployment, and version control. Familiar with TypeScript, microservices architecture, and system design principles. Recently received an internship offer from ISRO, joining October 2026.`
};

const stats = [
  { label: "CGPA", val: "9.3 / 10", icon: GraduationCap },
  { label: "Academic Year", val: `${ACADEMIC_STATUS.label} · IIT Patna`, icon: Award },
  { label: "Active Stack", val: "MERN / PHP / Django", icon: Code },
  { label: "Live Users Served", val: "1,000+", icon: Rocket }
];

const skills = {
  Languages: ["JavaScript (ES6+)", "TypeScript", "Python", "PHP", "Dart", "HTML5", "CSS3"],
  "Frameworks & Libraries": ["React.js", "Next.js", "Node.js", "Express.js", "Django", "Flutter", "REST API Design"],
  Databases: ["MongoDB", "MySQL", "PostgreSQL", "Firebase Realtime DB", "Firestore"],
  "Cloud & DevOps": ["Google Cloud Platform", "Vercel", "Hostinger", "GitHub", "CI/CD"],
  Tools: ["Postman", "VS Code", "npm", "Linux", "Git", "Android Studio"],
  Concepts: ["System Design", "Microservices Architecture", "DSA", "DBMS", "Agile Development"]
};

const projects = [
  {
    title: "Netpar.in",
    type: "Client Project · Full Stack Developer",
    date: "Jan 2025 — Present",
    desc: "Architected and delivered a production social media + e-commerce platform independently — auth, social feed, product listings, cart, and checkout — serving 1,000+ active users with verified real-money purchases. Normalised PostgreSQL schema cut average page load time ~30%.",
    stack: ["PHP", "MySQL", "PostgreSQL", "REST APIs", "Hostinger"],
    icon: Server,
    color: "text-blue-400",
    status: "Production",
    link: "https://netpar.in"
  },
  {
    title: "Vakmann",
    type: "App Development · Smart AI Assistant",
    date: "2026 — In Development",
    desc: "A smart AI assistant app built with Flutter — currently in active development. Focused on natural, voice-driven assistance with a clean cross-platform mobile experience.",
    stack: ["Flutter", "Dart", "AI/ML"],
    icon: Zap,
    color: "text-cyan-400",
    status: "In Development",
    link: "https://vakmann.com"
  },
  {
    title: "Heritage Threads",
    type: "Client Project · Managed by Ankit",
    date: "Apr 2025 — May 2025",
    desc: "A client project managed end-to-end by Ankit — full production e-commerce site for a Maithili art seller, covering catalogue, cart, order management, and Razorpay payment integration, delivered in a 4-week timeline. RESTful Node/Express API with JWT auth, MongoDB Atlas.",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js", "Vercel"],
    icon: Package,
    color: "text-purple-400",
    status: "Production",
    link: null
  },
  {
    title: "IITP Companion",
    type: "Capstone Project",
    date: "Jan 2025 — Apr 2025",
    desc: "Unified campus portal for IIT Patna covering academic updates, real-time bus tracking, quizzes, and event listings, actively used by students across multiple batches. Django ORM with a relational schema for users, routes, and events.",
    stack: ["Django", "JavaScript", "HTML/CSS"],
    icon: GraduationCap,
    color: "text-emerald-400",
    status: "Active",
    link: "https://iitpcompanion.onrender.com/"
  },
  {
    title: "Ikon",
    type: "Client Project · Managed by Ankit",
    date: "Feb 2025 — Mar 2025",
    desc: "A client project managed by Ankit — hyperlocal e-commerce platform for Tier-3 city markets, optimised for low bandwidth (under 200KB initial page weight). Progressive enhancement keeps the core purchase flow working without JavaScript for accessibility on 2G connections.",
    stack: ["PHP", "JavaScript", "MySQL"],
    icon: Layers,
    color: "text-orange-400",
    status: "Live",
    link: "https://ikon.org.in"
  },
  {
    title: "Buzzi",
    type: "Client Project · Managed by Ankit",
    date: "2025",
    desc: "A client project managed by Ankit — high-engagement social media / networking platform with secure data handling and real-time feeds.",
    stack: ["PHP", "React", "Hostinger"],
    icon: GitBranch,
    color: "text-yellow-400",
    status: "In Progress",
    link: "https://buzzi.co.in"
  },
  {
    title: "YouTube Downloader",
    type: "Personal Project · Utility Tool",
    date: "2025",
    desc: "A fast, no-frills web tool for downloading YouTube videos/audio, deployed as a lightweight utility app.",
    stack: ["JavaScript", "Next.js", "Vercel"],
    icon: Download,
    color: "text-red-500",
    status: "Live",
    link: "https://yt-downloader-red.vercel.app/"
  },
  {
    title: "Kali Linux Portfolio",
    type: "Personal Project",
    date: "2025",
    desc: "This very site — an interactive terminal-emulator portfolio with command-line navigation, keyboard shortcuts, and a custom Kali XFCE-styled desktop rendering engine, showcasing DOM manipulation and UX engineering.",
    stack: ["HTML", "CSS", "JavaScript", "Next.js"],
    icon: Terminal,
    color: "text-red-400",
    status: "Live",
    link: "https://kali-pru9.vercel.app"
  }
];

const experience = [
  {
    title: "Incoming Intern",
    org: "ISRO (Indian Space Research Organisation)",
    date: "Joining October 2026",
    desc: "Received an internship offer letter from ISRO. Joining in October 2026.",
    icon: Rocket,
    color: "text-orange-500"
  },
  {
    title: "Full Stack Developer",
    org: "Netpar.in (Client Project)",
    date: "Jan 2025 — Present",
    desc: "Managed the full project lifecycle — requirements gathering, architecture decisions, deployment pipeline, DNS configuration, and ongoing client communication — with zero third-party developer involvement. Currently extending the platform to Android and iOS via Flutter.",
    icon: Server,
    color: "text-blue-400"
  },
  {
    title: "Full Stack Developer",
    org: "Heritage Threads (Client Project)",
    date: "Apr 2025 — May 2025",
    desc: "Delivered a production e-commerce site within a 4-week timeline; deployed on Vercel with continuous deployment from GitHub, managing client revisions, staging reviews, and final handoff.",
    icon: Package,
    color: "text-purple-400"
  },
  {
    title: "Cybersecurity Internship",
    org: "CodeAlpha",
    date: "2025",
    desc: "Completed a cybersecurity internship program, building foundational skills in security analysis and ethical hacking practices.",
    icon: ShieldCheck,
    color: "text-red-400"
  },
  {
    title: "GenAI Powered Data Analytics Job Simulation",
    org: "Tata Consultancy Services",
    date: "Jul 2025",
    desc: "Completed a job simulation applying GenAI tooling to real-world data analytics workflows.",
    icon: Database,
    color: "text-emerald-400"
  },
  {
    title: "Team Lead — Hack n Tech Hackathon",
    org: "IIT Patna",
    date: "May 2025",
    desc: "Led a 5-member team to deliver a complete working solution at the IIT Patna flagship hackathon.",
    icon: Award,
    color: "text-yellow-400"
  },
  {
    title: "Hackathon Participant — Hack 4 Brahma",
    org: "Gauhati University",
    date: "Dec 2025",
    desc: "Competed at a national-level hackathon hosted by Gauhati University.",
    icon: Award,
    color: "text-blue-500"
  },
  {
    title: "Google Student Ambassador",
    org: "Google / IIT Patna Campus",
    date: "Aug 2025 — Dec 2025",
    desc: "Promoted Google developer tools and Cloud programs; organised technical workshops for 100+ students on campus.",
    icon: Zap,
    color: "text-orange-400"
  }
];

const education = [
  {
    degree: "B.Sc. (Hons.) Computer Science and Data Analytics",
    institution: "Indian Institute of Technology Patna",
    board: null,
    score: "9.4 CGPA",
    date: `${PROGRAM_START_YEAR} — ${PROGRAM_END_YEAR}`,
    status: ACADEMIC_STATUS.isGraduated ? "Passed Out" : "Pursuing",
    desc: `Currently in ${ACADEMIC_STATUS.isGraduated ? "the final stretch, graduated/graduating" : `${ACADEMIC_STATUS.label.toLowerCase()} (Year ${ACADEMIC_STATUS.yearNumber} of ${PROGRAM_DURATION_YEARS})`}. Coursework: Data Structures & Algorithms, Database Management Systems, Software Engineering, Data Analytics, Machine Learning.`,
    icon: GraduationCap,
    color: "text-blue-500"
  },
  {
    degree: "12th (Higher Secondary) — Science, Maths & Biology",
    institution: "Utkramik Uchch Vidyalay Donwar",
    board: "BSEB",
    score: "81%",
    date: "2024",
    status: "Passed Out",
    desc: "Completed higher secondary education under the Bihar School Examination Board (BSEB) with Science stream, majoring in Mathematics with Biology as an additional subject.",
    icon: BookOpen,
    color: "text-emerald-500"
  },
  {
    degree: "10th (Secondary)",
    institution: "Sahu Jain +2 High School Lauriya",
    board: "BSEB",
    score: "80%",
    date: "2022",
    status: "Passed Out",
    desc: "Completed secondary education under the Bihar School Examination Board (BSEB).",
    icon: BookOpen,
    color: "text-orange-500"
  }
];

const AboutAnkit = (props) => {
  const [activeSection, setActiveSection] = useState('profile');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openRecruiterMode = () => {
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      window.dispatchEvent(new Event('open-recruiter-mode'));
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row items-center gap-10 mb-12">
              <div className="relative group">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-[2.5rem] bg-zinc-900 overflow-hidden border-4 border-white/5 shadow-2xl relative z-10">
                  <img 
                    src="./images/me/Ankit.jpg" 
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
              <div className="text-center md:text-left flex-1 w-full min-w-0">
                <div className="flex flex-col md:flex-row md:items-end gap-2 sm:gap-3 mb-3">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter text-white uppercase break-words">{PROFILE.name}</h1>
                    <span className="px-3 py-1 bg-orange-500 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded-lg mb-1 md:mb-2 w-fit mx-auto md:mx-0 flex items-center gap-1.5"><Rocket size={11} /> {PROFILE.internshipStatus}</span>
                </div>
                <p className="text-blue-400 font-bold tracking-[0.3em] sm:tracking-[0.4em] text-[9px] sm:text-[10px] uppercase mb-6 flex items-center justify-center md:justify-start gap-2 flex-wrap">
                   <Fingerprint size={16}/> {PROFILE.title}
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3">
                   <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-gray-400"><MapPin size={14}/> {PROFILE.location}</div>
                   <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-gray-400 underline cursor-pointer hover:text-white transition-colors"><Linkedin size={14}/> LinkedIn Profile</a>
                   <a href={PROFILE.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-gray-400 underline cursor-pointer hover:text-white transition-colors"><Github size={14}/> GitHub Profile</a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-12">
              {stats.map((s, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/5 p-5 rounded-3xl flex flex-col items-center gap-2 transition-all hover:bg-white/[0.07] hover:border-blue-500/20 group">
                   <s.icon size={22} className="text-blue-500 group-hover:scale-110 transition-transform" />
                   <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest">{s.label}</span>
                   <span className="text-[11px] font-bold text-white uppercase tracking-tight text-center">{s.val}</span>
                </div>
              ))}
            </div>

            <div className="bg-blue-600/5 border border-blue-500/20 p-8 rounded-[2rem] relative overflow-hidden group mb-8">
               <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none"><Cpu size={140} /></div>
               <h3 className="text-blue-400 text-[10px] font-black uppercase tracking-[0.5em] mb-6">Professional Summary</h3>
               <p className="text-gray-300 text-sm md:text-lg leading-relaxed font-medium">
                  {PROFILE.summary}
               </p>
            </div>

            <div className="space-y-6">
              {Object.entries(skills).map(([category, list]) => (
                <div key={category}>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-3">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {list.map(item => (
                      <span key={item} className="text-[11px] font-bold text-gray-300 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'projects':
        return (
          <div className="animate-in fade-in duration-300">
             <div className="flex justify-between items-start sm:items-end gap-3 mb-8 sm:mb-10">
                <div className="min-w-0">
                   <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase mb-1">Projects & Experience</h2>
                   <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Client work, capstones, and personal builds</p>
                </div>
                <Rocket className="text-blue-500 flex-shrink-0" size={28} />
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pb-12">
                {projects.map((proj, i) => (
                  <div key={i} className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-7 group hover:bg-white/[0.05] hover:border-blue-500/30 transition-all flex flex-col h-full">
                     <div className="flex justify-between items-start mb-6">
                        <div className={`p-4 rounded-2xl bg-black/40 border border-white/5 text-white shadow-xl`}>
                           <proj.icon size={26} />
                        </div>
                        <div className="flex flex-col items-end">
                           <span className="text-[9px] font-black uppercase tracking-widest text-blue-500 mb-1">{proj.status}</span>
                           <span className="text-[8px] text-gray-600 font-bold uppercase tracking-[0.2em] text-right">{proj.type}</span>
                        </div>
                     </div>
                     <div className="flex items-center gap-2 mb-1">
                       <h3 className="text-xl font-black text-white uppercase tracking-tight">{proj.title}</h3>
                       {proj.link && (
                         <a href={proj.link} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-400 transition-colors">
                           <ExternalLink size={14} />
                         </a>
                       )}
                     </div>
                     <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest mb-3">{proj.date}</span>
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
                <Terminal className="text-blue-500" /> Experience & Achievements
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
            <h2 className="text-3xl font-black mb-8 tracking-tight text-white uppercase flex items-center gap-4">
               <GraduationCap className="text-blue-500" /> Education
            </h2>

            {/* Academic Qualifications & Educational History — quick-reference table (desktop) */}
            <div className="hidden md:block bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden mb-10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/[0.03] text-left text-[9px] font-black uppercase tracking-widest text-gray-500">
                    <th className="px-6 py-4">Qualification</th>
                    <th className="px-6 py-4">Institute</th>
                    <th className="px-6 py-4">Board</th>
                    <th className="px-6 py-4">Score</th>
                    <th className="px-6 py-4">Year</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {education.map((edu, i) => (
                    <tr key={i} className="border-t border-white/5 hover:bg-white/[0.03] transition-colors">
                      <td className="px-6 py-4 font-bold text-white whitespace-nowrap">{edu.degree.split(' — ')[0].split(' (')[0]}</td>
                      <td className="px-6 py-4 text-gray-300">{edu.institution}</td>
                      <td className="px-6 py-4 text-gray-400">{edu.board || "—"}</td>
                      <td className={`px-6 py-4 font-bold ${edu.color}`}>{edu.score}</td>
                      <td className="px-6 py-4 text-gray-400">{edu.date}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${edu.status === 'Pursuing' ? 'bg-blue-500/10 text-blue-400' : 'bg-emerald-500/10 text-emerald-400'}`}>{edu.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-8">
               {education.map((edu, i) => (
                 <div key={i} className="bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-3xl group hover:bg-white/[0.05] transition-all">
                    <div className="flex items-center gap-4 md:gap-6 mb-4">
                       <div className={`p-3 md:p-4 rounded-2xl bg-black/40 border border-white/5 ${edu.color} shadow-lg group-hover:scale-110 transition-transform flex-shrink-0`}>
                          <edu.icon size={22} />
                       </div>
                       <div className="min-w-0">
                          <h4 className="font-black text-white text-base md:text-lg uppercase leading-tight break-words">{edu.institution}</h4>
                          <p className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mt-1 ${edu.color} break-words`}>{edu.degree}</p>
                       </div>
                    </div>
                    <div className="ml-0 md:ml-20">
                       <div className="flex flex-wrap items-center gap-2 mb-4">
                          <span className="inline-block text-[10px] font-black text-gray-500 uppercase tracking-widest bg-black/40 px-3 py-1 rounded-lg">{edu.date}</span>
                          {edu.board && <span className="inline-block text-[10px] font-black text-gray-500 uppercase tracking-widest bg-black/40 px-3 py-1 rounded-lg">{edu.board}</span>}
                          <span className={`inline-block text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${edu.color} bg-black/40`}>{edu.score}</span>
                          <span className={`inline-block text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${edu.status === 'Pursuing' ? 'bg-blue-500/10 text-blue-400' : 'bg-emerald-500/10 text-emerald-400'}`}>{edu.status}</span>
                       </div>
                       <p className="text-gray-400 text-sm leading-relaxed">{edu.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        );
      case 'resume':
        return (
          <div className="animate-in fade-in duration-300 h-full flex flex-col min-h-0">
             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 md:mb-8 flex-shrink-0">
                <div>
                   <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">Resume</h2>
                   <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Official CV — IIT Patna</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button
                     onClick={openRecruiterMode}
                     className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all active:scale-95"
                  >
                     Recruiter Mode <ExternalLink size={16} />
                  </button>
                  <a 
                     href={PROFILE.resumePath}
                     download 
                     className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95"
                  >
                     Download PDF <Download size={16} />
                  </a>
                </div>
             </div>
             {/* flex-1 + min-h-0 lets this fill all remaining vertical space from
                 its now height-aware ancestor chain, instead of collapsing to the
                 old min-h fallback regardless of the actual window size. */}
             <div className="flex-1 min-h-0 bg-white/5 rounded-2xl sm:rounded-[2.5rem] overflow-hidden border border-white/10 relative shadow-2xl">
                <iframe 
                   key={PROFILE.resumePath}
                   src={`${PROFILE.resumePath}?v=2#toolbar=1&view=FitH`}
                   className="absolute inset-0 w-full h-full border-none opacity-95"
                   title="Ankit Kumar Resume"
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
               <span className="text-[13px] font-black uppercase tracking-[0.2em] text-white">ANKIT KUMAR</span>
               <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest mt-1">IIT Patna</span>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'projects', label: 'Projects', icon: LayoutGrid },
              { id: 'education', label: 'Education', icon: BookOpen },
              { id: 'experience', label: 'Experience', icon: Briefcase },
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
                <div className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-4">Connect</div>
                <div className="flex justify-between items-center px-1">
                   <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" className="p-2 hover:bg-blue-600/20 rounded-xl transition-colors"><Linkedin size={18} className="text-gray-500 hover:text-blue-400" /></a>
                   <a href={PROFILE.github} target="_blank" rel="noreferrer" title="GitHub" className="p-2 hover:bg-white/10 rounded-xl transition-colors"><Github size={18} className="text-gray-500 hover:text-white" /></a>
                   <a href={PROFILE.instagram} target="_blank" rel="noreferrer" title="Instagram" className="p-2 hover:bg-pink-600/20 rounded-xl transition-colors"><Instagram size={18} className="text-gray-500 hover:text-pink-400" /></a>
                   <a href={`mailto:${PROFILE.email}`} title="Email" className="p-2 hover:bg-red-600/20 rounded-xl transition-colors"><Mail size={18} className="text-gray-500 hover:text-red-400" /></a>
                </div>
             </div>
             <button onClick={openRecruiterMode} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest text-blue-400 transition-all">
                Recruiter Mode <ExternalLink size={14} />
             </button>
             <div className="text-[8px] font-black text-gray-800 uppercase tracking-[0.4em] text-center">kali-pru9.vercel.app</div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Mobile Header */}
        {isMobile && (
          <div className="bg-[#121418] border-b border-white/5 p-3 flex flex-col gap-2">
             <div className="flex items-center gap-2 px-1">
                <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center font-black text-[10px] shadow-lg flex-shrink-0">A</div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white truncate">Ankit Kumar</span>
             </div>
             <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
                {['profile', 'projects', 'education', 'experience', 'resume'].map(s => (
                  <button 
                    key={s} 
                    onClick={() => setActiveSection(s)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all flex-shrink-0 ${activeSection === s ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/5 text-gray-500'}`}
                  >
                    {s === 'profile' && <User size={16}/>}
                    {s === 'projects' && <LayoutGrid size={16}/>}
                    {s === 'education' && <BookOpen size={16}/>}
                    {s === 'experience' && <Briefcase size={16}/>}
                    {s === 'resume' && <FileText size={16}/>}
                    <span className="text-[9px] font-black uppercase tracking-widest whitespace-nowrap">{s}</span>
                  </button>
                ))}
             </div>
          </div>
        )}

        <div className={`flex-1 ${activeSection === 'resume' ? 'flex flex-col overflow-hidden' : 'overflow-y-auto custom-scrollbar scroll-smooth'} p-4 sm:p-6 md:p-20`}>
          <div className={`max-w-5xl mx-auto w-full ${activeSection === 'resume' ? 'flex-1 flex flex-col min-h-0' : ''}`}>
            {renderContent()}
          </div>
        </div>

        {/* Status Bar Footer */}
        <div className="bg-[#121418]/60 backdrop-blur-2xl border-t border-white/5 p-3 sm:p-4 md:px-20 flex justify-between items-center gap-2">
           <div className="flex items-center gap-3 sm:gap-6 min-w-0">
              <span className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-black text-gray-500 uppercase tracking-widest whitespace-nowrap">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e] flex-shrink-0" /> <span className="hidden xs:inline sm:inline">Status:</span> Open to Work
              </span>
              <span className="hidden md:flex items-center gap-2 text-[10px] font-black text-gray-700 uppercase tracking-widest">
                 IIT Patna · Secure Connection
              </span>
           </div>
           <a href={`mailto:${PROFILE.email}`} className="flex items-center gap-1.5 sm:gap-2.5 px-4 sm:px-7 py-2 sm:py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl sm:rounded-[1.2rem] text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(37,99,235,0.4)] active:scale-95 group flex-shrink-0">
              Contact <ExternalLink size={13} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
           </a>
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
export { PROFILE, ACADEMIC_STATUS, PROGRAM_START_YEAR, PROGRAM_END_YEAR, PROGRAM_DURATION_YEARS, getCurrentAcademicYear };
