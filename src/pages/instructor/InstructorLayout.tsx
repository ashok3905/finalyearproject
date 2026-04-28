import { Outlet } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";

const navItems = [
  { to: "/instructor", label: "Dashboard", icon: "📊" },
  { to: "/instructor/sessions", label: "My Sessions", icon: "📅" },
  { to: "/instructor/feedback", label: "Student Feedback", icon: "💬" },
  { to: "/instructor/chat", label: "Chat", icon: "💭" },
];

const InstructorLayout = () => (
  <DashboardLayout role="instructor" navItems={navItems}>
    <Outlet />
  </DashboardLayout>
);

export default InstructorLayout;
