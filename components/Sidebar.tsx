
import React from 'react';
import { SectionId } from '../types';

interface SidebarProps {
  activeStep: string;
  onStepChange: (id: string) => void;
  isAuthenticated?: boolean;
}

const steps = [
  { id: SectionId.Home, title: '集群看板', icon: '📊', protected: false },
  { id: SectionId.Compiler, title: '智能编译台', icon: '✨', protected: false },
  { id: SectionId.Automation, title: '生产分发', icon: '🚀', protected: false },
  { id: SectionId.VisualPortal, title: '视频实验室', icon: '🎬', protected: false },
  { id: SectionId.Admin, title: '战略后台', icon: '⚙️', protected: true },
  { id: SectionId.Feedback, title: '审计报告', icon: '📈', protected: false }
];

const Sidebar: React.FC<SidebarProps> = ({ activeStep, onStepChange, isAuthenticated }) => {
  return (
    <aside className="w-64 border-r border-google-border flex flex-col bg-google-bg shrink-0">
      <div className="p-6 border-b border-google-border">
        <button className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-google-success text-google-bg rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-95 transition-all shadow-xl shadow-google-success/10 group">
          <span className="text-xl group-hover:rotate-90 transition-transform">+</span>
          <span>新生产任务</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto studio-scroll py-8">
        <p className="px-8 text-[10px] font-black text-google-textMuted uppercase tracking-[0.4em] mb-8 opacity-40 italic">Main Infrastructure</p>
        <nav className="flex flex-col">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => onStepChange(step.id)}
              className={`flex items-center gap-5 px-8 py-5 text-sm font-medium transition-all group relative ${
                activeStep === step.id ? 'text-google-success bg-google-success/5 border-r-2 border-google-success' : 'text-google-textMuted hover:text-google-text hover:bg-white/5'
              }`}
            >
              <span className={`text-2xl transition-all duration-500 ${activeStep === step.id ? 'scale-110 drop-shadow-[0_0_8px_currentColor]' : 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100'}`}>{step.icon}</span>
              <span className={`tracking-tighter flex-1 text-left font-black uppercase text-[12px] ${activeStep === step.id ? 'opacity-100' : 'opacity-70'}`}>{step.title}</span>
              {step.protected && !isAuthenticated && (
                <span className="text-[10px] opacity-30">🔒</span>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6 border-t border-google-border">
        <div className="flex items-center gap-4 px-4 py-3 bg-google-surface border border-google-border rounded-xl text-[10px] font-black text-google-textMuted cursor-pointer hover:border-google-success hover:text-white transition-all group">
          <span className="group-hover:rotate-180 transition-transform duration-1000">🛡️</span>
          <span className="uppercase tracking-widest">Core_Settings</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
