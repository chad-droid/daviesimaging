"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { DynamicImage } from "@/components/DynamicImage";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// Derive a consistent slot ID from a city name: "Salt Lake City" → "market-salt-lake-city"
function citySlot(city: string) {
  return `market-${city.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`;
}

const stateRegion: Record<string, string> = {
  "53": "west", "41": "west", "06": "west", "32": "west",
  "30": "mountain", "16": "mountain", "56": "mountain", "49": "mountain",
  "08": "mountain", "04": "mountain", "35": "mountain",
  "38": "central", "46": "central", "31": "central", "20": "central",
  "27": "central", "19": "central", "29": "central", "55": "central",
  "17": "central", "40": "central", "48": "central", "05": "central",
  "22": "central", "28": "central", "01": "central", "47": "central",
  "26": "east", "18": "east", "39": "east", "21": "east", "54": "east",
  "51": "east", "37": "east", "45": "east", "13": "east", "12": "east",
  "42": "east", "36": "east", "34": "east", "09": "east", "44": "east",
  "25": "east", "50": "east", "33": "east", "23": "east", "24": "east",
  "10": "east", "11": "east",
};

const regionColors: Record<string, { base: string; active: string }> = {
  west:     { base: "#eaeaf4", active: "#c8c8e0" }, // lightest — cool lavender tint
  mountain: { base: "#dcdde8", active: "#b8bace" }, // one step darker
  central:  { base: "#d0d2e0", active: "#abadc4" }, // medium
  east:     { base: "#c2c5d4", active: "#9da0b6" }, // darkest — clearly distinct
};

interface RegionInfo {
  label: string;
  subtitle: string;
  markets: number;
  href: string;
}

const regionInfo: Record<string, RegionInfo> = {
  west:     { label: "West",     subtitle: "CA, OR, WA, NV",         markets: 9,  href: "/results?region=west"     },
  mountain: { label: "Mountain", subtitle: "ID, UT, CO, AZ",         markets: 4,  href: "/results?region=mountain" },
  central:  { label: "Central",  subtitle: "TX",                     markets: 4,  href: "/results?region=central"  },
  east:     { label: "East",     subtitle: "FL, GA, SC, NC, OH",     markets: 9,  href: "/results?region=east"     },
};

const regionList = Object.entries(regionInfo).map(([id, v]) => ({ id, ...v }));

interface MarketPin {
  coords: [number, number];
  city: string;
  region: string;
  isOffice?: boolean;
  blurb: string;
  labelAnchor?: "start" | "end" | "middle";
  labelY?: number;
}

const marketPins: MarketPin[] = [
  // West (9)
  { coords: [-122.33, 47.61], city: "Seattle",      region: "west",     blurb: "Pacific Northwest — WA's fastest-growing new home corridors.",           labelAnchor: "end",    labelY: -10 },
  { coords: [-122.68, 45.52], city: "Portland",     region: "west",     blurb: "Pacific Northwest — OR/WA border markets and metro Portland.",            labelAnchor: "end",    labelY: -10 },
  { coords: [-121.49, 38.58], city: "Sacramento",   region: "west",     blurb: "DIG's West Coast headquarters. Central Valley coverage hub.",             isOffice: true,        labelAnchor: "end",    labelY: -10 },
  { coords: [-122.03, 37.54], city: "Bay Area",     region: "west",     blurb: "Bay Area and Silicon Valley homebuilders.",                               labelAnchor: "end",    labelY: -10 },
  { coords: [-118.24, 34.05], city: "Los Angeles",  region: "west",     blurb: "Greater LA metro production and luxury communities.",                     labelAnchor: "end",    labelY: -10 },
  { coords: [-117.82, 33.68], city: "Orange County",region: "west",     blurb: "Orange County and Inland Empire new home communities.",                   labelAnchor: "start",  labelY:  14 },
  { coords: [-119.77, 36.74], city: "Fresno",       region: "west",     blurb: "Central Valley growth corridor — one of California's fastest-growing new home markets.", labelAnchor: "start", labelY: -10 },
  { coords: [-115.14, 36.17], city: "Las Vegas",    region: "west",     blurb: "Nevada's largest new home market — high-volume spec and master plan.",    labelAnchor: "start",  labelY: -10 },
  { coords: [-119.81, 39.53], city: "Reno",         region: "west",     blurb: "Northern Nevada — Reno/Sparks metro and Lake Tahoe corridor.",            labelAnchor: "start",  labelY: -10 },
  // Mountain (4)
  { coords: [-116.20, 43.62], city: "Boise",        region: "mountain", blurb: "Idaho's fastest-growing metro — Treasure Valley builders.",               labelAnchor: "start",  labelY: -10 },
  { coords: [-111.89, 40.76], city: "Salt Lake City",region: "mountain",blurb: "Wasatch Front communities and Utah's growth markets.",                    labelAnchor: "start",  labelY: -10 },
  { coords: [-104.99, 39.74], city: "Denver",       region: "mountain", blurb: "Colorado Front Range — Denver metro and mountain corridor builders.",      labelAnchor: "start",  labelY: -10 },
  { coords: [-112.07, 33.45], city: "Phoenix",      region: "mountain", blurb: "Greater Phoenix — one of the nation's highest-volume new home markets.",   labelAnchor: "start",  labelY: -10 },
  // Central (4)
  { coords: [-96.80, 32.78],  city: "Dallas",       region: "central",  blurb: "DIG's Central region headquarters. DFW is one of our most active markets.", isOffice: true,      labelAnchor: "start",  labelY: -10 },
  { coords: [-95.37, 29.76],  city: "Houston",      region: "central",  blurb: "Greater Houston — high-volume production builders and master-planned communities.", labelAnchor: "start", labelY: -10 },
  { coords: [-97.74, 30.27],  city: "Austin",       region: "central",  blurb: "Austin metro and Hill Country — strong spec and QMI demand.",              labelAnchor: "middle", labelY: -13 },
  { coords: [-98.49, 29.42],  city: "San Antonio",  region: "central",  blurb: "San Antonio and South Texas builders.",                                   labelAnchor: "end",    labelY: -10 },
  // East (9)
  { coords: [-82.46, 27.95],  city: "Tampa",        region: "east",     blurb: "Tampa Bay and the Gulf Coast — Florida's western growth corridor.",        labelAnchor: "end",    labelY: -10 },
  { coords: [-81.38, 28.54],  city: "Orlando",      region: "east",     blurb: "Central Florida — one of the busiest new home markets in the U.S.",        labelAnchor: "start",  labelY: -10 },
  { coords: [-80.19, 25.76],  city: "Miami",        region: "east",     blurb: "South Florida — luxury, production, and waterfront communities.",          labelAnchor: "start",  labelY: -10 },
  { coords: [-81.66, 30.33],  city: "Jacksonville", region: "east",     blurb: "Northeast Florida — rapidly growing Jacksonville metro builders.",         labelAnchor: "start",  labelY: -10 },
  { coords: [-84.39, 33.75],  city: "Atlanta",      region: "east",     blurb: "Metro Atlanta and suburban Georgia — active DIG market.",                  labelAnchor: "end",    labelY: -10 },
  { coords: [-79.94, 32.78],  city: "Charleston",   region: "east",     blurb: "Lowcountry and coastal Carolina builders.",                               labelAnchor: "start",  labelY: -10 },
  { coords: [-80.84, 35.23],  city: "Charlotte",    region: "east",     blurb: "Charlotte metro and Lake Norman corridor.",                               labelAnchor: "end",    labelY: -10 },
  { coords: [-78.64, 35.78],  city: "Raleigh",      region: "east",     blurb: "Triangle and Research Triangle Park — strong spec and model home demand.", labelAnchor: "start",  labelY: -10 },
  { coords: [-82.99, 39.96],  city: "Columbus",     region: "east",     blurb: "Central Ohio — Columbus metro new home builders.",                        labelAnchor: "start",  labelY: -10 },
];

export function RegionMap() {
  const router = useRouter();
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [hoveredPin, setHoveredPin] = useState<MarketPin | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const visiblePins = activeRegion
    ? marketPins.filter((p) => p.region === activeRegion)
    : marketPins;

  return (
    <div className="relative">
      <style>{`
        @media (max-width: 640px) { .map-city-label { display: none; } }
      `}</style>

      {/* Map — tracks mouse position for tooltip */}
      <div
        className="relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { setMousePos(null); setHoveredPin(null); }}
      >
        <ComposableMap
          projection="geoAlbersUsa"
          projectionConfig={{ scale: 1000 }}
          width={800}
          height={500}
          style={{ width: "100%", height: "auto" }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const fips = geo.id as string;
                const region = stateRegion[fips];
                if (!region) return null;
                const colors = regionColors[region];
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={
                      activeRegion === region ? colors.active
                      : activeRegion !== null   ? "#efefef"
                      : colors.base
                    }
                    stroke="#ffffff"
                    strokeWidth={0.75}
                    style={{
                      default: { outline: "none", cursor: "pointer" },
                      hover:   { outline: "none", cursor: "pointer", fill: colors.active },
                      pressed: { outline: "none" },
                    }}
                    onClick={() => setActiveRegion(activeRegion === region ? null : region)}
                  />
                );
              })
            }
          </Geographies>

          {visiblePins.map((pin) => {
            const isHovered = hoveredPin?.city === pin.city;
            const anchor = pin.labelAnchor ?? "start";
            const labelX = anchor === "end" ? -8 : anchor === "middle" ? 0 : 8;

            return (
              <Marker key={pin.city} coordinates={pin.coords}>
                <g
                  onMouseEnter={() => setHoveredPin(pin)}
                  onMouseLeave={() => setHoveredPin(null)}
                  onClick={() => router.push(regionInfo[pin.region].href)}
                  style={{ cursor: "pointer" }}
                >
                  {pin.isOffice ? (
                    <>
                      <circle r={isHovered ? 9 : 7} fill="#6A5ACD" opacity={0.15} style={{ transition: "r 0.15s ease" }} />
                      <circle r={isHovered ? 5 : 4} fill="#6A5ACD" stroke="#ffffff" strokeWidth={1.5} style={{ transition: "r 0.15s ease" }} />
                      <circle r={1.5} fill="#ffffff" />
                    </>
                  ) : (
                    <circle
                      r={isHovered ? 5 : 3.5}
                      fill={isHovered ? "#5848B5" : "#6A5ACD"}
                      stroke="#ffffff"
                      strokeWidth={1.5}
                      style={{ transition: "all 0.15s ease" }}
                    />
                  )}
                  <text
                    className="map-city-label"
                    textAnchor={anchor}
                    x={labelX}
                    y={pin.labelY ?? -10}
                    fontSize={isHovered ? 10 : 8.5}
                    fontWeight={isHovered || pin.isOffice ? 600 : 400}
                    fill={isHovered ? "#222" : "#555"}
                    style={{ pointerEvents: "none", transition: "all 0.15s ease" }}
                  >
                    {pin.city}
                  </text>
                </g>
              </Marker>
            );
          })}
        </ComposableMap>

        {/* Hover card — thumbnail + city info */}
        <AnimatePresence>
          {hoveredPin && mousePos && (
            <motion.div
              key={hoveredPin.city}
              initial={{ opacity: 0, scale: 0.96, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 4 }}
              transition={{ duration: 0.14 }}
              className="pointer-events-none absolute z-20 w-52 overflow-hidden rounded-xl border border-border-light bg-white shadow-xl"
              style={{
                left: mousePos.x + 16,
                top: mousePos.y - 60,
              }}
            >
              {/* Thumbnail */}
              <div className="relative h-28 w-full bg-bg-surface">
                <DynamicImage
                  slotId={citySlot(hoveredPin.city)}
                  className="h-full w-full object-cover"
                  fallbackClass="h-full w-full bg-gradient-to-br from-bg-surface to-accent/10"
                  aspectRatio="16/9"
                />
                {/* Region badge overlaid on image */}
                <span className="absolute left-2 top-2 rounded-full bg-black/50 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                  {regionInfo[hoveredPin.region].label}
                </span>
              </div>

              {/* City info */}
              <div className="px-3 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-text-dark">{hoveredPin.city}</span>
                  {hoveredPin.isOffice && (
                    <span className="rounded-full bg-accent/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-accent">
                      Office
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-[10px] leading-snug text-text-muted">{hoveredPin.blurb}</p>
                <p className="mt-1.5 text-[10px] font-medium text-accent">
                  View {regionInfo[hoveredPin.region].label} results →
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Guadalajara callout */}
      <div className="mt-4 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5">
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-accent/15">
            <span className="h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="text-xs font-semibold text-accent">Guadalajara</span>
          <span className="text-xs text-text-muted">International Office</span>
        </div>
      </div>

      {/* Region filter tabs */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {regionList.map((region) => (
          <button
            key={region.id}
            onClick={() => setActiveRegion(activeRegion === region.id ? null : region.id)}
            onMouseEnter={() => setActiveRegion(region.id)}
            onMouseLeave={() => setActiveRegion(null)}
            className={`rounded-lg border p-4 text-center transition-all ${
              activeRegion === region.id
                ? "border-accent bg-bg-dark text-text-light"
                : "border-border-light hover:border-accent/40 hover:bg-accent/5"
            }`}
          >
            <p className="text-sm font-semibold uppercase tracking-widest">{region.label}</p>
            <p className={`mt-0.5 text-xs ${activeRegion === region.id ? "text-accent-secondary" : "text-text-muted"}`}>
              {region.subtitle}
            </p>
            <p className={`mt-1 text-[10px] font-medium tabular-nums ${activeRegion === region.id ? "text-white/60" : "text-text-muted"}`}>
              {region.markets} markets
            </p>
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-5 text-xs text-text-muted">
        <span className="flex items-center gap-1.5">
          <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent/15">
            <span className="h-2 w-2 rounded-full bg-accent" />
          </span>
          Office
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          Active market — click to explore
        </span>
        <span>26 U.S. markets + growing</span>
      </div>
    </div>
  );
}
