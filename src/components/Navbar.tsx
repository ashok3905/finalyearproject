import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="text-xl md:text-2xl font-display font-bold text-primary glow-text">
          NeuroDrive Academy
        </Link>
        <Link
          to="/login"
          className="px-5 py-2 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          Login
        </Link>
      </div>
    </header>
  );
};
