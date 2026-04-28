import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { toast } from "sonner";
import { Star } from "lucide-react";

const reviews = [
  { name: "Arjun M.", rating: 5, date: "Apr 25", text: "Rajesh sir is very patient and explains every concept clearly. Highly recommend!" },
  { name: "Sneha R.", rating: 5, date: "Apr 24", text: "Best instructor! I cleared my RTO test in first attempt thanks to him." },
  { name: "Rahul K.", rating: 4, date: "Apr 22", text: "Great teaching style, very friendly. Could focus a bit more on highway driving." },
  { name: "Divya T.", rating: 5, date: "Apr 20", text: "Felt confident from day one. Excellent guidance throughout." },
];

const students = [
  { id: "1", name: "Arjun M.", readiness: 74 },
  { id: "2", name: "Priya S.", readiness: 32 },
  { id: "3", name: "Sneha R.", readiness: 88 },
];

const Feedback = () => {
  const [studentId, setStudentId] = useState(students[0].id);
  const [score, setScore] = useState(4);
  const [note, setNote] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return toast.error("Please add a note");
    toast.success("Feedback recorded for student");
    setNote("");
  };

  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="max-w-5xl space-y-6">
      <PageHeader title="Student Feedback" subtitle="Reviews you've received and notes you give" />

      <div className="grid md:grid-cols-3 gap-4">
        <Stat label="Overall Rating" value={`⭐ ${avg}`} />
        <Stat label="Total Reviews" value={`${reviews.length}`} />
        <Stat label="5-Star Reviews" value={`${reviews.filter((r) => r.rating === 5).length}`} />
      </div>

      <div className="card-surface p-6">
        <h2 className="font-display font-bold text-lg mb-4">Reviews from Students</h2>
        <div className="space-y-3">
          {reviews.map((r, i) => (
            <div key={i} className="p-4 rounded-lg border border-border bg-secondary/30">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">{r.name[0]}</div>
                  <div>
                    <div className="font-semibold text-sm">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.date}</div>
                  </div>
                </div>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < r.rating ? "fill-warning text-warning" : "text-muted"}`} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{r.text}</p>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={submit} className="card-surface p-6 space-y-4">
        <h2 className="font-display font-bold text-lg">Give Feedback to a Student</h2>
        <select value={studentId} onChange={(e) => setStudentId(e.target.value)} className="w-full bg-input border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary">
          {students.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <div>
          <div className="text-sm text-muted-foreground mb-2">Performance Score</div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" onClick={() => setScore(n)}>
                <Star className={`w-7 h-7 ${n <= score ? "fill-warning text-warning" : "text-muted"}`} />
              </button>
            ))}
          </div>
        </div>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={4} placeholder="Notes for the student..." className="w-full bg-input border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary resize-none" />
        <button className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary-glow glow-cyan transition">Submit Feedback</button>
      </form>
    </div>
  );
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="card-surface p-5">
    <div className="text-xs text-muted-foreground mb-1">{label}</div>
    <div className="text-3xl font-display font-bold text-primary">{value}</div>
  </div>
);

export default Feedback;
