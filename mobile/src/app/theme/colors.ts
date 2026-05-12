export const colors = {
  // ─── Backgrounds ────────────────────────────────────────────────
  bg:         '#F5F0E8',   // warm cream canvas
  bgElevated: '#FFFFFF',   // pure white cards
  surface:    '#EDE8DF',   // slightly deeper cream

  // ─── Borders ────────────────────────────────────────────────────
  border:      '#0A0A0A',  // neo-brutal: near-black border
  borderLight: '#C8C2B6',  // for dividers only — never on interactive elements

  // ─── Brand ──────────────────────────────────────────────────────
  primary:      '#004643', // deep teal
  primaryLight: '#DAF0EE', // teal tint for card backgrounds
  primaryDim:   '#C5E8E5', // dimmed primary for selected/chip states

  // ─── Neo-brutal accent palette ──────────────────────────────────
  yellow:      '#FFD600',  // signature neo-brutal yellow
  yellowLight: '#FFFDE7',  // pale yellow tint (active/selected states)
  coral:       '#FF6B6B',  // warm red
  red:         '#EF4444',  // pure red (challenge/error accents)
  violet:      '#8B5CF6',  // purple
  blue:        '#3B82F6',  // electric blue
  mint:        '#10B981',  // fresh green
  orange:      '#F97316',  // vivid orange
  pink:        '#EC4899',  // hot pink
  indigo:      '#6366F1',  // indigo
  amber:       '#F59E0B',  // amber
  lime:        '#84CC16',  // lime

  // ─── Skill level accents ─────────────────────────────────────────
  skillBeginner:     '#BBF7D0', // light green
  skillIntermediate: '#FED7AA', // light orange
  skillAdvanced:     '#C4B5FD', // light purple

  // ─── Dark / comic surfaces ───────────────────────────────────────
  videoBg:           '#0A0A0A', // near-black for video/comic root bg
  darkSurface:       '#111111', // primary dark panel surface
  darkSurfaceRaised: '#1A1A1A', // elevated dark surface
  darkBorder:        '#222222', // borders on dark bg
  darkBorderStrong:  '#333333', // stronger borders on dark bg
  darkBorderBright:  '#444444', // bright dot/accent borders on dark bg
  darkTextDim:       '#555555', // dimmed label text on dark bg
  darkTextMuted:     '#666666', // muted text on dark bg
  darkTextFaint:     '#888888', // faint/hint text on dark bg

  // ─── Text ───────────────────────────────────────────────────────
  text:        '#0A0A0A', // near-black — strong contrast
  textMuted:   '#4A4A4A', // dark gray
  textDim:     '#7A7A7A', // medium gray
  textInverse: '#FFFFFF', // on dark fills

  // ─── Semantic ───────────────────────────────────────────────────
  success: '#00C853',
  warning: '#FFD600',
  danger:  '#FF3B3B',

  // ─── Game ───────────────────────────────────────────────────────
  xp:     '#FFD600',
  streak: '#FF6B3D',

  // ─── Utility ────────────────────────────────────────────────────
  shadow:  '#0A0A0A',
  overlay: 'rgba(0,0,0,0.5)',
} as const;

export type Colors = typeof colors;
