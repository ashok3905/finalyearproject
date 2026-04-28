import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { toast } from "sonner";

interface V { id: string; type: "Car" | "Scooty"; model: string; plate: string; status: "available" | "in-use" | "maintenance"; mileage: number; }

const seed: V[] = [
  { id: "1", type: "Car", model: "Maruti Swift", plate: "MH-02-AB-1234", status: "in-use", mileage: 45200 },
  { id: "2", type: "Car", model: "Hyundai i10", plate: "MH-02-CD-5678", status: "available", mileage: 32100 },
  { id: "3", type: "Scooty", model: "Honda Activa", plate: "MH-02-XY-9876", status: "in-use", mileage: 18400 },
  { id: "4", type: "Scooty", model: "TVS Jupiter", plate: "MH-02-ZZ-5500", status: "maintenance", mileage: 22300 },
  { id: "5", type: "Car", model: "Maruti Alto", plate: "MH-02-EE-1111", status: "available", mileage: 51000 },
];

const Vehicles = () => {
  const [rows, setRows] = useState(seed);

  const cycle = (id: string) => {
    const order: V["status"][] = ["available", "in-use", "maintenance"];
    setRows((rs) => rs.map((r) => r.id === id ? { ...r, status: order[(order.indexOf(r.status) + 1) % 3] } : r));
    toast.success("Vehicle status updated");
  };

  return (
    <div className="max-w-6xl">
      <PageHeader title="Vehicles" subtitle="Fleet management" />
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Stat label="Total Vehicles" value={`${rows.length}`} />
        <Stat label="Available" value={`${rows.filter((r) => r.status === "available").length}`} />
        <Stat label="In Maintenance" value={`${rows.filter((r) => r.status === "maintenance").length}`} />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rows.map((v) => (
          <div key={v.id} className="card-surface p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="text-3xl">{v.type === "Car" ? "🚗" : "🛵"}</div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                v.status === "available" ? "bg-success/15 text-success" : v.status === "in-use" ? "bg-primary/15 text-primary" : "bg-warning/15 text-warning"
              }`}>{v.status}</span>
            </div>
            <div className="font-semibold">{v.model}</div>
            <div className="text-xs text-muted-foreground font-mono">{v.plate}</div>
            <div className="text-xs text-muted-foreground mt-2">Mileage: {v.mileage.toLocaleString()} km</div>
            <button onClick={() => cycle(v.id)} className="mt-3 w-full text-xs py-2 rounded-lg border border-primary/40 text-primary hover:bg-primary/10">Change Status</button>
          </div>
        ))}
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

export default Vehicles;
