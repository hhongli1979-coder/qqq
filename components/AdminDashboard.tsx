
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, Zap, Bell, Search, 
  ChevronDown, Hexagon, Component, Globe, Cpu, Server, Shield, Network, Link2, 
  Database, Activity, Lock, Layers, Download, ExternalLink, Rocket
} from 'lucide-react';
import { PrivateNode } from '../types';
import { APIGateway } from './APIGateway';
import { ControlCenter } from './admin/ControlCenter';

interface AdminDashboardProps {
  nodes: PrivateNode[];
}

const AI_LOGS = [
  { time: '10:42:01', event: 'Neural Synth active on Node-04' },
  { time: '10:41:55', event: 'Gateway encryption handshake complete' },
  { time: '10:40:22', event: 'Global routing table updated: 5 points' },
];

const StatCard = ({ title, value, change, trend }: { title: string, value: string, change: string, trend: 'up' | 'down' }) => (
  <div className="bg-white/[0.02] backdrop-blur-3xl border border-luxury-gold/10 p-8 rounded-[2.5rem] flex flex-col justify-between h-44 hover:border-luxury-gold/40 transition-all duration-700 group relative overflow-hidden shadow-2xl">
    <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 group-hover:scale-110 transition-all duration-700 text-luxury-gold">
      <Hexagon size={64} />
    </div>
    <div className="flex justify-between items-start relative z-10">
      <span className="text-luxury-gold/60 text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">{title}</span>
      <span className={`text-[10px] font-black px-4 py-1.5 rounded-full flex items-center gap-2 italic transition-colors ${trend === 'up' ? 'bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
        {change} <ArrowUpRight size={14} className={trend === 'down' ? 'rotate-90' : ''} />
      </span>
    </div>
    <div className="text-6xl font-black italic tracking-tighter text-white group-hover:text-luxury-gold transition-colors duration-500 origin-left relative z-10">{value}</div>
  </div>
);

const AdminDashboard: React.FC<AdminDashboardProps> = ({ nodes }) => {
  const [tab, setTab] = useState<'OVERVIEW' | 'GATEWAY' | 'STRATEGIC_CONTROL' | 'EXTERNAL_API'>('OVERVIEW');
  const onlineCount = nodes.filter(n => n.status === 'ONLINE').length;

  return (
    <div className="p-12 h-full overflow-y-auto no-scrollbar bg-luxury-obsidian animate-in fade-in duration-1000 relative">
      <div className="absolute top-0 left-0 w-full h-[600px] bg-luxury-gold/[0.02] blur-[180px] rounded-full pointer-events-none" />
      
      {/* Header View */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-20 relative z-10">
        <div className="flex items-center gap-10">
          <div>
            <h1 className="text-5xl font-black italic tracking-tighter text-white uppercase leading-none mb-4">Command Center</h1>
            <p className="text-[11px] font-mono text-luxury-gold/50 uppercase tracking-[0.6em] italic leading-none">Root_Infrastructure_Control</p>
          </div>
          <div className="h-16 w-px bg-white/5 hidden xl:block"></div>
          <div className="hidden xl:flex items-center gap-10">
            {['OVERVIEW', 'GATEWAY', 'STRATEGIC_CONTROL', 'EXTERNAL_API'].map((t) => (
              <button 
                key={t}
                onClick={() => setTab(t as any)} 
                className={`text-[11px] font-black uppercase tracking-[0.4em] italic transition-all relative py-3 group ${tab === t ? 'text-luxury-gold' : 'text-white/40 hover:text-white/80'}`}
              >
                {t.replace('_', ' ')}
                {tab === t && (
                  <motion.div 
                    layoutId="activeTabAdmin"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-luxury-gold shadow-[0_0_15px_#D4AF37]" 
                  />
                )}
                <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-luxury-gold opacity-0 group-hover:opacity-100 transition-opacity ${tab === t ? 'opacity-100' : ''}`} />
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 px-6 py-3 bg-luxury-gold/5 border border-luxury-gold/20 rounded-2xl shadow-xl">
            <Lock size={16} className="text-luxury-gold" />
            <span className="text-[10px] font-black text-luxury-gold uppercase tracking-widest italic">Encrypted Session: Active</span>
          </div>
          <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white/40 hover:text-luxury-gold hover:border-luxury-gold transition-all active:scale-95 interactive">
            <Bell size={20} />
          </button>
        </div>
      </header>

      {tab === 'OVERVIEW' && (
        <div className="space-y-12 relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <StatCard title="Total Liquidity" value="$128.4K" change="+12.5%" trend="up" />
            <StatCard title="Active Sockets" value="2,845" change="+34.2%" trend="up" />
            <StatCard title="Throughput Index" value="3.2%" change="-0.4%" trend="down" />
            <StatCard title="Cluster Status" value={`${onlineCount}/${nodes.length}`} change="Stable" trend="up" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* System Breakdown Chart */}
            <div className="lg:col-span-2 bg-white/[0.01] backdrop-blur-3xl border border-white/5 rounded-[4rem] p-12 shadow-2xl relative overflow-hidden group">
              <div className="flex justify-between items-center mb-12 relative z-10">
                <div className="flex items-center gap-4">
                  <Layers size={18} className="text-luxury-gold animate-pulse" />
                  <h3 className="text-[11px] font-black italic text-white/60 uppercase tracking-[0.5em]">Project Portability & Health</h3>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-10 h-64 items-center">
                 <div className="flex flex-col gap-6">
                    <div className="p-6 bg-luxury-gold/5 border border-luxury-gold/20 rounded-[2rem] flex items-center justify-between group/export cursor-pointer">
                       <div className="flex items-center gap-4">
                          <Download size={20} className="text-luxury-gold" />
                          <div>
                            <p className="text-[12px] font-black text-white uppercase italic">Bundle Artifacts</p>
                            <p className="text-[9px] text-white/20 font-mono italic">Ready_for_Local_Sync</p>
                          </div>
                       </div>
                       <ArrowUpRight size={16} className="text-luxury-gold opacity-0 group-hover/export:opacity-100 group-hover/export:translate-x-1 group-hover/export:-translate-y-1 transition-all" />
                    </div>

                    <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] flex items-center justify-between group/vce cursor-pointer">
                       <div className="flex items-center gap-4">
                          <Rocket size={20} className="text-white/20 group-hover/vce:text-luxury-gold transition-colors" />
                          <div>
                            <p className="text-[12px] font-black text-white/40 uppercase italic group-hover/vce:text-white transition-colors">Vercel Auto-Push</p>
                            <p className="text-[9px] text-white/10 font-mono italic uppercase">Uplink_Disconnected</p>
                          </div>
                       </div>
                       <ExternalLink size={16} className="text-white/10" />
                    </div>
                 </div>

                 <div className="flex flex-col items-center justify-center border-l border-white/5 gap-4">
                    <div className="text-4xl font-black italic text-white leading-none">100%</div>
                    <p className="text-[9px] font-mono text-luxury-gold/40 uppercase tracking-[0.4em] italic text-center px-4">Ownership_Index: Guaranteed</p>
                    <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden mt-2">
                       <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} className="h-full bg-luxury-gold" />
                    </div>
                 </div>
              </div>
            </div>

            <div className="bg-white/[0.01] backdrop-blur-3xl border border-white/5 rounded-[4rem] p-12 flex flex-col shadow-2xl relative overflow-hidden group">
              <div className="flex items-center gap-4 mb-10 text-luxury-gold">
                <Database size={20} /><h3 className="text-[11px] font-black italic text-white/60 uppercase tracking-[0.5em]">Real-time Kernel Bus</h3>
              </div>
              <div className="flex-1 bg-luxury-obsidian/60 rounded-[3rem] border border-white/5 p-8 font-mono text-[11px] text-luxury-gold/50 overflow-hidden relative shadow-inner studio-scroll overflow-y-auto">
                <div className="space-y-6">
                  {AI_LOGS.map((log, i) => (
                    <div key={i} className="flex gap-5 group/log transition-colors hover:text-luxury-gold">
                      <span className="text-white/20 shrink-0">[{log.time}]</span>
                      <span className={i === 0 ? 'text-luxury-gold animate-pulse' : 'text-white/40'}>{log.event}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other tabs remain the same ... */}
      {tab === 'GATEWAY' && <div className="p-10 text-white/20 italic uppercase tracking-widest text-center">Handshaking Gateway...</div>}
      {tab === 'STRATEGIC_CONTROL' && <ControlCenter />}
      {tab === 'EXTERNAL_API' && <APIGateway />}
    </div>
  );
};

// Fix: Add missing default export
export default AdminDashboard;
