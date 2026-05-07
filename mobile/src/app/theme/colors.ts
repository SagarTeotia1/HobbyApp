export const colors = {
  bg: '#0B0B10',
  bgElevated: '#15151D',
  surface: '#1C1C26',
  border: '#2A2A38',

  primary: '#7C5CFF',
  primaryDim: '#5C44CC',
  accent: '#FF5CA8',

  success: '#4ADE80',
  warning: '#FACC15',
  danger: '#F87171',

  text: '#F4F4F8',
  textMuted: '#A0A0B4',
  textDim: '#6F6F84',

  xp: '#FFD24A',
  streak: '#FF6B3D',

  overlay: 'rgba(0,0,0,0.6)',
} as const;

export type Colors = typeof colors;
