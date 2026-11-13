// Every market DIG shoots in. One source for the map pins, the market
// directory, the market pages at /markets/{slug}, the sitemap and llms.txt.
//
// `city` is the short label on the map. `name` is what a page calls the market
// ("Dallas-Fort Worth"). `areas` are the submarkets named on the page, taken
// from where DIG has shot (Zoho premium deals and digDesk jobs, Nov 2026).
// `builders` are home builders DIG has worked with in the market, most work
// first; a builder based in the market or a nearby part of the state counts.
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
  builders: string[];
  /** How many builders the page sentence names. Defaults to 6. */
  buildersShown?: number;
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
  {"slug": "seattle", "city": "Seattle", "name": "Seattle", "state": "WA", "stateName": "Washington", "region": "west", "coords": [-122.33, 47.61], "blurb": "Pacific Northwest: WA's fastest-growing new home corridors.", "areas": ["Tacoma", "Puyallup", "Bonney Lake", "Enumclaw", "Sumner", "Gig Harbor"], "builders": ["Trumark Homes", "Risewell Homes"], "labelAnchor": "end", "labelY": -10},
  {"slug": "portland", "city": "Portland", "name": "Portland", "state": "OR", "stateName": "Oregon", "region": "west", "coords": [-122.68, 45.52], "blurb": "Pacific Northwest: OR/WA border markets and metro Portland.", "areas": ["Hillsboro", "Beaverton", "Newberg", "Tigard", "Canby"], "builders": ["Pahlisch Homes", "Risewell Homes", "Hayden Homes", "MonteVista Homes"], "labelAnchor": "end", "labelY": -10},
  {"slug": "sacramento", "city": "Sacramento", "name": "Sacramento", "state": "CA", "stateName": "California", "region": "west", "coords": [-121.49, 38.58], "blurb": "DIG's West Coast headquarters. Central Valley coverage hub.", "areas": ["Roseville", "Folsom", "Rancho Cordova", "Elk Grove", "Lincoln", "Dixon"], "builders": ["Beazer Homes", "Sekisui House", "Lewis Group of Companies", "K. Hovnanian Homes", "Risewell Homes", "Tricon Residential", "Toll Brothers", "D.R. Horton", "KB Home", "Lennar"], "labelAnchor": "end", "labelY": -10, "isOffice": true},
  {"slug": "bay-area", "city": "Bay Area", "name": "San Francisco Bay Area", "state": "CA", "stateName": "California", "region": "west", "coords": [-122.03, 37.54], "blurb": "Bay Area and Silicon Valley homebuilders.", "areas": ["Dublin", "Mountain House", "Santa Rosa", "American Canyon", "Manteca", "Fremont"], "builders": ["KB Home", "D.R. Horton", "Risewell Homes", "Toll Brothers", "Van Daele Homes", "Rurka Homes", "City Ventures", "Sekisui House", "Trumark Homes", "Cresleigh Homes"], "labelAnchor": "end", "labelY": -10, "inName": "the San Francisco Bay Area"},
  {"slug": "los-angeles", "city": "Los Angeles", "name": "Los Angeles", "state": "CA", "stateName": "California", "region": "west", "coords": [-118.24, 34.05], "blurb": "Greater LA metro production and luxury communities.", "areas": ["Walnut", "Porter Ranch", "Lancaster", "Whittier", "Rosamond", "Palmdale"], "builders": ["Toll Brothers", "K. Hovnanian Homes", "CBC Home", "RC Homes", "Risewell Homes", "Tri Pointe Homes", "Sekisui House", "Lewis Group of Companies", "Van Daele Homes", "KB Home"], "labelAnchor": "end", "labelY": -10},
  {"slug": "orange-county", "city": "Orange County", "name": "Orange County", "state": "CA", "stateName": "California", "region": "west", "coords": [-117.82, 33.68], "blurb": "Orange County and Inland Empire new home communities.", "areas": ["Rancho Cucamonga", "Chino", "Winchester", "Redlands", "Hesperia", "Temecula"], "builders": ["Lewis Group of Companies", "Beazer Homes", "Tricon Residential", "K. Hovnanian Homes", "Risewell Homes", "Sekisui House", "Tri Pointe Homes", "Toll Brothers", "Melia Homes", "Olson Homes"], "labelAnchor": "start", "labelY": 14},
  {"slug": "fresno", "city": "Fresno", "name": "Fresno", "state": "CA", "stateName": "California", "region": "west", "coords": [-119.77, 36.74], "blurb": "Central Valley growth corridor: one of California's fastest-growing new home markets.", "areas": ["Friant", "Los Banos", "Fowler", "Madera"], "builders": ["K. Hovnanian Homes", "D.R. Horton", "KB Home"], "labelAnchor": "start", "labelY": -10},
  {"slug": "las-vegas", "city": "Las Vegas", "name": "Las Vegas", "state": "NV", "stateName": "Nevada", "region": "west", "coords": [-115.14, 36.17], "blurb": "Nevada's largest new home market: high-volume spec and master plan.", "areas": ["Henderson", "North Las Vegas", "Summerlin"], "builders": ["Beazer Homes", "Blue Heron", "Lewis Group of Companies", "Del Webb", "KB Home", "Lennar"], "labelAnchor": "start", "labelY": -10},
  {"slug": "reno", "city": "Reno", "name": "Reno", "state": "NV", "stateName": "Nevada", "region": "west", "coords": [-119.81, 39.53], "blurb": "Northern Nevada: Reno/Sparks metro and Lake Tahoe corridor.", "areas": ["Sparks", "Spanish Springs", "Carson City"], "builders": ["Toll Brothers", "Tricon Residential", "Tri Pointe Homes"], "labelAnchor": "start", "labelY": -10},
  {"slug": "boise", "city": "Boise", "name": "Boise", "state": "ID", "stateName": "Idaho", "region": "mountain", "coords": [-116.2, 43.62], "blurb": "Idaho's fastest-growing metro: Treasure Valley builders.", "areas": ["Star", "Eagle", "Nampa", "Caldwell"], "builders": ["Tresidio Homes", "Woodbridge Pacific Group", "Toll Brothers"], "labelAnchor": "start", "labelY": -10},
  {"slug": "salt-lake-city", "city": "Salt Lake City", "name": "Salt Lake City", "state": "UT", "stateName": "Utah", "region": "mountain", "coords": [-111.89, 40.76], "blurb": "Wasatch Front communities and Utah's growth markets.", "areas": ["Holladay", "American Fork", "Tooele"], "builders": ["Visionary Homes", "Van Daele Homes"], "labelAnchor": "start", "labelY": -10},
  {"slug": "denver", "city": "Denver", "name": "Denver", "state": "CO", "stateName": "Colorado", "region": "mountain", "coords": [-104.99, 39.74], "blurb": "Colorado Front Range: Denver metro and mountain corridor builders.", "areas": ["Castle Rock", "Colorado Springs", "Fort Collins", "Aurora", "Johnstown", "Superior"], "builders": ["Toll Brothers", "Hartford Homes", "Risewell Homes", "Landmark Homes", "Oakwood Homes", "Taylor Morrison", "Infinity Homes", "Classic Homes", "Lokal Homes", "Dream Finders Homes", "Infinity Properties"], "buildersShown": 7, "labelAnchor": "start", "labelY": -10},
  {"slug": "phoenix", "city": "Phoenix", "name": "Phoenix", "state": "AZ", "stateName": "Arizona", "region": "mountain", "coords": [-112.07, 33.45], "blurb": "Greater Phoenix: one of the nation's highest-volume new home markets.", "areas": ["Buckeye", "Surprise", "Maricopa", "Glendale", "Goodyear", "Waddell"], "builders": ["Beazer Homes", "Risewell Homes", "Oakwood Homes", "Tricon Residential", "Taylor Morrison"], "labelAnchor": "start", "labelY": -10},
  {"slug": "dallas", "city": "Dallas", "name": "Dallas-Fort Worth", "state": "TX", "stateName": "Texas", "region": "central", "coords": [-96.8, 32.78], "blurb": "DIG's Central region headquarters. DFW is one of our most active markets.", "areas": ["Celina", "McKinney", "Rockwall", "Prosper", "Waxahachie", "Fort Worth"], "builders": ["Perry Homes", "Shaddock Homes", "Grand Homes", "Coventry Homes", "Toll Brothers", "Graham Hart Home Builder", "Beazer Homes", "Ladera Living", "Cadence Homes", "D.R. Horton"], "labelAnchor": "start", "labelY": -10, "isOffice": true},
  {"slug": "houston", "city": "Houston", "name": "Houston", "state": "TX", "stateName": "Texas", "region": "central", "coords": [-95.37, 29.76], "blurb": "Greater Houston: high-volume production builders and master-planned communities.", "areas": ["Richmond", "Missouri City", "Tomball", "Katy", "Todd Mission", "Montgomery"], "builders": ["Toll Brothers", "Beazer Homes", "Coventry Homes", "Tricon Residential", "Perry Homes", "Risewell Homes", "DRB Homes", "Stylecraft"], "labelAnchor": "start", "labelY": -10},
  {"slug": "austin", "city": "Austin", "name": "Austin", "state": "TX", "stateName": "Texas", "region": "central", "coords": [-97.74, 30.27], "blurb": "Austin metro and Hill Country: strong spec and QMI demand.", "areas": ["Georgetown", "Leander", "Liberty Hill", "Cedar Park", "Kyle", "Marble Falls"], "builders": ["Highland Homes", "Coventry Homes", "Toll Brothers", "Risewell Homes", "Drees Homes", "Pacesetter Homes", "Tricon Residential"], "labelAnchor": "middle", "labelY": -13},
  {"slug": "san-antonio", "city": "San Antonio", "name": "San Antonio", "state": "TX", "stateName": "Texas", "region": "central", "coords": [-98.49, 29.42], "blurb": "San Antonio and South Texas builders.", "areas": ["Schertz", "Boerne", "Cibolo", "Bulverde", "Castroville", "Universal City"], "builders": ["Rhodes Enterprises", "Beazer Homes", "Coventry Homes", "Toll Brothers"], "labelAnchor": "end", "labelY": -10},
  {"slug": "nashville", "city": "Nashville", "name": "Nashville", "state": "TN", "stateName": "Tennessee", "region": "central", "coords": [-86.78, 36.16], "blurb": "Middle Tennessee: Nashville and Williamson County communities.", "areas": ["Franklin", "Williamson County"], "builders": ["Toll Brothers"], "labelAnchor": "end", "labelY": -10},
  {"slug": "tampa", "city": "Tampa", "name": "Tampa Bay", "state": "FL", "stateName": "Florida", "region": "east", "coords": [-82.46, 27.95], "blurb": "Tampa Bay and the Gulf Coast: Florida's western growth corridor.", "areas": ["Lakewood Ranch", "Parrish", "Palm Harbor", "Venice", "Apollo Beach", "Wimauma"], "builders": ["Kolter Homes", "Toll Brothers", "Perry Homes", "Homes by WestBay"], "labelAnchor": "end", "labelY": -10},
  {"slug": "orlando", "city": "Orlando", "name": "Orlando", "state": "FL", "stateName": "Florida", "region": "east", "coords": [-81.38, 28.54], "blurb": "Central Florida: one of the busiest new home markets in the U.S.", "areas": ["DeLand", "Lady Lake", "Tavares", "Oviedo", "Sanford", "Apopka"], "builders": ["Kolter Homes", "Beazer Homes", "Toll Brothers"], "labelAnchor": "start", "labelY": -10},
  {"slug": "miami", "city": "Miami", "name": "Miami", "state": "FL", "stateName": "Florida", "region": "east", "coords": [-80.19, 25.76], "blurb": "South Florida: luxury, production, and waterfront communities.", "areas": ["Port St. Lucie", "Palm Beach Gardens", "Loxahatchee", "Westlake", "Parkland", "Boca Raton"], "builders": ["Kolter Homes", "Toll Brothers"], "labelAnchor": "start", "labelY": -10},
  {"slug": "jacksonville", "city": "Jacksonville", "name": "Jacksonville", "state": "FL", "stateName": "Florida", "region": "east", "coords": [-81.66, 30.33], "blurb": "Northeast Florida: rapidly growing Jacksonville metro builders.", "areas": ["St. Augustine", "Ponte Vedra", "St. Johns"], "builders": ["Toll Brothers", "Perry Homes", "Dream Finders Homes"], "labelAnchor": "start", "labelY": -10},
  {"slug": "atlanta", "city": "Atlanta", "name": "Atlanta", "state": "GA", "stateName": "Georgia", "region": "east", "coords": [-84.39, 33.75], "blurb": "Metro Atlanta and suburban Georgia: active DIG market.", "areas": ["Hoschton", "Cumming", "Raymond", "Monroe", "Newnan", "Palmetto"], "builders": ["Kolter Homes", "Beazer Homes", "Empire Communities", "Dream Finders Homes", "EMC Homes", "Toll Brothers", "Traton Homes"], "labelAnchor": "end", "labelY": -10},
  {"slug": "charleston", "city": "Charleston", "name": "Charleston", "state": "SC", "stateName": "South Carolina", "region": "east", "coords": [-79.94, 32.78], "blurb": "Lowcountry and coastal Carolina builders.", "areas": ["Summerville", "Johns Island", "Goose Creek"], "builders": ["Mungo Homes", "Kolter Homes", "Beazer Homes"], "labelAnchor": "start", "labelY": -10},
  {"slug": "charlotte", "city": "Charlotte", "name": "Charlotte", "state": "NC", "stateName": "North Carolina", "region": "east", "coords": [-80.84, 35.23], "blurb": "Charlotte metro and Lake Norman corridor.", "areas": ["Locust", "Indian Land", "Monroe", "Huntersville", "Mooresville"], "builders": ["Kolter Homes", "Mungo Homes", "Toll Brothers", "Tricon Residential"], "labelAnchor": "end", "labelY": -10},
  {"slug": "raleigh", "city": "Raleigh", "name": "Raleigh-Durham", "state": "NC", "stateName": "North Carolina", "region": "east", "coords": [-78.64, 35.78], "blurb": "Triangle and Research Triangle Park: strong spec and model home demand.", "areas": ["Youngsville", "Durham", "Lillington", "Wendell", "Apex", "Clayton"], "builders": ["Caviness & Cates Communities", "Toll Brothers", "Beazer Homes", "Homes By Dickerson", "Chesapeake Homes", "Mungo Homes", "Garman Homes"], "labelAnchor": "start", "labelY": -10},
  {"slug": "columbus", "city": "Columbus", "name": "Columbus", "state": "OH", "stateName": "Ohio", "region": "east", "coords": [-82.99, 39.96], "blurb": "Central Ohio: Columbus metro new home builders.", "areas": ["Dublin", "Powell", "New Albany"], "builders": ["M/I Homes", "Thrive Companies"], "labelAnchor": "start", "labelY": -10},
  {"slug": "lehigh-valley", "city": "Lehigh Valley", "name": "Lehigh Valley", "inName": "the Lehigh Valley", "state": "PA", "stateName": "Pennsylvania", "region": "east", "coords": [-75.47, 40.6], "blurb": "Eastern Pennsylvania: Allentown, Bethlehem and Easton communities.", "areas": ["Schnecksville", "Easton"], "builders": ["Tuskes Homes"], "labelAnchor": "start", "labelY": -10},
  {"slug": "gettysburg", "city": "Gettysburg", "name": "Gettysburg", "state": "PA", "stateName": "Pennsylvania", "region": "east", "coords": [-77.23, 39.83], "blurb": "South central Pennsylvania: Adams County and the Gettysburg area.", "areas": ["Biglerville", "Adams County"], "builders": ["S&A Homes"], "labelAnchor": "end", "labelY": -10},
] as Market[];

export const marketBySlug = (slug: string) => markets.find((m) => m.slug === slug);
export const marketsInRegion = (region: RegionId) => markets.filter((m) => m.region === region);
/** "Dallas-Fort Worth", or "the San Francisco Bay Area" where the name needs an article. */
export const inName = (m: Market) => m.inName ?? m.name;
