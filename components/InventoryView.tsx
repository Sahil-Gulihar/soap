import { useState } from 'react';

export default function InventoryView() {
  // Mock inventory data (read-only for employees)
  const [inventory] = useState([
    { id: 1, name: 'Olive Oil', category: 'Base Oil', stock: 350, unit: 'liters', reorderLevel: 100, lastUpdated: '2025-03-28' },
    { id: 2, name: 'Coconut Oil', category: 'Base Oil', stock: 280, unit: 'liters', reorderLevel: 100, lastUpdated: '2025-03-29' },
    { id: 3, name: 'Shea Butter', category: 'Butter', stock: 120, unit: 'kg', reorderLevel: 50, lastUpdated: '2025-03-30' },
    { id: 4, name: 'Lavender Essential Oil', category: 'Essential Oil', stock: 25, unit: 'liters', reorderLevel: 10, lastUpdated: '2025-03-25' },
    { id: 5, name: 'Peppermint Essential Oil', category: 'Essential Oil', stock: 18, unit: 'liters', reorderLevel: 10, lastUpdated: '2025-03-27' },
    { id: 6, name: 'Citric Acid', category: 'Chemical', stock: 75, unit: 'kg', reorderLevel: 30, lastUpdated: '2025-03-28' },
    { id: 7, name: 'Sodium Hydroxide', category: 'Chemical', stock: 45, unit: 'kg', reorderLevel: 20, lastUpdated: '2025-03-29' },
    { id: 8, name: 'Packaging Boxes', category: 'Packaging', stock: 1200, unit: 'pieces', reorderLevel: 500, lastUpdated: '2025-03-30' },
    { id: 9, name: 'Label Stickers', category: 'Packaging', stock: 2500, unit: 'pieces', reorderLevel: 1000, lastUpdated: '2025-03-30' }
  ]);
  
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestItem, setRequestItem] = useState({
    itemId: '',
    name: '',
    quantity: '',
    unit: '',
    urgency: 'normal',
    notes: ''
  });
  
  // Filter inventory based on search term and category filter
  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || 
                          (filter === 'low' && item.stock <= item.reorderLevel) ||
                          item.category.toLowerCase() === filter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });
  
  const handleRequestItem = (item: { id: any; name: any; category?: string; stock?: number; unit: any; reorderLevel?: number; lastUpdated?: string; }) => {
    setRequestItem({
      itemId: item.id,
      name: item.name,
      quantity: '',
      unit: item.unit,
      urgency: 'normal',
      notes: ''
    });
    setShowRequestForm(true);
  };
  
  const handleSubmitRequest = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // In a real app, this would submit the request to the backend
    alert(`Request submitted for ${requestItem.quantity} ${requestItem.unit} of ${requestItem.name}`);
    setShowRequestForm(false);
    setRequestItem({
      itemId: '',
      name: '',
      quantity: '',
      unit: '',
      urgency: 'normal',
      notes: ''
    });
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Inventory View</h1>
      
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search inventory..."
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
            <option value="all">All Categories</option>
            <option value="low">Low Stock</option>
            <option value="Base Oil">Base Oils</option>
            <option value="Butter">Butters</option>
            <option value="Essential Oil">Essential Oils</option>
            <option value="Chemical">Chemicals</option>
            <option value="Packaging">Packaging</option>
          </select>
        </div>
      </div>
      
      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map(item => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.stock} {item.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.stock <= item.reorderLevel * 0.5 ? 'bg-red-100 text-red-800' :
                      item.stock <= item.reorderLevel ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.stock <= item.reorderLevel * 0.5 ? 'Critical' :
                       item.stock <= item.reorderLevel ? 'Low' : 'Good'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.lastUpdated}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button
                      onClick={() => handleRequestItem(item)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Request
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Request Form Modal */}
      {showRequestForm && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Request Inventory Item</h2>
              <button 
                onClick={() => setShowRequestForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmitRequest} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Item</label>
                <input 
                  type="text" 
                  value={requestItem.name}
                  disabled
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quantity</label>
                  <input 
                    type="number" 
                    required
                    min="1"
                    value={requestItem.quantity}
                    onChange={(e) => setRequestItem({...requestItem, quantity: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Unit</label>
                  <input 
                    type="text" 
                    value={requestItem.unit}
                    disabled
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Urgency</label>
                <select
                  required
                  value={requestItem.urgency}
                  onChange={(e) => setRequestItem({...requestItem, urgency: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  rows={3}
                  value={requestItem.notes}
                  onChange={(e) => setRequestItem({...requestItem, notes: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add any additional notes..."
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowRequestForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}