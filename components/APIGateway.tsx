
import React, { useState } from 'react';
import { 
  Server, Link, Activity, ShieldCheck, 
  RefreshCw, Plus, Save, Terminal, Globe, Factory,
  ChevronDown
} from 'lucide-react';
import { Vendor } from '../types';

const INITIAL_VENDORS: Vendor[] = [
  {
    id: 'v1', name: 'Primary Image Gen', type: 'AI_MODEL', provider: 'Midjourney V6',
    status: 'active', latency: 450, apiKey: 'sk-proj-****************', 
    endpoint: 'https://api.midjourney.com/v1/imagine', costPerUnit: '$0.04/img'
  },
  {
    id: 'v2', name: 'Backup Image Gen', type: 'AI_MODEL', provider: 'Stable Diffusion XL',
    status: 'active', latency: 120, apiKey: 'sk-sd-******************', 
    endpoint: 'https://api.stability.ai/v1/generation', costPerUnit: '$0.01/img'
  },
  {
    id: 'v3', name: 'CN Textile Factory A', type: 'FACTORY', provider: 'Smart Supply Chain',
    status: 'active', latency: 800, apiKey: 'key_factory_a_8823', 
    endpoint: 'https://api.smart-factory.cn/orders', costPerUnit: 'Variable'
  },
  {
    id: 'v4', name: 'US Dropship Partner', type: 'FACTORY', provider: 'Printful',
    status: 'error', latency: 0, apiKey: 'pf_live_****************', 
    endpoint: 'https://api.printful.com/orders', costPerUnit: 'Variable'
  }
];

const ConnectionTerminal = ({ logs }: { logs: string[] }) => (
  <div className="bg-luxury-obsidian/80 backdrop-blur-md border border-white/5 rounded-[2rem] p-8 font-mono text-[11px] h-56 overflow-y-auto flex flex-col-reverse shadow-inner studio-scroll no-scrollbar">
    {logs.map((log, i) => (
      <div key={i} className="mb-3 break-all flex gap-4 group transition-colors hover:text-luxury-gold">
        <span className="text-white/10 shrink-0">[{new Date().toLocaleTimeString('en-GB', { hour12: false })}]</span>
        <span className={log.includes('ERROR') ? 'text-red-400' : 'text-luxury-gold/80'}>{log}</span>
      </div>
    ))}
    <div className="text-white/10 mb-4 uppercase tracking-[0.4em] italic font-black text-[9px]">--- Neural Uplink Protocol Active ---</div>
  </div>
);

export const APIGateway: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>(INITIAL_VENDORS);
  const [selectedId, setSelectedId] = useState<string>(INITIAL_VENDORS[0].id);
  const [logs, setLogs] = useState<string[]>(['System Protocol Initialized. Handshake secure.']);
  const [isTesting, setTesting] = useState(false);

  const activeVendor = vendors.find(v => v.id === selectedId) || vendors[0];

  const handleTestConnection = () => {
    setTesting(true);
    addLog(`Pinging Node: ${activeVendor.endpoint}...`);
    
    setTimeout(() => {
      const isSuccess = activeVendor.status !== 'error';
      if (isSuccess) {
        addLog(`Response: 200 OK | Latency: ${activeVendor.latency}ms`);
        addLog(`Auth: HMAC-SHA256 Token Validated`);
      } else {
        addLog(`ERROR: 503 SERVICE_UNAVAILABLE_GATEWAY_TIMEOUT`);
      }
      setTesting(false);
    }, 1200);
  };

  const addLog = (msg: string) => setLogs(prev => [msg, ...prev]);

  return (
    <div className="flex flex-col lg:flex-row gap-12 h-full animate-in fade-in duration-1000">
      {/* Left Column: Vendor List */}
      <div className="lg:w-1/3 flex flex-col gap-8">
        <div className="space-y-4">
          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.6em] mb-6 italic ml-6">Active_Vendor_Stack</p>
          {vendors.map(vendor => (
            <button 
              key={vendor.id}
              onClick={() => setSelectedId(vendor.id)}
              className={`w-full text-left p-8 rounded-[3.5rem] border transition-all duration-700 relative overflow-hidden group
                ${selectedId === vendor.id 
                  ? 'bg-luxury-gold/5 border-luxury-gold/40 shadow-[0_40px_80px_rgba(212,175,55,0.1)] scale-[1.02]' 
                  : 'bg-white/[0.01] border-white/5 hover:border-luxury-gold/20'}
              `}
            >
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-all ${vendor.status === 'active' ? 'bg-luxury-gold' : 'bg-red-500'} ${selectedId === vendor.id ? 'opacity-100' : 'opacity-20'}`} />
              
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-black italic text-white uppercase tracking-tighter group-hover:text-luxury-gold transition-colors">{vendor.name}</span>
                <span className="text-[9px] font-black px-3 py-1 rounded-full bg-black/60 border border-white/10 text-white/20 uppercase italic tracking-widest group-hover:text-white/40 transition-colors">
                  {vendor.type}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-white/10 uppercase italic tracking-[0.2em] group-hover:text-white/20 transition-colors">{vendor.provider}</span>
                <div className={`flex items-center gap-3 text-[10px] font-mono ${vendor.status === 'active' ? 'text-luxury-gold/40' : 'text-red-400/40'}`}>
                  <Activity size={12} className={vendor.status === 'active' ? 'animate-pulse' : ''} /> {vendor.latency}ms
                </div>
              </div>
            </button>
          ))}
          
          <button className="w-full py-8 border border-dashed border-white/5 rounded-[3.5rem] text-white/10 text-[10px] font-black uppercase tracking-[0.5em] hover:text-luxury-gold hover:border-luxury-gold/40 transition-all flex items-center justify-center gap-4 italic active:scale-95">
            <Plus size={18} /> Integrate_Asset_Stream
          </button>
        </div>
      </div>

      {/* Right Column: Configuration Console */}
      <div className="flex-1 flex flex-col bg-white/[0.01] backdrop-blur-3xl border border-white/5 rounded-[4rem] p-16 shadow-2xl relative overflow-hidden group/console">
        <div className="absolute top-0 right-0 p-16 opacity-[0.02] pointer-events-none text-luxury-gold group-hover/console:scale-105 transition-transform duration-1000">
          <Globe size={280} />
        </div>

        <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-10 mb-16 border-b border-white/5 pb-12 relative z-10">
          <div className="flex items-center gap-8">
            <div className="w-20 h-20 bg-luxury-gold/5 rounded-[2rem] flex items-center justify-center border border-luxury-gold/30 text-luxury-gold shadow-[0_0_50px_rgba(212,175,55,0.1)] group-hover/console:bg-luxury-gold/10 transition-colors duration-700">
              {activeVendor.type === 'FACTORY' ? <Factory size={36} /> : <Globe size={36} />}
            </div>
            <div>
              <h2 className="text-4xl font-black italic text-white tracking-tighter uppercase leading-none mb-4">{activeVendor.name}</h2>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black bg-luxury-gold text-luxury-obsidian px-4 py-1.5 rounded-full uppercase italic tracking-widest shadow-lg">PRODUCTION_NODE</span>
                <span className="text-[11px] font-mono text-white/20 truncate max-w-sm italic">EP: {activeVendor.endpoint}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 w-full xl:w-auto">
             <button 
               onClick={handleTestConnection}
               disabled={isTesting}
               className="flex-1 xl:flex-none px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[11px] font-black text-white/40 hover:text-white uppercase tracking-widest transition-all flex items-center justify-center gap-4 italic active:scale-95"
             >
               {isTesting ? <RefreshCw className="animate-spin text-luxury-gold" size={16} /> : <Link size={16} />}
               Test_Uplink
             </button>
             <button className="flex-1 xl:flex-none px-10 py-4 bg-white text-black rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-luxury-gold transition-all flex items-center justify-center gap-4 italic active:scale-95 shadow-2xl">
               <Save size={16} /> Commit_Node_Changes
             </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 relative z-10">
          <div className="space-y-10">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.6em] italic block ml-4">API_Endpoint_Uplink</label>
              <input 
                type="text" 
                defaultValue={activeVendor.endpoint} 
                className="w-full bg-luxury-obsidian/60 border border-white/5 rounded-3xl p-6 text-sm text-luxury-gold font-mono focus:outline-none focus:border-luxury-gold/40 transition-all shadow-inner italic"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.6em] italic block ml-4">Neural_Security_Secret</label>
              <div className="relative">
                <input 
                  type="password" 
                  defaultValue={activeVendor.apiKey} 
                  className="w-full bg-luxury-obsidian/60 border border-white/5 rounded-3xl p-6 text-sm text-white/40 font-mono focus:outline-none focus:border-luxury-gold/40 transition-all shadow-inner italic"
                />
                <ShieldCheck className="absolute right-6 top-1/2 -translate-y-1/2 text-luxury-gold/30" size={20} />
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.6em] italic block ml-4">Inference_Quota (Monthly)</label>
              <input 
                type="text" 
                defaultValue="$1,200.00 / CYCLE" 
                className="w-full bg-luxury-obsidian/60 border border-white/5 rounded-3xl p-6 text-sm text-white/40 font-mono focus:outline-none focus:border-luxury-gold/40 transition-all shadow-inner italic"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.6em] italic block ml-4">Failover_Redundancy_Strategy</label>
              <div className="relative group/select">
                <select className="w-full bg-luxury-obsidian/60 border border-white/5 rounded-3xl p-6 text-sm text-white/60 focus:outline-none focus:border-luxury-gold/40 transition-all shadow-inner appearance-none uppercase tracking-[0.2em] italic font-black cursor-pointer">
                  <option>Neural_Reroute_Fallback</option>
                  <option>Cluster_Priority_Buffer</option>
                  <option>Packet_Queue_Isolation</option>
                </select>
                <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none group-hover/select:text-luxury-gold transition-colors" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <Terminal size={16} className="text-luxury-gold" />
            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.6em] italic">Telemetry_Protocol_Stream</span>
          </div>
          <ConnectionTerminal logs={logs} />
        </div>
      </div>
    </div>
  );
};
