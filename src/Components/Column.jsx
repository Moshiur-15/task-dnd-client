import React from "react";
import { useDroppable } from "@dnd-kit/core";
import Task from "./Task";

export default function Column({ column, tasks, setTasks }) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-500 p-5 rounded-lg w-full mx-auto my-5 cursor-grab dark:bg-gray-800 dark:text-white"
    >
      <p className="rounded py-2 px-2 text-white font-semibold text-lg font-sans uppercase bg-indigo-700 w-full">
        {column.title}
      </p>
      <div className="mt-5 w-full">
        {tasks.map((task) => (
          <Task key={task._id} taskData={task} setTasks={setTasks} />
        ))}
      </div>
    </div>
  );
}
