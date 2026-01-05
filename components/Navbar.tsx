
import React from 'react';
import { CompilerStatus, User } from '../types';

interface NavbarProps {
  status: CompilerStatus;
  onBack: () => void;
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ status, onBack, user, onLogin, onLogout }) => {
  const isBrainActive = status === 'COMPILING' || status === 'READY' || status === 'SYNCING';

  return (
    <header className="h-16 border-b border-google-border flex items-center justify-between px-4 bg-google-bg z-20">
      <div className="flex items-center gap-6">
        <button onClick={onBack} className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded bg-google-success flex items-center justify-center shadow-[0_0_15px_rgba(129,201,149,0.3)]">
            <span className="text-google-bg font-bold text-lg group-hover:scale-90 transition-transform">m</span>
          </div>
          <span className="text-lg font-medium group-hover:text-google-success transition-colors tracking-tighter">
            moda <span className="text-google-textMuted font-normal">Private Studio</span>
          </span>
        </button>
        
        <div className="h-6 w-[1px] bg-google-border mx-2"></div>
        
        <div className="flex items-center gap-3 px-3 py-1.5 rounded-md bg-google-surface border border-google-border text-[10px] font-mono">
          <span className="text-google-textMuted uppercase">Cluster:</span>
          <span className="text-google-success flex items-center gap-2 font-bold">
            INTERNAL_SERVER_5X
            <div className={`w-1.5 h-1.5 rounded-full ${isBrainActive ? 'bg-google-success animate-pulse' : 'bg-red-500'}`}></div>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className={`flex items-center gap-2 px-3 py-1 border rounded-full transition-all ${
          status === 'COMPILING' ? 'bg-google-accent/10 border-google-accent/20' : 'bg-google-success/10 border-google-success/20'
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${
            status === 'COMPILING' ? 'bg-google-accent animate-pulse' : 'bg-google-success'
          }`}></div>
          <span className={`text-[9px] font-black uppercase tracking-widest ${
            status === 'COMPILING' ? 'text-google-accent' : 'text-google-success'
          }`}>
            {status === 'COMPILING' ? 'Node Computing...' : 'Intranet Healthy'}
          </span>
        </div>
        
        <button className="px-5 py-2 bg-google-success text-google-bg rounded-md text-sm font-bold hover:opacity-80 transition-all shadow-[0_0_20px_rgba(129,201,149,0.2)]">
          私有化分发
        </button>
        
        <div className="h-8 w-[1px] bg-google-border mx-2"></div>

        {user ? (
          <div className="flex items-center gap-3 pl-2">
            <div className="flex flex-col items-end hidden md:flex">
              <span className="text-[10px] font-bold text-google-text leading-none">{user.displayName}</span>
              <span className="text-[9px] text-google-textMuted leading-none mt-1">ROOT_ADMIN</span>
            </div>
            <button 
              onClick={onLogout}
              className="w-8 h-8 rounded-full border border-google-border overflow-hidden group relative"
            >
              <img src={user.photoURL || ''} alt="User" className="w-full h-full object-cover group-hover:opacity-40 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-bold bg-black/40">退出</div>
            </button>
          </div>
        ) : (
          <button 
            onClick={onLogin}
            className="flex items-center gap-2 px-4 py-2 bg-google-surface border border-google-border rounded-lg text-xs font-bold hover:border-google-success transition-colors"
          >
            <span>🔑</span>
            <span>系统登入</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
