import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium">{t('common:language')}:</span>
      <div className="flex space-x-1">
        <button
          onClick={() => changeLanguage('fr')}
          className={`px-2 py-1 text-sm rounded ${
            i18n.language === 'fr' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          FR
        </button>
        <button
          onClick={() => changeLanguage('en')}
          className={`px-2 py-1 text-sm rounded ${
            i18n.language === 'en' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          EN
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;