export enum AppState {
  QUESTION = 'QUESTION',
  REVEAL = 'REVEAL'
}

export interface Position {
  top: string | number;
  left: string | number;
  position: 'absolute' | 'static' | 'fixed';
}