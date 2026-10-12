import { useAuthContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver} from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const Login = () => {

  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  const schema = z.object({
    email:z.string().email({message: "Please enter a valid email"}),
    password:z.string().min(6, {message: "Password must be at least 6 characters"})
  });

    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data) => {
    const savedUsers = localStorage.getItem("registeredUsers");
  
    if (!savedUsers) {
      setLoginError("No registered account found");
      return;
    }
  
    const users = JSON.parse(savedUsers);
  
    const storedUser = users.find(
      (user) =>
        user.email === data.email &&
        user.password === data.password
    );
  
    if (!storedUser) {
      setLoginError("Email or password is incorrect");
      return;
    }
  
    setLoginError("");
  
    setUser(storedUser);
  
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(storedUser)
    );
  
    navigate("/");
  };

  
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-100 via-indigo-100 to-purple-200 flex items-center justify-center p-6">
      <form onSubmit={handleSubmit(onSubmit)}
       className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Login Page</h1>
        <p className="text-sm text-slate-500 mb-6"> Login to access your Task Manager </p>

        <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">Enter Email</label>
            <input type="email" placeholder="Enter Email" {...register("email")}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:border-green-500"/> 
           {errors.email && (<p className="text-red-500 text-sm mt-1">{errors.email.message}</p>)}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-1">Enter Password</label>
         <div className="relative">
            <input type={showPassword ? "text" : "password"} placeholder="Enter password" {...register("password")}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:border-green-500"/> 
            <button type="button" onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" > 👁️ </button> 
          </div>
          {errors.password && (<p className="text-red-500 text-sm mt-1">{errors.password.message}</p>)}
        </div>
        {loginError && (
          <p className="text-red-500 text-sm mb-4">
            {loginError}
          </p>
       )}
        <button type="submit" 
        className="w-full bg-green-600 text-white font-medium py-2.5 rounded-lg hover:bg-green-700">
          Login
        </button>
        <p className="mt-4 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-blue-600 hover:underline">
            Register
          </Link>
        </p>
       
      </form>
    </div>
  )
}

export default Login
