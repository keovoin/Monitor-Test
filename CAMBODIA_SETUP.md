# Cambodia Monitor Setup Guide

## Overview

This guide explains how to configure and use the Cambodia-focused variant of World Monitor. This variant is specifically designed to monitor:

- 🇰🇭 **Cambodia**: All domestic news, politics, economy, infrastructure
- 🇹🇭 **Thailand**: News specifically related to Cambodia or border issues
- 🌏 **ASEAN**: Regional developments impacting Cambodia
- 🌍 **Global**: Any international news mentioning or affecting Cambodia

## Quick Start

### Development Mode

```bash
# Run Cambodia variant in development
npm run dev:cambodia

# Or with Vercel CLI (recommended for full API functionality)
VITE_VARIANT=cambodia vercel dev
```

Open [http://localhost:3000](http://localhost:3000) - the map will automatically center on Cambodia.

### Production Build

```bash
# Build Cambodia variant
npm run build:cambodia

# Preview the build
npm run preview
```

### Desktop Application

```bash
# Run desktop app in dev mode
npm run desktop:dev:cambodia

# Build desktop app
npm run desktop:build:cambodia

# Package for macOS
npm run desktop:package:macos:cambodia

# Package for Windows
npm run desktop:package:windows:cambodia
```

## Configuration Files

The Cambodia variant uses these configuration files:

### Core Configuration
- **`src/config/cambodia-config.ts`** - Main Cambodia settings
  - Map view centered on Cambodia (12.5657°N, 104.991°E)
  - Regional bounds (Myanmar to Vietnam, Thailand to Malaysia)
  - Cambodia-specific keywords and filters
  - Strategic locations within Cambodia
  - Border monitoring configuration
  - RSS feeds focused on Cambodia

- **`src/config/variants/cambodia.ts`** - Variant-specific overrides
  - Default map layers
  - Panel visibility
  - Feature flags
  - Alert configuration

### Variant Selection
- **`src/config/variant.ts`** - Handles variant switching

## Key Features

### 1. Geographic Focus

The map automatically centers on Cambodia with appropriate zoom level:

```typescript
Cambodian Map View:
- Latitude: 12.5657°N
- Longitude: 104.991°E
- Zoom: 7.5 (country-level detail)
```

**Regional Context Area:**
- North: 23.0°N (Southern China)
- South: 8.0°N (Southern Thailand/Malaysia)
- East: 110.0°E (Vietnam coast)
- West: 97.0°E (Myanmar border)

### 2. Strategic Locations Monitored

#### Critical Priority:
- **Phnom Penh** - Capital and economic center
- **Sihanoukville Port** - Primary deep-water port, major Chinese investment
- **Ream Naval Base** - Naval base with Chinese development

#### High Priority:
- **Siem Reap (Angkor)** - Tourism hub
- **Poipet Border Crossing** - Main Cambodia-Thailand crossing
- **Bavet Border Crossing** - Main Cambodia-Vietnam crossing
- **Phnom Penh International Airport** - Main international gateway

#### Medium Priority:
- **Battambang** - Second largest city, agricultural hub
- **Siem Reap Airport** - Tourism gateway
- **Kampong Som (Sihanoukville)** - Coastal city, special economic zone

### 3. Border Monitoring

Three borders are actively monitored:

#### Cambodia-Thailand Border (817 km) - CRITICAL
- **Hotspots**: Preah Vihear Temple, Poipet, O Smach, Pailin
- **Issues**: Border disputes, Human trafficking, Trade smuggling

#### Cambodia-Vietnam Border (1,158 km) - HIGH
- **Hotspots**: Bavet, Kaam Samnor, Trapeang Phlong
- **Issues**: Border demarcation, Fishing disputes, Trade corridor

#### Cambodia-Laos Border (555 km) - MEDIUM
- **Hotspots**: Stung Treng, Preah Vihear
- **Issues**: Mekong River management, Cross-border trade

### 4. Economic Corridors

#### Southern Economic Corridor (Critical)
- **Route**: Bangkok → Phnom Penh → Ho Chi Minh City → Vung Tau
- **Countries**: Thailand, Cambodia, Vietnam
- **Status**: Active

#### Southern Coastal Corridor (High)
- **Route**: Dawei → Kanchanaburi → Phnom Penh → Ho Chi Minh City → Vung Tau
- **Countries**: Thailand, Cambodia
- **Status**: Under Development

#### GMS North-South Economic Corridor (High)
- **Route**: Kunming → Chiang Rai → Bangkok → Phnom Penh
- **Countries**: China, Laos, Thailand, Cambodia
- **Status**: Active

### 5. News Feed Filtering

The system uses intelligent filtering to show only Cambodia-relevant news:

#### Direct Cambodia Mentions
Automatically includes any news mentioning:
- Cambodia, Cambodian, Phnom Penh, Siem Reap, Sihanoukville
- Mekong, Tonle Sap, ASEAN
- Hun Sen, Hun Manet, Cambodian politics
- Specific locations: Battambang, Kampot, Koh Kong, etc.

#### Thailand News Filtering
From Thai sources, only includes news with:
- Thailand-Cambodia bilateral mentions
- Border-related content
- Trade corridor updates
- Bangkok-Phnom Penh connections

#### Global Impact Keywords
- ASEAN summit, meeting, agreement
- Mekong cooperation, development
- Southeast Asia trade, security
- Indo-Pacific, Regional partnerships

#### Context Requirements
For non-Cambodia sources, news must mention:
- Monitored countries (Thailand, Vietnam, China, etc.) AND
- Relevant context (trade, border, security, investment, etc.)

### 6. RSS Feed Sources

#### Cambodia-Specific (Tier 1-2)
- **Phnom Penh Post** - Leading English newspaper
- **Khmer Times** - Daily English news
- **VOA Cambodia** - Voice of America Cambodia service

#### Regional Context
**Thailand:**
- Bangkok Post
- The Nation Thailand

**Vietnam:**
- VnExpress International
- Vietnam News

**Regional Analysis:**
- The Diplomat (Asia)
- Nikkei Asia
- South China Morning Post

**ASEAN Focus:**
- ASEAN Official Feed
- The ASEAN Post

**Global (Asia-filtered):**
- Reuters Asia
- BBC Asia
- Al Jazeera (filtered for Asia)

## Map Layers

Default layers enabled for Cambodia monitoring:

- ✅ **Conflicts** - Regional conflicts
- ✅ **Protests** - Social unrest events
- ✅ **Military Bases** - Including Ream Naval Base
- ✅ **Infrastructure** - Ports, airports, borders
- ✅ **Undersea Cables** - Sihanoukville connections
- ✅ **Earthquakes** - Natural disaster monitoring
- ✅ **Fires** - Forest fires, land clearing detection

## Panels Configuration

### Enabled Panels
- **Cambodia News** - Cambodia-specific news feed
- **Regional News** - ASEAN & neighboring countries
- **Thailand News** - Thailand news (Cambodia-relevant only)
- **Border Monitor** - Border activity and incidents
- **Economic Updates** - Trade & investment news
- **Infrastructure** - Development projects
- **Mekong Monitor** - Mekong River issues
- **Map** - Interactive map centered on Cambodia

### Disabled Panels
- ❌ Global Conflicts (not relevant)
- ❌ NATO Tracker (not relevant)
- ❌ Middle East (not relevant)
- ❌ Ukraine Tracker (not relevant)
- ❌ Crypto Markets (optional - can be enabled)

## Alert Priorities

### Critical Alerts
- Border conflict
- Political crisis
- Natural disaster
- Major infrastructure damage
- Diplomatic incident
- Coup
- Civil unrest
- Terrorist attack

### High Priority Alerts
- Trade policy change
- Major investment announcement
- Tourism impact events
- Currency fluctuation
- Regional security issues
- Border tension
- Mekong disputes
- ASEAN disagreements

### Medium Priority Alerts
- Economic indicators
- Infrastructure project updates
- Political appointments
- Cultural events
- Environmental issues
- Trade statistics

## Customization

### Adding Custom Keywords

Edit `src/config/cambodia-config.ts`:

```typescript
export const CAMBODIA_KEYWORDS = [
  // Add your custom keywords here
  'Your Custom Keyword',
  'Another Keyword',
  // ...
];
```

### Adjusting Map View

Change default map position:

```typescript
export const CAMBODIA_MAP_VIEW = {
  latitude: 12.5657,  // Your desired latitude
  longitude: 104.991, // Your desired longitude
  zoom: 7.5,          // Your desired zoom (1-20)
  pitch: 0,
  bearing: 0,
};
```

### Adding RSS Feeds

Add new feeds to `CAMBODIA_FOCUSED_FEEDS` array:

```typescript
{
  url: 'https://your-feed-url.com/rss',
  name: 'Feed Name',
  tier: 2, // 1 = wire service, 2 = major outlet, 3 = niche
  type: 'news', // news, geopolitical, economic, etc.
  region: 'Cambodia',
}
```

### Modifying Regional Bounds

Adjust the monitoring area:

```typescript
export const CAMBODIA_REGION_BOUNDS = {
  north: 23.0,  // Northern limit
  south: 8.0,   // Southern limit
  east: 110.0,  // Eastern limit
  west: 97.0,   // Western limit
};
```

## Environment Variables

Create `.env.local` file:

```bash
# Variant selection
VITE_VARIANT=cambodia

# Map interaction mode
VITE_MAP_INTERACTION_MODE=3d  # or 'flat'

# API keys (optional but recommended)
GROQ_API_KEY=your_groq_key
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token

# Additional API keys
ACLED_ACCESS_TOKEN=your_acled_token
FINNHUB_API_KEY=your_finnhub_key
# ... (see .env.example for complete list)
```

## Deployment

### Vercel Deployment

1. Push your changes to GitHub
2. Connect repository to Vercel
3. Set environment variable:
   ```
   VITE_VARIANT=cambodia
   ```
4. Deploy

### Custom Domain

Configure your domain (e.g., `cambodia.worldmonitor.app`):

1. Add domain in Vercel dashboard
2. Set DNS records
3. Enable HTTPS

## Switching Between Variants

### At Build Time

```bash
# Full variant (global geopolitical)
npm run dev
npm run build:full

# Tech variant (technology focus)
npm run dev:tech
npm run build:tech

# Cambodia variant (Cambodia focus)
npm run dev:cambodia
npm run build:cambodia
```

### At Runtime (in browser)

Open browser console and run:

```javascript
// Switch to Cambodia variant
localStorage.setItem('worldmonitor-variant', 'cambodia');
location.reload();

// Switch to full variant
localStorage.setItem('worldmonitor-variant', 'full');
location.reload();

// Switch to tech variant
localStorage.setItem('worldmonitor-variant', 'tech');
location.reload();
```

## Troubleshooting

### Map Not Centering on Cambodia

Check that `VITE_VARIANT=cambodia` is set:
- In `.env.local` file
- Or via command: `VITE_VARIANT=cambodia npm run dev`

### No News Showing

1. Verify RSS feeds are accessible
2. Check browser console for errors
3. Ensure Vercel CLI is running (`vercel dev`) for API endpoints
4. Check if feeds require API keys

### Filtering Too Aggressive/Permissive

Adjust the `isCambodiaRelevant()` function in `src/config/cambodia-config.ts`:

```typescript
// More permissive (show more news)
if (CAMBODIA_KEYWORDS.some(keyword => 
  text.includes(keyword.toLowerCase())
)) {
  return true;
}

// More aggressive (show less news)
if (CAMBODIA_KEYWORDS.filter(keyword => 
  text.includes(keyword.toLowerCase())
).length >= 2) { // Require 2+ keyword matches
  return true;
}
```

### Desktop App Issues

Ensure Tauri is installed:

```bash
# Install Tauri CLI
npm install -g @tauri-apps/cli

# Verify installation
tauri --version
```

## Testing

```bash
# Run E2E tests for Cambodia variant
npm run test:e2e:cambodia

# Run all tests
npm test
```

## Contributing

To add features to the Cambodia variant:

1. Edit `src/config/cambodia-config.ts` for data
2. Edit `src/config/variants/cambodia.ts` for settings
3. Test with `npm run dev:cambodia`
4. Submit PR with clear description

## Support

For issues specific to the Cambodia variant:
- Open an issue on GitHub
- Tag with `variant:cambodia`
- Provide logs and error messages

## License

MIT License - see LICENSE file for details

---

**Cambodia Monitor** - Real-time intelligence for Cambodia and the region
