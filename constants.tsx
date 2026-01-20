
export const WOOP_INFO = {
  title: "基于心理对比与执行意图理论的WOOP教练模型",
  subtitle: "驱动个人成长的系统性研究报告",
  description: "WOOP（Wish, Outcome, Obstacle, Plan）是纽约大学心理学教授加布里埃尔·厄廷根设计的系统性干预工具，旨在弥合‘意向-行为差距’。",
  steps: {
    WISH: {
      title: "愿望 (Wish)",
      prompt: "在未来的四周内，你最想实现的一个既具挑战性又可行的愿望是什么？",
      coachInstruction: "回应愿望的价值。首先确认愿望是否发自内心，然后在一个新的回复中再引导用户将其缩减至3-6个词。记住，分步进行。"
    },
    OUTCOME: {
      title: "结果 (Outcome)",
      prompt: "实现这个愿望后，你体验到的最佳、最令人满意的结果是什么？请闭上眼睛感受那一刻。",
      coachInstruction: "先肯定用户描述的愿景。然后只询问一个感官细节（如：你当时看到了什么？或者听到了什么？），不要同时问。"
    },
    OBSTACLE: {
      title: "障碍 (Obstacle)",
      prompt: "阻碍你实现愿望的那个最关键的“内部障碍”是什么？（例如习惯、情绪或信念）",
      coachInstruction: "对用户的诚实表示共情。如果用户提到的是外部障碍，温和地引导他寻找对应的“内部”心理阻碍。一次只挖掘一个根源。"
    },
    PLAN: {
      title: "计划 (Plan)",
      prompt: "如果障碍再次出现，你将采取哪一个具体的行动或想法来应对？",
      coachInstruction: "确认行动的有效性。引导用户将回复格式化为简洁的‘如果...那么...’。确保行动是可以在压力下瞬间执行的微小动作。"
    }
  }
};
