"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

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
  west:     { base: "#e8e8f0", active: "#c4c4d8" },
  mountain: { base: "#e4e8ec", active: "#bcc4cc" },
  central:  { base: "#dde0e8", active: "#b0b8cc" },
  east:     { base: "#d8dce8", active: "#a8b0c8" },
};

const regionMeta: Record<string, { label: string; subtitle: string; markets: number; blurb: string; href: string }> = {
  west:     { label: "West",     subtitle: "CA, OR, WA, NV",          markets: 9,  blurb: "Pacific Coast to the Great Basin — DIG's largest coverage zone.",      href: "/results?region=west"     },
  mountain: { label: "Mountain", subtitle: "ID, UT, CO, AZ",          markets: 4,  blurb: "Mountain West communities from the Rockies to the Sonoran Desert.",    href: "/results?region=mountain" },
  central:  { label: "Central",  subtitle: "TX, OK, LA",              markets: 4,  blurb: "South Central markets anchored by DIG's Dallas headquarters.",         href: "/results?region=central"  },
  east:     { label: "East",     subtitle: "FL, GA, SC, NC, OH",      markets: 9,  blurb: "Southeast to the Mid-Atlantic — Florida growth corridors and beyond.", href: "/results?region=east"     },
};

const regionMetaList = [
  { id: "west",     ...regionMeta["west"]     },
  { id: "mountain", ...regionMeta["mountain"] },
  { id: "central",  ...regionMeta["central"]  },
  { id: "east",     ...regionMeta["east"]     },
];

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
  { coords: [-122.33, 47.61], city: "Seattle",     region: "west",     blurb: "Pacific Northwest — WA's fastest-growing new home corridors.",      labelAnchor: "end",    labelY: -10 },
  { coords: [-122.68, 45.52], city: "Portland",    region: "west",     blurb: "Pacific Northwest — OR/WA border markets and metro Portland.",       labelAnchor: "end",    labelY: -10 },
  { coords: [-121.49, 38.58], city: "Sacramento",  region: "west",     blurb: "DIG's West Coast headquarters. Central Valley coverage hub.",        isOffice: true,        labelAnchor: "end",    labelY: -10 },
  { coords: [-122.03, 37.54], city: "Bay Area",    region: "west",     blurb: "Bay Area and Silicon Valley homebuilders.",                          labelAnchor: "end",    labelY: -10 },
  { coords: [-118.24, 34.05], city: "Los Angeles", region: "west",     blurb: "Greater LA metro production and luxury communities.",                labelAnchor: "end",    labelY: -10 },
  { coords: [-117.82, 33.68], city: "Orange County", region: "west",    blurb: "Orange County and Inland Empire new home communities.",              labelAnchor: "start",  labelY:  13 },
  { coords: [-119.77, 36.74], city: "Fresno",      region: "west",     blurb: "Central Valley growth corridor — one of California's fastest-growing new home markets.", labelAnchor: "start", labelY: -10 },
  { coords: [-115.14, 36.17], city: "Las Vegas",   region: "west",     blurb: "Nevada's largest new home market — high-volume spec and master plan.", labelAnchor: "start", labelY: -10 },
  { coords: [-119.81, 39.53], city: "Reno",        region: "west",     blurb: "Northern Nevada — Reno/Sparks metro and Lake Tahoe corridor.",       labelAnchor: "start",  labelY: -10 },

  // Mountain (4)
  { coords: [-116.20, 43.62], city: "Boise",       region: "mountain", blurb: "Idaho's fastest-growing metro — Treasure Valley builders.",          labelAnchor: "start",  labelY: -10 },
  { coords: [-111.89, 40.76], city: "Salt Lake City", region: "mountain", blurb: "Wasatch Front communities and Utah's growth markets.",             labelAnchor: "start",  labelY: -10 },
  { coords: [-104.99, 39.74], city: "Denver",      region: "mountain", blurb: "Colorado Front Range — Denver metro and mountain corridor builders.", labelAnchor: "start",  labelY: -10 },
  { coords: [-112.07, 33.45], city: "Phoenix",     region: "mountain", blurb: "Greater Phoenix — one of the nation's highest-volume new home markets.", labelAnchor: "end", labelY: -10 },

  // Central (4)
  { coords: [-96.80, 32.78],  city: "Dallas",      region: "central",  blurb: "DIG's Central region headquarters. DFW is one of our most active markets.", isOffice: true, labelAnchor: "start", labelY: -10 },
  { coords: [-95.37, 29.76],  city: "Houston",     region: "central",  blurb: "Greater Houston — high-volume production builders and master-planned communities.", labelAnchor: "start", labelY: -10 },
  { coords: [-97.74, 30.27],  city: "Austin",      region: "central",  blurb: "Austin metro and Hill Country — strong spec and QMI demand.",        labelAnchor: "middle", labelY: -13 },
  { coords: [-98.49, 29.42],  city: "San Antonio", region: "central",  blurb: "San Antonio and South Texas builders.",                              labelAnchor: "end",    labelY: -10 },

  // East (11)
  { coords: [-82.46, 27.95],  city: "Tampa",       region: "east",     blurb: "Tampa Bay and the Gulf Coast — Florida's western growth corridor.",  labelAnchor: "end",    labelY: -10 },
  { coords: [-81.38, 28.54],  city: "Orlando",     region: "east",     blurb: "Central Florida — one of the busiest new home markets in the U.S.",  labelAnchor: "start",  labelY: -10 },
  { coords: [-80.19, 25.76],  city: "Miami",       region: "east",     blurb: "South Florida — luxury, production, and waterfront communities.",    labelAnchor: "start",  labelY: -10 },
  { coords: [-81.66, 30.33],  city: "Jacksonville",region: "east",     blurb: "Northeast Florida — rapidly growing Jacksonville metro builders.",   labelAnchor: "start",  labelY: -10 },
  { coords: [-84.39, 33.75],  city: "Atlanta",     region: "east",     blurb: "Metro Atlanta and suburban Georgia — active DIG market.",            labelAnchor: "end",    labelY: -10 },
  { coords: [-79.94, 32.78],  city: "Charleston",  region: "east",     blurb: "Lowcountry and coastal Carolina builders.",                          labelAnchor: "start",  labelY: -10 },
  { coords: [-80.84, 35.23],  city: "Charlotte",   region: "east",     blurb: "Charlotte metro and Lake Norman corridor.",                          labelAnchor: "end",    labelY: -10 },
  { coords: [-78.64, 35.78],  city: "Raleigh",     region: "east",     blurb: "Triangle and Research Triangle Park — strong spec and model home demand.", labelAnchor: "start", labelY: -10 },
  { coords: [-82.99, 39.96],  city: "Columbus",    region: "east",     blurb: "Central Ohio — Columbus metro new home builders.",                   labelAnchor: "start",  labelY: -10 },
];

export function RegionMap() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [selectedPin, setSelectedPin] = useState<MarketPin | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const visiblePins = activeRegion
    ? marketPins.filter((p) => p.region === activeRegion)
    : marketPins;

  const hoveredPin = hoveredCity ? marketPins.find((p) => p.city === hoveredCity) : null;

  return (
    <div className="relative">
      <style>{`
        @media (max-width: 640px) { .map-city-label { display: none; } }
      `}</style>

      {/* Map container — tracks mouse for hover tooltip */}
      <div className="relative" onMouseMove={handleMouseMove} onMouseLeave={() => setMousePos(null)}>
        <ComposableMap
          projection="geoAlbersUsa"
          projectionConfig={{ scale: 1000 }}
          width={800}
          height={500}
          style={{ width: "100%", height: "auto" }}
        >
          {/* State fills */}
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const fips = geo.id as string;
                const region = stateRegion[fips];
                if (!region) return null;
                const colors = regionColors[region];
                const isHighlighted = activeRegion === region;
                const isDimmed = activeRegion !== null && !isHighlighted;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isHighlighted ? colors.active : isDimmed ? "#efefef" : colors.base}
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

          {/* Market pins */}
          {visiblePins.map((pin) => {
            const isHovered = hoveredCity === pin.city;
            const isSelected = selectedPin?.city === pin.city;
            const anchor = pin.labelAnchor ?? "start";
            const labelX = anchor === "end" ? -8 : anchor === "middle" ? 0 : 8;

            return (
              <Marker key={pin.city} coordinates={pin.coords}>
                <g
                  onMouseEnter={() => setHoveredCity(pin.city)}
                  onMouseLeave={() => setHoveredCity(null)}
                  onClick={() => setSelectedPin(isSelected ? null : pin)}
                  style={{ cursor: "pointer" }}
                >
                  {pin.isOffice ? (
                    <>
                      <circle r={isSelected ? 10 : 7} fill="#6A5ACD" opacity={0.15} style={{ transition: "r 0.15s ease" }} />
                      <circle r={isSelected ? 5 : 4} fill={isSelected ? "#5848B5" : "#6A5ACD"} stroke="#ffffff" strokeWidth={1.5} style={{ transition: "all 0.15s ease" }} />
                      <circle r={1.5} fill="#ffffff" />
                    </>
                  ) : (
                    <>
                      {isSelected && <circle r={9} fill="#6A5ACD" opacity={0.12} />}
                      <circle
                        r={isHovered || isSelected ? 5 : 3.5}
                        fill={isSelected ? "#5848B5" : isHovered ? "#5848B5" : "#6A5ACD"}
                        stroke="#ffffff"
                        strokeWidth={1.5}
                        style={{ transition: "all 0.15s ease" }}
                      />
                    </>
                  )}

                  <text
                    className="map-city-label"
                    textAnchor={anchor}
                    x={labelX}
                    y={pin.labelY ?? -10}
                    fontSize={isHovered || isSelected ? 10 : 8.5}
                    fontWeight={isHovered || isSelected || pin.isOffice ? 600 : 400}
                    fill={isSelected ? "#3A3ACD" : isHovered ? "#222" : "#555"}
                    style={{ pointerEvents: "none", transition: "all 0.15s ease" }}
                  >
                    {pin.city}
                  </text>
                </g>
              </Marker>
            );
          })}
        </ComposableMap>

        {/* Hover tooltip — follows cursor */}
        <AnimatePresence>
          {hoveredPin && mousePos && !selectedPin && (
            <motion.div
              key={hoveredPin.city}
              initial={{ opacity: 0, scale: 0.95, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.12 }}
              className="pointer-events-none absolute z-20 w-44 rounded-lg border border-border-light bg-white px-3 py-2.5 shadow-lg"
              style={{
                left: mousePos.x + 14,
                top: mousePos.y - 36,
              }}
            >
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
                <span className="text-xs font-semibold text-text-dark">{hoveredPin.city}</span>
                {hoveredPin.isOffice && (
                  <span className="rounded-full bg-accent/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-accent">Office</span>
                )}
              </div>
              <p className="mt-1 text-[10px] leading-snug text-text-muted capitalize">{regionMeta[hoveredPin.region].label} Region</p>
              <p className="mt-1 text-[10px] text-accent/80">Click to learn more →</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Click panel — slides in below map */}
      <AnimatePresence>
        {selectedPin && (
          <motion.div
            key={selectedPin.city}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="mt-4 overflow-hidden rounded-xl border border-accent/20 bg-white shadow-sm"
          >
            <div className="flex items-start justify-between gap-4 p-5">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-base font-semibold text-text-dark">{selectedPin.city}</h4>
                  {selectedPin.isOffice ? (
                    <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">DIG Office</span>
                  ) : (
                    <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">Active Market</span>
                  )}
                  <span className="text-[10px] font-medium uppercase tracking-wider text-text-muted">
                    {regionMeta[selectedPin.region].label} Region
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-text-body">{selectedPin.blurb}</p>
                <Link
                  href={regionMeta[selectedPin.region].href}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                >
                  Explore {regionMeta[selectedPin.region].label} results <span aria-hidden="true">→</span>
                </Link>
              </div>
              <button
                onClick={() => setSelectedPin(null)}
                className="flex-shrink-0 rounded-full p-1 text-text-muted hover:bg-bg-surface hover:text-text-dark"
                aria-label="Close"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
        {regionMetaList.map((region) => (
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
          Active market
        </span>
        <span>26 U.S. markets + growing</span>
      </div>
    </div>
  );
}
