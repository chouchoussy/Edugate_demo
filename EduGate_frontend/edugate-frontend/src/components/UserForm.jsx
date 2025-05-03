import { useState } from "react";
import api from "../api";

export default function UserForm({initial, onClose, onSaved}){
  const [data,setData]=useState(initial||{email:"",name:"",role:"STUDENT",klass:""});
  const save=()=>{
    const req = data.id ? api.put("/users/"+data.id,data) : api.post("/users",data);
    req.then(r=>{onSaved();onClose();});
  };
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-4 rounded w-80">
        <h3 className="text-lg font-bold mb-2">{data.id?"Sửa":"Tạo"} người dùng</h3>
        {["email","name","klass"].map(f=>(
          <input key={f} className="border p-1 mb-2 w-full" placeholder={f}
            value={data[f]} onChange={e=>setData({...data,[f]:e.target.value})}/>
        ))}
        <select className="border p-1 mb-2 w-full" value={data.role}
          onChange={e=>setData({...data,role:e.target.value})}>
          {["ADMIN","TEACHER","PARENT","STUDENT"].map(r=>
            <option key={r} value={r}>{r}</option>)}
        </select>
        <div className="flex justify-end space-x-2">
          <button className="px-3 py-1" onClick={onClose}>Huỷ</button>
          <button className="bg-blue-600 text-white px-3 py-1" onClick={save}>Lưu</button>
        </div>
      </div>
    </div>
  );
}
