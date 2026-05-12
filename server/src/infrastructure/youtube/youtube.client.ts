const YT_BASE = 'https://www.googleapis.com/youtube/v3';

export interface YTSearchItem {
  id: { videoId: string };
  snippet: {
    title: string;
    channelTitle: string;
    description: string;
    thumbnails: {
      high?: { url: string };
      medium?: { url: string };
      default?: { url: string };
    };
  };
}

export interface YTVideoDetail {
  id: string;
  snippet: YTSearchItem['snippet'];
  status: {
    embeddable: boolean;
    privacyStatus: string;
  };
  contentDetails: {
    duration: string; // ISO 8601: PT1H23M45S
  };
}

interface YTSearchResponse {
  items: YTSearchItem[];
}

interface YTVideosResponse {
  items: YTVideoDetail[];
}

export async function searchYouTube(
  query: string,
  apiKey: string,
  maxResults = 10,
): Promise<YTSearchItem[]> {
  const url = new URL(`${YT_BASE}/search`);
  url.searchParams.set('part', 'snippet');
  url.searchParams.set('q', query);
  url.searchParams.set('type', 'video');
  url.searchParams.set('videoEmbeddable', 'true');
  url.searchParams.set('videoDuration', 'medium'); // 4–20 min, excludes Shorts
  url.searchParams.set('maxResults', String(maxResults));
  url.searchParams.set('key', apiKey);
  url.searchParams.set('relevanceLanguage', 'en');
  url.searchParams.set('safeSearch', 'moderate');
  url.searchParams.set('order', 'relevance');

  const res = await fetch(url.toString(), { signal: AbortSignal.timeout(10_000) });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`YouTube search API ${res.status}: ${body}`);
  }

  const data = (await res.json()) as YTSearchResponse;
  return data.items ?? [];
}

// Fetch video details (status.embeddable + duration) for a list of videoIds.
// Filters out non-embeddable and private videos.
export async function fetchEmbeddableVideos(
  videoIds: string[],
  apiKey: string,
): Promise<YTVideoDetail[]> {
  if (videoIds.length === 0) return [];

  const url = new URL(`${YT_BASE}/videos`);
  url.searchParams.set('part', 'snippet,status,contentDetails');
  url.searchParams.set('id', videoIds.join(','));
  url.searchParams.set('key', apiKey);

  const res = await fetch(url.toString(), { signal: AbortSignal.timeout(10_000) });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`YouTube videos API ${res.status}: ${body}`);
  }

  const data = (await res.json()) as YTVideosResponse;
  return (data.items ?? []).filter(
    (v) => v.status.embeddable && v.status.privacyStatus === 'public',
  );
}

// Parse ISO 8601 duration (PT1H23M45S) → seconds
export function parseDuration(iso: string): number {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const h = parseInt(match[1] ?? '0', 10);
  const m = parseInt(match[2] ?? '0', 10);
  const s = parseInt(match[3] ?? '0', 10);
  return h * 3600 + m * 60 + s;
}

export function pickThumbnail(item: Pick<YTSearchItem, 'snippet'>): string {
  const t = item.snippet.thumbnails;
  return t.high?.url ?? t.medium?.url ?? t.default?.url ?? '';
}
