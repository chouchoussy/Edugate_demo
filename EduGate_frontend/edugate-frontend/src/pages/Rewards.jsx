import { useEffect, useState } from "react";
import api from "../api";
import RewardForm from "../components/RewardForm.jsx";

export default function Rewards(){
  const [items,setItems]=useState([]); const [filter,setFilter]=useState("");
  const [modal,setModal]=useState(false);
  const load=()=>api.get("/rewards").then(r=>setItems(r.data));
  useEffect(load,[]);
  const list=items.filter(i=>!filter||i.type===filter);
  return(<div className="p-4">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">Khen thưởng / Kỷ luật</h2>
      <button className="bg-blue-600 text-white px-3 py-1" onClick={()=>setModal(true)}>+ Thêm</button>
    </div>
    <select className="border p-1 my-3" value={filter} onChange={e=>setFilter(e.target.value)}>
      <option value="">--Tất cả--</option><option value="REWARD">Khen thưởng</option><option value="DISCIPLINE">Kỷ luật</option>
    </select>
    <table><thead><tr><th>Học sinh</th><th>Loại</th><th>Lý do</th><th>Ngày</th></tr></thead>
      <tbody>{list.map((r,i)=><tr key={i}>
        <td>{r.student}</td><td>{r.type}</td><td>{r.reason}</td><td>{r.date}</td>
      </tr>)}</tbody>
    </table>
    {modal && <RewardForm onClose={()=>setModal(false)} onSaved={load}/>}
  </div>);
}
