import { PageHeader } from "@/components/PageHeader";
import { getSession } from "@/lib/auth";

const demoEmails = ["student@neurodrive.com"];

const demoSkills = [
  { name: "Steering", value: 85 },
  { name: "Parking", value: 72 },
  { name: "Lane Discipline", value: 90 },
  { name: "Traffic Signs", value: 95 },
  { name: "Highway Driving", value: 60 },
  { name: "Reverse", value: 78 },
];

const zeroSkills = [
  { name: "Steering", value: 0 },
  { name: "Parking", value: 0 },
  { name: "Lane Discipline", value: 0 },
  { name: "Traffic Signs", value: 0 },
  { name: "Highway Driving", value: 0 },
  { name: "Reverse", value: 0 },
];

const demoHistory = [
  { date: "Apr 25", skill: "Parallel Parking", score: 88, xp: 50 },
  { date: "Apr 23", skill: "Highway Merge", score: 76, xp: 40 },
  { date: "Apr 21", skill: "Roundabout", score: 92, xp: 60 },
  { date: "Apr 19", skill: "City Driving", score: 81, xp: 45 },
];

const Progress = () => {
  const session = getSession();
  const isNewStudent = !demoEmails.includes(session?.email?.toLowerCase() || "");

  const skills = isNewStudent ? zeroSkills : demoSkills;
  const history = isNewStudent ? [] : demoHistory;

  const totalXP = isNewStudent ? 0 : 750;
  const sessions = isNewStudent ? 0 : 14;
  const readiness = isNewStudent ? 0 : 68;
  const passProbability = isNewStudent ? 0 : 82;

  return (
    <div className="space-y-6 max-w-6xl">
      <PageHeader title="My Progress" subtitle="Skill breakdown, XP history and predictions" />

      {isNewStudent && (
        <div className="p-4 rounded-xl border border-primary/30 bg-primary/10 text-center">
          <div className="text-2xl mb-1">🎓</div>
          <div className="font-semibold text-primary">Welcome to NeuroDrive!</div>
          <p className="text-sm text-muted-foreground mt-1">Your progress will appear here once your sessions begin.</p>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        <Stat label="Total XP" value={`${totalXP}`} />
        <Stat label="Sessions Completed" value={`${sessions}`} />
        <Stat label="Test Readiness" value={`${readiness}%`} />
      </div>

      <div className="card-surface p-6">
        <h2 className="font-display font-bold text-lg mb-4">Skill Breakdown</h2>
        <div className="space-y-3">
          {skills.map((s) => (
            <div key={s.name}>
              <div className="flex justify-between text-sm mb-1">
                <span>{s.name}</span>
                <span className="font-semibold text-primary">{s.value}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-primary-glow" style={{ width: `${s.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card-surface p-6">
        <h2 className="font-display font-bold text-lg mb-4">Recent Activity</h2>
        {history.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <div className="text-3xl mb-2">📋</div>
            <p>No sessions completed yet.</p>
            <p className="text-xs mt-1">Your activity will show up here after your first session.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-muted-foreground border-b border-border">
              <tr><th className="text-left py-2">Date</th><th className="text-left py-2">Skill</th><th className="text-right py-2">Score</th><th className="text-right py-2">XP</th></tr>
            </thead>
            <tbody>
              {history.map((h, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="py-3">{h.date}</td>
                  <td className="py-3">{h.skill}</td>
                  <td className="py-3 text-right font-semibold">{h.score}</td>
                  <td className="py-3 text-right text-primary">+{h.xp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="card-surface p-6">
        <h2 className="font-display font-bold text-lg mb-2">🎯 RTO Test Prediction</h2>
        <p className="text-muted-foreground mb-4">Based on your skill profile, our AI estimates:</p>
        {isNewStudent ? (
          <div>
            <div className="text-4xl font-display font-bold text-muted-foreground">—</div>
            <p className="text-xs text-muted-foreground mt-2">Complete at least one session to get your prediction.</p>
          </div>
        ) : (
          <div>
            <div className="text-4xl font-display font-bold text-primary glow-text">{passProbability}% pass probability</div>
            <p className="text-xs text-muted-foreground mt-2">Practice highway driving to boost this further.</p>
          </div>
        )}
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

export default Progress;