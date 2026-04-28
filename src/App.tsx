import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";

import StudentLayout from "./pages/student/StudentLayout";
import StudentHome from "./pages/student/StudentHome";
import BookSession from "./pages/student/BookSession";
import StudentProgress from "./pages/student/Progress";
import MockTest from "./pages/student/MockTest";
import TrafficSigns from "./pages/student/TrafficSigns";
import LiveTracking from "./pages/student/LiveTracking";
import StudentChat from "./pages/student/Chat";

import InstructorLayout from "./pages/instructor/InstructorLayout";
import InstructorHome from "./pages/instructor/InstructorHome";
import Sessions from "./pages/instructor/Sessions";
import Feedback from "./pages/instructor/Feedback";
import InstructorChat from "./pages/instructor/InstructorChat";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminHome from "./pages/admin/AdminHome";
import Students from "./pages/admin/Students";
import Instructors from "./pages/admin/Instructors";
import Vehicles from "./pages/admin/Vehicles";
import Schedule from "./pages/admin/Schedule";
import Payments from "./pages/admin/Payments";
import Reports from "./pages/admin/Reports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<StudentHome />} />
            <Route path="book" element={<BookSession />} />
            <Route path="progress" element={<StudentProgress />} />
            <Route path="mock" element={<MockTest />} />
            <Route path="signs" element={<TrafficSigns />} />
            <Route path="tracking" element={<LiveTracking />} />
            <Route path="chat" element={<StudentChat />} />
          </Route>

          <Route path="/instructor" element={<InstructorLayout />}>
            <Route index element={<InstructorHome />} />
            <Route path="sessions" element={<Sessions />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="chat" element={<InstructorChat />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
            <Route path="students" element={<Students />} />
            <Route path="instructors" element={<Instructors />} />
            <Route path="vehicles" element={<Vehicles />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="payments" element={<Payments />} />
            <Route path="reports" element={<Reports />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
