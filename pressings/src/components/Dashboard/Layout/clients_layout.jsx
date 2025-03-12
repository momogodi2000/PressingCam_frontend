import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, User, ChevronDown, Menu, X, Home, Package, 
  CreditCard, Calendar, Settings, HelpCircle, LogOut,
  MessageSquare
} from 'lucide-react';

const ClientsLayout = ({ children }) => {
  const [notifications, setNotifications] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data for notifications
  const notificationsList = [
    { id: 1, message: 'Votre commande ORD-2025-001 est maintenant en traitement.', time: 'Il y a 2 heures', read: false },
    { id: 2, message: 'Le livreur arrivera pour le ramassage de ORD-2025-002 dans 30 minutes.', time: 'Il y a 5 heures', read: false },
    { id: 3, message: 'Promotion spéciale: -15% sur le pressing ce weekend!', time: 'Il y a 1 jour', read: false },
    { id: 4, message: 'Votre commande ORD-2025-000 a été livrée avec succès.', time: 'Il y a 7 jours', read: true },
  ];

  // Menu items
  const menuItems = [
    { icon: <Home size={20} />, label: 'Tableau de bord', href: '#' },
    { icon: <Package size={20} />, label: 'Mes commandes', href: '#' },
    { icon: <Calendar size={20} />, label: 'Planifier', href: '#' },
    { icon: <CreditCard size={20} />, label: 'Paiements', href: '#' },
    { icon: <MessageSquare size={20} />, label: 'Messages', href: '#' },
    { icon: <Settings size={20} />, label: 'Paramètres', href: '#' },
    { icon: <HelpCircle size={20} />, label: 'Aide', href: '#' },
  ];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Sidebar variants for animation
  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  // Overlay variants
  const overlayVariants = {
    open: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 mr-2 rounded-md hover:bg-gray-100 lg:hidden"
            >
              <Menu size={24} className="text-gray-600" />
            </button>
            <img
              src="/logo.png"
              alt="Contour Wash Logo"
              className="h-8 mr-4"
            />
            <h1 className="text-xl font-bold text-gray-800 hidden sm:block">Tableau de bord</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-full hover:bg-gray-100"
            >
              <Bell size={20} className="text-gray-600" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  JK
                </div>
                <span className="hidden md:inline text-sm font-medium">Jean Kamga</span>
                <ChevronDown size={16} className="text-gray-600" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-40">
                  <div className="p-3 border-b border-gray-100">
                    <p className="font-medium">Jean Kamga</p>
                    <p className="text-sm text-gray-500">jean.kamga@example.com</p>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <User size={16} className="mr-2" />
                    Mon profil
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <Settings size={16} className="mr-2" />
                    Paramètres
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center">
                    <LogOut size={16} className="mr-2" />
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <motion.div 
          initial="closed"
          animate="open"
          variants={overlayVariants}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div 
        className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 lg:z-10 lg:translate-x-0 lg:relative" 
        initial={sidebarOpen ? "open" : "closed"}
        animate={sidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/logo.png" alt="Contour Wash Logo" className="h-8 mr-2" />
            <h2 className="font-bold text-lg">Contour Wash</h2>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-md hover:bg-gray-100 lg:hidden"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="py-4">
          <div className="px-4 mb-4">
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                JK
              </div>
              <div>
                <p className="font-medium">Jean Kamga</p>
                <div className="flex items-center">
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded">Gold</span>
                  <span className="text-xs text-gray-500 ml-1">1250 pts</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-3">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Menu principal</p>
            <nav className="space-y-1">
              {menuItems.slice(0, 5).map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm rounded-lg ${
                    index === 0 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className={`mr-3 ${index === 0 ? 'text-blue-600' : 'text-gray-500'}`}>
                    {item.icon}
                  </span>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-6 px-3">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Support</p>
            <nav className="space-y-1">
              {menuItems.slice(5).map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center px-3 py-2 text-sm rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  <span className="mr-3 text-gray-500">
                    {item.icon}
                  </span>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-6 px-4">
            <div className="bg-blue-600 bg-opacity-10 rounded-lg p-4">
              <h3 className="font-medium text-blue-800 mb-2">Besoin d'aide?</h3>
              <p className="text-sm text-blue-700 mb-3">Notre équipe est disponible 7j/7 pour vous assister.</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-3 rounded-md w-full">
                Contacter le support
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="lg:ml-64 transition-all duration-300">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            children
          )}
        </main>
      </div>

      {/* Notifications dropdown */}
      {showNotifications && (
        <div className="fixed right-4 top-16 bg-white rounded-lg shadow-lg w-80 z-50">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold">Notifications</h3>
            <button className="text-sm text-blue-600">Marquer tout comme lu</button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notificationsList.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${
                  !notification.read ? 'bg-blue-50' : ''
                }`}
              >
                <p className="text-sm">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
              </div>
            ))}
          </div>
          <div className="p-4 text-center text-sm text-blue-600 hover:bg-gray-50 cursor-pointer">
            Voir toutes les notifications
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientsLayout;