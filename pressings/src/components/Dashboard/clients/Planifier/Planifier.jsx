import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Truck, ArrowRight, Info, CheckCircle, History, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import ClientsLayout from '../../Layout/clients_layout';
import { deliveryService } from '../../../../Services/clients/deliveryService';
// In your form component (e.g., DeliveryPlanForm.js)
import { validateDeliveryPlanForm, createValidatedDeliveryPlan } from './validationUtils';

const Planifier = () => {
  const [step, setStep] = useState(1);
  const [selectedPickupDate, setSelectedPickupDate] = useState('');
  const [selectedPickupTime, setSelectedPickupTime] = useState('');
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState('');
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [isExpressService, setIsExpressService] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedQuarter, setSelectedQuarter] = useState('');
  const [selectedAddressType, setSelectedAddressType] = useState('existing');
  const [newAddress, setNewAddress] = useState({
    name: '',
    street: '',
    city: '',
    quarter: ''
  });
  const [showHistory, setShowHistory] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [planningHistory, setPlanningHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch saved addresses and history on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [addresses, history] = await Promise.all([
          deliveryService.getSavedAddresses(),
          deliveryService.getDeliveryPlanHistory()
        ]);
        setSavedAddresses(addresses);
        setPlanningHistory(history);
      } catch (err) {
        setError(err.message || 'Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Handle window resize for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // City and quarters data
  const cityQuartersData = {
    douala: [
      'Bonapriso', 'Bonanjo', 'Akwa', 'Deido', 'Bali', 'New Bell', 
      'Bonaberi', 'Makepe', 'Bonamoussadi', 'Logpom', 'PK 14'
    ],
    yaounde: [
      'Bastos', 'Centre Ville', 'Nlongkak', 'Etoa-Meki', 'Mvan', 
      'Mvog-Mbi', 'Biyem-Assi', 'Essos', 'Emana', 'Mimboman'
    ]
  };

  // Time slots
  const timeSlots = [
    '08:00 - 10:00', 
    '10:00 - 12:00', 
    '12:00 - 14:00', 
    '14:00 - 16:00', 
    '16:00 - 18:00'
  ];

  // Calculate delivery date based on pickup (for standard service)
  const calculateDeliveryDate = (pickupDate) => {
    if (!pickupDate) return '';
    const date = new Date(pickupDate);
    date.setDate(date.getDate() + (isExpressService ? 1 : 2));
    return date.toISOString().split('T')[0];
  };

  // Calculate additional cost for express service
  const expressServiceCost = 2000; // FCFA

  // Calendar functions
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push(date);
    }
    
    return days;
  };

  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };

  const formatDateForComparison = (date) => {
    return date.toISOString().split('T')[0];
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateSelect = (date) => {
    if (!isPastDate(date)) {
      setSelectedPickupDate(formatDateForComparison(date));
      setShowCalendar(false);
    }
  };

  const handleDeliveryDateSelect = (date) => {
    if (!isPastDate(date) && new Date(date) >= new Date(calculateDeliveryDate(selectedPickupDate))) {
      setSelectedDeliveryDate(formatDateForComparison(date));
      setShowCalendar(false);
    }
  };

  // Effect to update delivery date when pickup date or express service changes
  useEffect(() => {
    if (selectedPickupDate && isExpressService) {
      const calculatedDate = calculateDeliveryDate(selectedPickupDate);
      setSelectedDeliveryDate(calculatedDate);
    }
  }, [selectedPickupDate, isExpressService]);

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
      // Scroll to top when changing steps with smooth behavior
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
      // Scroll to top when changing steps with smooth behavior
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      
      const planData = {
        pickup_date: selectedPickupDate,
        pickup_time: selectedPickupTime,
        delivery_date: selectedDeliveryDate,
        delivery_time: selectedDeliveryTime,
        address: selectedAddress,
        is_express_service: isExpressService,
        special_instructions: specialInstructions,
        status: 'Planifié'  // Add initial status
      };
      
      // Validate form data before submission
      const { isValid, errors } = validateDeliveryPlanForm(planData);
      
      if (!isValid) {
        // Display validation errors
        setError(errors);
        return;
      }
      
      // If validation passes, submit the form
      await deliveryService.createDeliveryPlan(planData);
      
      // Refresh history after successful submission
      const history = await deliveryService.getDeliveryPlanHistory();
      setPlanningHistory(history);
      
      // Show success and reset form
      alert('Planification réussie ! Vous recevrez bientôt une confirmation.');
      setStep(1);
      setSelectedPickupDate('');
      setSelectedPickupTime('');
      setSelectedDeliveryDate('');
      setSelectedDeliveryTime('');
      setSelectedAddress('');
      setIsExpressService(false);
      setSpecialInstructions('');
    } catch (err) {
      console.error('Error creating delivery plan:', err.response?.data || err.message);
      
      // Format and display backend validation errors if they exist
      if (err.response?.data) {
        const backendErrors = err.response.data;
        // Convert backend error format to a more user-friendly format
        const formattedErrors = Object.entries(backendErrors)
          .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
          .join('\n');
        setError(formattedErrors);
      } else {
        setError('Failed to create delivery plan');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCityChange = (city) => {
    setSelectedCity(city);
    setSelectedQuarter('');
    setNewAddress({...newAddress, city: city, quarter: ''});
  };

  const handleQuarterChange = (quarter) => {
    setSelectedQuarter(quarter);
    setNewAddress({...newAddress, quarter: quarter});
  };

  const handleAddNewAddress = async () => {
    // Form validation for new address
    if (
      newAddress.name.trim() === '' || 
      newAddress.street.trim() === '' || 
      newAddress.city === '' || 
      newAddress.quarter === ''
    ) {
      alert('Veuillez remplir tous les champs de l\'adresse');
      return;
    }

    try {
      setIsLoading(true);
      const addressData = {
        name: newAddress.name,
        street: newAddress.street,
        city: newAddress.city,
        quarter: newAddress.quarter,
        is_default: false
      };
      
      const savedAddress = await deliveryService.createSavedAddress(addressData);
      
      // Update local state with the new address
      setSavedAddresses([...savedAddresses, savedAddress]);
      
      const fullAddress = `${newAddress.street}, ${newAddress.quarter}, ${newAddress.city.charAt(0).toUpperCase() + newAddress.city.slice(1)}`;
      setSelectedAddress(fullAddress);
      setSelectedAddressType('existing');
      
      // Reset new address form
      setNewAddress({
        name: '',
        street: '',
        city: '',
        quarter: ''
      });
      
      alert('Nouvelle adresse ajoutée avec succès!');
    } catch (err) {
      setError(err.message || 'Failed to save address');
    } finally {
      setIsLoading(false);
    }
  };

  // Check if current step is valid to enable/disable next button
  const isStepValid = () => {
    switch (step) {
      case 1:
        return selectedPickupDate && selectedPickupTime;
      case 2:
        return isExpressService || (selectedDeliveryDate && selectedDeliveryTime);
      case 3:
        if (selectedAddressType === 'existing') {
          return selectedAddress;
        } else {
          return newAddress.name && newAddress.street && newAddress.city && newAddress.quarter;
        }
      default:
        return true;
    }
  };

  // Available dates (next 7 days) - for old date picker
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
      });
    }
    
    return dates;
  };

  const availableDates = getAvailableDates();

  if (isLoading) {
    return (
      <ClientsLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-700">Chargement en cours...</p>
          </div>
        </div>
      </ClientsLayout>
    );
  }

  if (error) {
    return (
      <ClientsLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <div className="text-red-500 font-medium mb-4">Erreur</div>
            <p className="text-gray-700 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      </ClientsLayout>
    );
  }

  return (
    <ClientsLayout>
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
          {showHistory ? (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-blue-600 px-4 sm:px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl sm:text-2xl font-bold text-white">Historique des planifications</h1>
                <button 
                  onClick={() => setShowHistory(false)}
                  className="text-white hover:text-blue-100 transition-colors duration-200"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
              
              <div className="px-4 sm:px-6 py-4">
                {planningHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Aucune planification dans votre historique</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {planningHistory.map((plan) => (
                      <div key={plan.id} className="border rounded-lg overflow-hidden">
                        <div className={`px-4 py-2 text-white font-medium ${plan.status === 'Terminé' ? 'bg-green-600' : plan.status === 'En cours' ? 'bg-blue-600' : 'bg-orange-500'}`}>
                          <div className="flex justify-between items-center">
                            <span>Planification #{plan.id}</span>
                            <span className="text-sm">{plan.status}</span>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Calendar size={16} className="text-blue-600" />
                                Ramassage
                              </h3>
                              <p className="text-gray-800 ml-6">
                                {new Date(plan.pickup_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                              </p>
                              <p className="text-gray-600 ml-6 text-sm">{plan.pickup_time}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Truck size={16} className="text-blue-600" />
                                Livraison
                              </h3>
                              <p className="text-gray-800 ml-6">
                                {new Date(plan.delivery_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                              </p>
                              <p className="text-gray-600 ml-6 text-sm">{plan.delivery_time}</p>
                            </div>
                            <div className="sm:col-span-2">
                              <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <MapPin size={16} className="text-blue-600" />
                                Adresse
                              </h3>
                              <p className="text-gray-800 ml-6">{plan.address}</p>
                            </div>
                            {plan.is_express_service && (
                              <div className="sm:col-span-2">
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Service Express</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Header */}
              <div className="bg-blue-600 px-4 sm:px-6 py-4 flex justify-between items-center">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white">Planifier votre service</h1>
                  <p className="text-blue-100 mt-1 text-sm sm:text-base">Programmez le ramassage et la livraison de vos articles</p>
                </div>
                <button 
                  onClick={() => setShowHistory(true)}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors duration-200 rounded-md px-3 py-1 text-white text-sm"
                >
                  <History size={16} />
                  <span className="hidden sm:inline">Historique</span>
                </button>
              </div>
              
              {/* Progress Steps - Responsive adjustment for mobile */}
              <div className="px-4 sm:px-6 pt-4">
                <div className="flex items-center justify-between mb-6 sm:mb-8 overflow-x-auto">
                  <div className="flex flex-col items-center min-w-[60px]">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 text-gray-500'} font-bold mb-2 transition-all duration-300`}>
                      1
                    </div>
                    <div className={`text-xs font-medium text-center ${step >= 1 ? 'text-blue-600' : 'text-gray-500'}`}>Ramassage</div>
                  </div>
                  
                  <div className="flex-1 h-1 bg-gray-200 mx-1 sm:mx-2 min-w-[20px]">
                    <div className={`h-full bg-blue-600 transition-all duration-500 ${step >= 2 ? 'w-full' : 'w-0'}`}></div>
                  </div>
                  
                  <div className="flex flex-col items-center min-w-[60px]">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 text-gray-500'} font-bold mb-2 transition-all duration-300`}>
                      2
                    </div>
                    <div className={`text-xs font-medium text-center ${step >= 2 ? 'text-blue-600' : 'text-gray-500'}`}>Livraison</div>
                  </div>
                  
                  <div className="flex-1 h-1 bg-gray-200 mx-1 sm:mx-2 min-w-[20px]">
                    <div className={`h-full bg-blue-600 transition-all duration-500 ${step >= 3 ? 'w-full' : 'w-0'}`}></div>
                  </div>
                  
                  <div className="flex flex-col items-center min-w-[60px]">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 text-gray-500'} font-bold mb-2 transition-all duration-300`}>
                      3
                    </div>
                    <div className={`text-xs font-medium text-center ${step >= 3 ? 'text-blue-600' : 'text-gray-500'}`}>Adresse</div>
                  </div>
                  
                  <div className="flex-1 h-1 bg-gray-200 mx-1 sm:mx-2 min-w-[20px]">
                    <div className={`h-full bg-blue-600 transition-all duration-500 ${step >= 4 ? 'w-full' : 'w-0'}`}></div>
                  </div>
                  
                  <div className="flex flex-col items-center min-w-[60px]">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 ${step >= 4 ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 text-gray-500'} font-bold mb-2 transition-all duration-300`}>
                      4
                    </div>
                    <div className={`text-xs font-medium text-center ${step >= 4 ? 'text-blue-600' : 'text-gray-500'}`}>Confirmation</div>
                  </div>
                </div>
              </div>
              
              {/* Step Content */}
              <div className="px-4 sm:px-6 py-4">
                {/* Step 1: Pickup Date and Time */}
                {step === 1 && (
                  <div className="space-y-6 transition-opacity duration-300">
                    <div className="animate-fadeIn">
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-2">
                        <Calendar size={20} className="text-blue-600" />
                        Date de ramassage
                      </h2>
                      <p className="text-sm sm:text-base text-gray-600 mb-4">Choisissez quand nous devons récupérer vos articles</p>
                      
                      {/* Modern Calendar */}
                      <div className="relative mb-6">
                        <div 
                          onClick={() => setShowCalendar(!showCalendar)}
                          className="flex items-center justify-between p-3 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors"
                        >
                          <div className="flex items-center">
                            <Calendar className="text-blue-600 mr-2" size={18} />
                            <span className="text-gray-700">
                              {selectedPickupDate 
                                ? new Date(selectedPickupDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
                                : 'Sélectionner une date'}
                            </span>
                          </div>
                          <ChevronDown className={`text-gray-500 transition-transform duration-200 ${showCalendar ? 'rotate-180' : ''}`} size={18} />
                        </div>
                        
                        {showCalendar && (
                          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                            <div className="p-3 border-b border-gray-200">
                              <div className="flex items-center justify-between">
                                <button 
                                  onClick={handlePrevMonth}
                                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                  <ChevronLeft size={20} className="text-gray-600" />
                                </button>
                                <div className="font-medium">
                                  {currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                                </div>
                                <button 
                                  onClick={handleNextMonth}
                                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                  <ChevronRight size={20} className="text-gray-600" />
                                </button>
                              </div>
                            </div>
                            <div className="p-2">
                              <div className="grid grid-cols-7 mb-1">
                                {['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'].map((day, i) => (
                                  <div key={i} className="text-center text-xs font-medium text-gray-500 py-1">
                                    {day}
                                  </div>
                                ))}
                              </div>
                              <div className="grid grid-cols-7 gap-1">
                                {generateCalendarDays().map((date, i) => (
                                  <div 
                                    key={i} 
                                    onClick={() => date && !isPastDate(date) && handleDateSelect(date)}
                                    className={`
                                      text-center p-2 rounded-full text-sm 
                                      ${!date ? '' : isPastDate(date) ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer hover:bg-blue-50'}
                                      ${date && isToday(date) ? 'border border-blue-400' : ''}
                                      ${date && selectedPickupDate === formatDateForComparison(date) ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
                                    `}
                                  >
                                    {date ? date.getDate() : ''}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="p-2 border-t border-gray-200 flex justify-end">
                              <button 
                                onClick={() => setShowCalendar(false)}
                                className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              >
                                Fermer
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="animate-fadeIn">
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-2">
                        <Clock size={20} className="text-blue-600" />
                        Créneau horaire
                      </h2>
                      <p className="text-sm sm:text-base text-gray-600 mb-4">Sélectionnez une plage horaire qui vous convient</p>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                        {timeSlots.map((slot) => (
                          <div 
                            key={slot}
                            onClick={() => setSelectedPickupTime(slot)}
                            className={`border rounded-lg p-2 sm:p-3 text-center cursor-pointer transition-all duration-200 ${
                              selectedPickupTime === slot ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-blue-300 text-gray-700'
                            }`}
                          >
                            <span className="text-sm sm:text-base">{slot}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="animate-fadeIn">
                      <div className="flex items-center mt-4 mb-2">
                        <input 
                          type="checkbox"
                          id="expressService"
                          checked={isExpressService}
                          onChange={(e) => setIsExpressService(e.target.checked)}
                          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="expressService" className="ml-2 text-sm sm:text-base text-gray-700">
                          Service express (+{expressServiceCost.toLocaleString('fr-FR')} FCFA)
                        </label>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500 pl-6">
                        Livraison le lendemain du ramassage (au lieu de 48h)
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Step 2: Delivery Date and Time */}
              {/* Step 2: Delivery Date and Time */}
                        {step === 2 && (
                          <div className="space-y-6 transition-opacity duration-300">
                            <div className="animate-fadeIn">
                              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-2">
                                <Calendar size={20} className="text-blue-600" />
                                Date de livraison
                              </h2>
                              <p className="text-sm sm:text-base text-gray-600 mb-4">Choisissez quand vous souhaitez être livré</p>
                              
                              {isExpressService ? (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-6">
                                  <div className="flex items-center">
                                    <Info size={18} className="text-blue-600 mr-2 flex-shrink-0" />
                                    <p className="text-sm sm:text-base text-gray-700">
                                      Avec le service express, votre livraison sera effectuée le <span className="font-semibold">{
                                        new Date(calculateDeliveryDate(selectedPickupDate)).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
                                      }</span>
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  {/* Delivery Date Calendar */}
                                  <div className="relative mb-6">
                                    <div 
                                      onClick={() => setShowCalendar(!showCalendar)}
                                      className="flex items-center justify-between p-3 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors"
                                    >
                                      <div className="flex items-center">
                                        <Calendar className="text-blue-600 mr-2" size={18} />
                                        <span className="text-gray-700">
                                          {selectedDeliveryDate 
                                            ? new Date(selectedDeliveryDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
                                            : 'Sélectionner une date'}
                                        </span>
                                      </div>
                                      <ChevronDown className={`text-gray-500 transition-transform duration-200 ${showCalendar ? 'rotate-180' : ''}`} size={18} />
                                    </div>
                                    
                                    {showCalendar && (
                                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                                        <div className="p-3 border-b border-gray-200">
                                          <div className="flex items-center justify-between">
                                            <button 
                                              onClick={handlePrevMonth}
                                              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                            >
                                              <ChevronLeft size={20} className="text-gray-600" />
                                            </button>
                                            <div className="font-medium">
                                              {currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                                            </div>
                                            <button 
                                              onClick={handleNextMonth}
                                              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                            >
                                              <ChevronRight size={20} className="text-gray-600" />
                                            </button>
                                          </div>
                                        </div>
                                        <div className="p-2">
                                          <div className="grid grid-cols-7 mb-1">
                                            {['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'].map((day, i) => (
                                              <div key={i} className="text-center text-xs font-medium text-gray-500 py-1">
                                                {day}
                                              </div>
                                            ))}
                                          </div>
                                          <div className="grid grid-cols-7 gap-1">
                                            {generateCalendarDays().map((date, i) => {
                                              const isDisabled = date && (
                                                isPastDate(date) || 
                                                new Date(date) < new Date(calculateDeliveryDate(selectedPickupDate))
                                              );
                                              return (
                                                <div 
                                                  key={i} 
                                                  onClick={() => !isDisabled && date && handleDeliveryDateSelect(date)}
                                                  className={`
                                                    text-center p-2 rounded-full text-sm 
                                                    ${!date ? '' : isDisabled ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer hover:bg-blue-50'}
                                                    ${date && isToday(date) ? 'border border-blue-400' : ''}
                                                    ${date && selectedDeliveryDate === formatDateForComparison(date) ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
                                                  `}
                                                >
                                                  {date ? date.getDate() : ''}
                                                </div>
                                              );
                                            })}
                                          </div>
                                        </div>
                                        <div className="p-2 border-t border-gray-200 flex justify-end">
                                          <button 
                                            onClick={() => setShowCalendar(false)}
                                            className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                          >
                                            Fermer
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  
                                  {/* Info about standard delivery */}
                                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-6">
                                    <div className="flex items-center">
                                      <Info size={18} className="text-blue-600 mr-2 flex-shrink-0" />
                                      <p className="text-sm sm:text-base text-gray-700">
                                        Avec le service standard, vous pouvez choisir une date de livraison à partir du <span className="font-semibold">{
                                          new Date(calculateDeliveryDate(selectedPickupDate)).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
                                        }</span>
                                      </p>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                            <div className="animate-fadeIn">
                              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-2">
                                <Clock size={20} className="text-blue-600" />
                                Créneau horaire de livraison
                              </h2>
                              <p className="text-sm sm:text-base text-gray-600 mb-4">Sélectionnez une plage horaire pour la livraison</p>
                              
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                                {timeSlots.map((slot) => (
                                  <div 
                                    key={slot}
                                    onClick={() => setSelectedDeliveryTime(slot)}
                                    className={`border rounded-lg p-2 sm:p-3 text-center cursor-pointer transition-all duration-200 ${
                                      selectedDeliveryTime === slot ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-blue-300 text-gray-700'
                                    }`}
                                  >
                                    <span className="text-sm sm:text-base">{slot}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                
                {/* Step 3: Address Selection */}
                {step === 3 && (
                  <div className="space-y-6 transition-opacity duration-300">
                    <div className="animate-fadeIn">
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-2">
                        <MapPin size={20} className="text-blue-600" />
                        Adresse de ramassage
                      </h2>
                      <p className="text-sm sm:text-base text-gray-600 mb-4">Où devons-nous récupérer vos articles ?</p>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => setSelectedAddressType('existing')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                              selectedAddressType === 'existing' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            Adresse existante
                          </button>
                          <button 
                            onClick={() => setSelectedAddressType('new')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                              selectedAddressType === 'new' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            Nouvelle adresse
                          </button>
                        </div>
                        
                        {selectedAddressType === 'existing' ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {savedAddresses.map((address) => (
                              <div 
                                key={address.id}
                                onClick={() => setSelectedAddress(`${address.street}, ${address.quarter}, ${address.city}`)}
                                className={`border rounded-lg p-3 sm:p-4 cursor-pointer transition-all duration-200 ${
                                  selectedAddress === `${address.street}, ${address.quarter}, ${address.city}` ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                                }`}
                              >
                                <div className="flex items-center">
                                  <div className={`w-5 h-5 rounded-full border ${
                                    selectedAddress === `${address.street}, ${address.quarter}, ${address.city}` ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                                  } mr-3 flex items-center justify-center`}>
                                    {selectedAddress === `${address.street}, ${address.quarter}, ${address.city}` && (
                                      <div className="w-2 h-2 rounded-full bg-white"></div>
                                    )}
                                  </div>
                                  <div>
                                    <p className="text-sm sm:text-base font-medium">{address.name}</p>
                                    <p className="text-xs sm:text-sm text-gray-600">{address.street}, {address.quarter}, {address.city}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom de l'adresse</label>
                                <input 
                                  type="text"
                                  id="name"
                                  value={newAddress.name}
                                  onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Ex: Domicile, Bureau"
                                />
                              </div>
                              <div>
                                <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">Rue</label>
                                <input 
                                  type="text"
                                  id="street"
                                  value={newAddress.street}
                                  onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Ex: Rue des Manguiers"
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                                <select 
                                  id="city"
                                  value={newAddress.city}
                                  onChange={(e) => handleCityChange(e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                >
                                  <option value="">Sélectionnez une ville</option>
                                  {Object.keys(cityQuartersData).map((city) => (
                                    <option key={city} value={city}>
                                      {city.charAt(0).toUpperCase() + city.slice(1)}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label htmlFor="quarter" className="block text-sm font-medium text-gray-700 mb-1">Quartier</label>
                                <select 
                                  id="quarter"
                                  value={newAddress.quarter}
                                  onChange={(e) => handleQuarterChange(e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                  disabled={!newAddress.city}
                                >
                                  <option value="">Sélectionnez un quartier</option>
                                  {newAddress.city && cityQuartersData[newAddress.city].map((quarter) => (
                                    <option key={quarter} value={quarter}>
                                      {quarter}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            
                            <button 
                              onClick={handleAddNewAddress}
                              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                            >
                              Ajouter cette adresse
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Step 4: Confirmation */}
                {step === 4 && (
                  <div className="space-y-6 transition-opacity duration-300">
                    <div className="animate-fadeIn">
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-2">
                        <CheckCircle size={20} className="text-blue-600" />
                        Confirmation
                      </h2>
                      <p className="text-sm sm:text-base text-gray-600 mb-4">Veuillez vérifier les détails de votre planification</p>
                      
                      <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                              <Calendar size={16} className="text-blue-600" />
                              Ramassage
                            </h3>
                            <p className="text-gray-800 ml-6">
                              {new Date(selectedPickupDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                            <p className="text-gray-600 ml-6 text-sm">{selectedPickupTime}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                              <Truck size={16} className="text-blue-600" />
                              Livraison
                            </h3>
                            <p className="text-gray-800 ml-6">
                              {new Date(selectedDeliveryDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                            <p className="text-gray-600 ml-6 text-sm">{selectedDeliveryTime}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                              <MapPin size={16} className="text-blue-600" />
                              Adresse
                            </h3>
                            <p className="text-gray-800 ml-6">{selectedAddress}</p>
                          </div>
                          {isExpressService && (
                            <div>
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Service Express</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">Instructions spéciales</label>
                        <textarea 
                          id="instructions"
                          value={specialInstructions}
                          onChange={(e) => setSpecialInstructions(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Ex: Sonner deux fois, laisser le colis chez le gardien..."
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Navigation Buttons */}
              <div className="px-4 sm:px-6 py-4 border-t border-gray-200">
                <div className="flex justify-between">
                  {step > 1 && (
                    <button 
                      onClick={handlePreviousStep}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                    >
                      Retour
                    </button>
                  )}
                  {step < 4 && (
                    <button 
                      onClick={handleNextStep}
                      disabled={!isStepValid()}
                      className={`px-4 py-2 ${
                        isStepValid() ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      } rounded-lg transition-colors duration-200`}
                    >
                      Suivant
                    </button>
                  )}
                  {step === 4 && (
                    <button 
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className={`px-4 py-2 ${isLoading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'} text-white rounded-lg transition-colors duration-200`}
                    >
                      {isLoading ? 'En cours...' : 'Confirmer la planification'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ClientsLayout>
  );
};

export default Planifier;