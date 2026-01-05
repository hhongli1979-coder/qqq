
import React from 'react';
import { SectionId } from '../types';

const sectors = [
  {
    title: '人工智能市场应用',
    focus: '智能体验 & 生产力',
    desc: '集成 MCP 协议的智能企业看板。深度对齐 Gemini API 实现自动化决策流，重塑 B2B 市场的效率基准。',
    icon: '📈',
    tags: ['Next.js 15', 'Vertex AI', 'BigQuery']
  },
  {
    title: '网站和 AR 电子商务',
    focus: '沉浸交互 & 转化率',
    desc: '下一代 3D 购物。内置 Virtual Try-on (AR 换衣) 核心算法，将静态页面升级为可交互的数字化试衣间。',
    icon: '✨',
    tags: ['WebGL', 'MediaPipe', 'Real-time']
  },
  {
    title: '图像和视频合成',
    focus: '内容工厂 & 自动化',
    desc: '利用 Veo 与 Imagen 4 实现营销内容全自动化流水线。从 Prompt 直接生成 4K 视频资产与高保真海报。',
    icon: '🎬',
    tags: ['Veo 3.1', 'Cloud Storage', 'Auto-Gen']
  }
];

const Collection: React.FC = () => {
  return (
    <section id={SectionId.Sectors} className="py-32 bg-[#0d0d0e] border-t border-google-border">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-20 text-center lg:text-left">
          <span className="text-google-accent text-[11px] font-bold uppercase tracking-[0.4em] mb-4 block">Core Alignments</span>
          <h2 className="text-4xl md:text-5xl font-medium text-white mb-6">核心行业领域</h2>
          <p className="text-google-textMuted text-lg max-w-2xl font-light leading-relaxed">
            moda AI Studio 针对现代数字化转型中最具增长潜力的三大版块，提供预编译的逻辑架构与业务模版。
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {sectors.map((sector, idx) => (
            <div key={idx} className="group relative bg-google-surface border border-google-border p-10 rounded-[2.5rem] hover:border-google-accent transition-all duration-500 overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-google-accent/5 rounded-full blur-3xl group-hover:bg-google-accent/10 transition-colors"></div>
              
              <div className="text-5xl mb-8 transform group-hover:scale-110 transition-transform duration-500">{sector.icon}</div>
              
              <div className="mb-4">
                <span className="text-[10px] font-bold text-google-accent uppercase tracking-widest bg-google-accent/10 px-3 py-1 rounded-full border border-google-accent/20">
                  {sector.focus}
                </span>
              </div>
              
              <h3 className="text-2xl font-medium text-white mb-5">{sector.title}</h3>
              <p className="text-google-textMuted text-sm font-light leading-relaxed mb-8">
                {sector.desc}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {sector.tags.map(tag => (
                  <span key={tag} className="text-[9px] font-mono text-google-textMuted bg-black/30 px-2 py-1 rounded">#{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collection;
