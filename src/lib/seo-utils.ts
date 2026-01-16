import { Market } from '@/types';

/**
 * Generate hreflang tags for international SEO
 * Supports both readonly arrays and regular arrays
 */
export function generateHreflangTags(
  markets: readonly Market[] | Market[],
  baseUrl: string,
  path: string
): Array<{ hreflang: string; href: string }> {
  return markets.map(market => ({
    hreflang: market === 'uk' ? 'en-gb' : 
              market === 'us' ? 'en-us' :
              market === 'canada' ? 'en-ca' :
              market === 'europe' ? 'en-eu' :
              'en-au', // australia
    href: `${baseUrl}/${market}${path}`
  }));
}

/**
 * Common market configurations for different regions
 */
export const validLocations = ['uk', 'us', 'canada', 'europe', 'australia'] as const;
export const europeanMarkets = ['uk', 'europe'] as const;
export const northAmericanMarkets = ['us', 'canada'] as const;

/**
 * Type guard to check if a string is a valid Market
 */
export function isValidMarket(market: string): market is Market {
  return validLocations.includes(market as Market);
}

/**
 * Convert a readonly array to a mutable array if needed
 */
export function toMutableArray<T>(readonlyArray: readonly T[]): T[] {
  return [...readonlyArray];
}