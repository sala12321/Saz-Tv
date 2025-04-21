
export interface Match {
  id: number;
  created_at: string;
  competition: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  slug: string;
  score?: string;
  type: 'live' | 'upcoming';
}

export interface Channel {
  id: number;
  created_at: string;
  name: string;
  logo: string;
  slug: string;
  logoUrl?: string;
}

export interface StreamLink {
  id: number;
  created_at: string;
  matchId: number;
  name: string;
  url: string;
  quality: string;
  language?: string;
}

export interface StreamSource {
  id: number;
  created_at: string;
  matchId: number;
  name: string;
  embedCode: string;
  slug: string;
}

export interface ChannelStream {
  id: number;
  created_at: string;
  channelId: number;
  name: string;
  language: string;
  quality: string;
  url: string;
}
