// Navigation types for CivicAI application

export type ActivePage = 
  | 'landing' 
  | 'report' 
  | 'analysis' 
  | 'result' 
  | 'dashboard' 
  | 'detail' 
  | 'how-it-works';

export interface NavItem {
  id: ActivePage | 'guide';
  label: string;
  iconName: string;
  badge?: string;
  count?: number;
  isAction?: boolean;
}
