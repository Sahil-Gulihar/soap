"use client";
import { useState } from "react";
import Login from "../components/Login";
import AdminDashboard from "../components/AdminDashboard";
import EmployeeDashboard from "../components/EmployeeDashboard";

interface User {
  role: string;
  // other user properties
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <main className="min-h-screen bg-gray-100">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : user.role === "admin" ? (
        <AdminDashboard user={user} onLogout={handleLogout} />
      ) : (
        <EmployeeDashboard user={user} onLogout={handleLogout} />
      )}
    </main>
  );
}
