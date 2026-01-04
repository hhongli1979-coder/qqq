
export interface Message {
  role: 'user' | 'assistant';
  content: string;
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
  Sectors = '08',
  Workflow = '09',
  Craftsmanship = '10',
  Editor = '11',
  Admin = '12'
}

export interface CloudConnection {
  github: boolean;
  drive: boolean;
  database: boolean;
  colab: boolean;
}
