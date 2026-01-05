
import React from 'react';
import { SectionId } from '../types';

const steps = [
  { id: '01', title: '环境与项目初始化', detail: '基于 Cloud Build 自动配置全栈基础架构，锁定高性能运行时环境。', icon: '🛠️' },
  { id: '02', title: 'LLM API 节点选择', detail: '智能匹配 Gemini 2.5/3 Pro 核心节点，确保复杂业务逻辑的精准表达。', icon: '🧠' },
  { id: '03', title: '提示到组件的生成', detail: '核心转码：将自然语言意图直接编译为 React 生产级组件。', icon: '✨' },
  { id: '04', title: 'Vercel Automation', detail: '集成 CI/CD 流水线，实现代码自动化推送与 Edge 边缘网络全球加速。', icon: '🚀' },
  { id: '05', title: '编辑器与门户界面', detail: '为非技术人员提供可视化控制台，实现 AI 生成内容的手动微调。', icon: '🖥️' },
  { id: '06', title: '优化与反馈循环', detail: '基于用户交互数据，自动重构 Prompt 与逻辑层，实现系统的自我进化。', icon: '🔄' }
];

const About: React.FC = () => {
  return (
    <section id={SectionId.Workflow} className="py-32 bg-[#131314]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-24 items-start">
          <div className="lg:w-[400px] shrink-0 lg:sticky lg:top-32">
            <span className="text-google-accent text-[11px] font-bold uppercase tracking-[0.4em] mb-4 block">The Process</span>
            <h2 className="text-4xl font-medium text-white mb-8">六步实施计划</h2>
            <p className="text-google-textMuted text-lg font-light leading-relaxed mb-10">
              moda AI Studio 遵循严密的工程学逻辑。我们不只是在生成代码，我们是在为您构建一整套自动化的“数字工厂”。
            </p>
            <div className="p-8 bg-google-surface border border-google-border rounded-3xl shadow-xl">
               <div className="flex items-center justify-between mb-4">
                 <p className="text-[10px] text-google-textMuted font-mono uppercase tracking-widest">Compiler Pipeline</p>
                 <span className="text-[10px] text-google-success font-bold">STABLE</span>
               </div>
               <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    <div className="w-8 h-8 rounded-full border-2 border-google-surface bg-google-accent flex items-center justify-center text-[10px] font-bold text-google-bg">G</div>
                    <div className="w-8 h-8 rounded-full border-2 border-google-surface bg-google-success flex items-center justify-center text-[10px] font-bold text-google-bg">V</div>
                  </div>
                  <span className="text-xs font-medium text-white">Full Stack Alignment</span>
               </div>
            </div>
          </div>
          
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step) => (
              <div key={step.id} className="p-8 bg-google-surface border border-google-border rounded-[2.5rem] hover:bg-google-surfaceLight transition-all group">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-google-accent font-mono text-xs font-bold tracking-tighter bg-google-accent/10 px-3 py-1 rounded-full">STEP_{step.id}</div>
                  <div className="text-2xl grayscale group-hover:grayscale-0 transition-all">{step.icon}</div>
                </div>
                <h3 className="text-xl font-medium text-white mb-4 group-hover:text-google-accent transition-colors">{step.title}</h3>
                <p className="text-google-textMuted text-sm font-light leading-relaxed">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
