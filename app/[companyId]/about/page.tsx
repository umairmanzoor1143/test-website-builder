import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllLandingPageData } from "@/app/services/api";
import { getDomainInfo } from "@/app/lib/getDomainInfo";
// Templates
import Template1About from "@/components/template_1/about/page";
import Template2About from "@/components/template_2/about/page";
import { getContrastColor } from "@/components/template_1/utils/theme";


interface PageProps {
  params: Promise<{ companyId: string }>;
}
export default async function AboutPage({ params }: PageProps)  {
 const { companyId } = await params;
  if (!companyId) {
    notFound();
  }

  let data;
  try {
    data = await getAllLandingPageData(companyId);
  } catch(error) {
    console.error("Error fetching data for about page:", companyId, error);
    notFound();
  }



  return <Template1About companyId={companyId} data={data} />;
}
