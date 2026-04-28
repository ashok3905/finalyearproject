import { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Send } from "lucide-react";

interface Msg { from: "me" | "them"; text: string; time: string; }

const contacts = [
  { id: "rajesh", name: "Rajesh Kumar", role: "Instructor", online: true, last: "See you at 10:30!" },
  { id: "support", name: "NeuroDrive Support", role: "Support", online: true, last: "How can we help?" },
  { id: "anita", name: "Anita Sharma", role: "Instructor", online: false, last: "Good session today 👍" },
];

const seedMsgs: Record<string, Msg[]> = {
  rajesh: [
    { from: "them", text: "Hi! Ready for tomorrow's session?", time: "9:12 AM" },
    { from: "me", text: "Yes, looking forward to it!", time: "9:14 AM" },
    { from: "them", text: "See you at 10:30!", time: "9:15 AM" },
  ],
  support: [{ from: "them", text: "Hello! How can we help?", time: "Yesterday" }],
  anita: [{ from: "them", text: "Good session today 👍", time: "Mon" }],
};

const Chat = () => {
  const [activeId, setActiveId] = useState("rajesh");
  const [chats, setChats] = useState(seedMsgs);
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chats, activeId]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setChats((c) => ({ ...c, [activeId]: [...(c[activeId] || []), { from: "me", text: draft, time }] }));
    setDraft("");
    setTimeout(() => {
      setChats((c) => ({
        ...c,
        [activeId]: [...(c[activeId] || []), { from: "them", text: "Got it! 👍", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }],
      }));
    }, 900);
  };

  const active = contacts.find((c) => c.id === activeId)!;

  return (
    <div className="max-w-6xl">
      <PageHeader title="Chat" subtitle="Talk to your instructor or support team" />
      <div className="card-surface grid md:grid-cols-[280px_1fr] h-[600px] overflow-hidden">
        <aside className="border-r border-border flex flex-col">
          <div className="p-3 border-b border-border">
            <input placeholder="Search..." className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
          </div>
          <div className="flex-1 overflow-y-auto">
            {contacts.map((c) => (
              <button key={c.id} onClick={() => setActiveId(c.id)} className={`w-full p-3 flex items-center gap-3 text-left border-b border-border hover:bg-secondary/50 transition ${activeId === c.id ? "bg-secondary" : ""}`}>
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">{c.name[0]}</div>
                  {c.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">{c.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{c.last}</div>
                </div>
              </button>
            ))}
          </div>
        </aside>
        <section className="flex flex-col">
          <header className="p-4 border-b border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">{active.name[0]}</div>
            <div>
              <div className="font-semibold">{active.name}</div>
              <div className="text-xs text-muted-foreground">{active.online ? "🟢 Online" : "Offline"} • {active.role}</div>
            </div>
          </header>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {(chats[activeId] || []).map((m, i) => (
              <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] px-4 py-2 rounded-2xl ${m.from === "me" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-secondary rounded-bl-sm"}`}>
                  <div className="text-sm">{m.text}</div>
                  <div className={`text-[10px] mt-1 ${m.from === "me" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{m.time}</div>
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <form onSubmit={send} className="p-3 border-t border-border flex gap-2">
            <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Type a message..." className="flex-1 bg-input border border-border rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary" />
            <button type="submit" className="px-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary-glow transition">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Chat;
