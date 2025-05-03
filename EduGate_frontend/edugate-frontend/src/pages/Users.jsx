import { useEffect, useState } from "react";
import api from "../api";
import UserForm from "../components/UserForm.jsx";

export default function Users(){
  const [users,setUsers]=useState([]); const [q,setQ]=useState("");
  const [role,setRole]=useState(""); const [modal,setModal]=useState(null);
  const load=()=>api.get("/users").then(r=>setUsers(r.data));
  useEffect(load,[]);
  const filtered = users.filter(u=>(!role||u.role===role)&&u.name.toLowerCase().includes(q.toLowerCase()));
  return(
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Quản lý người dùng</h2>
        <button onClick={()=>setModal({})} className="bg-blue-600 text-white px-3 py-1">+ Tạo</button>
      </div>
      <div className="my-3 flex gap-2">
        <input className="border p-1 flex-1" placeholder="tìm kiếm..." value={q} onChange={e=>setQ(e.target.value)}/>
        <select className="border p-1" value={role} onChange={e=>setRole(e.target.value)}>
          <option value="">--Vai trò--</option>
          <option>ADMIN</option><option>TEACHER</option><option>PARENT</option><option>STUDENT</option>
        </select>
      </div>
      <table><thead><tr><th>Email</th><th>Tên</th><th>Vai trò</th><th></th></tr></thead>
        <tbody>{filtered.map(u=>(
          <tr key={u.id}>
            <td>{u.email}</td><td>{u.name}</td><td>{u.role}</td>
            <td><button onClick={()=>setModal(u)} className="text-blue-600 underline">Sửa</button></td>
          </tr>
        ))}</tbody>
      </table>
      {modal && <UserForm initial={modal.id?modal:null} onClose={()=>setModal(null)} onSaved={load}/>}
    </div>
  );
}
