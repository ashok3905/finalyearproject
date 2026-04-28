import { Outlet } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: "📊" },
  { to: "/admin/students", label: "Students", icon: "🎓" },
  { to: "/admin/instructors", label: "Instructors", icon: "👨‍🏫" },
  { to: "/admin/vehicles", label: "Vehicles", icon: "🚗" },
  { to: "/admin/schedule", label: "Schedule", icon: "📅" },
  { to: "/admin/payments", label: "Payments", icon: "💳" },
  { to: "/admin/reports", label: "Reports", icon: "📈" },
];

const AdminLayout = () => (
  <DashboardLayout role="admin" navItems={navItems}>
    <Outlet />
  </DashboardLayout>
);

export default AdminLayout;
