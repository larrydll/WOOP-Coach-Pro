
import React, { useState, useEffect } from 'react';
import { WOOPStep, WOOPData, CoachState } from './types';
import { WOOP_INFO } from './constants';
import Landing from './components/Landing';
import CoachSession from './components/CoachSession';
import Summary from './components/Summary';
import { Brain, Target, ShieldAlert, Footprints, ClipboardList } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'coach' | 'summary'>('landing');
  const [woopData, setWoopData] = useState<WOOPData>({
    wish: '',
    outcome: '',
    obstacle: '',
    plan: ''
  });

  const startCoaching = () => setView('coach');
  const finishCoaching = (data: WOOPData) => {
    setWoopData(data);
    setView('summary');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('landing')}>
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <Brain size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight">WOOP Coach <span className="text-indigo-600">Pro</span></span>
        </div>
        <button 
          onClick={startCoaching}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full font-medium transition-all shadow-sm active:scale-95"
        >
          {view === 'landing' ? '开始教练之旅' : '重新开始'}
        </button>
      </nav>

      <main className="max-w-7xl mx-auto pb-20">
        {view === 'landing' && <Landing onStart={startCoaching} />}
        {view === 'coach' && <CoachSession onFinish={finishCoaching} />}
        {view === 'summary' && <Summary data={woopData} />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold mb-4">关于 WOOP</h3>
            <p className="text-sm leading-relaxed">
              基于心理对比与执行意图理论（MCII），由 Gabriele Oettingen 教授创立，是个人成长与行为改变的底层操作系统。
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">科学背书</h3>
            <ul className="text-sm space-y-2">
              <li>• 幻想实现理论</li>
              <li>• 自我调节机制</li>
              <li>• 非意识层面的自动关联</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">开发者信息</h3>
            <p className="text-sm">致力于将最前沿的心理学研究转化为实用的数字化干预工具。</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-12 pt-8 text-center text-xs">
          &copy; 2024 WOOP Coach Pro. All Rights Reserved. Based on MCII Scientific Framework.
        </div>
      </footer>
    </div>
  );
};

export default App;
