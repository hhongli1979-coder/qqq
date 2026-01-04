
import React from 'react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-google-accent/5 blur-[120px] rounded-full"></div>
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 bg-google-surface border border-google-border rounded-full">
           <span className="w-2 h-2 rounded-full bg-google-success animate-pulse"></span>
           <span className="text-[10px] font-bold text-google-textMuted uppercase tracking-widest">Compiler v2.8 Live</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-8 leading-[1.1] text-google-text">
          提示词即 <span className="text-google-accent">生产级应用</span>
        </h1>
        
        <p className="text-google-textMuted text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed">
          基于 Google Studio 规范，一键将自然语言转化为自动化网站、AR 换衣电商组件及 4K 营销视频。
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={onStart}
            className="px-8 py-3.5 bg-google-accent text-google-bg rounded-xl text-sm font-bold hover:scale-[1.05] transition-all shadow-xl shadow-google-accent/10"
          >
            即刻开始编译
          </button>
          <button className="px-8 py-3.5 bg-transparent text-google-text border border-google-border rounded-xl text-sm font-bold hover:bg-google-surface transition-all">
            查看技术蓝图
          </button>
        </div>

        <div className="mt-20 w-full max-w-3xl mx-auto bg-google-surface border border-google-border rounded-xl overflow-hidden shadow-2xl text-left">
          <div className="h-10 bg-google-surfaceLight border-b border-google-border flex items-center px-4 gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
            <div className="ml-4 text-[10px] font-mono text-google-textMuted uppercase tracking-widest">compilation_logs.log</div>
          </div>
          <div className="p-6 font-mono text-[12px] leading-relaxed space-y-1.5 h-48 studio-scroll overflow-y-auto">
            <p className="text-google-textMuted"><span className="text-google-success">✓</span> 项目初始化成功 (Step 01)</p>
            <p className="text-google-textMuted"><span className="text-google-success">✓</span> 已连接 Gemini-3-Pro 节点 (Step 02)</p>
            <p className="text-google-accent animate-pulse">| 正在编译: AR 换衣核心物理引擎...</p>
            <p className="text-google-textMuted opacity-40">| Loading vision_transformer_v4.bin...</p>
            <p className="text-google-textMuted opacity-40">| Mapping 3D mesh points to React props...</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
