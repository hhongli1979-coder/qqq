import React, { useState, useEffect, useRef, useMemo } from 'react';
import { SectionId, Asset, Message, PrivateNode } from '../types';
import SmartCompiler from './AIStylist';
import { generateVideo } from '../services/geminiService';
import { GoogleGenAI } from "@google/genai";

interface WorkspaceProps {
  activeStep: string;
  messages: Message[];
  isProcessing: boolean;
  assets: Asset[];
  onUpdateAsset: (id: string, updates: Partial<Asset>) => void;
  nodes: PrivateNode[];
  onNodeControl: (id: string, action: 'RESTART' | 'TOGGLE') => void;
  onSendMessage: (content: string) => void;
}

const Workspace: React.FC<WorkspaceProps> = ({ 
  activeStep, messages, isProcessing, assets, onUpdateAsset, nodes, onNodeControl, onSendMessage 
}) => {
  const [adminTab, setAdminTab] = useState<'ASSETS' | 'FLEET' | 'SYSTEM'>('ASSETS');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [monetizationFilter, setMonetizationFilter] = useState('All');
  const [minRevenue, setMinRevenue] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'name' | 'revenue' | 'type' | 'monetization'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // Fashion Atelier States
  const [designPrompt, setDesignPrompt] = useState('');
  const [isGeneratingDesign, setIsGeneratingDesign] = useState(false);
  const [designResult, setDesignResult] = useState<{imageUrl?: string, description?: string, fabric?: string, color?: string} | null>(null);
  const [rotationDegree, setRotationDegree] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isListening, setIsListening] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 360 Rotation Logic
  useEffect(() => {
    let interval: number;
    if (isAutoRotating) {
      interval = window.setInterval(() => {
        setRotationDegree(prev => (prev + 1) % 360);
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  const handleGenerateDesign = async (promptText: string) => {
    if (!promptText.trim() || isGeneratingDesign) return;
    
    setIsGeneratingDesign(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `你是一个专注于AR虚拟试衣的高级数字裁缝。用户指令：${promptText}。请提供详细的设计描述，包括建议的面料、颜色代码以及制造可行性分析。`,
      });
      
      setDesignResult({
        description: response.text,
        imageUrl: `https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop`, // Simulated AI Render
        fabric: "Silk Satin",
        color: "#1e3a8a"
      });
    } catch (error) {
      console.error("Design synthesis failed:", error);
    } finally {
      setIsGeneratingDesign(false);
    }
  };

  const toggleVoiceMode = () => {
    if (isListening) {
      setIsListening(false);
      // Simulate recognized text
      const mockVoiceCommand = "设计一套克莱因蓝的丝绸连衣裙，领口要V领设计。";
      setDesignPrompt(mockVoiceCommand);
      handleGenerateDesign(mockVoiceCommand);
    } else {
      setIsListening(true);
      // In a real app, integrate Web Speech API here
    }
  };

  const filteredAssets = useMemo(() => {
    let result = assets.filter(a => {
      const searchLower = search.toLowerCase().trim();
      const matchesSearch = !searchLower || 
                            a.name.toLowerCase().includes(searchLower) || 
                            a.id.toLowerCase().includes(searchLower);
      const matchesType = typeFilter === 'All' || a.type === typeFilter;
      const matchesMonetization = monetizationFilter === 'All' || a.monetizationModel === monetizationFilter;
      const matchesRevenue = (a.revenue || 0) >= minRevenue;
      return matchesSearch && matchesType && matchesMonetization && matchesRevenue;
    });

    result.sort((a, b) => {
      let valA: any = '';
      let valB: any = '';
      switch(sortBy) {
        case 'name': valA = a.name; valB = b.name; break;
        case 'revenue': valA = a.revenue || 0; valB = b.revenue || 0; break;
        case 'type': valA = a.type; valB = b.type; break;
        case 'monetization': valA = a.monetizationModel; valB = b.monetizationModel; break;
      }
      const order = sortOrder === 'asc' ? 1 : -1;
      if (typeof valA === 'string') return order * valA.localeCompare(valB);
      return order * (valA - valB);
    });
    return result;
  }, [assets, search, typeFilter, monetizationFilter, minRevenue, sortBy, sortOrder]);

  const assetTypes = useMemo(() => ['All', ...Array.from(new Set(assets.map(a => a.type)))], [assets]);
  const monetizationModels = ['All', 'Subscription', 'One-time', 'Ads', 'Free'];

  const renderHome = () => (
    <div className="h-full overflow-y-auto studio-scroll p-12 bg-google-bg animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="flex justify-between items-end border-b border-google-border pb-10">
          <div>
            <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none">Command Center</h2>
            <p className="text-google-textMuted mt-4 font-mono text-[11px] uppercase tracking-[0.5em]">Network: Linked | Site: youplay.uno</p>
          </div>
          <div className="flex gap-4">
            <div className="px-5 py-2.5 bg-google-surface border border-google-border rounded-2xl flex items-center gap-3 shadow-xl">
               <span className="w-2 h-2 rounded-full bg-google-success animate-ping"></span>
               <span className="text-[10px] font-black text-google-success uppercase tracking-widest">Atelier Sync Active</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {nodes.slice(0, 3).map(node => (
              <div key={node.id} className="p-10 bg-google-surface border border-google-border rounded-[3.5rem] group hover:border-google-success transition-all duration-500 shadow-2xl hover:-translate-y-2">
                <div className="flex justify-between items-start mb-8">
                   <div className="w-16 h-16 rounded-3xl bg-google-bg border border-google-border flex items-center justify-center text-3xl shadow-inner group-hover:rotate-12 transition-transform">
                      {node.type === 'LOGIC' ? '🧠' : node.type === 'RENDER' ? '🎨' : '🎬'}
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] font-mono text-google-textMuted uppercase mb-1 tracking-widest">Efficiency</p>
                      <span className="text-xl font-mono text-google-success font-black">{Math.round(node.load)}%</span>
                   </div>
                </div>
                <h4 className="font-black text-white mb-6 text-sm tracking-tight uppercase">{node.name}</h4>
                <div className="h-2 bg-google-bg rounded-full overflow-hidden p-0.5 border border-google-border">
                   <div className="h-full bg-google-success rounded-full transition-all duration-1000" style={{ width: `${node.load}%` }}></div>
                </div>
                <p className="text-[10px] font-mono text-google-textMuted mt-6 uppercase opacity-40 italic tracking-widest">Cluster Node Ready</p>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4 p-12 bg-google-success text-google-bg rounded-[4rem] flex flex-col justify-between shadow-2xl relative overflow-hidden group">
             <div className="absolute -right-16 -top-16 text-[220px] opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-1000 font-black">AI</div>
             <div>
                <p className="text-[12px] font-black uppercase tracking-[0.4em] opacity-80 mb-6">Global Fashion Vault</p>
                <h3 className="text-9xl font-black italic tracking-tighter leading-none">
                  {assets.length}
                </h3>
             </div>
             <div className="mt-12 border-t border-google-bg/10 pt-10">
                <p className="text-lg font-bold leading-tight mb-8">
                   您的数字化工厂已全线就绪。支持 360° AR 可视化与语音驱动的服装生成流程。
                </p>
                <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest">
                   <span className="opacity-60">Status</span>
                   <span className="px-3 py-1 bg-google-bg text-google-success rounded-full">Optimal</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAdmin = () => (
    <div className="h-full flex flex-col p-10 space-y-10 animate-in slide-in-from-right-10 duration-700 bg-[#080809] overflow-hidden">
      <header className="flex justify-between items-center border-b border-google-border pb-12">
        <div className="space-y-6">
          <div className="flex items-center gap-8">
            <h2 className="text-6xl font-black italic text-white tracking-tighter uppercase leading-none">Atelier Admin</h2>
            <div className="px-5 py-2 bg-google-accent/10 border border-google-accent/20 rounded-full text-[11px] font-black text-google-accent uppercase tracking-widest shadow-lg">MANAGEMENT_HUB</div>
          </div>
          <div className="flex gap-12">
            {[
              { id: 'ASSETS', label: '资产仓库', icon: '📦' },
              { id: 'FLEET', label: '算力阵列', icon: '⚡' },
              { id: 'SYSTEM', label: '核心配置', icon: '⚙️' }
            ].map(tab => (
              <button 
                key={tab.id} 
                onClick={() => setAdminTab(tab.id as any)}
                className={`flex items-center gap-4 text-[12px] font-black tracking-[0.4em] uppercase transition-all pb-8 border-b-4 ${
                  adminTab === tab.id ? 'text-google-success border-google-success' : 'text-google-textMuted border-transparent'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="flex-1 bg-google-surface border border-google-border rounded-[4rem] overflow-hidden flex flex-col shadow-inner relative">
        {adminTab === 'ASSETS' && (
          <div className="flex-1 flex flex-col overflow-hidden">
             <div className="px-12 pt-12 pb-10 bg-black/40 border-b border-google-border">
                <div className="max-w-6xl mx-auto space-y-10">
                   <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                      <div className="space-y-4">
                         <h3 className="text-4xl font-black italic text-white tracking-tighter uppercase">资源检索终端</h3>
                         <p className="text-google-textMuted text-sm font-light italic">
                           检索由 AI 生成的设计资产与面料权重。
                         </p>
                      </div>
                      <div className="flex items-center gap-10 bg-google-bg/80 border border-google-border rounded-[2.5rem] px-12 py-6">
                         <div className="text-center">
                            <p className="text-[9px] font-black text-google-textMuted uppercase mb-1">Matches</p>
                            <p className="text-3xl font-black font-mono text-google-success">{filteredAssets.length}</p>
                         </div>
                         <div className="w-[1px] h-10 bg-google-border"></div>
                         <div className="text-center">
                            <p className="text-[9px] font-black text-google-textMuted uppercase mb-1">Total</p>
                            <p className="text-3xl font-black font-mono text-white opacity-20">{assets.length}</p>
                         </div>
                      </div>
                   </div>

                   <div className="relative group max-w-5xl">
                      <input 
                        type="text" 
                        placeholder="输入设计 ID 或名称进行检索..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-google-bg border-2 border-google-border rounded-[3.5rem] py-10 pl-24 pr-24 text-2xl text-white w-full focus:outline-none focus:border-google-success transition-all font-light shadow-2xl placeholder:opacity-30"
                      />
                      <span className="absolute left-10 top-1/2 -translate-y-1/2 text-3xl opacity-30">🔍</span>
                   </div>

                   <div className="flex flex-wrap gap-8 items-end">
                      <div className="flex flex-col gap-3">
                         <label className="text-[9px] font-black text-google-textMuted uppercase tracking-widest ml-2">Design Type</label>
                         <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="bg-google-bg border border-google-border rounded-xl px-6 py-3 text-xs font-black text-white outline-none focus:border-google-success">
                            {assetTypes.map(t => <option key={t} value={t}>{t}</option>)}
                         </select>
                      </div>
                      <div className="flex flex-col gap-3">
                         <label className="text-[9px] font-black text-google-textMuted uppercase tracking-widest ml-2">Billing Mode</label>
                         <select value={monetizationFilter} onChange={(e) => setMonetizationFilter(e.target.value)} className="bg-google-bg border border-google-border rounded-xl px-6 py-3 text-xs font-black text-white outline-none focus:border-google-success">
                            {monetizationModels.map(m => <option key={m} value={m}>{m}</option>)}
                         </select>
                      </div>
                      <div className="flex-1"></div>
                      <div className="flex flex-col gap-3">
                         <label className="text-[9px] font-black text-google-textMuted uppercase tracking-widest ml-2">Sort Criteria</label>
                         <div className="flex gap-2">
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="bg-google-bg border border-google-border rounded-xl px-6 py-3 text-xs font-black text-google-success outline-none focus:border-google-accent">
                               <option value="name">Name</option>
                               <option value="revenue">Rev</option>
                               <option value="type">Type</option>
                            </select>
                            <button onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')} className="bg-google-bg border border-google-border rounded-xl px-4 py-3 text-white hover:border-google-success transition-all">
                               {sortOrder === 'asc' ? '▲' : '▼'}
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             <div className="flex-1 overflow-y-auto studio-scroll p-12">
                <table className="w-full text-left border-separate border-spacing-y-4">
                  <thead>
                    <tr className="text-[11px] font-black text-google-textMuted uppercase tracking-[0.2em]">
                      <th className="pb-4 pl-12">Design Asset</th>
                      <th className="pb-4">Category</th>
                      <th className="pb-4">Market Value</th>
                      <th className="pb-4">Production State</th>
                      <th className="pb-4 text-right pr-16">Global Command</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAssets.map(asset => (
                      <tr key={asset.id} className="group hover:bg-white/[0.03] transition-all">
                        <td className="py-8 pl-12 bg-google-surface/40 rounded-l-[3.5rem] border-y border-l border-google-border group-hover:border-google-success transition-colors">
                           <div className="flex items-center gap-8">
                              <span className="text-5xl drop-shadow-lg group-hover:scale-110 transition-transform">{asset.icon}</span>
                              <div>
                                 <p className="font-black text-white text-xl uppercase tracking-tight group-hover:text-google-success transition-colors">{asset.name}</p>
                                 <p className="text-[10px] text-google-textMuted font-mono uppercase tracking-widest mt-1 opacity-50">{asset.id}</p>
                              </div>
                           </div>
                        </td>
                        <td className="py-8 bg-google-surface/40 border-y border-google-border transition-colors">
                           <span className="px-5 py-2 bg-google-bg rounded-xl border border-google-border text-[10px] font-mono font-black text-google-accent uppercase tracking-widest">{asset.type}</span>
                        </td>
                        <td className="py-8 bg-google-surface/40 border-y border-google-border transition-colors">
                           <p className="text-2xl font-mono font-black text-google-success">${asset.revenue.toLocaleString()}</p>
                        </td>
                        <td className="py-8 bg-google-surface/40 border-y border-google-border transition-colors">
                           <div className="flex items-center gap-4">
                              <div className={`w-2.5 h-2.5 rounded-full ${asset.status === 'ACTIVE' ? 'bg-google-success shadow-[0_0_10px_currentColor]' : 'bg-orange-500'}`}></div>
                              <span className="text-[11px] font-black uppercase tracking-widest">{asset.status}</span>
                           </div>
                        </td>
                        <td className="py-8 bg-google-surface/40 border-y border-r border-google-border rounded-r-[3.5rem] text-right pr-16 transition-colors">
                           <button onClick={() => onUpdateAsset(asset.id, { status: asset.status === 'ACTIVE' ? 'PENDING' : 'ACTIVE' })} className={`px-10 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl transition-all ${asset.status === 'ACTIVE' ? 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white' : 'bg-google-success text-google-bg hover:scale-95'}`}>
                              {asset.status === 'ACTIVE' ? 'Shut Down' : 'Boot Up'}
                           </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderFashionLab = () => (
    <div className="h-full flex flex-col p-12 space-y-12 animate-in zoom-in-95 duration-700 bg-google-bg overflow-y-auto studio-scroll">
      <header className="flex justify-between items-end border-b border-google-border pb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
             <span className="text-google-accent text-sm">✦</span>
             <span className="text-google-accent text-[11px] font-black uppercase tracking-[0.5em] italic">Atelier v4.0</span>
          </div>
          <h2 className="text-7xl font-black italic text-white tracking-tighter uppercase leading-none">Digital Tailor Atelier</h2>
          <p className="text-google-textMuted mt-4 font-mono text-[13px] uppercase tracking-[0.4em]">Integrated AR Try-on & 360° Vision Prototype</p>
        </div>
        <div className="flex gap-4">
           <button onClick={() => setIsAutoRotating(!isAutoRotating)} className={`px-6 py-3 border rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${isAutoRotating ? 'bg-google-success text-google-bg border-google-success' : 'bg-google-surface text-white border-google-border'}`}>
              {isAutoRotating ? 'Rotation: Auto' : 'Rotation: Manual'}
           </button>
           <div className="px-6 py-3 bg-google-surface border border-google-border rounded-2xl text-[10px] font-black text-google-accent uppercase tracking-widest shadow-lg">Gemini 3 Pro Sync</div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 flex-1">
        {/* Main Preview: 360 AR Simulation */}
        <div className="lg:col-span-8 space-y-12">
           <div className="aspect-[4/5] bg-google-surface border border-google-border rounded-[5rem] overflow-hidden relative group shadow-2xl bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 pointer-events-none z-10"></div>
              
              {designResult?.imageUrl ? (
                <div className="w-full h-full flex flex-col items-center justify-center relative perspective-1000">
                   <div className="absolute top-12 left-12 z-20 flex items-center gap-4">
                      <span className="w-3 h-3 bg-google-success rounded-full animate-ping"></span>
                      <span className="px-4 py-2 bg-google-bg/60 backdrop-blur-xl border border-google-success/20 text-google-success rounded-full text-[10px] font-black uppercase tracking-widest">AR Live Sync</span>
                   </div>
                   
                   {/* Interactive 360 Viewer Placeholder */}
                   <div 
                    className="w-full h-full flex items-center justify-center transition-transform duration-100 ease-linear"
                    style={{ transform: `rotateY(${rotationDegree}deg)` }}
                   >
                      <img 
                        src={designResult.imageUrl} 
                        className="h-[80%] object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.1)] group-hover:scale-105 transition-transform duration-700" 
                        alt="AR Fashion Model" 
                      />
                   </div>

                   <div className="absolute bottom-20 left-12 right-12 z-20 space-y-10">
                      <div className="space-y-4">
                        <h3 className="text-white text-4xl font-black italic tracking-tighter leading-tight drop-shadow-2xl">
                          {designPrompt || "Awaiting design synthesis..."}
                        </h3>
                        <div className="flex gap-4">
                           <span className="px-4 py-2 bg-google-accent text-google-bg rounded-xl text-[10px] font-black uppercase tracking-widest">{designResult.fabric}</span>
                           <span className="px-4 py-2 bg-google-surface border border-google-border text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                             <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: designResult.color }}></div>
                             {designResult.color}
                           </span>
                        </div>
                      </div>
                      <div className="flex gap-6">
                         <button className="px-10 py-4 bg-white text-black rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl hover:bg-google-success transition-all hover:scale-105">Fabric Swatch</button>
                         <button className="px-10 py-4 bg-google-bg/60 border border-white/20 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest backdrop-blur-xl hover:bg-white/10 transition-all">Capture Raw 4K</button>
                      </div>
                   </div>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center space-y-12 opacity-20 group-hover:opacity-40 transition-opacity">
                   <span className="text-[200px] animate-pulse">👘</span>
                   <p className="text-google-textMuted font-black uppercase tracking-[1em] italic text-lg">Initializing AR Canvas...</p>
                </div>
              )}

              {/* Angle Controls */}
              <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-20">
                 {[0, 90, 180, 270].map(angle => (
                   <button 
                    key={angle} 
                    onClick={() => {setIsAutoRotating(false); setRotationDegree(angle);}}
                    className={`w-12 h-12 rounded-full border flex items-center justify-center text-[10px] font-black transition-all ${rotationDegree === angle ? 'bg-google-accent border-google-accent text-google-bg' : 'bg-google-surface border-google-border text-white hover:border-google-accent'}`}
                   >
                     {angle}°
                   </button>
                 ))}
              </div>
           </div>
        </div>

        {/* Control Panel */}
        <div className="lg:col-span-4 space-y-12">
           <div className="p-12 bg-google-surface border border-google-border rounded-[4rem] shadow-2xl space-y-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-google-accent/5 blur-3xl rounded-full"></div>
              
              <div>
                <h4 className="text-[12px] font-black text-google-accent uppercase tracking-[0.5em] mb-10 italic flex items-center gap-4">
                  <span className="w-2 h-2 bg-google-accent rounded-full"></span>
                  Voice Design Hub
                </h4>
                <div className="space-y-10">
                   <div className="flex justify-center py-10">
                      <button 
                        onClick={toggleVoiceMode}
                        className={`w-32 h-32 rounded-full flex flex-col items-center justify-center gap-4 transition-all duration-500 shadow-2xl ${isListening ? 'bg-red-500 animate-pulse text-white scale-110' : 'bg-google-bg border-4 border-google-border text-google-textMuted hover:border-google-success hover:text-google-success'}`}
                      >
                         <span className="text-4xl">{isListening ? '🎤' : '🎙️'}</span>
                         <span className="text-[10px] font-black uppercase tracking-widest">{isListening ? 'Listening...' : 'Push to Talk'}</span>
                      </button>
                   </div>

                   <form onSubmit={(e) => { e.preventDefault(); handleGenerateDesign(designPrompt); }} className="space-y-8">
                      <div className="space-y-4">
                         <label className="text-[10px] font-black text-google-textMuted uppercase tracking-widest ml-2">Manual Intent Overwrite</label>
                         <textarea 
                           value={designPrompt}
                           onChange={(e) => setDesignPrompt(e.target.value)}
                           placeholder="描述服装意图：面料、版型、工艺细节..."
                           className="w-full bg-google-bg border border-google-border rounded-3xl p-8 text-sm text-white focus:outline-none focus:border-google-success transition-all resize-none font-light h-40 shadow-inner"
                         />
                      </div>
                      <button 
                       type="submit" 
                       disabled={isGeneratingDesign || !designPrompt.trim()}
                       className="w-full py-6 bg-google-success text-google-bg rounded-[2.5rem] font-black text-base uppercase tracking-widest shadow-2xl hover:scale-[0.98] transition-all disabled:opacity-30 flex items-center justify-center gap-4"
                      >
                        {isGeneratingDesign ? (
                          <div className="w-5 h-5 border-4 border-google-bg border-t-transparent rounded-full animate-spin"></div>
                        ) : 'Start Neural Synthesis ▶'}
                      </button>
                   </form>
                </div>
              </div>

              {designResult?.description && (
                <div className="pt-12 border-t border-google-border space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
                   <div className="flex justify-between items-center">
                      <p className="text-[11px] font-black text-google-success uppercase tracking-widest italic">Manufacturing feasibility: High</p>
                      <span className="text-xl">✅</span>
                   </div>
                   <div className="text-[13px] text-google-textMuted leading-relaxed font-light italic bg-google-bg/40 p-8 rounded-[2.5rem] border border-google-border max-h-60 overflow-y-auto studio-scroll">
                     {designResult.description}
                   </div>
                </div>
              )}
           </div>

           <div className="p-10 bg-google-accent/5 border border-google-accent/20 rounded-[3.5rem] space-y-8 shadow-xl">
              <div className="flex items-center gap-4">
                {/* Fix: Replace undefined 'Box' component with an emoji to fix compilation error */}
                <span className="text-2xl">📦</span>
                <p className="text-[11px] font-black text-google-accent uppercase tracking-widest italic leading-none">Factory Link: youplay.uno</p>
              </div>
              <p className="text-[13px] text-google-textMuted leading-relaxed font-light">
                设计稿已自动进行 <span className="text-white font-bold">DFM (可制造性)</span> 评估。面料纹理权重已挂载至 Cloud Run 渲染节点。
              </p>
              <div className="h-1 bg-google-border rounded-full overflow-hidden">
                 <div className="h-full bg-google-accent w-3/4"></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  switch (activeStep) {
    case SectionId.Home: return renderHome();
    case SectionId.Compiler: return <SmartCompiler messages={messages} isProcessing={isProcessing} onSendMessage={onSendMessage} />;
    case SectionId.Admin: return renderAdmin();
    case SectionId.VisualPortal: return renderFashionLab();
    default: return renderHome();
  }
};

export default Workspace;