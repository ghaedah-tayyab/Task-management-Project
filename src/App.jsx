import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import { Route, Routes } from 'react-router-dom';
import CreateTask from './pages/CreateTask';
import EditTask from './pages/EditTask';
import TaskDetails from './pages/TaskDetails';
import Team from './pages/Team';
import Tasks from './pages/Tasks';
import { useTaskContext } from './context/TaskContext';
import Notfound from './pages/Notfound';
import Login from './pages/Login';
import Register from './pages/Register';
import RoleProtectedRoute from './components/RoleProtectedRoute';
import StatusManager from "./components/StatusManager";
import AddMember from './pages/AddMember';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';



const App = () => {

  const { user } = useAuthContext();
  const {loading, error, usersLoading, usersError } = useTaskContext();
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  if (loading || usersLoading) {
    return <div>Loading tasks and users...</div>;
  }
  if (error || usersError) {
    return <div>Failed to load tasks or users.</div>;
  }
  
  return (
    <div className="min-h-screen overflow-hidden bg-slate-50">
      <Navbar/>
      <div className="grid min-h-[calc(100vh-64px)] grid-cols-12 items-stretch">
      <aside className="col-span-12 md:col-span-3 lg:col-span-2">
          <Sidebar />
        </aside>

        <main className="col-span-12 bg-linear-to-br from-slate-100 via-blue-50 to-indigo-100 md:col-span-9 lg:col-span-10">
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path="/create-task" element={
              <RoleProtectedRoute allowedRoles={["Admin", "Manager"]}>
                <CreateTask />
              </RoleProtectedRoute>}/>

            <Route path='/edit-task/:id' element={
               <RoleProtectedRoute allowedRoles={["Admin", "Manager"]}>
                <EditTask/>
              </RoleProtectedRoute>}/>
            <Route path='/task-details/:id' element={<TaskDetails/>}/>
            <Route path='/team' element={<Team/>}/>
            <Route path="/add-member" element={
                <RoleProtectedRoute allowedRoles={["Manager", "Admin"]}>
                  <AddMember />
                </RoleProtectedRoute> } />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/status-manager" element={<StatusManager />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/register" element={<Navigate to="/" replace />} /> 
            <Route path="*" element={<Notfound/>}/>
          </Routes>
        </main>
      </div>
    </div> 
  )
}

export default App;