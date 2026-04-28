import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, type Role } from "@/lib/auth";
import { toast } from "sonner";

const roles: { id: Role; label: string; icon: string }[] = [
  { id: "student", label: "Student", icon: "🎓" },
  { id: "instructor", label: "Instructor", icon: "👨‍🏫" },
  { id: "admin", label: "Admin", icon: "🛡️" },
];

const Login = () => {
  const [role, setRole] = useState<Role>("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = login(email, password, role);

    if (result === null) {
      toast.error("Invalid credentials. Try the demo account for this role.");
      return;
    }

    if (result === "pending") {
      setPending(true);
      return;
    }

    toast.success(`Welcome back, ${result.name}!`);
    navigate(`/${result.role}`);
  };

  const fillDemo = () => {
    setPending(false);
    if (role === "student") { setEmail("student@neurodrive.com"); setPassword("Student@123"); }
    if (role === "instructor") { setEmail("instructor@neurodrive.com"); setPassword("Instructor@123"); }
    if (role === "admin") { setEmail("admin@neurodrive.com"); setPassword("Admin@123"); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary glow-text">NeuroDrive Academy</h1>
          <p className="text-muted-foreground mt-3">Sign in to continue your learning journey</p>
        </div>

        <div className="card-surface p-6 md:p-8">
          <h2 className="text-2xl font-display font-bold mb-6">Login</h2>

          {/* Pending Approval Message */}
          {pending && (
            <div className="mb-6 p-4 rounded-xl border border-warning/40 bg-warning/10 text-center">
              <div className="text-3xl mb-2">⏳</div>
              <div className="font-bold text-warning text-lg mb-1">Awaiting Admin Approval</div>
              <p className="text-sm text-muted-foreground">
                Your account has been registered successfully. Please wait for the admin to confirm your account before logging in.
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                You will be able to login once your account is approved.
              </p>
            </div>
          )}

          <p className="text-sm text-muted-foreground mb-3">Login as:</p>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => { setRole(r.id); setPending(false); }}
                className={`py-3 rounded-xl border font-semibold transition ${
                  role === r.id
                    ? "bg-primary text-primary-foreground border-primary glow-cyan"
                    : "border-primary/40 text-primary hover:bg-primary/10"
                }`}
              >
                <span className="mr-1.5">{r.icon}</span>{r.label}
              </button>
            ))}
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setPending(false); }}
              className="w-full bg-input border border-border rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setPending(false); }}
              className="w-full bg-input border border-border rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary-glow glow-cyan transition"
            >
              Login →
            </button>
            <button
              type="button"
              onClick={fillDemo}
              className="w-full text-xs text-primary/80 hover:text-primary"
            >
              Use demo {role} credentials
            </button>
          </form>

          <div className="my-6 text-center text-muted-foreground text-sm">— or —</div>

          <p className="text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-semibold hover:underline">Register here</Link>
          </p>
          <Link to="/" className="block text-center text-muted-foreground hover:text-primary mt-4 text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;