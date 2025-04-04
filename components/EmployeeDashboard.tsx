import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ProductionTasks from "./ProductionTasks";
import InventoryView from "./InventoryView";
import Schedule from "./Schedule";
import QualityControl from "./QualityControl";

export default function EmployeeDashboard({ user, onLogout }: any) {
  const [activeSection, setActiveSection] = useState("tasks");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const employeeMenuItems = [
    { id: "tasks", label: "Production Tasks", icon: "clipboard-list" },
    { id: "inventory", label: "Inventory View", icon: "cube" },
    { id: "schedule", label: "Work Schedule", icon: "calendar" },
    { id: "quality", label: "Quality Control", icon: "check-circle" },
  ];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        menuItems={employeeMenuItems}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Header
          user={user}
          onLogout={onLogout}
          title="Employee Dashboard"
          setIsOpen={setSidebarOpen}
        />

        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
          {activeSection === "tasks" && <ProductionTasks />}
          {activeSection === "inventory" && <InventoryView />}
          {activeSection === "schedule" && <Schedule />}
          {activeSection === "quality" && <QualityControl />}
        </main>
      </div>
    </div>
  );
}
