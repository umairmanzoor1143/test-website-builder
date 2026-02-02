import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllLandingPageData, getCachedCompany } from "@/app/services/api";
import { getDomainInfo } from "@/app/lib/getDomainInfo";

// Templates
import Template1Team from "@/components/template_1/team/page";
import Template2Team from "@/components/template_2/team/page";

export async function generateMetadata(): Promise<Metadata> {
  const domainInfo = await getDomainInfo();

  if (!domainInfo?.companyId) {
    return {
      title: "Team | Company",
      description: "Team page",
    };
  }

  try {
    const company = await getCachedCompany(domainInfo.companyId);

    return {
      title: `Team | ${company.company}`,
      description: `Das Team von ${company.company}`,
      icons: {
        icon: company.image,
        shortcut: company.image,
        apple: company.image,
      },
      openGraph: {
        title: `Team | ${company.company}`,
        description: `Das Team von ${company.company}`,
        images: company.image ? [company.image] : [],
      },
    };
  } catch {
    return {
      title: "Team | Company",
      description: "Team page",
    };
  }
}

export default async function TeamPage() {
  const domainInfo = await getDomainInfo();

  if (!domainInfo?.companyId) {
    notFound();
  }

  const { companyId, template } = domainInfo;

  // Fetch data once - uses persistent cache
  let data;
  try {
    data = await getAllLandingPageData(companyId);
  } catch {
    notFound();
  }

  // Render the appropriate template with cached data
  if (template === "template_2") {
    return <Template2Team companyId={companyId} data={data} />;
  }

  return <Template1Team companyId={companyId} data={data} />;
}
