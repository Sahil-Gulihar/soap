import { useState } from 'react';

export default function ReportsAnalytics() {
  // Mock data for charts
  const [productionData] = useState([
    { month: 'Jan', produced: 15200, target: 15000 },
    { month: 'Feb', produced: 14800, target: 15000 },
    { month: 'Mar', produced: 16300, target: 15000 },
    { month: 'Apr', produced: 17200, target: 17000 },
    { month: 'May', produced: 16900, target: 17000 },
    { month: 'Jun', produced: 18100, target: 17000 }
  ]);
  
  const [salesData] = useState([
    { month: 'Jan', revenue: 42500, cost: 28500, profit: 14000 },
    { month: 'Feb', revenue: 38700, cost: 27200, profit: 11500 },
    { month: 'Mar', revenue: 45300, cost: 29800, profit: 15500 },
    { month: 'Apr', revenue: 47900, cost: 31500, profit: 16400 },
    { month: 'May', revenue: 46200, cost: 30800, profit: 15400 },
    { month: 'Jun', revenue: 52300, cost: 33600, profit: 18700 }
  ]);
  
  const [topProducts] = useState([
    { name: 'Lavender Bliss', sales: 4850, percentage: 22 },
    { name: 'Ocean Breeze', sales: 3920, percentage: 18 },
    { name: 'Citrus Fresh', sales: 3650, percentage: 17 },
    { name: 'Honey Almond', sales: 2980, percentage: 14 },
    { name: 'Eucalyptus Mint', sales: 2540, percentage: 12 },
    { name: 'Others', sales: 3760, percentage: 17 }
  ]);
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
      
      {/* Date Range Selector */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">Data Range</h2>
          <div className="flex items-center space-x-4">
            <select 
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option>Last 6 Months</option>
              <option>Last 3 Months</option>
              <option>Last Month</option>
              <option>Last Year</option>
              <option>Custom Range</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Generate Report
            </button>
          </div>
        </div>
      </div>
      
      {/* Production vs Target Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Production vs Target</h2>
        <div className="h-64 w-full">
          {/* This would be a chart in a real application */}
          <div className="h-full w-full flex items-center justify-center bg-gray-100 rounded">
            <div className="space-y-2">
              <p className="text-center text-gray-500">Production vs Target Chart</p>
              <div className="flex gap-4">
                {productionData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="relative w-10 bg-gray-200">
                      <div 
                        className="absolute bottom-0 left-0 right-0 bg-blue-500"
                        style={{ height: `${(item.produced / 20000) * 100}px` }}
                      ></div>
                      <div 
                        className="absolute bottom-0 left-0 right-0 border-t-2 border-red-500"
                        style={{ bottom: `${(item.target / 20000) * 100}px` }}
                      ></div>
                    </div>
                    <span className="text-xs mt-1">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Revenue, Cost, Profit Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Financial Performance</h2>
        <div className="h-64 w-full">
          {/* This would be a chart in a real application */}
          <div className="h-full w-full flex items-center justify-center bg-gray-100 rounded">
            <div className="space-y-2">
              <p className="text-center text-gray-500">Revenue, Cost, and Profit Chart</p>
              <div className="flex gap-4">
                {salesData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="relative w-16 bg-gray-200">
                      <div 
                        className="absolute bottom-0 left-0 right-0 bg-green-500"
                        style={{ height: `${(item.profit / 60000) * 100}px` }}
                      ></div>
                      <div 
                        className="absolute bottom-0 left-0 right-0 bg-red-500"
                        style={{ height: `${(item.cost / 60000) * 100}px` }}
                      ></div>
                      <div 
                        className="absolute bottom-0 left-0 right-0 bg-blue-500"
                        style={{ height: `${(item.revenue / 60000) * 100}px`, opacity: 0.3 }}
                      ></div>
                    </div>
                    <span className="text-xs mt-1">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Top Selling Products */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Top Selling Products</h2>
        <div className="space-y-4">
          {topProducts.map((product, index) => (
            <div key={index} className="flex items-center">
              <div className="w-32 text-sm">{product.name}</div>
              <div className="flex-1">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${product.percentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-32 text-right text-sm">
                <span className="font-medium">{product.sales.toLocaleString()}</span>
                <span className="text-gray-500 ml-1">({product.percentage}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Export Options */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Export Reports</h2>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
            Production Report (PDF)
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
            Financial Report (PDF)
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
            Inventory Report (PDF)
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
            Export Data (Excel)
          </button>
        </div>
      </div>
    </div>
  );
}