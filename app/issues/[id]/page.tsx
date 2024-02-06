import { notFound } from "next/navigation";
import React from "react";

interface IssueDetailsPageProps {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: IssueDetailsPageProps) => {
  if (typeof params.id !== "number") notFound();

  const issue = await prisma?.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createdAt.toDateString()}</p>
    </div>
  );
};

export default IssueDetailsPage;
