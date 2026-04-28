import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { toast } from "sonner";

const instructors = [
  { id: "1", name: "Rajesh Kumar", rating: 4.9, vehicle: "Swift" },
  { id: "2", name: "Anita Sharma", rating: 4.8, vehicle: "Activa" },
  { id: "3", name: "Vikram Singh", rating: 4.7, vehicle: "Swift" },
];
const slots = ["8:00 AM", "10:30 AM", "1:00 PM", "3:30 PM", "6:00 PM"];

const BookSession = () => {
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [instructor, setInstructor] = useState(instructors[0].id);
  const [vehicle, setVehicle] = useState("Car");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !slot) return toast.error("Pick a date and a time slot");
    const inst = instructors.find((i) => i.id === instructor)?.name;
    toast.success(`Booked ${vehicle} session with ${inst} on ${date} at ${slot}`);
    setDate(""); setSlot("");
  };

  return (
    <div className="max-w-4xl">
      <PageHeader title="Book a Session" subtitle="Choose your preferred slot, instructor and vehicle" />
      <form onSubmit={submit} className="card-surface p-6 space-y-5">
        <Field label="Date">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-input border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
        </Field>
        <Field label="Time Slot">
          <div className="flex flex-wrap gap-2">
            {slots.map((s) => (
              <button key={s} type="button" onClick={() => setSlot(s)} className={`px-4 py-2 rounded-lg border text-sm transition ${slot === s ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}>
                {s}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Vehicle">
          <div className="flex gap-2">
            {["Car", "Scooty"].map((v) => (
              <button key={v} type="button" onClick={() => setVehicle(v)} className={`flex-1 px-4 py-2.5 rounded-lg border transition ${vehicle === v ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}>
                {v === "Car" ? "🚗" : "🛵"} {v}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Instructor">
          <div className="space-y-2">
            {instructors.map((i) => (
              <button key={i.id} type="button" onClick={() => setInstructor(i.id)} className={`w-full flex items-center gap-3 p-3 rounded-lg border transition text-left ${instructor === i.id ? "border-primary bg-primary/10" : "border-border hover:border-primary"}`}>
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">{i.name[0]}</div>
                <div className="flex-1">
                  <div className="font-semibold">{i.name}</div>
                  <div className="text-xs text-muted-foreground">⭐ {i.rating} • {i.vehicle}</div>
                </div>
              </button>
            ))}
          </div>
        </Field>
        <button className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary-glow glow-cyan transition">Confirm Booking</button>
      </form>

      <h2 className="font-display font-bold text-lg mt-8 mb-3">Upcoming Sessions</h2>
      <div className="card-surface p-4 space-y-2">
        {[
          { d: "Tomorrow", t: "10:30 AM", i: "Rajesh Kumar", v: "Swift" },
          { d: "Fri, Apr 30", t: "3:30 PM", i: "Anita Sharma", v: "Activa" },
        ].map((s, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border">
            <div>
              <div className="font-semibold">{s.d} • {s.t}</div>
              <div className="text-xs text-muted-foreground">{s.i} • {s.v}</div>
            </div>
            <button onClick={() => toast.success("Session cancelled")} className="text-xs text-destructive hover:underline">Cancel</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-sm font-medium text-muted-foreground mb-2">{label}</label>
    {children}
  </div>
);

export default BookSession;
