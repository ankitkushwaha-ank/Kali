import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Trash2, 
  Folder, 
  ChevronRight, 
  ChevronDown, 
  Search, 
  FileText, 
  Save, 
  MoreVertical, 
  Zap, 
  ShieldCheck, 
  Book,
  Code,
  List,
  Bold,
  Italic,
  Underline,
  Hash,
  Link as LinkIcon
} from 'lucide-react';

const Cherrytree = (props) => {
  // Initial state for the hierarchical notes
  const [nodes, setNodes] = useState([
    {
      id: 'root-1',
      title: 'Ethical Hacking',
      content: '# Ethical Hacking Notes\n\nTargeting methodologies and vulnerability research data.',
      isOpen: true,
      children: [
        { id: 'child-1', title: 'Nmap Commands', content: 'nmap -sV -sC -Pn <target>', children: [] },
        { id: 'child-2', title: 'Payloads', content: 'msfvenom -p windows/x64/meterpreter/reverse_tcp...', children: [] }
      ]
    },
    {
      id: 'root-2',
      title: 'Projects',
      content: 'Detailed specifications for IKON and Buzzi startups.',
      isOpen: false,
      children: []
    }
  ]);

  const [activeNodeId, setActiveNodeId] = useState('root-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Helper to find and update a node in the tree
  const findNodeById = (tree, id) => {
    for (let node of tree) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findNodeById(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const updateNode = (id, updates) => {
    const newNodes = JSON.parse(JSON.stringify(nodes));
    const findAndApply = (list) => {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
          list[i] = { ...list[i], ...updates };
          return true;
        }
        if (list[i].children && findAndApply(list[i].children)) return true;
      }
      return false;
    };
    findAndApply(newNodes);
    setNodes(newNodes);
  };

  const addNode = (parentId = null) => {
    const newNode = {
      id: `node-${Date.now()}`,
      title: 'New Node',
      content: '',
      children: [],
      isOpen: true
    };

    if (!parentId) {
      setNodes([...nodes, newNode]);
    } else {
      const newNodes = JSON.parse(JSON.stringify(nodes));
      const findAndAdd = (list) => {
        for (let node of list) {
          if (node.id === parentId) {
            node.children.push(newNode);
            node.isOpen = true;
            return true;
          }
          if (node.children && findAndAdd(node.children)) return true;
        }
        return false;
      };
      findAndAdd(newNodes);
      setNodes(newNodes);
    }
    setActiveNodeId(newNode.id);
  };

  const deleteNode = (id) => {
    const newNodes = JSON.parse(JSON.stringify(nodes));
    const findAndRemove = (list, targetId) => {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === targetId) {
          list.splice(i, 1);
          return true;
        }
        if (list[i].children && findAndRemove(list[i].children, targetId)) return true;
      }
      return false;
    };
    findAndRemove(newNodes, id);
    setNodes(newNodes);
    if (activeNodeId === id) setActiveNodeId(null);
  };

  const activeNode = findNodeById(nodes, activeNodeId);

  const TreeItem = ({ node, depth = 0 }) => {
    const isSelected = activeNodeId === node.id;
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div className="flex flex-col">
        <div 
          onClick={() => setActiveNodeId(node.id)}
          className={`flex items-center gap-2 px-3 py-1.5 cursor-default transition-all group ${isSelected ? 'bg-blue-600 text-white shadow-lg z-10' : 'hover:bg-white/5 text-gray-400 hover:text-gray-200'}`}
          style={{ paddingLeft: `${depth * 16 + 12}px` }}
        >
          <button 
            onClick={(e) => { e.stopPropagation(); updateNode(node.id, { isOpen: !node.isOpen }); }}
            className={`p-0.5 hover:bg-white/10 rounded transition-transform ${node.isOpen ? 'rotate-0' : '-rotate-90'} ${!hasChildren ? 'opacity-0' : ''}`}
          >
            <ChevronDown size={14} />
          </button>
          <FileText size={14} className={isSelected ? 'text-white' : 'text-blue-500'} />
          <span className="text-[12px] font-medium truncate flex-1">{node.title}</span>
          <button 
            onClick={(e) => { e.stopPropagation(); addNode(node.id); }}
            className={`p-1 opacity-0 group-hover:opacity-100 hover:bg-white/10 rounded text-emerald-500 transition-all`}
          >
            <Plus size={12} />
          </button>
        </div>
        {node.isOpen && node.children && (
          <div>
            {node.children.map(child => <TreeItem key={child.id} node={child} depth={depth + 1} />)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#0f1115] text-[#e1e3e6] font-sans select-none overflow-hidden relative">
      {/* Top Header */}
      <div className="flex items-center justify-between bg-[#181a1f] px-4 py-2 border-b border-[#2a2e35] z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            <Zap size={16} className="text-white fill-white" />
          </div>
          <div>
            <h2 className="text-[11px] font-black uppercase tracking-widest leading-none">CherryTree</h2>
            <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-1">Hierarchical Node Admin</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors"><Save size={16}/></button>
          <div className="h-4 w-px bg-white/10 mx-1" />
          <ShieldCheck size={14} className="text-blue-500" />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Tree View */}
        <div className={`${isMobile && activeNodeId ? 'hidden' : 'flex'} w-full md:w-64 bg-[#121418] border-r border-[#2a2e35] flex-col z-20`}>
          <div className="p-4 border-b border-white/5">
            <div className="relative group">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500" />
              <input 
                type="text" 
                placeholder="Search nodes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0a0c0f] border border-[#2a2e35] rounded-xl pl-9 pr-4 py-2 text-xs outline-none focus:border-blue-500/50 transition-all"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar py-2">
            {nodes.map(node => <TreeItem key={node.id} node={node} />)}
            <button 
              onClick={() => addNode()}
              className="w-full mt-2 flex items-center gap-3 px-6 py-2 text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-blue-500 transition-colors"
            >
              <Plus size={14} /> Add Root Node
            </button>
          </div>
        </div>

        {/* Editor Area */}
        <div className={`${isMobile && !activeNodeId ? 'hidden' : 'flex'} flex-1 bg-[#0a0c0f] flex flex-col relative`}>
          {activeNode ? (
            <div className="flex flex-col h-full animate-in fade-in duration-300">
              {/* Editor Toolbar */}
              <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-4">
                  {isMobile && <button onClick={() => setActiveNodeId(null)} className="text-blue-500"><ChevronRight className="rotate-180" size={20}/></button>}
                  <input 
                    type="text" 
                    value={activeNode.title}
                    onChange={(e) => updateNode(activeNodeId, { title: e.target.value })}
                    className="bg-transparent border-none outline-none font-black text-lg uppercase tracking-tight text-white w-full md:w-64"
                  />
                </div>
                <div className="flex items-center gap-2">
                   <button onClick={() => deleteNode(activeNodeId)} className="p-2 hover:bg-red-500/10 text-gray-500 hover:text-red-500 rounded-lg transition-all"><Trash2 size={16}/></button>
                   <button className="p-2 hover:bg-white/5 text-gray-500 hover:text-white rounded-lg"><MoreVertical size={16}/></button>
                </div>
              </div>

              {/* Rich Text Toolbar Mock */}
              <div className="flex items-center gap-1 px-4 py-2 bg-white/[0.01] border-b border-white/5 overflow-x-auto scrollbar-hide">
                {[Bold, Italic, Underline, Hash, List, Code, LinkIcon].map((Icon, i) => (
                  <button key={i} className="p-1.5 hover:bg-white/5 text-gray-600 hover:text-gray-300 rounded transition-colors">
                    <Icon size={14} />
                  </button>
                ))}
              </div>

              {/* Text Area */}
              <textarea 
                className="flex-1 w-full bg-transparent p-8 outline-none text-gray-300 font-mono text-[13px] leading-relaxed resize-none custom-scrollbar"
                placeholder="Initialize note sequence..."
                value={activeNode.content}
                onChange={(e) => updateNode(activeNodeId, { content: e.target.value })}
              />
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-10 opacity-30">
               <Book size={64} strokeWidth={1} className="mb-4" />
               <p className="text-sm font-black uppercase tracking-[0.4em]">Select Node to Access Data</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Status */}
      <div className="bg-[#181a1f] border-t border-[#2a2e35] px-6 py-2 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-600">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" /> Encryption Active
          </span>
          <span className="hidden md:inline">Word Count: {activeNode ? activeNode.content.split(/\s+/).filter(x => x).length : 0}</span>
        </div>
        <span>Nodes Analyzed: {nodes.length}</span>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #2a2e35; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3b82f6; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: fade-in 0.3s ease-out forwards; }
      `}} />
    </div>
  );
};

export default Cherrytree;

export const displayCherrytree = () => {
    return <Cherrytree />;
}