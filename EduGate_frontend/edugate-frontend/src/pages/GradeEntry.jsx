import { useState } from "react";
import api from "../api";

export default function GradeEntry(){
  const [data,setData]=useState({student:"",subject:"Toán",type:"15P",score:""});
  const save=()=>{
    api.post("/grades",data).then(()=>alert("Đã lưu (demo)"));
  };
  return(
    <div className="max-w-xl space-y-2">
      <input className="border p-1 w-full" placeholder="Mã học sinh"
        value={data.student} onChange={e=>setData({...data,student:e.target.value})}/>
      <input className="border p-1 w-full" placeholder="Môn học"
        value={data.subject} onChange={e=>setData({...data,subject:e.target.value})}/>
      <select className="border p-1 w-full" value={data.type}
        onChange={e=>setData({...data,type:e.target.value})}>
        {["Miệng","15P","1 tiết","HK"].map(t=><option key={t}>{t}</option>)}
      </select>
      <input className="border p-1 w-full" placeholder="Điểm"
        value={data.score} onChange={e=>setData({...data,score:e.target.value})}/>
      <button className="bg-blue-600 text-white px-3 py-1" onClick={save}>Lưu</button>
    </div>
  );
}
