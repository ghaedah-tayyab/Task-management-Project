import { useForm } from "react-hook-form";
import { zodResolver} from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";
import { useStatusContext } from "../context/StatusContext";


const CreateTask = () => {
  const {addTask,teamMembers} = useTaskContext();
  const { statuses } = useStatusContext();
  const Schema = z.object({
    title:z.string().min(5 ,{ message: "Title must be at least 5 characters" }),
    description: z.string().min(10, {message: "Description must be at least 10 characters"}),
    issueType:z.string().min(1, "issueType is required"),
    priority:z.string().min(1, "Priority is required"),
    status: z.string().min(1, "Status is required"),
    assignedTo: z.string().min(1, "Please assign this task to someone"),
    dueDate: z.string().min(1, "Due date is required"),
   
  });
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(Schema)
  });
  const navigate = useNavigate();
  const onSubmit = (data) => {
    addTask(data);
    navigate("/");
  };
  return (
      <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-slate-200 bg-slate-100 p-8 shadow-md">
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 mb-4">
           Create New Task
          </h1>
          <form  className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          onSubmit={handleSubmit(onSubmit)}>
            {/*Title */}
         <div className="mb-4">
           <label className="block mb-2 font-medium text-gray-700">Title</label>
           <input type="text"placeholder="Enter task title" {...register("title")}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"/>
           {errors.title && (<p className="text-red-500 text-sm mt-1">  {errors.title.message}</p>)}
         </div>
          {/* Description */}
        <div className="mb-4">
           <label className="block mb-2 font-medium text-gray-700">Description</label>
           <textarea
            {...register("description")}
              className="min-h-32 w-full resize-none rounded-lg border border-gray-300 bg-white p-4 text-gray-700"/>
           {errors.description && (<p className="text-red-500 text-sm mt-1">{errors.description.message}</p>)}
        </div>
          {/* issueType */}
          <label className="block mb-2 font-medium text-gray-700">Issue Type</label>
          <select {...register("issueType")}
           className="w-full border border-gray-300 rounded-lg px-3 py-2">
            <option value="" disabled>
              Select Issue Type
            </option>
            <option>Bug</option>
            <option>Story</option>
            <option>Task</option>
            <option>Improvement</option>
          </select>
          {errors.issueType && (<p className="text-red-500 text-sm mt-1">{errors.issueType.message}</p>)}
           
         {/* Priority */}
        <div className="mb-4">
        <label>Priority</label>
        <input type="text" placeholder="Priority" {...register("priority")}
        className="w-full border border-gray-300 rounded-lg px-3 py-2"/>
        {errors.priority && (<p className="text-red-500 text-sm mt-1">{errors.priority.message}</p>)}
        </div>
         {/* Status */}
          <div className="mb-4">
            <label>Status</label>
            <select {...register("status")}
              className="w-full border border-gray-300 rounded-lg px-3 py-2" >
              {statuses.map((status) => (
                <option key={status.id} value={status.name}>
                  {status.name}
                </option>
              ))}
            </select>

            {errors.status && (
              <p className="text-red-500 text-sm mt-1">
                {errors.status.message}
              </p>
            )}
          </div>
         {/* assignedTo */}
         <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">Assigned To</label>
            <select
              defaultValue=""
              {...register("assignedTo")}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="" disabled>
                Select team member
              </option>
              {teamMembers.map((member) => {
                const name = member.memberName || member.name;
                return (
                  <option key={name} value={name}>
                    {name}
                  </option>
                );
              })}
            </select>
            {errors.assignedTo && (
              <p className="text-red-500 text-sm mt-1">{errors.assignedTo.message}</p>
            )}
          </div>
         {/* Due Date */}
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">
            Due Date
          </label>

          <input
            type="date"
            {...register("dueDate")}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />

          {errors.dueDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dueDate.message}
            </p>
          )}
        </div>
        {/*button*/}
        <button type="submit"
        className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700">Create Task</button>
      </form> 
    </div>
  )
}

export default CreateTask;