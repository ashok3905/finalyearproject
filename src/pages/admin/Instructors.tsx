import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { toast } from "sonner";
import { register, approveUser } from "@/lib/auth";

interface Row { id: string; name: string; email: string; phone: string; rating: number; students: number; vehicle: string; status: "active" | "leave"; }

const seed: Row[] = [
  { id: "I01", name: "Rajesh Kumar", email: "instructor@neurodrive.com", phone: "9876500001", rating: 4.9, students: 14, vehicle: "Swift", status: "active" },
  { id: "I02", name: "Anita Sharma", email: "anita@neurodrive.com", phone: "9876500002", rating: 4.8, students: 11, vehicle: "Activa", status: "active" },
  { id: "I03", name: "Vikram Singh", email: "vikram@neurodrive.com", phone: "9876500003", rating: 4.7, students: 9, vehicle: "Swift", status: "active" },
  { id: "I04", name: "Meena Iyer", email: "meena@neurodrive.com", phone: "9876500004", rating: 4.6, students: 7, vehicle: "Scooty", status: "leave" },
];

const emptyForm = { name: "", email: "", phone: "", vehicle: "Swift", password: "" };

const Instructors = () => {
  const [rows, setRows] = useState(seed);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const remove = (id: string) => {
    setRows((rs) => rs.filter((r) => r.id !== id));
    toast.success("Instructor removed");
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 6) { toast.error("Password must be at least 6 characters"); return; }

    setSubmitting(true);

    const user = register(form.name, form.email, form.password, "instructor");
    if (!user) { toast.error("An account with that email already exists"); setSubmitting(false); return; }

    // Approve immediately since admin is adding them
    approveUser(form.email);

    const newId = `I${String(rows.length + 1).padStart(2, "0")}`;
    setRows((rs) => [...rs, {
      id: newId,
      name: form.name,
      email: form.email,
      phone: form.phone,
      rating: 5.0,
      students: 0,
      vehicle: form.vehicle,
      status: "active",
    }]);

    toast.success(`Instructor ${form.name} added successfully!`);
    setForm(emptyForm);
    setShowModal(false);
    setSubmitting(false);
  };

  return (
    <div className="max-w-6xl">
      <PageHeader title="Instructors" subtitle={`${rows.length} instructors`} />

      <button onClick={() => setShowModal(true)} className="mb-4 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary-glow transition">
        + Add Instructor
      </button>

      <div className="grid md:grid-cols-2 gap-4">
        {rows.map((r) => (
          <div key={r.id} className="card-surface p-5">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xl">{r.name[0]}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{r.name}</div>
                  <span className={`text-xs px-2 py-1 rounded-full ${r.status === "active" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`}>{r.status}</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">⭐ {r.rating} • {r.vehicle}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{r.email} • {r.phone}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{r.students} active students</div>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => toast.success("Profile opened")} className="text-xs px-3 py-1.5 rounded-lg border border-primary/40 text-primary hover:bg-primary/10">View</button>
                  <button onClick={() => remove(r.id)} className="text-xs px-3 py-1.5 rounded-lg bg-destructive/15 text-destructive hover:bg-destructive/25">Remove</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Instructor Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-background border border-border rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-display font-bold">Add New Instructor</h2>
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
                value={form.vehicle}
                onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
                className="w-full bg-input border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="Swift">Swift</option>
                <option value="Activa">Activa</option>
                <option value="Scooty">Scooty</option>
                <option value="Innova">Innova</option>
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
                  {submitting ? "Adding..." : "Add Instructor"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Instructors;