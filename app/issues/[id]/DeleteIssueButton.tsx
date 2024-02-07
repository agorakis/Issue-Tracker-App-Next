import { Button } from "@radix-ui/themes";

interface DeleteIssueButtonProps {
  issueId: number;
}

const DeleteIssueButton = ({ issueId }: DeleteIssueButtonProps) => {
  return <Button color="red">Delete Issue</Button>;
};

export default DeleteIssueButton;
