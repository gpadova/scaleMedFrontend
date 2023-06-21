"use client";

import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { GetTasks } from "@/protocols";
import {
  AiFillDelete,
  AiOutlineEdit,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { GiConfirmed } from "react-icons/gi";
import { format, parseISO } from "date-fns";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function TaskCard(element: GetTasks) {
  const router = useRouter();
  const formattedDateOfConclusion = format(
    parseISO(element.dateOfCompletion.toString()),
    "dd/MM/yyyy"
  );
  const formattedDateOfCreation = format(
    parseISO(element.dateOfCreation.toString()),
    "dd/MM/yyyy"
  );
  async function deletePost(id: number) {
    try {
      await axios.delete(`http://localhost:8080/tasks/${id}`);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  async function editTask(id: number, currentState: boolean) {
    const body = { concluded: !currentState };
    try {
      await axios.patch(`http://localhost:8080/tasks/${id}`, body);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Card className="mt-6 w-96 bg-slate-600 rounded-2xl p-3">
      <CardBody>
        {element.concluded ? (
          <GiConfirmed className="text-green-400 w-12 h-12 mb-4" />
        ) : (
          <AiOutlineCloseCircle className="text-red-400 w-12 h-12 mb-4" />
        )}
        <Typography
          variant="h3"
          color="blue-gray"
          className="mb-2 font-extrabold"
        >
          {element.title}
        </Typography>
        <Typography>{element.description}</Typography>
        <Typography>Creation Date: {formattedDateOfCreation}</Typography>
        <Typography>Due: {formattedDateOfConclusion}</Typography>
      </CardBody>
      <CardFooter className="pt-0 flex justify-center">
        <AiOutlineEdit
          className=" w-9 h-9 m-2 cursor-pointer"
          onClick={() => editTask(element.id, element.concluded)}
        />
        <AiFillDelete
          className=" w-9 h-9 m-2 cursor-pointer"
          onClick={() => deletePost(element.id)}
        />
      </CardFooter>
    </Card>
  );
}
