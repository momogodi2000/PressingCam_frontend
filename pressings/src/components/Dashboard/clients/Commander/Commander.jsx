import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Calendar, Package, Truck, Check, AlertCircle, Clock, Search, Filter } from 'lucide-react';
import ClientsLayout from '../../Layout/clients_layout'; // Import the ClientsLayout component

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

// Status badge component
const StatusBadge = ({ status }) => {
  const statusConfigs = {
    "créée": { color: "bg-blue-100 text-blue-800", icon: <Clock size={14} /> },
    "en attente de paiement": { color: "bg-yellow-100 text-yellow-800", icon: <AlertCircle size={14} /> },
    "paiement confirmé": { color: "bg-green-100 text-green-800", icon: <Check size={14} /> },
    "en attente de ramassage": { color: "bg-purple-100 text-purple-800", icon: <Calendar size={14} /> },
    "ramassée": { color: "bg-indigo-100 text-indigo-800", icon: <Package size={14} /> },
    "en traitement": { color: "bg-orange-100 text-orange-800", icon: <Package size={14} /> },
    "prête": { color: "bg-teal-100 text-teal-800", icon: <Check size={14} /> },
    "en attente de livraison": { color: "bg-cyan-100 text-cyan-800", icon: <Truck size={14} /> },
    "livrée": { color: "bg-green-100 text-green-800", icon: <Check size={14} /> },
    "terminée": { color: "bg-gray-100 text-gray-800", icon: <Check size={14} /> },
    "annulée": { color: "bg-red-100 text-red-800", icon: <AlertCircle size={14} /> }
  };

  const config = statusConfigs[status.toLowerCase()] || statusConfigs["créée"];
  
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      {config.icon}
      {status}
    </span>
  );
};

const MesCommandes = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      // This would be replaced with an actual API call
      setTimeout(() => {
        const mockOrders = [
          {
            id: "CMD-2023-001",
            dateCreated: "18/03/2025",
            status: "Livrée",
            totalAmount: 15700,
            paymentStatus: "Payé",
            paymentMethod: "MTN Mobile Money",
            items: [
              { type: "Pressing", description: "Chemise homme", quantity: 3, price: 1200 },
              { type: "Pressing", description: "Pantalon", quantity: 2, price: 1500 },
              { type: "Blanchisserie", description: "Linge mixte", quantity: "5 kg", price: 8500 },
            ],
            pickupDate: "19/03/2025",
            pickupTime: "10:00 - 12:00",
            deliveryDate: "21/03/2025",
            deliveryTime: "14:00 - 16:00",
            deliveryAddress: "Appartement 304, Résidence Les Flamboyants, Bonapriso, Douala"
          },
          {
            id: "CMD-2023-002",
            dateCreated: "15/03/2025",
            status: "En traitement",
            totalAmount: 8700,
            paymentStatus: "Payé",
            paymentMethod: "Orange Money",
            items: [
              { type: "Pressing", description: "Costume complet", quantity: 1, price: 4800 },
              { type: "Entretien Chaussures", description: "Chaussures homme cuir", quantity: 2, price: 3000 },
            ],
            pickupDate: "16/03/2025",
            pickupTime: "14:00 - 16:00",
            deliveryDate: "22/03/2025",
            deliveryTime: "10:00 - 12:00",
            deliveryAddress: "Villa 17, Quartier Bonamoussadi, Douala"
          },
          {
            id: "CMD-2023-003",
            dateCreated: "10/03/2025",
            status: "En attente de paiement",
            totalAmount: 9500,
            paymentStatus: "En attente",
            paymentMethod: "-",
            items: [
              { type: "Pressing", description: "Robe cocktail", quantity: 1, price: 3500 },
              { type: "Pressing", description: "Blouses", quantity: 4, price: 6000 },
            ],
            pickupDate: "À planifier",
            pickupTime: "À planifier",
            deliveryDate: "À planifier",
            deliveryTime: "À planifier",
            deliveryAddress: "Bureau 201, Immeuble Horizon, Bonanjo, Douala"
          }
        ];
        setOrders(mockOrders);
        setIsLoading(false);
      }, 1000);
    };
    
    fetchOrders();
  }, []);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const filteredOrders = orders.filter(order => {
    // Apply status filter
    if (filter !== 'all' && order.status.toLowerCase() !== filter.toLowerCase()) {
      return false;
    }
    
    // Apply search filter (searching in order ID or items)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesId = order.id.toLowerCase().includes(query);
      const matchesItems = order.items.some(item => 
        item.description.toLowerCase().includes(query)
      );
      return matchesId || matchesItems;
    }
    
    return true;
  });

  return (
    <ClientsLayout> {/* Wrap the content with ClientsLayout */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800">Mes Commandes</h1>
          <p className="text-gray-600 mt-2">Suivez et gérez vos commandes Contour Wash</p>
        </motion.div>

        {/* Filters and search */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex flex-col md:flex-row gap-4"
        >
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher une commande..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500" />
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Tous les statuts</option>
              <option value="en attente de paiement">En attente de paiement</option>
              <option value="paiement confirmé">Paiement confirmé</option>
              <option value="en attente de ramassage">En attente de ramassage</option>
              <option value="ramassée">Ramassée</option>
              <option value="en traitement">En traitement</option>
              <option value="prête">Prête</option>
              <option value="en attente de livraison">En attente de livraison</option>
              <option value="livrée">Livrée</option>
              <option value="terminée">Terminée</option>
            </select>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow p-8 text-center"
          >
            <div className="flex justify-center mb-4">
              <Package size={48} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Aucune commande trouvée</h3>
            <p className="text-gray-600">
              {searchQuery || filter !== 'all' 
                ? "Aucune commande ne correspond à vos critères de recherche" 
                : "Vous n'avez pas encore de commandes"}
            </p>
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition">
              Nouvelle commande
            </button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {filteredOrders.map((order) => (
              <motion.div 
                key={order.id}
                variants={itemVariants}
                className="bg-white rounded-lg shadow overflow-hidden transition"
              >
                <div 
                  className="p-4 flex flex-col md:flex-row md:items-center cursor-pointer hover:bg-gray-50 transition"
                  onClick={() => toggleOrderDetails(order.id)}
                >
                  <div className="flex-grow md:flex md:items-center">
                    <div className="md:w-1/4 mb-2 md:mb-0">
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-500">{order.dateCreated}</p>
                    </div>
                    
                    <div className="md:w-1/4 mb-2 md:mb-0">
                      <StatusBadge status={order.status} />
                    </div>
                    
                    <div className="md:w-1/4 mb-2 md:mb-0">
                      <p className="text-sm font-medium text-gray-500">Paiement</p>
                      <p className={`text-sm ${order.paymentStatus === "Payé" ? "text-green-600" : "text-yellow-600"}`}>
                        {order.paymentStatus}
                      </p>
                    </div>
                    
                    <div className="md:w-1/4">
                      <p className="text-sm font-medium text-gray-500">Total</p>
                      <p className="text-sm font-medium text-gray-900">{order.totalAmount.toLocaleString()} FCFA</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-3 md:mt-0">
                    {expandedOrder === order.id ? 
                      <ChevronUp size={20} className="text-gray-500" /> : 
                      <ChevronDown size={20} className="text-gray-500" />
                    }
                  </div>
                </div>
                
                {expandedOrder === order.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200 px-4 py-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Détails de la commande</h4>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Date de création:</span>
                            <span className="font-medium">{order.dateCreated}</span>
                          </div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Statut:</span>
                            <StatusBadge status={order.status} />
                          </div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Méthode de paiement:</span>
                            <span className="font-medium">{order.paymentMethod}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Statut du paiement:</span>
                            <span className={`font-medium ${order.paymentStatus === "Payé" ? "text-green-600" : "text-yellow-600"}`}>
                              {order.paymentStatus}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Livraison</h4>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Ramassage:</span>
                            <span className="font-medium">{order.pickupDate}, {order.pickupTime}</span>
                          </div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Livraison:</span>
                            <span className="font-medium">{order.deliveryDate}, {order.deliveryTime}</span>
                          </div>
                          <div className="text-sm mt-2">
                            <span className="text-gray-600 block">Adresse de livraison:</span>
                            <span className="font-medium">{order.deliveryAddress}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <h4 className="font-medium text-gray-800 mb-2">Articles</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Quantité</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {order.items.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.description}</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.type}</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center">{item.quantity}</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">{item.price.toLocaleString()} FCFA</td>
                            </tr>
                          ))}
                          <tr className="bg-gray-50">
                            <td colSpan="3" className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 text-right">Total</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900 text-right">{order.totalAmount.toLocaleString()} FCFA</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="mt-6 flex flex-wrap gap-3 justify-end">
                      {order.status === "En attente de paiement" && (
                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition">
                          Effectuer le paiement
                        </button>
                      )}
                      
                      {["En attente de ramassage", "En attente de livraison"].includes(order.status) && (
                        <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2 px-4 rounded transition">
                          Modifier la planification
                        </button>
                      )}
                      
                      {["Livrée", "Terminée"].includes(order.status) && !order.isRated && (
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium py-2 px-4 rounded transition">
                          Évaluer le service
                        </button>
                      )}
                      
                      <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium py-2 px-4 rounded transition">
                        Aide et support
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </ClientsLayout>
  );
};

export default MesCommandes;