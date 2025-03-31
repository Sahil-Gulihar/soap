export default function Header({ user, onLogout, title }:any) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>

      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-600">
          <span>Welcome, </span>
          <span className="font-medium">{user.name}</span>
          <span className="ml-2 px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">
            {user.role}
          </span>
        </div>

        <button
          onClick={onLogout}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}
