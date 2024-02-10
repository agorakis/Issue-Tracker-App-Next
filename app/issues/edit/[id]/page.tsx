import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";
import { cache } from "react";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface EditIssuePageProps {
  params: { id: string };
}

const fetchUsers = cache(async (issueId: number) => {
  return await prisma?.issue.findUnique({
    where: { id: issueId },
  });
});

const EditIssuePage = async ({ params }: EditIssuePageProps) => {
  const issue = await fetchUsers(parseInt(params.id));
  if (!issue) notFound();
  return <IssueForm issue={issue} />;
};

export async function generateMetadata({ params }: EditIssuePageProps) {
  const issue = await fetchUsers(parseInt(params.id));
  return {
    title: `Issue Tracker - Edit ${issue?.title}`,
    description: `Edit issue ${issue?.id}`,
  };
}

export default EditIssuePage;
