import { useState } from "react";
import api from "../api";

export default function RewardForm({onClose,onSaved}){
  const [data,setData]=useState({student:"",type:"REWARD",reason:"",date:new Date().toISOString().slice(0,10)});
  const save=()=>api.post("/rewards",data).then(()=>{onSaved();onClose();});
  return(
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-4 rounded w-96 space-y-2">
        <h3 className="text-lg font-bold">Thêm khen thưởng/kỷ luật</h3>
        <input className="border p-1 w-full" placeholder="Học sinh" value={data.student}
          onChange={e=>setData({...data,student:e.target.value})}/>
        <select className="border p-1 w-full" value={data.type}
          onChange={e=>setData({...data,type:e.target.value})}>
          <option value="REWARD">Khen thưởng</option><option value="DISCIPLINE">Kỷ luật</option>
        </select>
        <textarea className="border p-1 w-full h-24" placeholder="Lý do"
          value={data.reason} onChange={e=>setData({...data,reason:e.target.value})}/>
        <input type="date" className="border p-1 w-full" value={data.date}
          onChange={e=>setData({...data,date:e.target.value})}/>
        <div className="text-right space-x-2">
          <button onClick={onClose}>Huỷ</button>
          <button onClick={save} className="bg-blue-600 text-white px-3 py-1">Lưu</button>
        </div>
      </div>
    </div>
  );
}
