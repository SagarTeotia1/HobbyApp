export const formatStreak = (days: number): string => {
  if (days === 0) return 'No streak yet';
  if (days === 1) return '1 day streak';
  return `${days} day streak`;
};
