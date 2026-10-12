import Taskcard from "./Taskcard";
import { useTaskContext } from "../context/TaskContext";
import { useStatusContext } from "../context/StatusContext";
import { DragDropProvider, useDroppable } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { getStatusStyle } from "../utils/statusStyles";
import { useState, useRef, useEffect } from "react";
import { Inbox } from "lucide-react";

const StatusColumn = ({ status, taskIds, tasksById, deleteTask, colorIndex, }) => {
  const { ref } = useDroppable({
    id: status.name,
    type: "column",
    accept: "task",
    collisionPriority: 1,
  });

  const style = getStatusStyle(colorIndex);

  return (
    <div
      ref={ref}
      className={`w-72 shrink-0 rounded-xl border-t-4 bg-slate-100 p-4 shadow-sm ${style.border}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
          {status.name}
        </h2>
      </div>

      <div className="flex min-h-20 flex-col gap-4">
        {taskIds.length === 0 && (
          <div className="flex flex-col items-center gap-1 rounded-lg border-2 border-dashed border-slate-300 py-6 text-slate-400">
            <Inbox size={20} />
            <span className="text-xs">No tasks here</span>
          </div>
        )}

        {taskIds.map((id, index) => {
          const task = tasksById[id];

          if (!task) return null;

          return (
            <Taskcard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              index={index}
              column={status.name}
            />
          );
        })}
      </div>
    </div>
  );
};

const buildColumns = (statuses, filteredTasks) => {
  const columns = {};

  statuses.forEach((status) => {
    columns[status.name] = filteredTasks
      .filter((task) => task.status === status.name)
      .map((task) => task.id);
  });

  return columns;
};

const Taskboard = ({ filteredTasks }) => {
  const { tasks, deleteTask, moveTask } = useTaskContext();
  const { statuses } = useStatusContext();

  const [columns, setColumns] = useState(() =>
    buildColumns(statuses, filteredTasks)
  );

  const columnsRef = useRef(columns);
  const snapshot = useRef(columns);
  const isDragging = useRef(false);
  const boardRef = useRef(null);
  const startX = useRef(0);

  useEffect(() => {
    if (isDragging.current) return;

    const fresh = buildColumns(statuses, filteredTasks);

    columnsRef.current = fresh;
    setColumns(fresh);
  }, [statuses, filteredTasks]);

  const tasksById = {};

  filteredTasks.forEach((task) => {
    tasksById[task.id] = task;
  });

  const handleDragStart = () => {
    isDragging.current = true;
    snapshot.current = columnsRef.current;
  };

  const handleDragOver = (event) => {
    const next = move(columnsRef.current, event);

    columnsRef.current = next;
    setColumns(next);
  };

  const handleDragEnd = (event) => {
    isDragging.current = false;

    if (event.canceled || !event.operation) {
      columnsRef.current = snapshot.current;
      setColumns(snapshot.current);
      return;
    }

    const { source } = event.operation;

    if (!source) {
      return;
    }

    const task = tasks.find((task) => task.id === source.id);

    if (!task) {
      return;
    }

    const currentColumns = columnsRef.current;

    const newStatus = Object.keys(currentColumns).find((name) =>
      currentColumns[name].includes(source.id)
    );

    if (!newStatus) {
      return;
    }

    const column = currentColumns[newStatus];
    const position = column.indexOf(source.id);

    if (
      newStatus === task.status &&
      snapshot.current[newStatus].indexOf(source.id) === position
    ) {
      return;
    }

    const beforeId = column[position + 1] ?? null;

    moveTask(task.id, newStatus, beforeId);
  };

  const handleMouseDown = (event) => {
    isDragging.current = true;
    startX.current = event.clientX;
  };

  const handleMouseMove = (event) => {
    if (!isDragging.current) return;

    const distance = event.clientX - startX.current;

    boardRef.current.scrollLeft =
      boardRef.current.scrollLeft - distance;

    startX.current = event.clientX;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <DragDropProvider
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div
        ref={boardRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="mt-8 flex items-start gap-5 overflow-x-auto [scrollbar-none] [&::-webkit-scrollbar]:hidden"
      >
        {statuses.map((status, index) => (
          <StatusColumn
            key={status.id}
            status={status}
            taskIds={columns[status.name] ?? []}
            tasksById={tasksById}
            deleteTask={deleteTask}
            colorIndex={index}
          />
        ))}
      </div>
    </DragDropProvider>
  );
};

export default Taskboard;