import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Heading, Text, Flex, Card } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";

interface IssueDetailsPageProps {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: IssueDetailsPageProps) => {
  const issue = await prisma?.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="2" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetailsPage;
