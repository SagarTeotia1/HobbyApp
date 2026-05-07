export function formatXP(xp: number): string {
  if (xp >= 1_000_000) return `${(xp / 1_000_000).toFixed(1)}M`;
  if (xp >= 1_000) return `${(xp / 1_000).toFixed(1)}K`;
  return xp.toString();
}

export function xpForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

export function levelFromXP(xp: number): number {
  let level = 1;
  let needed = xpForLevel(level);
  while (xp >= needed) {
    xp -= needed;
    level += 1;
    needed = xpForLevel(level);
  }
  return level;
}
