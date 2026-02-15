/**
 * Cambodia-Focused Configuration
 * Customizes the World Monitor to focus on Cambodia with relevant Asian context
 */

// Default map view centered on Cambodia
export const CAMBODIA_MAP_VIEW = {
  latitude: 12.5657,
  longitude: 104.991,
  zoom: 7, // Country-level zoom
  pitch: 0,
  bearing: 0,
};

// Regional bounding box for relevant events (Cambodia + neighboring countries)
export const CAMBODIA_REGION_BOUNDS = {
  north: 23.0, // Southern China
  south: 8.0,  // Southern Thailand/Malaysia
  east: 110.0, // Vietnam coast
  west: 97.0,  // Myanmar border
};

// Priority countries for monitoring
export const MONITORED_COUNTRIES = [
  'Cambodia',
  'Thailand',
  'Vietnam',
  'Laos',
  'Myanmar',
  'China',
  'Malaysia',
  'Singapore',
];

// Keywords for Cambodia-relevant news filtering
export const CAMBODIA_KEYWORDS = [
  // Direct mentions
  'Cambodia', 'Cambodian', 'Phnom Penh', 'Siem Reap', 'Sihanoukville',
  'Mekong', 'Tonle Sap', 'ASEAN',
  
  // Regional relations
  'Thailand Cambodia', 'Vietnam Cambodia', 'China Cambodia',
  'Thai-Cambodian', 'Vietnam-Cambodia', 'China-Cambodia',
  
  // Economic corridors
  'Southern Economic Corridor', 'Greater Mekong Subregion',
  'Belt and Road Cambodia', 'BRI Cambodia',
  
  // Border issues
  'Preah Vihear', 'Thai-Cambodia border', 'Mekong River',
  
  // Key industries
  'Cambodia garment', 'Cambodia tourism', 'Cambodia construction',
  'Angkor Wat', 'Cambodia casino', 'Sihanoukville port',
  
  // Political
  'Hun Sen', 'Hun Manet', 'CPP Cambodia', 'Cambodian election',
  
  // Infrastructure
  'Cambodia railway', 'Cambodia port', 'Cambodia airport',
  'Phnom Penh airport', 'Cambodia highway',
];

// Asian countries that might impact Cambodia
export const RELEVANT_ASIAN_COUNTRIES = {
  // Direct neighbors
  neighbors: ['Thailand', 'Vietnam', 'Laos'],
  
  // Major regional powers
  powers: ['China', 'Japan', 'South Korea', 'India'],
  
  // ASEAN members
  asean: ['Thailand', 'Vietnam', 'Laos', 'Myanmar', 'Singapore', 
          'Malaysia', 'Indonesia', 'Philippines', 'Brunei'],
  
  // Economic partners
  economicPartners: ['China', 'Japan', 'South Korea', 'Singapore', 
                     'Thailand', 'Vietnam', 'United States'],
};

// RSS Feeds focused on Cambodia and regional news
export const CAMBODIA_FOCUSED_FEEDS = [
  // Cambodia-specific
  {
    url: 'https://www.phnompenhpost.com/rss',
    name: 'Phnom Penh Post',
    tier: 2,
    type: 'news',
    region: 'Cambodia',
  },
  {
    url: 'https://www.khmertimeskh.com/feed/',
    name: 'Khmer Times',
    tier: 2,
    type: 'news',
    region: 'Cambodia',
  },
  {
    url: 'https://www.voacambodia.com/api/zr$oteuoi',
    name: 'VOA Cambodia',
    tier: 1,
    type: 'news',
    region: 'Cambodia',
  },
  
  // Regional context
  {
    url: 'https://thediplomat.com/feed/',
    name: 'The Diplomat (Asia)',
    tier: 2,
    type: 'geopolitical',
    region: 'Asia',
  },
  {
    url: 'https://asia.nikkei.com/rss/feed/nar',
    name: 'Nikkei Asia',
    tier: 2,
    type: 'economic',
    region: 'Asia',
  },
  {
    url: 'https://www.bangkokpost.com/rss/data/news.xml',
    name: 'Bangkok Post',
    tier: 2,
    type: 'news',
    region: 'Thailand',
  },
  {
    url: 'https://e.vnexpress.net/rss/news.rss',
    name: 'VnExpress International',
    tier: 2,
    type: 'news',
    region: 'Vietnam',
  },
  
  // ASEAN focus
  {
    url: 'https://asean.org/feed/',
    name: 'ASEAN Official',
    tier: 1,
    type: 'official',
    region: 'Southeast Asia',
  },
  {
    url: 'https://theaseanpost.com/feed',
    name: 'The ASEAN Post',
    tier: 2,
    type: 'regional',
    region: 'Southeast Asia',
  },
];

// Filter function to check if news is relevant to Cambodia
export function isCambodiaRelevant(headline: string, description: string = ''): boolean {
  const text = `${headline} ${description}`.toLowerCase();
  
  // Direct Cambodia mentions
  if (CAMBODIA_KEYWORDS.some(keyword => text.includes(keyword.toLowerCase()))) {
    return true;
  }
  
  // Check for monitored country mentions + economic/political/security keywords
  const hasMonitoredCountry = MONITORED_COUNTRIES.some(
    country => text.includes(country.toLowerCase())
  );
  
  const hasRelevantContext = [
    'trade', 'investment', 'border', 'dispute', 'agreement', 'treaty',
    'military', 'defense', 'security', 'cooperation', 'partnership',
    'mekong', 'asean', 'infrastructure', 'development', 'aid',
    'tourism', 'economy', 'sanctions', 'tariff', 'export', 'import',
  ].some(keyword => text.includes(keyword));
  
  return hasMonitoredCountry && hasRelevantContext;
}

// Geographic filter for events
export function isInCambodiaRegion(lat: number, lon: number): boolean {
  return (
    lat >= CAMBODIA_REGION_BOUNDS.south &&
    lat <= CAMBODIA_REGION_BOUNDS.north &&
    lon >= CAMBODIA_REGION_BOUNDS.west &&
    lon <= CAMBODIA_REGION_BOUNDS.east
  );
}

// Priority locations within Cambodia
export const CAMBODIA_STRATEGIC_LOCATIONS = [
  {
    name: 'Phnom Penh',
    lat: 11.5564,
    lon: 104.9282,
    type: 'capital',
    priority: 'critical',
  },
  {
    name: 'Sihanoukville Port',
    lat: 10.6279,
    lon: 103.5278,
    type: 'port',
    priority: 'critical',
  },
  {
    name: 'Siem Reap (Angkor)',
    lat: 13.3671,
    lon: 103.8448,
    type: 'tourism',
    priority: 'high',
  },
  {
    name: 'Poipet Border Crossing',
    lat: 13.6549,
    lon: 102.5656,
    type: 'border',
    priority: 'high',
  },
  {
    name: 'Bavet Border Crossing',
    lat: 11.0833,
    lon: 106.0167,
    type: 'border',
    priority: 'high',
  },
  {
    name: 'Ream Naval Base',
    lat: 10.5167,
    lon: 103.6333,
    type: 'military',
    priority: 'critical',
  },
  {
    name: 'Phnom Penh Airport',
    lat: 11.5466,
    lon: 104.8440,
    type: 'airport',
    priority: 'high',
  },
  {
    name: 'Siem Reap Airport',
    lat: 13.4107,
    lon: 103.8130,
    type: 'airport',
    priority: 'medium',
  },
];

// Border monitoring areas
export const CAMBODIA_BORDERS = [
  {
    name: 'Cambodia-Thailand Border',
    neighbor: 'Thailand',
    length_km: 817,
    priority: 'critical',
    hotspots: ['Preah Vihear Temple', 'Poipet', 'O Smach'],
  },
  {
    name: 'Cambodia-Vietnam Border',
    neighbor: 'Vietnam',
    length_km: 1158,
    priority: 'high',
    hotspots: ['Bavet', 'Kaam Samnor', 'Trapeang Phlong'],
  },
  {
    name: 'Cambodia-Laos Border',
    neighbor: 'Laos',
    length_km: 555,
    priority: 'medium',
    hotspots: ['Stung Treng', 'Preah Vihear'],
  },
];

// Economic corridors relevant to Cambodia
export const ECONOMIC_CORRIDORS = [
  {
    name: 'Southern Economic Corridor',
    countries: ['Thailand', 'Cambodia', 'Vietnam'],
    description: 'Bangkok - Phnom Penh - Ho Chi Minh City - Vung Tau',
    priority: 'critical',
  },
  {
    name: 'Southern Coastal Corridor',
    countries: ['Thailand', 'Cambodia'],
    description: 'Dawei - Kanchanaburi - Phnom Penh - Ho Chi Minh City - Vung Tau',
    priority: 'high',
  },
];

// Alert priorities for Cambodia-specific events
export const CAMBODIA_ALERT_PRIORITIES = {
  critical: [
    'border conflict',
    'political crisis',
    'natural disaster',
    'major infrastructure damage',
    'diplomatic incident',
  ],
  high: [
    'trade policy change',
    'investment announcement',
    'tourism impact',
    'currency fluctuation',
    'regional security',
  ],
  medium: [
    'economic indicator',
    'infrastructure project',
    'cultural event',
    'environmental issue',
  ],
};

// Custom panel configuration for Cambodia focus
export const CAMBODIA_PANELS = {
  enabled: [
    'cambodia-news',      // Cambodia-specific news
    'regional-news',      // ASEAN & neighboring countries
    'border-monitor',     // Border activity monitoring
    'economic-updates',   // Trade & investment
    'infrastructure',     // Infrastructure projects
    'map',               // Centered on Cambodia
  ],
  disabled: [
    'global-conflicts',  // Not relevant for Cambodia focus
    'nato-tracker',      // Not relevant
    'middle-east',       // Not relevant
  ],
};
