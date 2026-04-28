const monthly = [40, 50, 55, 65, 72, 80];
const monthLabels = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
const sessions = [27, 30, 27, 33, 29, 24, 26];
const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const AdminHome = () => {
  return (
    <div className="space-y-6 max-w-6xl">
      <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Total Students" value="2500+" />
        <Stat label="Active Instructors" value="50+" />
        <Stat label="Today Revenue" value="₹0" />
        <Stat label="Today Sessions" value="1" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card-surface p-6">
          <h2 className="font-display font-bold text-lg mb-4">Monthly Revenue</h2>
          <LineChart data={monthly} labels={monthLabels} />
        </div>
        <div className="card-surface p-6">
          <h2 className="font-display font-bold text-lg mb-4">Sessions Per Day</h2>
          <BarChart data={sessions} labels={dayLabels} />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card-surface p-6">
          <h2 className="font-display font-bold text-lg mb-4">Vehicle Usage</h2>
          <div className="flex items-center justify-center py-6"><PieChart /></div>
          <div className="flex justify-center gap-6 text-sm">
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-primary" />Cars 65%</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-purple-500" />Scooties 35%</span>
          </div>
        </div>
        <div className="card-surface p-6">
          <h2 className="font-display font-bold text-lg mb-4">Upcoming Sessions</h2>
          <div className="space-y-3">
            {[
              { time: "morning • 4/27/2026", status: "upcoming" },
              { time: "afternoon • 4/28/2026", status: "upcoming" },
              { time: "evening • 4/28/2026", status: "scheduled" },
            ].map((s, i) => (
              <div key={i} className="p-3 rounded-lg border border-border bg-secondary/30">
                <div className="font-medium">{s.time}</div>
                <div className="text-xs text-muted-foreground">Status: {s.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="card-surface p-5">
    <div className="text-xs text-muted-foreground mb-1">{label}</div>
    <div className="text-3xl font-display font-bold text-primary">{value}</div>
  </div>
);

const LineChart = ({ data, labels }: { data: number[]; labels: string[] }) => {
  const max = 100;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - (v / max) * 100}`).join(" ");
  return (
    <div className="relative h-48">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
        {[20, 40, 60, 80].map((y) => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="hsl(var(--border))" strokeWidth="0.3" strokeDasharray="1" />
        ))}
        <polyline points={points} fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" />
      </svg>
      <div className="flex justify-between text-xs text-muted-foreground mt-2">{labels.map((l) => <span key={l}>{l}</span>)}</div>
    </div>
  );
};

const BarChart = ({ data, labels }: { data: number[]; labels: string[] }) => {
  const max = Math.max(...data);
  return (
    <div>
      <div className="flex items-end gap-2 h-48">
        {data.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className="text-xs text-muted-foreground">{v}</div>
            <div className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t" style={{ height: `${(v / max) * 100}%` }} />
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-2">{labels.map((l) => <span key={l} className="flex-1 text-xs text-muted-foreground text-center">{l}</span>)}</div>
    </div>
  );
};

const PieChart = () => {
  const r = 60;
  const c = 2 * Math.PI * r;
  const carPct = 0.65;
  return (
    <svg width="160" height="160" viewBox="0 0 160 160" className="-rotate-90">
      <circle cx="80" cy="80" r={r} fill="none" stroke="rgb(168 85 247)" strokeWidth="40" />
      <circle cx="80" cy="80" r={r} fill="none" stroke="hsl(var(--primary))" strokeWidth="40" strokeDasharray={`${c * carPct} ${c}`} />
    </svg>
  );
};

export default AdminHome;
