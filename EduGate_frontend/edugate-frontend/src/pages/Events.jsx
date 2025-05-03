import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import vi from "date-fns/locale/vi";            // ⬅️ import ESM đúng chuẩn
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

const locales = { vi };                        // hoặc { vi: vi }
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function Events() {
  const [events, setEvents] = useState([
    {
      title: "Thi HK1",
      start: new Date(),
      end: new Date(),
    },
  ]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-3">Lịch sự kiện</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}
