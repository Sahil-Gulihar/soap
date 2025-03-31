import { useState } from 'react';

export default function EmployeeManagement() {
  // Mock employee data
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Smith', role: 'Production Supervisor', department: 'Production', status: 'active', joinDate: '2022-05-15', contact: '555-1234' },
    { id: 2, name: 'Sarah Johnson', role: 'Quality Control Specialist', department: 'Quality', status: 'active', joinDate: '2022-07-20', contact: '555-2345' },
    { id: 3, name: 'Michael Brown', role: 'Production Operator', department: 'Production', status: 'active', joinDate: '2023-01-10', contact: '555-3456' },
    { id: 4, name: 'Emily Davis', role: 'Inventory Manager', department: 'Logistics', status: 'active', joinDate: '2022-08-05', contact: '555-4567' },
    { id: 5, name: 'David Wilson', role: 'Production Operator', department: 'Production', status: 'active', joinDate: '2023-03-18', contact: '555-5678' },
    { id: 6, name: 'Jennifer Taylor', role: 'Quality Control Specialist', department: 'Quality', status: 'leave', joinDate: '2022-09-12', contact: '555-6789' },
    { id: 7, name: 'Robert Martinez', role: 'Production Operator', department: 'Production', status: 'active', joinDate: '2023-02-22', contact: '555-7890' },
    { id: 8, name: 'Lisa Anderson', role: 'Packaging Specialist', department: 'Packaging', status: 'active', joinDate: '2023-05-08', contact: '555-8901' }
  ]);
  
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    role: '',
    department: '',
    status: 'active',
    contact: ''
  });
  
  // Handle adding new employee
  const handleAddEmployee = (e:any) => {
    e.preventDefault();
    
    const newEmployeeWithId = {
      ...newEmployee,
      id: employees.length + 1,
      joinDate: new Date().toISOString().split('T')[0]
    };
    
    setEmployees([...employees, newEmployeeWithId]);
    setNewEmployee({
      name: '',
      role: '',
      department: '',
      status: 'active',
      contact: ''
    });
    setShowAddForm(false);
  };
  
  // Filter employees based on search term and department filter
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          employee.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || 
                          employee.department.toLowerCase() === filter.toLowerCase() ||
                          employee.status.toLowerCase() === filter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Employee Management</h1>
        <button 
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add New Employee
        </button>
      </div>
      
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Departments</option>
            <option value="Production">Production</option>
            <option value="Quality">Quality</option>
            <option value="Logistics">Logistics</option>
            <option value="Packaging">Packaging</option>
            <option value="active">Active Employees</option>
            <option value="leave">On Leave</option>
          </select>
        </div>
      </div>
      
      {/* Employee Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map(employee => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      employee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {employee.status === 'active' ? 'Active' : 'On Leave'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.joinDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.contact}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Add New Employee Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Add New Employee</h2>
              <button 
                onClick={() => setShowAddForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleAddEmployee} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <input 
                  type="text" 
                  required
                  value={newEmployee.role}
                  onChange={(e) => setNewEmployee({...newEmployee, role: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <select
                  required
                  value={newEmployee.department}
                  onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a department</option>
                  <option value="Production">Production</option>
                  <option value="Quality">Quality</option>
                  <option value="Logistics">Logistics</option>
                  <option value="Packaging">Packaging</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  required
                  value={newEmployee.status}
                  onChange={(e) => setNewEmployee({...newEmployee, status: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="leave">On Leave</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                <input 
                  type="text" 
                  required
                  value={newEmployee.contact}
                  onChange={(e) => setNewEmployee({...newEmployee, contact: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}