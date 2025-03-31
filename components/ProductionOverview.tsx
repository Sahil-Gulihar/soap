import { useState } from 'react';

export default function ProductionOverview() {
  // Mock data
  const [productionStats] = useState({
    todayProduction: 782,
    todayTarget: 850,
    weeklyProduction: 3950,
    weeklyTarget: 4250,
    monthlyProduction: 16240,
    monthlyTarget: 17000,
    activeLines: 4,
    totalLines: 5,
    efficiency: 92
  });
  
  const [recentBatches] = useState([
    { id: 'B-1042', product: 'Lavender Bliss', quantity: 250, status: 'completed', completedAt: '2025-03-31 08:45' },
    { id: 'B-1041', product: 'Ocean Breeze', quantity: 200, status: 'completed', completedAt: '2025-03-31 07:30' },
    { id: 'B-1040', product: 'Citrus Fresh', quantity: 300, status: 'completed', completedAt: '2025-03-30 16:20' },
    { id: 'B-1039', product: 'Honey Almond', quantity: 150, status: 'completed', completedAt: '2025-03-30 14:15' },
    { id: 'B-1038', product: 'Eucalyptus Mint', quantity: 200, status: 'completed', completedAt: '2025-03-30 11:30' }
  ]);
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Production Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Today's Production"
          value={productionStats.todayProduction}
          target={productionStats.todayTarget}
          unit="units" subtitle={undefined} color={undefined}        />
        <StatCard 
          title="Weekly Production"
          value={productionStats.weeklyProduction}
          target={productionStats.weeklyTarget}
          unit="units" subtitle={undefined} color={undefined}        />
        <StatCard 
          title="Production Lines"
          value={`${productionStats.activeLines}/${productionStats.totalLines}`}
          subtitle="Active Lines" target={undefined} unit={undefined} color={undefined}        />
        <StatCard 
          title="Efficiency Rate"
          value={`${productionStats.efficiency}%`}
          subtitle="Overall Efficiency"
          color={productionStats.efficiency >= 90 ? 'green' : productionStats.efficiency >= 70 ? 'yellow' : 'red'} target={undefined} unit={undefined}        />
      </div>
      
      {/* Recent Production Batches */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Production Batches</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Batch ID</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Product</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Quantity</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Completed At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentBatches.map(batch => (
                <tr key={batch.id}>
                  <td className="px-4 py-2 text-sm font-medium text-gray-800">{batch.id}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{batch.product}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{batch.quantity}</td>
                  <td className="px-4 py-2 text-sm">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {batch.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">{batch.completedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Production Schedule */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Today's Production Schedule</h2>
          <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
            View Full Schedule
          </button>
        </div>
        
        <div className="space-y-3">
          <ScheduleItem 
            time="09:00 - 11:30" 
            product="Lavender Bliss" 
            line="Line 1" 
            quantity={300}
            status="in-progress"
          />
          <ScheduleItem 
            time="09:00 - 12:00" 
            product="Ocean Breeze" 
            line="Line 2" 
            quantity={350}
            status="in-progress"
          />
          <ScheduleItem 
            time="10:00 - 13:00" 
            product="Citrus Fresh" 
            line="Line 3" 
            quantity={400}
            status="upcoming"
          />
          <ScheduleItem 
            time="13:30 - 16:30" 
            product="Honey Almond" 
            line="Line 1" 
            quantity={250}
            status="upcoming"
          />
          <ScheduleItem 
            time="13:30 - 17:00" 
            product="Eucalyptus Mint" 
            line="Line 2" 
            quantity={300}
            status="upcoming"
          />
        </div>
      </div>
    </div>
  );
}
function StatCard({ title, value, target, unit, subtitle, color }:any) {
  const getPercentage = () => {
    if (!target) return null;
    return Math.round((value / target) * 100);
  };
  
  const percentage = getPercentage();
  const displayColor = color || (percentage != null && percentage >= 90 ? 'green' : percentage != null && percentage >= 70 ? 'yellow' : 'red');
  
  const colorClasses = {
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800',
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-sm text-gray-600 font-medium">{title}</h3>
      <div className="mt-2 flex items-end justify-between">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {target && (
          <p className="text-sm text-gray-600">
            of {target} {unit}
          </p>
        )}
      </div>
      {percentage ? (
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                displayColor === 'green' ? 'bg-green-500' : 
                displayColor === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            ></div>
          </div>
          <p className="mt-1 text-xs text-gray-600">{percentage}% of target</p>
        </div>
      ) : (
        subtitle && <p className="mt-1 text-xs text-gray-600">{subtitle}</p>
      )}
    </div>
  );
}


type StatusType = "completed" | "in-progress" | "upcoming" | "delayed";

function ScheduleItem({ time, product, line, quantity, status }: { time: any, product: any, line: any, quantity: any, status: StatusType }) {
  const statusClasses: { [key in StatusType]: string } = {
    completed: "bg-green-100 text-green-800",
    "in-progress": "bg-blue-100 text-blue-800",
    upcoming: "bg-gray-100 text-gray-800",
    delayed: "bg-red-100 text-red-800",
  };

  return (
    <div className="p-3 border rounded-lg flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="text-sm font-medium text-gray-800 w-32">{time}</div>
        <div>
          <div className="font-medium text-gray-800">{product}</div>
          <div className="text-sm text-gray-600">
            {line} • {quantity} units
          </div>
        </div>
      </div>
      <span
        className={`px-2 py-1 text-xs rounded-full ${statusClasses[status]}`}
      >
        {status === "in-progress"
          ? "In Progress"
          : status === "upcoming"
          ? "Upcoming"
          : status === "delayed"
          ? "Delayed"
          : "Completed"}
      </span>
    </div>
  );
}