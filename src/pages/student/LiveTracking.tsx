import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";

const LiveTracking = () => {
  const [pos, setPos] = useState({ x: 20, y: 60 });
  const [speed, setSpeed] = useState(38);
  const [duration, setDuration] = useState(12);

  useEffect(() => {
    const int = setInterval(() => {
      setPos((p) => ({ x: Math.min(80, p.x + Math.random() * 4), y: 60 + Math.sin(Date.now() / 1000) * 10 }));
      setSpeed(30 + Math.round(Math.random() * 25));
      setDuration((d) => d + 1);
    }, 1500);
    return () => clearInterval(int);
  }, []);

  return (
    <div className="max-w-6xl space-y-6">
      <PageHeader title="Live Tracking" subtitle="Real-time location and stats during your active session" />

      <div className="grid md:grid-cols-4 gap-4">
        <Stat label="Status" value="🟢 LIVE" />
        <Stat label="Speed" value={`${speed} km/h`} />
        <Stat label="Duration" value={`${duration} min`} />
        <Stat label="Instructor" value="Rajesh K." />
      </div>

      <div className="card-surface p-2 overflow-hidden">
        <div className="relative w-full h-[420px] rounded-xl overflow-hidden bg-secondary">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="hsl(var(--border))" strokeWidth="0.2" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
            {/* Roads */}
            <line x1="0" y1="60" x2="100" y2="60" stroke="hsl(var(--muted))" strokeWidth="6" />
            <line x1="50" y1="0" x2="50" y2="100" stroke="hsl(var(--muted))" strokeWidth="6" />
            <line x1="0" y1="60" x2="100" y2="60" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeDasharray="2,2" />
            {/* Route trail */}
            <path d={`M 5 60 Q 30 ${60 + Math.sin(Date.now() / 1000) * 5}, ${pos.x} ${pos.y}`} stroke="hsl(var(--primary))" strokeWidth="1" fill="none" strokeDasharray="0.5,0.5" />
            {/* Car marker */}
            <circle cx={pos.x} cy={pos.y} r="2.5" fill="hsl(var(--primary))" className="animate-pulse" />
            <circle cx={pos.x} cy={pos.y} r="5" fill="hsl(var(--primary))" opacity="0.2" />
          </svg>
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-primary/40 text-xs font-medium">
            📍 MG Road, Bangalore
          </div>
        </div>
      </div>

      <div className="card-surface p-6">
        <h2 className="font-display font-bold text-lg mb-3">Trip Log</h2>
        <div className="space-y-2 text-sm">
          {[
            { t: "10:32 AM", e: "Session started near Brigade Road" },
            { t: "10:38 AM", e: "Lane change executed smoothly ✓" },
            { t: "10:45 AM", e: "Roundabout navigated successfully" },
            { t: "10:52 AM", e: "Slight braking detected" },
          ].map((l, i) => (
            <div key={i} className="flex gap-3 p-2 border-b border-border last:border-0">
              <span className="text-muted-foreground font-mono">{l.t}</span>
              <span>{l.e}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="card-surface p-4">
    <div className="text-xs text-muted-foreground mb-1">{label}</div>
    <div className="text-xl font-display font-bold text-primary">{value}</div>
  </div>
);

export default LiveTracking;
