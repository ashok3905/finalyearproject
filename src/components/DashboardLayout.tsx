import { ReactNode } from "react";
import { NavLink, useNavigate, Navigate } from "react-router-dom";
import { getSession, logout, type Role } from "@/lib/auth";
import { LogOut } from "lucide-react";

interface NavItem { to: string; label: string; icon: string; }

interface Props {
  role: Role;
  navItems: NavItem[];
  children: ReactNode;
}

export const DashboardLayout = ({ role, navItems, children }: Props) => {
  const navigate = useNavigate();
  const session = getSession();

  if (!session || session.role !== role) {
    return <Navigate to="/login" replace />;
  }

  const onLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-60 bg-sidebar border-r border-sidebar-border flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-lg font-display font-bold text-primary glow-text">NeuroDrive</h1>
          <p className="text-xs text-muted-foreground mt-1">AI-Powered Academy</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-primary/15 text-primary border border-primary/30"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-primary"
                }`
              }
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
};
