import { useState } from "react";
import GradeEntry from "./GradeEntry.jsx";
import GradeReport from "./GradeReport.jsx";

export default function Grades(){
  const [tab,setTab]=useState("entry");
  return(
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-3">Kết quả học tập</h2>
      <div className="space-x-3 mb-3">
        <button className={tab==="entry"?"font-bold":""} onClick={()=>setTab("entry")}>Nhập điểm</button>
        <button className={tab==="report"?"font-bold":""} onClick={()=>setTab("report")}>Báo cáo điểm</button>
      </div>
      {tab==="entry"?<GradeEntry/>:<GradeReport/>}
    </div>
  );
}
