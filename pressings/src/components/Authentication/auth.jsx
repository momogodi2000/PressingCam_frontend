import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiLock, FiMail, FiPhone, FiEye, FiEyeOff, FiHome, FiShoppingBag, FiClock } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo/logo.png';

const Authentication = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" },
    tap: { scale: 0.95 }
  };

  // Toggle between login and register forms
  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
    reset();
  };

  // Handle form submission
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form data submitted:', data);
      
      // Redirect to dashboard on successful login/registration
      navigate('/dashboard');
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Service features
  const features = [
    { 
      icon: <FiShoppingBag className="text-blue-600 text-2xl mb-2" />, 
      title: "Services Premium", 
      description: "Blanchisserie, Pressing, et Entretien de chaussures de haute qualité" 
    },
    { 
      icon: <FiClock className="text-blue-600 text-2xl mb-2" />, 
      title: "Livraison Rapide", 
      description: "Ramassage et livraison à domicile dans les délais convenus" 
    },
    { 
      icon: <FiHome className="text-blue-600 text-2xl mb-2" />, 
      title: "Service à Domicile", 
      description: "Nous venons chez vous pour récupérer et livrer vos articles" 
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      {/* Home Button */}
      <motion.div 
        className="fixed top-4 left-4 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.button
          onClick={() => navigate('/')}
          className="flex items-center justify-center bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all"
          whileHover={buttonVariants.hover}
          whileTap={buttonVariants.tap}
          aria-label="Retour à l'accueil"
        >
          <FiHome className="text-blue-700" size={24} />
        </motion.button>
      </motion.div>

      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-start mt-8">
        {/* Left side - Features */}
        <motion.div 
          className="lg:w-2/5 px-6 pt-12 pb-6 hidden lg:block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Contour Wash</h2>
            <p className="text-lg text-gray-600">Votre partenaire de confiance pour tous vos besoins de blanchisserie et d'entretien de chaussures au Cameroun.</p>
          </div>

          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-md"
                whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.3 }}
              >
                {feature.icon}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-blue-700 text-white rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-3">Pourquoi choisir Contour Wash?</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                <span>Service de qualité professionnelle</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                <span>Économisez du temps pour vos activités importantes</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                <span>Paiements sécurisés via MTN et Orange Money</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                <span>Suivi en temps réel de vos commandes</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Right side - Authentication Form */}
        <motion.div 
          className="lg:w-3/5 w-full"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center">
              <img src={logo} alt="Contour Wash Logo" className="h-20 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white">
                {isLoginForm ? 'Bienvenue!' : 'Créer un compte'}
              </h2>
              <p className="text-blue-100 mt-1">
                {isLoginForm 
                  ? 'Connectez-vous pour accéder à vos services de blanchisserie' 
                  : 'Rejoignez Contour Wash pour des services premium'}
              </p>
            </div>

            {/* Form Section */}
            <motion.div 
              className="p-8"
              variants={formVariants}
              key={isLoginForm ? 'login' : 'register'}
              initial="hidden"
              animate="visible"
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Registration Form Fields */}
                {!isLoginForm && (
                  <>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2">Nom Complet</label>
                      <div className="relative">
                        <FiUser className="absolute top-3 left-3 text-gray-400" />
                        <input
                          type="text"
                          className={`w-full pl-10 pr-4 py-2 rounded-lg border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                          placeholder="Entrez votre nom complet"
                          {...register('fullName', { required: "Le nom est obligatoire" })}
                        />
                      </div>
                      {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2">Téléphone</label>
                      <div className="relative">
                        <FiPhone className="absolute top-3 left-3 text-gray-400" />
                        <input
                          type="tel"
                          className={`w-full pl-10 pr-4 py-2 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                          placeholder="+237 6XX XXX XXX"
                          {...register('phone', { 
                            required: "Le numéro de téléphone est obligatoire",
                            pattern: {
                              value: /^(\+237|237)?[6-9][0-9]{8}$/,
                              message: "Format de téléphone invalide"
                            }
                          })}
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                  </>
                )}

                {/* Common Fields */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                  <div className="relative">
                    <FiMail className="absolute top-3 left-3 text-gray-400" />
                    <input
                      type="email"
                      className={`w-full pl-10 pr-4 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                      placeholder="contourwash@gmail.com"
                      {...register('email', { 
                        required: "L'email est obligatoire",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Adresse email invalide"
                        }
                      })}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Mot de passe</label>
                  <div className="relative">
                    <FiLock className="absolute top-3 left-3 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`w-full pl-10 pr-10 py-2 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                      placeholder={isLoginForm ? "Votre mot de passe" : "Choisissez un mot de passe fort"}
                      {...register('password', { 
                        required: "Le mot de passe est obligatoire",
                        minLength: {
                          value: 8,
                          message: "Le mot de passe doit contenir au moins 8 caractères"
                        }
                      })}
                    />
                    <button
                      type="button"
                      className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>

                {/* Login Extras */}
                {isLoginForm && (
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Se souvenir de moi
                      </label>
                    </div>
                    <div>
                      <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                        Mot de passe oublié?
                      </Link>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Traitement...
                    </div>
                  ) : (
                    isLoginForm ? "Se connecter" : "S'inscrire"
                  )}
                </motion.button>
              </form>

              {/* Form Toggle */}
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  {isLoginForm 
                    ? "Nouveau sur Contour Wash?" 
                    : "Vous avez déjà un compte?"}
                  <button
                    onClick={toggleForm}
                    className="ml-1 font-medium text-blue-600 hover:text-blue-800 focus:outline-none"
                  >
                    {isLoginForm ? "Créer un compte" : "Se connecter"}
                  </button>
                </p>
              </div>

              {/* Alternative Login Methods */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <motion.button
                    type="button"
                    className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    whileHover={buttonVariants.hover}
                    whileTap={buttonVariants.tap}
                  >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.5006 12.2332C22.5006 11.3699 22.4291 10.7399 22.2744 10.0865H12.2148V13.9832H18.1196C18.0006 14.9515 17.3577 16.4099 15.9291 17.3898L15.9091 17.5203L19.0897 19.9352L19.3101 19.9565C21.3338 18.1249 22.5006 15.4298 22.5006 12.2332Z" fill="#4285F4"/>
                      <path d="M12.214 22.5C15.1068 22.5 17.5353 21.5667 19.3092 19.9567L15.9282 17.39C15.0235 18.0083 13.8092 18.4417 12.214 18.4417C9.38069 18.4417 6.97596 16.6083 6.11874 14.0767L5.99309 14.0871L2.68583 16.595L2.64258 16.7133C4.40446 20.1433 8.0235 22.5 12.214 22.5Z" fill="#34A853"/>
                      <path d="M6.12096 14.0767C5.89476 13.4233 5.77358 12.7233 5.77358 12C5.77358 11.2767 5.89476 10.5767 6.10906 9.92337L6.10311 9.78423L2.75347 7.23828L2.64478 7.28667C1.91854 8.71002 1.50098 10.3084 1.50098 12C1.50098 13.6917 1.91854 15.29 2.64478 16.7133L6.12096 14.0767Z" fill="#FBBC05"/>
                      <path d="M12.214 5.55833C14.2259 5.55833 15.583 6.41666 16.3569 7.12335L19.3807 4.23C17.5283 2.53834 15.1068 1.5 12.214 1.5C8.02353 1.5 4.40447 3.85667 2.64258 7.28667L6.10689 9.92334C6.97598 7.39167 9.38073 5.55833 12.214 5.55833Z" fill="#EB4335"/>
                    </svg>
                    Google
                  </motion.button>
                  <motion.button
                    type="button"
                    className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    whileHover={buttonVariants.hover}
                    whileTap={buttonVariants.tap}
                  >
                    <svg className="h-5 w-5 mr-2 text-blue-900" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Contact Info */}
            <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-3 md:mb-0">
                  <h4 className="text-sm font-semibold text-gray-700">Contactez-nous</h4>
                  <p className="text-xs text-gray-600">Tel: +237 691667137 / 671465886</p>
                  <p className="text-xs text-gray-600">Email: Contourwash@gmail.com</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-700">Nos Services</h4>
                  <p className="text-xs text-gray-600">Blanchisserie • Pressing • Entretien Chaussures</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-4 bg-indigo-800 text-center">
              <p className="text-xs text-indigo-200">
                &copy; {new Date().getFullYear()} Contour Wash. Tous droits réservés. | <Link to="/terms" className="text-indigo-100 hover:text-white">Conditions d'utilisation</Link> | <Link to="/privacy" className="text-indigo-100 hover:text-white">Politique de confidentialité</Link>
              </p>
            </div>
          </div>

          {/* Mobile Features Section - only visible on mobile */}
          <div className="lg:hidden mt-8 space-y-4">
            <h3 className="text-xl font-bold text-center text-gray-800 mb-4">Pourquoi choisir Contour Wash?</h3>
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white p-4 rounded-xl shadow-md"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start">
                  <div className="mr-3">{feature.icon}</div>
                  <div>
                    <h4 className="font-medium text-gray-800">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Authentication;