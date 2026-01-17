"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, DollarSign, ChevronDown, MapPin, RefreshCw } from 'lucide-react';
import { useLanguageCurrency } from '@/contexts/LanguageCurrencyContext';

interface LanguageOption {
  code: string;
  name: string;
  flag: string;
  rtl?: boolean;
}

interface CurrencyOption {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
  { code: 'tr-TR', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'ar-SA', name: 'العربية', flag: '🇸🇦', rtl: true },
];

const CURRENCY_OPTIONS: CurrencyOption[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', flag: '🇸🇦' },
];

interface LanguageCurrencySelectorProps {
  variant?: 'dropdown' | 'card';
  showLocation?: boolean;
  className?: string;
}

export function LanguageCurrencySelector({ 
  variant = 'dropdown', 
  showLocation = true,
  className = ''
}: LanguageCurrencySelectorProps) {
  const {
    userLocation,
    currentLanguage,
    languageCode,
    currentCurrency,
    currencyCode,
    isLoading,
    error,
    setUserLanguage,
    setUserCurrency,
    refreshLocation,
  } = useLanguageCurrency();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  const handleRefreshLocation = async () => {
    setIsRefreshing(true);
    await refreshLocation();
    setIsRefreshing(false);
  };

  const currentLanguageOption = LANGUAGE_OPTIONS.find(lang => lang.code === languageCode) || LANGUAGE_OPTIONS[0];
  const currentCurrencyOption = CURRENCY_OPTIONS.find(curr => curr.code === currencyCode) || CURRENCY_OPTIONS[0];

  if (variant === 'card') {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Regional Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {showLocation && userLocation && (
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{userLocation.city}, {userLocation.country}</p>
                  <p className="text-xs text-muted-foreground">Auto-detected location</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefreshLocation}
                disabled={isRefreshing}
                className="h-8"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          )}

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium mb-1 block">Language</label>
              <div className="relative">
                <button
                  onClick={() => setLanguageOpen(!languageOpen)}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="flex items-center gap-2">
                    <span>{currentLanguageOption.flag}</span>
                    <span className={currentLanguageOption.rtl ? 'text-right' : ''}>{currentLanguageOption.name}</span>
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {languageOpen && (
                  <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md">
                    {LANGUAGE_OPTIONS.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setUserLanguage(lang.code);
                          setLanguageOpen(false);
                        }}
                        className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <span className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span className={lang.rtl ? 'text-right' : ''}>{lang.name}</span>
                        </span>
                        {languageCode === lang.code && (
                          <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center text-primary">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Currency</label>
              <div className="relative">
                <button
                  onClick={() => setCurrencyOpen(!currencyOpen)}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="flex items-center gap-2">
                    <span>{currentCurrencyOption.flag}</span>
                    <span>{currentCurrencyOption.code} - {currentCurrencyOption.name}</span>
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {currencyOpen && (
                  <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md">
                    {CURRENCY_OPTIONS.map((curr) => (
                      <button
                        key={curr.code}
                        onClick={() => {
                          setUserCurrency(curr.code);
                          setCurrencyOpen(false);
                        }}
                        className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <span className="flex items-center gap-2">
                          <span>{curr.flag}</span>
                          <span>{curr.code} - {curr.name}</span>
                        </span>
                        {currencyCode === curr.code && (
                          <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center text-primary">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-2 rounded">
              {error}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <button
          onClick={() => setLanguageOpen(!languageOpen)}
          className="flex h-10 items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Globe className="h-4 w-4" />
          <span>{currentLanguageOption.flag}</span>
          <span className="hidden sm:inline">{currentLanguage}</span>
          <ChevronDown className="h-4 w-4" />
        </button>
        {languageOpen && (
          <div className="absolute top-full left-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md">
            {LANGUAGE_OPTIONS.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setUserLanguage(lang.code);
                  setLanguageOpen(false);
                }}
                className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <span className="flex items-center gap-2">
                  <span>{lang.flag}</span>
                  <span className={lang.rtl ? 'text-right' : ''}>{lang.name}</span>
                </span>
                {languageCode === lang.code && (
                  <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center text-primary">✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative">
        <button
          onClick={() => setCurrencyOpen(!currencyOpen)}
          className="flex h-10 items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <DollarSign className="h-4 w-4" />
          <span>{currentCurrencyOption.symbol}</span>
          <span className="hidden sm:inline">{currentCurrency}</span>
          <ChevronDown className="h-4 w-4" />
        </button>
        {currencyOpen && (
          <div className="absolute top-full left-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md">
            {CURRENCY_OPTIONS.map((curr) => (
              <button
                key={curr.code}
                onClick={() => {
                  setUserCurrency(curr.code);
                  setCurrencyOpen(false);
                }}
                className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <span className="flex items-center gap-2">
                  <span>{curr.flag}</span>
                  <span>{curr.code} - {curr.name}</span>
                </span>
                {currencyCode === curr.code && (
                  <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center text-primary">✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}