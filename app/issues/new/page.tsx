"use client";

import React from "react";
import { TextField, Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

const NewIssuePage = () => {
  interface IssueForm {
    title: string;
    description: string;
  }

  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data);
        router.push("/issues");
      })}
      className="max-w-xl space-y-3"
    >
      <TextField.Root>
        <TextField.Input {...register("title")} placeholder="Title" />
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />

      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
