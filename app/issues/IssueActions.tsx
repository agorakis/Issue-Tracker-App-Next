import { Button, Text } from "@radix-ui/themes";
import Link from "next/link";

const IssueActions = () => {
  return (
    <div className="mb-5">
      <Link href="/issues/new">
        <Button>
          <Text>New Issue</Text>
        </Button>
      </Link>
    </div>
  );
};

export default IssueActions;
