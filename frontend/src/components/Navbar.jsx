import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  }

  return (
    <nav className="bg-white text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* <Link to="/" className="text-xl font-bold"></Link> */}
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                <span>{currentUser.email}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
            </>
          ) : (
            <div className="space-x-2">
              <Link to="/login" className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded">Login</Link>
              <Link to="/signup" className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}