import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import PetitionForm from "../components/PetitionForm.jsx";

export default function Petitions(){
  const [items,setItems]=useState([]); const [modal,setModal]=useState(false);
  const load=()=>api.get("/petitions").then(r=>setItems(r.data));
  useEffect(load,[]);
  return(<div className="p-4">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">Đơn kiến nghị</h2>
      <button className="bg-blue-600 text-white px-3 py-1" onClick={()=>setModal(true)}>+ Tạo</button>
    </div>
    <table className="mt-3"><thead><tr><th>Tiêu đề</th><th>Trạng thái</th></tr></thead>
      <tbody>{items.map(p=>(
        <tr key={p.id}>
          <td><Link className="text-blue-600 underline" to={p.id}>{p.title}</Link></td>
          <td>{p.status||"Đã gửi"}</td>
        </tr>
      ))}</tbody>
    </table>
    {modal && <PetitionForm onClose={()=>setModal(false)} onSaved={load}/>}
  </div>);
}
