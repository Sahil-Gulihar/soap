// @ts-nocheck
import { useState } from 'react';

export default function ProductionTasks() {
  // Mock data for employee tasks
  const [tasks, setTasks] = useState([
    { id: 1, batch: 'B-1043', product: 'Lavender Bliss', quantity: 300, status: 'in-progress', deadline: '2025-03-31 15:00', assigned: true },
    { id: 2, batch: 'B-1044', product: 'Ocean Breeze', quantity: 250, status: 'pending', deadline: '2025-04-01 12:00', assigned: true },
    { id: 3, batch: 'B-1045', product: 'Citrus Fresh', quantity: 350, status: 'pending', deadline: '2025-04-01 16:30', assigned: true },
    { id: 4, batch: 'B-1046', product: 'Honey Almond', quantity: 200, status: 'pending', deadline: '2025-04-02 11:00', assigned: false },
    { id: 5, batch: 'B-1047', product: 'Eucalyptus Mint', quantity: 280, status: 'pending', deadline: '2025-04-02 15:00', assigned: false }
  ]);
  
  const [checklist, setChecklist] = useState({
    1: { 
      steps: [
        { id: 1, text: 'Prepare base oils', completed: true },
        { id: 2, text: 'Mix lye solution', completed: true },
        { id: 3, text: 'Blend oils and lye', completed: false },
        { id: 4, text: 'Add essential oils', completed: false },
        { id: 5, text: 'Pour into molds', completed: false },
        { id: 6, text: 'Allow to cure', completed: false }
      ]
    }
  });
  
  const [activeTask, setActiveTask] = useState(1);
  
  const handleCheckStep = (taskId, stepId) => {
    const updatedChecklist = { ...checklist };
    
    const stepIndex = updatedChecklist[taskId].steps.findIndex(step => step.id === stepId);
    updatedChecklist[taskId].steps[stepIndex].completed = !updatedChecklist[taskId].steps[stepIndex].completed;
    
    // Check if all steps are completed
    const allCompleted = updatedChecklist[taskId].steps.every(step => step.completed);
    
    if (allCompleted) {
      const updatedTasks = [...tasks];
      const taskIndex = updatedTasks.findIndex(task => task.id === taskId);
      updatedTasks[taskIndex].status = 'completed';
      setTasks(updatedTasks);
    }
    
    setChecklist(updatedChecklist);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Production Tasks</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Your Assigned Tasks</h2>
            <div className="space-y-3">
              {tasks.filter(task => task.assigned).map(task => (
                <div 
                  key={task.id}
                  onClick={() => setActiveTask(task.id)}
                  className={`p-3 border rounded-lg cursor-pointer ${
                    activeTask === task.id ? 'border-blue-500 bg-blue-50' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{task.product}</h3>
                      <p className="text-sm text-gray-600">Batch: {task.batch}</p>
                      <p className="text-sm text-gray-600">Quantity: {task.quantity} units</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      task.status === 'completed' ? 'bg-green-100 text-green-800' :
                      task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {task.status === 'in-progress' ? 'In Progress' : 
                       task.status === 'pending' ? 'Pending' : 'Completed'}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Deadline: {task.deadline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Upcoming Tasks</h2>
            <div className="space-y-3">
              {tasks.filter(task => !task.assigned).map(task => (
                <div key={task.id} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{task.product}</h3>
                      <p className="text-sm text-gray-600">Batch: {task.batch}</p>
                      <p className="text-sm text-gray-600">Quantity: {task.quantity} units</p>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                      Upcoming
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Deadline: {task.deadline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Task Details and Checklist */}
        <div className="lg:col-span-2 space-y-4">
          {tasks.find(task => task.id === activeTask) && (
            <>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Task Details</h2>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    tasks.find(t => t.id === activeTask).status === 'completed' ? 'bg-green-100 text-green-800' :
                    tasks.find(t => t.id === activeTask).status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {tasks.find(t => t.id === activeTask).status === 'in-progress' ? 'In Progress' : 
                     tasks.find(t => t.id === activeTask).status === 'pending' ? 'Pending' : 'Completed'}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Product</p>
                    <p className="font-medium">{tasks.find(t => t.id === activeTask).product}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Batch ID</p>
                    <p className="font-medium">{tasks.find(t => t.id === activeTask).batch}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Quantity</p>
                    <p className="font-medium">{tasks.find(t => t.id === activeTask).quantity} units</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Deadline</p>
                    <p className="font-medium">{tasks.find(t => t.id === activeTask).deadline}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Recipe Details</h3>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <p className="text-sm">
                      <strong>Base Oils:</strong> Olive Oil (40%), Coconut Oil (30%), Shea Butter (15%), Castor Oil (15%)
                    </p>
                    <p className="text-sm mt-1">
                      <strong>Essential Oils:</strong> Lavender (3%), Eucalyptus (1%)
                    </p>
                    <p className="text-sm mt-1">
                      <strong>Additives:</strong> Dried Lavender Buds, Purple Clay for color
                    </p>
                    <p className="text-sm mt-1">
                      <strong>Cure Time:</strong> 4-6 weeks
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Production Checklist</h2>
                {checklist[activeTask] && (
                  <div className="space-y-2">
                    {checklist[activeTask].steps.map(step => (
                      <div key={step.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={step.completed}
                          onChange={() => handleCheckStep(activeTask, step.id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className={`ml-2 ${step.completed ? 'line-through text-gray-500' : ''}`}>
                          {step.text}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Notes</label>
                    <textarea
                      rows="3"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Add production notes here..."
                    ></textarea>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Update Progress
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                      Request Assistance
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Quality Control Checks</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">pH Level</label>
                    <input
                      type="number"
                      step="0.1"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="8.0 - 10.0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Weight (grams)</label>
                    <input
                      type="number"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Target: 100g ± 2g"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Visual Inspection</label>
                    <select
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select result</option>
                      <option value="pass">Pass</option>
                      <option value="minor_issues">Minor Issues</option>
                      <option value="fail">Fail</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
