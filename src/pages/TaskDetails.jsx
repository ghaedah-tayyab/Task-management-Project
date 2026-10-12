import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LabelPicker from "../components/LabelPicker";
import { useTaskContext } from '../context/TaskContext';

const TaskDetails = () => {
  const {tasks, editTask } = useTaskContext();
    const params = useParams();
    const navigate = useNavigate();
    const task = tasks.find((task) => task.id === Number(params.id));
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [description, setDescription] = useState("");

    useEffect(() => {
      if (task) {
        setDescription(task.description);
      }
    }, [task]);
   
    const handleClick = () =>{
      navigate('/')
   }

   const handleSaveDescription = () => {
      editTask(task.id, {
        ...task,
        description: description,
      });
    
      setIsEditingDescription(false);
   };
   
    if (!task) {
        return (
            <div className="bg-white p-5 rounded-xl text-center">
                <div className="font-bold text-xl text-gray-500">Task not found</div>
                <div className="text-gray-400 text-sm mt-1">
                    The task you're looking for doesn't exist or may have been removed.
                </div>
                <button onClick={handleClick}
                className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 hover:cursor-pointer"
                >Back to Dashboard</button>
            </div>
        )
    };

  
 return (
  <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
    
   
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-800">
        {task.title}
      </h1>
        </div>
       
        <LabelPicker task={task} />
      

    <div className="mt-6">
      <h2 className="mb-2 text-lg font-bold text-gray-800">
        Description
      </h2>

      {isEditingDescription ? (
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-32 w-full resize-none rounded-lg border border-blue-400 bg-white p-4 text-gray-700"
          />

          <button
            onClick={handleSaveDescription}
            className="mt-3 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
          >
            Save Description
          </button>
        </div>
      ) : (
        <div
          onClick={() => setIsEditingDescription(true)}
          className="min-h-32 w-full cursor-pointer wrap-break-words whitespace-pre-wrap rounded-lg border border-gray-200 bg-gray-50 p-4 text-gray-700 transition hover:border-blue-300 hover:bg-blue-50"
        >
          {description}
        </div>
      )}
    </div>

   
    <div className="mt-6 space-y-4 border-t border-gray-200 pt-5">
      
      <div className="flex justify-between">
        <span className="font-medium text-gray-500">Priority</span>
        <span className="font-semibold text-gray-800">
          {task.priority}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="font-medium text-gray-500">Issue Type</span>
        <span className="font-semibold text-gray-800">
          {task.issueType}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="font-medium text-gray-500">Status</span>
        <span className="font-semibold text-gray-800">
          {task.status}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="font-medium text-gray-500">Assigned To</span>
        <span className="font-semibold text-gray-800">
          {task.assignedTo}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="font-medium text-gray-500">Due Date</span>
        <span className="font-semibold text-gray-800">
          {task.dueDate}
        </span>
      </div>

    </div>

   
    <button
      onClick={handleClick}
      className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
    >
      Back to Dashboard
    </button>

  </div>
)
}

export default TaskDetails;