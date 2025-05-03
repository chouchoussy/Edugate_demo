import { useState } from "react";
import api from "../api";

export default function PetitionForm({onClose,onSaved}){
  const [data,setData]=useState({title:"",content:""});
  const save=()=>{ api.post("/petitions",data).then(()=>{onSaved();onClose();}); };
  return(
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-4 rounded w-96 space-y-2">
        <h3 className="text-lg font-bold">Gửi đơn kiến nghị</h3>
        <input className="border p-2 w-full" placeholder="Tiêu đề"
          value={data.title} onChange={e=>setData({...data,title:e.target.value})}/>
        <textarea className="border p-2 w-full h-32" placeholder="Nội dung"
          value={data.content} onChange={e=>setData({...data,content:e.target.value})}/>
        <div className="text-right space-x-2">
          <button onClick={onClose}>Huỷ</button>
          <button onClick={save} className="bg-blue-600 text-white px-3 py-1">Gửi</button>
        </div>
      </div>
    </div>
  );
}
