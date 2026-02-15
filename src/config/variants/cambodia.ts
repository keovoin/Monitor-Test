/**
 * Cambodia Variant Configuration
 * Provides Cambodia-specific defaults and settings
 */

import {
  CAMBODIA_MAP_VIEW,
  CAMBODIA_FOCUSED_FEEDS,
  CAMBODIA_PANELS,
  CAMBODIA_THEME,
  isCambodiaRelevant,
  isInCambodiaRegion,
} from '../cambodia-config';

export const VARIANT_CONFIG = {
  name: 'cambodia',
  displayName: 'Cambodia Monitor',
  description: 'Real-time monitoring for Cambodia and regional developments',
  
  // Map configuration
  map: {
    defaultView: CAMBODIA_MAP_VIEW,
    restrictToBounds: false, // Allow panning to see regional context
    
    // Default layers for Cambodia monitoring
    defaultLayers: [
      'conflicts',      // Regional conflicts
      'protests',       // Social unrest
      'bases',          // Military installations (especially Ream)
      'infrastructure', // Ports, airports, borders
      'cables',         // Undersea cables (Sihanoukville)
      'earthquakes',    // Natural disasters
      'fires',          // Forest fires, land clearing
    ],
  },
  
  // News feed configuration
  feeds: {
    sources: CAMBODIA_FOCUSED_FEEDS,
    filterFunction: isCambodiaRelevant,
    
    // Prioritize Cambodia sources
    prioritySources: [
      'Phnom Penh Post',
      'Khmer Times',
      'VOA Cambodia',
    ],
  },
  
  // Panel visibility
  panels: CAMBODIA_PANELS,
  
  // Theme
  theme: CAMBODIA_THEME,
  
  // Data filtering
  filters: {
    geographicFilter: isInCambodiaRegion,
    contentFilter: isCambodiaRelevant,
    
    // Show events within Cambodia region
    showGlobalEvents: true, // Keep global events that mention Cambodia
    showRegionalEvents: true,
    showLocalEvents: true,
  },
  
  // Alert configuration
  alerts: {
    enableBorderAlerts: true,
    enableEconomicAlerts: true,
    enableSecurityAlerts: true,
    enableWeatherAlerts: true,
    
    // Custom alert keywords for Cambodia
    customKeywords: [
      'Hun Manet',
      'Ream base',
      'Sihanoukville',
      'Preah Vihear',
      'Mekong',
      'ASEAN summit',
    ],
  },
  
  // Regional context countries
  contextCountries: [
    'Thailand',
    'Vietnam',
    'Laos',
    'China',
    'Singapore',
  ],
  
  // Feature flags
  features: {
    showCryptoMarkets: false,
    showGlobalConflicts: false,
    showNATOTracker: false,
    showMiddleEast: false,
    showBorderMonitor: true,
    showMekongMonitor: true,
    showASEANNews: true,
    showEconomicCorridors: true,
  },
};

export default VARIANT_CONFIG;
