import { PageHeader } from "@/components/PageHeader";
import { toast } from "sonner";

const reports = [
  { name: "Revenue Report", desc: "Monthly revenue breakdown by plan", icon: "💰" },
  { name: "Student Performance", desc: "Test readiness across all students", icon: "📈" },
  { name: "Instructor Earnings", desc: "Per-instructor earnings & sessions", icon: "👨‍🏫" },
  { name: "Vehicle Utilization", desc: "Hours used per vehicle", icon: "🚗" },
  { name: "RTO Pass Rate", desc: "Pass/fail stats over the last 6 months", icon: "🎯" },
  { name: "Cancellation Analysis", desc: "Cancellation reasons and trends", icon: "❌" },
];

const Reports = () => {
  return (
    <div className="max-w-6xl">
      <PageHeader title="Reports" subtitle="Generate and download reports" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((r) => (
          <div key={r.name} className="card-surface p-6 hover:border-primary/50 transition">
            <div className="text-3xl mb-3">{r.icon}</div>
            <h3 className="font-display font-bold mb-1">{r.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{r.desc}</p>
            <div className="flex gap-2">
              <button onClick={() => toast.success(`${r.name} generated`)} className="flex-1 text-xs py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary-glow">Generate</button>
              <button onClick={() => toast.success(`${r.name} downloaded as PDF`)} className="text-xs py-2 px-3 rounded-lg border border-primary/40 text-primary hover:bg-primary/10">PDF</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
