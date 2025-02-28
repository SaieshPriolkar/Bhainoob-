import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, AlertCircle, ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(email);
      setMessage('Check your email for further instructions');
    } catch (error) {
      setError('Failed to reset password');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 w-full h-full bg-gradient-to-r from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:shadow-xl">
        <div className="bg-blue-600 h-2 w-full"></div>
        
        <div className="px-6 py-8 sm:px-8 sm:py-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Reset your password</h2>
            <p className="mt-3 text-gray-600">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>
          
          {error && (
            <div className="mt-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded flex items-start" role="alert">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}
          
          {message && (
            <div className="mt-6 bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded" role="alert">
              <span className="text-sm">{message}</span>
            </div>
          )}
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base transition-colors duration-200"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors duration-200"
              >
                {loading ? 'Sending...' : 'Reset Password'}
              </button>
            </div>
          </form>
          
          <div className="mt-8 text-center">
            <Link 
              to="/login" 
              className="group inline-flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:translate-x-[-2px] transition-transform duration-200" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
      
      <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 text-center">
  Need help? Contact our support team at support@example.com
</p>

    </div>
  );
}