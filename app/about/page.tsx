import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllLandingPageData, getCachedCompany } from "@/app/services/api";
import { getDomainInfo } from "@/app/lib/getDomainInfo";

// Templates
import Template1About from "@/components/template_1/about/page";
import Template2About from "@/components/template_2/about/page";

export async function generateMetadata(): Promise<Metadata> {
  const domainInfo = await getDomainInfo();

  if (!domainInfo?.companyId) {
    return {
      title: "About | Company",
      description: "About page",
    };
  }

  try {
    const company = await getCachedCompany(domainInfo.companyId);

    return {
      title: `Über uns | ${company.company}`,
      description: `Erfahren Sie mehr über ${company.company}`,
      icons: {
        icon: company.image,
        shortcut: company.image,
        apple: company.image,
      },
      openGraph: {
        title: `Über uns | ${company.company}`,
        description: `Erfahren Sie mehr über ${company.company}`,
        images: company.image ? [company.image] : [],
      },
    };
  } catch {
    return {
      title: "About | Company",
      description: "About page",
    };
  }
}

export default async function AboutPage() {
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
    return <Template2About companyId={companyId} data={data} />;
  }

  return <Template1About companyId={companyId} data={data} />;
}
