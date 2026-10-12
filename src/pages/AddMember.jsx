import { useForm } from "react-hook-form";
import { zodResolver} from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";

const AddMember = () => {
 const navigate = useNavigate();

  const { addTeamMember } = useTaskContext();
  const schema = z.object({
      memberName:z.string().min(3 ,{ message: "member must be at least 3 characters" }),
      email:z.string().email({message: "Please enter a valid email"}),
  });
  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data) => {
    const result = addTeamMember(data);
  
    if (!result.success) {
      setError("memberName", { type: "manual", message: result.message });
      return;
    }
  
    navigate("/team");
  };
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add members</h1>
      <form onSubmit={handleSubmit(onSubmit)}  className="bg-white p-6 rounded-lg border">
        <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1">Enter Member</label>
            <input type="text" placeholder="Enter New Member" {...register("memberName")}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:border-green-500"/> 
           {errors.memberName && (<p className="text-red-500 text-sm mt-1">{errors.memberName.message}</p>)}

        </div>
      <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">Enter Email</label>
            <input type="email" placeholder="Enter Email" {...register("email")}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:border-green-500"/> 
           {errors.email && (<p className="text-red-500 text-sm mt-1">{errors.email.message}</p>)}
        </div>
        <button type="submit" 
         className="w-full bg-blue-500 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700">
          Add member
        </button>
      </form>
    </div>
  )
}

export default AddMember

