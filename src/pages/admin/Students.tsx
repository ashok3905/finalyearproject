import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { toast } from "sonner";
import { register } from "@/lib/auth";

interface Row { id: string; name: string; email: string; phone: string; plan: string; sessions: number; status: "active" | "inactive"; }

const seed: Row[] = [
  { id: "S001", name: "Arjun Mehta", email: "arjun@mail.com", phone: "9876543210", plan: "Standard", sessions: 12, status: "active" },
  { id: "S002", name: "Priya Sharma", email: "priya@mail.com", phone: "9123456780", plan: "Basic", sessions: 4, status: "active" },
  { id: "S003", name: "Sneha Reddy", email: "sneha@mail.com", phone: "9988776655", plan: "Premium", sessions: 22, status: "active" },
  { id: "S004", name: "Rahul Kumar", email: "rahul@mail.com", phone: "9090909090", plan: "Standard", sessions: 7, status: "active" },
  { id: "S005", name: "Divya Tripathi", email: "divya@mail.com", phone: "8888777766", plan: "Premium", sessions: 15, status: "inactive" },
];

const emptyForm = { name: "", email: "", phone: "", plan: "Standard", password: "" };

const Students = () => {
  const [rows, setRows] = useState(seed);
  const [q, setQ] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const filtered = rows.filter((r) => r.name.toLowerCase().includes(q.toLowerCase()) || r.email.includes(q.toLowerCase()));

  const toggle = (id: string) => {
    setRows((rs) => rs.map((r) => r.id === id ? { ...r, status: r.status === "active" ? "inactive" : "active" } : r));
    toast.success("Student status updated");
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 6) { toast.error("Password must be at least 6 characters"); return; }

    setSubmitting(true);

    // Register in auth (approved by admin so mark approved)
    const user = register(form.name, form.email, form.password, "student");
    if (!user) { toast.error("An account with that email already exists"); setSubmitting(false); return; }

    // Approve the user directly since admin is adding them
    const { approveUser } = await import("@/lib/auth");
    approveUser(form.email);

    // Add to local table
    const newId = `S${String(rows.length + 1).padStart(3, "0")}`;
    setRows((rs) => [...rs, { id: newId, name: form.name, email: form.email, phone: form.phone, plan: form.plan, sessions: 0, status: "active" }]);

    toast.success(`Student ${form.name} added successfully!`);
    setForm(emptyForm);
    setShowModal(false);
    setSubmitting(false);
  };

  return (
    <div className="max-w-6xl">
      <PageHeader title="Students" subtitle={`${rows.length} registered students`} />

      <div className="flex gap-3 mb-4">
        <input placeholder="Search students..." value={q} onChange={(e) => setQ(e.target.value)} className="flex-1 bg-input border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary" />
        <button onClick={() => setShowModal(true)} className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary-glow transition">+ Add Student</button>
        <button onClick={() => toast.success("Export started")} className="px-4 py-2.5 rounded-lg border border-primary text-primary hover:bg-primary/10 transition">Export CSV</button>
      </div>

      <div className="card-surface overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-muted-foreground">
            <tr><th className="text-left p-4">ID</th><th className="text-left p-4">Name</th><th className="text-left p-4">Contact</th><th className="text-left p-4">Plan</th><th className="text-right p-4">Sessions</th><th className="text-left p-4">Status</th><th></th></tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-t border-border">
                <td className="p-4 font-mono text-xs text-muted-foreground">{r.id}</td>
                <td className="p-4 font-semibold">{r.name}</td>
                <td className="p-4"><div>{r.email}</div><div className="text-xs text-muted-foreground">{r.phone}</div></td>
                <td className="p-4"><span className="text-xs px-2 py-1 rounded bg-primary/15 text-primary">{r.plan}</span></td>
                <td className="p-4 text-right">{r.sessions}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${r.status === "active" ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>{r.status}</span>
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => toggle(r.id)} className="text-xs text-primary hover:underline">Toggle</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Student Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-background border border-border rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-display font-bold">Add New Student</h2>
              <button onClick={() => { setShowModal(false); setForm(emptyForm); }} className="text-muted-foreground hover:text-foreground text-xl">✕</button>
            </div>
            <form onSubmit={handleAdd} className="space-y-3">
              <input
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full bg-input border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full bg-input border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <input
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                className="w-full bg-input border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <select
                value={form.plan}
                onChange={(e) => setForm({ ...form, plan: e.target.value })}
                className="w-full bg-input border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="Basic">Basic</option>
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
              </select>
              <input
                type="password"
                placeholder="Set Password (min 6 characters)"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="w-full bg-input border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => { setShowModal(false); setForm(emptyForm); }} className="flex-1 py-3 rounded-xl border border-border text-muted-foreground hover:border-primary transition">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary-glow transition disabled:opacity-60">
                  {submitting ? "Adding..." : "Add Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;