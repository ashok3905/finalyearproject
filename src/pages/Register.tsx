import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register, type Role } from "@/lib/auth";
import { toast } from "sonner";

const roles: { id: Role; label: string; icon: string }[] = [
  { id: "student", label: "Student", icon: "🎓" },
  { id: "instructor", label: "Instructor", icon: "👨‍🏫" },
];

const Register = () => {
  const [role, setRole] = useState<Role>("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) return toast.error("Password must be at least 6 characters");
    if (password !== confirm) return toast.error("Passwords don't match");
    const user = register(name, email, password, role);
    if (!user) return toast.error("An account with that email already exists");

    setSubmitting(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "bb4f6c8b-1688-4439-bcee-a525ad993a2b",
          subject: `New NeuroDrive Registration — ${role}`,
          from_name: "NeuroDrive Academy",
          name,
          email,
          phone,
          role,
          message: `New ${role} registered:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Email send failed");
      toast.success("Account created! Confirmation email sent 📧");
    } catch (err) {
      console.error(err);
      toast.success("Account created! 🚀");
      toast.error("Could not send confirmation email");
    } finally {
      setSubmitting(false);
      navigate(`/${user.role}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary glow-text">NeuroDrive Academy</h1>
          <p className="text-muted-foreground mt-3">Create your account to get started</p>
        </div>

        <div className="card-surface p-6 md:p-8">
          <h2 className="text-2xl font-display font-bold mb-6">Register</h2>
          <p className="text-sm text-muted-foreground mb-3">I am registering as a:</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
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
            <input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required
              className="w-full bg-input border border-border rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full bg-input border border-border rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
            <input placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-input border border-border rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
            <input type="password" placeholder="Password (min 6 characters)" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full bg-input border border-border rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
            <input type="password" placeholder="Confirm Password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required
              className="w-full bg-input border border-border rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
            <button type="submit" disabled={submitting} className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary-glow glow-cyan transition disabled:opacity-60">
              {submitting ? "Creating Account..." : "Create Account 🚀"}
            </button>
          </form>

          <p className="text-center text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">Login here</Link>
          </p>
          <Link to="/" className="block text-center text-muted-foreground hover:text-primary mt-4 text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
