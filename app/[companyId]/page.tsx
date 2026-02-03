import { getAllLandingPageData } from "@/app/services/api";
import Template1 from "@/components/template_1/page";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ companyId: string }>;
}

export default async function Landing1({ params }: PageProps) {
  const { companyId } = await params;
  
  // Validate companyId exists
  if (!companyId) {
    notFound();
  }

  let data;
  try {
    data = await getAllLandingPageData(companyId);
  } catch {
    notFound();
  }


  
  return (
    <Template1 companyId={companyId} data={data}  />
  );
}