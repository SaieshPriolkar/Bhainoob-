import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, AlertCircle, LogIn } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, googleSignIn, googleSignInRedirect, currentUser } = useAuth();
  const navigate = useNavigate();

  // Redirect if user is already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/courselist');
    }
  }, [currentUser, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to sign in. Please check your credentials.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn(e) {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      // Try popup first
      await googleSignIn();
      navigate('/dashboard');
    } catch (error) {
      // If popup is blocked, use redirect method instead
      if (error.code === 'auth/popup-blocked') {
        try {
          await googleSignInRedirect();
          // No need to navigate here as the page will reload after redirect
        } catch (redirectError) {
          setError('Failed to sign in with Google.');
          console.error(redirectError);
        }
      } else {
        setError('Failed to sign in with Google.');
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 flex overflow-hidden">
      {/* Left side aesthetic blue element */}
      <div className="w-1/3 bg-gradient-to-br from-blue-400 via-blue-300 to-blue-200 hidden md:block">
        <div className="h-full w-full flex items-center justify-center">
          <div className="p-8">
            <div className="w-24 h-24 rounded-full bg-blue-300/30 mb-6 mx-auto"></div>
            <h3 className="text-xl font-bold text-blue-900 mb-2 text-center">Welcome Back</h3>
            <p className="text-blue-700/70 text-center">Sign in to continue your journey with us</p>
          </div>
        </div>
      </div>
      
      {/* Right side login form */}
      <div className="w-full md:w-2/3 flex items-center justify-center bg-white">
        <div className="w-full max-w-md px-6 py-6 md:px-8">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
            <p className="mt-1 text-indigo-600 font-bold">Sign in to your account</p>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative flex items-center mb-4" role="alert">
              <AlertCircle className="h-4 w-4 mr-2" />
              <span className="text-sm">{error}</span>
            </div>
          )}
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">Email address</label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-indigo-400" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <div className="text-xs">
                  <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-indigo-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 transition-colors"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LogIn className="h-4 w-4 text-gray-400 group-hover:text-gray-300" />
                </span>
                Sign in
              </button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-4">
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-400 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 disabled:opacity-50 transition-colors">

                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" fill="white"/>
                </svg>
                Sign in with Google
              </button>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-xs text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}