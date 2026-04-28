import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSession } from "@/lib/auth";

const badges = [
  { icon: "🎯", name: "First Drive", earned: true },
  { icon: "🅿️", name: "Parallel Parker", earned: true },
  { icon: "🛣️", name: "Highway Ready", earned: false },
  { icon: "📚", name: "Theory Master", earned: true },
  { icon: "⭐", name: "Perfect Week", earned: false },
  { icon: "🎓", name: "Test Ready", earned: false },
];

const StudentHome = () => {
  const session = getSession();
  const navigate = useNavigate();
  const [xp] = useState(750);
  const xpMax = 1000;
  const pct = Math.round((xp / xpMax) * 100);

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="card-surface p-6">
        <h1 className="text-2xl md:text-3xl font-display font-bold">
          Good morning, {session?.name?.split(" ")[0] || "Learner"}! Ready to drive today?
        </h1>
        <p className="text-muted-foreground mt-1">AI-Powered. Road-Proven.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Next Session" value="Tomorrow, 10:30 AM" sub="Rajesh Kumar • Swift" />
        <Stat label="Overall Completion" value="68%" big />
        <Stat label="XP Progress" value="750 XP" big accent />
        <Stat label="Current Level" value="Driver" big />
      </div>

      <div className="card-surface p-6">
        <div className="flex justify-between mb-2 text-sm">
          <span className="text-muted-foreground">Gamification Progress — Level Driver</span>
          <span className="font-semibold">{pct}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-primary-glow" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-xs text-muted-foreground mt-2">{xp} / {xpMax} XP to reach Expert</p>
      </div>

      <div className="card-surface p-6">
        <h2 className="font-display font-bold text-lg mb-4">Achievement Badges</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {badges.map((b) => (
            <div key={b.name} className={`p-4 rounded-xl border text-center transition ${b.earned ? "border-primary/40 bg-primary/5" : "border-border bg-muted/30 opacity-60"}`}>
              <div className="text-3xl mb-2">{b.icon}</div>
              <div className="text-sm font-semibold">{b.name}</div>
              <div className={`text-xs mt-1 ${b.earned ? "text-success" : "text-muted-foreground"}`}>
                {b.earned ? "Earned ✓" : "Locked"}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card-surface p-6">
        <h2 className="font-display font-bold text-lg mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "📅 Book Session", to: "/student/book" },
            { label: "📝 Take Mock Test", to: "/student/mock" },
            { label: "📈 View Progress", to: "/student/progress" },
            { label: "🚦 Traffic Signs", to: "/student/signs" },
          ].map((a) => (
            <button key={a.label} onClick={() => navigate(a.to)} className="px-4 py-2.5 rounded-lg border border-primary/40 text-primary text-sm font-medium hover:bg-primary/10 transition">
              {a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const Stat = ({ label, value, sub, big, accent }: { label: string; value: string; sub?: string; big?: boolean; accent?: boolean }) => (
  <div className="card-surface p-5">
    <div className="text-xs text-muted-foreground mb-1">{label}</div>
    <div className={`font-display font-bold ${big ? "text-3xl" : "text-base"} ${accent ? "text-primary glow-text" : ""}`}>
      {value}
    </div>
    {sub && <div className="text-xs text-muted-foreground mt-1">{sub}</div>}
  </div>
);

export default StudentHome;
