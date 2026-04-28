import { getSession } from "@/lib/auth";

const schedule = [
  { time: "8:00 AM", name: "Arjun M.", car: "Swift • MH-02-AB-1234", status: "confirmed" },
  { time: "11:30 AM", name: "Priya S.", car: "Scooty • MH-02-XY-9876", status: "confirmed" },
  { time: "2:00 PM", name: "Sneha R.", car: "Swift • MH-02-AB-1234", status: "pending" },
  { time: "4:30 PM", name: "Rahul K.", car: "Activa • MH-02-ZZ-5500", status: "confirmed" },
  { time: "6:00 PM", name: "Divya T.", car: "Swift • MH-02-AB-1234", status: "pending" },
];

const students = [
  { name: "Arjun M.", level: "Intermediate", sessions: 12, readiness: 74 },
  { name: "Priya S.", level: "Beginner", sessions: 4, readiness: 32 },
  { name: "Sneha R.", level: "Advanced", sessions: 22, readiness: 88 },
  { name: "Rahul K.", level: "Beginner", sessions: 7, readiness: 45 },
  { name: "Divya T.", level: "Intermediate", sessions: 15, readiness: 67 },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const earnings = [60, 80, 70, 100, 75, 95, 50];

const InstructorHome = () => {
  const session = getSession();
  return (
    <div className="space-y-6 max-w-6xl">
      <div className="card-surface p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold">Instructor Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, {session?.name} 👋</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">{session?.name?.[0] || "R"}</div>
          <div>
            <div className="font-semibold">{session?.name}</div>
            <div className="text-xs text-primary">⭐ 4.9 Rating • Certified Instructor</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <StatBig label="Today's Sessions" value="5" icon="📅" />
        <StatBig label="Earnings This Week" value="₹19,200" icon="💰" />
        <StatBig label="Assigned Students" value="14" icon="🎓" />
        <StatBig label="Sessions This Month" value="62" icon="📊" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card-surface p-6">
          <h2 className="font-display font-bold text-lg mb-4">Today's Schedule</h2>
          <div className="space-y-3">
            {schedule.map((s, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-border bg-secondary/30">
                <div className="w-1 h-12 rounded bg-primary" />
                <div className="text-sm font-semibold w-20">{s.time}</div>
                <div className="flex-1">
                  <div className="font-semibold">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.car}</div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${s.status === "confirmed" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`}>{s.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-surface p-6">
          <h2 className="font-display font-bold text-lg mb-4">Weekly Earnings</h2>
          <div className="flex items-end gap-2 h-48 mb-2">
            {earnings.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-gradient-to-t from-primary to-primary-glow rounded-t" style={{ height: `${v}%` }} />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">{days.map((d) => <span key={d} className="flex-1 text-center">{d}</span>)}</div>
          <div className="mt-4 pt-4 border-t border-border flex justify-between">
            <span className="text-muted-foreground">Total this week</span>
            <span className="font-bold text-primary text-lg">₹19,200</span>
          </div>
        </div>
      </div>

      <div className="card-surface p-6">
        <h2 className="font-display font-bold text-lg mb-4">Assigned Students</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {students.map((s, i) => (
            <div key={i} className="p-4 rounded-lg border border-border bg-secondary/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">{s.name[0]}</div>
                <div className="flex-1">
                  <div className="font-semibold">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.level} • {s.sessions} Sessions</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground">Test Readiness</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full ${s.readiness >= 70 ? "bg-success" : s.readiness >= 50 ? "bg-warning" : "bg-destructive"}`} style={{ width: `${s.readiness}%` }} />
                </div>
                <span className="font-semibold">{s.readiness}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card-surface p-6">
        <h2 className="font-display font-bold text-lg mb-4">💡 Performance Insights</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Insight color="success" title="Top Performer" body="Sneha R. has shown 88% test readiness — recommend RTO booking." />
          <Insight color="warning" title="Needs Attention" body="Priya S. is at 32% — focus on basic steering and lane discipline." />
          <Insight color="primary" title="Session Goal" body="You are 3 sessions away from your weekly target of 25 sessions." />
        </div>
      </div>
    </div>
  );
};

const StatBig = ({ label, value, icon }: { label: string; value: string; icon: string }) => (
  <div className="card-surface p-5 flex items-center justify-between">
    <div>
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className="text-3xl font-display font-bold text-primary">{value}</div>
    </div>
    <div className="text-3xl opacity-60">{icon}</div>
  </div>
);

const Insight = ({ color, title, body }: { color: "success" | "warning" | "primary"; title: string; body: string }) => {
  const map = { success: "border-success/40", warning: "border-warning/40", primary: "border-primary/40" };
  const icons = { success: "🏆", warning: "⚠️", primary: "🎯" };
  return (
    <div className={`p-4 rounded-lg border ${map[color]} bg-secondary/30`}>
      <div className="text-xl mb-2">{icons[color]}</div>
      <div className="font-semibold mb-1">{title}</div>
      <p className="text-sm text-muted-foreground">{body}</p>
    </div>
  );
};

export default InstructorHome;
