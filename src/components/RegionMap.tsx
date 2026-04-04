"use client";

import { useState } from "react";
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

const regionMeta = [
  { id: "west",     label: "West",     subtitle: "CA, OR, NV",           markets: 7  },
  { id: "mountain", label: "Mountain", subtitle: "ID, UT, CO, AZ, OR",   markets: 5  },
  { id: "central",  label: "Central",  subtitle: "TX, OK, LA",           markets: 4  },
  { id: "east",     label: "East",     subtitle: "FL, GA, SC, NC, OH, DC", markets: 11 },
];

interface MarketPin {
  coords: [number, number];
  city: string;
  region: string;
  isOffice?: boolean;
  labelAnchor?: "start" | "end" | "middle";
  labelY?: number;
}

// 27 DIG markets — Sacramento + Dallas are offices
const marketPins: MarketPin[] = [
  // West (7)
  { coords: [-121.49, 38.58], city: "Sacramento",  region: "west",     isOffice: true, labelAnchor: "end",    labelY: -10 },
  { coords: [-122.03, 37.54], city: "Bay Area",    region: "west",                     labelAnchor: "end",   labelY: -10 },
  { coords: [-118.24, 34.05], city: "Los Angeles", region: "west",                     labelAnchor: "end",   labelY: -10 },
  { coords: [-117.82, 33.68], city: "OC",          region: "west",                     labelAnchor: "start", labelY:  13 },
  { coords: [-119.77, 36.74], city: "Fresno",      region: "west",                     labelAnchor: "start", labelY: -10 },
  { coords: [-115.14, 36.17], city: "Las Vegas",   region: "west",                     labelAnchor: "start", labelY: -10 },
  { coords: [-119.81, 39.53], city: "Reno",        region: "west",                     labelAnchor: "start", labelY: -10 },

  // Mountain (5 — Portland sits here timezone-wise)
  { coords: [-122.68, 45.52], city: "Portland",    region: "mountain",                 labelAnchor: "end",   labelY: -10 },
  { coords: [-116.20, 43.62], city: "Boise",       region: "mountain",                 labelAnchor: "start", labelY: -10 },
  { coords: [-111.89, 40.76], city: "SLC",         region: "mountain",                 labelAnchor: "start", labelY: -10 },
  { coords: [-104.99, 39.74], city: "Denver",      region: "mountain",                 labelAnchor: "start", labelY: -10 },
  { coords: [-112.07, 33.45], city: "Phoenix",     region: "mountain",                 labelAnchor: "end",   labelY: -10 },

  // Central (4)
  { coords: [-96.80, 32.78],  city: "Dallas",      region: "central",  isOffice: true, labelAnchor: "start",  labelY: -10 },
  { coords: [-95.37, 29.76],  city: "Houston",     region: "central",                  labelAnchor: "start",  labelY: -10 },
  { coords: [-97.74, 30.27],  city: "Austin",      region: "central",                  labelAnchor: "middle", labelY: -13 },
  { coords: [-98.49, 29.42],  city: "San Antonio", region: "central",                  labelAnchor: "end",    labelY: -10 },

  // East (11)
  { coords: [-82.46, 27.95],  city: "Tampa",        region: "east",                    labelAnchor: "end",    labelY: -10 },
  { coords: [-81.38, 28.54],  city: "Orlando",      region: "east",                    labelAnchor: "start",  labelY: -10 },
  { coords: [-80.19, 25.76],  city: "Miami",        region: "east",                    labelAnchor: "start",  labelY: -10 },
  { coords: [-81.66, 30.33],  city: "Jacksonville", region: "east",                    labelAnchor: "start",  labelY: -10 },
  { coords: [-84.39, 33.75],  city: "Atlanta",      region: "east",                    labelAnchor: "end",    labelY: -10 },
  { coords: [-79.94, 32.78],  city: "Charleston",   region: "east",                    labelAnchor: "start",  labelY: -10 },
  // NC trio — staggered to avoid overlap: Charlotte left, Greensboro up, Raleigh right-below
  { coords: [-80.84, 35.23],  city: "Charlotte",    region: "east",                    labelAnchor: "end",    labelY: -10 },
  { coords: [-79.79, 36.07],  city: "Greensboro",   region: "east",                    labelAnchor: "middle", labelY: -13 },
  { coords: [-78.64, 35.78],  city: "Raleigh",      region: "east",                    labelAnchor: "start",  labelY:  13 },
  { coords: [-82.99, 39.96],  city: "Columbus",     region: "east",                    labelAnchor: "start",  labelY: -10 },
  { coords: [-77.04, 38.91],  city: "DC",           region: "east",                    labelAnchor: "start",  labelY: -10 },
];

export function RegionMap() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const visiblePins = activeRegion
    ? marketPins.filter((p) => p.region === activeRegion)
    : marketPins;

  return (
    <div className="relative">
      {/* Hide labels on mobile via inline style tag */}
      <style>{`
        @media (max-width: 640px) {
          .map-city-label { display: none; }
        }
      `}</style>

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

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={
                    activeRegion === region
                      ? colors.active
                      : activeRegion === null
                      ? colors.base
                      : "#efefef"
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

        {/* Market pins */}
        {visiblePins.map((pin) => {
          const isHovered = hoveredCity === pin.city;
          const isOffice = pin.isOffice;
          const anchor = pin.labelAnchor ?? "start";
          const labelX = anchor === "end" ? -8 : anchor === "middle" ? 0 : 8;

          return (
            <Marker key={pin.city} coordinates={pin.coords}>
              <g
                onMouseEnter={() => setHoveredCity(pin.city)}
                onMouseLeave={() => setHoveredCity(null)}
                style={{ cursor: "pointer" }}
              >
                {/* Office: larger filled pin with halo; Market: small dot */}
                {isOffice ? (
                  <>
                    <circle r={7} fill="#6A5ACD" opacity={0.12} />
                    <circle r={4} fill="#6A5ACD" stroke="#ffffff" strokeWidth={1.5} />
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

                {/* City label — hidden on mobile via .map-city-label */}
                <text
                  className="map-city-label"
                  textAnchor={anchor}
                  x={labelX}
                  y={pin.labelY ?? -10}
                  fontSize={isHovered ? 10 : 8.5}
                  fontWeight={isHovered || isOffice ? 600 : 400}
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

      {/* Guadalajara international office */}
      <div className="mt-3 flex justify-center">
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
        {regionMeta.map((region) => (
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
            <p className="text-sm font-semibold uppercase tracking-widest">
              {region.label}
            </p>
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
        <span>27 U.S. markets + Guadalajara</span>
      </div>
    </div>
  );
}
