
import { GoogleGenAI } from "@google/genai";
import { WOOPStep } from "../types";
import { WOOP_INFO } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getCoachResponse(
  step: WOOPStep,
  userInput: string,
  context: string
) {
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `
      System: 你是一名顶尖的WOOP心理教练，擅长通过苏格拉底式的对话引导用户。
      
      当前教练阶段: ${step}
      用户最近输入: ${userInput}
      对话历史: ${context}
      
      核心教练准则（必须严格遵守）：
      1. **单次提问原则**：一次只问一个问题。严禁在一段回复中包含多个问句或多个任务。
      2. **先回应再启发**：必须先对用户输入的内容给予具体、温暖且积极的回应/肯定，然后再提出下一步的引导。
      3. **言简意赅**：保持回复简短（建议150字以内）。避免使用复杂的Markdown标题、长列表或学术化的长篇大论。
      4. **分步引导**：不要一次性抛出“真实性”、“精确度”和“可行性”的所有标准。根据当前用户的回答，选择当前最需要完善的一点进行追问。
      5. **引导完成标准**：
         - Wish阶段：引导用户直到愿望精炼至3-6个字且具备自主性。
         - Outcome阶段：引导用户描述出具体的感官细节（听、看、感觉）。
         - Obstacle阶段：确保用户挖掘出“内部”阻碍（如某种恐惧、旧习惯），而非推卸给外部环境。
         - Plan阶段：确保形成清晰的“如果...那么...”逻辑。
      
      阶段特定目标：${WOOP_INFO.steps[step as keyof typeof WOOP_INFO.steps]?.coachInstruction || ""}
      
      语言：始终使用温暖、专业的简体中文。
    `,
  });

  const response = await model;
  return response.text;
}

export async function generateFinalPlan(data: any) {
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `
      System: 请生成一份基于MCII理论的《WOOP 个人成长系统性行动报告》。
      输入数据:
      愿望: ${data.wish}
      结果: ${data.outcome}
      障碍: ${data.obstacle}
      计划: ${data.plan}
      
      报告要求:
      1. 标题: 必须包含“系统性研究报告”与“28天路径”字样。
      2. 心理机制分析: 简述为什么用户的“障碍”是核心突破点。
      3. 视觉化引导词: 为用户写一段100字左右的闭眼视觉化导引，融合其描述的结果。
      4. 自动化策略: 强化“If-Then”逻辑。
      5. 执行指南: 提供具体的应对策略建议。
      6. 结尾: 包含一个具有激励性的总结。
      
      语言风格: 严谨、科学、富有力量感。
      语言: 简体中文。
    `,
  });

  const response = await model;
  return response.text;
}
