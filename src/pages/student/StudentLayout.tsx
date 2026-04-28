import { Outlet } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";

const navItems = [
  { to: "/student", label: "Dashboard", icon: "📊" },
  { to: "/student/book", label: "Book Session", icon: "📅" },
  { to: "/student/progress", label: "My Progress", icon: "📈" },
  { to: "/student/mock", label: "Mock Test", icon: "📝" },
  { to: "/student/signs", label: "Traffic Signs", icon: "🚦" },
  { to: "/student/tracking", label: "Live Tracking", icon: "📍" },
  { to: "/student/chat", label: "Chat", icon: "💬" },
];

const StudentLayout = () => (
  <DashboardLayout role="student" navItems={navItems}>
    <Outlet />
  </DashboardLayout>
);

export default StudentLayout;
