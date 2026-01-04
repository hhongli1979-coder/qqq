
import React from 'react';
import { CompilerStatus } from '../types';

interface RightPanelProps {
  status: CompilerStatus;
}

const RightPanel: React.FC<RightPanelProps> = ({ status }) => {
  return (
    <aside className="w-80 border-l border-google-border bg-google-bg p-6 space-y-8 shrink-0 studio-scroll overflow-y-auto">
      <div>
        <h3 className="text-[11px] font-bold text-google-textMuted uppercase tracking-[0.2em] mb-6">全栈基础设施</h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-google-surface border border-google-border rounded-xl group hover:border-google-accent transition-colors">
             <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold">Colab Engine</span>
                <span className="w-2 h-2 rounded-full bg-google-success animate-pulse"></span>
             </div>
             <div className="flex items-end justify-between">
                <p className="text-[10px] text-google-textMuted font-mono">Nvidia T4 | 16GB</p>
                <p className="text-xs font-bold text-google-accent">Connected</p>
             </div>
          </div>

          <div className="p-4 bg-google-surface border border-google-border rounded-xl group hover:border-amber-500 transition-colors">
             <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-amber-500">Firebase Hub</span>
                <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></span>
             </div>
             <div className="flex items-end justify-between">
                <p className="text-[10px] text-google-textMuted font-mono">Firestore | Auth | Storage</p>
                <p className="text-xs font-bold text-amber-500">Synced</p>
             </div>
          </div>

          <div className="p-4 bg-google-surface border border-google-border rounded-xl group hover:border-white/40 transition-colors">
             <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold">Vercel Edge</span>
                <span className="w-2 h-2 rounded-full bg-white/20"></span>
             </div>
             <div className="flex items-end justify-between">
                <p className="text-[10px] text-google-textMuted font-mono">Global CDN | Idle</p>
                <p className="text-xs font-bold text-google-textMuted">Waiting</p>
             </div>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-google-border">
        <h3 className="text-[11px] font-bold text-google-textMuted uppercase tracking-[0.2em] mb-6">全栈校准 (Calibration)</h3>
        <div className="space-y-4">
           <div className="space-y-2">
             <label className="text-[10px] text-google-textMuted uppercase font-bold">编译核心</label>
             <select className="w-full bg-google-surface border border-google-border rounded-lg px-3 py-2 text-xs focus:border-google-accent outline-none">
               <option>Gemini 3 Pro (Vision+</option>
               <option>Gemini 2.5 Flash (Speed)</option>
               <option>Moda Custom Engine</option>
             </select>
           </div>
           
           <div className="flex items-center justify-between py-2 group cursor-pointer">
             <span className="text-xs group-hover:text-amber-500 transition-colors">Firebase 实时预览</span>
             <div className="w-10 h-5 bg-amber-500 rounded-full relative">
                <div className="absolute right-1 top-1 w-3 h-3 bg-google-bg rounded-full"></div>
             </div>
           </div>

           <div className="flex items-center justify-between py-2 opacity-50">
             <span className="text-xs">自动化性能审计</span>
             <div className="w-10 h-5 bg-google-surfaceLight rounded-full relative">
                <div className="absolute left-1 top-1 w-3 h-3 bg-google-bg rounded-full"></div>
             </div>
           </div>
        </div>
      </div>

      <div className="mt-auto pt-10 border-t border-google-border">
        <div className="p-5 bg-amber-500/5 border border-amber-500/20 rounded-2xl relative overflow-hidden">
           <div className="absolute -right-4 -bottom-4 text-4xl opacity-10 grayscale">🔥</div>
           <p className="text-[10px] font-bold text-amber-500 uppercase mb-4 tracking-widest">集成健康度 (Stack Health)</p>
           <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-mono font-bold">98</span>
              <span className="text-lg font-mono text-amber-500">%</span>
           </div>
           <p className="text-[10px] text-google-textMuted leading-relaxed">除 Vercel 待推送外，核心链路 (Gemini &lt;&gt; Colab &lt;&gt; Firebase) 已连通。</p>
        </div>
      </div>
    </aside>
  );
};

export default RightPanel;
