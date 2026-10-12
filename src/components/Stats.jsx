import { useStatusContext } from "../context/StatusContext";
import { ClipboardList } from "lucide-react";
import { getStatusStyle } from "../utils/statusStyles";
import { useRef } from "react";

const Stats = ({tasks}) => {
  const { statuses } = useStatusContext();
  const statsRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);

  const handleMouseDown = (event) =>{
    isDragging.current = true;
    startX.current = event.clientX;
  }

  const handleMouseMove = (event) => {
    if (!isDragging.current) return;
  
    const distance = event.clientX - startX.current;
  
    statsRef.current.scrollLeft =
      statsRef.current.scrollLeft - distance;
  
    startX.current = event.clientX;
  };
   
  const handleMouseUp = () => {
    isDragging.current = false;
  };
      
  return (
    <div
      ref={statsRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="mt-8 flex gap-5 overflow-x-auto [scrollbar-none] [&::-webkit-scrollbar]:hidden"
    >
      <div className="w-64 shrink-0 rounded-xl border border-l-4 border-gray-200 border-l-blue-500 bg-white p-5 shadow-sm transition hover:shadow-md">
        <h2 className="text-sm font-medium text-gray-500">Total Tasks</h2>
        <p className="mt-2 text-3xl font-bold text-gray-800">{tasks.length}</p>
      </div>

      {statuses.map((status, index) => {
        const style = getStatusStyle(index);
        return (
          <div
            key={status.id}
            className={`w-64 shrink-0 rounded-xl border border-l-4 border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md ${style.left}`}
          >
            <h2 className="text-sm font-medium text-gray-500">{status.name}</h2>
            <p className="mt-2 text-3xl font-bold text-gray-800">
              {tasks.filter((task) => task.status === status.name).length}
            </p>
          </div>
        );
      })}
    </div>
  );
  
};
export default Stats;