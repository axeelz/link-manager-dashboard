import { Badge } from "@/components/ui/badge";
import { ArrowBigRightDash, Globe, Languages, MapPin, MonitorSmartphone, MousePointerClick } from "lucide-react";
import type { IRedirectAndLink } from "@/types";
import { getRelativeTimeString } from "@/lib/utils";
import { LinkHeader } from "../../components/link-header";

export default function RedirectsList({ redirects }: { redirects: IRedirectAndLink[] }) {
  return (
    <div className="flex flex-col [&>div]:border-b [&>div:last-child]:border-0">
      {redirects.length === 0 && (
        <div className="flex items-center justify-center h-44">
          <p className="text-muted-foreground">No redirect found</p>
        </div>
      )}
      {redirects.map((data: IRedirectAndLink) => {
        const redirect = data.redirects;
        const link = data.links;

        const displayedLocation = redirect.location
          ? `${redirect.location.city}, ${redirect.location.regionName}, ${redirect.location.country}`
          : "N/A";

        let diplayedReferrer;
        try {
          const referrerURL = new URL(redirect.referrer);
          diplayedReferrer = `${referrerURL.host}${referrerURL.pathname}`;
        } catch (e) {
          diplayedReferrer = redirect.referrer;
        }

        const displayedInfo = [
          {
            name: "Referrer",
            value: diplayedReferrer || "N/A",
            icon: ArrowBigRightDash,
          },
          {
            name: "Language",
            value: redirect.language || "N/A",
            icon: Languages,
          },
          {
            name: "Device",
            value: `${redirect.userAgent.device.model || "N/A"}, ${redirect.userAgent.device.vendor || "N/A"}`,
            icon: MonitorSmartphone,
          },
          {
            name: "Browser",
            value: `${redirect.userAgent.browser.name || "N/A"} on ${redirect.userAgent.os.name || "N/A"}`,
            icon: Globe,
          },
          {
            name: "Location",
            value: displayedLocation,
            icon: MapPin,
          },
        ];

        return (
          <div key={redirect.id} className="flex flex-col gap-4 py-6 sm:px-4 sm:hover:bg-muted/50 transition-colors">
            <div className="mb-2">
              <Badge variant="outline" title={new Date(redirect.createdAt).toLocaleString()} suppressHydrationWarning>
                <MousePointerClick className="h-4 w-4 mr-1" />
                {getRelativeTimeString(new Date(redirect.createdAt))}
              </Badge>
            </div>
            {link && <LinkHeader link={link} />}
            <div className="flex flex-col gap-2">
              {displayedInfo.map((info) => (
                <div key={info.name} className="inline-flex items-center gap-2 text-muted-foreground text-sm">
                  <info.icon className="h-4 w-4" />
                  <strong>{info.name}:</strong> {info.value}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
