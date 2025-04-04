import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ProductionOverview from "./ProductionOverview";
import InventoryManagement from "./InventoryManagement";
import EmployeeManagement from "./EmployeeManagement";
import OrderManagement from "./OrderManagement";
import ReportsAnalytics from "./ReportsAnalytics";

export default function AdminDashboard({ user, onLogout }: any) {
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const adminMenuItems = [
    { id: "overview", label: "Production Overview", icon: "chart-pie" },
    { id: "inventory", label: "Inventory Management", icon: "cube" },
    { id: "employees", label: "Employee Management", icon: "users" },
    { id: "orders", label: "Order Management", icon: "shopping-cart" },
    { id: "reports", label: "Reports & Analytics", icon: "chart-bar" },
  ];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        menuItems={adminMenuItems}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Header
          user={user}
          onLogout={onLogout}
          title="Admin Dashboard"
          setIsOpen={setSidebarOpen}
        />

        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
          {activeSection === "overview" && <ProductionOverview />}
          {activeSection === "inventory" && <InventoryManagement />}
          {activeSection === "employees" && <EmployeeManagement />}
          {activeSection === "orders" && <OrderManagement />}
          {activeSection === "reports" && <ReportsAnalytics />}
        </main>
      </div>
    </div>
  );
}
