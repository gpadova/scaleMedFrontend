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

export default async function TaskCreationInput() {
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
    <div className="flex flex-col justify-center items-center gap-6">
      <div className="w-1/2 bg-orange-400 border border-zinc-400 border-solid flex justify-center items-center rounded-2xl gap-10 m-10 p-3 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="text-3xl font-bold">Create a task</label>
          <div className="w-10/12 flex justify-center flex-col">
            <p className="text-slate-600">Title of your task: </p>
            <input
              className="bg-orange-300 text-lg rounded text-slate-600 px-2 py-2 h-10  placeholder-gray-900 focus:border focus:outline-none"
              placeholder="Title"
              id="title"
              {...register("title")}
              required
            />
          </div>
          <div className="w-10/12 flex justify-center flex-col">
            <p className="text-slate-600">
              Give it a short description of your task:
            </p>
            <textarea
              className="bg-orange-300  text-lg rounded-lg text-slate-600 px-2 py-2  placeholder-gray-900 focus:border focus:outline-none"
              placeholder="Description"
              rows={5}
              {...register("description")}
              required
            />
          </div>
          <div className="w-10/12 flex justify-center flex-col">
            <p className="text-slate-600">Date of Conclusion:</p>
            <input
              className="bg-orange-300 text-lg rounded-lg text-gray-900 px-2 py-2 h-10  placeholder-gray-900 focus:border focus:outline-none"
              type="date"
              required
              {...register("dateOfCompletion")}
            />
          </div>
          <button
            className="w-50 rounded-full p-2 bg-slate-600 disabled:bg-gray-600"
            type="submit"
          >
            Create a task!
          </button>
        </form>
      </div>
    </div>
  );
}