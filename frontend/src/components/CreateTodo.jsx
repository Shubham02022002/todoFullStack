import { useState } from "react";
import success from "./Toast";

const CreateTodo = ({ fetchTodos }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      return;
    }
    try {
      setLoading(true);
      const resp = await fetch(`${import.meta.env.VITE_API_URL}/todo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!resp.ok) {
        throw new Error("Failed to create todo");
      }
      success("Todo created successfully!");
      setFormData({ title: "", description: "" });
      fetchTodos();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={formData.title}
        placeholder="Todo Title"
        onChange={handleChange}
      />

      <input
        type="text"
        name="description"
        value={formData.description}
        placeholder="Todo Description"
        onChange={handleChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Todo"}
      </button>
    </form>
  );
};

export default CreateTodo;
