import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

export default function PetitionDetail(){
  const {id}=useParams(); const [pet,setPet]=useState(null);
  useEffect(()=>{ api.get("/petitions/"+id).then(r=>setPet(r.data)); },[id]);
  if(!pet) return <p className="p-4">Đang tải...</p>;
  return(<div className="p-4 max-w-2xl">
    <h2 className="text-xl font-semibold mb-2">{pet.title}</h2>
    <p className="mb-4 whitespace-pre-line">{pet.content}</p>
    <p>Trạng thái: {pet.status||"Đã gửi"}</p>
  </div>);
}
