import { getAllLandingPageData } from "@/app/services/api";
import { notFound } from "next/navigation";
import TeamPageV2 from "@/components/template_1/team/page";
interface PageProps {
  params: Promise<{ companyId: string }>;
}

export default async function TeamPage({ params }: PageProps) {
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
    <TeamPageV2 companyId={companyId} data={data} />
  );
}