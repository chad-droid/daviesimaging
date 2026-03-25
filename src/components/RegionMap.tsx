"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// State FIPS → timezone region mapping (continental U.S. only)
const stateRegion: Record<string, string> = {
  // West (Pacific)
  "53": "west", // WA
  "41": "west", // OR
  "06": "west", // CA
  "32": "west", // NV
  // Mountain
  "30": "mountain", // MT
  "16": "mountain", // ID
  "56": "mountain", // WY
  "49": "mountain", // UT
  "08": "mountain", // CO
  "04": "mountain", // AZ
  "35": "mountain", // NM
  // Central
  "38": "central", // ND
  "46": "central", // SD
  "31": "central", // NE
  "20": "central", // KS
  "27": "central", // MN
  "19": "central", // IA
  "29": "central", // MO
  "55": "central", // WI
  "17": "central", // IL
  "40": "central", // OK
  "48": "central", // TX
  "05": "central", // AR
  "22": "central", // LA
  "28": "central", // MS
  "01": "central", // AL
  "47": "central", // TN
  // East (Eastern)
  "26": "east", // MI
  "18": "east", // IN
  "39": "east", // OH
  "21": "east", // KY
  "54": "east", // WV
  "51": "east", // VA
  "37": "east", // NC
  "45": "east", // SC
  "13": "east", // GA
  "12": "east", // FL
  "42": "east", // PA
  "36": "east", // NY
  "34": "east", // NJ
  "09": "east", // CT
  "44": "east", // RI
  "25": "east", // MA
  "50": "east", // VT
  "33": "east", // NH
  "23": "east", // ME
  "24": "east", // MD
  "10": "east", // DE
  "11": "east", // DC
};

const regionColors: Record<string, { fill: string; hover: string }> = {
  west:     { fill: "#e4e4e7", hover: "#a1a1aa" },
  mountain: { fill: "#d4d4d8", hover: "#8e8e9a" },
  central:  { fill: "#c4c4cc", hover: "#7c7c8a" },
  east:     { fill: "#b4b4be", hover: "#6a6a7a" },
};

const regionMeta: { id: string; label: string; states: string }[] = [
  { id: "west", label: "West", states: "WA, OR, CA, NV" },
  { id: "mountain", label: "Mountain", states: "MT, ID, WY, UT, CO, AZ, NM" },
  { id: "central", label: "Central", states: "ND, SD, NE, KS, MN, IA, MO, WI, IL, OK, TX, AR, LA, MS, AL, TN" },
  { id: "east", label: "East", states: "MI, IN, OH, KY, WV, VA, NC, SC, GA, FL, PA, NY, NJ, CT, RI, MA, VT, NH, ME, MD, DE" },
];

const marketPins: { coords: [number, number]; city: string; region: string }[] = [
  // West
  { coords: [-122.33, 47.61], city: "Seattle", region: "west" },
  { coords: [-122.68, 45.52], city: "Portland", region: "west" },
  { coords: [-122.42, 37.77], city: "San Francisco", region: "west" },
  { coords: [-118.24, 34.05], city: "Los Angeles", region: "west" },
  { coords: [-117.16, 32.72], city: "San Diego", region: "west" },
  // Mountain
  { coords: [-116.20, 43.62], city: "Boise", region: "mountain" },
  { coords: [-111.89, 40.76], city: "Salt Lake City", region: "mountain" },
  { coords: [-104.99, 39.74], city: "Denver", region: "mountain" },
  { coords: [-112.07, 33.45], city: "Phoenix", region: "mountain" },
  { coords: [-110.93, 32.22], city: "Tucson", region: "mountain" },
  // Central
  { coords: [-93.27, 44.98], city: "Minneapolis", region: "central" },
  { coords: [-87.63, 41.88], city: "Chicago", region: "central" },
  { coords: [-94.58, 39.10], city: "Kansas City", region: "central" },
  { coords: [-86.78, 36.16], city: "Nashville", region: "central" },
  { coords: [-96.80, 32.78], city: "Dallas", region: "central" },
  { coords: [-97.74, 30.27], city: "Austin", region: "central" },
  { coords: [-95.37, 29.76], city: "Houston", region: "central" },
  // East
  { coords: [-71.06, 42.36], city: "Boston", region: "east" },
  { coords: [-74.01, 40.71], city: "New York", region: "east" },
  { coords: [-75.17, 39.95], city: "Philadelphia", region: "east" },
  { coords: [-80.84, 35.23], city: "Charlotte", region: "east" },
  { coords: [-84.39, 33.75], city: "Atlanta", region: "east" },
  { coords: [-80.19, 25.76], city: "Miami", region: "east" },
  { coords: [-82.46, 27.95], city: "Tampa", region: "east" },
];

export function RegionMap() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  return (
    <div className="relative">
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
              if (!region) return null; // skip non-continental (AK, HI, territories)

              const colors = regionColors[region];

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={activeRegion === region ? colors.hover : colors.fill}
                  stroke="#ffffff"
                  strokeWidth={0.75}
                  style={{
                    default: { outline: "none", cursor: "pointer" },
                    hover: { outline: "none", cursor: "pointer", fill: colors.hover },
                    pressed: { outline: "none" },
                  }}
                  onMouseEnter={() => setActiveRegion(region)}
                  onMouseLeave={() => setActiveRegion(null)}
                  onClick={() => {
                    const label = regionMeta.find((r) => r.id === region)?.label;
                    if (label) window.location.href = `/work?region=${label}`;
                  }}
                />
              );
            })
          }
        </Geographies>

        {/* Market pins */}
        {marketPins.map((pin) => (
          <Marker key={pin.city} coordinates={pin.coords}>
            <circle
              r={activeRegion === pin.region || !activeRegion ? 4 : 2.5}
              fill={activeRegion === pin.region ? "#18181b" : "#52525b"}
              stroke="#ffffff"
              strokeWidth={1.5}
              className="transition-all duration-300"
            />
            {activeRegion === pin.region && (
              <text
                textAnchor="start"
                x={8}
                y={4}
                fontSize={10}
                fontWeight={500}
                fill="#3f3f46"
              >
                {pin.city}
              </text>
            )}
          </Marker>
        ))}
      </ComposableMap>

      {/* Region detail strip */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {regionMeta.map((region) => (
          <Link
            key={region.id}
            href={`/work?region=${region.label}`}
            className={`rounded-lg border p-4 text-center transition-all ${
              activeRegion === region.id
                ? "border-zinc-900 bg-bg-dark text-white"
                : "border-zinc-200 hover:border-accent-secondary"
            }`}
            onMouseEnter={() => setActiveRegion(region.id)}
            onMouseLeave={() => setActiveRegion(null)}
          >
            <p className="text-sm font-semibold uppercase tracking-widest">
              {region.label}
            </p>
            <p
              className={`mt-1 text-xs ${
                activeRegion === region.id ? "text-zinc-300" : "text-zinc-500"
              }`}
            >
              {region.states}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
