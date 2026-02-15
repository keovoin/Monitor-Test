# Cambodia News Filtering Logic

This document explains how the Cambodia variant filters news to show only relevant content.

## Filtering Strategy

The system uses a **multi-tier filtering approach** to ensure you see:
1. All news directly about Cambodia
2. Thai news specifically related to Cambodia
3. Regional (ASEAN) news with Cambodia relevance
4. Global news that mentions or impacts Cambodia

## Filter Function Flow

```
News Article
    ↓
[Source Check] → Cambodia sources? → ✅ INCLUDE
    ↓
[Direct Keywords] → Contains Cambodia keywords? → ✅ INCLUDE
    ↓
[Thai-Cambodia] → Thai source + Cambodia mention? → ✅ INCLUDE
    ↓
[Global Impact] → ASEAN/Mekong/Regional keywords? → ✅ INCLUDE
    ↓
[Contextual] → Monitored country + relevant context? → ✅ INCLUDE
    ↓
❌ EXCLUDE
```

## Tier 1: Source-Based Filtering

### Always Included Sources
Any news from these sources is automatically included:
- Phnom Penh Post
- Khmer Times
- VOA Cambodia
- Any source with "Cambodia" or "Khmer" in the name

**Why**: These are Cambodia-specific sources, so all their content is relevant.

## Tier 2: Direct Cambodia Keywords

### Geographic Keywords
```
Cambodia, Cambodian, Phnom Penh, Siem Reap, Sihanoukville,
Kampong, Battambang, Kampot, Koh Kong, Ratanakiri,
Mekong, Tonle Sap
```

### Political Keywords
```
Hun Sen, Hun Manet, CPP, Cambodian People Party,
Cambodian election, Cambodia government, Sam Rainsy, CNRP
```

### Infrastructure Keywords
```
Sihanoukville port, Ream base, Angkor Wat,
Cambodia railway, Cambodia highway, Cambodia dam
```

### Economic Keywords
```
Cambodia garment, Cambodia textile, Cambodia tourism,
Cambodia economy, Cambodia trade, Cambodia FDI, Riel
```

**Example Matches**:
- ✅ "Cambodia's GDP grows 5.6% in Q4"
- ✅ "Hun Manet meets with Chinese delegation"
- ✅ "Sihanoukville port expansion completed"
- ✅ "Phnom Penh flooding affects thousands"

## Tier 3: Thailand-Cambodia Relations

For news from **Thai sources** (Bangkok Post, The Nation), only include if contains:

### Thailand-Cambodia Bilateral Keywords
```
Thailand Cambodia, Thai Cambodia, Thai-Cambodian,
Thailand border, Aranyaprathet, Poipet,
Bangkok Phnom Penh, Thailand ASEAN,
Thailand Mekong, Thailand trade corridor
```

**Example Matches**:
- ✅ "Thailand and Cambodia resolve border dispute" (from Bangkok Post)
- ✅ "Aranyaprathet-Poipet crossing sees record traffic" (from Thai source)
- ✅ "Bangkok-Phnom Penh high-speed rail project begins" (from Thai source)

**Example Exclusions**:
- ❌ "Thailand's domestic politics update" (from Bangkok Post, no Cambodia mention)
- ❌ "Bangkok traffic congestion worsens" (not related to Cambodia)

## Tier 4: Global Impact Keywords

News must contain keywords indicating regional significance:

### ASEAN & Regional
```
ASEAN summit, ASEAN meeting, ASEAN agreement,
Mekong cooperation, Mekong development, Mekong dam,
Southeast Asia trade, Southeast Asia security,
China ASEAN, US ASEAN, Japan ASEAN,
Indo-Pacific, Quad
```

### Economic Frameworks
```
RCEP (Regional Comprehensive Economic Partnership),
CPTPP (Trans-Pacific Partnership),
GMS (Greater Mekong Subregion)
```

**Example Matches**:
- ✅ "ASEAN summit addresses South China Sea tensions"
- ✅ "Mekong River Commission reports low water levels"
- ✅ "RCEP trade agreement reduces tariffs"

## Tier 5: Contextual Filtering

For news mentioning **monitored countries**, also require **relevant context**:

### Monitored Countries
```
Cambodia, Thailand, Vietnam, Laos, Myanmar,
China, Japan, South Korea, Malaysia, Singapore,
United States, India
```

### Required Context Keywords
```
trade, investment, border, dispute, agreement, treaty,
military, defense, security, cooperation, partnership,
mekong, asean, infrastructure, development, aid,
tourism, economy, sanctions, tariff, export, import,
summit, meeting, conference, bilateral, trilateral,
corridor, port, railway, highway, airport
```

**Example Matches**:
- ✅ "China announces $500M investment in Southeast Asian infrastructure" (China + investment)
- ✅ "Vietnam and Thailand discuss Mekong water management" (Vietnam/Thailand + Mekong)
- ✅ "US strengthens defense cooperation with ASEAN partners" (US + defense + ASEAN)

**Example Exclusions**:
- ❌ "China's domestic economic growth slows" (China mentioned but no regional context)
- ❌ "Thailand wins football match" (Thailand mentioned but not relevant context)

## Special Cases

### Border-Related News

Any news containing these combinations is **always included**:
- "[Country] + border"
- "Preah Vihear" (disputed temple)
- "Poipet" (border crossing)
- "Bavet" (border crossing)

### Economic Corridors

News about these corridors is **always included**:
- Southern Economic Corridor
- Southern Coastal Corridor
- GMS North-South Economic Corridor
- Belt and Road Initiative + (Cambodia|Mekong|ASEAN)

### Natural Disasters

Natural disasters in the **monitoring region** (coordinates 8°N-23°N, 97°E-110°E) are included:
- Earthquakes
- Floods
- Typhoons
- Droughts
- Forest fires

## Filtering Examples

### ✅ Included Examples

1. **Direct Cambodia News**
   - "Cambodia's inflation rate drops to 2.3%"
   - *Reason*: Contains "Cambodia"

2. **Thai-Cambodia Bilateral**
   - "Thailand and Cambodia sign new trade agreement"
   - *Reason*: Contains "Thailand Cambodia" + "trade"

3. **Regional Impact**
   - "ASEAN leaders discuss economic integration at summit"
   - *Reason*: Contains "ASEAN summit"

4. **Global with Cambodia Mention**
   - "US State Department announces aid package for Cambodia and Vietnam"
   - *Reason*: Contains "Cambodia" + monitored country + "aid"

5. **Infrastructure Development**
   - "Chinese firm completes Sihanoukville airport expansion"
   - *Reason*: Contains "Sihanoukville" + "airport"

6. **Border Issue**
   - "Preah Vihear temple dispute negotiations resume"
   - *Reason*: Contains "Preah Vihear" (hotspot keyword)

7. **Economic Corridor**
   - "Southern Economic Corridor sees 15% trade increase"
   - *Reason*: Contains "Southern Economic Corridor"

8. **Regional Security**
   - "Southeast Asia defense ministers meet on maritime cooperation"
   - *Reason*: Contains "Southeast Asia" + "defense"

### ❌ Excluded Examples

1. **Irrelevant Thai News**
   - "Bangkok property prices rise 3%"
   - *Reason*: Thai source but no Cambodia connection

2. **Distant Global News**
   - "European Union passes new climate legislation"
   - *Reason*: No monitored country or regional keyword

3. **Sports/Entertainment**
   - "Thailand advances to World Cup qualifiers"
   - *Reason*: No relevant context keywords

4. **Domestic Politics (other countries)**
   - "Japanese Prime Minister reshuffles cabinet"
   - *Reason*: Japan mentioned but no regional/bilateral context

## Tuning the Filter

### Make Filter More Permissive

To see **more news**, edit `src/config/cambodia-config.ts`:

```typescript
// Remove the context requirement for monitored countries
if (hasMonitoredCountry) {
  return true; // Include all news mentioning monitored countries
}
```

### Make Filter More Restrictive

To see **less news**, require multiple keyword matches:

```typescript
// Require at least 2 Cambodia keywords
const cambodiaKeywordCount = CAMBODIA_KEYWORDS.filter(
  keyword => text.includes(keyword.toLowerCase())
).length;

if (cambodiaKeywordCount >= 2) {
  return true;
}
```

### Add Custom Keywords

Add your own keywords to `CAMBODIA_KEYWORDS` array:

```typescript
export const CAMBODIA_KEYWORDS = [
  // Existing keywords...
  
  // Your custom additions:
  'Your Custom Term',
  'Another Important Keyword',
];
```

## Testing the Filter

You can test the filter function in browser console:

```javascript
import { isCambodiaRelevant } from './src/config/cambodia-config';

// Test a headline
const headline = "Thailand and Cambodia discuss border security";
const isRelevant = isCambodiaRelevant(headline);
console.log(isRelevant); // true or false

// Test with source
const isRelevant2 = isCambodiaRelevant(
  headline,
  "Full article description...",
  "Bangkok Post" // source name
);
```

## Filter Performance

The filter function is designed for performance:

- **Lowercase conversion**: Done once per article
- **Short-circuit evaluation**: Returns as soon as a match is found
- **Array methods**: Uses efficient `some()` and `includes()` operations
- **No regex**: Simple string matching for speed

**Typical processing time**: < 1ms per article

## Monitoring Filter Effectiveness

To check if filtering is working correctly:

1. **Count filtered articles**: Check browser console for "Filtered X/Y articles"
2. **Review edge cases**: Look for articles that should/shouldn't appear
3. **Adjust keywords**: Add missing keywords based on false negatives
4. **Monitor logs**: Enable debug mode to see filtering decisions

## Future Enhancements

### Planned Improvements

1. **ML-based filtering**: Use transformer models for semantic similarity
2. **Priority scoring**: Rank articles by Cambodia-relevance score
3. **Entity recognition**: Detect people, places, organizations automatically
4. **Temporal filtering**: Show breaking news first, then recent, then archived
5. **User feedback**: Let users mark articles as relevant/irrelevant to improve filter

### Configuration File Evolution

```typescript
// Future: Weighted keyword matching
export const CAMBODIA_KEYWORDS_WEIGHTED = {
  critical: ['Hun Manet', 'Ream base', 'Sihanoukville port'],  // Weight: 10
  high: ['Cambodia', 'Phnom Penh', 'Mekong'],                  // Weight: 5
  medium: ['ASEAN', 'Southeast Asia'],                          // Weight: 3
  low: ['regional', 'bilateral'],                               // Weight: 1
};

// Require minimum score of 5 to include
```

## Troubleshooting

### Problem: Too Many Irrelevant Articles

**Solution 1**: Increase keyword match requirements
```typescript
if (cambodiaKeywordCount >= 2) { // Require 2+ keywords instead of 1
  return true;
}
```

**Solution 2**: Remove broad keywords
```typescript
// Remove generic terms like 'ASEAN' if causing noise
```

### Problem: Missing Important News

**Solution 1**: Add missing keywords
```typescript
CHANGE_KEYWORDS.push('New Important Term');
```

**Solution 2**: Reduce context requirements
```typescript
if (hasMonitoredCountry) {
  return true; // Don't require additional context
}
```

### Problem: All Thai News Showing

**Solution**: Verify Thailand-specific filter is active
```typescript
if (sourceLower.includes('thailand') || sourceLower.includes('bangkok')) {
  const hasThaiCambodiaKeyword = THAILAND_CAMBODIA_KEYWORDS.some(
    keyword => text.includes(keyword.toLowerCase())
  );
  if (hasThaiCambodiaKeyword) return true;
  // Falls through to next check - won't auto-include all Thai news
}
```

---

**Last Updated**: February 2026  
**Version**: 1.0  
**Maintainer**: Cambodia Monitor Team
