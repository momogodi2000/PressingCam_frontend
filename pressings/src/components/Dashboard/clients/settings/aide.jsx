import React, { useState } from 'react';
import { ChevronDown, Mail, Phone, MessageSquare, HelpCircle, Search, ArrowRight } from 'lucide-react';
import ClientLayout from '../../Layout/clients_layout'; // Adjust the path as necessary based on your folder structure

const Aide = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      id: 1,
      title: "Commandes et Services",
      questions: [
        {
          question: "Comment passer une commande de blanchisserie ?",
          answer: "Pour passer une commande, connectez-vous à votre compte, sélectionnez les services souhaités (pressing, blanchisserie ou entretien de chaussures), indiquez les quantités et les détails, choisissez les dates de ramassage et de livraison, puis validez votre commande en procédant au paiement."
        },
        {
          question: "Quels sont les délais de traitement standards ?",
          answer: "Nos délais standards sont de 48h pour le service de blanchisserie et pressing, et 72h pour l'entretien de chaussures. Un service express est disponible avec un supplément, permettant un traitement en 24h."
        },
        {
          question: "Comment annuler ou modifier ma commande ?",
          answer: "Vous pouvez annuler ou modifier votre commande depuis votre tableau de bord client jusqu'à 2 heures avant l'heure programmée de ramassage. Au-delà, veuillez contacter notre service client."
        }
      ]
    },
    {
      id: 2,
      title: "Paiements",
      questions: [
        {
          question: "Quelles méthodes de paiement acceptez-vous ?",
          answer: "Nous acceptons les paiements via MTN Mobile Money, Orange Money, ainsi que le paiement en espèces à la livraison. Les paiements en ligne sont sécurisés et vous recevez une confirmation immédiate."
        },
        {
          question: "Comment fonctionne le paiement à la livraison ?",
          answer: "Si vous choisissez l'option 'Paiement à la livraison', vous pourrez régler votre commande en espèces ou via Mobile Money au moment de la réception de vos articles."
        },
        {
          question: "Comment obtenir une facture pour ma commande ?",
          answer: "Une facture électronique est automatiquement générée et disponible dans la section 'Historique des commandes' de votre compte. Vous pouvez la télécharger ou la recevoir par email."
        }
      ]
    },
    {
      id: 3,
      title: "Livraisons et Ramassages",
      questions: [
        {
          question: "Quelles sont les zones desservies ?",
          answer: "Nous desservons actuellement les quartiers principaux de Douala (Akwa, Bonanjo, Bonapriso, Bonamoussadi, Makepe, Ndogbong, Logpom, Kotto) et Yaoundé (Bastos, Centre-ville, Nlongkak, Etoa-Meki, Messa, Omnisport, Mvan, Nsimeyong)."
        },
        {
          question: "Comment suivre mon livreur en temps réel ?",
          answer: "Le jour de votre ramassage ou livraison, vous recevrez une notification et pourrez suivre votre livreur en temps réel sur la carte dans l'application. Vous recevrez également un SMS lorsque le livreur sera à proximité."
        },
        {
          question: "Que faire si je ne suis pas disponible lors du ramassage/livraison ?",
          answer: "Vous pouvez désigner une personne de confiance pour la remise/réception des articles ou reprogrammer votre rendez-vous depuis votre espace client jusqu'à 2 heures avant l'heure prévue."
        }
      ]
    },
    {
      id: 4,
      title: "Compte et Profil",
      questions: [
        {
          question: "Comment créer un compte ?",
          answer: "Cliquez sur 'S'inscrire' sur la page d'accueil, renseignez vos informations personnelles (nom, email, téléphone), créez un mot de passe sécurisé, et validez votre inscription via le code reçu par SMS."
        },
        {
          question: "Comment ajouter une adresse supplémentaire ?",
          answer: "Dans votre profil, accédez à la section 'Mes adresses', cliquez sur 'Ajouter une adresse', complétez les informations et validez. Vous pouvez enregistrer plusieurs adresses (domicile, bureau, etc.)."
        },
        {
          question: "Comment réinitialiser mon mot de passe ?",
          answer: "Sur la page de connexion, cliquez sur 'Mot de passe oublié', entrez votre numéro de téléphone, puis suivez les instructions reçues par SMS pour créer un nouveau mot de passe."
        }
      ]
    }
  ];

  const filteredFAQs = searchQuery 
    ? faqCategories.map(category => ({
        ...category,
        questions: category.questions.filter(q => 
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.questions.length > 0)
    : faqCategories;

  const toggleCategory = (categoryId) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  // Main content of the Aide page that will be wrapped in ClientLayout
  const aideContent = (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-indigo-800 mb-2">Centre d'Aide</h1>
        <p className="text-gray-600">Comment pouvons-nous vous aider aujourd'hui ?</p>
        
        {/* Search bar */}
        <div className="mt-8 max-w-xl mx-auto relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Recherchez dans notre centre d'aide..."
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          </div>
        </div>
      </div>

      {/* Popular topics */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-indigo-800 mb-4">Sujets Populaires</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: <MessageSquare size={20} />, title: "Suivre ma commande", link: "#" },
            { icon: <Phone size={20} />, title: "Contacter un livreur", link: "#" },
            { icon: <HelpCircle size={20} />, title: "Problème de paiement", link: "#" }
          ].map((topic, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md p-4 flex items-center hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px] cursor-pointer border border-gray-100"
            >
              <div className="rounded-full bg-indigo-100 p-3 mr-3 text-indigo-600">
                {topic.icon}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{topic.title}</h3>
              </div>
              <ArrowRight size={16} className="ml-auto text-indigo-500" />
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-indigo-800 mb-4">Questions Fréquentes</h2>
        
        {filteredFAQs.length > 0 ? (
          <div className="space-y-4">
            {filteredFAQs.map((category) => (
              <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full px-6 py-4 text-left font-medium text-gray-800 flex justify-between items-center hover:bg-indigo-50 transition-colors duration-300"
                >
                  <span>{category.title}</span>
                  <ChevronDown 
                    size={20} 
                    className={`text-indigo-600 transition-transform duration-300 ${activeCategory === category.id ? 'transform rotate-180' : ''}`} 
                  />
                </button>
                
                <div 
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    activeCategory === category.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 py-2 divide-y divide-gray-100">
                    {category.questions.map((faq, index) => (
                      <div key={index} className="py-4">
                        <h3 className="font-medium text-gray-900 mb-2">{faq.question}</h3>
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <HelpCircle size={48} className="mx-auto mb-4 text-indigo-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">Aucun résultat trouvé</h3>
            <p className="text-gray-600 mb-4">Essayez d'autres termes ou consultez les catégories ci-dessous</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
            >
              Réinitialiser la recherche
            </button>
          </div>
        )}
      </div>

      {/* Contact options */}
      <div>
        <h2 className="text-xl font-semibold text-indigo-800 mb-4">Besoin d'aide supplémentaire ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-indigo-500 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-indigo-100 p-3 mr-3 text-indigo-600">
                <Phone size={20} />
              </div>
              <h3 className="font-medium text-gray-900">Contacter le service client</h3>
            </div>
            <p className="text-gray-600 mb-4">Notre équipe est disponible pour vous aider du lundi au samedi de 8h à 20h.</p>
            <div className="flex flex-col space-y-2">
              <span className="text-gray-700 font-medium">+237 691 667 137</span>
              <span className="text-gray-700 font-medium">+237 671 465 886</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-indigo-500 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-indigo-100 p-3 mr-3 text-indigo-600">
                <Mail size={20} />
              </div>
              <h3 className="font-medium text-gray-900">Envoyer un message</h3>
            </div>
            <p className="text-gray-600 mb-4">Envoyez-nous un email et nous vous répondrons dans les 24 heures.</p>
            <a 
              href="mailto:Contourwash@gmail.com" 
              className="inline-flex items-center font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Contourwash@gmail.com
              <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  // Render the content inside the ClientLayout
  return (
    <ClientLayout>
      {aideContent}
    </ClientLayout>
  );
};

export default Aide;