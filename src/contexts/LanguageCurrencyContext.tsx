/**
 * Simplified Language and Currency Context for Packers and Movers
 * Provides basic language and currency management without geolocation
 */

"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageCurrencyContextType {
  // Language settings
  currentLanguage: string;
  languageCode: string;
  isRTL: boolean;
  
  // Currency settings
  currentCurrency: string;
  currencySymbol: string;
  currencyCode: string;
  
  // Actions
  setUserLanguage: (languageCode: string) => void;
  setUserCurrency: (currencyCode: string) => void;
  formatPrice: (amount: number) => string;
}

const LanguageCurrencyContext = createContext<LanguageCurrencyContextType | undefined>(undefined);

interface LanguageCurrencyProviderProps {
  children: ReactNode;
}

export function LanguageCurrencyProvider({ children }: LanguageCurrencyProviderProps) {
  // Language state - default to English
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [languageCode, setLanguageCode] = useState('en-US');
  const [isRTL, setIsRTL] = useState(false);
  
  // Currency state - default to USD
  const [currentCurrency, setCurrentCurrency] = useState('US Dollar');
  const [currencySymbol, setCurrencySymbol] = useState('$');
  const [currencyCode, setCurrencyCode] = useState('USD');

  // Load saved preferences from localStorage
  useEffect(() => {
    loadSavedPreferences();
  }, []);

  // Save preferences to localStorage when they change
  useEffect(() => {
    savePreferences();
  }, [languageCode, currencyCode]);

  // Update HTML attributes for RTL languages
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', languageCode);
      document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    }
  }, [languageCode, isRTL]);

  const loadSavedPreferences = () => {
    if (typeof window !== 'undefined') {
      try {
        const savedLanguage = localStorage.getItem('user-language');
        const savedCurrency = localStorage.getItem('user-currency');
        
        if (savedLanguage) {
          setLanguageCode(savedLanguage);
          setCurrentLanguage(getLanguageName(savedLanguage));
          setIsRTL(isRTLLanguage(savedLanguage));
        }
        
        if (savedCurrency) {
          setCurrencyCode(savedCurrency);
          setCurrentCurrency(getCurrencyName(savedCurrency));
          setCurrencySymbol(getCurrencySymbolForCode(savedCurrency));
        }
      } catch (err) {
        console.error('Error loading saved preferences:', err);
      }
    }
  };

  const savePreferences = () => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('user-language', languageCode);
        localStorage.setItem('user-currency', currencyCode);
      } catch (err) {
        console.error('Error saving preferences:', err);
      }
    }
  };

  const setUserLanguage = (newLanguageCode: string) => {
    setLanguageCode(newLanguageCode);
    setCurrentLanguage(getLanguageName(newLanguageCode));
    setIsRTL(isRTLLanguage(newLanguageCode));
  };

  const setUserCurrency = (newCurrencyCode: string) => {
    setCurrencyCode(newCurrencyCode);
    setCurrentCurrency(getCurrencyName(newCurrencyCode));
    setCurrencySymbol(getCurrencySymbolForCode(newCurrencyCode));
  };

  const formatPrice = (amount: number): string => {
    return `${currencySymbol}${amount.toFixed(2)}`;
  };

  // Helper functions
  const getLanguageName = (code: string): string => {
    const languageNames: Record<string, string> = {
      'en-US': 'English (US)',
      'en-GB': 'English (UK)',
      'es-ES': 'Español',
      'fr-FR': 'Français',
      'de-DE': 'Deutsch',
      'ar-SA': 'العربية',
    };
    return languageNames[code] || 'English';
  };

  const getCurrencyName = (code: string): string => {
    const currencyNames: Record<string, string> = {
      'USD': 'US Dollar',
      'EUR': 'Euro',
      'GBP': 'British Pound',
      'CAD': 'Canadian Dollar',
      'AUD': 'Australian Dollar',
    };
    return currencyNames[code] || 'US Dollar';
  };

  const getCurrencySymbolForCode = (code: string): string => {
    const currencySymbols: Record<string, string> = {
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'CAD': 'C$',
      'AUD': 'A$',
    };
    return currencySymbols[code] || '$';
  };

  const isRTLLanguage = (code: string): boolean => {
    const rtlLanguages = ['ar-SA', 'ar-AE', 'ar-EG', 'ur-PK'];
    return rtlLanguages.includes(code);
  };

  const value: LanguageCurrencyContextType = {
    currentLanguage,
    languageCode,
    isRTL,
    currentCurrency,
    currencySymbol,
    currencyCode,
    setUserLanguage,
    setUserCurrency,
    formatPrice,
  };

  return (
    <LanguageCurrencyContext.Provider value={value}>
      {children}
    </LanguageCurrencyContext.Provider>
  );
}

export function useLanguageCurrency() {
  const context = useContext(LanguageCurrencyContext);
  if (context === undefined) {
    throw new Error('useLanguageCurrency must be used within a LanguageCurrencyProvider');
  }
  return context;
}
