export interface Link {
  id: number;
  code: string;
  url: string;
  redirects: number;
  createdAt: string;
}

export interface Stats {
  totalLinks: number;
  totalRedirects: number;
}

export interface NewLinkPayload {
  url: string;
  code?: string;
}

export interface Location {
  city: string;
  regionName: string;
  country: string;
}

export interface UserAgent {
  ua: string;
  browser: { name: string | undefined; version: string | undefined; major: string | undefined };
  device: { model: string | undefined; type: string | undefined; vendor: string | undefined };
  engine: { name: string | undefined; version: string | undefined };
  os: { name: string | undefined; version: string | undefined };
  cpu: { architecture: string | undefined };
}

interface Redirect {
  id: number;
  linkId: number;
  location: Location;
  language: string;
  referrer: string;
  userAgent: UserAgent;
  createdAt: string;
}

export interface RedirectAndLink {
  redirects: Redirect;
  links: Link | null;
}
