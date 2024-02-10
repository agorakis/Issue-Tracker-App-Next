import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import { cache } from "react";

interface IssueDetailsPageProps {
  params: { id: string };
}

const fetchUsers = cache(async (issueId: number) => {
  return await prisma?.issue.findUnique({
    where: { id: issueId },
  });
});

const IssueDetailsPage = async ({ params }: IssueDetailsPageProps) => {
  const session = await getServerSession(authOptions);
  const issue = await fetchUsers(parseInt(params.id));
  if (!issue) notFound();

  return (
    <Grid gap="5" columns={{ initial: "1", sm: "5" }}>
      <Box className="md: col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: IssueDetailsPageProps) {
  const issue = await fetchUsers(parseInt(params.id));
  return {
    title: `Issue Tracker - ${issue?.title}`,
    description: `Details of issue ${issue?.id}`,
  };
}

export default IssueDetailsPage;
