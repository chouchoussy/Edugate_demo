import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Users from "./pages/Users.jsx";
import Roles from "./pages/Roles.jsx";
import Profile from "./pages/Profile.jsx";
import Messages from "./pages/Messages.jsx";
import Events from "./pages/Events.jsx";
import Petitions from "./pages/Petitions.jsx";
import PetitionDetail from "./pages/PetitionDetail.jsx";
import Rewards from "./pages/Rewards.jsx";
import Grades from "./pages/Grades.jsx";

export default function App() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isAuth = !!user;

  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route
        path="/"
        element={isAuth ? <Dashboard role={user.role} /> : <Navigate to="/login" />}
      >
        <Route index element={<div className="p-4">Tổng quan hệ thống</div>}/>
        <Route path="users" element={<Users/>}/>
        <Route path="roles" element={<Roles/>}/>
        <Route path="profile" element={<Profile/>}/>
        <Route path="messages" element={<Messages/>}/>
        <Route path="events" element={<Events/>}/>
        <Route path="petitions" element={<Petitions/>}/>
        <Route path="petitions/:id" element={<PetitionDetail/>}/>
        <Route path="rewards" element={<Rewards/>}/>
        <Route path="grades" element={<Grades/>}/>
      </Route>
      <Route path="*" element={<Navigate to={isAuth?"/":"/login"}/>}/>
    </Routes>
  );
}
