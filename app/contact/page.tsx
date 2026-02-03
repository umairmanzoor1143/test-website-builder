import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllLandingPageData, getCachedCompany } from "@/app/services/api";
import { getDomainInfo } from "@/app/lib/getDomainInfo";

// Templates
import Template1Contact from "@/components/template_1/contact/page";
import Template2Contact from "@/components/template_2/contact/page";

export async function generateMetadata(): Promise<Metadata> {
  const domainInfo = await getDomainInfo();

  if (!domainInfo?.companyId) {
    return {
      title: "Contact | Company",
      description: "Contact page",
    };
  }

  try {
    const company = await getCachedCompany(domainInfo.companyId);

    return {
      title: `Kontakt | ${company.company}`,
      description: `Kontaktieren Sie ${company.company}`,
      icons: {
        icon: company.image,
        shortcut: company.image,
        apple: company.image,
      },
      openGraph: {
        title: `Kontakt | ${company.company}`,
        description: `Kontaktieren Sie ${company.company}`,
        images: company.image ? [company.image] : [],
      },
    };
  } catch {
    return {
      title: "Contact | Company",
      description: "Contact page",
    };
  }
}

export default async function ContactPage() {
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
    return <Template2Contact companyId={companyId} data={data} />;
  }

  return <Template2Contact companyId={companyId} data={data} />;
}
