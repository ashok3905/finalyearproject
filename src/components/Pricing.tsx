import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "₹3,000",
    features: ["10 driving sessions", "Car or Scooty", "Theory classes", "Progress dashboard"],
    popular: false,
  },
  {
    name: "Standard",
    price: "₹5,500",
    features: ["20 driving sessions", "Both vehicles", "Mock tests", "Progress tracking", "Live GPS"],
    popular: true,
  },
  {
    name: "Premium",
    price: "₹8,000",
    features: ["30 driving sessions", "All features", "AI scheduling", "GPS tracking", "Priority support", "RTO assistance"],
    popular: false,
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Simple, Transparent <span className="text-primary glow-text">Pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg">Choose the plan that fits your learning goals</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`card-surface p-8 relative flex flex-col ${
                p.popular ? "border-primary glow-cyan" : ""
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold tracking-wider">
                  MOST POPULAR
                </span>
              )}
              <h3 className="text-2xl font-display font-bold mb-3">{p.name}</h3>
              <div className="text-5xl font-display font-bold text-primary mb-8">{p.price}</div>
              <ul className="space-y-3 mb-8 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-foreground/90">
                    <Check className="w-5 h-5 text-success flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className={`block text-center py-3 rounded-xl font-semibold transition-all ${
                  p.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary-glow glow-cyan"
                    : "border border-primary text-primary hover:bg-primary/10"
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
