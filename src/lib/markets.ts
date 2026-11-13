// Every market DIG shoots in. One source for the map pins, the market
// directory, the market pages at /markets/{slug}, the sitemap and llms.txt.
//
// `city` is the short label on the map. `name` is what a page calls the market
// ("Dallas-Fort Worth"). `areas` are the submarkets named on the page: Chad
// should confirm each list against where DIG actually shoots.
export type RegionId = "west" | "mountain" | "central" | "east";

export interface Market {
  slug: string;
  city: string;
  name: string;
  /** Overrides `name` after the word "in", e.g. "the San Francisco Bay Area". */
  inName?: string;
  state: string;
  stateName: string;
  region: RegionId;
  coords: [number, number];
  blurb: string;
  areas: string[];
  isOffice?: boolean;
  labelAnchor?: "start" | "end" | "middle";
  labelY?: number;
}

export const REGION_LABELS: Record<RegionId, string> = {
  west: "West",
  mountain: "Mountain",
  central: "Central",
  east: "East",
};

export const markets = [
  {"slug": "seattle", "city": "Seattle", "name": "Seattle", "state": "WA", "stateName": "Washington", "region": "west", "coords": [-122.33, 47.61], "blurb": "Pacific Northwest: WA's fastest-growing new home corridors.", "areas": ["Bellevue", "Kirkland", "Snohomish County", "Tacoma", "Puyallup"], "labelAnchor": "end", "labelY": -10},
  {"slug": "portland", "city": "Portland", "name": "Portland", "state": "OR", "stateName": "Oregon", "region": "west", "coords": [-122.68, 45.52], "blurb": "Pacific Northwest: OR/WA border markets and metro Portland.", "areas": ["Hillsboro", "Beaverton", "Happy Valley", "Vancouver, WA"], "labelAnchor": "end", "labelY": -10},
  {"slug": "sacramento", "city": "Sacramento", "name": "Sacramento", "state": "CA", "stateName": "California", "region": "west", "coords": [-121.49, 38.58], "blurb": "DIG's West Coast headquarters. Central Valley coverage hub.", "areas": ["Roseville", "Folsom", "Elk Grove", "Rancho Cordova", "El Dorado Hills"], "labelAnchor": "end", "labelY": -10, "isOffice": true},
  {"slug": "bay-area", "city": "Bay Area", "name": "San Francisco Bay Area", "state": "CA", "stateName": "California", "region": "west", "coords": [-122.03, 37.54], "blurb": "Bay Area and Silicon Valley homebuilders.", "areas": ["San Jose", "Fremont", "Dublin", "Livermore", "Walnut Creek"], "labelAnchor": "end", "labelY": -10, "inName": "the San Francisco Bay Area"},
  {"slug": "los-angeles", "city": "Los Angeles", "name": "Los Angeles", "state": "CA", "stateName": "California", "region": "west", "coords": [-118.24, 34.05], "blurb": "Greater LA metro production and luxury communities.", "areas": ["Santa Clarita", "Valencia", "Porter Ranch", "the San Fernando Valley", "Long Beach"], "labelAnchor": "end", "labelY": -10},
  {"slug": "orange-county", "city": "Orange County", "name": "Orange County", "state": "CA", "stateName": "California", "region": "west", "coords": [-117.82, 33.68], "blurb": "Orange County and Inland Empire new home communities.", "areas": ["Irvine", "Rancho Mission Viejo", "Lake Forest", "Ontario", "Menifee", "Temecula"], "labelAnchor": "start", "labelY": 14},
  {"slug": "fresno", "city": "Fresno", "name": "Fresno", "state": "CA", "stateName": "California", "region": "west", "coords": [-119.77, 36.74], "blurb": "Central Valley growth corridor: one of California's fastest-growing new home markets.", "areas": ["Clovis", "Madera", "Visalia"], "labelAnchor": "start", "labelY": -10},
  {"slug": "las-vegas", "city": "Las Vegas", "name": "Las Vegas", "state": "NV", "stateName": "Nevada", "region": "west", "coords": [-115.14, 36.17], "blurb": "Nevada's largest new home market: high-volume spec and master plan.", "areas": ["Summerlin", "Henderson", "North Las Vegas", "Skye Canyon"], "labelAnchor": "start", "labelY": -10},
  {"slug": "reno", "city": "Reno", "name": "Reno", "state": "NV", "stateName": "Nevada", "region": "west", "coords": [-119.81, 39.53], "blurb": "Northern Nevada: Reno/Sparks metro and Lake Tahoe corridor.", "areas": ["Sparks", "Spanish Springs", "Carson City"], "labelAnchor": "start", "labelY": -10},
  {"slug": "boise", "city": "Boise", "name": "Boise", "state": "ID", "stateName": "Idaho", "region": "mountain", "coords": [-116.2, 43.62], "blurb": "Idaho's fastest-growing metro: Treasure Valley builders.", "areas": ["Meridian", "Eagle", "Nampa", "Star", "Kuna"], "labelAnchor": "start", "labelY": -10},
  {"slug": "salt-lake-city", "city": "Salt Lake City", "name": "Salt Lake City", "state": "UT", "stateName": "Utah", "region": "mountain", "coords": [-111.89, 40.76], "blurb": "Wasatch Front communities and Utah's growth markets.", "areas": ["Lehi", "Draper", "South Jordan", "Herriman", "Saratoga Springs"], "labelAnchor": "start", "labelY": -10},
  {"slug": "denver", "city": "Denver", "name": "Denver", "state": "CO", "stateName": "Colorado", "region": "mountain", "coords": [-104.99, 39.74], "blurb": "Colorado Front Range: Denver metro and mountain corridor builders.", "areas": ["Aurora", "Castle Rock", "Parker", "Thornton", "Erie"], "labelAnchor": "start", "labelY": -10},
  {"slug": "phoenix", "city": "Phoenix", "name": "Phoenix", "state": "AZ", "stateName": "Arizona", "region": "mountain", "coords": [-112.07, 33.45], "blurb": "Greater Phoenix: one of the nation's highest-volume new home markets.", "areas": ["Scottsdale", "Gilbert", "Queen Creek", "Buckeye", "Surprise", "Peoria"], "labelAnchor": "start", "labelY": -10},
  {"slug": "dallas", "city": "Dallas", "name": "Dallas-Fort Worth", "state": "TX", "stateName": "Texas", "region": "central", "coords": [-96.8, 32.78], "blurb": "DIG's Central region headquarters. DFW is one of our most active markets.", "areas": ["Frisco", "Prosper", "Celina", "McKinney", "Fort Worth"], "labelAnchor": "start", "labelY": -10, "isOffice": true},
  {"slug": "houston", "city": "Houston", "name": "Houston", "state": "TX", "stateName": "Texas", "region": "central", "coords": [-95.37, 29.76], "blurb": "Greater Houston: high-volume production builders and master-planned communities.", "areas": ["Katy", "Cypress", "The Woodlands", "Fulshear", "Conroe"], "labelAnchor": "start", "labelY": -10},
  {"slug": "austin", "city": "Austin", "name": "Austin", "state": "TX", "stateName": "Texas", "region": "central", "coords": [-97.74, 30.27], "blurb": "Austin metro and Hill Country: strong spec and QMI demand.", "areas": ["Leander", "Georgetown", "Round Rock", "Kyle", "Dripping Springs"], "labelAnchor": "middle", "labelY": -13},
  {"slug": "san-antonio", "city": "San Antonio", "name": "San Antonio", "state": "TX", "stateName": "Texas", "region": "central", "coords": [-98.49, 29.42], "blurb": "San Antonio and South Texas builders.", "areas": ["New Braunfels", "Boerne", "Schertz", "Cibolo"], "labelAnchor": "end", "labelY": -10},
  {"slug": "tampa", "city": "Tampa", "name": "Tampa Bay", "state": "FL", "stateName": "Florida", "region": "east", "coords": [-82.46, 27.95], "blurb": "Tampa Bay and the Gulf Coast: Florida's western growth corridor.", "areas": ["Wesley Chapel", "Riverview", "Parrish", "Lakewood Ranch"], "labelAnchor": "end", "labelY": -10},
  {"slug": "orlando", "city": "Orlando", "name": "Orlando", "state": "FL", "stateName": "Florida", "region": "east", "coords": [-81.38, 28.54], "blurb": "Central Florida: one of the busiest new home markets in the U.S.", "areas": ["Lake Nona", "Winter Garden", "Kissimmee", "St. Cloud", "Clermont"], "labelAnchor": "start", "labelY": -10},
  {"slug": "miami", "city": "Miami", "name": "Miami", "state": "FL", "stateName": "Florida", "region": "east", "coords": [-80.19, 25.76], "blurb": "South Florida: luxury, production, and waterfront communities.", "areas": ["Fort Lauderdale", "Doral", "Homestead", "West Palm Beach"], "labelAnchor": "start", "labelY": -10},
  {"slug": "jacksonville", "city": "Jacksonville", "name": "Jacksonville", "state": "FL", "stateName": "Florida", "region": "east", "coords": [-81.66, 30.33], "blurb": "Northeast Florida: rapidly growing Jacksonville metro builders.", "areas": ["St. Johns", "Nocatee", "St. Augustine"], "labelAnchor": "start", "labelY": -10},
  {"slug": "atlanta", "city": "Atlanta", "name": "Atlanta", "state": "GA", "stateName": "Georgia", "region": "east", "coords": [-84.39, 33.75], "blurb": "Metro Atlanta and suburban Georgia: active DIG market.", "areas": ["Alpharetta", "Cumming", "Marietta", "Woodstock", "Lawrenceville"], "labelAnchor": "end", "labelY": -10},
  {"slug": "charleston", "city": "Charleston", "name": "Charleston", "state": "SC", "stateName": "South Carolina", "region": "east", "coords": [-79.94, 32.78], "blurb": "Lowcountry and coastal Carolina builders.", "areas": ["Summerville", "Mount Pleasant", "Daniel Island", "Johns Island"], "labelAnchor": "start", "labelY": -10},
  {"slug": "charlotte", "city": "Charlotte", "name": "Charlotte", "state": "NC", "stateName": "North Carolina", "region": "east", "coords": [-80.84, 35.23], "blurb": "Charlotte metro and Lake Norman corridor.", "areas": ["Fort Mill", "Huntersville", "Mooresville", "Waxhaw", "Concord"], "labelAnchor": "end", "labelY": -10},
  {"slug": "raleigh", "city": "Raleigh", "name": "Raleigh-Durham", "state": "NC", "stateName": "North Carolina", "region": "east", "coords": [-78.64, 35.78], "blurb": "Triangle and Research Triangle Park: strong spec and model home demand.", "areas": ["Cary", "Apex", "Wake Forest", "Durham", "Holly Springs"], "labelAnchor": "start", "labelY": -10},
  {"slug": "columbus", "city": "Columbus", "name": "Columbus", "state": "OH", "stateName": "Ohio", "region": "east", "coords": [-82.99, 39.96], "blurb": "Central Ohio: Columbus metro new home builders.", "areas": ["Dublin", "Powell", "New Albany", "Westerville", "Delaware"], "labelAnchor": "start", "labelY": -10},
] as Market[];

export const marketBySlug = (slug: string) => markets.find((m) => m.slug === slug);
export const marketsInRegion = (region: RegionId) => markets.filter((m) => m.region === region);
/** "Dallas-Fort Worth", or "the San Francisco Bay Area" where the name needs an article. */
export const inName = (m: Market) => m.inName ?? m.name;
