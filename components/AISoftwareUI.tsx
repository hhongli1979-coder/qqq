
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Image as ImageIcon, Video, Wand2, 
  Type, Music, Layers, RefreshCw, 
  Sparkles, Settings
} from 'lucide-react';
import { generateImage, generateVideo } from '../services/geminiService';

export const AISoftwareUI = () => {
  const [mode, setMode] = useState<'VIDEO' | 'IMAGE'>('IMAGE');
  const [isGenerating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [prompt, setPrompt] = useState('A cinematic editorial of a techwear collection, futuristic rainy environment, high contrast neon lighting.');
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState('Awaiting instructions...');

  const handleGenerate = async () => {
    setGenerating(true);
    setResultUrl(null);
    setProgress(10);
    setStatusMsg("Initializing Neural Stream...");
    
    try {
      if (mode === 'IMAGE') {
        setStatusMsg("Synthesizing Image Layers...");
        const url = await generateImage(prompt);
        setResultUrl(url);
        setProgress(100);
      } else {
        const url = await generateVideo(prompt, (msg) => {
          setStatusMsg(msg);
          setProgress(p => Math.min(95, p + 5));
        });
        setResultUrl(url);
        setProgress(100);
      }
    } catch (error: any) {
      console.error(error);
      setStatusMsg(`ERROR: ${error.message}`);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="flex h-full font-sans select-none bg-[#050505] text-white">
      {/* 侧边工具栏 */}
      <aside className="w-20 bg-[#111]/80 backdrop-blur-xl border-r border-white/5 flex flex-col items-center py-8 gap-8 z-20">
        <div className="w-10 h-10 bg-google-accent text-google-bg rounded-xl flex items-center justify-center font-black text-lg shadow-[0_0_20px_rgba(138,180,248,0.3)]">M</div>
        <div className="h-px w-10 bg-white/5" />
        <button 
          onClick={() => setMode('VIDEO')} 
          className={`p-3 rounded-2xl transition-all duration-500 ${mode === 'VIDEO' ? 'bg-google-accent/10 text-google-accent shadow-[0_0_15px_rgba(138,180,248,0.1)]' : 'text-white/20 hover:text-white/50'}`}
        >
          <Video size={22}/>
        </button>
        <button 
          onClick={() => setMode('IMAGE')} 
          className={`p-3 rounded-2xl transition-all duration-500 ${mode === 'IMAGE' ? 'bg-fuchsia-500/10 text-fuchsia-400 shadow-[0_0_15px_rgba(232,121,249,0.1)]' : 'text-white/20 hover:text-white/50'}`}
        >
          <ImageIcon size={22}/>
        </button>
        <button className="p-3 text-white/20 hover:text-white/50 transition-colors"><Type size={22}/></button>
        <button className="p-3 text-white/20 hover:text-white/50 transition-colors"><Music size={22}/></button>
        <div className="mt-auto p-3 text-white/10"><Settings size={22}/></div>
      </aside>

      {/* 画布区域 */}
      <main className="flex-1 bg-[#050505] relative flex items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="relative z-10 w-full max-w-4xl aspect-video bg-black rounded-3xl border border-white/5 shadow-[0_40px_80px_rgba(0,0,0,0.6)] overflow-hidden group/canvas">
          <AnimatePresence mode="wait">
            {isGenerating ? (
              <motion.div 
                key="gen"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-20"
              >
                <div className="w-72 h-1.5 bg-white/5 rounded-full overflow-hidden mb-6 border border-white/5">
                  <motion.div 
                    className="h-full bg-google-accent shadow-[0_0_15px_#8ab4f8]" 
                    animate={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex flex-col items-center gap-3">
                  <span className="text-[10px] text-google-accent font-black uppercase tracking-[0.5em] animate-pulse">{statusMsg}</span>
                  <span className="text-[10px] font-mono text-white/40">{progress}%</span>
                </div>
              </motion.div>
            ) : resultUrl ? (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }}
                className="w-full h-full"
              >
                {mode === 'VIDEO' ? (
                  <video autoPlay loop controls src={resultUrl} className="w-full h-full object-contain" />
                ) : (
                  <img src={resultUrl} className="w-full h-full object-contain" alt="Generated" />
                )}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-white/10">
                 <Sparkles size={64} className="mb-4 opacity-20" />
                 <p className="text-[10px] font-black uppercase tracking-widest italic">Awaiting Synthesis Instruction</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* 控制面板 */}
      <aside className="w-80 bg-[#111]/80 backdrop-blur-xl border-l border-white/5 p-8 flex flex-col gap-10">
        <div>
          <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-6 italic">Prompt Engine</h3>
          <div className="relative group">
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-40 bg-black/60 border border-white/5 rounded-[1.5rem] p-5 text-xs text-white/80 focus:outline-none focus:border-google-accent/40 transition-all resize-none shadow-inner leading-relaxed"
            />
            <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/20">UTF-8_ALIGNED</div>
          </div>
        </div>

        <div className="space-y-6 flex-1">
          <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-4 italic">Neural Config</h3>
          <div className="p-6 bg-black/40 rounded-2xl border border-white/5 space-y-4">
             <div className="flex justify-between items-center text-[10px]">
                <span className="text-white/40 uppercase font-black italic">Quality</span>
                <span className="text-google-accent">Production_Max</span>
             </div>
             <div className="flex justify-between items-center text-[10px]">
                <span className="text-white/40 uppercase font-black italic">Sampling</span>
                <span className="text-google-accent">Stochastic</span>
             </div>
          </div>
        </div>

        <button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full py-5 bg-white text-black rounded-[1.5rem] font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-4 hover:bg-google-accent transition-all disabled:opacity-30 shadow-2xl active:scale-95 group/btn italic"
        >
          {isGenerating ? <RefreshCw className="animate-spin" size={16}/> : <Wand2 size={16} className="group-hover/btn:rotate-12 transition-transform" />}
          {isGenerating ? 'Synthesizing...' : 'Generate Artifact'}
        </button>
      </aside>
    </div>
  );
};
