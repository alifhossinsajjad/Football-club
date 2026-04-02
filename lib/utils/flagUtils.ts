/**
 * Maps common country names to their flag emoji.
 * Falling back to a standard flag if nothing matches.
 */
const countryToFlag: Record<string, string> = {
  "Argentina": "🇦🇷",
  "Belgium": "🇧🇪",
  "Brazil": "🇧🇷",
  "France": "🇫🇷",
  "Germany": "🇩🇪",
  "Italy": "🇮🇹",
  "Netherlands": "🇳🇱",
  "Portugal": "🇵🇹",
  "Spain": "🇪🇸",
  "England": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  "UK": "🇬🇧",
  "USA": "🇺🇸",
  "United States": "🇺🇸",
  "Canada": "🇨🇦",
  "Mexico": "🇲🇽",
  "Nigeria": "🇳🇬",
  "Egypt": "🇪🇬",
  "Senegal": "🇸🇳",
  "Morocco": "🇲🇦",
  "Japan": "🇯🇵",
  "South Korea": "🇰🇷",
  "China": "🇨🇳",
  "Australia": "🇦🇺",
  "Ireland": "🇮🇪",
  "Scotland": "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  "Wales": "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
  "Uruguay": "🇺🇾",
  "Croatia": "🇭🇷",
  "Morocco ": "🇲🇦",
  "Ghana": "🇬🇭",
  "Ivory Coast": "🇨🇮",
  "Cameroon": "🇨🇲",
  "Algeria": "🇩🇿",
  "Tunisia": "🇹🇳",
  "Poland": "🇵🇱",
  "Ukraine": "🇺🇦",
  "Switzerland": "🇨🇭",
  "Austria": "🇦🇹",
  "Sweden": "🇸🇪",
  "Norway": "🇳🇴",
  "Denmark": "🇩🇰",
};

export function getFlagEmoji(country: string): string {
  if (!country) return "🏳️";
  
  const trimmed = country.trim();
  // Try exact match
  if (countryToFlag[trimmed]) return countryToFlag[trimmed];
  
  // Try case-insensitive match
  const lower = trimmed.toLowerCase();
  const found = Object.keys(countryToFlag).find(key => key.toLowerCase() === lower);
  if (found) return countryToFlag[found];

  return "🏳️";
}
