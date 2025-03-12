import React, { useState, useEffect } from 'react';
import { 
  MapPin, Package,  CheckCircle, Clock, Truck, Navigation,  Phone,
  MessageSquare, User, Calendar,  Search, Filter, ChevronDown, ArrowRight, Loader, Info, AlertTriangle,Zap,DollarSign,RefreshCw
} from 'lucide-react';
import { motion } from 'framer-motion';
import DeliveryLayout from '../Layout/delivery_layout';

const DeliveryDashboard = () => {
  // State for delivery/pickup tasks
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [stats, setStats] = useState({
    completed: 0,
    pending: 0,
    total: 0,
    todayTasks: 0,
    activeDeliveries: 0,
    revenue: 0
  });
  const [refreshing, setRefreshing] = useState(false);

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockTasks = [
        {
          id: 'order-001',
          client: {
            name: 'Jean Kamga',
            phone: '+237 691234567',
            address: 'Bonapriso, Rue des Palmiers, Douala',
            coordinates: { lat: 4.0271, lng: 9.7051 }
          },
          type: 'pickup',
          items: [
            { name: 'Costume complet', count: 2, price: 4800 },
            { name: 'Chemises', count: 5, price: 1200 }
          ],
          status: 'pending',
          time: '08:30 - 09:30',
          scheduledDate: new Date().toISOString(),
          paymentMethod: 'Orange Money',
          paymentStatus: 'pending',
          notes: 'Frapper à la porte principale',
          priority: 'medium'
        },
        {
          id: 'order-002',
          client: {
            name: 'Famille Mbarga',
            phone: '+237 677654321',
            address: 'Makepe, Immeuble Bleue, Douala',
            coordinates: { lat: 4.0831, lng: 9.7653 }
          },
          type: 'delivery',
          items: [
            { name: 'Blanchisserie', count: 1, price: 5100, weight: '3kg' }
          ],
          status: 'in-progress',
          time: '10:00 - 11:00',
          scheduledDate: new Date().toISOString(),
          paymentMethod: 'À la livraison',
          paymentStatus: 'pending',
          notes: 'Appeler 10 minutes avant d\'arriver',
          priority: 'high'
        },
        {
          id: 'order-003',
          client: {
            name: 'Marie Ekambi',
            phone: '+237 699887766',
            address: 'Akwa, Avenue de Gaulle, Douala',
            coordinates: { lat: 4.0506, lng: 9.7065 }
          },
          type: 'delivery',
          items: [
            { name: 'Chaussures homme', count: 2, price: 3000 },
            { name: 'Sac à main', count: 1, price: 2500 }
          ],
          status: 'completed',
          time: '13:00 - 14:00',
          scheduledDate: new Date().toISOString(),
          paymentMethod: 'MTN Mobile Money',
          paymentStatus: 'paid',
          notes: '',
          priority: 'medium'
        },
        {
          id: 'order-004',
          client: {
            name: 'Alain Fotso',
            phone: '+237 655443322',
            address: 'Bonamoussadi, Rue des Manguiers, Douala',
            coordinates: { lat: 4.0944, lng: 9.7367 }
          },
          type: 'pickup',
          items: [
            { name: 'Robe de soirée', count: 1, price: 4200 },
            { name: 'Blouses', count: 3, price: 1500 }
          ],
          status: 'pending',
          time: '15:30 - 16:30',
          scheduledDate: new Date().toISOString(),
          paymentMethod: 'À déterminer',
          paymentStatus: 'pending',
          notes: 'Code portail: 1234',
          priority: 'low'
        },
        {
          id: 'order-005',
          client: {
            name: 'Sophie Nguetche',
            phone: '+237 677889900',
            address: 'Deido, Rue Principale, Douala',
            coordinates: { lat: 4.0730, lng: 9.6880 }
          },
          type: 'delivery',
          items: [
            { name: 'Costume homme', count: 1, price: 6200 },
            { name: 'Cravate', count: 2, price: 800 }
          ],
          status: 'pending',
          time: '11:00 - 12:00',
          scheduledDate: new Date().toISOString(),
          paymentMethod: 'Cash',
          paymentStatus: 'pending',
          notes: 'Client au 3ème étage',
          priority: 'medium'
        },
        {
          id: 'order-006',
          client: {
            name: 'Robert Eteki',
            phone: '+237 699112233',
            address: 'Bali, Avenue Charles de Gaulle, Douala',
            coordinates: { lat: 4.0490, lng: 9.7100 }
          },
          type: 'pickup',
          items: [
            { name: 'Vêtements divers', count: 1, price: 7500, weight: '5kg' }
          ],
          status: 'in-progress',
          time: '14:00 - 15:00',
          scheduledDate: new Date().toISOString(),
          paymentMethod: 'Orange Money',
          paymentStatus: 'paid',
          notes: 'Service express demandé',
          priority: 'high'
        }
      ];

      // Calculate revenue
      const totalRevenue = mockTasks.reduce((sum, task) => {
        return sum + task.items.reduce((itemSum, item) => itemSum + (item.price * item.count), 0);
      }, 0);

      setTasks(mockTasks);
      setFilteredTasks(mockTasks);
      setStats({
        completed: mockTasks.filter(task => task.status === 'completed').length,
        pending: mockTasks.filter(task => task.status === 'pending').length,
        total: mockTasks.length,
        todayTasks: mockTasks.filter(task => {
          const today = new Date().toISOString().split('T')[0];
          const taskDate = new Date(task.scheduledDate).toISOString().split('T')[0];
          return today === taskDate;
        }).length,
        activeDeliveries: mockTasks.filter(task => task.status === 'in-progress').length,
        revenue: totalRevenue
      });
      setLoading(false);
    }, 1500);
  }, []);

  // Handle refresh
  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate API refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  // Filter tasks based on active tab and search query
  useEffect(() => {
    let filtered = [...tasks];
    
    // Apply tab filter
    if (activeTab === 'pickup') {
      filtered = filtered.filter(task => task.type === 'pickup');
    } else if (activeTab === 'delivery') {
      filtered = filtered.filter(task => task.type === 'delivery');
    } else if (activeTab === 'completed') {
      filtered = filtered.filter(task => task.status === 'completed');
    } else if (activeTab === 'pending') {
      filtered = filtered.filter(task => task.status === 'pending');
    } else if (activeTab === 'in-progress') {
      filtered = filtered.filter(task => task.status === 'in-progress');
    }
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(task => 
        task.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.client.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredTasks(filtered);
  }, [tasks, activeTab, searchQuery]);

  // Format currency
  const formatCurrency = (amount) => {
    return `${amount.toLocaleString()} FCFA`;
  };

  // Get task status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get task type icon
  const getTaskTypeIcon = (type) => {
    if (type === 'pickup') {
      return <Package className="h-4 w-4" />;
    } else {
      return <Truck className="h-4 w-4" />;
    }
  };

  // Handle task selection
  const handleTaskSelect = (task) => {
    setSelectedTask(task);
  };

  // Update task status
  const updateTaskStatus = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    });
    
    setTasks(updatedTasks);
    
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask({ ...selectedTask, status: newStatus });
    }

    // Update stats
    const newStats = { ...stats };
    if (newStatus === 'completed') {
      newStats.completed += 1;
      if (selectedTask.status === 'pending') newStats.pending -= 1;
      if (selectedTask.status === 'in-progress') newStats.activeDeliveries -= 1;
    } else if (newStatus === 'in-progress') {
      newStats.activeDeliveries += 1;
      if (selectedTask.status === 'pending') newStats.pending -= 1;
    }
    
    setStats(newStats);
  };

  // Task card component
  const TaskCard = ({ task, isSelected }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-4 mb-4 rounded-lg shadow-sm border ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'} cursor-pointer hover:shadow-md transition-all`}
      onClick={() => handleTaskSelect(task)}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className={`p-2 rounded-full mr-3 ${task.type === 'pickup' ? 'bg-purple-100' : 'bg-indigo-100'}`}>
            {getTaskTypeIcon(task.type)}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{task.client.name}</h3>
            <p className="text-sm text-gray-500 flex items-center">
              <MapPin className="h-3 w-3 mr-1" /> 
              {task.client.address.length > 30 
                ? task.client.address.substring(0, 30) + '...' 
                : task.client.address}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
            {task.status === 'completed' ? 'Terminé' : 
             task.status === 'pending' ? 'En attente' : 'En cours'}
          </div>
          {task.priority && (
            <div className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
              {task.priority === 'high' ? 'Prioritaire' : 
               task.priority === 'medium' ? 'Normal' : 'Faible'}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-3 flex justify-between items-center text-sm">
        <div className="flex items-center text-gray-500">
          <Clock className="h-3 w-3 mr-1" /> {task.time}
        </div>
        <div className="flex items-center">
          <span className="font-medium text-gray-900 mr-2">
            {task.items.reduce((sum, item) => sum + (item.price * item.count), 0).toLocaleString()} FCFA
          </span>
          <ArrowRight className="h-4 w-4 text-blue-500" />
        </div>
      </div>
    </motion.div>
  );

  // Loading state
  if (loading) {
    return (
      <DeliveryLayout>
        <div className="flex h-screen w-full justify-center items-center bg-gray-50">
          <div className="text-center">
            <Loader className="h-10 w-10 text-blue-500 animate-spin mx-auto" />
            <p className="text-gray-600 mt-4">Chargement du tableau de bord...</p>
          </div>
        </div>
      </DeliveryLayout>
    );
  }

  return (
    <DeliveryLayout>
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto p-4">
          {/* Dashboard Stats */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Aperçu des activités</h2>
              <button
                onClick={handleRefresh}
                className="flex items-center text-blue-600 hover:text-blue-800"
                disabled={refreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-1 ${refreshing ? 'animate-spin' : ''}`} />
                <span>Actualiser</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Aujourd'hui</p>
                    <h3 className="text-xl font-bold">{stats.todayTasks}</h3>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Complétées</p>
                    <h3 className="text-xl font-bold">{stats.completed}</h3>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-yellow-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">En attente</p>
                    <h3 className="text-xl font-bold">{stats.pending}</h3>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Zap className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">En cours</p>
                    <h3 className="text-xl font-bold">{stats.activeDeliveries}</h3>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Package className="h-6 w-6 text-purple-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Total</p>
                    <h3 className="text-xl font-bold">{stats.total}</h3>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full">
                    <DollarSign className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Revenu</p>
                    <h3 className="text-lg font-bold">{formatCurrency(stats.revenue)}</h3>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Search and Filter */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0 relative w-full md:w-1/2">
                <input
                  type="text"
                  placeholder="Rechercher par client, adresse ou commande..."
                  className="w-full py-2 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Filter className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Filtres</span>
                  <ChevronDown className={`h-4 w-4 ml-2 text-gray-500 transition-transform ${showFilters ? 'transform rotate-180' : ''}`} />
                </button>
                
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-2 rounded-lg ${activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  Tous
                </button>
                
                <button
                onClick={() => setActiveTab('pickup')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'pickup' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Ramassages
              </button>

              <button
                onClick={() => setActiveTab('delivery')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'delivery' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Livraisons
              </button>

              <button
                onClick={() => setActiveTab('completed')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Terminées
              </button>

              <button
                onClick={() => setActiveTab('pending')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                En attente
              </button>

              <button
                onClick={() => setActiveTab('in-progress')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'in-progress' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                En cours
              </button>
            </div>
          </div>

          {/* Filters dropdown */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Priorité</label>
                <select
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Toutes</option>
                  <option value="high">Prioritaire</option>
                  <option value="medium">Normal</option>
                  <option value="low">Faible</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Statut de paiement</label>
                <select
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Tous</option>
                  <option value="paid">Payé</option>
                  <option value="pending">En attente</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Heure</label>
                <input
                  type="time"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Task List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} isSelected={selectedTask?.id === task.id} />
            ))}
          </div>

          {/* Task Details */}
          {selectedTask && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Détails de la commande</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Client</h4>
                  <p className="text-lg font-semibold text-gray-900">{selectedTask.client.name}</p>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Phone className="h-4 w-4 mr-2" /> {selectedTask.client.phone}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center">
                    <MapPin className="h-4 w-4 mr-2" /> {selectedTask.client.address}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Articles</h4>
                  <ul className="space-y-2">
                    {selectedTask.items.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span className="text-gray-700">{item.name}</span>
                        <span className="text-gray-900">{item.count} x {item.price.toLocaleString()} FCFA</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Statut</h4>
                  <div className={`text-sm px-3 py-1 rounded-full ${getStatusColor(selectedTask.status)}`}>
                    {selectedTask.status === 'completed' ? 'Terminé' : 
                     selectedTask.status === 'pending' ? 'En attente' : 'En cours'}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Méthode de paiement</h4>
                  <p className="text-gray-900">{selectedTask.paymentMethod}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Statut de paiement</h4>
                  <p className="text-gray-900">{selectedTask.paymentStatus === 'paid' ? 'Payé' : 'En attente'}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Notes</h4>
                  <p className="text-gray-900">{selectedTask.notes || 'Aucune note'}</p>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => updateTaskStatus(selectedTask.id, 'in-progress')}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    disabled={selectedTask.status === 'in-progress'}
                  >
                    Commencer
                  </button>
                  <button
                    onClick={() => updateTaskStatus(selectedTask.id, 'completed')}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    disabled={selectedTask.status === 'completed'}
                  >
                    Terminer
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </DeliveryLayout>
);
};

export default DeliveryDashboard;