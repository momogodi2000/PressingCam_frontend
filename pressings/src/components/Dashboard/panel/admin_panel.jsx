import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { 
  Clock, Truck, CheckCircle, DollarSign, TrendingUp, ArrowRight 
} from 'lucide-react';
import { AdminLayout } from '../Layout/admin_layout';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  // Dashboard content
  const dashboardContent = (
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
  );

  return (
    <AdminLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      notifications={notifications}
    >
      {activeTab === 'dashboard' && dashboardContent}
      {/* Add other tabs' content here as needed */}
    </AdminLayout>
  );
};

export default AdminDashboard;