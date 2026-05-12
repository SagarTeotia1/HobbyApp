import { CURRICULUM } from '../constants/curriculum';

export function matchHobbyInCurriculum(query: string): string {
  const q = query.trim().toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  if (!q) return query;

  const byId = CURRICULUM.find((h) => h.id === q.replace(/\s+/g, '-'));
  if (byId) return byId.id;

  const byName = CURRICULUM.find((h) => h.name.toLowerCase() === q);
  if (byName) return byName.id;

  const nameContains = CURRICULUM.find((h) => h.name.toLowerCase().includes(q));
  if (nameContains) return nameContains.id;

  const queryContains = CURRICULUM.find((h) => q.includes(h.name.toLowerCase()));
  if (queryContains) return queryContains.id;

  const words = q.split(' ').filter(Boolean);
  const byWords = CURRICULUM.find((h) =>
    words.some((w) => h.name.toLowerCase().includes(w) || h.id.includes(w)),
  );
  if (byWords) return byWords.id;

  return q.replace(/\s+/g, '-');
}
