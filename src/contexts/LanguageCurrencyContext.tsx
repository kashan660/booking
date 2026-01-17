/**
 * Language and Currency Context for managing user preferences
 * Provides geological-based language and currency detection
 */

"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  GeoLocation, 
  CurrencyRates, 
  detectUserLocation, 
  getCurrencyRates, 
  convertCurrency, 
  formatCurrency 
} from '@/lib/geolocation';

interface LanguageCurrencyContextType {
  // Location and preferences
  userLocation: GeoLocation | null;
  isLoading: boolean;
  error: string | null;
  
  // Language settings
  currentLanguage: string;
  languageCode: string;
  isRTL: boolean;
  
  // Currency settings
  currentCurrency: string;
  currencySymbol: string;
  currencyCode: string;
  currencyRates: CurrencyRates;
  
  // Actions
  setUserLanguage: (languageCode: string) => void;
  setUserCurrency: (currencyCode: string) => void;
  convertAndFormatPrice: (amount: number, fromCurrency?: string) => string;
  convertPrice: (amount: number, fromCurrency?: string) => number;
  refreshLocation: () => Promise<void>;
  refreshCurrencyRates: () => Promise<void>;
}

const LanguageCurrencyContext = createContext<LanguageCurrencyContextType | undefined>(undefined);

interface LanguageCurrencyProviderProps {
  children: ReactNode;
  defaultLocation?: GeoLocation;
}

export function LanguageCurrencyProvider({ children, defaultLocation }: LanguageCurrencyProviderProps) {
  const [userLocation, setUserLocation] = useState<GeoLocation | null>(defaultLocation || null);
  const [isLoading, setIsLoading] = useState(!defaultLocation);
  const [error, setError] = useState<string | null>(null);
  
  // Language state
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [languageCode, setLanguageCode] = useState('en-US');
  const [isRTL, setIsRTL] = useState(false);
  
  // Currency state
  const [currentCurrency, setCurrentCurrency] = useState('US Dollar');
  const [currencySymbol, setCurrencySymbol] = useState('$');
  const [currencyCode, setCurrencyCode] = useState('USD');
  const [currencyRates, setCurrencyRates] = useState<CurrencyRates>({});

  // Initialize location and preferences
  useEffect(() => {
    initializeLocation();
  }, []);

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

  const initializeLocation = async () => {
    if (defaultLocation) {
      setUserLocation(defaultLocation);
      updatePreferencesFromLocation(defaultLocation);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const location = await detectUserLocation();
      if (location) {
        setUserLocation(location);
        updatePreferencesFromLocation(location);
      }
    } catch (err) {
      setError('Failed to detect location');
      console.error('Location detection error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSavedPreferences = () => {
    if (typeof window !== 'undefined') {
      try {
        const savedLanguage = localStorage.getItem('user-language');
        const savedCurrency = localStorage.getItem('user-currency');
        
        if (savedLanguage) {
          setLanguageCode(savedLanguage);
          // You might want to map language code to full language name
          setCurrentLanguage(getLanguageName(savedLanguage));
          setIsRTL(isRTLLanguage(savedLanguage));
        }
        
        if (savedCurrency) {
          setCurrencyCode(savedCurrency);
          // You might want to map currency code to full currency name
          setCurrentCurrency(getCurrencyName(savedCurrency));
          setCurrencySymbol(getCurrencySymbol(savedCurrency));
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

  const updatePreferencesFromLocation = (location: GeoLocation) => {
    setCurrentLanguage(location.language);
    setLanguageCode(location.languageCode);
    setIsRTL(isRTLLanguage(location.languageCode));
    
    setCurrentCurrency(location.currency);
    setCurrencySymbol(location.currencySymbol);
    setCurrencyCode(location.currencyCode);
  };

  const setUserLanguage = (newLanguageCode: string) => {
    setLanguageCode(newLanguageCode);
    setCurrentLanguage(getLanguageName(newLanguageCode));
    setIsRTL(isRTLLanguage(newLanguageCode));
  };

  const setUserCurrency = (newCurrencyCode: string) => {
    setCurrencyCode(newCurrencyCode);
    setCurrentCurrency(getCurrencyName(newCurrencyCode));
    setCurrencySymbol(getCurrencySymbol(newCurrencyCode));
  };

  const convertAndFormatPrice = (amount: number, fromCurrency: string = 'USD'): string => {
    const convertedAmount = convertPrice(amount, fromCurrency);
    return formatCurrency(convertedAmount, currencyCode, currencySymbol);
  };

  const convertPrice = (amount: number, fromCurrency: string = 'USD'): number => {
    if (fromCurrency === currencyCode) {
      return amount;
    }
    
    return convertCurrency(amount, fromCurrency, currencyCode, currencyRates);
  };

  const refreshLocation = async () => {
    await initializeLocation();
  };

  const refreshCurrencyRates = async () => {
    try {
      const rates = await getCurrencyRates();
      setCurrencyRates(rates);
    } catch (err) {
      console.error('Error refreshing currency rates:', err);
    }
  };

  // Helper functions
  const getLanguageName = (code: string): string => {
    // Map language codes to names
    const languageNames: Record<string, string> = {
      'en-US': 'English (US)',
      'en-GB': 'English (UK)',
      'en-CA': 'English (Canada)',
      'en-AU': 'English (Australia)',
      'tr-TR': 'Türkçe',
      'de-DE': 'Deutsch',
      'fr-FR': 'Français',
      'es-ES': 'Español',
      'it-IT': 'Italiano',
      'nl-NL': 'Nederlands',
      'ru-RU': 'Русский',
      'ar-SA': 'العربية',
      'ar-AE': 'العربية',
      'ar-KW': 'العربية',
      'ar-QA': 'العربية',
      'zh-CN': '中文',
      'ja-JP': '日本語',
      'ko-KR': '한국어',
      'hi-IN': 'हिन्दी',
      'ur-PK': 'اردو',
      'pt-BR': 'Português',
      'es-MX': 'Español',
      'en-ZA': 'English',
      'ar-EG': 'العربية',
      'th-TH': 'ไทย',
      'vi-VN': 'Tiếng Việt',
      'id-ID': 'Bahasa Indonesia',
      'ms-MY': 'Bahasa Melayu',
      'en-SG': 'English',
    };
    
    return languageNames[code] || 'English';
  };

  const getCurrencyName = (code: string): string => {
    const currencyNames: Record<string, string> = {
      'USD': 'US Dollar',
      'EUR': 'Euro',
      'GBP': 'British Pound',
      'TRY': 'Turkish Lira',
      'AED': 'UAE Dirham',
      'SAR': 'Saudi Riyal',
      'KWD': 'Kuwaiti Dinar',
      'QAR': 'Qatari Riyal',
      'CNY': 'Chinese Yuan',
      'JPY': 'Japanese Yen',
      'KRW': 'South Korean Won',
      'INR': 'Indian Rupee',
      'PKR': 'Pakistani Rupee',
      'BRL': 'Brazilian Real',
      'MXN': 'Mexican Peso',
      'ZAR': 'South African Rand',
      'EGP': 'Egyptian Pound',
      'THB': 'Thai Baht',
      'VND': 'Vietnamese Dong',
      'IDR': 'Indonesian Rupiah',
      'MYR': 'Malaysian Ringgit',
      'SGD': 'Singapore Dollar',
      'CAD': 'Canadian Dollar',
      'AUD': 'Australian Dollar',
    };
    
    return currencyNames[code] || 'US Dollar';
  };

  const getCurrencySymbol = (code: string): string => {
    const currencySymbols: Record<string, string> = {
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'TRY': '₺',
      'AED': 'د.إ',
      'SAR': '﷼',
      'KWD': 'د.ك',
      'QAR': '﷼',
      'CNY': '¥',
      'JPY': '¥',
      'KRW': '₩',
      'INR': '₹',
      'PKR': '₨',
      'BRL': 'R$',
      'MXN': '$',
      'ZAR': 'R',
      'EGP': '£',
      'THB': '฿',
      'VND': '₫',
      'IDR': 'Rp',
      'MYR': 'RM',
      'SGD': 'S$',
      'CAD': 'C$',
      'AUD': 'A$',
    };
    
    return currencySymbols[code] || '$';
  };

  const isRTLLanguage = (code: string): boolean => {
    const rtlLanguages = ['ar-SA', 'ar-AE', 'ar-KW', 'ar-QA', 'ar-EG', 'ur-PK'];
    return rtlLanguages.includes(code);
  };

  const value: LanguageCurrencyContextType = {
    userLocation,
    isLoading,
    error,
    currentLanguage,
    languageCode,
    isRTL,
    currentCurrency,
    currencySymbol,
    currencyCode,
    currencyRates,
    setUserLanguage,
    setUserCurrency,
    convertAndFormatPrice,
    convertPrice,
    refreshLocation,
    refreshCurrencyRates,
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