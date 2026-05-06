export interface LeaderboardEntry {
  uuid: string;
  xp: number;
  rank: number;
}

export interface LeaderboardResponse {
  scope: 'global' | 'hobby';
  hobbyId: string | null;
  entries: LeaderboardEntry[];
}
