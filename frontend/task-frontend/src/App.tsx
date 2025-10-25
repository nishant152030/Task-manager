import React, { useEffect, useState } from "react";
import type { TaskItem } from "./api";
import { getTasks, addTask as apiAdd, toggleTask as apiToggle, deleteTask as apiDelete } from "./api";
import AddTask from "./components/AddTask";
import FilterBar from "./components/FilterBar";
import TaskList from "./components/TaskList";

type Filter = "all" | "active" | "completed";
const STORAGE_KEY = "tasks_v1";

export default function App() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  // load from localStorage first (instant UI), then fetch server and replace
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as TaskItem[];
        setTasks(parsed);
      } catch { /* ignore */ }
    }
    // fetch server data to sync
    loadFromServer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // persist changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch { /* ignore storage errors */ }
  }, [tasks]);

  const loadFromServer = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (e) {
      setError("Failed to load tasks from server.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (desc: string) => {
    try {
      const created = await apiAdd(desc);
      setTasks(prev => [...prev, created]);
    } catch {
      alert("Failed to add task.");
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await apiToggle(id);
      setTasks(prev => prev.map(t => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t)));
    } catch {
      alert("Failed to toggle task.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this task?")) return;
    try {
      await apiDelete(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch {
      alert("Failed to delete task.");
    }
  };

  const filtered = tasks.filter(t => {
    if (filter === "all") return true;
    if (filter === "active") return !t.isCompleted;
    return t.isCompleted;
  });

  return (
    <div className="container">
      <div className="min-h-screen items-center justify-center bg-gray-50">
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Task Manager</h1>

        <div className="flex flex-col gap-4 items-center mb-6">
          <AddTask onAdd={handleAdd} />
          {/* <button onClick={loadFromServer}>Sync from server</button> */}
        </div>
        </div>
      </div>
      <FilterBar current={filter} onChange={setFilter} />

      {loading && <div>Loading tasks…</div>}
      {error && <div className="error">{error}</div>}

      <TaskList tasks={filtered} onToggle={handleToggle} onDelete={handleDelete} />

      {/* <div style={{ marginTop: 12 }}>
        <small>Local cache: stored in localStorage (key: {STORAGE_KEY}).</small>
      </div> */}
    </div>
  );
}
