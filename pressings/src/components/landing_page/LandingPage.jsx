import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpCircle, ChevronDown, MapPin, Clock, CreditCard, Star, Truck, ShieldCheck, CheckCircle, Smartphone, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../LanguageSwitcher';
import ContactService from '../../Services/auth/contact_us'; // Adjust the path as necessary



// Import images
import Blanchisseriejpg from '../../assets/images/Blanchisseriejpg.jpg';
import Pressing from '../../assets/images/Pressing.jpg';
import Chaussures from '../../assets/images/Entretien de Chaussures.jpg';
import Logo from '../../assets/logo/logo.png';
import Avarta from '../../assets/images/avarta.webp';
import Avarta2 from '../../assets/images/avarta1 (2).png';
import CommandeEnLigne from '../../assets/images/Commandez en ligne.jpg';
import RamassageDomicile from '../../assets/images/Ramassage à domicile.jpg';
import TraitementProfessionnel from '../../assets/images/Traitement professionnel.jpg';
import LivraisonPaiement from '../../assets/images/Livraison et paiement.jpg';

// Import Tarifs modal component
import Tarifs from './tarifs';

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('blanchisserie');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tarifsModalOpen, setTarifsModalOpen] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Open and close Tarifs modal
  const openTarifsModal = () => setTarifsModalOpen(true);
  const closeTarifsModal = () => setTarifsModalOpen(false);

  // Services data
  const services = {
    blanchisserie: {
      title: 'Blanchisserie',
      description:
        'Confiez-nous votre linge et nous vous le rendrons impeccable. Tarif standard à 1700 FCFA/Kg.',
      items: [
        'Draps et linges de maison',
        'Vêtements du quotidien',
        'Linge de bébé',
        'Traitement délicat',
      ],
      image: Blanchisseriejpg,
    },
    pressing: {
      title: 'Pressing',
      description:
        'Notre service de pressing professionnel prend soin de vos vêtements les plus précieux.',
      items: [
        'Chemises à partir de 1200 FCFA',
        'Pantalons à partir de 1500 FCFA',
        'Costumes complets à 4800 FCFA',
        'Robes de 2200 à 5200 FCFA',
      ],
      image: Pressing,
    },
    chaussures: {
      title: 'Entretien de Chaussures',
      description:
        'Redonnez vie à vos chaussures avec notre service d’entretien spécialisé.',
      items: [
        'Nettoyage complet',
        'Traitement du cuir',
        'Réparations mineures',
        'Polissage professionnel',
      ],
      image: Chaussures,
    },
  };

  // Testimonials data
  const testimonials = [
    {
      name: 'Jean Kamga',
      role: 'Cadre bancaire',
      image: Avarta,
      text: 'Depuis que j’utilise Contour Wash, je gagne un temps précieux. Service ponctuel et pressing de qualité pour mes costumes professionnels.',
    },
    {
      name: 'Famille Mbarga',
      role: 'Client fidèle',
      image: Avarta,
      text: 'Avec 4 enfants, la lessive était un cauchemar. Contour Wash nous facilite énormément la vie avec leur service de blanchisserie hebdomadaire.',
    },
    {
      name: 'Marie Ekambi',
      role: 'Entrepreneur',
      image: Avarta2,
      text: 'La qualité est constante et le service client exceptionnel. J’apprécie particulièrement la possibilité de suivre ma commande en temps réel.',
    },
  ];

  return (
    <div className="font-sans min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-700">
                Contour<span className="text-teal-500">Wash</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Services
              </a>
              <a href="#how-it-works" className="font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Comment ça marche
              </a>
              <a href="#coverage" className="font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Zones de service
              </a>
              <a href="#testimonials" className="font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Témoignages
              </a>
              <a href="#contact" className="font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </a>
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow transition-colors"
              >
                Commander
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 animate-fade-in-down">
              <a href="#services" className="block py-2 font-medium text-gray-700 hover:text-blue-600">
                Services
              </a>
              <a href="#how-it-works" className="block py-2 font-medium text-gray-700 hover:text-blue-600">
                Comment ça marche
              </a>
              <a href="#coverage" className="block py-2 font-medium text-gray-700 hover:text-blue-600">
                Zones de service
              </a>
              <a href="#testimonials" className="block py-2 font-medium text-gray-700 hover:text-blue-600">
                Témoignages
              </a>
              <a href="#contact" className="block py-2 font-medium text-gray-700 hover:text-blue-600">
                Contact
              </a>
              <Link
                to="/login"
                className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow block text-center"
              >
                Commander
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-r from-blue-600 to-teal-500 text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Libérez-vous des <span className="text-yellow-300">corvées</span> de lessive
              </h1>
              <p className="text-xl mb-8 md:max-w-lg">
                Contour Wash révolutionne votre quotidien avec des services de blanchisserie, pressing et entretien de chaussures à domicile au Cameroun.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/login"
                  className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-50 transition-colors text-center"
                >
                  Commander maintenant
                </Link>
                <button 
                  className="bg-transparent border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
                  onClick={openTarifsModal}
                >
                  Nos tarifs
                </button>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="bg-white p-2 rounded-lg shadow-xl rotate-3 transform transition-transform hover:rotate-0">
                <img src={Logo} alt="Contour Wash Service" className="rounded-md" />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-blue-800 text-white p-4 rounded-lg shadow-lg">
                <p className="font-bold">24/7</p>
                <p className="text-sm">Service Client</p>
              </div>
            </div>
          </div>
        </div>

        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#F9FAFB" fillOpacity="1" d="M0,96L60,80C120,64,240,32,360,32C480,32,600,64,720,64C840,64,960,32,1080,24C1200,16,1320,32,1380,40L1440,48L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"></path>
          </svg>
        </div>
      </header>
      
      {/* Tarifs Modal */}
      <Tarifs isOpen={tarifsModalOpen} onClose={closeTarifsModal} />

      {/* Feature Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Smartphone className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="ml-4 text-xl font-semibold">Commande Facile</h3>
              </div>
              <p className="text-gray-600">Commandez vos services de blanchisserie en quelques clics depuis notre application web responsive, disponible 24/7.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 p-3 rounded-full">
                  <Truck className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="ml-4 text-xl font-semibold">Ramassage & Livraison</h3>
              </div>
              <p className="text-gray-600">Notre équipe se déplace chez vous pour collecter et livrer vos vêtements et chaussures aux horaires qui vous conviennent.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <MessageSquare className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="ml-4 text-xl font-semibold">Suivi en Temps Réel</h3>
              </div>
              <p className="text-gray-600">Suivez l’état de vos commandes à chaque étape du processus, depuis le ramassage jusqu’à la livraison finale.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Services Premium</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos services professionnels adaptés à tous vos besoins d’entretien de vêtements et de chaussures.
            </p>
          </div>

          {/* Service Tabs */}
          <div className="flex flex-wrap justify-center mb-8 space-x-2">
            {Object.keys(services).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 rounded-full font-medium transition-colors duration-300 ${
                  activeTab === key ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {services[key].title}
              </button>
            ))}
          </div>

          {/* Service Content */}
          <div className="flex flex-col md:flex-row items-center bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
            <div className="md:w-1/2 p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-4">{services[activeTab].title}</h3>
              <p className="text-gray-600 mb-6">{services[activeTab].description}</p>
              <ul className="space-y-3 mb-8">
                {services[activeTab].items.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition-colors">
                Commander ce service
              </button>
            </div>
            <div className="md:w-1/2">
              <img src={services[activeTab].image} alt={services[activeTab].title} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-blue-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comment Ça Marche</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un processus simple et efficace conçu pour vous faciliter la vie
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>

            {/* Steps */}
            <div className="space-y-12 md:space-y-0 relative">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center md:space-x-6">
                <div className="md:w-1/2 mb-8 md:mb-0 md:text-right">
                  <h3 className="text-2xl font-bold mb-2">1. Commandez en ligne</h3>
                  <p className="text-gray-600">Sélectionnez vos services, précisez vos préférences et choisissez votre créneau de ramassage et livraison.</p>
                </div>
                <div className="md:mx-auto bg-blue-600 rounded-full h-12 w-12 flex items-center justify-center text-white font-bold z-10">
                  1
                </div>
                <div className="md:w-1/2 md:pl-8">
                  <img src={CommandeEnLigne} alt="Commande en ligne" className="rounded-lg shadow-md w-full" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row-reverse items-center md:space-x-reverse md:space-x-6">
                <div className="md:w-1/2 mb-8 md:mb-0 md:text-left">
                  <h3 className="text-2xl font-bold mb-2">2. Ramassage à domicile</h3>
                  <p className="text-gray-600">Notre personnel professionnel se déplace chez vous pour collecter vos articles au moment convenu.</p>
                </div>
                <div className="md:mx-auto bg-blue-600 rounded-full h-12 w-12 flex items-center justify-center text-white font-bold z-10">
                  2
                </div>
                <div className="md:w-1/2 md:pr-8">
                  <img src={RamassageDomicile} alt="Ramassage à domicile" className="rounded-lg shadow-md w-full" />
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center md:space-x-6">
                <div className="md:w-1/2 mb-8 md:mb-0 md:text-right">
                  <h3 className="text-2xl font-bold mb-2">3. Traitement professionnel</h3>
                  <p className="text-gray-600">Vos articles sont traités avec soin selon vos spécifications dans notre centre de traitement moderne.</p>
                </div>
                <div className="md:mx-auto bg-blue-600 rounded-full h-12 w-12 flex items-center justify-center text-white font-bold z-10">
                  3
                </div>
                <div className="md:w-1/2 md:pl-8">
                  <img src={TraitementProfessionnel} alt="Traitement professionnel" className="rounded-lg shadow-md w-full" />
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col md:flex-row-reverse items-center md:space-x-reverse md:space-x-6">
                <div className="md:w-1/2 mb-8 md:mb-0 md:text-left">
                  <h3 className="text-2xl font-bold mb-2">4. Livraison et paiement</h3>
                  <p className="text-gray-600">Vos articles propres vous sont livrés à l’heure convenue. Payez facilement via Mobile Money ou en espèces à la livraison.</p>
                </div>
                <div className="md:mx-auto bg-blue-600 rounded-full h-12 w-12 flex items-center justify-center text-white font-bold z-10">
                  4
                </div>
                <div className="md:w-1/2 md:pr-8">
                  <img src={LivraisonPaiement} alt="Livraison et paiement" className="rounded-lg shadow-md w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Areas */}
      <section id="coverage" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Zones de Service</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Actuellement disponible dans les principales zones urbaines de Douala et Yaoundé
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-gray-50 p-8 rounded-xl shadow">
              <div className="flex items-center mb-6">
                <MapPin className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-2xl font-bold">Douala</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-blue-600 rounded-full mr-2"></div>
                      <span>Akwa</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-blue-600 rounded-full mr-2"></div>
                      <span>Bonanjo</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-blue-600 rounded-full mr-2"></div>
                      <span>Bonapriso</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-blue-600 rounded-full mr-2"></div>
                      <span>Bonamoussadi</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-blue-600 rounded-full mr-2"></div>
                      <span>Makepe</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-blue-600 rounded-full mr-2"></div>
                      <span>Ndogbong</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-blue-600 rounded-full mr-2"></div>
                      <span>Logpom</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-blue-600 rounded-full mr-2"></div>
                      <span>Kotto</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow">
              <div className="flex items-center mb-6">
                <MapPin className="h-8 w-8 text-teal-600 mr-3" />
                <h3 className="text-2xl font-bold">Yaoundé</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-teal-600 rounded-full mr-2"></div>
                      <span>Bastos</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-teal-600 rounded-full mr-2"></div>
                      <span>Centre-ville</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-teal-600 rounded-full mr-2"></div>
                      <span>Nlongkak</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-teal-600 rounded-full mr-2"></div>
                      <span>Etoa-Meki</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-teal-600 rounded-full mr-2"></div>
                      <span>Messa</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-teal-600 rounded-full mr-2"></div>
                      <span>Omnisport</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-teal-600 rounded-full mr-2"></div>
                      <span>Mvan</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-teal-600 rounded-full mr-2"></div>
                      <span>Nsimeyong</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Vous ne trouvez pas votre quartier? Nous élargissons constamment notre zone de couverture.</p>
            <button className="bg-transparent border-2 border-blue-600 text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
              Vérifier mon adresse
            </button>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-500 text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Tarifs</h2>
            <p className="text-xl max-w-3xl mx-auto">
              Des prix transparents et compétitifs pour tous nos services premium
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Pricing Card 1 */}
            <div className="bg-white text-gray-800 rounded-xl shadow-xl overflow-hidden transform transition-transform hover:-translate-y-2">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">Blanchisserie</h3>
                <div className="text-4xl font-bold mb-4">
                  1700 <span className="text-lg">FCFA/Kg</span>
                </div>
                <p className="text-gray-600 mb-6">
                  Service complet de lavage et séchage pour tous vos vêtements et linges de maison.
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Tarification au poids</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Livraison incluse (zones standard)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Produits de qualité</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Respect des instructions spéciales</span>
                  </li>
                </ul>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition-colors">
                  Commander
                </button>
              </div>
            </div>

            {/* Pricing Card 2 */}
            <div className="bg-white text-gray-800 rounded-xl shadow-xl overflow-hidden transform transition-transform hover:-translate-y-2 lg:-mt-4 lg:mb-4 relative">
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 uppercase text-xs font-bold tracking-wider">
                Populaire
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">Pressing</h3>
                <div className="text-4xl font-bold mb-4">
                  1200-4800 <span className="text-lg">FCFA</span>
                </div>
                <p className="text-gray-600 mb-6">
                  Service professionnel de pressing pour vos vêtements délicats.
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Tarification par pièce</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Chemises à partir de 1200 FCFA</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Costumes complets à 4800 FCFA</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Robes de 2200 à 5200 FCFA</span>
                  </li>
                </ul>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition-colors">
                  Commander
                </button>
              </div>
            </div>

            {/* Pricing Card 3 */}
            <div className="bg-white text-gray-800 rounded-xl shadow-xl overflow-hidden transform transition-transform hover:-translate-y-2">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">Entretien de Chaussures</h3>
                <div className="text-4xl font-bold mb-4">
                  700-6000 <span className="text-lg">FCFA</span>
                </div>
                <p className="text-gray-600 mb-6">
                  Service spécialisé pour le nettoyage, la réparation et le polissage de vos chaussures.
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Nettoyage complet</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Traitement du cuir</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Réparations mineures</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Polissage professionnel</span>
                  </li>
                </ul>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition-colors">
                  Commander
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce que disent nos clients</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez les témoignages de nos clients satisfaits qui ont choisi Contour Wash pour leurs besoins en blanchisserie et entretien de chaussures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
  <section id="contact" className="py-20 bg-white">
  <div className="container mx-auto px-4 md:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Contactez-nous</h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Vous avez des questions ou besoin d’assistance ? Notre équipe est là pour vous aider.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Contact Form */}
      <div className="bg-gray-50 p-8 rounded-xl shadow-md">
      <form onSubmit={async (e) => {
        e.preventDefault();
        const formData = {
          name: e.target.name.value,
          email: e.target.email.value,
          subject: e.target.subject.value, // Get subject from form instead of hardcoding
          message: e.target.message.value,
        };

        const response = await ContactService.submitContactForm(formData);
        if (response.success) {
          alert('Message sent successfully!');
          // Reset form
          e.target.reset();
        } else {
          alert('Failed to send message. Please try again.');
          console.error(response.error); // Log the error for debugging
        }
      }}>
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nom complet
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Votre nom"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              Sujet
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Sujet de votre message"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Adresse email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Votre email"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Votre message"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition-colors"
          >
            Envoyer le message
          </button>
        </form>
      </div>

      {/* Contact Info */}
      <div className="space-y-8">
        <div className="flex items-start">
          <div className="bg-blue-100 p-3 rounded-full">
            <MapPin className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-bold mb-2">Adresse</h3>
            <p className="text-gray-600">Yaounde, Cameroun</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="bg-teal-100 p-3 rounded-full">
            <Clock className="h-6 w-6 text-teal-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-bold mb-2">Heures d’ouverture</h3>
            <p className="text-gray-600">Lundi - Vendredi : 8h - 18h</p>
            <p className="text-gray-600">Samedi : 9h - 14h</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="bg-yellow-100 p-3 rounded-full">
            <MessageSquare className="h-6 w-6 text-yellow-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-bold mb-2">Support</h3>
            <p className="text-gray-600">Email : support@contourwash.com</p>
            <p className="text-gray-600">Téléphone : +237 691 667 137</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About Section */}
            <div>
              <h3 className="text-lg font-bold mb-4">À propos de Contour Wash</h3>
              <p className="text-gray-400">
                Contour Wash révolutionne l’industrie de la blanchisserie au Cameroun avec des services de qualité supérieure et une expérience client exceptionnelle.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">Liens rapides</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">
                    Comment ça marche
                  </a>
                </li>
                <li>
                  <a href="#coverage" className="text-gray-400 hover:text-white transition-colors">
                    Zones de service
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">
                    Témoignages
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-bold mb-4">Informations légales</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Politique de confidentialité
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Conditions d’utilisation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-lg font-bold mb-4">Suivez-nous</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Contour Wash. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg transition-opacity duration-300 ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <ArrowUpCircle className="h-6 w-6" />
      </button>
    </div>
  );
  
};

export default LandingPage;