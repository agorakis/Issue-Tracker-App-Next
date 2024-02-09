import prisma from "@/prisma/client";
import { Table, Text } from "@radix-ui/themes";
import IssueStatusBadge from "../../components/IssueStatusBadge";
import Link from "../../components/Link";
import NextLink from "next/link";

import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface IssuesPageProps {
  searchParams: { status: Status; orderBy: keyof Issue };
}

const IssuesPage = async ({ searchParams }: IssuesPageProps) => {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const statuses = Object.values(Status);
  const validatedStatus = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const validatedOrderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: { status: validatedStatus },
    orderBy: { ...validatedOrderBy },
  });

  return (
    <div>
      <IssueActions />

      {issues.length === 0 ? (
        <Text>There are no issues yet!</Text>
      ) : (
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              {columns.map((column) => (
                <Table.ColumnHeaderCell
                  key={column.value}
                  className={column.className}
                >
                  <NextLink
                    href={{ query: { ...searchParams, orderBy: column.value } }}
                  >
                    {column.label}
                  </NextLink>
                  {column.value === searchParams.orderBy && (
                    <ArrowUpIcon className="inline" />
                  )}
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                  <div className="block md:hidden">
                    <IssueStatusBadge status={issue.status} />
                  </div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <IssueStatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </div>
  );
};

//Disabling Full Route Cache for Static routes(with no params)
// export const revalidate = 0; //another way of disabling Full Route Cache for Static routes(with no params) - Number (0) is seconds
export const dynamic = "force-dynamic";

export default IssuesPage;
