"use client"

import { PostTask } from "@/protocols";
import axios from "axios";
import { BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

export default async function CreatingTask() {
  const { register, handleSubmit, setValue } = useForm<PostTask>();

  const onSubmit = async (data: PostTask, e: BaseSyntheticEvent<any> | undefined) => {
   e?.preventDefault();
    try {
      const body = {
        title: data.title,
        description: data.description,
        dateOfCompletion: data.dateOfCompletion
      }
      await axios.post(`http://localhost:8080/tasks`, body);
      setValue("title", "");
      setValue("description", "");
      setValue("dateOfCompletion", null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to register.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" label="Name" />
          <Input size="lg" label="Email" />
          <Input type="password" size="lg" label="Password" />
        </div>
        <Checkbox
          label={
            (
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-blue-500"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            )
          }
          containerProps={{ className: "-ml-2.5" }}
        />
        <Button className="mt-6" fullWidth>
          Register
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <a
            href="#"
            className="font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            Sign In
          </a>
        </Typography>
      </form>
    </Card>
  );
}