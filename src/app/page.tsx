"use client"

import ListOfTasks from "@/components/CreatedTaskList";
import TaskCreationInput from "@/components/TaskCreationInput";

export default function Home() {

  return (
    <div className="h-screen">
      <TaskCreationInput />
      <ListOfTasks />
    </div>
  );
}