
import React, { useState, useEffect } from 'react';
import { SectionId, Message } from '../types';

interface WorkspaceProps {
  activeStep: string;
  messages: Message[];
  isProcessing: boolean;
}

const Workspace: React.FC<WorkspaceProps> = ({ activeStep, messages, isProcessing }) => {
  const [colabUrl, setColabUrl] = useState('https://moda-studio-tunnel.loca.lt');
  const [adminTab, setAdminTab] = useState<'DATABASE' | 'MARKETPLACE' | 'APIS' | 'SYSTEM'>('MARKETPLACE');
  
  // Vertex AI Config
  const [vertexConfig, setVertexConfig] = useState({
    projectId: 'moda-vision-v1',
    location: 'us-central1',
    modelEndpoint: 'projects/123/locations/us-central1/endpoints/456'
  });

  // Firebase SDK Config
  const [fbConfig, setFbConfig] = useState({
    apiKey: "AIzaSy...",
    projectId: "moda-ai-studio",
    databaseURL: "https://moda-ai-studio.firebaseio.com"
  });

  // Model Assets State - 模拟从 Vertex AI 抓取的模型
  const [models, setModels] = useState([
    { id: 'VAI_LLM_PRO', name: '全栈 UI 编译器核心 (Gemini 3 Pro Base)', type: 'Vertex AI', mode: 'FOR_SALE', price: '$2,999', status: 'ACTIVE', revenue: '$12k' },
    { id: 'VAI_AR_VTO', name: 'AR 实时试衣物理引擎', type: 'Vertex Custom', mode: 'RENTAL', price: '$0.05/API', status: 'ACTIVE', revenue: '$4.5k' },
    { id: 'VAI_IMG_GEN', name: 'Imagen 4 高精度电商图生成', type: 'Vertex AI', mode: 'OPEN_SOURCE', price: 'FREE', status: 'ACTIVE', revenue: '0' }
  ]);

  const colabBackendCode = `
# =======================================================
# moda AI Studio - Vertex AI & Firebase Middleman
# =======================================================
from google.cloud import aiplatform
from fastapi import FastAPI
import firebase_admin
from firebase_admin import firestore, auth

# 1. Vertex AI 初始化 (由 CloudSync 注入参数)
aiplatform.init(project="${vertexConfig.projectId}", location="${vertexConfig.location}")

# 2. 商业化中继逻辑 - 鉴权与计费
@app.post("/v1/models/{model_id}/predict")
async def commercial_predict(model_id: str, payload: dict, token: str):
    # A. Firebase Auth 验证租户/买家身份
    decoded_token = auth.verify_id_token(token)
    user_id = decoded_token['uid']
    
    # B. 检查 Firebase 中的商业授权状态 (出售/出租)
    asset_ref = db.collection('marketplace_assets').document(model_id).get()
    if not asset_ref.exists: return {"error": "Asset not found"}
    
    # C. 调用 Vertex AI 托管端点
    endpoint = aiplatform.Endpoint("${vertexConfig.modelEndpoint}")
    response = endpoint.predict(instances=payload['instances'])
    
    # D. 写入计费日志到 Firestore
    db.collection('usage_logs').add({
        'user_id': user_id,
        'model_id': model_id,
        'mode': asset_ref.to_dict()['mode'],
        'timestamp': firestore.SERVER_TIMESTAMP
    })
    
    return response.predictions
`;

  const renderStepContent = () => {
    switch (activeStep) {
      case SectionId.CloudSync:
        return (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 pb-20">
            <div className="flex justify-between items-center">
               <h3 className="text-3xl font-medium tracking-tight">全栈云端连接中心</h3>
               <div className="flex gap-2">
                  <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-[10px] font-bold border border-indigo-500/20">VERTEX READY</span>
                  <span className="px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-[10px] font-bold border border-amber-500/20">FIREBASE SYNCED</span>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
               {/* 配置列 */}
               <div className="lg:col-span-5 space-y-6">
                  <div className="bg-google-surface border border-google-border rounded-2xl p-6 shadow-xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-indigo-500/10 transition-all"></div>
                     <h4 className="text-[10px] font-black text-google-textMuted uppercase mb-6 tracking-[0.2em] flex items-center gap-2">
                        <span className="text-indigo-400 text-lg">☁️</span> Google Vertex AI 参数
                     </h4>
                     <div className="space-y-4">
                        {Object.entries(vertexConfig).map(([key, value]) => (
                          <div key={key} className="space-y-1">
                            <label className="text-[9px] text-google-textMuted font-bold uppercase ml-1">{key}</label>
                            <input 
                              type="text" 
                              value={value}
                              onChange={(e) => setVertexConfig({...vertexConfig, [key]: e.target.value})}
                              className="w-full bg-google-bg border border-google-border rounded-xl px-4 py-2.5 text-xs font-mono text-indigo-300 outline-none focus:border-indigo-500 transition-colors"
                            />
                          </div>
                        ))}
                     </div>
                  </div>

                  <div className="bg-google-surface border border-google-border rounded-2xl p-6 shadow-xl">
                     <h4 className="text-[10px] font-black text-google-textMuted uppercase mb-6 tracking-[0.2em] flex items-center gap-2">
                        <span className="text-amber-500 text-lg">🔥</span> Firebase 鉴权与计费
                     </h4>
                     <div className="space-y-3">
                        <div className="p-4 bg-google-bg border border-google-border rounded-xl flex items-center justify-between group cursor-pointer hover:border-amber-500/50 transition-colors">
                           <div className="flex flex-col">
                              <span className="text-xs font-bold">Firestore Connector</span>
                              <span className="text-[9px] text-google-textMuted">marketplace_assets (Synced)</span>
                           </div>
                           <div className="w-2 h-2 rounded-full bg-google-success shadow-[0_0_8px_rgba(129,201,149,0.5)]"></div>
                        </div>
                        <div className="p-4 bg-google-bg border border-google-border rounded-xl flex items-center justify-between group cursor-pointer hover:border-amber-500/50 transition-colors">
                           <div className="flex flex-col">
                              <span className="text-xs font-bold">Firebase Auth</span>
                              <span className="text-[9px] text-google-textMuted">Customer Rental Tokens</span>
                           </div>
                           <div className="w-2 h-2 rounded-full bg-google-success shadow-[0_0_8px_rgba(129,201,149,0.5)]"></div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* 后端代码预览 */}
               <div className="lg:col-span-7 flex flex-col gap-6">
                  <div className="bg-google-surface border border-google-border rounded-2xl flex flex-col overflow-hidden h-full min-h-[500px] shadow-2xl">
                    <div className="p-4 border-b border-google-border flex justify-between items-center bg-white/5">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-google-accent animate-pulse"></div>
                            <span className="text-[10px] font-bold text-google-text uppercase tracking-widest">Vertex AI 商业中继脚本 (Colab/FastAPI)</span>
                        </div>
                        <button className="text-[9px] font-bold text-google-accent hover:text-white uppercase">导出到 Colab</button>
                    </div>
                    <div className="flex-1 p-6 overflow-auto bg-black/40 studio-scroll">
                        <pre className="text-[11px] font-mono text-google-textMuted leading-relaxed">
                            <code>{colabBackendCode.trim()}</code>
                        </pre>
                    </div>
                  </div>
                  <button className="w-full py-4 bg-indigo-500 text-google-bg rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.01] transition-all shadow-xl shadow-indigo-500/10">
                    激活 Vertex 端点连接
                  </button>
               </div>
            </div>
          </div>
        );

      case SectionId.Admin:
        return (
          <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            <div className="flex justify-between items-center bg-google-surface/50 p-6 rounded-3xl border border-google-border shadow-lg">
              <div>
                <h3 className="text-3xl font-medium tracking-tight">AI 资产交易所 (Admin)</h3>
                <p className="text-sm text-google-textMuted mt-1 uppercase tracking-widest font-bold">管理 Vertex AI 模型资产的 出售、出租 与 开源</p>
              </div>
              <div className="flex bg-google-bg border border-google-border rounded-xl p-1">
                {(['MARKETPLACE', 'DATABASE', 'APIS', 'SYSTEM'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setAdminTab(t)}
                    className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                      adminTab === t ? 'bg-indigo-500 text-google-bg shadow-lg shadow-indigo-500/20' : 'text-google-textMuted hover:text-google-text'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {adminTab === 'MARKETPLACE' && (
              <div className="space-y-8">
                {/* 仪表盘统计 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                   <div className="bg-google-surface border border-google-border p-6 rounded-2xl shadow-xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-2 opacity-10">💰</div>
                      <p className="text-[10px] text-google-textMuted uppercase font-bold mb-2 tracking-widest">总计模型收益</p>
                      <p className="text-3xl font-mono font-bold text-google-success">$16,500</p>
                      <div className="mt-4 h-1 w-full bg-google-bg rounded-full overflow-hidden">
                         <div className="h-full bg-google-success w-[75%]"></div>
                      </div>
                   </div>
                   <div className="bg-google-surface border border-google-border p-6 rounded-2xl shadow-xl">
                      <p className="text-[10px] text-google-textMuted uppercase font-bold mb-2 tracking-widest">活跃出租端点</p>
                      <p className="text-3xl font-mono font-bold text-indigo-400">12</p>
                      <p className="text-[9px] text-google-success mt-2 font-bold">+3 Since Yesterday</p>
                   </div>
                   <div className="bg-google-surface border border-google-border p-6 rounded-2xl shadow-xl">
                      <p className="text-[10px] text-google-textMuted uppercase font-bold mb-2 tracking-widest">开源包下载量</p>
                      <p className="text-3xl font-mono font-bold text-google-accent">2,480</p>
                      <p className="text-[9px] text-google-textMuted mt-2">NPM / GitHub Registry</p>
                   </div>
                   <div className="bg-google-surface border border-google-border p-6 rounded-2xl shadow-xl">
                      <p className="text-[10px] text-google-textMuted uppercase font-bold mb-2 tracking-widest">资产健康度</p>
                      <p className="text-3xl font-mono font-bold text-google-text">99.8<span className="text-sm">%</span></p>
                      <p className="text-[9px] text-google-textMuted mt-2 uppercase">Uptime Monitoring</p>
                   </div>
                </div>

                {/* 资产列表 */}
                <div className="bg-google-surface border border-google-border rounded-3xl overflow-hidden shadow-2xl">
                  <div className="p-6 border-b border-google-border flex items-center justify-between bg-white/5">
                    <h4 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                       <span className="w-2 h-4 bg-indigo-500 rounded"></span> Vertex AI 托管资产清单
                    </h4>
                    <button className="px-4 py-2 bg-google-bg border border-google-border rounded-xl text-[10px] font-bold uppercase hover:bg-google-surfaceLight transition-colors">
                       同步 Vertex 控制台
                    </button>
                  </div>
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="text-google-textMuted border-b border-google-border bg-google-bg/30 font-bold uppercase">
                        <th className="p-6">资产名称 / Endpoint ID</th>
                        <th className="p-6">类型</th>
                        <th className="p-6">当前模式</th>
                        <th className="p-6">标价/费率</th>
                        <th className="p-6">累计收益</th>
                        <th className="p-6 text-right">管理控制</th>
                      </tr>
                    </thead>
                    <tbody className="text-google-text font-mono">
                      {models.map((model, i) => (
                        <tr key={i} className="border-b border-google-border/30 hover:bg-white/5 transition-all group">
                          <td className="p-6">
                             <div className="flex flex-col">
                                <span className="text-sm font-bold font-sans group-hover:text-indigo-400 transition-colors">{model.name}</span>
                                <span className="text-[10px] text-google-textMuted opacity-50">{model.id}</span>
                             </div>
                          </td>
                          <td className="p-6">
                             <span className={`px-2 py-1 rounded text-[9px] font-bold ${model.type.includes('Vertex') ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-google-accent/10 text-google-accent border border-google-accent/20'}`}>
                                {model.type}
                             </span>
                          </td>
                          <td className="p-6">
                             <select 
                                value={model.mode}
                                className="bg-google-bg border border-google-border rounded-lg px-2 py-1.5 text-[10px] outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                                onChange={(e) => {
                                   const newModels = [...models];
                                   newModels[i].mode = e.target.value;
                                   setModels(newModels);
                                }}
                             >
                                <option value="FOR_SALE">出售 (Sell)</option>
                                <option value="RENTAL">出租 (Rent)</option>
                                <option value="OPEN_SOURCE">开源 (Open)</option>
                             </select>
                          </td>
                          <td className="p-6">
                             <input 
                                type="text" 
                                value={model.price}
                                className="bg-google-bg border border-google-border rounded-lg px-2 py-1.5 w-24 text-[10px] text-google-success font-bold outline-none focus:border-google-success"
                                onChange={(e) => {
                                   const newModels = [...models];
                                   newModels[i].price = e.target.value;
                                   setModels(newModels);
                                }}
                             />
                          </td>
                          <td className="p-6 text-google-textMuted font-bold">
                             {model.revenue}
                          </td>
                          <td className="p-6 text-right">
                             <div className="flex gap-2 justify-end">
                                <button className="p-2 bg-google-surfaceLight border border-google-border rounded-lg hover:border-indigo-500 transition-colors group/btn">
                                   <span className="block group-hover/btn:scale-110 transition-transform text-indigo-400">⚡</span>
                                </button>
                                <button className="p-2 bg-google-surfaceLight border border-google-border rounded-lg hover:border-red-500 transition-colors group/btn">
                                   <span className="block group-hover/btn:scale-110 transition-transform text-red-400">✖</span>
                                </button>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {adminTab === 'DATABASE' && (
              <div className="p-20 bg-google-surface rounded-3xl border border-google-border text-center shadow-xl">
                 <div className="text-4xl mb-6">🔥</div>
                 <h4 className="text-xl font-medium mb-2">Firestore 实时同步中</h4>
                 <p className="text-google-textMuted text-sm">正在监控集合: <code className="bg-google-bg px-2 py-1 rounded text-amber-500">marketplace_assets</code></p>
              </div>
            )}
          </div>
        );

      case SectionId.Home:
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <h3 className="text-3xl font-medium tracking-tight">AI 商业化中枢已就绪</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-google-surface border border-google-border p-8 rounded-3xl shadow-xl group hover:border-indigo-500/50 transition-all">
                  <h4 className="text-xs font-bold text-google-textMuted uppercase mb-6 tracking-widest flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-indigo-500"></span> 资产分发策略
                  </h4>
                  <ul className="space-y-4">
                     {[
                       { label: 'Vertex AI 模型出租', icon: '🔑', desc: '按 API 调用次数在 Firebase 自动扣费。' },
                       { label: '全量代码包出售', icon: '📦', desc: '支持 Lemon Squeezy 支付回调后自动分发。' },
                       { label: '开源资产管理', icon: '🌍', desc: '一键同步 GitHub 并展示在公开 Marketplace。' }
                     ].map((item, idx) => (
                       <li key={idx} className="flex gap-4 p-4 bg-google-bg/50 rounded-2xl border border-transparent hover:border-google-border transition-colors">
                          <span className="text-xl">{item.icon}</span>
                          <div>
                             <p className="text-sm font-bold">{item.label}</p>
                             <p className="text-[10px] text-google-textMuted">{item.desc}</p>
                          </div>
                       </li>
                     ))}
                  </ul>
               </div>
               <div className="bg-indigo-500/5 border border-indigo-500/20 p-8 rounded-3xl relative overflow-hidden flex flex-col justify-center">
                  <div className="absolute top-0 right-0 p-8 opacity-10 text-6xl rotate-12">🚀</div>
                  <h4 className="text-xs font-bold text-indigo-400 uppercase mb-4 tracking-widest">当前运行模式</h4>
                  <p className="text-sm text-google-textMuted leading-relaxed mb-6">
                    系统已识别到您的 **Vertex AI** 项目。现在可以开始定义您的第一个 AI 资产，并将其推送到前端展示。
                  </p>
                  <button onClick={() => setAdminTab('MARKETPLACE')} className="px-6 py-3 bg-indigo-500 text-google-bg rounded-xl font-bold text-xs uppercase tracking-widest self-start hover:scale-105 transition-transform">
                     进入资产管理
                  </button>
               </div>
            </div>
          </div>
        );

      default:
        return <div className="text-google-textMuted italic p-10">编译器节点同步中...</div>;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto studio-scroll p-8 pb-32 bg-gradient-to-b from-google-bg to-google-surface/20">
      <div className="max-w-5xl mx-auto h-full flex flex-col">
        {renderStepContent()}
      </div>
    </div>
  );
};

export default Workspace;
