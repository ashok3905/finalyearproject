// Mock auth using localStorage. No backend.
export type Role = "student" | "instructor" | "admin";

export interface User {
  email: string;
  name: string;
  role: Role;
}

const SEED_USERS: Array<User & { password: string; approved: boolean }> = [
  { email: "student@neurodrive.com", password: "Student@123", name: "Rajesh Kumar", role: "student", approved: true },
  { email: "instructor@neurodrive.com", password: "Instructor@123", name: "Rajesh Kumar", role: "instructor", approved: true },
  { email: "admin@neurodrive.com", password: "Admin@123", name: "Admin", role: "admin", approved: true },
];

const USERS_KEY = "nd_users";
const SESSION_KEY = "nd_session";

function getUsers(): Array<User & { password: string; approved: boolean }> {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) {
    localStorage.setItem(USERS_KEY, JSON.stringify(SEED_USERS));
    return SEED_USERS;
  }
  try {
    const parsed = JSON.parse(raw);
    const merged = [...parsed];
    SEED_USERS.forEach((s) => {
      if (!merged.find((u) => u.email === s.email)) merged.push(s);
    });
    localStorage.setItem(USERS_KEY, JSON.stringify(merged));
    return merged;
  } catch {
    localStorage.setItem(USERS_KEY, JSON.stringify(SEED_USERS));
    return SEED_USERS;
  }
}

export function login(email: string, password: string, role: Role): User | "pending" | null {
  const users = getUsers();
  const u = users.find(
    (x) => x.email.toLowerCase() === email.toLowerCase() && x.password === password && x.role === role
  );
  if (!u) return null;

  // Block unapproved non-demo users
  const demoEmails = ["student@neurodrive.com", "instructor@neurodrive.com", "admin@neurodrive.com"];
  if (!demoEmails.includes(u.email.toLowerCase()) && u.approved === false) {
    return "pending";
  }

  const session: User = { email: u.email, name: u.name, role: u.role };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function register(name: string, email: string, password: string, role: Role): User | null {
  const users = getUsers();
  if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) return null;
  const newUser = { name, email, password, role, approved: false };
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  // Don't create session — wait for admin approval
  return { name, email, role };
}

export function approveUser(email: string): void {
  const users = getUsers();
  const updated = users.map((u) =>
    u.email.toLowerCase() === email.toLowerCase() ? { ...u, approved: true } : u
  );
  localStorage.setItem(USERS_KEY, JSON.stringify(updated));
}

export function getPendingUsers(): Array<User> {
  const users = getUsers();
  const demoEmails = ["student@neurodrive.com", "instructor@neurodrive.com", "admin@neurodrive.com"];
  return users
    .filter((u) => !u.approved && !demoEmails.includes(u.email.toLowerCase()))
    .map(({ name, email, role }) => ({ name, email, role }));
}

export function getSession(): User | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}