export type VerdictColor = "green" | "orange" | "red";

export interface SourceLink {
  ref: string;
  url: string;
  note: string;
  host: string;
  title: string;
  image: string;
}

export interface Claim {
  id: number;
  topic: string;
  claim: string;
  quote: string;
  figures: string[];
  verdict: string;
  headline: string;
  color: VerdictColor;
  confidence: string;
  summary: string;
  context: string;
  progressivePerspective: string;
  whatTheyOmit: string;
  keyFacts: string[];
  sources: SourceLink[];
}

export interface Video {
  slug: string;
  title: string;
  uploader: string;
  url: string;
  duration: number | null;
  thumbnail: string;
  claims: Claim[];
}

export interface SiteData {
  generatedAt: string;
  videos: Video[];
}
