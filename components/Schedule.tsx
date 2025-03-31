// @ts-nocheck
import { useState } from "react";

export default function Schedule() {
  // Mock schedule data
  const [schedule] = useState([
    {
      id: 1,
      date: "2025-03-31",
      shift: "Morning (6:00 - 14:00)",
      line: "Production Line 1",
      task: "Lavender Bliss Production",
      batch: "B-1043",
    },
    {
      id: 2,
      date: "2025-04-01",
      shift: "Morning (6:00 - 14:00)",
      line: "Production Line 2",
      task: "Ocean Breeze Production",
      batch: "B-1044",
    },
    {
      id: 3,
      date: "2025-04-02",
      shift: "Morning (6:00 - 14:00)",
      line: "Production Line 1",
      task: "Citrus Fresh Production",
      batch: "B-1045",
    },
    {
      id: 4,
      date: "2025-04-03",
      shift: "Morning (6:00 - 14:00)",
      line: "Production Line 2",
      task: "Honey Almond Production",
      batch: "B-1046",
    },
    {
      id: 5,
      date: "2025-04-04",
      shift: "Morning (6:00 - 14:00)",
      line: "Quality Control",
      task: "Batch Testing",
      batch: "Multiple",
    },
  ]);

  const [selectedDate, setSelectedDate] = useState("all");

  // Filter schedule based on selected date
  const filteredSchedule =
    selectedDate === "all"
      ? schedule
      : schedule.filter((item) => item.date === selectedDate);

  // Get unique dates for filter
  const uniqueDates = [...new Set(schedule.map((item) => item.date))];

  // Get current date for highlighting today
  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Work Schedule</h1>

      {/* Date Filter */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-700">
            Filter by date:
          </span>
          <button
            onClick={() => setSelectedDate("all")}
            className={`px-3 py-1 text-sm rounded-md ${
              selectedDate === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            All Dates
          </button>

          {uniqueDates.map((date) => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`px-3 py-1 text-sm rounded-md ${
                selectedDate === date
                  ? "bg-blue-600 text-white"
                  : date === currentDate
                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {date === currentDate ? "Today" : date}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Shift
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Work Station
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Task
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Batch
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSchedule.map((item) => (
                <tr
                  key={item.id}
                  className={item.date === currentDate ? "bg-green-50" : ""}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.date === currentDate ? (
                      <span className="inline-flex items-center">
                        {item.date}
                        <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">
                          Today
                        </span>
                      </span>
                    ) : (
                      item.date
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.shift}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.line}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.task}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.batch}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule Legend and Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-3">Shift Information</h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-sm">Morning Shift: 6:00 AM - 2:00 PM</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <span className="text-sm">
                Afternoon Shift: 2:00 PM - 10:00 PM
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
              <span className="text-sm">Night Shift: 10:00 PM - 6:00 AM</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-3">Schedule Notes</h2>
          <ul className="list-disc list-inside text-sm space-y-1 text-gray-600">
            <li>
              Please arrive 15 minutes before your shift starts for briefing
            </li>
            <li>Proper PPE must be worn at all times during production</li>
            <li>
              Notify your supervisor at least 24 hours in advance for any
              schedule changes
            </li>
            <li>
              Lunch breaks are scheduled for 30 minutes during the middle of
              your shift
            </li>
            <li>Report any equipment issues immediately to your supervisor</li>
          </ul>
        </div>
      </div>

      {/* Time Off Request */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Time Off Request</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                From Date
              </label>
              <input
                type="date"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                To Date
              </label>
              <input
                type="date"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Reason
            </label>
            <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select reason</option>
              <option>Vacation</option>
              <option>Sick Leave</option>
              <option>Personal</option>
              <option>Family Emergency</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Additional Notes
            </label>
            <textarea
              rows="3"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Provide any additional details..."
            ></textarea>
          </div>

          <div>
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
  );
}
