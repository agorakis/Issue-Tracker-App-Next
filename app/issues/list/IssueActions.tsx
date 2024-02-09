import { Button, Text, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "./IssueStatusFilter";

const IssueActions = () => {
  return (
    <Flex justify="between">
      <IssueStatusFilter />

      <Link href="/issues/new">
        <Button>
          <Text>New Issue</Text>
        </Button>
      </Link>
    </Flex>
  );
};

export default IssueActions;
