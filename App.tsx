
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Workspace from './components/Workspace';
import RightPanel from './components/RightPanel';
import PromptBar from './components/PromptBar';
import Hero from './components/Hero';
import Collection from './components/Collection';
import Footer from './components/Footer';
import { Message, SectionId, CompilerStatus } from './types';
import { getCompilerResponse } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'studio'>('landing');
  const [activeStep, setActiveStep] = useState<string>(SectionId.Compiler);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "moda AI 编译引擎已就绪。请描述您的应用愿景，我将引导您完成从初始化到部署的全流程。" }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<CompilerStatus>('READY');

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isProcessing) return;
    const newUserMsg: Message = { role: 'user', content };
    setMessages(prev => [...prev, newUserMsg]);
    setIsProcessing(true);
    setStatus('COMPILING');
    const aiResponse = await getCompilerResponse(messages, content);
    setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    setIsProcessing(false);
    setStatus('READY');
  };

  const startStudio = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setView('studio'), 300);
  };

  if (view === 'landing') {
    return (
      <div className="bg-google-bg text-google-text font-sans scroll-smooth">
        <div className="h-16 border-b border-google-border flex items-center justify-between px-8 bg-google-bg/80 backdrop-blur-md sticky top-0 z-50">
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded bg-google-accent flex items-center justify-center font-bold text-google-bg">m</div>
             <span className="font-medium tracking-tight">moda AI Studio</span>
           </div>
           <button onClick={startStudio} className="px-5 py-2 bg-google-accent text-google-bg rounded-full text-sm font-bold hover:scale-105 transition-all">进入编译器</button>
        </div>
        <Hero onStart={startStudio} />
        <Collection />
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-google-bg text-google-text overflow-hidden animate-in fade-in duration-700">
      <Navbar status={status} onBack={() => setView('landing')} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeStep={activeStep} onStepChange={setActiveStep} />
        <main className="flex-1 flex flex-col relative border-r border-google-border overflow-hidden">
          <Workspace activeStep={activeStep} messages={messages} isProcessing={isProcessing} />
          <PromptBar onSend={handleSendMessage} isProcessing={isProcessing} />
        </main>
        <RightPanel status={status} />
      </div>
    </div>
  );
};

export default App;
