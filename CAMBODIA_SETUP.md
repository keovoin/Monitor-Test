# Cambodia Monitor Setup Guide

This guide explains how to configure World Monitor to focus exclusively on Cambodia and relevant regional context.

## Overview

The Cambodia Monitor variant filters and focuses the dashboard to show:
- **Cambodia-specific news and events**
- **Regional context** from Thailand, Vietnam, Laos, and other ASEAN countries
- **Economic corridors** affecting Cambodia (Southern Economic Corridor, Belt & Road)
- **Border monitoring** for Thailand-Cambodia, Vietnam-Cambodia, and Laos-Cambodia borders
- **Strategic locations** including Phnom Penh, Sihanoukville Port, Siem Reap, and key border crossings
- **Infrastructure projects** in Cambodia and neighboring regions

## Quick Start

### 1. Copy Cambodia Environment Configuration

```bash
cp .env.cambodia .env.local
```

### 2. Edit `.env.local` and Add Your API Keys

The file contains placeholders for all API keys. See the main README for registration links.

**Minimum Required:**
- No API keys are strictly required for basic functionality
- For full features, add: `GROQ_API_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`

### 3. Run the Application

```bash
# Install dependencies
npm install

# Run with Vercel CLI (recommended - includes all API functions)
vercel dev

# OR run frontend only (limited functionality)
npm run dev
```

### 4. Access the Dashboard

Open [http://localhost:3000](http://localhost:3000)

The map will automatically center on Cambodia at zoom level 7.

## Configuration Details

### Map View Settings

The Cambodia variant centers the map on:
- **Latitude:** 12.5657 (Central Cambodia)
- **Longitude:** 104.991 (Phnom Penh area)
- **Zoom:** 7 (Country-level view)

### Regional Bounds

Events and news are filtered to the Southeast Asian region:
- **North:** 23.0° (Southern China)
- **South:** 8.0° (Southern Thailand/Malaysia)
- **East:** 110.0° (Vietnam coast)
- **West:** 97.0° (Myanmar border)

### Monitored Countries

1. **Cambodia** (Primary focus)
2. **Thailand** (Western neighbor)
3. **Vietnam** (Eastern neighbor)
4. **Laos** (Northern neighbor)
5. **Myanmar** (Regional context)
6. **China** (Major economic partner)
7. **Malaysia** (ASEAN partner)
8. **Singapore** (Regional hub)

## News Filtering

### Relevance Scoring (0-100)

News items are automatically scored based on:

| Criteria | Score |
|----------|-------|
| Direct Cambodia mention | +50 |
| Major cities (Phnom Penh, Siem Reap, Sihanoukville) | +30 |
| Neighbor countries (Thailand, Vietnam, Laos) | +20 |
| China (major partner) | +15 |
| Security/political keywords | +15 |
| ASEAN/Mekong context | +10 |
| Economic keywords | +10 |
| Located in Cambodia region | +10 |

### Relevance Categories

- **Critical (70-100):** Direct Cambodia impact
- **High (50-69):** Regional impact affecting Cambodia
- **Medium (30-49):** Indirect relevance
- **Low (<30):** Tangential (filtered out by default)

### Included Keywords

The system filters news containing:
- Direct: Cambodia, Cambodian, Phnom Penh, Siem Reap, Sihanoukville
- Regional: Thailand Cambodia, Vietnam Cambodia, China Cambodia
- Economic: Southern Economic Corridor, Greater Mekong Subregion, Belt and Road Cambodia
- Borders: Preah Vihear, Thai-Cambodia border, Mekong River
- Industries: Cambodia garment, Cambodia tourism, Cambodia construction
- Infrastructure: Cambodia railway, Cambodia port, Cambodia airport

## Strategic Locations

The following locations are highlighted on the map:

### Critical Priority
1. **Phnom Penh** - Capital city
2. **Sihanoukville Port** - Major seaport
3. **Ream Naval Base** - Military facility (China partnership)

### High Priority
4. **Siem Reap (Angkor Wat)** - Tourism hub
5. **Poipet Border Crossing** - Thailand border (largest crossing)
6. **Bavet Border Crossing** - Vietnam border (major trade route)
7. **Phnom Penh International Airport**

### Medium Priority
8. **Siem Reap International Airport**
9. Other provincial capitals and infrastructure

## Border Monitoring

### Cambodia-Thailand Border
- **Length:** 817 km
- **Priority:** Critical
- **Hotspots:** Preah Vihear Temple, Poipet, O Smach
- **Issues:** Temple disputes, smuggling, trade

### Cambodia-Vietnam Border
- **Length:** 1,158 km
- **Priority:** High
- **Hotspots:** Bavet, Kaam Samnor, Trapeang Phlong
- **Issues:** Border demarcation, trade, migration

### Cambodia-Laos Border
- **Length:** 555 km
- **Priority:** Medium
- **Hotspots:** Stung Treng, Preah Vihear
- **Issues:** Mekong River development, hydropower

## Economic Corridors

### Southern Economic Corridor (Critical)
- **Route:** Bangkok → Phnom Penh → Ho Chi Minh City → Vung Tau
- **Countries:** Thailand, Cambodia, Vietnam
- **Impact:** Major trade route, infrastructure development

### Southern Coastal Corridor (High)
- **Route:** Dawei → Kanchanaburi → Phnom Penh → Ho Chi Minh City → Vung Tau
- **Countries:** Thailand, Cambodia
- **Impact:** Alternative trade route, port development

## RSS Feeds

### Cambodia-Specific Sources

1. **Phnom Penh Post** - Leading English newspaper
   - `https://www.phnompenhpost.com/rss`

2. **Khmer Times** - Daily news
   - `https://www.khmertimeskh.com/feed/`

3. **VOA Cambodia** - Voice of America Cambodia
   - `https://www.voacambodia.com/api/zr$oteuoi`

### Regional Context

4. **The Diplomat** - Asian geopolitics
5. **Nikkei Asia** - Asian business news
6. **Bangkok Post** - Thailand news (border context)
7. **VnExpress International** - Vietnam news
8. **ASEAN Official** - Official ASEAN news
9. **The ASEAN Post** - Regional analysis

## Customization

### Add Custom Keywords

Edit `src/config/cambodia-config.ts`:

```typescript
export const CAMBODIA_KEYWORDS = [
  // Add your custom keywords here
  'your-keyword-1',
  'your-keyword-2',
];
```

### Adjust Regional Bounds

Edit `.env.local`:

```bash
VITE_REGION_NORTH=23.0  # Expand or contract north boundary
VITE_REGION_SOUTH=8.0   # Expand or contract south boundary
VITE_REGION_EAST=110.0  # Expand or contract east boundary
VITE_REGION_WEST=97.0   # Expand or contract west boundary
```

### Change Minimum Relevance Score

Edit `.env.local`:

```bash
VITE_MIN_RELEVANCE_SCORE=25  # Lower = more permissive, Higher = more strict
```

### Add More Monitored Countries

Edit `.env.local`:

```bash
VITE_MONITORED_COUNTRIES=Cambodia,Thailand,Vietnam,Laos,Myanmar,China,Malaysia,Singapore,Indonesia
```

## Filtering API

### Import Cambodia Filters

```typescript
import { CambodiaFilters } from './utils/cambodia-filter';

// Filter news items
const relevantNews = CambodiaFilters.filterNews(allNews);

// Sort by relevance
const sortedNews = CambodiaFilters.sortByRelevance(relevantNews);

// Categorize by priority
const categorized = CambodiaFilters.categorize(allNews);
console.log(categorized.critical);  // High-priority items
console.log(categorized.high);      // Medium-priority items

// Filter geographic events
const regionalEvents = CambodiaFilters.filterEvents(allEvents);

// Find events near borders
const borderEvents = CambodiaFilters.findBorderEvents(allEvents, 50); // 50km radius
```

### Calculate Relevance Score

```typescript
import { calculateRelevanceScore } from './utils/cambodia-filter';

const newsItem = {
  title: "Cambodia and Thailand sign border trade agreement",
  description: "New agreement to boost bilateral trade..."
};

const score = calculateRelevanceScore(newsItem);
// Returns: 95 (high relevance)
```

## Data Layers

The following map layers are enabled by default:

### Always Visible
- Cambodia country border
- Strategic locations (cities, ports, airports)
- Border crossings
- Major infrastructure

### Toggleable Layers
- Military bases (regional)
- Economic corridors
- Infrastructure projects
- Border monitoring zones
- News event markers
- Protest/unrest events
- Natural disasters
- Internet outages

## Alert Priorities

### Critical Alerts
- Border conflicts
- Political crises
- Natural disasters
- Major infrastructure damage
- Diplomatic incidents

### High Alerts
- Trade policy changes
- Investment announcements
- Tourism impacts
- Currency fluctuations
- Regional security events

### Medium Alerts
- Economic indicators
- Infrastructure project updates
- Cultural events
- Environmental issues

## Deployment

### Deploy to Vercel

```bash
# Set environment variable for Cambodia variant
vercel env add VITE_VARIANT
# Enter: cambodia

# Deploy
vercel --prod
```

### Deploy with Custom Domain

```bash
vercel --prod
vercel alias <deployment-url> cambodia-monitor.yourdomain.com
```

## Troubleshooting

### No News Appearing
1. Check that `.env.local` has `VITE_VARIANT=cambodia`
2. Lower `VITE_MIN_RELEVANCE_SCORE` to see more results
3. Verify RSS feeds are accessible (some may be geo-restricted)

### Map Not Centered on Cambodia
1. Verify `.env.local` has correct coordinates:
   ```
   VITE_DEFAULT_LAT=12.5657
   VITE_DEFAULT_LON=104.991
   ```
2. Clear browser cache and reload

### Too Much/Too Little Content
- **Too much:** Increase `VITE_MIN_RELEVANCE_SCORE` (e.g., 40)
- **Too little:** Decrease `VITE_MIN_RELEVANCE_SCORE` (e.g., 15)
- Adjust `CAMBODIA_KEYWORDS` in `src/config/cambodia-config.ts`

## Additional Resources

- **Main README:** [README.md](./README.md) - Full system documentation
- **Config File:** [src/config/cambodia-config.ts](./src/config/cambodia-config.ts)
- **Filter Utils:** [src/utils/cambodia-filter.ts](./src/utils/cambodia-filter.ts)
- **Environment:** [.env.cambodia](./.env.cambodia)

## Support

For issues or questions:
1. Check existing GitHub issues
2. Create new issue with "Cambodia variant" label
3. Include your `.env.local` configuration (without API keys)

## Contributing

To improve Cambodia-specific features:
1. Edit configuration files in `src/config/`
2. Update filtering logic in `src/utils/cambodia-filter.ts`
3. Add Cambodia-specific RSS feeds to `CAMBODIA_FOCUSED_FEEDS`
4. Submit pull request with description

---

**Note:** This variant inherits all core functionality from World Monitor while adding Cambodia-specific filtering and focus. All original features remain available.
