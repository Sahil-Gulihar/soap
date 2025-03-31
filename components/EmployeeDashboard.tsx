import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ProductionTasks from "./ProductionTasks";
import InventoryView from "./InventoryView";
import Schedule from "./Schedule";
import QualityControl from "./QualityControl";

export default function EmployeeDashboard({ user, onLogout }:any) {
  const [activeSection, setActiveSection] = useState("tasks");

  const employeeMenuItems = [
    { id: "tasks", label: "Production Tasks", icon: "clipboard-list" },
    { id: "inventory", label: "Inventory View", icon: "cube" },
    { id: "schedule", label: "Work Schedule", icon: "calendar" },
    { id: "quality", label: "Quality Control", icon: "check-circle" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        menuItems={employeeMenuItems}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} onLogout={onLogout} title="Employee Dashboard" />

        <main className="flex-1 overflow-y-auto p-4">
          {activeSection === "tasks" && <ProductionTasks />}
          {activeSection === "inventory" && <InventoryView />}
          {activeSection === "schedule" && <Schedule />}
          {activeSection === "quality" && <QualityControl />}
        </main>
      </div>
    </div>
  );
}
