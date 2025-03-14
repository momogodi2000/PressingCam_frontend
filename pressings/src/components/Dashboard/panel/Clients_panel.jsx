import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Package, Truck, ShoppingBag, CreditCard, Clock, ChevronRight, 
  CheckCircle, Star, MapPin, Phone, Mail, ArrowRight, Shield, Zap, Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ClientsLayout from '../Layout/clients_layout';

const ClientsDashboard = () => {
  // State for order modals
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // Mock data for demonstration
  const activeOrders = [
    {
      id: 'ORD-2025-001',
      date: '10/03/2025',
      status: 'En traitement',
      items: [
        { name: 'Chemise (x2)', price: 2400 },
        { name: 'Pantalon', price: 1500 },
      ],
      total: 3900,
      pickupDate: '09/03/2025',
      pickupTime: '14:30',
      deliveryDate: '12/03/2025',
      deliveryEstimatedTime: '16:00-18:00',
      address: 'Bonapriso, Rue des Manguiers 45, Douala',
      paymentMethod: 'MTN Mobile Money',
      currentStep: 2,
    },
    {
      id: 'ORD-2025-002',
      date: '11/03/2025',
      status: 'Ramassée',
      items: [
        { name: 'Blanchisserie 3kg', price: 5100 },
      ],
      total: 5100,
      pickupDate: '11/03/2025',
      pickupTime: '10:15',
      deliveryDate: '13/03/2025',
      deliveryEstimatedTime: '14:00-16:00',
      address: 'Bonapriso, Rue des Manguiers 45, Douala',
      paymentMethod: 'Orange Money',
      currentStep: 1,
    }
  ];
  
  const orderHistory = [
    {
      id: 'ORD-2025-000',
      date: '05/03/2025',
      status: 'Livrée',
      items: [
        { name: 'Costume', price: 4800 },
        { name: 'Chemise (x3)', price: 3600 },
      ],
      total: 8400,
      rated: true,
      rating: 5
    },
    {
      id: 'ORD-2025-F234',
      date: '28/02/2025',
      status: 'Livrée',
      items: [
        { name: 'Chaussures - Entretien', price: 3500 },
      ],
      total: 3500,
      rated: true,
      rating: 4
    },
    {
      id: 'ORD-2025-F198',
      date: '15/02/2025',
      status: 'Livrée',
      items: [
        { name: 'Blanchisserie 5kg', price: 8500 },
      ],
      total: 8500,
      rated: true,
      rating: 5
    }
  ];

  // Recent promotions
  const promotions = [
    {
      id: 1,
      title: "Offre spéciale pressing",
      description: "15% de réduction sur tous les services de pressing jusqu'au 20 mars",
      expiryDate: "20/03/2025",
      code: "PRESS15",
      color: "bg-gradient-to-r from-purple-500 to-indigo-600"
    },
    {
      id: 2,
      title: "Blanchisserie économique",
      description: "Lavage et pliage de 5kg pour le prix de 3kg",
      expiryDate: "31/03/2025",
      code: "LAUNDRY5KG",
      color: "bg-gradient-to-r from-green-500 to-emerald-600"
    }
  ];

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setOrderModalOpen(true);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'En attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Ramassée':
        return 'bg-blue-100 text-blue-800';
      case 'En traitement':
        return 'bg-purple-100 text-purple-800';
      case 'Prête':
        return 'bg-indigo-100 text-indigo-800';
      case 'En livraison':
        return 'bg-orange-100 text-orange-800';
      case 'Livrée':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStepIndicator = (currentStep, totalSteps = 5) => {
    return (
      <div className="w-full flex items-center mt-4 mb-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <React.Fragment key={index}>
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index < currentStep 
                  ? 'bg-blue-600 text-white' 
                  : index === currentStep 
                    ? 'bg-blue-100 border-2 border-blue-600 text-blue-600' 
                    : 'bg-gray-200 text-gray-500'
              }`}
            >
              {index < currentStep ? (
                <CheckCircle size={16} />
              ) : (
                index + 1
              )}
            </div>
            {index < totalSteps - 1 && (
              <div 
                className={`flex-1 h-1 ${
                  index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const stepLabels = ['Créée', 'Ramassée', 'En traitement', 'Prête', 'Livrée'];

  // Feature highlights
  const features = [
    {
      icon: <Zap size={24} className="text-yellow-500" />,
      title: "Livraison Express",
      description: "Service de livraison en 24h disponible pour vos urgences"
    },
    {
      icon: <Shield size={24} className="text-green-500" />,
      title: "Garantie Qualité",
      description: "Satisfaction garantie ou nous retraitons vos articles gratuitement"
    },
    {
      icon: <Award size={24} className="text-purple-500" />,
      title: "Programme Fidélité",
      description: "Gagnez des points à chaque commande et profitez de récompenses exclusives"
    }
  ];

  // Order detail modal
  const renderOrderDetailModal = () => {
    if (!selectedOrder) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h3 className="text-lg font-bold">Détails de la commande #{selectedOrder.id}</h3>
            <button 
              onClick={() => setOrderModalOpen(false)} 
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                {selectedOrder.status}
              </span>
              <p className="text-gray-500 text-sm mt-2">Commande passée le {selectedOrder.date}</p>
            </div>
            
            {selectedOrder.currentStep !== undefined && (
              <div className="mb-6">
                {renderStepIndicator(selectedOrder.currentStep)}
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  {stepLabels.map((label, index) => (
                    <div key={index} className={index === 0 || index === stepLabels.length - 1 ? 'w-10' : ''}>
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="border border-gray-200 rounded-lg mb-6">
              <div className="border-b border-gray-200 p-4">
                <h4 className="font-medium mb-2">Articles</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{item.name}</span>
                      <span>{item.price.toLocaleString()} FCFA</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-b border-gray-200 p-4 bg-gray-50">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{selectedOrder.total.toLocaleString()} FCFA</span>
                </div>
              </div>
              
              {selectedOrder.paymentMethod && (
                <div className="p-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Méthode de paiement</span>
                    <span className="font-medium">{selectedOrder.paymentMethod}</span>
                  </div>
                </div>
              )}
            </div>
            
            {(selectedOrder.pickupDate || selectedOrder.deliveryDate) && (
              <div className="border border-gray-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium mb-2">Informations de livraison</h4>
                <div className="space-y-2">
                  {selectedOrder.pickupDate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Date de ramassage</span>
                      <span className="font-medium">{selectedOrder.pickupDate} à {selectedOrder.pickupTime}</span>
                    </div>
                  )}
                  {selectedOrder.deliveryDate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Date de livraison</span>
                      <span className="font-medium">{selectedOrder.deliveryDate} ({selectedOrder.deliveryEstimatedTime})</span>
                    </div>
                  )}
                  {selectedOrder.address && (
                    <div className="flex items-start justify-between text-sm">
                      <span className="text-gray-600">Adresse</span>
                      <span className="font-medium text-right">{selectedOrder.address}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={() => setOrderModalOpen(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Fermer
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <ClientsLayout>
      <div className="space-y-6">
        {/* Welcome section with stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-2">Bienvenue, Jean Kamga</h2>
          <p className="opacity-90 mb-4">Voici l'état de vos services Contour Wash</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-1">Commandes Actives</h3>
              <p className="text-2xl font-bold">{activeOrders.length}</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-1">Total Commandes</h3>
              <p className="text-2xl font-bold">{activeOrders.length + orderHistory.length}</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-1">Points Fidélité</h3>
              <p className="text-2xl font-bold">1250</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-1">Économies</h3>
              <p className="text-2xl font-bold">4500 FCFA</p>
            </div>
          </div>
        </motion.div>

        {/* Promotions carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="overflow-x-auto pb-4 -mx-4 px-4"
        >
          <div className="flex space-x-4 w-max">
            {promotions.map(promo => (
              <div 
                key={promo.id} 
                className={`${promo.color} rounded-xl p-6 text-white min-w-[300px] shadow-md`}
              >
                <h3 className="font-bold text-lg mb-2">{promo.title}</h3>
                <p className="text-sm opacity-90 mb-4">{promo.description}</p>
                <div className="flex justify-between items-center">
                  <div className="bg-white/20 text-white text-sm px-3 py-1 rounded-md inline-block">
                    Code: {promo.code}
                  </div>
                  <span className="text-xs opacity-80">Expire le: {promo.expiryDate}</span>
                </div>
              </div>
            ))}
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-6 text-white min-w-[250px] flex flex-col justify-center items-center shadow-md">
              <h3 className="font-bold text-lg mb-2">Plus de promotions</h3>
              <button className="mt-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-md flex items-center">
                Voir tout <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Active Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-bold flex items-center">
              <Package size={20} className="mr-2 text-blue-600" />
              Commandes actives
            </h3>
            <Link to="/orders" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
              Voir tout <ChevronRight size={16} />
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {activeOrders.map((order) => (
              <div 
                key={order.id}
                className="p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleOrderClick(order)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Commande #{order.id}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mb-2">
                  Commande passée le {order.date} · {order.total.toLocaleString()} FCFA
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-6">
                    <div className="flex items-center text-xs text-gray-600">
                      <Calendar size={14} className="mr-1" />
                      Livraison: {order.deliveryDate}
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <Clock size={14} className="mr-1" />
                      {order.deliveryEstimatedTime}
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              </div>
            ))}
            {activeOrders.length === 0 && (
              <div className="py-8 text-center text-gray-500">
                <Package size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Vous n'avez pas de commande active pour le moment</p>
                <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                  Commander maintenant
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Order History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-bold flex items-center">
              <Clock size={20} className="mr-2 text-blue-600" />
              Historique des commandes
            </h3>
            <Link to="/orders/history" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
              Voir tout <ChevronRight size={16} />
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {orderHistory.slice(0, 3).map((order) => (
              <div 
                key={order.id}
                className="p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleOrderClick(order)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Commande #{order.id}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mb-2">
                  Commande passée le {order.date} · {order.total.toLocaleString()} FCFA
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    {order.rated && (
                      <div className="flex items-center">
                        <span className="text-xs text-gray-600 mr-1">Évaluation:</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < order.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    {!order.rated && (
                      <button className="text-xs text-blue-600 hover:text-blue-800">
                        Évaluer cette commande
                      </button>
                    )}
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Features Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </motion.div>

        {/* Contact section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4">Nous contacter</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                  <Phone size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Téléphone</p>
                  <p className="font-medium">+237 698 765 432</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                  <Mail size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">info@contourwash.cm</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                  <MapPin size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Adresse</p>
                  <p className="font-medium">Bonapriso, Douala</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Order Detail Modal */}
      {orderModalOpen && renderOrderDetailModal()}
    </ClientsLayout>
  );
};

export default ClientsDashboard;