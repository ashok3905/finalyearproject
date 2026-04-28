import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";

interface Q { q: string; options: string[]; answer: number; }

const questions: Q[] = [
  { q: "What does a red octagonal sign mean?", options: ["Yield", "Stop", "Go slow", "School zone"], answer: 1 },
  { q: "At an unmarked intersection, who has right of way?", options: ["Vehicle on the left", "Vehicle on the right", "Larger vehicle", "Whoever arrives first"], answer: 1 },
  { q: "What is the speed limit in most Indian residential areas?", options: ["25 km/h", "40 km/h", "50 km/h", "60 km/h"], answer: 1 },
  { q: "A solid yellow line on the road means:", options: ["You may overtake", "No overtaking", "Two-way traffic", "Pedestrian crossing"], answer: 1 },
  { q: "When should you use your hazard lights?", options: ["At night", "While parking", "When stopped due to emergency", "In rain"], answer: 2 },
];

const MockTest = () => {
  const [started, setStarted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const next = () => {
    if (picked === null) return;
    const a = [...answers, picked];
    setAnswers(a);
    setPicked(null);
    if (idx + 1 >= questions.length) setDone(true);
    else setIdx(idx + 1);
  };

  const reset = () => { setStarted(false); setIdx(0); setPicked(null); setAnswers([]); setDone(false); };

  const score = answers.filter((a, i) => a === questions[i].answer).length;

  if (!started) {
    return (
      <div className="max-w-2xl">
        <PageHeader title="Virtual Mock Test" subtitle="Practice RTO-style questions with instant scoring" />
        <div className="card-surface p-8 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-display font-bold mb-2">Ready to begin?</h2>
          <p className="text-muted-foreground mb-6">{questions.length} questions • ~5 minutes • RTO-style</p>
          <button onClick={() => setStarted(true)} className="px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary-glow glow-cyan transition">
            Start Test →
          </button>
        </div>
      </div>
    );
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-2xl">
        <PageHeader title="Test Complete!" />
        <div className="card-surface p-8 text-center">
          <div className="text-6xl mb-4">{pct >= 60 ? "🎉" : "📚"}</div>
          <div className="text-5xl font-display font-bold text-primary glow-text mb-2">{score}/{questions.length}</div>
          <div className="text-muted-foreground mb-6">{pct}% — {pct >= 60 ? "Great job, you passed!" : "Keep practicing!"}</div>
          <div className="space-y-2 mb-6 text-left">
            {questions.map((q, i) => (
              <div key={i} className={`p-3 rounded-lg border ${answers[i] === q.answer ? "border-success/40 bg-success/5" : "border-destructive/40 bg-destructive/5"}`}>
                <div className="text-sm font-semibold">{i + 1}. {q.q}</div>
                <div className="text-xs text-muted-foreground mt-1">Correct: {q.options[q.answer]}</div>
              </div>
            ))}
          </div>
          <button onClick={reset} className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary-glow transition">Try Again</button>
        </div>
      </div>
    );
  }

  const q = questions[idx];
  return (
    <div className="max-w-2xl">
      <PageHeader title="Virtual Mock Test" subtitle={`Question ${idx + 1} of ${questions.length}`} />
      <div className="card-surface p-6">
        <div className="h-2 bg-muted rounded-full overflow-hidden mb-6">
          <div className="h-full bg-primary" style={{ width: `${((idx) / questions.length) * 100}%` }} />
        </div>
        <h2 className="text-xl font-semibold mb-6">{q.q}</h2>
        <div className="space-y-2 mb-6">
          {q.options.map((o, i) => (
            <button key={i} onClick={() => setPicked(i)} className={`w-full text-left p-4 rounded-lg border transition ${picked === i ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}>
              {String.fromCharCode(65 + i)}. {o}
            </button>
          ))}
        </div>
        <button onClick={next} disabled={picked === null} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary-glow disabled:opacity-40 disabled:cursor-not-allowed transition">
          {idx + 1 >= questions.length ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default MockTest;
