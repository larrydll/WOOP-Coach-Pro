
import React, { useState, useEffect, useRef } from 'react';
import { WOOPStep, WOOPData, ChatMessage } from '../types';
import { WOOP_INFO } from '../constants';
import { getCoachResponse } from '../services/geminiService';
import { Send, Loader2, ArrowLeft, ArrowRight, User, Bot, Sparkles } from 'lucide-react';

interface CoachSessionProps {
  onFinish: (data: WOOPData) => void;
}

const CoachSession: React.FC<CoachSessionProps> = ({ onFinish }) => {
  const [currentStep, setCurrentStep] = useState<WOOPStep>(WOOPStep.WISH);
  const [data, setData] = useState<WOOPData>({ wish: '', outcome: '', obstacle: '', plan: '' });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialPrompt = WOOP_INFO.steps[currentStep as keyof typeof WOOP_INFO.steps]?.prompt;
    if (initialPrompt) {
      setMessages([{ role: 'model', text: initialPrompt }]);
    }
  }, [currentStep]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsTyping(true);

    try {
      const context = messages.map(m => `${m.role}: ${m.text}`).join('\n');
      const coachReply = await getCoachResponse(currentStep, userText, context);
      
      setMessages(prev => [...prev, { role: 'model', text: coachReply || '教练正在整理思绪，请稍等...' }]);
      
      // We store the latest version of the user's input for each phase to use in the report
      const dataKey = currentStep.toLowerCase() as keyof WOOPData;
      setData(prev => ({ ...prev, [dataKey]: userText }));
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: '抱歉，教练刚才走神了，请再试一次。' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const nextStep = () => {
    const steps = [WOOPStep.WISH, WOOPStep.OUTCOME, WOOPStep.OBSTACLE, WOOPStep.PLAN];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    } else {
      onFinish(data);
    }
  };

  const prevStep = () => {
    const steps = [WOOPStep.WISH, WOOPStep.OUTCOME, WOOPStep.OBSTACLE, WOOPStep.PLAN];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const currentStepInfo = WOOP_INFO.steps[currentStep as keyof typeof WOOP_INFO.steps];
  const progressPercent = ((Object.values(WOOPStep).indexOf(currentStep) + 1) / 5) * 100;

  // Step specific colors
  const stepColors = {
    [WOOPStep.WISH]: 'border-red-500 text-red-600',
    [WOOPStep.OUTCOME]: 'border-yellow-500 text-yellow-600',
    [WOOPStep.OBSTACLE]: 'border-blue-500 text-blue-600',
    [WOOPStep.PLAN]: 'border-emerald-500 text-emerald-600',
    [WOOPStep.SUMMARY]: 'border-indigo-500 text-indigo-600',
  };

  return (
    <div className="px-4 py-8 max-w-4xl mx-auto h-[calc(100vh-160px)] flex flex-col gap-6">
      {/* Dynamic Header */}
      <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-slate-100 relative overflow-hidden">
        <div className={`absolute left-0 top-0 h-full w-2 ${stepColors[currentStep].split(' ')[0].replace('border-', 'bg-')}`}></div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className={`text-xl md:text-2xl font-black ${stepColors[currentStep].split(' ')[1]}`}>{currentStepInfo?.title}</h2>
            <p className="text-slate-400 text-xs md:text-sm mt-1">对话式深度教练模式</p>
          </div>
          <div className="hidden md:block bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
             <span className="text-xs font-bold text-slate-400">完成度 {Math.round(progressPercent)}%</span>
          </div>
        </div>
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ease-in-out ${stepColors[currentStep].split(' ')[0].replace('border-', 'bg-')}`} 
            style={{ width: `${progressPercent}%` }} 
          />
        </div>
      </div>

      {/* Chat Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-6 pr-2 scroll-smooth"
        style={{ scrollbarWidth: 'thin' }}
      >
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-300`}>
            <div className={`max-w-[90%] md:max-w-[85%] flex gap-3 md:gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-2xl flex items-center justify-center shadow-md ${
                msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-100 text-slate-400'
              }`}>
                {msg.role === 'user' ? <User size={18} /> : <Bot size={18} className="text-indigo-600" />}
              </div>
              <div className={`p-4 md:p-5 rounded-3xl text-sm md:text-base leading-relaxed ${
                msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none shadow-indigo-100 shadow-lg' 
                : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none shadow-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start animate-in fade-in duration-300">
            <div className="bg-slate-50 border border-slate-100 p-4 md:p-5 rounded-3xl rounded-tl-none flex items-center gap-3 text-slate-400">
              <Sparkles size={16} className="animate-pulse text-indigo-400" />
              <span className="text-xs md:text-sm font-medium">教练正在倾听并思考...</span>
            </div>
          </div>
        )}
      </div>

      {/* Interaction Controls */}
      <div className="bg-white p-3 md:p-4 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-slate-100">
        {messages.length >= 2 && !isTyping && (
          <div className="flex justify-between items-center gap-2 md:gap-4 mb-4 px-2 animate-in slide-in-from-top-4">
            <button 
              onClick={prevStep}
              disabled={currentStep === WOOPStep.WISH}
              className="px-3 py-2 flex items-center gap-1 text-slate-400 hover:text-indigo-600 transition-colors disabled:opacity-0 font-bold text-xs md:text-sm"
            >
              <ArrowLeft size={14} /> 返回上一阶段
            </button>
            <button 
              onClick={nextStep}
              className="bg-slate-900 hover:bg-black text-white px-4 md:px-8 py-2 md:py-3 rounded-xl md:rounded-2xl font-black text-xs md:text-sm shadow-xl transition-all active:scale-95 flex items-center gap-1 md:gap-2"
            >
              {currentStep === WOOPStep.PLAN ? '查看最终行动方案' : '我已准备好进入下一阶段'} <ArrowRight size={16} />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input 
            type="text"
            autoFocus
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`在此处输入您的回答...`}
            className="w-full bg-slate-50 border-none rounded-2xl px-6 md:px-8 py-4 md:py-5 pr-14 md:pr-16 focus:ring-2 focus:ring-indigo-500/20 text-slate-700 transition-all placeholder:text-slate-300 font-medium text-sm md:text-base"
            disabled={isTyping}
          />
          <button 
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="absolute right-2 bg-indigo-600 text-white p-3 md:p-4 rounded-xl hover:bg-indigo-700 transition-all shadow-lg disabled:bg-slate-200 disabled:shadow-none active:scale-90"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CoachSession;
