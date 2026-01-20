
import React, { useState, useEffect } from 'react';
import { WOOPData } from '../types';
import { generateFinalPlan } from '../services/geminiService';
import { Download, Share2, Printer, ClipboardCheck, Sparkles, Calendar, Target, ShieldAlert, Zap } from 'lucide-react';

interface SummaryProps {
  data: WOOPData;
}

const Summary: React.FC<SummaryProps> = ({ data }) => {
  const [report, setReport] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await generateFinalPlan(data);
        setReport(res || '');
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReport();
  }, [data]);

  const handlePrint = () => window.print();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 animate-pulse">
        <div className="bg-indigo-100 p-6 rounded-full text-indigo-600 animate-bounce">
          <Sparkles size={48} />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">正在构建您的系统性成长报告</h2>
          <p className="text-slate-500 max-w-md mx-auto">WOOP正在将您的“积极幻想”与“现实障碍”进行对比，建立非意识层面的自动关联...</p>
        </div>
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" />
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-12 max-w-5xl mx-auto animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2 flex items-center gap-3">
            <ClipboardCheck className="text-indigo-600" /> WOOP 个人成长行动计划
          </h1>
          <p className="text-slate-500">系统性研究报告及 28 天执行日志</p>
        </div>
        <div className="flex gap-3 print:hidden">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-2.5 rounded-xl font-bold hover:bg-slate-50 transition-all active:scale-95"
          >
            <Printer size={20} /> 打印/导出 PDF
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95">
            <Share2 size={20} /> 分享计划
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Core WOOP Summary Cards */}
        {[
          { icon: <Target className="text-red-500" />, label: "W - Wish (愿望)", value: data.wish, color: "border-red-100 bg-red-50/50" },
          { icon: <Zap className="text-yellow-500" />, label: "O - Outcome (结果)", value: data.outcome, color: "border-yellow-100 bg-yellow-50/50" },
          { icon: <ShieldAlert className="text-blue-500" />, label: "O - Obstacle (障碍)", value: data.obstacle, color: "border-blue-100 bg-blue-50/50" },
          { icon: <Calendar className="text-emerald-500" />, label: "P - Plan (If-Then)", value: `如果 ${data.obstacle}，那么 ${data.plan}`, color: "border-emerald-100 bg-emerald-50/50" }
        ].map((item, i) => (
          <div key={i} className={`p-6 rounded-3xl border ${item.color} shadow-sm transition-transform hover:-translate-y-1`}>
            <div className="flex items-center gap-2 mb-3">
              {item.icon}
              <h3 className="text-xs font-black uppercase tracking-widest opacity-60">{item.label}</h3>
            </div>
            <p className="text-sm font-bold leading-relaxed text-slate-800 line-clamp-3">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Full AI Report Render */}
      <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-8 md:p-16 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Brain size={120} className="text-indigo-900" />
        </div>
        <div className="prose prose-slate max-w-none prose-headings:text-indigo-900 prose-strong:text-indigo-600 prose-table:border prose-table:border-slate-200">
          <div className="whitespace-pre-wrap leading-relaxed text-slate-700 font-serif">
            {report.split('\n').map((line, i) => {
              if (line.startsWith('# ')) return <h1 key={i} className="text-4xl font-black mt-12 mb-8 border-b-4 border-indigo-600 pb-4 inline-block">{line.slice(2)}</h1>;
              if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold mt-10 mb-6 text-indigo-800 flex items-center gap-2"><span className="w-1.5 h-6 bg-indigo-600 rounded-full inline-block"></span>{line.slice(3)}</h2>;
              if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold mt-8 mb-4">{line.slice(4)}</h3>;
              if (line.trim().startsWith('|')) {
                return (
                  <div key={i} className="overflow-x-auto my-6">
                    <pre className="font-mono text-xs bg-slate-50 p-4 border rounded-xl">{line}</pre>
                  </div>
                );
              }
              if (line.trim() === '') return <br key={i} />;
              return <p key={i} className="mb-4 text-lg text-slate-600 leading-loose">{line}</p>;
            })}
          </div>
        </div>
      </div>

      {/* Actionable Log Sheet Header */}
      <div className="text-center bg-indigo-900 text-white rounded-t-[2rem] p-10 mt-12">
        <h2 className="text-2xl font-bold mb-4">日常执行与反射日志</h2>
        <p className="opacity-70 max-w-2xl mx-auto">
          每天入睡前，请检查您的 If-Then 计划执行情况。
          如果您遇到了障碍并成功执行了计划，请标记为“✓”。
        </p>
      </div>
      <div className="bg-white border border-slate-200 border-t-0 rounded-b-[2rem] p-8 md:p-12 shadow-inner">
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 28 }).map((_, i) => (
            <div key={i} className="aspect-square border border-slate-100 rounded-lg flex flex-col items-center justify-center hover:bg-indigo-50 transition-colors cursor-pointer group">
              <span className="text-[10px] text-slate-400 group-hover:text-indigo-600 font-bold mb-1">DAY {i + 1}</span>
              <div className="w-4 h-4 rounded-sm border-2 border-slate-200 group-hover:border-indigo-300"></div>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-8 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400 font-medium">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-red-100 border border-red-200 rounded"></div> 愿望实现度</span>
            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-indigo-100 border border-indigo-200 rounded"></div> 障碍应对率</span>
          </div>
          <span>WOOP Coach Pro v1.0 - 系统生成的 28 天路径</span>
        </div>
      </div>
    </div>
  );
};

// Helper component for decoration
const Brain = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.16z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.16z" />
  </svg>
);

export default Summary;
