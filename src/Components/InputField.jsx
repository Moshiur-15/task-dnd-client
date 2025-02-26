import React, { useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../provider/AuthContex";

const InputField = ({ setTodo, tasks }) => {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, dueDate } = formData;

    if (!title) {
      setError("Title is required!");
      return;
    }
    if (title.length > 50) {
      setError("Title cannot exceed 50 characters!");
      return;
    }

    if (description.length > 200) {
      setError("Description cannot exceed 200 characters!");
      return;
    }

    if (!dueDate) {
      setError("Due date is required!");
      return;
    }

    const newTask = {
      title,
      description,
      dueDate,
      status: "TODO",
      timestamp: new Date().toISOString(),
      email: user?.email,
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL}/tasks`,
        newTask
      );
      if (data && data.insertedId) {
        toast.success("Task Added");
      }
      const newData = { _id: data.insertedId, ...newTask };
      setTodo([...tasks, newData]);
      setFormData({ title: "", description: "", dueDate: "" });
      setError("");
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      className="flex flex-col w-full max-w-lg mx-auto sm:w-11/12 md:w-3/4 lg:w-1/2 gap-4 p-6 rounded-lg shadow-xl bg-gray-100 dark:bg-gray-800"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-3 text-base rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all"
      />

      <textarea
        placeholder="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-3 text-base rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all min-h-[80px]"
      ></textarea>

      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        className="w-full p-3 text-base rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all"
      />

      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

      <button
        type="submit"
        className="w-full mt-4 py-3 text-white font-semibold bg-indigo-600 rounded-lg hover:bg-indigo-700 active:scale-95 focus:outline-none transition-all duration-200 dark:bg-indigo-700 dark:hover:bg-indigo-600 uppercase"
      >
        Add Task
      </button>
    </form>
  );
};

export default InputField;
