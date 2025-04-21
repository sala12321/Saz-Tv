
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

// Database types for Supabase
export type Database = {
  public: {
    Tables: {
      matches: {
        Row: Match;
        Insert: Omit<Match, 'id' | 'created_at'>;
        Update: Partial<Omit<Match, 'id' | 'created_at'>>;
      };
      channels: {
        Row: Channel;
        Insert: Omit<Channel, 'id' | 'created_at'>;
        Update: Partial<Omit<Channel, 'id' | 'created_at'>>;
      };
      stream_links: {
        Row: StreamLink;
        Insert: Omit<StreamLink, 'id' | 'created_at'>;
        Update: Partial<Omit<StreamLink, 'id' | 'created_at'>>;
      };
      stream_sources: {
        Row: StreamSource;
        Insert: Omit<StreamSource, 'id' | 'created_at'>;
        Update: Partial<Omit<StreamSource, 'id' | 'created_at'>>;
      };
      channel_streams: {
        Row: ChannelStream;
        Insert: Omit<ChannelStream, 'id' | 'created_at'>;
        Update: Partial<Omit<ChannelStream, 'id' | 'created_at'>>;
      };
    };
  };
};
