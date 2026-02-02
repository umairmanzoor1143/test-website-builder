import { headers } from "next/headers";
import { cache } from "react";
import { getCompanyByDomain } from "@/app/services/api";
import { DomainInfo } from "@/app/types";

// Cached helper function to get domain info - deduplicates calls within the same request
export const getDomainInfo = cache(async (): Promise<DomainInfo | null> => {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const domain = host.split(":")[0];

  if (domain === "localhost" || domain === "127.0.0.1") {
    return null;
  }

  try {
    return await getCompanyByDomain(domain);
  } catch {
    return null;
  }
});
