export const colors = {
  bg: '#F0EDE5',
  bgElevated: '#FFFFFF',
  surface: '#E7E2D7',
  border: '#C7C1B1',

  primary: '#004643',
  primaryDim: '#0B5C58',
  accent: '#007C76',

  success: '#4ADE80',
  warning: '#FACC15',
  danger: '#F87171',

  text: '#0E2A2A',
  textMuted: '#476160',
  textDim: '#66807F',

  xp: '#FFD24A',
  streak: '#FF6B3D',

  overlay: 'rgba(0,0,0,0.35)',
} as const;

export type Colors = typeof colors;
