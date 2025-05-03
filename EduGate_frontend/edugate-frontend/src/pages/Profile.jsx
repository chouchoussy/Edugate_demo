import { useEffect, useState } from "react";
import api from "../api";

export default function Profile(){
  const [profile,setProfile]=useState(null);
  const [edit,setEdit]=useState(false);
  useEffect(()=>{ api.get("/users/u2").then(r=>setProfile(r.data)); },[]);
  if(!profile) return <p className="p-4">Đang tải...</p>;
  const save=()=>{
    api.put("/users/"+profile.id,profile).then(r=>{setProfile(r.data);setEdit(false);});
  };
  return(
    <div className="p-4 max-w-xl">
      <h2 className="text-xl font-semibold mb-4">Hồ sơ cá nhân</h2>
      {["name","email","phone","klass"].map(f=>(
        <div key={f} className="mb-2">
          <label className="block text-sm">{f}</label>
          <input disabled={!edit} className="border p-2 w-full"
            value={profile[f]||""} onChange={e=>setProfile({...profile,[f]:e.target.value})}/>
        </div>
      ))}
      {edit ?
        <button onClick={save} className="bg-green-600 text-white px-3 py-1">Lưu</button> :
        <button onClick={()=>setEdit(true)} className="bg-blue-600 text-white px-3 py-1">Chỉnh sửa</button>}
    </div>
  );
}
