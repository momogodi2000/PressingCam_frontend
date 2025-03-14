import React, { useState, useEffect } from 'react';
import { 
  Users, Package, Truck, Calendar, Settings, Bell, LogOut, 
  TrendingUp, Search, Menu, X, ChevronDown
} from 'lucide-react';

export const AdminLayout = ({ 
  children, 
  activeTab, 
  setActiveTab, 
  searchQuery, 
  setSearchQuery, 
  selectedDate, 
  setSelectedDate, 
  notifications 
}) => {
  // Sidebar state with responsive default
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  
  // Handle responsive sidebar based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Date picker state
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar Overlay */}
      {sidebarOpen && window.innerWidth < 768 && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-10"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out z-20 flex flex-col`}
      >
        {/* Logo */}
        <div className="px-6 pt-8 pb-4 flex items-center border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
              CW
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Contour Wash</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
        </div>
        
        {/* Navigation - scrollable */}
        <nav className="mt-6 px-4 flex-1 overflow-y-auto">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
              Menu Principal
            </p>
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <TrendingUp size={18} className="mr-3" />
                <span>Tableau de bord</span>
              </button>
              
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${activeTab === 'orders' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <Package size={18} className="mr-3" />
                <span>Commandes</span>
              </button>
              
              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${activeTab === 'users' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <Users size={18} className="mr-3" />
                <span>Utilisateurs</span>
              </button>
              
              <button
                onClick={() => setActiveTab('delivery')}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${activeTab === 'delivery' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <Truck size={18} className="mr-3" />
                <span>Livraison</span>
              </button>
              
              <button
                onClick={() => setActiveTab('schedule')}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${activeTab === 'schedule' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <Calendar size={18} className="mr-3" />
                <span>Planification</span>
              </button>
              
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${activeTab === 'settings' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <Settings size={18} className="mr-3" />
                <span>Paramètres</span>
              </button>
            </div>
          </div>
        </nav>
        
        {/* User profile */}
        <div className="border-t border-gray-200 p-4 mt-auto">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              ME
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-medium text-gray-900 truncate">Marie Ekambi</h2>
              <p className="text-xs text-gray-500 truncate">Responsable des opérations</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300 ease-in-out">
        {/* Header */}
        <header className="sticky top-0 bg-white z-10 border-b border-gray-200 shadow-sm">
          <div className="px-4 sm:px-6 h-16 flex items-center justify-between">
            {/* Mobile menu button */}
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              <Menu size={24} />
            </button>
            
            {/* Search */}
            <div className="relative w-full max-w-md mx-4">
              <input
                type="text"
                placeholder="Rechercher commandes, clients..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            
            {/* Date picker & notifications */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button 
                  className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg px-3 py-2"
                  onClick={() => setDatePickerOpen(!datePickerOpen)}
                >
                  <Calendar size={16} />
                  <span className="hidden sm:inline">{selectedDate.toLocaleDateString('fr-FR')}</span>
                  <ChevronDown size={16} />
                </button>
                
                {datePickerOpen && (
                  <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-30">
                    {/* Simplified date picker */}
                    <div className="grid grid-cols-7 gap-1">
                      {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
                        <div key={i} className="text-center text-xs font-medium text-gray-500">
                          {day}
                        </div>
                      ))}
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                        <button
                          key={day}
                          className={`h-8 w-8 rounded-full text-sm ${day === selectedDate.getDate() ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
                          onClick={() => {
                            const newDate = new Date(selectedDate);
                            newDate.setDate(day);
                            setSelectedDate(newDate);
                            setDatePickerOpen(false);
                          }}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <button className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none">
                  <Bell size={20} />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main content area - scrollable */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;