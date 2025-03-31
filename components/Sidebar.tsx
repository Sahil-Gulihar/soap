export default function Sidebar({
  menuItems,
  activeSection,
  setActiveSection,
}:any) {
  return (
    <div className="w-64 bg-blue-800 text-white flex flex-col">
      <div className="p-4 text-center border-b border-blue-700">
        <h1 className="text-xl font-bold">Soap Factory</h1>
        <p className="text-sm text-blue-300">Management System</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item:any) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center p-2 rounded-md hover:bg-blue-700 ${
                  activeSection === item.id ? "bg-blue-700" : ""
                }`}
              >
                <span className="mr-2">
                  {/* Replace with actual icons in production */}
                  <span className="w-5 h-5 inline-block text-center">
                    {item.icon[0]}
                  </span>
                </span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
