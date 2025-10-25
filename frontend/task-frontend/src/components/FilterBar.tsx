import React from "react";

type Filter = "all" | "active" | "completed";

type Props = {
  current: Filter;
  onChange: (f: Filter) => void;
};

export default function FilterBar({ current, onChange }: Props) {
  return (
    <div className="filter-bar">
      <button className={current === "all" ? "active" : ""} onClick={() => onChange("all")}>All</button>
      <button className={current === "active" ? "active" : ""} onClick={() => onChange("active")}>Active</button>
      <button className={current === "completed" ? "active" : ""} onClick={() => onChange("completed")}>Completed</button>
    </div>
  );
}
