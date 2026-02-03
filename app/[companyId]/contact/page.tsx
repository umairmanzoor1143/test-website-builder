import { getAllLandingPageData } from "@/app/services/api";
import { notFound } from "next/navigation";
import ContactPageV2 from "@/components/template_1/contact/page";

interface PageProps {
  params: Promise<{ companyId: string }>;
}

export default async function ContactPage({ params }: PageProps) {
  const { companyId } = await params;

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
    <ContactPageV2 companyId={companyId} data={data} />
  );
}