import React, { useState, useEffect, createContext } from 'react';
import { 
  Users, Package, Truck, Calendar, Settings, Bell, LogOut, 
  TrendingUp, Search, Menu, X, ChevronDown, User, Globe, Check,
  Moon, Sun, ChevronsLeft, ChevronsRight
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthService from '../../../Services/auth/authentication';
import ProfileModal from '../clients/profile/my_profile';
import { motion, AnimatePresence } from 'framer-motion';

// Create language context to be used by child components
export const LanguageContext = createContext();

// Language data
const translations = {
  en: {
    mainMenu: "Main Menu",
    dashboard: "Dashboard",
    orders: "Orders",
    users: "Users",
    delivery: "Delivery",
    schedule: "Schedule",
    settings: "Settings",
    adminPanel: "Admin Panel",
    search: "Search orders, clients...",
    profile: "My Profile",
    logout: "Logout",
    notifications: "Notifications",
    markAllAsRead: "Mark all as read",
    viewAllNotifications: "View all notifications",
    loading: "Loading..."
  },
  fr: {
    mainMenu: "Menu Principal",
    dashboard: "Tableau de bord",
    orders: "Commandes",
    users: "Utilisateurs",
    delivery: "Livraison",
    schedule: "Planification",
    settings: "Paramètres",
    adminPanel: "Panneau Admin",
    search: "Rechercher commandes, clients...",
    profile: "Mon profil",
    logout: "Déconnexion",
    notifications: "Notifications",
    markAllAsRead: "Marquer tout comme lu",
    viewAllNotifications: "Voir toutes les notifications",
    loading: "Chargement..."
  }
};

// Sample notification translations
const notificationsData = {
  en: [
    { id: 1, message: 'New order #2025-001 pending', time: '10 min ago', read: false },
    { id: 2, message: 'Delivery #2025-002 completed', time: '1 hour ago', read: false },
    { id: 3, message: '5 new clients registered today', time: '3 hours ago', read: false },
    { id: 4, message: 'Monthly report available', time: '1 day ago', read: true },
  ],
  fr: [
    { id: 1, message: 'Nouvelle commande #2025-001 en attente', time: 'Il y a 10 min', read: false },
    { id: 2, message: 'Livraison #2025-002 complétée', time: 'Il y a 1 heure', read: false },
    { id: 3, message: '5 nouveaux clients inscrits aujourd\'hui', time: 'Il y a 3 heures', read: false },
    { id: 4, message: 'Rapport mensuel disponible', time: 'Il y a 1 jour', read: true },
  ]
};

export const AdminLayout = ({ 
  children, 
  activeTab, 
  setActiveTab, 
  searchQuery, 
  setSearchQuery, 
  selectedDate = new Date(), 
  setSelectedDate = () => {}, 
  notifications = [] 
}) => {
  // Language state
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('preferredLanguage') || 'fr';
  });
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  
  // Theme state
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  
  // Sidebar state with collapsed option
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Date picker state
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  
  // Authentication and profile states
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Get translations based on current language
  const t = translations[language];
  const currentNotifications = notifications.length > 0 
    ? notifications 
    : notificationsData[language];

  // Toggle language
  const toggleLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('preferredLanguage', newLanguage);
    setLanguageMenuOpen(false);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    // Apply dark mode to body
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Set initial dark mode class on body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle responsive sidebar based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
        setSidebarCollapsed(false);
      } else if (window.innerWidth >= 768) {
        setSidebarOpen(true);
        setSidebarCollapsed(true);
      } else {
        setSidebarOpen(false);
        setSidebarCollapsed(false);
      }
    };
    
    handleResize(); // Initialize on mount
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

  // Handle logout
  const handleLogout = async () => {
    try {
      await AuthService.logout();
      // Navigation is handled in the AuthService.logout method
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

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!userData) return "A";
    
    const names = [userData.first_name, userData.last_name].filter(Boolean);
    if (names.length === 0) {
      return userData.email.substring(0, 2).toUpperCase();
    }
    
    return names.map(name => name.charAt(0)).join('').toUpperCase();
  };

  // Animation variants
  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { x: "-100%", transition: { duration: 0.3 } },
    collapsed: { width: "5rem", transition: { duration: 0.3 } },
    expanded: { width: "16rem", transition: { duration: 0.3 } }
  };

  const dropdownVariants = {
    open: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      } 
    },
    closed: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: { 
        duration: 0.2 
      } 
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <div className={`flex h-screen overflow-hidden transition-colors duration-300 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        {/* Sidebar Overlay */}
        <AnimatePresence>
          {sidebarOpen && window.innerWidth < 768 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-10"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>
        
        {/* Sidebar */}
        <motion.aside 
          className={`fixed inset-y-0 left-0 z-20 flex flex-col ${
            darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          } shadow-lg`}
          variants={sidebarVariants}
          initial={false}
          animate={
            !sidebarOpen 
              ? "closed" 
              : sidebarCollapsed 
                ? "collapsed" 
                : "expanded"
          }
        >
          {/* Logo */}
          <div className={`px-4 pt-6 pb-4 flex items-center justify-between border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300`}>
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                CW
              </div>
              {!sidebarCollapsed && (
                <div className="transition-all duration-300">
                  <h1 className="text-xl font-bold">Contour Wash</h1>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {t.adminPanel}
                  </p>
                </div>
              )}
            </div>
            {/* Toggle collapsed sidebar in desktop */}
            <div className="flex">
              <button 
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className={`hidden md:flex p-1.5 rounded-md focus:outline-none ${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                {sidebarCollapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
              </button>
              {/* Mobile close button */}
              <button 
                onClick={() => setSidebarOpen(false)}
                className={`md:hidden p-1.5 rounded-md focus:outline-none ${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                <X size={18} />
              </button>
            </div>
          </div>
          
          {/* User profile info at top for mobile */}
          {!sidebarCollapsed && (
            <div className="md:hidden p-4 border-b border-gray-200 dark:border-gray-700">
              <div className={`flex items-center p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  {getUserInitials()}
                </div>
                <div>
                  <p className="font-medium">
                    {userData ? `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || userData.email : t.loading}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {userData?.role || 'Admin'}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Navigation - scrollable */}
          <nav className="mt-4 px-3 flex-1 overflow-y-auto">
            <div>
              {!sidebarCollapsed && (
                <p className={`text-xs font-semibold uppercase tracking-wider px-3 mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.mainMenu}
                </p>
              )}
              <div className="space-y-1 py-2">
                  <motion.button
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/admin_panel')}
                    className={`w-full flex items-center px-3 py-2.5 text-sm rounded-md transition-colors ${
                      location.pathname === '/admin_panel'
                        ? `${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-50 text-blue-600'}`
                        : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                    }`}
                  >
                    <TrendingUp size={18} className={`${sidebarCollapsed ? 'mx-auto' : 'mr-3'}`} />
                    {!sidebarCollapsed && <span>{t.dashboard}</span>}
                  </motion.button>
                
                <motion.button
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center px-3 py-2.5 text-sm rounded-md transition-colors ${
                    activeTab === 'orders' 
                      ? `${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-50 text-blue-600'}` 
                      : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                  }`}
                >
                  <Package size={18} className={`${sidebarCollapsed ? 'mx-auto' : 'mr-3'}`} />
                  {!sidebarCollapsed && <span>{t.orders}</span>}
                </motion.button>
                
                <motion.button
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/user_crud')}
                        className={`w-full flex items-center px-3 py-2.5 text-sm rounded-md transition-colors ${
                          location.pathname === '/user_crud'
                            ? `${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-50 text-blue-600'}`
                            : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                        }`}
                      >
                        <Users size={18} className={`${sidebarCollapsed ? 'mx-auto' : 'mr-3'}`} />
                        {!sidebarCollapsed && <span>{t.users}</span>}
                  </motion.button>
                
                <motion.button
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('delivery')}
                  className={`w-full flex items-center px-3 py-2.5 text-sm rounded-md transition-colors ${
                    activeTab === 'delivery' 
                      ? `${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-50 text-blue-600'}` 
                      : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                  }`}
                >
                  <Truck size={18} className={`${sidebarCollapsed ? 'mx-auto' : 'mr-3'}`} />
                  {!sidebarCollapsed && <span>{t.delivery}</span>}
                </motion.button>
                
                <motion.button
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('schedule')}
                  className={`w-full flex items-center px-3 py-2.5 text-sm rounded-md transition-colors ${
                    activeTab === 'schedule' 
                      ? `${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-50 text-blue-600'}` 
                      : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                  }`}
                >
                  <Calendar size={18} className={`${sidebarCollapsed ? 'mx-auto' : 'mr-3'}`} />
                  {!sidebarCollapsed && <span>{t.schedule}</span>}
                </motion.button>
               

                <motion.button
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center px-3 py-2.5 text-sm rounded-md transition-colors ${
                    activeTab === 'settings' 
                      ? `${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-50 text-blue-600'}` 
                      : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                  }`}
                >
                  <Settings size={18} className={`${sidebarCollapsed ? 'mx-auto' : 'mr-3'}`} />
                  {!sidebarCollapsed && <span>{t.settings}</span>}
                </motion.button>
              </div>
            </div>
          </nav>
          
          {/* User profile and settings bottom buttons */}
          <div className={`border-t p-4 mt-auto ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            {!sidebarCollapsed ? (
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  {getUserInitials()}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-sm font-medium truncate">
                    {userData ? `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || userData.email : t.loading}
                  </h2>
                  <p className={`text-xs truncate ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {userData?.role || 'Admin'}
                  </p>
                </div>
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={handleLogout}
                  className={darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'}
                >
                  <LogOut size={18} />
                </motion.button>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-3">
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  className="rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={handleLogout}
                >
                  <LogOut size={20} />
                </motion.button>
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  {getUserInitials()}
                </div>
              </div>
            )}
          </div>
        </motion.aside>
        
        {/* Main content */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen 
            ? sidebarCollapsed 
              ? 'md:ml-20' 
              : 'md:ml-64' 
            : ''
        }`}>
          {/* Header */}
          <header className={`sticky top-0 z-10 border-b shadow-sm transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="px-4 sm:px-6 h-16 flex items-center justify-between">
              {/* Mobile menu button */}
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)} 
                className="md:hidden p-2 rounded-md focus:outline-none"
                aria-label="Toggle menu"
              >
                <Menu size={24} className={darkMode ? 'text-white' : 'text-gray-600'} />
              </button>
              
              {/* Search */}
              <div className="relative w-full max-w-md mx-4">
                <input
                  type="text"
                  placeholder={t.search}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search size={18} className={`absolute left-3 top-2.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              
              {/* Date picker, theme toggle, language & notifications & user menu */}
              <div className="flex items-center space-x-3">
                {/* Dark mode toggle */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleDarkMode}
                  className={`p-2 rounded-full focus:outline-none ${
                    darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'
                  }`}
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </motion.button>

                {/* Language selector */}
                <div className="relative">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                    className={`p-2 rounded-full focus:outline-none ${
                      darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    aria-label="Change language"
                  >
                    <Globe size={18} />
                  </motion.button>
                  
                  <AnimatePresence>
                    {languageMenuOpen && (
                      <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={dropdownVariants}
                        className={`absolute right-0 mt-2 w-32 rounded-md shadow-lg z-30 ${
                          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                        }`}
                      >
                        <div className="py-1">
                          <button
                            onClick={() => toggleLanguage('en')}
                            className={`flex items-center justify-between w-full px-4 py-2 text-sm ${
                              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                            }`}
                          >
                            <span>English</span>
                            {language === 'en' && <Check size={16} className="text-blue-500" />}
                          </button>
                          <button
                            onClick={() => toggleLanguage('fr')}
                            className={`flex items-center justify-between w-full px-4 py-2 text-sm ${
                              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                            }`}
                          >
                            <span>Français</span>
                            {language === 'fr' && <Check size={16} className="text-blue-500" />}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <div className="relative">
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    className={`flex items-center space-x-2 text-sm rounded-lg px-3 py-2 ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                        : 'bg-white border-gray-300 hover:bg-gray-100'
                    }`}
                    onClick={() => setDatePickerOpen(!datePickerOpen)}
                  >
                    <Calendar size={16} />
                    <span className="hidden sm:inline">{selectedDate.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}</span>
                    <ChevronDown size={16} />
                  </motion.button>
                  
                  <AnimatePresence>
                    {datePickerOpen && (
                      <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={dropdownVariants}
                        className={`absolute right-0 mt-2 rounded-lg shadow-lg p-4 z-30 ${
                          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                        }`}
                      >
                        {/* Improved date picker */}
                        <div className="w-64">
                          <div className="flex justify-between items-center mb-4">
                            <button 
                              className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                              onClick={() => {
                                const prevMonth = new Date(selectedDate);
                                prevMonth.setMonth(prevMonth.getMonth() - 1);
                                setSelectedDate(prevMonth);
                              }}
                            >
                              <ChevronDown className="rotate-90" size={16} />
                            </button>
                            <div className="font-medium">
                              {selectedDate.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { month: 'long', year: 'numeric' })}
                            </div>
                            <button 
                              className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                              onClick={() => {
                                const nextMonth = new Date(selectedDate);
                                nextMonth.setMonth(nextMonth.getMonth() + 1);
                                setSelectedDate(nextMonth);
                              }}
                            >
                              <ChevronDown className="-rotate-90" size={16} />
                            </button>
                          </div>
                          <div className="grid grid-cols-7 gap-1">
                            {language === 'fr' 
                              ? ['L', 'M', 'M', 'J', 'V', 'S', 'D']
                              : ['S', 'M', 'T', 'W', 'T', 'F', 'S']
                            }.map((day, i) ={'>'} (
                              <div key={i} className={`text-center text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {day}
                              </div>
                            )){'}'}
                            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                              <motion.button
                                key={day}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className={`h-8 w-8 rounded-full text-sm ${
                                  day === selectedDate.getDate() 
                                    ? 'bg-blue-600 text-white' 
                                    : darkMode 
                                      ? 'hover:bg-gray-700' 
                                      : 'hover:bg-gray-100'
                                }`}
                                onClick={() => {
                                  const newDate = new Date(selectedDate);
                                  newDate.setDate(day);
                                  setSelectedDate(newDate);
                                  setDatePickerOpen(false);
                                }}
                              >
                                {day}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Notifications */}
                <div className="relative">
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 rounded-full focus:outline-none ${
                      darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    onClick={() => setShowNotifications(!showNotifications)}
                  >
                    <Bell size={20} />
                    {currentNotifications.filter(n => !n.read).length > 0 && (
                      <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                        {currentNotifications.filter(n => !n.read).length}
                      </span>
                    )}
                  </motion.button>
                  
                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={dropdownVariants}
                        className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg z-30 ${
                          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                        }`}
                      >
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                          <h3 className="font-semibold">{t.notifications}</h3>
                          <button 
                            onClick={() => {
                              // Reset notifications
                              setShowNotifications(false);
                            }}
                            className="text-sm text-blue-600"
                          >
                            {t.markAllAsRead}
                          </button>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                          {currentNotifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
                                !notification.read ? 'bg-blue-50 dark:bg-blue-900' : ''
                              }`}
                            >
                              <p className="text-sm">{notification.message}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                            </div>
                          ))}
                        </div>
                        <div className="p-4 text-center text-sm text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                          {t.viewAllNotifications}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* User menu */}
                <div className="relative">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className={`hidden md:flex items-center space-x-2 p-2 rounded-full focus:outline-none ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {getUserInitials()}
                    </div>
                    <ChevronDown size={16} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
                  </motion.button>
                  
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={dropdownVariants}
                        className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg z-30 ${
                          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                        }`}
                      >
                        <div className="p-3 border-b border-gray-100 dark:border-gray-700">
                          <p className="font-medium">
                            {userData ? `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || 'Utilisateur' : t.loading}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{userData?.email || ''}</p>
                        </div>
                        <button 
                          onClick={handleOpenProfileModal}
                          className={`w-full text-left px-4 py-2 text-sm ${
                            darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                          } flex items-center`}
                        >
                          <User size={16} className="mr-2" />
                          {t.profile}
                        </button>
                        <button 
                          onClick={() => setActiveTab('settings')}
                          className={`w-full text-left px-4 py-2 text-sm ${
                            darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                          } flex items-center`}
                        >
                          <Settings size={16} className="mr-2" />
                          {t.settings}
                        </button>
                        <button 
                          onClick={handleLogout}
                          className={`w-full text-left px-4 py-2 text-sm ${
                            darkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-gray-100'
                          } flex items-center`}
                        >
                          <LogOut size={16} className="mr-2" />
                          {t.logout}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </header>
          
          {/* Main content area - scrollable */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                children
              )}
            </div>
          </main>
        </div>
        
        {/* Profile Modal */}
        {showProfileModal && (
          <ProfileModal 
            userData={userData} 
            onClose={() => setShowProfileModal(false)} 
            onUpdate={(updatedData) => setUserData(updatedData)}
          />
        )}
      </div>
    </LanguageContext.Provider>
  );
};

export default AdminLayout;