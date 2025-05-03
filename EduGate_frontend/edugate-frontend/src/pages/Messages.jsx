import { useState } from "react";

export default function Messages(){
  const chats=[{id:1,name:"Lớp 12A1"},{id:2,name:"Phụ huynh bé Lan"}];
  const [sel,setSel]=useState(chats[0]); const [msg,setMsg]=useState("");
  const [logs,setLogs]=useState({});
  const send=()=>{ if(!msg) return; setLogs({...logs,[sel.id]:(logs[sel.id]||[]).concat({me:true,txt:msg})});setMsg("");};
  const msgs=logs[sel.id]||[];
  return(
    <div className="flex h-full">
      <aside className="w-60 border-r">
        {chats.map(c=>(
          <div key={c.id} className={"p-2 cursor-pointer "+(c.id===sel.id?"bg-blue-50":"")}
               onClick={()=>setSel(c)}>{c.name}</div>
        ))}
      </aside>
      <main className="flex-1 flex flex-col">
        <div className="flex-1 p-3 overflow-y-auto">
          {msgs.map((m,i)=><div key={i} className={"mb-1 "+(m.me?"text-right":"")}>{m.txt}</div>)}
        </div>
        <div className="p-2 border-t flex">
          <input className="border flex-1 p-2" value={msg} onChange={e=>setMsg(e.target.value)}/>
          <button className="bg-blue-600 text-white px-4 ml-2" onClick={send}>Gửi</button>
        </div>
      </main>
    </div>
  );
}
