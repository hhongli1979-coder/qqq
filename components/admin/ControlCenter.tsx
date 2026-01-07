
import React from 'react';
import { ShieldCheck, CreditCard, ExternalLink, HelpCircle, AlertCircle, Hexagon, Lock, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export const ControlCenter: React.FC = () => {
  return (
    <div className="p-12 space-y-12 animate-in fade-in duration-1000">
      <header className="flex flex-col lg:flex-row justify-between items-end gap-10 border-b border-white/5 pb-12">
        <div className="max-w-2xl">
          <h2 className="text-5xl font-black italic text-white uppercase tracking-tighter mb-4 leading-none">Strategic Intelligence</h2>
          <p className="text-white/40 text-lg italic font-light leading-relaxed">
            Monitor institutional-grade infrastructure billing and neural node integrity via the moda OS Strategic Layer.
          </p>
        </div>
        <div className="flex items-center gap-4 text-luxury-gold font-mono text-[10px] uppercase tracking-[0.5em] italic">
           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
           </svg>
           Infrastructure_Monitored
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-white/[0.01] backdrop-blur-3xl border border-luxury-gold/10 rounded-[4rem] p-12 space-y-10 relative overflow-hidden group shadow-2xl hover:border-luxury-gold/30 transition-all duration-700">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:scale-110 transition-transform duration-1000 text-luxury-gold">
            <CreditCard size={180} />
          </div>
          <div className="flex items-center gap-6 mb-10 relative z-10">
            <div className="w-16 h-16 bg-luxury-gold/5 border border-luxury-gold/20 rounded-[1.5rem] flex items-center justify-center text-luxury-gold shadow-lg group-hover:bg-luxury-gold/10 transition-colors">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter">Billing Diagnostics</h3>
              <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest mt-1">Audit_Protocol: v2.4</p>
            </div>
          </div>
          <div className="space-y-8 relative z-10">
            <div className="p-10 bg-red-500/5 border border-red-500/10 rounded-[2.5rem] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 text-red-500"><AlertCircle size={64} /></div>
              <div className="flex items-center gap-4 text-red-400 text-[11px] font-black uppercase tracking-[0.3em] mb-6 italic">
                <AlertCircle size={16} /> Billing_Anomaly_Mitigation
              </div>
              <p className="text-base text-white/50 leading-relaxed italic mb-8 border-l-2 border-red-500/20 pl-6">
                Detected 50 USD / 350 CNY pending hold? This is typically a <span className="text-white font-bold italic">Verification Authorization</span>. 
                Google Cloud initiates this pulse to validate card integrity.
              </p>
              <div className="space-y-4">
                 <p className="text-[10px] font-black text-white/20 uppercase tracking-widest italic mb-2">Recommended_Actions:</p>
                 <ul className="text-[11px] text-white/40 space-y-4 italic list-none">
                   <li className="flex items-start gap-4"><div className="w-1 h-1 rounded-full bg-red-500 mt-1.5 shrink-0" /> Monitor the Billing Console for automatic reversal.</li>
                   <li className="flex items-start gap-4"><div className="w-1 h-1 rounded-full bg-red-500 mt-1.5 shrink-0" /> Verify "Free Tier" eligibility in GCP Portal.</li>
                 </ul>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <a href="https://console.cloud.google.com/billing" target="_blank" className="group/link w-full py-5 bg-white text-black rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-luxury-gold transition-all italic shadow-2xl active:scale-95">
                GCP_Billing_Portal <ExternalLink size={16} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
              </a>
              <a href="https://support.google.com/cloud/answer/6288653" target="_blank" className="w-full py-5 border border-white/10 text-white/40 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-white/5 hover:text-white transition-all italic active:scale-95">
                Request_Refund <HelpCircle size={16} />
              </a>
            </div>
          </div>
        </div>
        <div className="bg-white/[0.01] backdrop-blur-3xl border border-white/5 rounded-[4rem] p-12 flex flex-col relative overflow-hidden group shadow-2xl hover:border-luxury-gold/20 transition-all duration-700">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-luxury-gold scale-x-[-1]"><Hexagon size={180} /></div>
          <div className="flex items-center gap-6 mb-12">
            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-[1.5rem] flex items-center justify-center text-white/20 group-hover:text-luxury-gold group-hover:border-luxury-gold/40 transition-all duration-700">
               <Globe size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter italic">Infrastructure Pulse</h3>
              <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest mt-1">Status: Operational_Healthy</p>
            </div>
          </div>
          <div className="space-y-6 flex-1 relative z-10">
            {[
              { id: 'LOGIC_01', type: 'COMPUTE', region: 'us-central1', status: 'STABLE' },
              { id: 'RENDER_02', type: 'GRAPHICS', region: 'asia-east1', status: 'SYNCING' },
              { id: 'VEO_03', type: 'VIDEO_SYNTH', region: 'europe-west4', status: 'STABLE' }
            ].map((node, i) => (
              <div key={i} className="flex justify-between items-center p-8 bg-luxury-obsidian/60 border border-white/5 rounded-[2rem] group/node hover:border-luxury-gold/20 hover:bg-luxury-obsidian/80 transition-all duration-500">
                <div className="flex items-center gap-6">
                   <div className={`w-3 h-3 rounded-full ${node.status === 'STABLE' ? 'bg-luxury-gold shadow-[0_0_10px_#D4AF37]' : 'bg-luxury-goldLight animate-pulse'} transition-all`} />
                   <div>
                     <p className="text-[13px] font-black text-white/80 uppercase italic tracking-widest transition-colors group-hover/node:text-white">{node.id}</p>
                     <p className="text-[9px] font-mono text-white/20 mt-1 uppercase tracking-tighter">{node.type} /// {node.region}</p>
                   </div>
                </div>
                <span className={`text-[10px] font-black tracking-widest italic ${node.status === 'STABLE' ? 'text-luxury-gold' : 'text-white/20'}`}>
                  {node.status}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-12 p-8 bg-luxury-gold/5 border border-luxury-gold/20 rounded-[2.5rem] flex items-center justify-between group/audit cursor-pointer hover:bg-luxury-gold/10 transition-all">
             <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-luxury-gold text-luxury-obsidian flex items-center justify-center">
                   <Lock size={20} />
                </div>
                <div>
                  <p className="text-[12px] font-black text-white uppercase italic">Security_Audit_Report</p>
                  <p className="text-[9px] text-white/20 font-mono italic">GENERATED_10M_AGO</p>
                </div>
             </div>
             <motion.div whileHover={{ x: 5 }} className="text-luxury-gold">
                <ExternalLink size={18} />
             </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
