import axios, { AxiosResponse } from "axios";
import { GetTasks } from "@/protocols";
import TaskCard from "./TaskCard";

export const fetchCache= "auto";

async function getTasks(): Promise<AxiosResponse<GetTasks[], any>> {
  return await axios.get("http://localhost:8080/tasks");
}

export default async function ListOfTasks() {
  const { data } = await getTasks();

  const TABLE_HEAD = [
    "Title",
    "Description",
    "Date of Creation",
    "Date of Conclusion",
    "Concluded",
    "",
  ];

  return (
    <div className="flex justify-center flex-col items-center pb-10">
      <h2 className="text-3xl text-zinc-200 text-extrabold m-5">
        Check it out your current tasks
      </h2>
      <div className="w-11/12 flex-wrap flex justify-center gap-5">
        {data.map((element) =>  <TaskCard key={element.id} {...element}/>)}
      </div>
    </div>
  );
}
