import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="container text-center max-w-4xl">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 bg-primary/5 text-primary text-sm font-medium mb-8 animate-fade-up">
          🚀 AI-Powered Driving Education
        </span>
        <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.05] mb-6 animate-fade-up">
          Learn to Drive with{" "}
          <span className="block mt-2">
            <span className="text-primary glow-text">NeuroDrive</span> Academy
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up">
          India's smartest driving school — AI scheduling, live GPS tracking, gamified progress and virtual mock tests, all in one platform.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-up">
          <Link
            to="/register"
            className="px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary-glow transition-all glow-cyan animate-pulse-glow"
          >
            Get Started
          </Link>
          <a
            href="#features"
            className="px-7 py-3.5 rounded-xl border border-primary text-primary font-semibold hover:bg-primary/10 transition-colors"
          >
            Explore Features
          </a>
        </div>
      </div>
    </section>
  );
};
