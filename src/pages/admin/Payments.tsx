import { PageHeader } from "@/components/PageHeader";
import { toast } from "sonner";

const txns = [
  { id: "TXN-1042", name: "Arjun Mehta", plan: "Standard", amount: 5500, date: "Apr 25, 2026", status: "paid" },
  { id: "TXN-1041", name: "Sneha Reddy", plan: "Premium", amount: 8000, date: "Apr 24, 2026", status: "paid" },
  { id: "TXN-1040", name: "Rahul Kumar", plan: "Standard", amount: 5500, date: "Apr 23, 2026", status: "pending" },
  { id: "TXN-1039", name: "Priya Sharma", plan: "Basic", amount: 3000, date: "Apr 22, 2026", status: "paid" },
  { id: "TXN-1038", name: "Vikram P.", plan: "Premium", amount: 8000, date: "Apr 20, 2026", status: "refunded" },
];

const Payments = () => {
  const total = txns.filter((t) => t.status === "paid").reduce((s, t) => s + t.amount, 0);
  return (
    <div className="max-w-6xl">
      <PageHeader title="Payments" subtitle="Recent transactions and revenue" />
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Stat label="Total Revenue (Apr)" value={`₹${total.toLocaleString()}`} />
        <Stat label="Pending" value={`${txns.filter((t) => t.status === "pending").length}`} />
        <Stat label="Refunds" value={`${txns.filter((t) => t.status === "refunded").length}`} />
      </div>
      <div className="card-surface overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-muted-foreground">
            <tr><th className="text-left p-4">Txn ID</th><th className="text-left p-4">Student</th><th className="text-left p-4">Plan</th><th className="text-right p-4">Amount</th><th className="text-left p-4">Date</th><th className="text-left p-4">Status</th><th></th></tr>
          </thead>
          <tbody>
            {txns.map((t) => (
              <tr key={t.id} className="border-t border-border">
                <td className="p-4 font-mono text-xs">{t.id}</td>
                <td className="p-4 font-semibold">{t.name}</td>
                <td className="p-4"><span className="text-xs px-2 py-1 rounded bg-primary/15 text-primary">{t.plan}</span></td>
                <td className="p-4 text-right font-semibold">₹{t.amount.toLocaleString()}</td>
                <td className="p-4 text-muted-foreground">{t.date}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    t.status === "paid" ? "bg-success/15 text-success" : t.status === "pending" ? "bg-warning/15 text-warning" : "bg-destructive/15 text-destructive"
                  }`}>{t.status}</span>
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => toast.success("Receipt downloaded")} className="text-xs text-primary hover:underline">Receipt</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default Payments;
