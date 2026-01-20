
export enum WOOPStep {
  WISH = 'WISH',
  OUTCOME = 'OUTCOME',
  OBSTACLE = 'OBSTACLE',
  PLAN = 'PLAN',
  SUMMARY = 'SUMMARY'
}

export interface WOOPData {
  wish: string;
  outcome: string;
  obstacle: string;
  plan: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface CoachState {
  currentStep: WOOPStep;
  data: WOOPData;
  isProcessing: boolean;
  history: ChatMessage[];
}
