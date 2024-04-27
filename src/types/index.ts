export interface ILink {
  id: number;
  code: string;
  url: string;
  redirects: number;
  createdAt: string;
}

export interface IStats {
  totalLinks: number;
  totalRedirects: number;
}

export interface INewLinkPayload {
  url: string;
  code?: string;
}

interface ILocation {
  city: string;
  regionName: string;
  country: string;
}

interface IUserAgent {
  ua: string;
  browser: { name: string | undefined; version: string | undefined; major: string | undefined };
  device: { model: string | undefined; type: string | undefined; vendor: string | undefined };
  engine: { name: string | undefined; version: string | undefined };
  os: { name: string | undefined; version: string | undefined };
  cpu: { architecture: string | undefined };
}

interface IRedirect {
  id: number;
  linkId: number;
  location: ILocation;
  language: string;
  referrer: string;
  userAgent: IUserAgent;
  createdAt: string;
}

export interface IRedirectAndLink {
  redirects: IRedirect;
  links: ILink | null;
}
