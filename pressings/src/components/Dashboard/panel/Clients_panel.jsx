import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
Calendar, Package, Truck, ShoppingBag, CreditCard, Clock, ChevronRight, 
CheckCircle, Star, MapPin, Phone, Mail, ArrowRight, Shield, Zap, Award
} from 'lucide-react';
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
              <div className="bg-white/20 text-white text-sm px-3 py-1 rounded-md inline-block backdrop-blur-sm">
                Code: <span className="font-bold">{promo.code}</span>
              </div>
              <div className="text-xs">
                Expire le {promo.expiryDate}
              </div>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-center bg-gray-100 rounded-xl min-w-[300px] p-6">
          <a href="#" className="text-blue-600 flex items-center font-medium">
            Voir toutes les offres
            <ArrowRight size={16} className="ml-2" />
          </a>
        </div>
      </div>
    </motion.div>

    {/* Features highlight */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {features.map((feature, index) => (
        <div 
          key={index}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-2 bg-gray-100 rounded-lg">
              {feature.icon}
            </div>
            <h3 className="font-semibold text-lg">{feature.title}</h3>
          </div>
          <p className="text-gray-600 text-sm">{feature.description}</p>
        </div>
      ))}
    </motion.div>

    {/* Active Orders Section */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100"
    >
      <div className="p-6 border-b border-gray-200">
        <h3 className="font-semibold text-lg">Commandes Actives</h3>
      </div>
      
      <div className="divide-y divide-gray-200">
        {activeOrders.map((order, index) => (
          <div 
            key={index}
            className="p-6 hover:bg-gray-50 cursor-pointer"
            onClick={() => handleOrderClick(order)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Commande #{order.id}</h4>
                <p className="text-sm text-gray-500">Passée le {order.date}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>

    {/* Order History Section */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100"
    >
      <div className="p-6 border-b border-gray-200">
        <h3 className="font-semibold text-lg">Historique des Commandes</h3>
      </div>
      
      <div className="divide-y divide-gray-200">
        {orderHistory.map((order, index) => (
          <div 
            key={index}
            className="p-6 hover:bg-gray-50 cursor-pointer"
            onClick={() => handleOrderClick(order)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Commande #{order.id}</h4>
                <p className="text-sm text-gray-500">Passée le {order.date}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
                {order.rated && (
                  <div className="flex items-center space-x-1">
                    <Star size={16} className="text-yellow-400" />
                    <span className="text-sm text-gray-600">{order.rating}</span>
                  </div>
                )}
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  </div>

  {/* Render Order Detail Modal */}
  {orderModalOpen && renderOrderDetailModal()}
</ClientsLayout>
);
};

export default ClientsDashboard;