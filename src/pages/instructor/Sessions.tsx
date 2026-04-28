import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { toast } from "sonner";

interface Session { id: string; date: string; time: string; student: string; vehicle: string; status: "upcoming" | "completed" | "cancelled"; }

const initial: Session[] = [
  { id: "1", date: "Apr 28", time: "8:00 AM", student: "Arjun M.", vehicle: "Swift • MH-02-AB-1234", status: "upcoming" },
  { id: "2", date: "Apr 28", time: "11:30 AM", student: "Priya S.", vehicle: "Scooty • MH-02-XY-9876", status: "upcoming" },
  { id: "3", date: "Apr 29", time: "9:00 AM", student: "Sneha R.", vehicle: "Swift", status: "upcoming" },
  { id: "4", date: "Apr 29", time: "2:00 PM", student: "Rahul K.", vehicle: "Activa", status: "upcoming" },
  { id: "5", date: "Apr 30", time: "10:00 AM", student: "Divya T.", vehicle: "Swift", status: "upcoming" },
  { id: "6", date: "May 1", time: "8:00 AM", student: "Vikram P.", vehicle: "Swift", status: "upcoming" },
  { id: "7", date: "May 2", time: "11:00 AM", student: "Arjun M.", vehicle: "Swift • MH-02-AB-1234", status: "upcoming" },
  { id: "8", date: "May 3", time: "3:00 PM", student: "Priya S.", vehicle: "Scooty • MH-02-XY-9876", status: "upcoming" },
  { id: "9", date: "May 4", time: "9:00 AM", student: "Sneha R.", vehicle: "Swift", status: "upcoming" },
  { id: "10", date: "Apr 26", time: "4:30 PM", student: "Rahul K.", vehicle: "Activa", status: "completed" },
  { id: "11", date: "Apr 26", time: "10:00 AM", student: "Divya T.", vehicle: "Swift", status: "completed" },
  { id: "12", date: "Apr 25", time: "6:00 PM", student: "Vikram P.", vehicle: "Swift", status: "cancelled" },
];

const Sessions = () => {
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed" | "cancelled">("all");
  const [list, setList] = useState(initial);

  const filtered = list.filter((s) => filter === "all" || s.status === filter);

  const complete = (id: string) => {
    setList((l) => l.map((s) => s.id === id ? { ...s, status: "completed" } : s));
    toast.success("Session marked as completed");
  };
  const cancel = (id: string) => {
    setList((l) => l.map((s) => s.id === id ? { ...s, status: "cancelled" } : s));
    toast.success("Session cancelled");
  };

  return (
    <div className="max-w-6xl">
      <PageHeader title="My Sessions" subtitle="Manage your bookings and history" />
      <div className="flex gap-2 mb-4 flex-wrap">
        {(["all", "upcoming", "completed", "cancelled"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition ${filter === f ? "bg-primary text-primary-foreground" : "border border-border hover:border-primary"}`}>
            {f}
          </button>
        ))}
      </div>
      <div className="card-surface overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-muted-foreground">
            <tr>
              <th className="text-left p-4">Date & Time</th>
              <th className="text-left p-4">Student</th>
              <th className="text-left p-4">Vehicle</th>
              <th className="text-left p-4">Status</th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-t border-border">
                <td className="p-4">
                  <div className="font-semibold">{s.date}</div>
                  <div className="text-xs text-muted-foreground">{s.time}</div>
                </td>
                <td className="p-4">{s.student}</td>
                <td className="p-4 text-muted-foreground">{s.vehicle}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    s.status === "completed" ? "bg-success/15 text-success" :
                    s.status === "upcoming" ? "bg-primary/15 text-primary" :
                    "bg-destructive/15 text-destructive"
                  }`}>{s.status}</span>
                </td>
                <td className="p-4 text-right">
                  {s.status === "upcoming" && (
                    <div className="flex justify-end gap-2">
                      <button onClick={() => complete(s.id)} className="text-xs px-3 py-1.5 rounded-lg bg-success/15 text-success hover:bg-success/25">Complete</button>
                      <button onClick={() => cancel(s.id)} className="text-xs px-3 py-1.5 rounded-lg bg-destructive/15 text-destructive hover:bg-destructive/25">Cancel</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sessions;