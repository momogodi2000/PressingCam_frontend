import React, { useState, useEffect } from 'react';
import { 
  User, Menu, X, Home, Package, Truck, 
  ClipboardList, Settings, LogOut, Bell, 
  Calendar, BarChart3, ChevronDown, Globe,
  Sun, Moon, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthService from '../../../Services/auth/authentication';
import ProfileModal from '../clients/profile/my_profile';

const DeliveryLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [language, setLanguage] = useState('fr'); // 'fr' for French, 'en' for English
  const [darkMode, setDarkMode] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check authentication status on component mount and route changes
  useEffect(() => {
    const checkAuth = () => {
      if (!AuthService.isAuthenticated()) {
        // Redirect to login if not authenticated
        navigate('/login', { replace: true });
      }
    };

    checkAuth();
    
    // Listen for auth token changes (for example, if token expires)
    const handleStorageChange = (e) => {
      if (e.key === 'authToken' && !e.newValue) {
        checkAuth();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [navigate, location.pathname]);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (AuthService.isAuthenticated()) {
          const userProfile = await AuthService.getUserProfile();
          setUserData(userProfile);
        } else {
          // Redirect to login if token exists but is invalid
          navigate('/login', { replace: true });
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        // Handle authentication errors by redirecting to login
        if (error.response?.status === 401) {
          AuthService.logout();
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Load dark mode preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Load language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setLanguage(savedLanguage);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await AuthService.logout();
      // Note: Navigation is now handled in the AuthService.logout method
    } catch (error) {
      console.error('Error logging out:', error);
      // Fallback in case the logout method fails to redirect
      navigate('/login', { replace: true });
    }
  };
  
  // Handle profile modal
  const handleOpenProfileModal = () => {
    setShowProfileModal(true);
    setUserMenuOpen(false);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Change language
  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    setLanguageMenuOpen(false);
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!userData) return "U";
    
    const names = [userData.first_name, userData.last_name].filter(Boolean);
    if (names.length === 0) {
      return userData.email.substring(0, 2).toUpperCase();
    }
    
    return names.map(name => name.charAt(0)).join('').toUpperCase();
  };

  // Menu items with translations
  const getMenuItems = () => {
    const translations = {
      en: [
        { icon: <Home size={20} />, label: 'Home', active: false },
        { icon: <Truck size={20} />, label: 'Deliveries', active: true },
        { icon: <Package size={20} />, label: 'Pickups', active: false },
        { icon: <ClipboardList size={20} />, label: 'History', active: false },
        { icon: <BarChart3 size={20} />, label: 'Reports', active: false },
        { icon: <Calendar size={20} />, label: 'Schedule', active: false },
      ],
      fr: [
        { icon: <Home size={20} />, label: 'Accueil', active: false },
        { icon: <Truck size={20} />, label: 'Livraisons', active: true },
        { icon: <Package size={20} />, label: 'Ramassages', active: false },
        { icon: <ClipboardList size={20} />, label: 'Historique', active: false },
        { icon: <BarChart3 size={20} />, label: 'Rapports', active: false },
        { icon: <Calendar size={20} />, label: 'Planning', active: false },
      ]
    };

    return translations[language];
  };

  // Translation function
  const t = (key) => {
    const translations = {
      'settings': { en: 'Settings', fr: 'Paramètres' },
      'logout': { en: 'Logout', fr: 'Déconnexion' },
      'dashboard': { en: 'Driver Dashboard', fr: 'Tableau de Bord Livreur' },
      'loading': { en: 'Loading...', fr: 'Chargement...' },
      'version': { en: 'Version', fr: 'Version' },
      'driver': { en: 'Driver - Douala Area', fr: 'Livreur - Zone Douala' },
      'profile': { en: 'My Profile', fr: 'Mon profil' },
      'language': { en: 'Language', fr: 'Langue' },
      'theme': { en: 'Theme', fr: 'Thème' },
      'user': { en: 'User', fr: 'Utilisateur' },
    };
    
    return translations[key][language] || key;
  };

  const menuItems = getMenuItems();

  // Animation variants
  const sidebarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: -280, transition: { type: 'spring', stiffness: 300, damping: 30 } }
  };

  const dropdownVariants = {
    open: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } }
  };

  const menuItemVariants = {
    hover: { x: 5, transition: { duration: 0.2 } },
    initial: { x: 0, transition: { duration: 0.2 } }
  };

  return (
    <div className={`flex h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'} transition-colors duration-300`}>
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-20 bg-black md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        initial={windowWidth < 768 ? 'closed' : 'open'}
        animate={windowWidth < 768 ? (sidebarOpen ? 'open' : 'closed') : 'open'}
        className={`fixed z-30 h-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-lg md:relative flex-shrink-0 transition-colors duration-300`}
        style={{ width: windowWidth < 1024 ? 64 : 240 }}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <motion.div 
            className={`flex items-center justify-between p-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}
            whileHover={{ backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
          >
            <div className="flex items-center space-x-2">
              <motion.div 
                className="bg-blue-600 text-white p-1 rounded"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Truck className="h-6 w-6" />
              </motion.div>
              <span className={`text-xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-800'} ${windowWidth >= 768 && windowWidth < 1024 ? 'hidden' : ''}`}>DeliTrack</span>
            </div>
            <button 
              onClick={toggleSidebar} 
              className={`rounded-full p-1 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} md:hidden transition-colors duration-200`}
            >
              <X className="h-6 w-6" />
            </button>
          </motion.div>

          {/* User profile */}
          <motion.div 
            className={`${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b p-4`}
            whileHover={{ backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
          >
            <div className="flex items-center space-x-3">
              <motion.div 
                className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{getUserInitials()}</span>
              </motion.div>
              <div className={windowWidth >= 768 && windowWidth < 1024 ? 'hidden' : ''}>
                <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {userData ? `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || userData.email : t('loading')}
                </h3>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('driver')}</p>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-2">
            <ul className="space-y-1">
              {menuItems.map((item, index) => (
                <motion.li 
                  key={index}
                  variants={menuItemVariants}
                  initial="initial"
                  whileHover="hover"
                >
                  <a 
                    href="#" 
                    className={`flex items-center ${windowWidth >= 768 && windowWidth < 1024 ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg transition-all duration-200 ${
                      item.active 
                        ? darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600' 
                        : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {(windowWidth < 768 || windowWidth >= 1024) && <span>{item.label}</span>}
                    {item.active && (windowWidth < 768 || windowWidth >= 1024) && (
                      <motion.div 
                        className="ml-auto w-1.5 h-5 bg-blue-500 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="mt-6 border-t pt-4" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
              <ul className="space-y-1">
                <motion.li
                  variants={menuItemVariants}
                  initial="initial"
                  whileHover="hover"
                >
                  <a 
                    href="#" 
                    className={`flex items-center ${windowWidth >= 768 && windowWidth < 1024 ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg transition-colors duration-200 ${
                      darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Settings className="text-lg" />
                    {(windowWidth < 768 || windowWidth >= 1024) && <span>{t('settings')}</span>}
                  </a>
                </motion.li>
                <motion.li
                  variants={menuItemVariants}
                  initial="initial"
                  whileHover="hover"
                >
                  <button 
                    onClick={handleLogout}
                    className={`w-full flex items-center ${windowWidth >= 768 && windowWidth < 1024 ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg transition-colors duration-200 ${
                      darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <LogOut className="text-lg" />
                    {(windowWidth < 768 || windowWidth >= 1024) && <span>{t('logout')}</span>}
                  </button>
                </motion.li>
              </ul>
            </div>
          </nav>

          {/* App version */}
          <div className={`p-4 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'} ${windowWidth >= 768 && windowWidth < 1024 ? 'text-center' : ''}`}>
            {windowWidth >= 768 && windowWidth < 1024 ? '1.2.0' : `${t('version')} 1.2.0`}
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm z-10 transition-colors duration-300`}>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <motion.button 
                onClick={toggleSidebar} 
                className={`mr-4 rounded-full p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} md:hidden transition-colors duration-200`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Menu className="h-6 w-6" />
              </motion.button>
              <motion.h1 
                className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {t('dashboard')}
              </motion.h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* Theme toggle */}
              <motion.button
                onClick={toggleDarkMode}
                className={`rounded-full p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors duration-200`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </motion.button>

              {/* Language selection */}
              <div className="relative">
                <motion.button
                  onClick={() => {
                    setLanguageMenuOpen(!languageMenuOpen);
                    setUserMenuOpen(false);
                  }}
                  className={`rounded-full p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors duration-200 relative`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Change language"
                >
                  <Globe className="h-5 w-5" />
                </motion.button>

                <AnimatePresence>
                  {languageMenuOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      className={`absolute right-0 mt-2 w-36 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-md shadow-lg z-40 border overflow-hidden`}
                    >
                      <button 
                        onClick={() => changeLanguage('fr')}
                        className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between ${
                          darkMode 
                            ? 'hover:bg-gray-700 text-white' 
                            : 'hover:bg-gray-100 text-gray-700'
                        } ${language === 'fr' ? 'font-bold' : ''}`}
                      >
                        Français
                        {language === 'fr' && <ChevronRight size={16} />}
                      </button>
                      <button 
                        onClick={() => changeLanguage('en')}
                        className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between ${
                          darkMode 
                            ? 'hover:bg-gray-700 text-white' 
                            : 'hover:bg-gray-100 text-gray-700'
                        } ${language === 'en' ? 'font-bold' : ''}`}
                      >
                        English
                        {language === 'en' && <ChevronRight size={16} />}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Notifications */}
              <div className="relative">
                <motion.button 
                  className={`rounded-full p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} relative transition-colors duration-200`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <motion.span 
                      className="absolute top-0 right-0 h-5 w-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                      {notifications}
                    </motion.span>
                  )}
                </motion.button>
              </div>

              {/* User profile menu */}
              <div className="relative">
                <motion.button
                  onClick={() => {
                    setUserMenuOpen(!userMenuOpen);
                    setLanguageMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 p-2 rounded-lg ${
                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  } transition-colors duration-200`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <motion.div 
                    className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {getUserInitials()}
                  </motion.div>
                  <span className="hidden md:inline font-medium">
                    {userData ? `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || userData.email : t('loading')}
                  </span>
                  <ChevronDown size={16} className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} hidden md:block`} />
                </motion.button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div 
                      variants={dropdownVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      className={`absolute right-0 mt-2 w-48 ${
                        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                      } rounded-md shadow-lg z-40 border overflow-hidden`}
                    >
                      <div className={`p-3 ${darkMode ? 'border-gray-700' : 'border-gray-100'} border-b`}>
                        <p className="font-medium">
                          {userData ? `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || t('user') : t('loading')}
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{userData?.email || ''}</p>
                      </div>
                      <motion.button 
                        onClick={handleOpenProfileModal}
                        className={`w-full text-left px-4 py-2 text-sm ${
                          darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                        } flex items-center transition-colors duration-200`}
                        whileHover={{ x: 5 }}
                      >
                        <User size={16} className="mr-2" />
                        {t('profile')}
                      </motion.button>
                      <motion.button 
                        className={`w-full text-left px-4 py-2 text-sm ${
                          darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                        } flex items-center transition-colors duration-200`}
                        whileHover={{ x: 5 }}
                      >
                        <Settings size={16} className="mr-2" />
                        {t('settings')}
                      </motion.button>
                      <motion.button 
                        onClick={handleLogout}
                        className={`w-full text-left px-4 py-2 text-sm ${
                          darkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-gray-100'
                        } flex items-center transition-colors duration-200`}
                        whileHover={{ x: 5 }}
                      >
                        <LogOut size={16} className="mr-2" />
                        {t('logout')}
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className={`flex-1 overflow-y-auto p-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
          {isLoading ? (
            <motion.div
              className="flex justify-center items-center h-64"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className={`rounded-full h-12 w-12 border-t-2 border-b-2 ${darkMode ? 'border-blue-400' : 'border-blue-500'}`}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {children}
            </motion.div>
          )}
        </main>
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfileModal && (
          <ProfileModal 
            userData={userData} 
            onClose={() => setShowProfileModal(false)} 
            onUpdate={(updatedData) => setUserData(updatedData)}
            darkMode={darkMode}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DeliveryLayout;