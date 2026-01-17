/**
 * Geological-based language and currency detection system
 * Detects user's location and provides appropriate language/currency settings
 */

export interface GeoLocation {
  country: string;
  countryCode: string;
  region: string;
  city: string;
  timezone: string;
  currency: string;
  currencySymbol: string;
  language: string;
  languageCode: string;
}

export interface CurrencyRates {
  [key: string]: number; // currency code: rate to base currency (USD)
}

// Language mappings based on country codes
export const LANGUAGE_MAPPINGS: Record<string, {
  language: string;
  languageCode: string;
  rtl?: boolean;
}> = {
  'US': { language: 'English', languageCode: 'en-US' },
  'GB': { language: 'English', languageCode: 'en-GB' },
  'CA': { language: 'English', languageCode: 'en-CA' },
  'AU': { language: 'English', languageCode: 'en-AU' },
  'TR': { language: 'Türkçe', languageCode: 'tr-TR' },
  'DE': { language: 'Deutsch', languageCode: 'de-DE' },
  'FR': { language: 'Français', languageCode: 'fr-FR' },
  'ES': { language: 'Español', languageCode: 'es-ES' },
  'IT': { language: 'Italiano', languageCode: 'it-IT' },
  'NL': { language: 'Nederlands', languageCode: 'nl-NL' },
  'RU': { language: 'Русский', languageCode: 'ru-RU' },
  'SA': { language: 'العربية', languageCode: 'ar-SA', rtl: true },
  'AE': { language: 'العربية', languageCode: 'ar-AE', rtl: true },
  'KW': { language: 'العربية', languageCode: 'ar-KW', rtl: true },
  'QA': { language: 'العربية', languageCode: 'ar-QA', rtl: true },
  'CN': { language: '中文', languageCode: 'zh-CN' },
  'JP': { language: '日本語', languageCode: 'ja-JP' },
  'KR': { language: '한국어', languageCode: 'ko-KR' },
  'IN': { language: 'हिन्दी', languageCode: 'hi-IN' },
  'PK': { language: 'اردو', languageCode: 'ur-PK', rtl: true },
  'BR': { language: 'Português', languageCode: 'pt-BR' },
  'MX': { language: 'Español', languageCode: 'es-MX' },
  'ZA': { language: 'English', languageCode: 'en-ZA' },
  'EG': { language: 'العربية', languageCode: 'ar-EG', rtl: true },
  'TH': { language: 'ไทย', languageCode: 'th-TH' },
  'VN': { language: 'Tiếng Việt', languageCode: 'vi-VN' },
  'ID': { language: 'Bahasa Indonesia', languageCode: 'id-ID' },
  'MY': { language: 'Bahasa Melayu', languageCode: 'ms-MY' },
  'SG': { language: 'English', languageCode: 'en-SG' },
};

// Currency mappings based on country codes
export const CURRENCY_MAPPINGS: Record<string, {
  currency: string;
  currencySymbol: string;
  currencyCode: string;
  decimalPlaces: number;
}> = {
  'US': { currency: 'US Dollar', currencySymbol: '$', currencyCode: 'USD', decimalPlaces: 2 },
  'GB': { currency: 'British Pound', currencySymbol: '£', currencyCode: 'GBP', decimalPlaces: 2 },
  'CA': { currency: 'Canadian Dollar', currencySymbol: 'C$', currencyCode: 'CAD', decimalPlaces: 2 },
  'AU': { currency: 'Australian Dollar', currencySymbol: 'A$', currencyCode: 'AUD', decimalPlaces: 2 },
  'TR': { currency: 'Turkish Lira', currencySymbol: '₺', currencyCode: 'TRY', decimalPlaces: 2 },
  'DE': { currency: 'Euro', currencySymbol: '€', currencyCode: 'EUR', decimalPlaces: 2 },
  'FR': { currency: 'Euro', currencySymbol: '€', currencyCode: 'EUR', decimalPlaces: 2 },
  'ES': { currency: 'Euro', currencySymbol: '€', currencyCode: 'EUR', decimalPlaces: 2 },
  'IT': { currency: 'Euro', currencySymbol: '€', currencyCode: 'EUR', decimalPlaces: 2 },
  'NL': { currency: 'Euro', currencySymbol: '€', currencyCode: 'EUR', decimalPlaces: 2 },
  'RU': { currency: 'Russian Ruble', currencySymbol: '₽', currencyCode: 'RUB', decimalPlaces: 2 },
  'SA': { currency: 'Saudi Riyal', currencySymbol: '﷼', currencyCode: 'SAR', decimalPlaces: 2 },
  'AE': { currency: 'UAE Dirham', currencySymbol: 'د.إ', currencyCode: 'AED', decimalPlaces: 2 },
  'KW': { currency: 'Kuwaiti Dinar', currencySymbol: 'د.ك', currencyCode: 'KWD', decimalPlaces: 3 },
  'QA': { currency: 'Qatari Riyal', currencySymbol: '﷼', currencyCode: 'QAR', decimalPlaces: 2 },
  'CN': { currency: 'Chinese Yuan', currencySymbol: '¥', currencyCode: 'CNY', decimalPlaces: 2 },
  'JP': { currency: 'Japanese Yen', currencySymbol: '¥', currencyCode: 'JPY', decimalPlaces: 0 },
  'KR': { currency: 'South Korean Won', currencySymbol: '₩', currencyCode: 'KRW', decimalPlaces: 0 },
  'IN': { currency: 'Indian Rupee', currencySymbol: '₹', currencyCode: 'INR', decimalPlaces: 2 },
  'PK': { currency: 'Pakistani Rupee', currencySymbol: '₨', currencyCode: 'PKR', decimalPlaces: 2 },
  'BR': { currency: 'Brazilian Real', currencySymbol: 'R$', currencyCode: 'BRL', decimalPlaces: 2 },
  'MX': { currency: 'Mexican Peso', currencySymbol: '$', currencyCode: 'MXN', decimalPlaces: 2 },
  'ZA': { currency: 'South African Rand', currencySymbol: 'R', currencyCode: 'ZAR', decimalPlaces: 2 },
  'EG': { currency: 'Egyptian Pound', currencySymbol: '£', currencyCode: 'EGP', decimalPlaces: 2 },
  'TH': { currency: 'Thai Baht', currencySymbol: '฿', currencyCode: 'THB', decimalPlaces: 2 },
  'VN': { currency: 'Vietnamese Dong', currencySymbol: '₫', currencyCode: 'VND', decimalPlaces: 0 },
  'ID': { currency: 'Indonesian Rupiah', currencySymbol: 'Rp', currencyCode: 'IDR', decimalPlaces: 0 },
  'MY': { currency: 'Malaysian Ringgit', currencySymbol: 'RM', currencyCode: 'MYR', decimalPlaces: 2 },
  'SG': { currency: 'Singapore Dollar', currencySymbol: 'S$', currencyCode: 'SGD', decimalPlaces: 2 },
};

/**
 * Detect user's geolocation using IP-based geolocation API
 */
export async function detectUserLocation(): Promise<GeoLocation | null> {
  try {
    // Using a free geolocation API (you can replace with your preferred service)
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.reason);
    }

    const countryCode = data.country_code;
    const language = LANGUAGE_MAPPINGS[countryCode] || LANGUAGE_MAPPINGS['US'];
    const currency = CURRENCY_MAPPINGS[countryCode] || CURRENCY_MAPPINGS['US'];

    return {
      country: data.country_name,
      countryCode: countryCode,
      region: data.region,
      city: data.city,
      timezone: data.timezone,
      currency: currency.currency,
      currencySymbol: currency.currencySymbol,
      currencyCode: currency.currencyCode,
      language: language.language,
      languageCode: language.languageCode,
    };
  } catch (error) {
    console.error('Error detecting user location:', error);
    // Return default US settings if detection fails
    return {
      country: 'United States',
      countryCode: 'US',
      region: 'Unknown',
      city: 'Unknown',
      timezone: 'America/New_York',
      currency: 'US Dollar',
      currencySymbol: '$',
      currencyCode: 'USD',
      language: 'English',
      languageCode: 'en-US',
    };
  }
}

/**
 * Get currency conversion rates (you'll need to integrate with a currency API)
 */
export async function getCurrencyRates(baseCurrency: string = 'USD'): Promise<CurrencyRates> {
  try {
    // Example using a free currency API (replace with your preferred service)
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
    const data = await response.json();
    
    return data.rates || {};
  } catch (error) {
    console.error('Error fetching currency rates:', error);
    // Return default rates if API fails
    return {
      'USD': 1,
      'EUR': 0.85,
      'GBP': 0.73,
      'TRY': 19.5,
      'AED': 3.67,
      'SAR': 3.75,
      'KWD': 0.31,
      'QAR': 3.64,
      'CNY': 7.25,
      'JPY': 149.5,
      'KRW': 1330,
      'INR': 83.2,
      'PKR': 280,
      'BRL': 4.95,
      'MXN': 17.1,
      'ZAR': 18.7,
      'EGP': 30.9,
      'THB': 35.5,
      'VND': 24500,
      'IDR': 15600,
      'MYR': 4.65,
      'SGD': 1.35,
    };
  }
}

/**
 * Convert amount from one currency to another
 */
export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  rates: CurrencyRates
): number {
  if (fromCurrency === toCurrency) {
    return amount;
  }

  // Convert to base currency (USD) first, then to target currency
  const fromRate = rates[fromCurrency] || 1;
  const toRate = rates[toCurrency] || 1;
  
  return (amount / fromRate) * toRate;
}

/**
 * Format currency amount with proper symbol and decimal places
 */
export function formatCurrency(
  amount: number,
  currencyCode: string,
  currencySymbol: string,
  decimalPlaces: number = 2
): string {
  return `${currencySymbol}${amount.toFixed(decimalPlaces)} ${currencyCode}`;
}

/**
 * Get user's preferred language from browser
 */
export function getBrowserLanguage(): string {
  if (typeof window !== 'undefined') {
    return navigator.language || 'en-US';
  }
  return 'en-US';
}

/**
 * Get user's timezone
 */
export function getUserTimezone(): string {
  if (typeof window !== 'undefined') {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  return 'UTC';
}