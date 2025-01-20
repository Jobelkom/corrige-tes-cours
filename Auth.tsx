import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, LogIn, Phone, Lock, User, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

type AuthMode = 'login' | 'register';

interface FormData {
  fullName: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>('login');
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const validatePhone = (phone: string) => {
    const regex = /^6[0-9]{8}$/;
    return regex.test(phone);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      if (!validatePhone(formData.phone)) {
        throw new Error('Le numéro de téléphone doit commencer par 6 et contenir 9 chiffres');
      }

      if (!validatePassword(formData.password)) {
        throw new Error('Le mot de passe doit contenir au moins 6 caractères');
      }

      const email = `${formData.phone}@reussir-academy.com`;

      if (mode === 'register') {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Les mots de passe ne correspondent pas');
        }

        const { data: existingUser } = await supabase
          .from('profiles')
          .select('phone')
          .eq('phone', formData.phone)
          .single();

        if (existingUser) {
          throw new Error('Ce numéro de téléphone est déjà utilisé');
        }

        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
              phone: formData.phone
            }
          }
        });

        if (signUpError) throw signUpError;

        setSuccess('Inscription réussie ! Vous pouvez maintenant vous connecter.');
        setMode('login');
        setFormData({
          fullName: '',
          phone: '',
          password: '',
          confirmPassword: ''
        });
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password: formData.password
        });

        if (signInError) {
          if (signInError.message === 'Invalid login credentials') {
            throw new Error('Numéro de téléphone ou mot de passe incorrect');
          }
          throw signInError;
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('has_paid')
          .eq('phone', formData.phone)
          .single();

        if (profile?.has_paid) {
          navigate('/dashboard');
        } else {
          navigate('/payment');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {mode === 'login' ? 'Connexion' : 'Inscription'}
          </h2>
          <p className="mt-2 text-gray-600">
            {mode === 'login' ? 'Accédez à votre compte' : 'Créez votre compte'}
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => {
                setMode('login');
                setError('');
                setSuccess('');
              }}
              className={`px-4 py-2 rounded-md ${
                mode === 'login'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <LogIn className="w-5 h-5 inline-block mr-2" />
              Connexion
            </button>
            <button
              onClick={() => {
                setMode('register');
                setError('');
                setSuccess('');
              }}
              className={`px-4 py-2 rounded-md ${
                mode === 'register'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <UserPlus className="w-5 h-5 inline-block mr-2" />
              Inscription
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded bg-red-50 text-red-600 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 rounded bg-green-50 text-green-600 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'register' && (
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Nom complet
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="pl-10 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Numéro de téléphone
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="pl-10 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border-gray-300 rounded-md"
                  placeholder="6XXXXXXXX"
                  pattern="6[0-9]{8}"
                  title="Le numéro doit commencer par 6 et contenir 9 chiffres"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Format: 6XXXXXXXX (9 chiffres commençant par 6)
              </p>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Minimum 6 caractères
              </p>
            </div>

            {mode === 'register' && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirmer le mot de passe
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    minLength={6}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-10 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isLoading
                    ? 'bg-green-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                }`}
              >
                {isLoading ? 'Chargement...' : mode === 'login' ? 'Se connecter' : 'S\'inscrire'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth;