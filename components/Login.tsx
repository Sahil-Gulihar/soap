import { useState } from 'react';

export default function Login({ onLogin }:any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Mock users for demo
  const users = [
    { id: 1, username: 'admin', password: 'admin123', name: 'Admin User', role: 'admin' },
    { id: 2, username: 'employee', password: 'emp123', name: 'John Smith', role: 'employee' }
  ];
  
  const handleSubmit = (e:any) => {
    e.preventDefault();
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      // Exclude password from user data passed to parent
      const { password, ...userWithoutPassword } = user;
      onLogin(userWithoutPassword);
    } else {
      setError('Invalid username or password');
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Soap Factory Management</h1>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="p-3 text-sm text-red-600 bg-red-100 rounded">{error}</div>}
          
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
          
          <div className="text-sm text-center text-gray-600">
            <p>Demo credentials:</p>
            <p>Admin: username="admin" password="admin123"</p>
            <p>Employee: username="employee" password="emp123"</p>
          </div>
        </form>
      </div>
    </div>
  );
}