import React from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';


const Tarifs = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto">
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 flex justify-between items-center p-4 border-b bg-white z-10">
          <h2 className="text-2xl font-bold text-blue-700">
            Contour<span className="text-teal-500">Wash</span> - Nos Tarifs
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Service Pressing Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-blue-600 mb-4">Service Pressing</h3>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold text-lg mb-2">Vêtements pour hommes</h4>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Chemises (Classiques, habillées)</span>
                  <span className="font-medium">1200 FCFA</span>
                </li>
                <li className="flex justify-between">
                  <span>Pantalons (Costumes, chinos, jeans)</span>
                  <span className="font-medium">1500 FCFA</span>
                </li>
                <li className="flex justify-between">
                  <span>Vestes (Blazers, vestons, manteaux)</span>
                  <span className="font-medium">1300 - 1900 FCFA</span>
                </li>
                <li className="flex justify-between">
                  <span>Costumes entiers (veste et pantalon)</span>
                  <span className="font-medium">4800 FCFA</span>
                </li>
                <li className="flex justify-between">
                  <span>Gilets (En laine, en coton)</span>
                  <span className="font-medium">1300 FCFA</span>
                </li>
                <li className="flex justify-between">
                  <span>Pulls (En cachemire, en laine, en maille)</span>
                  <span className="font-medium">1600 - 2300 FCFA</span>
                </li>
                <li className="flex justify-between">
                  <span>Manteaux (En laine, en cuir, en tissu technique)</span>
                  <span className="font-medium">1700 - 2400 FCFA</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-teal-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold text-lg mb-2">Vêtements pour femmes</h4>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Robes (Cocktail, soirée, de ville)</span>
                  <span className="font-medium">2200 - 5200 FCFA</span>
                </li>
                <li className="flex justify-between">
                  <span>Jupes (Courtes, longues, plissées)</span>
                  <span className="font-medium">1700 - 2300 FCFA</span>
                </li>
                <li className="flex justify-between">
                  <span>Pantalons (Costumes, tailleurs, jeans)</span>
                  <span className="font-medium">1100 FCFA</span>
                </li>
                <li className="flex justify-between">
                  <span>Blouses (En soie, en coton, en dentelle)</span>
                  <span className="font-medium">1500 - 2300 FCFA</span>
                </li>
                <li className="flex justify-between">
                  <span>Vestes (Blazers, vestons, manteaux)</span>
                  <span className="font-medium">1200 - 1800 FCFA</span>
                </li>
                <li className="flex justify-between">
                  <span>Manteaux (En fourrure, en laine, en cuir)</span>
                  <span className="font-medium">1700 - 2400 FCFA</span>
                </li>
                <li className="flex justify-between">
                  <span>Robes de mariée</span>
                  <span className="font-medium">Tarif spécial</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold text-lg mb-2">Autres vêtements</h4>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Vêtements de sport (Maillots, survêtements)</span>
                  <span className="font-medium">1600 - 3300 FCFA</span>
                </li>
                <li className="flex justify-between">
                  <span>Linge de maison (Draps, housses de couette, serviettes)</span>
                  <span className="font-medium">1800 - 4600 FCFA</span>
                </li>
                <li className="flex justify-between">
                  <span>Articles en cuir (Sacs à main)</span>
                  <span className="font-medium">3100 FCFA</span>
                </li>
                <li className="flex justify-between">
                  <span>Fourrures</span>
                  <span className="font-medium">5200 FCFA</span>
                </li>
                <li className="flex justify-between">
                  <span>Vêtements de travail</span>
                  <span className="font-medium">4800 FCFA</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Service Blanchisserie Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-blue-600 mb-4">Service Blanchisserie</h3>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-medium text-center text-lg">
                Tarif standard: <span className="text-blue-700 font-bold">1700 FCFA/Kg</span>
              </p>
              <p className="text-center text-gray-600 mt-2">
                Incluant draps, linges de maison, vêtements du quotidien et linge de bébé
              </p>
            </div>
          </div>
          
          {/* Service Entretien de Chaussures Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-blue-600 mb-4">Service Entretien de Chaussures</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Nettoyage complet standard</span>
                  <span className="font-medium">2500 FCFA</span>
                </li>
                <li className="flex justify-between">
                  <span>Traitement du cuir</span>
                  <span className="font-medium">3000 FCFA</span>
                </li>
                <li className="flex justify-between">
                  <span>Réparations mineures</span>
                  <span className="font-medium">1500 - 3000 FCFA</span>
                </li>
                <li className="flex justify-between">
                  <span>Polissage professionnel</span>
                  <span className="font-medium">2000 FCFA</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Critères de différenciation */}
          <div>
            <h3 className="text-xl font-bold text-blue-600 mb-4">Critères de différenciation pour la tarification</h3>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">➢</span>
                  <span>Taille et poids du vêtement: Les pièces volumineuses (manteau long, robe de soirée) nécessitent généralement plus de travail et de produits.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">➢</span>
                  <span>Type de tissu: La soie, le cuir, le cachemire ou les tissus techniques demandent des traitements spécifiques et plus délicats.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">➢</span>
                  <span>Nombre de pièces: Un costume (veste + pantalon) sera facturé différemment d'une chemise seule.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">➢</span>
                  <span>Degré de salissure: Les taches complexes ou les vêtements très sales peuvent nécessiter un traitement supplémentaire.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">➢</span>
                  <span>Finitions particulières: Les broderies, les paillettes ou les ornements délicats demandent une attention particulière.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">➢</span>
                  <span>Urgence de la commande: Un service express peut entraîner un surcoût.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Modal Footer */}
        <div className="sticky bottom-0 border-t p-4 bg-white flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tarifs;