import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../provider/AuthContex"; // Assuming you are using context for auth and theme

export default function Form() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const { darkMode } = useContext(AuthContext); // Get darkMode state from context or useState
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios(`${import.meta.env.VITE_URL}/task/${id}`);
        setFormData({
          title: data.title || "",
          description: data.description || "",
        });
        console.log("Fetched tasks:", data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    const updateData = async () => {
      try {
        const { data } = await axios.put(
          `${import.meta.env.VITE_URL}/tasks/${id}`,
          {
            title: formData.title,
            description: formData.description,
          }
        );
        console.log(data.modifiedCount);
        if (data && data.modifiedCount > 0) {
          toast.success("Task Updated");
          navigate("/");
        } else {
          toast.error("No changes made.");
        }

        console.log("Fetched tasks:", {
          title: formData.title,
          description: formData.description,
        });
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    updateData();
  };

  return (
    <div
      className={`max-w-md mx-5 sm:mx-auto p-6 rounded-xl shadow-md mt-10 ${
        darkMode ? "bg-gray-800 text-white" : "bg-indigo-100 text-black"
      }`}
    >
      <h2 className="text-2xl font-semibold mb-4">Submit Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              darkMode ? "bg-gray-700" : "bg-white"
            }`}
            required
          />
        </div>
        <div>
          <label className="block">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              darkMode ? "bg-gray-700" : "bg-white"
            }`}
            rows="4"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded-lg"
        >
          Update
        </button>

        <button
          type="button"
          className="w-full uppercase bg-indigo-600 text-white p-2 rounded-lg"
          onClick={() => {
            navigate("/");
          }}
        >
          back Home
        </button>
      </form>
    </div>
  );
}
