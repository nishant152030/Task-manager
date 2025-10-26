import type { TaskItem } from "../api";

type Props = {
  tasks: TaskItem[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TaskList({ tasks, onToggle, onDelete }: Props) {
  if (tasks.length === 0) return <div>No tasks to show.</div>;
  return (
    <ul className="task-list">
      {tasks.map((t) => (
        <li key={t.id} className={`task-item ${t.isCompleted ? "completed" : ""}`}>
          <label>
            <input
              type="checkbox"
              checked={t.isCompleted}
              onChange={() => onToggle(t.id)}
            />
            <span className="desc">{t.description}</span>
          </label>
          <div className="meta">
            <small>{new Date(t.createdAt).toLocaleString()}</small>
            <button className="del" onClick={() => onDelete(t.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

