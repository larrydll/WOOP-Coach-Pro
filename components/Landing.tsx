
import React from 'react';
import { WOOP_INFO } from '../constants';
import { CheckCircle2, ArrowRight, Zap, Target, Shield, Layout, BookOpen, BarChart3, Users, HeartPulse } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  const scrollToTheory = () => {
    const element = document.getElementById('theory');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="px-6 py-20 lg:py-32 text-center max-w-4xl mx-auto">
        <span className="inline-block bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
          科学验证的个人成长模型
        </span>
        <h1 className="text-5xl lg:text-6xl font-extrabold mb-8 leading-tight tracking-tight text-slate-900">
          从积极幻想向现实约束的转变
        </h1>
        <p className="text-xl text-slate-600 mb-10 leading-relaxed">
          {WOOP_INFO.description} 拒绝“乐观主义崇拜”，通过识别内部障碍并预设应对方案，将意志力转化为自动化的行为反应。
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onStart}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-lg hover:shadow-indigo-200/50 flex items-center justify-center gap-2 active:scale-95"
          >
            开启您的 WOOP 练习 <ArrowRight size={20} />
          </button>
          <button 
            onClick={scrollToTheory}
            className="w-full sm:w-auto text-slate-500 hover:text-indigo-600 font-medium px-8 py-4 flex items-center justify-center gap-2 transition-colors"
          >
            <BookOpen size={20} /> 了解科学原理
          </button>
        </div>
      </section>

      {/* WOOP Steps Visualization */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-slate-800">WOOP 四大核心阶段</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Target className="text-red-500" />, step: "W", label: "Wish (愿望)", desc: "定义一个具挑战性且可实现的愿望，精炼至3-6个词。" },
              { icon: <Zap className="text-yellow-500" />, step: "O", label: "Outcome (结果)", desc: "全感官沉浸于成功的喜悦，建立情感上的深度连接。" },
              { icon: <Shield className="text-blue-500" />, step: "O", label: "Obstacle (障碍)", desc: "直面内心深处的阴影与习惯，诚实识别内部阻碍。" },
              { icon: <Layout className="text-green-500" />, step: "P", label: "Plan (计划)", desc: "构建“If-Then”逻辑，将应对方案转化为潜意识反应。" }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-3xl border border-slate-100 bg-slate-50 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
                <div className="mb-6 bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div className="text-xs font-bold text-indigo-600 mb-2 tracking-widest uppercase">阶段 0{i+1}</div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">{item.label}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Theory & Article Content Section */}
      <section id="theory" className="px-6 py-24 bg-slate-50 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-4xl font-bold mb-8 text-slate-900 leading-tight">基于心理对比与执行意图理论 (MCII)</h2>
              <p className="text-slate-600 mb-8 leading-loose text-lg">
                加布里埃尔·厄廷根教授的研究表明，单纯的积极幻想不仅不能提升达成目标的概率，反而可能起到一种“镇静剂”的作用，削弱了现实中克服困难所需的能量。
              </p>
              <div className="space-y-8">
                {[
                  { 
                    icon: <BarChart3 className="text-indigo-600" />,
                    title: "非意识层面的自动关联", 
                    content: "通过在大脑中建立“障碍→应对行动”的联结，个体不再需要反复进行内心博弈，极大地节省了意志力资源。" 
                  },
                  { 
                    icon: <Users className="text-emerald-600" />,
                    title: "弥合意向-行为差距", 
                    content: "WOOP将未来的愿望与现实的障碍进行心理对比，将有限的认知资源转化为自动化的行为反应。" 
                  },
                  { 
                    icon: <HeartPulse className="text-rose-600" />,
                    title: "自主性驱动", 
                    content: "当愿望源于个体的内在价值而非外部压力时，产生的执行力更为持久且具备极强的韧性。" 
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="flex-shrink-0 bg-white p-3 rounded-xl shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold mb-2 text-slate-800 text-xl">{item.title}</h4>
                      <p className="text-slate-500 leading-relaxed">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="sticky top-28 space-y-8">
              <div className="bg-white p-8 rounded-[2rem] shadow-2xl border border-slate-100">
                <h3 className="font-bold mb-6 text-indigo-900 border-b border-slate-50 pb-4 text-xl">传统模型与 WOOP 的差异</h3>
                <div className="space-y-5 text-sm">
                  <div className="grid grid-cols-2 gap-4 pb-3 border-b border-slate-50 font-semibold text-slate-400">
                    <span>对比维度</span>
                    <span>WOOP 教练模型</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <span className="font-medium text-slate-500">对障碍的处理</span>
                    <span className="text-indigo-600 font-bold">主动挖掘内部阻碍</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <span className="font-medium text-slate-500">对未来的处理</span>
                    <span className="text-slate-700">全感官视觉化与结果对比</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <span className="font-medium text-slate-500">核心机制</span>
                    <span className="text-slate-700">If-Then 执行意图</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <span className="font-medium text-slate-500">适用范围</span>
                    <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-[10px] font-bold inline-block w-fit">复杂决策、习惯改变</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-indigo-900 text-white p-8 rounded-[2rem] shadow-xl">
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="text-indigo-400" /> 20年实证研究支撑
                </h4>
                <p className="text-indigo-200 text-sm leading-relaxed mb-6">
                  WOOP 模型的有效性已在住院医师、学生群体、亚健康人群及职场人士等多个领域得到量化验证。
                </p>
                <button 
                  onClick={onStart}
                  className="w-full bg-white text-indigo-900 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors"
                >
                  立即体验科学成长
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Summary */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 text-slate-800">显著的干预成效</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-8 bg-indigo-50 rounded-[2rem] border border-indigo-100">
              <div className="text-4xl font-black text-indigo-600 mb-2">+60%</div>
              <div className="text-xs text-indigo-800 uppercase font-bold tracking-widest">学业表现提升</div>
            </div>
            <div className="p-8 bg-emerald-50 rounded-[2rem] border border-emerald-100">
              <div className="text-4xl font-black text-emerald-600 mb-2">3倍</div>
              <div className="text-xs text-emerald-800 uppercase font-bold tracking-widest">学习管理效率</div>
            </div>
            <div className="p-8 bg-orange-50 rounded-[2rem] border border-orange-100">
              <div className="text-4xl font-black text-orange-600 mb-2">100%</div>
              <div className="text-xs text-orange-800 uppercase font-bold tracking-widest">身体活动增加</div>
            </div>
            <div className="p-8 bg-purple-50 rounded-[2rem] border border-purple-100">
              <div className="text-4xl font-black text-purple-600 mb-2">-20%</div>
              <div className="text-xs text-purple-800 uppercase font-bold tracking-widest">任务启动拖延</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
