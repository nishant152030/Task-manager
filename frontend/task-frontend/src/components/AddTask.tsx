import React, { useState } from "react";

type Props = { onAdd: (desc: string) => void };

export default function AddTask({ onAdd }: Props) {
  const [desc, setDesc] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!desc.trim()) return;
    onAdd(desc.trim());
    setDesc("");
  };

  return (
    <form onSubmit={submit} className="add-form">
      <input
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="New task description..."
      />
      <button type="submit">Add</button>
    </form>
  );
}
