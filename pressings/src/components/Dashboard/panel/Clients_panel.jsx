import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BellIcon, 
  ShoppingBagIcon, 
  ClockIcon, 
  CreditCardIcon, 
  TruckIcon, 
  UserCircleIcon,
  ChartBarIcon,
  LogoutIcon,
  MenuIcon,
  XIcon,
  LocationMarkerIcon,
  CheckCircleIcon,
  StarIcon
} from '@heroicons/react/outline';

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders([
        {
          id: 'CW-2025031201',
          date: '12 Mar 2025',
          type: 'Pressing',
          items: [
            { name: 'Chemise homme', quantity: 3, price: 1200 },
            { name: 'Pantalon', quantity: 2, price: 1500 },
            { name: 'Veste', quantity: 1, price: 1900 }
          ],
          status: 'en cours',
          pickupDate: '12 Mar 2025',
          pickupTime: '14:00 - 16:00',
          deliveryDate: '14 Mar 2025',
          deliveryTime: '10:00 - 12:00',
          totalAmount: 8500,
          paymentStatus: 'payé',
          paymentMethod: 'MTN Mobile Money'
        },
        {
          id: 'CW-2025030501',
          date: '5 Mar 2025',
          type: 'Blanchisserie',
          items: [
            { name: 'Linge divers', quantity: 4.5, unit: 'kg', price: 1700 }
          ],
          status: 'livré',
          pickupDate: '5 Mar 2025',
          pickupTime: '09:00 - 11:00',
          deliveryDate: '7 Mar 2025',
          deliveryTime: '14:00 - 16:00',
          totalAmount: 7650,
          paymentStatus: 'payé',
          paymentMethod: 'Orange Money'
        },
        {
          id: 'CW-2025022801',
          date: '28 Feb 2025',
          type: 'Entretien Chaussures',
          items: [
            { name: 'Chaussures homme', quantity: 2, price: 3000 }
          ],
          status: 'terminé',
          pickupDate: '28 Feb 2025',
          pickupTime: '16:00 - 18:00',
          deliveryDate: '2 Mar 2025',
          deliveryTime: '10:00 - 12:00',
          totalAmount: 6000,
          paymentStatus: 'payé',
          paymentMethod: 'À la livraison'
        }
      ]);
      setIsLoading(false);
    }, 1500);
  }, []);

  // Loyalty points
  const loyaltyPoints = 245;

  // Notification data
 

  // Address data
  const addresses = [
    { id: 1, name: 'Domicile', address: 'Résidence Palm Beach, Apt 304, Bonapriso, Douala', isDefault: true },
    { id: 2, name: 'Bureau', address: 'Immeuble Concorde, 3ème étage, Avenue de Gaulle, Bonanjo, Douala', isDefault: false }
  ];

  // Animation variants for framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } }
  };

  // Status color mapping
  const getStatusColor = (status) => {
    switch(status) {
      case 'en attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'ramassé':
        return 'bg-blue-100 text-blue-800';
      case 'en cours':
        return 'bg-indigo-100 text-indigo-800';
      case 'prêt':
        return 'bg-purple-100 text-purple-800';
      case 'en livraison':
        return 'bg-orange-100 text-orange-800';
      case 'livré':
        return 'bg-green-100 text-green-800';
      case 'terminé':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Tab rendering based on active tab
  const renderTabContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'orders':
        return renderOrders();
      case 'tracking':
        return renderTracking();
      case 'payment':
        return renderPayment();
      case 'profile':
        return renderProfile();
      default:
        return renderDashboard();
    }
  };

  // Dashboard tab content
  const renderDashboard = () => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {/* Welcome Card */}
      <motion.div variants={itemVariants} className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white p-6 shadow-lg col-span-1 md:col-span-2 lg:col-span-3">
        <h2 className="text-xl md:text-2xl font-bold mb-2">Bienvenue, Jean Kamga</h2>
        <p className="opacity-90">Profitez des services premium de Contour Wash pour votre linge et vos chaussures</p>
        <div className="mt-4 flex items-center">
          <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1 flex items-center">
            <StarIcon className="h-5 w-5 mr-1 text-yellow-300" />
            <span className="font-semibold">{loyaltyPoints} points de fidélité</span>
          </div>
        </div>
      </motion.div>

      {/* Quick Action Cards */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col items-center justify-center cursor-pointer border border-gray-100">
        <div className="bg-indigo-100 p-3 rounded-full mb-3">
          <ShoppingBagIcon className="h-8 w-8 text-indigo-600" />
        </div>
        <h3 className="font-semibold text-lg mb-1">Nouvelle commande</h3>
        <p className="text-gray-500 text-sm text-center">Commander un service de pressing ou blanchisserie</p>
      </motion.div>

      <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col items-center justify-center cursor-pointer border border-gray-100">
        <div className="bg-emerald-100 p-3 rounded-full mb-3">
          <TruckIcon className="h-8 w-8 text-emerald-600" />
        </div>
        <h3 className="font-semibold text-lg mb-1">Suivre ma commande</h3>
        <p className="text-gray-500 text-sm text-center">Consultez l'état de vos commandes en cours</p>
      </motion.div>

      <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col items-center justify-center cursor-pointer border border-gray-100">
        <div className="bg-amber-100 p-3 rounded-full mb-3">
          <ChartBarIcon className="h-8 w-8 text-amber-600" />
        </div>
        <h3 className="font-semibold text-lg mb-1">Historique</h3>
        <p className="text-gray-500 text-sm text-center">Consultez vos commandes précédentes</p>
      </motion.div>

      {/* Recent Orders */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md col-span-1 md:col-span-2 lg:col-span-3 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Commandes récentes</h3>
          <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Tout voir</button>
        </div>
        
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2].map(item => (
              <div key={item} className="h-16 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {orders.slice(0, 2).map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">{order.id}</span>
                    <div className="text-sm text-gray-500">{order.date} • {order.type}</div>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <span className="ml-3 text-indigo-600">
                      {order.totalAmount.toLocaleString()} FCFA
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Promotions */}
      <motion.div variants={itemVariants} className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl text-white p-6 shadow-lg col-span-1 md:col-span-2 lg:col-span-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-xl mb-2">Offre Spéciale!</h3>
            <p className="mb-4">Bénéficiez de -15% sur tous vos services de pressing jusqu'au 20 mars 2025.</p>
            <button className="bg-white text-amber-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              En profiter
            </button>
          </div>
          <div className="hidden md:block">
            <img src="/api/placeholder/120/120" alt="Promotion" className="rounded-lg" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  // Orders tab content
  const renderOrders = () => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md mb-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Mes Commandes</h3>
          <div className="flex space-x-2">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
              Nouvelle commande
            </button>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex space-x-2 border-b border-gray-200">
            <button className="px-4 py-2 text-indigo-600 border-b-2 border-indigo-600 font-medium">
              Toutes
            </button>
            <button className="px-4 py-2 text-gray-500 hover:text-gray-700">
              En cours
            </button>
            <button className="px-4 py-2 text-gray-500 hover:text-gray-700">
              Terminées
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(item => (
              <div key={item} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-medium text-lg">{order.id}</span>
                  </div>
                  <div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Date de commande</p>
                    <p className="font-medium">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Service</p>
                    <p className="font-medium">{order.type}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Montant</p>
                    <p className="font-medium">{order.totalAmount.toLocaleString()} FCFA</p>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                  <div className="flex space-x-3">
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                      Détails
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                      Renouveler
                    </button>
                  </div>
                  {order.status === 'livré' && (
                    <button className="text-sm bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg hover:bg-indigo-100 transition-colors">
                      Évaluer
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );

  // Tracking tab content
  const renderTracking = () => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md mb-6 border border-gray-100">
        <h3 className="font-semibold text-lg mb-4">Suivi de mes commandes</h3>
        
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-64 bg-gray-200 rounded-lg"></div>
          </div>
        ) : (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-gray-900">Commande en cours</h4>
              <span className="text-sm text-gray-500">{orders[0].id}</span>
            </div>
            
            <div className="relative">
              {/* Timeline track */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200"></div>
              
              {/* Timeline steps */}
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="z-10 flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                    <CheckCircleIcon className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">Commande confirmée</p>
                    <p className="text-sm text-gray-500">12 Mars 2025, 10:30</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="z-10 flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                    <CheckCircleIcon className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">Articles ramassés</p>
                    <p className="text-sm text-gray-500">12 Mars 2025, 15:45</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="z-10 flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full">
                    <ClockIcon className="w-8 h-8 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">En traitement</p>
                    <p className="text-sm text-gray-500">En cours</p>
                  </div>
                </div>
                
                <div className="flex items-center opacity-50">
                  <div className="z-10 flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
                    <TruckIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">Livraison</p>
                    <p className="text-sm text-gray-500">Prévu le 14 Mars, 10:00 - 12:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-medium text-gray-900 mb-3">Détails de la commande</h4>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Type de service</span>
              <span className="font-medium">Pressing</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Articles</span>
              <span className="font-medium">6 pièces</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Date de ramassage</span>
              <span className="font-medium">12 Mars 2025, 14:00 - 16:00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Date de livraison prévue</span>
              <span className="font-medium">14 Mars 2025, 10:00 - 12:00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Livreur assigné</span>
              <span className="font-medium">Paul N. (★ 4.9)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Statut du paiement</span>
              <span className="font-medium text-green-600">Payé (MTN Mobile Money)</span>
            </div>
          </div>
          
          <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
            Contacter le livreur
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  // Payment tab content
  const renderPayment = () => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md mb-6 border border-gray-100">
        <h3 className="font-semibold text-lg mb-4">Moyens de paiement</h3>
        
        <div className="space-y-4 mb-6">
          <div className="border border-gray-200 rounded-lg p-4 flex items-center">
            <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
              <img src="/api/placeholder/32/32" alt="Orange Money" className="rounded" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">Orange Money</h4>
              <p className="text-sm text-gray-500">+237 691 XX XX 37</p>
            </div>
            <div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Par défaut</span>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 flex items-center">
            <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
              <img src="/api/placeholder/32/32" alt="MTN MoMo" className="rounded" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">MTN Mobile Money</h4>
              <p className="text-sm text-gray-500">+237 671 XX XX 86</p>
            </div>
          </div>
          
          <button className="w-full border border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors">
            <span className="mr-2">+</span> Ajouter un moyen de paiement
          </button>
        </div>
        
        <h3 className="font-semibold text-lg mb-4">Historique des paiements</h3>
        
        <div className="space-y-3 mb-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium">{order.id}</span>
                  <div className="text-sm text-gray-500">{order.date}</div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-medium">{order.totalAmount.toLocaleString()} FCFA</span>
                  <span className="text-sm text-green-600">{order.paymentMethod}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
          Voir tout l'historique
        </button>
      </motion.div>
    </motion.div>
  );

  // Profile tab content
  const renderProfile = () => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md border border-gray-100 md:col-span-1">
        <div className="flex flex-col items-center mb-6">
          <div className="h-24 w-24 bg-indigo-100 rounded-full flex items-center justify-center mb-3">
            <UserCircleIcon className="h-16 w-16 text-indigo-600" />
          </div>
          <h3 className="font-semibold text-lg">Jean Kamga</h3>
          <p className="text-gray-500">Client depuis février 2023</p>
          <div className="mt-2 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <StarIcon className="h-4 w-4 mr-1" />
            {loyaltyPoints} points de fidélité
          </div>
        </div>
        
        <div className="space-y-3">
          <button className="w-full py-2 flex items-center font-medium text-gray-700 hover:bg-gray-50 rounded-lg px-3">
            <UserCircleIcon className="h-5 w-5 mr-3 text-gray-500" />
            Mon profil
          </button>
          <button className="w-full py-2 flex items-center font-medium text-gray-700 hover:bg-gray-50 rounded-lg px-3">
            <LocationMarkerIcon className="h-5 w-5 mr-3 text-gray-500" />
            Mes adresses
          </button>
          <button className="w-full py-2 flex items-center font-medium text-gray-700 hover:bg-gray-50 rounded-lg px-3">
            <ShoppingBagIcon className="h-5 w-5 mr-3 text-gray-500" />
            Mes commandes
          </button>
          <button className="w-full py-2 flex items-center font-medium text-gray-700 hover:bg-gray-50 rounded-lg px-3">
            <CreditCardIcon className="h-5 w-5 mr-3 text-gray-500" />
            Paiements
          </button>
          <button className="w-full py-2 flex items-center font-medium text-red-600 hover:bg-red-50 rounded-lg px-3 mt-6">
            <LogoutIcon className="h-5 w-5 mr-3" />
            Déconnexion
          </button>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md border border-gray-100 md:col-span-2">
        <h3 className="font-semibold text-lg mb-4">Informations personnelles</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                value="Jean Kamga"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                value="jean.kamga@example.com"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
              <input 
                type="tel" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                value="+237 691 XX XX 37"
              />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option>Homme</option>
                <option>Femme</option>
                <option>Préfère ne pas préciser</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Préférences de communication</label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="checkbox" id="sms" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" checked />
                <label htmlFor="sms" className="ml-2 text-sm text-gray-700">SMS pour les mises à jour de commande</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="email" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" checked />
                <label htmlFor="email" className="ml-2 text-sm text-gray-700">Email pour les reçus et confirmations</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="promo" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" checked />
                <label htmlFor="promo" className="ml-2 text-sm text-gray-700">Recevoir les offres et promotions</label>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
              Sauvegarder les modifications
            </button>
          </div>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md border border-gray-100 md:col-span-3">
        <h3 className="font-semibold text-lg mb-4">Mes adresses</h3>
        
        <div className="space-y-4 mb-6">
          {addresses.map((address) => (
            <div key={address.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">{address.name}</h4>
                  <p className="text-gray-500">{address.address}</p>
                </div>
                {address.isDefault && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Par défaut</span>
                )}
              </div>
              <div className="flex space-x-3 mt-3">
                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  Modifier
                </button>
                <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                  Supprimer
                </button>
                {!address.isDefault && (
                  <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                    Définir par défaut
                  </button>
                )}
              </div>
            </div>
          ))}
          
          <button className="w-full border border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors">
            <span className="mr-2">+</span> Ajouter une adresse
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img src="/api/placeholder/120/40" alt="Contour Wash" />
              </div>
              <div className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-4">
                  <button 
                    onClick={() => setActiveTab('dashboard')}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'dashboard' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Tableau de bord
                  </button>
                  <button 
                    onClick={() => setActiveTab('orders')}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'orders' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Commandes
                  </button>
                  <button 
                    onClick={() => setActiveTab('tracking')}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'tracking' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Suivi
                  </button>
                  <button 
                    onClick={() => setActiveTab('payment')}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'payment' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Paiement
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <button className="ml-4 relative">
                <BellIcon className="h-6 w-6 text-gray-400 hover:text-gray-500" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setActiveTab('profile')}
                className={`ml-4 ${activeTab === 'profile' ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-500'}`}
              >
                <UserCircleIcon className="h-6 w-6" />
              </button>
              <button
                className="ml-4 md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <XIcon className="h-6 w-6 text-gray-400" />
                ) : (
                  <MenuIcon className="h-6 w-6 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button 
                onClick={() => {
                  setActiveTab('dashboard');
                  setIsMobileMenuOpen(false);
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${activeTab === 'dashboard' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              >
                Tableau de bord
              </button>
              <button 
                onClick={() => {
                  setActiveTab('orders');
                  setIsMobileMenuOpen(false);
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${activeTab === 'orders' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              >
                Commandes
              </button>
              <button 
                onClick={() => {
                  setActiveTab('tracking');
                  setIsMobileMenuOpen(false);
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${activeTab === 'tracking' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              >
                Suivi
              </button>
              <button 
                onClick={() => {
                  setActiveTab('payment');
                  setIsMobileMenuOpen(false);
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${activeTab === 'payment' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              >
                Paiement
              </button>
              <button 
                onClick={() => {
                  setActiveTab('profile');
                  setIsMobileMenuOpen(false);
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${activeTab === 'profile' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              >
                Profil
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Notifications Panel */}
      {/* This would be implemented as a slide-over panel */}
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{activeTab === 'dashboard' ? 'Tableau de bord' : 
            activeTab === 'orders' ? 'Mes Commandes' :
            activeTab === 'tracking' ? 'Suivi de Commandes' :
            activeTab === 'payment' ? 'Paiements' :
            'Mon Profil'
          }</h2>
        </div>
        
        {renderTabContent()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">À propos de Contour Wash</h3>
              <p className="text-gray-500 text-sm">
                Contour Wash est le leader des services de pressing et blanchisserie premium à Douala, offrant ramassage et livraison à domicile.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Pressing</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Blanchisserie</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Nettoyage à sec</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Entretien de chaussures</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Aide</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-500 hover:text-gray-700 text-sm">FAQ</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Contact</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Conditions générales</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Politique de confidentialité</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Téléchargez notre application</h3>
              <div className="flex space-x-2">
                <a href="#" className="border rounded-lg p-2">
                  <img src="/api/placeholder/120/40" alt="App Store" />
                </a>
                <a href="#" className="border rounded-lg p-2">
                  <img src="/api/placeholder/120/40" alt="Google Play" />
                </a>
              </div>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-400 text-center">© 2025 Contour Wash. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ClientDashboard;