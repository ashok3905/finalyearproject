import { PageHeader } from "@/components/PageHeader";

const slots = ["8 AM", "10 AM", "12 PM", "2 PM", "4 PM", "6 PM"];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// random-ish bookings
const cells: Record<string, { who: string; vehicle: string }> = {
  "Mon-8 AM": { who: "Arjun M.", vehicle: "Swift" },
  "Mon-10 AM": { who: "Priya S.", vehicle: "Activa" },
  "Tue-2 PM": { who: "Sneha R.", vehicle: "Swift" },
  "Wed-4 PM": { who: "Rahul K.", vehicle: "i10" },
  "Thu-12 PM": { who: "Divya T.", vehicle: "Swift" },
  "Fri-6 PM": { who: "Vikram P.", vehicle: "Jupiter" },
  "Sat-10 AM": { who: "Arjun M.", vehicle: "Swift" },
  "Sat-2 PM": { who: "Sneha R.", vehicle: "Swift" },
};

const Schedule = () => {
  return (
    <div className="max-w-6xl">
      <PageHeader title="Master Schedule" subtitle="Weekly view of all sessions" />
      <div className="card-surface p-4 overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr>
              <th className="p-2"></th>
              {days.map((d) => <th key={d} className="p-2 text-muted-foreground font-medium">{d}</th>)}
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <tr key={slot}>
                <td className="p-2 text-muted-foreground font-medium text-xs">{slot}</td>
                {days.map((d) => {
                  const cell = cells[`${d}-${slot}`];
                  return (
                    <td key={d} className="p-1">
                      {cell ? (
                        <div className="p-2 rounded-lg bg-primary/10 border border-primary/30">
                          <div className="text-xs font-semibold truncate">{cell.who}</div>
                          <div className="text-[10px] text-muted-foreground truncate">{cell.vehicle}</div>
                        </div>
                      ) : (
                        <div className="p-2 rounded-lg border border-dashed border-border h-12" />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schedule;
