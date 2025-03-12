import React, { useState } from 'react';
import { 
  User,  Menu,  X,  Home,  Package,  Truck,  ClipboardList,  Settings,  LogOut,  Bell, Calendar,BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DeliveryLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const menuItems = [
    { icon: <Home />, label: 'Accueil', active: false },
    { icon: <Truck />, label: 'Livraisons', active: true },
    { icon: <Package />, label: 'Ramassages', active: false },
    { icon: <ClipboardList />, label: 'Historique', active: false },
    { icon: <BarChart3 />, label: 'Rapports', active: false },
    { icon: <Calendar />, label: 'Planning', active: false },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-20 bg-black md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ type: 'spring', damping: 25 }}
        className={`fixed z-30 h-full w-64 bg-white shadow-lg md:relative md:translate-x-0`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-500 text-white p-1 rounded">
                <Truck className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold text-blue-800">DeliTrack</span>
            </div>
            <button 
              onClick={toggleSidebar} 
              className="rounded-full p-1 hover:bg-gray-100 md:hidden"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* User profile */}
          <div className="border-b p-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Paul Ndjomo</h3>
                <p className="text-xs text-gray-500">Livreur - Zone Douala</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-2">
            <ul className="space-y-1">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                      item.active 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                    {item.active && <div className="ml-auto w-1.5 h-5 bg-blue-500 rounded-full"></div>}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t pt-4">
              <ul className="space-y-1">
                <li>
                  <a 
                    href="#" 
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100"
                  >
                    <Settings className="text-lg" />
                    <span>Paramètres</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100"
                  >
                    <LogOut className="text-lg" />
                    <span>Déconnexion</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          {/* App version */}
          <div className="p-4 text-xs text-gray-400">
            Version 1.2.0
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button 
                onClick={toggleSidebar} 
                className="mr-4 rounded-full p-2 hover:bg-gray-100 md:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-bold text-gray-800">Tableau de Bord Livreur</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="rounded-full p-2 hover:bg-gray-100 relative">
                  <Bell className="h-6 w-6" />
                  {notifications > 0 && (
                    <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <div className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  <span className="font-medium">Paul Ndjomo</span>
                </div>
                <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  <User className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DeliveryLayout;