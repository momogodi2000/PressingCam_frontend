import React, { useState } from 'react';
import { Save, UserCircle, MapPin, Bell, Lock, CreditCard, HelpCircle, LogOut, Moon, ChevronRight, Check } from 'lucide-react';
import ClientsLayout from '../../Layout/clients_layout';

const Parametres = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    pushNotifications: false,
    promotions: true
  });
  const [language, setLanguage] = useState('fr');
  const [isSaving, setIsSaving] = useState(false);

  // Simulate save action
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      // Show success message or toast here
    }, 1000);
  };

  // Toggle notification settings
  const toggleNotification = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  // Handle theme toggle
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    // In a real app, you would apply the theme change to the entire application
  };

  // Handle language change
  const changeLanguage = (lang) => {
    setLanguage(lang);
  };
  
  return (
    <ClientsLayout>
      <div className={`transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        {/* Header */}
        <header className={`py-4 px-6 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold">Paramètres</h1>
            <p className="text-sm mt-1 text-gray-500">Gérez vos préférences et informations personnelles</p>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="max-w-6xl mx-auto py-8 px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className={`md:col-span-1 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'} p-4`}>
              <nav className="space-y-1">
                {[
                  { id: 'profile', label: 'Profil', icon: <UserCircle className="w-5 h-5" /> },
                  { id: 'addresses', label: 'Adresses', icon: <MapPin className="w-5 h-5" /> },
                  { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
                  { id: 'security', label: 'Sécurité', icon: <Lock className="w-5 h-5" /> },
                  { id: 'payment', label: 'Paiement', icon: <CreditCard className="w-5 h-5" /> },
                  { id: 'help', label: 'Aide', icon: <HelpCircle className="w-5 h-5" /> },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center w-full px-3 py-3 rounded-lg transition-all duration-200 
                    ${activeTab === item.id 
                      ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600') 
                      : (darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                    <ChevronRight className={`ml-auto w-4 h-4 transition-transform duration-200 ${activeTab === item.id ? 'rotate-90' : ''}`} />
                  </button>
                ))}
                
                {/* Logout Button */}
                <button className={`flex items-center w-full px-3 py-3 mt-6 rounded-lg
                  ${darkMode ? 'hover:bg-red-900 text-red-400' : 'hover:bg-red-50 text-red-600'}`}>
                  <LogOut className="w-5 h-5" />
                  <span className="ml-3">Déconnexion</span>
                </button>
              </nav>
            </div>
            
            {/* Content Area */}
            <div className={`md:col-span-3 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
              {/* Profile Settings */}
              {activeTab === 'profile' && (
                <div className="animate-fadeIn">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Informations personnelles</h2>
                    <button 
                      onClick={handleSave}
                      className={`px-4 py-2 rounded-md bg-blue-600 text-white flex items-center hover:bg-blue-700
                      transition-all duration-200 ${isSaving ? 'opacity-70' : ''}`}
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <span className="flex items-center">
                          <svg className="animate-spin mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Enregistrement...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Save className="mr-2 h-4 w-4" />
                          Enregistrer
                        </span>
                      )}
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nom</label>
                      <input 
                        type="text" 
                        defaultValue="Jean Kamga" 
                        className={`w-full px-3 py-2 border rounded-md 
                        ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Prénom</label>
                      <input 
                        type="text" 
                        defaultValue="Pierre" 
                        className={`w-full px-3 py-2 border rounded-md 
                        ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input 
                        type="email" 
                        defaultValue="jean.kamga@example.com" 
                        className={`w-full px-3 py-2 border rounded-md 
                        ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Téléphone</label>
                      <input 
                        type="tel" 
                        defaultValue="+237 691 23 45 67" 
                        className={`w-full px-3 py-2 border rounded-md 
                        ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                      />
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">Préférences</h3>
                    
                    <div className="flex items-center justify-between py-3 border-b">
                      <div>
                        <p className="font-medium">Thème sombre</p>
                        <p className="text-sm text-gray-500">Changer l'apparence de l'application</p>
                      </div>
                      <div className="relative inline-block w-12 mr-2 align-middle select-none">
                        <input 
                          type="checkbox" 
                          name="toggle" 
                          id="toggle"
                          checked={darkMode}
                          onChange={toggleTheme}
                          className="absolute w-6 h-6 cursor-pointer rounded-full bg-white border-4 appearance-none transition-transform duration-200 ease-out"
                          style={{
                            transform: darkMode ? 'translateX(100%)' : 'translateX(0%)',
                            borderColor: darkMode ? '#3B82F6' : '#D1D5DB',
                            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                          }}
                        />
                        <label 
                          htmlFor="toggle" 
                          className={`block h-6 overflow-hidden rounded-full cursor-pointer ${darkMode ? 'bg-blue-600' : 'bg-gray-300'}`}
                        ></label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between py-3 border-b">
                      <div>
                        <p className="font-medium">Langue</p>
                        <p className="text-sm text-gray-500">Choisir la langue de l'application</p>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => changeLanguage('fr')}
                          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors
                            ${language === 'fr' 
                              ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800') 
                              : (darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800')}`}
                        >
                          Français
                        </button>
                        <button 
                          onClick={() => changeLanguage('en')}
                          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors
                            ${language === 'en' 
                              ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800') 
                              : (darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800')}`}
                        >
                          English
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Notifications Settings */}
              {activeTab === 'notifications' && (
                <div className="animate-fadeIn">
                  <h2 className="text-xl font-semibold mb-6">Paramètres de notification</h2>
                  
                  <div className="space-y-4">
                    {[
                      { id: 'email', label: 'Notifications par email', desc: 'Recevoir des mises à jour de commande par email' },
                      { id: 'sms', label: 'Notifications par SMS', desc: 'Recevoir des alertes de livraison par SMS' },
                      { id: 'pushNotifications', label: 'Notifications push', desc: 'Recevoir des notifications sur votre appareil' },
                      { id: 'promotions', label: 'Offres promotionnelles', desc: 'Recevoir des offres spéciales et réductions' },
                    ].map((item) => (
                      <div key={item.id} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{item.label}</h3>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                          </div>
                          <button 
                            onClick={() => toggleNotification(item.id)}
                            className={`w-12 h-6 rounded-full flex items-center transition-colors duration-300 
                              ${notifications[item.id] 
                                ? (darkMode ? 'bg-green-500 justify-end' : 'bg-green-500 justify-end') 
                                : (darkMode ? 'bg-gray-600 justify-start' : 'bg-gray-300 justify-start')}`}
                          >
                            <span className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 
                              ${notifications[item.id] ? 'translate-x-6' : 'translate-x-1'}`}>
                              {notifications[item.id] && <Check className="w-3 h-3 text-green-500 m-1" />}
                            </span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <button 
                      onClick={handleSave}
                      className={`px-4 py-2 rounded-md bg-blue-600 text-white flex items-center hover:bg-blue-700
                        transition-all duration-200 ${isSaving ? 'opacity-70' : ''}`}
                      disabled={isSaving}
                    >
                      {isSaving ? 'Enregistrement...' : 'Enregistrer les préférences'}
                    </button>
                  </div>
                </div>
              )}
              
              {/* Addresses Settings */}
              {activeTab === 'addresses' && (
                <div className="animate-fadeIn">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Mes adresses</h2>
                    <button className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors">
                      + Ajouter une adresse
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { id: 1, type: 'Domicile', address: 'Rue des Fleurs, Bonapriso, Douala', isDefault: true },
                      { id: 2, type: 'Bureau', address: 'Avenue principale, Bonanjo, Douala', isDefault: false },
                    ].map((address) => (
                      <div 
                        key={address.id} 
                        className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} 
                          ${address.isDefault ? 'border-blue-500 border-2' : ''}`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium">{address.type}</h3>
                              {address.isDefault && (
                                <span className="ml-2 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                  Par défaut
                                </span>
                              )}
                            </div>
                            <p className="text-sm mt-1">{address.address}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}>
                              Modifier
                            </button>
                            <button className={`text-sm ${darkMode ? 'text-red-400' : 'text-red-600'} hover:underline`}>
                              Supprimer
                            </button>
                          </div>
                        </div>
                        {!address.isDefault && (
                          <button className="mt-3 text-sm text-blue-600 hover:underline">
                            Définir comme adresse par défaut
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Security Settings */}
              {activeTab === 'security' && (
                <div className="animate-fadeIn">
                  <h2 className="text-xl font-semibold mb-6">Sécurité</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Changer le mot de passe</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium mb-2">Mot de passe actuel</label>
                          <input 
                            type="password" 
                            placeholder="••••••••" 
                            className={`w-full px-3 py-2 border rounded-md 
                            ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Nouveau mot de passe</label>
                          <input 
                            type="password" 
                            placeholder="••••••••" 
                            className={`w-full px-3 py-2 border rounded-md 
                            ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Confirmer le nouveau mot de passe</label>
                          <input 
                            type="password" 
                            placeholder="••••••••" 
                            className={`w-full px-3 py-2 border rounded-md 
                            ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                          />
                        </div>
                      </div>
                      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        Mettre à jour le mot de passe
                      </button>
                    </div>
                    
                    <div className="pt-6 border-t">
                      <h3 className="text-lg font-medium mb-3">Vérification en deux étapes</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Ajoutez une couche de sécurité supplémentaire à votre compte en activant la vérification en deux étapes.
                      </p>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                        Activer la vérification en deux étapes
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Payment Settings */}
              {activeTab === 'payment' && (
                <div className="animate-fadeIn">
                  <h2 className="text-xl font-semibold mb-6">Méthodes de paiement</h2>
                  
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}>
                      <div className="flex items-center">
                        <div className="bg-orange-100 p-2 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="font-medium">Orange Money</p>
                          <p className="text-sm text-gray-500">****1234</p>
                        </div>
                        <div className="ml-auto flex space-x-2">
                          <button className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}>
                            Modifier
                          </button>
                          <button className={`text-sm ${darkMode ? 'text-red-400' : 'text-red-600'} hover:underline`}>
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}>
                      <div className="flex items-center">
                        <div className="bg-yellow-100 p-2 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="font-medium">MTN Mobile Money</p>
                          <p className="text-sm text-gray-500">****5678</p>
                        </div>
                        <div className="ml-auto flex space-x-2">
                          <button className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}>
                            Modifier
                          </button>
                          <button className={`text-sm ${darkMode ? 'text-red-400' : 'text-red-600'} hover:underline`}>
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button className="mt-6 px-4 py-2 rounded-md border border-dashed flex items-center justify-center w-full
                    ${darkMode ? 'border-gray-500 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'} transition-colors">
                    <span className="text-sm">+ Ajouter une méthode de paiement</span>
                  </button>
                </div>
              )}
              
              {/* Help & Support */}
              {activeTab === 'help' && (
                <div className="animate-fadeIn">
                  <h2 className="text-xl font-semibold mb-6">Aide et Support</h2>
                  
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <h3 className="font-medium mb-2">Comment fonctionne le service de blanchisserie ?</h3>
                      <p className="text-sm text-gray-500">
                        Contour Wash offre des services de pressing, blanchisserie et entretien de chaussures avec ramassage et livraison à domicile.
                        Vous pouvez commander un service via l'application, planifier un ramassage et suivre votre commande en temps réel.
                      </p>
                    </div>
                    
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <h3 className="font-medium mb-2">Quels sont les délais de livraison ?</h3>
                      <p className="text-sm text-gray-500">
                        Les délais standard sont de 48 heures pour les services de blanchisserie et pressing.
                        Un service express avec livraison sous 24h est disponible avec un supplément.
                      </p>
                    </div>
                    
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <h3 className="font-medium mb-2">Comment contacter le service client ?</h3>
                      <p className="text-sm text-gray-500 mb-2">
                        Notre équipe de support est disponible par téléphone, email ou chat en direct:
                      </p>
                      <ul className="text-sm text-gray-500 space-y-1">
                        <li>• Téléphone: +237 691667137 / 671465886</li>
                        <li>• Email: Contourwash@gmail.com</li>
                        <li>• Horaires: Du lundi au samedi, de 8h à 19h</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                      Contacter le support
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </ClientsLayout>
  );
};

// Define animation styles using React's way instead of direct DOM manipulation
const animationStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
`;

export default Parametres;