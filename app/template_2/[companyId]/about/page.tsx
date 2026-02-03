import { notFound } from "next/navigation";
import { getAllLandingPageData } from "@/app/services/api";
// Templates
import Template2About from "@/components/template_2/about/page";


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



  return <Template2About companyId={companyId} data={data} />;
}
