import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueForm";

interface EditIssuePageProps {
  params: { id: string };
}

const EditIssuePage = async ({ params }: EditIssuePageProps) => {
  const issue = await prisma?.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
