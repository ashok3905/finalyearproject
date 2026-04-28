import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";

const signs = [
  { cat: "Mandatory", icon: "🛑", name: "Stop", desc: "Come to a complete stop." },
  { cat: "Mandatory", icon: "🚸", name: "Pedestrian Crossing", desc: "Watch for pedestrians crossing." },
  { cat: "Cautionary", icon: "⚠️", name: "Sharp Curve Ahead", desc: "Reduce speed for an upcoming bend." },
  { cat: "Cautionary", icon: "🚧", name: "Roadwork Ahead", desc: "Slow down — workers or detours present." },
  { cat: "Informatory", icon: "🅿️", name: "Parking", desc: "Designated parking area." },
  { cat: "Informatory", icon: "⛽", name: "Fuel Station", desc: "Petrol pump nearby." },
  { cat: "Mandatory", icon: "↩️", name: "No U-Turn", desc: "U-turn is prohibited." },
  { cat: "Cautionary", icon: "🐄", name: "Cattle Crossing", desc: "Animals may cross — drive carefully." },
  { cat: "Informatory", icon: "🏥", name: "Hospital", desc: "Hospital ahead, no honking." },
];

const cats = ["All", "Mandatory", "Cautionary", "Informatory"];

const TrafficSigns = () => {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const filtered = signs.filter((s) => (cat === "All" || s.cat === cat) && s.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="max-w-6xl">
      <PageHeader title="Traffic Signs Library" subtitle="Learn every sign you'll see on the road" />
      <div className="card-surface p-4 mb-6 flex flex-col md:flex-row gap-3">
        <input placeholder="Search signs..." value={q} onChange={(e) => setQ(e.target.value)} className="flex-1 bg-input border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary" />
        <div className="flex gap-2 flex-wrap">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${cat === c ? "bg-primary text-primary-foreground" : "border border-border hover:border-primary"}`}>{c}</button>
          ))}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((s) => (
          <div key={s.name} className="card-surface p-5 hover:border-primary/50 transition">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl">{s.icon}</div>
              <div>
                <div className="font-semibold">{s.name}</div>
                <div className="text-xs text-primary">{s.cat}</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
        {filtered.length === 0 && <div className="col-span-full text-center text-muted-foreground py-12">No signs match your search.</div>}
      </div>
    </div>
  );
};

export default TrafficSigns;
