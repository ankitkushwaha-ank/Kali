import React, { useEffect, useState } from 'react';
import {
  X,
  Download,
  Mail,
  Linkedin,
  Github,
  Instagram,
  MapPin,
  GraduationCap,
  Briefcase,
  Code,
  Award,
  ExternalLink,
  Terminal,
  Rocket
} from 'lucide-react';
import { PROFILE } from '../apps/aboutme';

// Same real project/experience data used by the "About Me" app, trimmed for a
// fast, recruiter-friendly single-scroll read (no window chrome, no OS metaphor).
const highlightProjects = [
  {
    title: "Netpar.in",
    desc: "Production social media + e-commerce platform built solo — auth, feed, cart, checkout — serving 1,000+ active users with real transactions.",
    stack: ["PHP", "PostgreSQL", "MySQL", "REST APIs"],
    link: "https://netpar.in"
  },
  {
    title: "Vakmann",
    desc: "Smart AI assistant app built with Flutter — currently in active development.",
    stack: ["Flutter", "Dart", "AI/ML"],
    link: "https://vakmann.com"
  },
  {
    title: "Heritage Threads",
    desc: "Full MERN e-commerce build with Razorpay payments, delivered in a 4-week client timeline.",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    link: null
  },
  {
    title: "IITP Companion",
    desc: "Campus portal for IIT Patna: academics, live bus tracking, quizzes, and events — actively used by students.",
    stack: ["Django", "JavaScript"],
    link: "https://iitpcompanion.onrender.com/"
  },
  {
    title: "Ikon",
    desc: "Hyperlocal quick-commerce app optimised for 2G / under 200KB page weight for Tier-3 markets.",
    stack: ["PHP", "MySQL", "JavaScript"],
    link: "https://ikon.org.in"
  },
  {
    title: "Buzzi",
    desc: "High-engagement social networking platform with secure data handling and real-time feeds.",
    stack: ["PHP", "React", "Hostinger"],
    link: "https://buzzi.co.in"
  }
];

const skillGroups = [
  { label: "Languages", items: "JavaScript, TypeScript, Python, PHP, Dart, HTML5, CSS3" },
  { label: "Frameworks", items: "React.js, Next.js, Node.js, Express.js, Django, Flutter" },
  { label: "Databases", items: "MongoDB, MySQL, PostgreSQL, Firebase" },
  { label: "Cloud & Tools", items: "GCP, Vercel, Hostinger, Git, Docker-friendly, Postman" }
];

const educationHistory = [
  { qualification: "Graduation", institute: "Indian Institute of Technology Patna", board: null, score: "9.4 CGPA", year: "2024 — 2028", status: "Pursuing" },
  { qualification: "12th", institute: "Utkramik Uchch Vidyalay Donwar", board: "BSEB · Science (Maths + Bio)", score: "81%", year: "2024", status: "Passed Out" },
  { qualification: "10th", institute: "Sahu Jain +2 High School Lauriya", board: "BSEB", score: "80%", year: "2022", status: "Passed Out" }
];

export default function RecruiterMode() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const open = () => setVisible(true);
    window.addEventListener('open-recruiter-mode', open);
    return () => window.removeEventListener('open-recruiter-mode', open);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e) => { if (e.key === 'Escape') setVisible(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-[#0b0d10] text-[#eeeeee] overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Recruiter quick view of Ankit Kumar's resume"
    >
      {/* Top bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between gap-2 px-3 sm:px-5 md:px-12 py-3 md:py-4 bg-[#0f1115]/90 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-[0_0_16px_rgba(37,99,235,0.5)] flex-shrink-0">
            <Terminal size={16} className="text-white" />
          </div>
          <div className="leading-tight min-w-0">
            <div className="text-xs sm:text-sm font-black uppercase tracking-widest text-white truncate">Recruiter Mode</div>
            <div className="hidden sm:block text-[10px] font-bold uppercase tracking-widest text-gray-500">Quick resume view · Esc to close</div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={PROFILE.resumePath}
            download
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all active:scale-95"
          >
            Resume PDF <Download size={14} />
          </a>
          <a
            href={PROFILE.resumePath}
            download
            aria-label="Download resume PDF"
            title="Download resume PDF"
            className="flex sm:hidden items-center justify-center p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors"
          >
            <Download size={16} />
          </a>
          <button
            onClick={() => setVisible(false)}
            aria-label="Close recruiter mode"
            title="Close (Esc)"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-5 md:px-0 py-8 sm:py-10 md:py-16">
        {/* ISRO internship highlight */}
        <div className="flex items-center gap-3 bg-orange-500/10 border border-orange-500/20 rounded-2xl px-4 sm:px-5 py-3 mb-8">
          <Rocket size={18} className="text-orange-400 flex-shrink-0" />
          <p className="text-xs sm:text-sm text-orange-300 font-bold">
            Received an internship offer from <span className="text-white">ISRO</span> — joining October 2026.
          </p>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-5 sm:gap-6 mb-8 sm:mb-10">
          <img
            src="./images/me/Ankit.jpg"
            alt="Ankit Kumar"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-white/5 shadow-2xl flex-shrink-0"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="text-center md:text-left w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white break-words">{PROFILE.name}</h1>
            <p className="text-blue-400 font-bold text-xs sm:text-sm mt-1">{PROFILE.title}</p>
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest mt-2 flex items-center justify-center md:justify-start gap-1">
              <MapPin size={13} /> {PROFILE.location}
            </p>
            <div className="flex justify-center md:justify-start gap-2 mt-4">
              <a href={`mailto:${PROFILE.email}`} title="Email" className="p-2 rounded-lg bg-white/5 hover:bg-red-600/20 transition-colors"><Mail size={16} className="text-gray-400 hover:text-red-400" /></a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" className="p-2 rounded-lg bg-white/5 hover:bg-blue-600/20 transition-colors"><Linkedin size={16} className="text-gray-400 hover:text-blue-400" /></a>
              <a href={PROFILE.github} target="_blank" rel="noreferrer" title="GitHub" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"><Github size={16} className="text-gray-400 hover:text-white" /></a>
              <a href={PROFILE.instagram} target="_blank" rel="noreferrer" title="Instagram" className="p-2 rounded-lg bg-white/5 hover:bg-pink-600/20 transition-colors"><Instagram size={16} className="text-gray-400 hover:text-pink-400" /></a>
            </div>
          </div>
        </div>

        {/* Summary */}
        <section className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 md:p-8 mb-10">
          <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-400 mb-3">Summary</h2>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">{PROFILE.summary}</p>
        </section>

        {/* Skills */}
        <section className="mb-10">
          <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-400 mb-4 flex items-center gap-2"><Code size={14} /> Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skillGroups.map(g => (
              <div key={g.label} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">{g.label}</div>
                <div className="text-sm text-gray-300">{g.items}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-10">
          <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-400 mb-4 flex items-center gap-2"><Briefcase size={14} /> Experience</h2>
          <div className="space-y-4">
            <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-5">
              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-between gap-1 sm:gap-2">
                <h3 className="font-bold text-white text-sm break-words">Incoming Intern — ISRO</h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-orange-400 flex-shrink-0">Joining Oct 2026</span>
              </div>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">Received and accepted an internship offer letter from the Indian Space Research Organisation.</p>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5">
              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-between gap-1 sm:gap-2">
                <h3 className="font-bold text-white text-sm break-words">Full Stack Developer — Netpar.in</h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex-shrink-0">Jan 2025 — Present</span>
              </div>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">Independently architected and shipped a live social + e-commerce platform serving 1,000+ users; owns full lifecycle from architecture to deployment.</p>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5">
              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-between gap-1 sm:gap-2">
                <h3 className="font-bold text-white text-sm break-words">Full Stack Developer — Heritage Threads (Client Project, managed by Ankit)</h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex-shrink-0">Apr — May 2025</span>
              </div>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">Delivered a full MERN e-commerce build with Razorpay payments in a 4-week client engagement.</p>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="mb-10">
          <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-400 mb-4 flex items-center gap-2"><Terminal size={14} /> Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlightProjects.map(p => (
              <div key={p.title} className="bg-white/[0.02] border border-white/5 rounded-2xl p-5">
                <div className="flex items-center gap-1.5 mb-1">
                  <h3 className="font-bold text-white text-sm">{p.title}</h3>
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-400 transition-colors">
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
                <p className="text-gray-400 text-xs leading-relaxed mb-3">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map(s => <span key={s} className="text-[9px] font-bold text-gray-300 px-2 py-0.5 bg-white/5 rounded-md border border-white/5">{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-10">
          <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-400 mb-4 flex items-center gap-2"><GraduationCap size={14} /> Education</h2>
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
            {educationHistory.map((edu, i) => (
              <div key={i} className={`flex flex-wrap items-center gap-x-4 gap-y-1 p-4 ${i > 0 ? 'border-t border-white/5' : ''}`}>
                <span className="text-[10px] font-black uppercase tracking-widest text-white bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-full flex-shrink-0">{edu.qualification}</span>
                <div className="flex-1 min-w-[140px]">
                  <div className="text-sm font-bold text-white break-words">{edu.institute}</div>
                  {edu.board && <div className="text-[10px] text-gray-500 mt-0.5">{edu.board}</div>}
                </div>
                <div className="flex items-center gap-3 text-xs flex-shrink-0">
                  <span className="font-bold text-emerald-400">{edu.score}</span>
                  <span className="text-gray-500">{edu.year}</span>
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${edu.status === 'Pursuing' ? 'bg-blue-500/10 text-blue-400' : 'bg-emerald-500/10 text-emerald-400'}`}>{edu.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-14">
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5">
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-400 mb-3 flex items-center gap-2"><Award size={14} /> Achievements</h2>
            <ul className="text-gray-400 text-xs space-y-1 list-disc list-inside">
              <li>Team Lead, Hack n Tech Hackathon, IIT Patna</li>
              <li>Hackathon Participant, Hack 4 Brahma, Gauhati University</li>
              <li>GenAI Data Analytics Simulation — TCS</li>
              <li>Cybersecurity Internship — CodeAlpha</li>
              <li>Google Student Ambassador — IIT Patna</li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-blue-600/10 border border-blue-500/20 rounded-3xl p-6 sm:p-8 md:p-10">
          <h2 className="text-xl sm:text-2xl font-black text-white mb-2">Let's build something.</h2>
          <p className="text-gray-400 text-sm mb-6">Joining ISRO as an intern in October 2026 — open to freelance builds and collaborations in the meantime.</p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
            <a href={`mailto:${PROFILE.email}`} className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95">
              <Mail size={14} /> Email Me
            </a>
            <a href={PROFILE.resumePath} download className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95">
              <Download size={14} /> Download Resume
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95">
              <ExternalLink size={14} /> LinkedIn
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
