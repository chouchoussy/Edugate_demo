import { useEffect, useState } from "react";
import api from "../api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function GradeReport(){
  const [data,setData]=useState([]);
  useEffect(()=>{ api.get("/grades").then(r=>setData(r.data)); },[]);
  // gộp điểm trung bình demo
  const agg = {};
  data.forEach(g=>{
    const key=g.student+"-"+g.subject;
    agg[key]=agg[key]||{name:key,avg:0,c:0};
    agg[key].avg+=Number(g.score); agg[key].c+=1;
  });
  const chartData=Object.values(agg).map(o=>({...o,avg:o.avg/o.c}));
  return(
    <div>
      <h3 className="font-semibold mb-2">Biểu đồ trung bình (demo)</h3>
      <BarChart width={600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name"/><YAxis/>
        <Tooltip/><Bar dataKey="avg" />
      </BarChart>
    </div>
  );
}
