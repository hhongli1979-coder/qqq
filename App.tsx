
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Workspace from './components/Workspace';
import RightPanel from './components/RightPanel';
import PromptBar from './components/PromptBar';
import Hero from './components/Hero';
import Collection from './components/Collection';
import About from './components/About'; 
import Footer from './components/Footer';
import EngineeringCraft from './components/Craftsmanship';
import VisualPortal from './components/Sustainability';
import { Message, SectionId, CompilerStatus, User, Asset, PrivateNode } from './types';
import { getCompilerResponseStream } from './services/geminiService';
import { authService } from './services/persistenceService';

const INITIAL_NODES: PrivateNode[] = [
  { id: 'n1', name: 'Logic-Compute-01', ip: '10.0.0.101', status: 'ONLINE', load: 12, type: 'LOGIC' },
  { id: 'n2', name: 'Render-Worker-02', ip: '10.0.0.102', status: 'ONLINE', load: 45, type: 'RENDER' },
  { id: 'n3', name: 'Database-Relay-03', ip: '10.0.0.103', status: 'ONLINE', load: 5, type: 'DATA' },
  { id: 'n4', name: 'Veo-Engine-04', ip: '10.0.0.104', status: 'ONLINE', load: 0, type: 'VIDEO' },
  { id: 'n5', name: 'MCP-Gateway-05', ip: '10.0.0.105', status: 'ONLINE', load: 22, type: 'GATEWAY' }
];

const INITIAL_ASSETS: Asset[] = [
  { id: 'MODA_HANFU_V4', name: '汉服专项精调权重 (v4)', type: 'Vertex Fine-tuned', icon: '👘', status: 'PENDING', revenue: 12400, monetizationModel: 'One-time' },
  { id: 'BRAIN_KERNEL_X', name: '智算大脑核心内核', type: 'LLM Kernel', icon: '🧠', status: 'ACTIVE', revenue: 85000, monetizationModel: 'Subscription' },
  { id: 'VEO_4K_RENDERER', name: 'Veo 4K 商业渲染器', type: 'Video Generator', icon: '🎬', status: 'ACTIVE', revenue: 32000, monetizationModel: 'Subscription' },
  { id: 'MODA_COMP_BENTO', name: 'Bento UI 自动生成组件', type: 'Component', icon: '🍱', status: 'ACTIVE', revenue: 5600, monetizationModel: 'One-time' },
  { id: 'MODA_AR_MODULE', name: 'AR 实时试衣引擎', type: 'Extension', icon: '✨', status: 'PENDING', revenue: 0, monetizationModel: 'Subscription' }
];

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'studio'>('landing');
  const [activeStep, setActiveStep] = useState<string>(SectionId.Home);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "系统就绪。moda AI 私有化 Studio 已建立安全连接。当前内网 5 个算力节点状态健康。" }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<CompilerStatus>('READY');
  const [user, setUser] = useState<User | null>(null);
  
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);
  const [nodes, setNodes] = useState<PrivateNode[]>(INITIAL_NODES);

  useEffect(() => {
    const timer = setInterval(() => {
      setNodes(prev => prev.map(node => ({
        ...node,
        load: node.status === 'ONLINE' ? Math.min(100, Math.max(5, node.load + (Math.random() * 10 - 5))) : 0
      })));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((localUser) => {
      setUser(localUser);
    });
    return () => unsubscribe();
  }, []);

  const handleUpdateAsset = (id: string, updates: Partial<Asset>) => {
    setAssets(prev => prev.map(asset => asset.id === id ? { ...asset, ...updates } : asset));
  };

  const handleNodeControl = (id: string, action: 'RESTART' | 'TOGGLE') => {
    setNodes(prev => prev.map(n => {
      if (n.id === id) {
        if (action === 'TOGGLE') return { ...n, status: n.status === 'ONLINE' ? 'OFFLINE' : 'ONLINE' };
        if (action === 'RESTART') return { ...n, status: 'BUSY', load: 0 };
      }
      return n;
    }));
    if (action === 'RESTART') {
      setTimeout(() => {
        setNodes(prev => prev.map(n => n.id === id ? { ...n, status: 'ONLINE', load: 10 } : n));
      }, 2500);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isProcessing) return;
    if (activeStep !== SectionId.Compiler) setActiveStep(SectionId.Compiler);
    
    const newUserMsg: Message = { role: 'user', content };
    setMessages(prev => [...prev, newUserMsg]);
    setIsProcessing(true);
    setStatus('COMPILING');

    try {
      await getCompilerResponseStream([...messages, newUserMsg], content, [], (text) => {
        setMessages(prev => {
          const newMsgs = [...prev];
          const last = newMsgs[newMsgs.length - 1];
          if (last?.role === 'assistant') {
            last.content = text;
            return [...newMsgs];
          } else {
            return [...newMsgs, { role: 'assistant', content: text }];
          }
        });
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
      setStatus('READY');
    }
  };

  if (view === 'landing') {
    return (
      <div className="bg-google-bg text-google-text font-sans h-screen overflow-y-auto studio-scroll">
        <Navbar status={status} onBack={() => {}} user={user} onLogin={authService.signIn} onLogout={authService.signOut} />
        <Hero onStart={() => setView('studio')} />
        <Collection />
        <About />
        <EngineeringCraft />
        <VisualPortal />
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-google-bg text-google-text overflow-hidden">
      <Navbar status={status} onBack={() => setView('landing')} user={user} onLogin={authService.signIn} onLogout={authService.signOut} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeStep={activeStep} onStepChange={setActiveStep} isAuthenticated={!!user} />
        <main className="flex-1 flex flex-col relative border-r border-google-border overflow-hidden bg-[#0b0c0d]">
          <Workspace 
            activeStep={activeStep} 
            messages={messages} 
            isProcessing={isProcessing} 
            assets={assets}
            onUpdateAsset={handleUpdateAsset}
            nodes={nodes}
            onNodeControl={handleNodeControl}
            onSendMessage={handleSendMessage}
          />
          {activeStep !== SectionId.Compiler && <PromptBar onSend={handleSendMessage} isProcessing={isProcessing} />}
        </main>
        <RightPanel status={status} nodes={nodes} />
      </div>
    </div>
  );
};

export default App;
