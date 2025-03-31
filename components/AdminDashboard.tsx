import { useState } from 'react';

import Header from './Header';
import ProductionOverview from './ProductionOverview';
import InventoryManagement from './InventoryManagement';
import EmployeeManagement from './EmployeeManagement';
import OrderManagement from './OrderManagement';
import ReportsAnalytics from './ReportsAnalytics';
import Sidebar from './Sidebar';

export default function AdminDashboard({ user, onLogout }:any) {
  const [activeSection, setActiveSection] = useState('overview');
  
  const adminMenuItems = [
    { id: 'overview', label: 'Production Overview', icon: 'chart-pie' },
    { id: 'inventory', label: 'Inventory Management', icon: 'cube' },
    { id: 'employees', label: 'Employee Management', icon: 'users' },
    { id: 'orders', label: 'Order Management', icon: 'shopping-cart' },
    { id: 'reports', label: 'Reports & Analytics', icon: 'chart-bar' }
  ];
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        menuItems={adminMenuItems} 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} onLogout={onLogout} title="Admin Dashboard" />
        
        <main className="flex-1 overflow-y-auto p-4">
          {activeSection === 'overview' && <ProductionOverview />}
          {activeSection === 'inventory' && <InventoryManagement />}
          {activeSection === 'employees' && <EmployeeManagement />}
          {activeSection === 'orders' && <OrderManagement />}
          {activeSection === 'reports' && <ReportsAnalytics />}
        </main>
      </div>
    </div>
  );
}