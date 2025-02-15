import logo from './logo.svg';
import './App.css';
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import SignupUser from './pages/signupUser';
import Dashboard from './pages/dashboard';
import { AuthProvider } from './context/authContext';
import VerifyRoutes from './context/verifyRoutes';
import AddTaskForm from './pages/AddTaskforms';
import "../src/styles/dashBoard.scss";
import EditTaskForm from './pages/editTaskForm';



function App() {
  return (
    <div className="App">
      <ToastContainer />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/taskManager' element={<Login></Login>}></Route>
            <Route path='/' element={<Login></Login>}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/signup' element={<SignupUser></SignupUser>}></Route>
            <Route element={<VerifyRoutes></VerifyRoutes>}>
              <Route path='/home' element={<Dashboard></Dashboard>}></Route>
              <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
              <Route path="/createTask" element={<AddTaskForm></AddTaskForm>} />
              <Route path="/updateTask" element={<EditTaskForm></EditTaskForm>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
