import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { 
  Users, Package, Truck, Calendar, Settings, Bell, LogOut, 
  DollarSign, TrendingUp, Search, Menu, X, ChevronDown,
  Map, Clock, CheckCircle, AlertTriangle, ArrowRight
} from 'lucide-react';

export const AdminDashboard = () => {
  // State management
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  
  // Mock data for demonstration
  const revenueData = [
    { month: 'Jan', revenue: 3500000, target: 3000000 },
    { month: 'Feb', revenue: 4200000, target: 3500000 },
    { month: 'Mar', revenue: 3800000, target: 3500000 },
    { month: 'Apr', revenue: 4500000, target: 4000000 },
    { month: 'May', revenue: 5200000, target: 4500000 },
    { month: 'Jun', revenue: 4800000, target: 4500000 },
  ];
  
  const serviceData = [
    { name: 'Pressing', value: 45 },
    { name: 'Blanchisserie', value: 30 },
    { name: 'Chaussures', value: 25 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
  
  const mockOrders = [
    { id: 'ORD-7829', client: 'Jean Kamga', service: 'Pressing', items: 5, amount: 12500, status: 'En attente de ramassage', date: '12/03/2025 10:30' },
    { id: 'ORD-7830', client: 'Famille Mbarga', service: 'Blanchisserie', items: 12, amount: 20400, status: 'Ramassée', date: '12/03/2025 09:15' },
    { id: 'ORD-7831', client: 'Sophie Eyenga', service: 'Chaussures', items: 2, amount: 8500, status: 'En traitement', date: '12/03/2025 08:45' },
    { id: 'ORD-7832', client: 'Robert Essama', service: 'Pressing', items: 3, amount: 6800, status: 'Prête', date: '11/03/2025 16:20' },
    { id: 'ORD-7833', client: 'Marie Ngo', service: 'Blanchisserie', items: 8, amount: 13600, status: 'En attente de livraison', date: '11/03/2025 14:05' },
  ];
  
  const mockStats = {
    ordersPending: 28,
    ordersProcessing: 42,
    ordersCompleted: 187,
    totalRevenue: 5245000,
    activeDeliveries: 12,
    customersTotal: 342,
    newCustomers: 28,
    avgOrderValue: 15300
  };
  
  const mockNotifications = [
    { id: 1, message: 'Nouvelle commande (#ORD-7834) reçue', time: 'il y a 5 min', read: false },
    { id: 2, message: 'Retard de livraison pour la commande #ORD-7820', time: 'il y a 32 min', read: false },
    { id: 3, message: 'Paiement confirmé pour la commande #ORD-7825', time: 'il y a 1h', read: true },
    { id: 4, message: 'Paul Ndjomo a terminé 5 livraisons aujourd\'hui', time: 'il y a 3h', read: true },
  ];
  
  // Simulate API fetch
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setOrders(mockOrders);
      setStats(mockStats);
      setNotifications(mockNotifications);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter orders based on search query
  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.status.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'En attente de ramassage':
        return 'text-yellow-500 bg-yellow-50';
      case 'Ramassée':
        return 'text-blue-500 bg-blue-50';
      case 'En traitement':
        return 'text-purple-500 bg-purple-50';
      case 'Prête':
        return 'text-teal-500 bg-teal-50';
      case 'En attente de livraison':
        return 'text-indigo-500 bg-indigo-50';
      case 'Livrée':
        return 'text-green-500 bg-green-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };
  
  // Format number to CFA
  const formatCFA = (value) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0
    }).format(value);
  };
  
  // Render loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mb-4 mx-auto"></div>
          <h2 className="text-xl font-semibold text-gray-700">Chargement du tableau de bord...</h2>
          <p className="text-gray-500 mt-1">Veuillez patienter</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="fixed z-30 bottom-4 right-4 md:hidden">
        <button 
          onClick={toggleSidebar}
          className="p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 z-20 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out`}
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
        
        {/* Navigation */}
        <nav className="mt-6 px-4">
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
            </div>
          </div>
          
          <div className="mt-8">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
              Configuration
            </p>
            <div className="space-y-1">
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
        <div className="absolute bottom-0 w-full border-t border-gray-200 p-4">
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
      </div>
      
      {/* Main content */}
      <div className={`flex-1 ml-0 md:ml-64 transition-all duration-300 ease-in-out`}>
        {/* Header */}
        <header className="sticky top-0 bg-white z-10 border-b border-gray-200 shadow-sm">
          <div className="px-4 sm:px-6 h-16 flex items-center justify-between">
            {/* Search */}
            <div className="relative w-full max-w-md">
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
                  <span>{selectedDate.toLocaleDateString('fr-FR')}</span>
                  <ChevronDown size={16} />
                </button>
                
                {datePickerOpen && (
                  <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-30">
                    {/* Simplified date picker for demo */}
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
                  <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <main className="px-4 sm:px-6 py-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
                <p className="text-gray-500">Bienvenue, Marie. Voici un aperçu de l'activité d'aujourd'hui.</p>
              </div>
              
              {/* Stats cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6 transition-transform hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Commandes en attente</p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.ordersPending}</h3>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                      <Clock size={24} />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-gray-500">Commandes à traiter</span>
                    <span className="ml-2 text-orange-500 font-medium flex items-center">
                      <ArrowRight size={16} className="mr-1" /> Voir détails
                    </span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6 transition-transform hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Livraisons en cours</p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.activeDeliveries}</h3>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                      <Truck size={24} />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-gray-500">Estimation terminaison</span>
                    <span className="ml-2 text-blue-500 font-medium">17h30</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6 transition-transform hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Commandes terminées</p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.ordersCompleted}</h3>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                      <CheckCircle size={24} />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-gray-500">Mois en cours</span>
                    <span className="ml-2 text-green-500 font-medium flex items-center">
                      +12% <TrendingUp size={16} className="ml-1" />
                    </span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6 transition-transform hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Revenus</p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">{formatCFA(stats.totalRevenue)}</h3>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
                      <DollarSign size={24} />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-gray-500">Panier moyen</span>
                    <span className="ml-2 text-purple-500 font-medium">{formatCFA(stats.avgOrderValue)}</span>
                  </div>
                </div>
              </div>
              
              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenus mensuels</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={revenueData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
                        <Tooltip 
                          formatter={(value) => [`${formatCFA(value)}`, 'Montant']}
                          labelFormatter={(value) => `Mois: ${value}`}
                        />
                        <Legend />
                        <Bar dataKey="revenue" name="Revenu" fill="#4f46e5" />
                        <Bar dataKey="target" name="Objectif" fill="#e5e7eb" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Répartition des services</h3>
                  <div className="h-64 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={serviceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {serviceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Pourcentage']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4">
                    <div className="grid grid-cols-3 gap-2">
                      {serviceData.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div 
                            className="h-3 w-3 rounded-full mr-2" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          ></div>
                          <span className="text-xs text-gray-600">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recent orders */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Commandes récentes</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      Voir toutes les commandes
                    </button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.client}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.service}
                            <span className="ml-2 text-gray-400">({order.items} articles)</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCFA(order.amount)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">Détails</button>
                            <button className="text-gray-600 hover:text-gray-900">Éditer</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Affichage de <span className="font-medium">1</span> à <span className="font-medium">5</span> sur <span className="font-medium">28</span> résultats
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50" disabled>
                        Précédent
                      </button>
                      <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50">
                        Suivant
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Activity & alerts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité récente</h3>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className={`p-3 rounded-lg border ${notification.read ? 'border-gray-200 bg-white' : 'border-blue-200 bg-blue-50'}`}>
                        <div className="flex items-start">
                          <div className={`mt-0.5 h-2 w-2 rounded-full ${notification.read ? 'bg-gray-300' : 'bg-blue-500'}`}></div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm text-gray-900">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 text-center text-sm text-blue-600 hover:text-blue-800">
                    Voir toutes les notifications
                  </button>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Alertes importantes</h3>
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg border border-red-200 bg-red-50">
                      <div className="flex items-start">
                        <div className="mt-0.5 h-2 w-2 rounded-full bg-red-500"></div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm text-gray-900">Retard de livraison pour la commande #ORD-7820</p>
                          <p className="text-xs text-gray-500 mt-1">il y a 32 min</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg border border-yellow-200 bg-yellow-50">
                      <div className="flex items-start">
                        <div className="mt-0.5 h-2 w-2 rounded-full bg-yellow-500"></div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm text-gray-900">Paiement en attente pour la commande #ORD-7834</p>
                          <p className="text-xs text-gray-500 mt-1">il y a 1h</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg border border-blue-200 bg-blue-50">
                      <div className="flex items-start">
                        <div className="mt-0.5 h-2 w-2 rounded-full bg-blue-500"></div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm text-gray-900">Nouvelle commande (#ORD-7835) reçue</p>
                          <p className="text-xs text-gray-500 mt-1">il y a 2h</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-4 text-center text-sm text-blue-600 hover:text-blue-800">
                    Voir toutes les alertes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab Content */}
          {activeTab === 'orders' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Gestion des commandes</h1>
                <p className="text-gray-500">Consultez et gérez toutes les commandes passées par les clients.</p>
              </div>

              {/* Orders Table */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Toutes les commandes</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      Exporter les données
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.client}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.service}
                            <span className="ml-2 text-gray-400">({order.items} articles)</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCFA(order.amount)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">Détails</button>
                            <button className="text-gray-600 hover:text-gray-900">Éditer</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Affichage de <span className="font-medium">1</span> à <span className="font-medium">5</span> sur <span className="font-medium">28</span> résultats
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50" disabled>
                        Précédent
                      </button>
                      <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50">
                        Suivant
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab Content */}
          {activeTab === 'users' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Gestion des utilisateurs</h1>
                <p className="text-gray-500">Consultez et gérez les utilisateurs de l'application.</p>
              </div>

              {/* Users Table */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Tous les utilisateurs</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      Ajouter un utilisateur
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Téléphone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date d'inscription</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* Mock user data */}
                      {[
                        { id: 1, name: 'Jean Kamga', email: 'jean.kamga@example.com', phone: '+237 691667137', role: 'Client', date: '12/03/2025' },
                        { id: 2, name: 'Marie Ekambi', email: 'marie.ekambi@example.com', phone: '+237 671465886', role: 'Admin', date: '11/03/2025' },
                        { id: 3, name: 'Paul Ndjomo', email: 'paul.ndjomo@example.com', phone: '+237 699887766', role: 'Livreur', date: '10/03/2025' },
                      ].map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">Éditer</button>
                            <button className="text-red-600 hover:text-red-900">Supprimer</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Affichage de <span className="font-medium">1</span> à <span className="font-medium">3</span> sur <span className="font-medium">342</span> résultats
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50" disabled>
                        Précédent
                      </button>
                      <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50">
                        Suivant
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Delivery Tab Content */}
          {activeTab === 'delivery' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Gestion des livraisons</h1>
                <p className="text-gray-500">Suivez et gérez les livraisons en cours.</p>
              </div>

              {/* Delivery Map */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Carte des livraisons</h3>
                <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Map size={48} className="text-gray-400" />
                  <p className="text-gray-500 ml-3">Carte des livraisons en temps réel</p>
                </div>
              </div>

              {/* Delivery List */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Livraisons en cours</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      Voir toutes les livraisons
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Livreur</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heure estimée</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* Mock delivery data */}
                      {[
                        { id: 'DLV-123', driver: 'Paul Ndjomo', client: 'Jean Kamga', status: 'En cours', time: '14h30' },
                        { id: 'DLV-124', driver: 'Marie Ekambi', client: 'Famille Mbarga', status: 'En attente', time: '15h00' },
                        { id: 'DLV-125', driver: 'Sophie Eyenga', client: 'Robert Essama', status: 'Terminée', time: '13h45' },
                      ].map((delivery) => (
                        <tr key={delivery.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{delivery.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{delivery.driver}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{delivery.client}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(delivery.status)}`}>
                              {delivery.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{delivery.time}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">Détails</button>
                            <button className="text-gray-600 hover:text-gray-900">Éditer</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Affichage de <span className="font-medium">1</span> à <span className="font-medium">3</span> sur <span className="font-medium">12</span> résultats
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50" disabled>
                        Précédent
                      </button>
                      <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50">
                        Suivant
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Schedule Tab Content */}
          {activeTab === 'schedule' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Planification des services</h1>
                <p className="text-gray-500">Planifiez et gérez les ramassages et livraisons.</p>
              </div>

              {/* Schedule Calendar */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Calendrier des services</h3>
                <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Calendar size={48} className="text-gray-400" />
                  <p className="text-gray-500 ml-3">Calendrier des ramassages et livraisons</p>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab Content */}
          {activeTab === 'settings' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
                <p className="text-gray-500">Configurez les paramètres de l'application.</p>
              </div>

              {/* Settings Form */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Paramètres généraux</h3>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="company-name" className="block text-sm font-medium text-gray-700">Nom de l'entreprise</label>
                    <input
                      type="text"
                      id="company-name"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue="Contour Wash"
                    />
                  </div>

                  <div>
                    <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">Fuseau horaire</label>
                    <select
                      id="timezone"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="Africa/Douala">(GMT+1:00) Douala</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="currency" className="block text-sm font-medium text-gray-700">Devise</label>
                    <select
                      id="currency"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="XAF">FCFA (XAF)</option>
                    </select>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Sauvegarder les modifications
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;