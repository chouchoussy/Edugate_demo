import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function Dashboard({ role }) {
  const nav = useNavigate();
  const rawMenu = [
    ["Tổng quan", ""],
    ["Người dùng", "users", ["ADMIN"]],
    ["Vai trò", "roles", ["ADMIN"]],
    ["Hồ sơ cá nhân", "profile"],
    ["Tin nhắn", "messages", ["ADMIN", "TEACHER", "STUDENT", "PARENT"]],
    ["Sự kiện", "events"],
    ["Kiến nghị", "petitions", ["PARENT", "ADMIN"]],
    ["Khen thưởng/Kỷ luật", "rewards", ["ADMIN", "TEACHER"]],
    ["Kết quả học tập", "grades", ["ADMIN", "TEACHER", "STUDENT", "PARENT"]],
  ];
  const menu = rawMenu.filter(([, , allow]) => !allow || allow.includes(role));
  
  return (
    <div className="flex h-screen">
      <aside className="w-52 border-r p-3 space-y-1 overflow-y-auto">
        {menu.map(([label, path])=>(
          <NavLink key={path} to={path} end
            className="block px-2 py-1 rounded hover:bg-blue-50">{label}</NavLink>
        ))}
        <button onClick={()=>{localStorage.clear();nav("/login");}}
          className="mt-4 text-sm text-red-600">Đăng xuất</button>
      </aside>
      <main className="flex-1 overflow-y-auto"><Outlet/></main>
    </div>
  );
}
