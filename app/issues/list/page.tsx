import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex, Text } from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";
import { Metadata } from "next";

interface IssuesPageProps {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: IssuesPageProps) => {
  const statuses = Object.values(Status);

  const validatedStatus = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const validatedOrderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const currentPage = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: { status: validatedStatus },
    orderBy: { ...validatedOrderBy },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where: { status: validatedStatus },
  });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      {issues.length === 0 ? (
        <Flex justify="center" pt="8">
          <Text size="3" weight="medium">
            There are no issues yet. Create an issue by clicking the button "New
            Issue".
          </Text>
        </Flex>
      ) : (
        <IssueTable searchParams={searchParams} issues={issues} />
      )}
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={currentPage}
      />
    </Flex>
  );
};

//Disabling Full Route Cache for Static routes(with no params)
// export const revalidate = 0; //another way of disabling Full Route Cache for Static routes(with no params) - Number (0) is seconds
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};

export default IssuesPage;
