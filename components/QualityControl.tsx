import { useState } from "react";

export default function QualityControl() {
  // Mock quality control data
  const [qualityTasks, setQualityTasks] = useState([
    {
      id: 1,
      batch: "B-1042",
      product: "Lavender Bliss",
      status: "pending",
      dueDate: "2025-03-31",
      assignedTo: "John Smith",
    },
    {
      id: 2,
      batch: "B-1041",
      product: "Ocean Breeze",
      status: "completed",
      dueDate: "2025-03-30",
      assignedTo: "John Smith",
      result: "pass",
    },
    {
      id: 3,
      batch: "B-1040",
      product: "Citrus Fresh",
      status: "in-progress",
      dueDate: "2025-03-31",
      assignedTo: "John Smith",
    },
    {
      id: 4,
      batch: "B-1039",
      product: "Honey Almond",
      status: "completed",
      dueDate: "2025-03-29",
      assignedTo: "Sarah Johnson",
      result: "pass",
    },
    {
      id: 5,
      batch: "B-1038",
      product: "Eucalyptus Mint",
      status: "completed",
      dueDate: "2025-03-28",
      assignedTo: "John Smith",
      result: "minor_issues",
    },
  ]);

  const [activeTask, setActiveTask] = useState(null);
  const [testResults, setTestResults] = useState({
    appearance: "",
    scent: "",
    texture: "",
    weight: "",
    pH: "",
    notes: "",
  });

  const handleSelectTask = (taskId:any) => {
    setActiveTask(taskId);
    // Reset test results when selecting a new task
    setTestResults({
      appearance: "",
      scent: "",
      texture: "",
      weight: "",
      pH: "",
      notes: "",
    });
  };

  const handleSubmitResults = (e:any) => {
    e.preventDefault();

    // Determine pass/fail result based on test results
    let result = "pass";
    if (!testResults.appearance || !testResults.scent || !testResults.texture) {
      result = "fail";
    } else if (
      testResults.appearance === "poor" ||
      testResults.scent === "poor" ||
      testResults.texture === "poor"
    ) {
      result = "fail";
    } else if (
      testResults.appearance === "fair" ||
      testResults.scent === "fair" ||
      testResults.texture === "fair"
    ) {
      result = "minor_issues";
    }

    // Update the task status and result
    const updatedTasks = qualityTasks.map((task) => {
      if (task.id === activeTask) {
        return { ...task, status: "completed", result };
      }
      return task;
    });

    setQualityTasks(updatedTasks);
    setActiveTask(null);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Quality Control</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">
              Quality Control Tasks
            </h2>
            <div className="space-y-3">
              {qualityTasks
                .filter(
                  (task) =>
                    task.status === "pending" || task.status === "in-progress"
                )
                .map((task) => (
                  <div
                    key={task.id}
                    onClick={() => handleSelectTask(task.id)}
                    className={`p-3 border rounded-lg cursor-pointer ${
                      activeTask === task.id ? "border-blue-500 bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {task.product}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Batch: {task.batch}
                        </p>
                        <p className="text-sm text-gray-600">
                          Due: {task.dueDate}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          task.status === "in-progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {task.status === "in-progress"
                          ? "In Progress"
                          : "Pending"}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">
              Completed Inspections
            </h2>
            <div className="space-y-3">
              {qualityTasks
                .filter((task) => task.status === "completed")
                .map((task) => (
                  <div key={task.id} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {task.product}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Batch: {task.batch}
                        </p>
                        <p className="text-sm text-gray-600">
                          Completed: {task.dueDate}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          task.result === "pass"
                            ? "bg-green-100 text-green-800"
                            : task.result === "minor_issues"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {task.result === "pass"
                          ? "Pass"
                          : task.result === "minor_issues"
                          ? "Minor Issues"
                          : "Fail"}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Quality Control Form */}
        <div className="lg:col-span-2">
          {activeTask ? (
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">
                Quality Control Inspection -{" "}
                {qualityTasks.find((t) => t.id === activeTask)?.product}
              </h2>

              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-800">
                  <strong>Batch:</strong>{" "}
                  {qualityTasks.find((t) => t.id === activeTask)?.batch} |
                  <strong> Due Date:</strong>{" "}
                  {qualityTasks.find((t) => t.id === activeTask)?.dueDate}
                </p>
              </div>

              <form onSubmit={handleSubmitResults} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Visual Appearance
                    </label>
                    <select
                      required
                      value={testResults.appearance}
                      onChange={(e) =>
                        setTestResults({
                          ...testResults,
                          appearance: e.target.value,
                        })
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select result</option>
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="fair">Fair</option>
                      <option value="poor">Poor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Scent Evaluation
                    </label>
                    <select
                      required
                      value={testResults.scent}
                      onChange={(e) =>
                        setTestResults({
                          ...testResults,
                          scent: e.target.value,
                        })
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select result</option>
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="fair">Fair</option>
                      <option value="poor">Poor</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Texture Assessment
                    </label>
                    <select
                      required
                      value={testResults.texture}
                      onChange={(e) =>
                        setTestResults({
                          ...testResults,
                          texture: e.target.value,
                        })
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select result</option>
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="fair">Fair</option>
                      <option value="poor">Poor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Weight Check (grams)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={testResults.weight}
                      onChange={(e) =>
                        setTestResults({
                          ...testResults,
                          weight: e.target.value,
                        })
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Target: 100g ± 2g"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    pH Level
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={testResults.pH}
                    onChange={(e) =>
                      setTestResults({ ...testResults, pH: e.target.value })
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Target: 8.0 - 10.0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Notes and Observations
                  </label>
                  <textarea
                    rows={4}
                    value={testResults.notes}
                    onChange={(e) =>
                      setTestResults({ ...testResults, notes: e.target.value })
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter any additional observations or concerns..."
                  ></textarea>
                </div>

                <div className="pt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setActiveTask(null)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Submit Results
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow flex flex-col items-center justify-center h-full">
              <div className="text-gray-400 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Task Selected
              </h3>
              <p className="text-gray-600 text-center">
                Select a quality control task from the left panel to begin
                inspection.
              </p>
            </div>
          )}

          <div className="mt-6 bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">
              Quality Standards Reference
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Visual Appearance</h3>
                <ul className="mt-1 text-sm text-gray-600 list-disc list-inside">
                  <li>
                    Excellent: No visual defects, consistent color, smooth
                    texture
                  </li>
                  <li>
                    Good: Minor variations in color, no significant defects
                  </li>
                  <li>
                    Fair: Noticeable color variations, minor surface defects
                  </li>
                  <li>
                    Poor: Significant defects, inconsistent coloring, cracks
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Scent Evaluation</h3>
                <ul className="mt-1 text-sm text-gray-600 list-disc list-inside">
                  <li>
                    Excellent: Strong, consistent fragrance matching product
                    profile
                  </li>
                  <li>
                    Good: Clear fragrance with slight variations from standard
                  </li>
                  <li>Fair: Mild fragrance with notable variations</li>
                  <li>
                    Poor: Weak fragrance, significant deviation, or unpleasant
                    notes
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">pH Standards</h3>
                <ul className="mt-1 text-sm text-gray-600 list-disc list-inside">
                  <li>Target pH range: 8.0 - 10.0</li>
                  <li>Acceptable range: 7.5 - 10.5</li>
                  <li>
                    Outside this range requires further testing and evaluation
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
