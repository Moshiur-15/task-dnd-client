import { useDraggable } from "@dnd-kit/core";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { MdBrowserUpdated } from "react-icons/md";

export default function Task({ taskData, setTasks }) {
  const { _id, title, description, timestamp, dueDate } = taskData;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useDraggable({
      id: _id,
    });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        transition: transition || undefined,
      }
    : undefined;

  const formattedTimestamp = new Date(timestamp).toLocaleString();
  const dueDateObj = new Date(dueDate);
  const currentDate = new Date();
  const isOverdue = dueDateObj < currentDate;
  const formattedDueDate = dueDateObj.toLocaleDateString();
  const navigate = useNavigate();
  const handleDelete = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    try {
      console.log("Deleting task:", _id);
      const { data } = await axios.delete(`${import.meta.env.VITE_URL}/tasks/${_id}`);
  console.log(data);
      if (data.result.acknowledged) {
        toast.success("Task Deleted");
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== _id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdate = async (event) => {
    event.stopPropagation();
    event.preventDefault();
    console.log(_id);
    navigate(`/edit/${_id}`);
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="hover:scale-105 duration-300 text-white p-3 rounded-lg w-[290px] mx-auto my-5 cursor-grab bg-gray-700"
    >
      <div className="flex justify-between gap-2">
        <div>
          <p className="font-bold text-sm uppercase">{title}</p>
          <p className="text-sm mt-2">{description || "No Description"}</p>
          {/* <p className={`text-xs mt-2 ${isOverdue ? "text-red-800" : 'text-white'}`}>{`Created: ${formattedTimestamp}`}</p> */}
          <p className={`text-xs mt-2 ${isOverdue ? "text-red-500" : 'text-white'}`}>{`Due: ${formattedDueDate}`}</p>
        </div>
        <div className="flex flex-col gap-4">
          {/* ✅ Use `onPointerDown` to prevent dragging */}
          <button
            onClick={handleDelete}
            onPointerDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            className="bg-red-500 text-white p-1 px-3 rounded-full hover:scale-110"
          >
            <MdDeleteForever />
          </button>
          <button
            onClick={handleUpdate}
            onPointerDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            className="bg-indigo-500 text-white p-1 px-3 rounded-full hover:scale-110"
          >
            <MdBrowserUpdated />
          </button>
        </div>
      </div>
    </div>
  );
}
