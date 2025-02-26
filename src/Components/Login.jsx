import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthContex';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Login() {
  const { signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      toast.success('Login successful');
      navigate('/');
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Login Failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-indigo-600/80 text-white py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
