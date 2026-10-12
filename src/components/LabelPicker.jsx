import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";

const LabelPicker = ({ task }) => {
  const { editTask } = useTaskContext();
  const [text, setText] = useState("");

  const labels = task.labels || [];

  const addLabel = () => {
    const name = text.trim();
    if (!name) return;
    if (labels.some((l) => l.toLowerCase() === name.toLowerCase())) return; 
    editTask(task.id, { ...task, labels: [...labels, name] });
    setText("");
  };

  const removeLabel = (name) => {
    editTask(task.id, { ...task, labels: labels.filter((l) => l !== name) });
  };

  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-2 mb-2">
        {labels.map((name) => (
          <span
            key={name}
            onClick={() => removeLabel(name)}
            title="Click to remove"
            className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full cursor-pointer"
          >
            {name} ✕
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addLabel()}
          placeholder="Add label..."
          className="border rounded px-3 py-1"
        />
        <button onClick={addLabel} className="bg-blue-600 text-white px-3 py-1 rounded">
          Add
        </button>
      </div>
    </div>
  );
};

export default LabelPicker;