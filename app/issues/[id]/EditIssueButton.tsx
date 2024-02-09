import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button, Text } from "@radix-ui/themes";
import Link from "next/link";

interface EditIssueButtonProps {
  issueId: number;
}

const EditIssueButton = ({ issueId }: EditIssueButtonProps) => {
  return (
    <Link href={`/issues/edit/${issueId}`}>
      <Button className="w-full">
        <Pencil2Icon />
        <Text>Edit Issue</Text>
      </Button>
    </Link>
  );
};

export default EditIssueButton;
