import { useState } from 'react';

export default function OrderManagement() {
  // Mock order data
  const [orders, setOrders] = useState([
    { id: 'ORD-2025-0142', customer: 'Wellness Spa', date: '2025-03-30', amount: 2850.00, status: 'pending', items: 4 },
    { id: 'ORD-2025-0141', customer: 'Natural Beauty Store', date: '2025-03-29', amount: 3560.75, status: 'processing', items: 6 },
    { id: 'ORD-2025-0140', customer: 'Organic Living Co.', date: '2025-03-27', amount: 1245.50, status: 'shipped', items: 3 },
    { id: 'ORD-2025-0139', customer: 'Eco-Friendly Goods', date: '2025-03-25', amount: 4780.25, status: 'delivered', items: 8 },
    { id: 'ORD-2025-0138', customer: 'Health & Happiness', date: '2025-03-22', amount: 2340.00, status: 'delivered', items: 5 },
    { id: 'ORD-2025-0137', customer: 'Pure Products Ltd', date: '2025-03-20', amount: 1875.50, status: 'delivered', items: 4 },
    { id: 'ORD-2025-0136', customer: 'Wellness Spa', date: '2025-03-18', amount: 3420.75, status: 'delivered', items: 7 }
  ]);
  
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter orders based on search term and status filter
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || order.status === filter;
    
    return matchesSearch && matchesFilter;
  });
  
  // Calculate total sales
  const totalSales = orders.reduce((sum, order) => sum + order.amount, 0);
  const pendingAmount = orders
    .filter(order => order.status === 'pending' || order.status === 'processing')
    .reduce((sum, order) => sum + order.amount, 0);
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-600 font-medium">Total Orders</h3>
          <p className="mt-2 text-2xl font-bold text-gray-900">{orders.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-600 font-medium">Total Sales</h3>
          <p className="mt-2 text-2xl font-bold text-gray-900">${totalSales.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-600 font-medium">Pending Amount</h3>
          <p className="mt-2 text-2xl font-bold text-gray-900">${pendingAmount.toFixed(2)}</p>
        </div>
      </div>
      
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search orders..."
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
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      
      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-gray-600 hover:text-gray-900">Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}