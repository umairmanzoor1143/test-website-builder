import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllLandingPageData, getCachedCompany } from "@/app/services/api";
import { getDomainInfo } from "@/app/lib/getDomainInfo";

// Templates
import Template1 from "@/components/template_1/page";
import Template2 from "@/components/template_2/page";

export async function generateMetadata(): Promise<Metadata> {
  const domainInfo = await getDomainInfo();

  if (!domainInfo?.companyId) {
    return {
      title: "Company",
      description: "Company landing page",
    };
  }

  try {
    const company = await getCachedCompany(domainInfo.companyId);

    return {
      metadataBase: new URL("https://me.onra.ch"),
      title: company.company,
      description: `Welcome to ${company.company}`,
      icons: {
        icon: company.image,
        shortcut: company.image,
        apple: company.image,
      },
      openGraph: {
        title: company.company,
        description: `Welcome to ${company.company}`,
        images: company.image ? [company.image] : [],
      },
    };
  } catch {
    return {
      title: "Company",
      description: "Company landing page",
    };
  }
}

export default async function Home() {
  const domainInfo = await getDomainInfo();

  // For localhost or no domain info, show 404
  if (!domainInfo?.companyId) {
    notFound();
  }
  let data;
  try {
    data = await getAllLandingPageData(domainInfo.companyId);
  } catch {
    notFound();
  }

  const { companyId, template } = domainInfo;
  
  // Render the appropriate template based on API response
  if (template === "template_2") {
    return <Template2 companyId={companyId} data={data} />;
  }

  // Default to Template 1
  return <Template2 companyId={companyId} data={data} />;
}

