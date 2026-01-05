
import React from 'react';
import { SectionId } from '../types';

const VisualPortal: React.FC = () => {
  return (
    <section id={SectionId.Editor} className="py-24 bg-google-bg border-y border-google-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 relative">
             <div className="bg-google-surface border border-google-border rounded-[3rem] aspect-video p-8 flex flex-col shadow-2xl overflow-hidden group">
                <div className="h-10 border-b border-google-border flex items-center justify-between px-2 mb-8">
                  <div className="flex gap-6">
                    <span className="text-[10px] font-black text-google-success uppercase tracking-widest">Render View</span>
                    <span className="text-[10px] font-black text-google-textMuted uppercase tracking-widest">Frame_144</span>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-google-success/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-google-success animate-pulse"></div>
                  </div>
                </div>
                <div className="flex-1 flex gap-6">
                  <div className="w-1/3 bg-google-bg rounded-[2rem] p-6 space-y-4">
                    <div className="h-2 w-full bg-google-border rounded"></div>
                    <div className="h-2 w-2/3 bg-google-border rounded"></div>
                    <div className="h-2 w-1/2 bg-google-border rounded"></div>
                    <div className="h-10 w-full bg-google-success/10 rounded-xl mt-8 border border-google-success/20"></div>
                  </div>
                  <div className="flex-1 bg-google-bg rounded-[2rem] flex flex-col items-center justify-center border border-dashed border-google-border group-hover:border-google-success transition-colors duration-700">
                    <div className="text-center">
                      <p className="text-5xl mb-4 group-hover:scale-110 transition-transform">🎬</p>
                      <p className="text-[10px] font-mono text-google-textMuted uppercase tracking-widest">VEO_ENGINE_READY</p>
                    </div>
                  </div>
                </div>
             </div>
             
             {/* Stats Card */}
             <div className="absolute -bottom-8 -right-8 p-8 bg-google-success text-google-bg rounded-[2rem] shadow-2xl transform rotate-3 hover:rotate-0 transition-transform">
                <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">Sync Latency</p>
                <p className="text-3xl font-mono font-black italic">24ms</p>
             </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="text-google-success text-[11px] font-black uppercase tracking-[0.4em] mb-4 block">Visual Interface</span>
            <h2 className="text-4xl md:text-5xl font-black italic text-white mb-10 tracking-tighter uppercase leading-none">可视化门户 <br/>编辑器系统</h2>
            <p className="text-lg text-google-textMuted font-light leading-relaxed mb-12">
              moda AI Studio 提供了一个无缝的“编辑器+门户”环境，让您能够实时微调 AI 生成的内容与交互逻辑，并直接推送到私有节点。
            </p>

            <div className="space-y-8">
              <div className="flex gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-google-surface border border-google-border flex items-center justify-center text-2xl group-hover:border-google-success transition-all">🖱️</div>
                <div>
                  <h4 className="font-black text-white text-base mb-2 uppercase tracking-tight">直观可视化微调</h4>
                  <p className="text-google-textMuted text-sm font-light">直接在画布上修改样式，编译器将同步重写底层逻辑代码。</p>
                </div>
              </div>
              <div className="flex gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-google-surface border border-google-border flex items-center justify-center text-2xl group-hover:border-google-accent transition-all">🚀</div>
                <div>
                  <h4 className="font-black text-white text-base mb-2 uppercase tracking-tight">集群一键分发</h4>
                  <p className="text-google-textMuted text-sm font-light">满意后即刻全量推送到您的私有生产环境，零停机同步。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualPortal;
