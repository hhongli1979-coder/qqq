
export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  username?: string;
}

export type CompilerStatus = 'IDLE' | 'CONFIGURING' | 'COMPILING' | 'DEPLOYING' | 'READY' | 'SYNCING';

export enum SectionId {
  Home = '01',
  CloudSync = '02',
  Compiler = '03',
  ExtensionGen = '04',
  Automation = '05',
  VisualPortal = '06',
  Feedback = '07',
  Admin = '12',
  Sectors = 'sectors',
  Workflow = 'workflow',
  Craftsmanship = 'craftsmanship',
  Editor = 'editor'
}

export interface PrivateNode {
  id: string;
  name: string;
  ip: string;
  status: 'ONLINE' | 'OFFLINE' | 'BUSY' | 'ERROR';
  load: number;
  type: 'LOGIC' | 'RENDER' | 'DATA' | 'VIDEO' | 'GATEWAY';
}

export interface Asset {
  id: string;
  name: string;
  type: string;
  status: 'ACTIVE' | 'PENDING' | 'ARCHIVED';
  revenue: number;
  monetizationModel: 'Subscription' | 'One-time' | 'Ads' | 'Free';
  icon: string;
}

export interface MemoryNode {
  id: string;
  title: string;
  content: string;
  category: 'PREFERENCE' | 'ARCHITECTURE' | 'LOGIC';
  timestamp: string;
}
