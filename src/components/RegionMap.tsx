"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { markets } from "@/lib/markets";
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
  west:     { base: "#eaeaf4", active: "#c8c8e0" }, // lightest — cool lavender tint
  mountain: { base: "#dcdde8", active: "#b8bace" }, // one step darker
  central:  { base: "#d0d2e0", active: "#abadc4" }, // medium
  east:     { base: "#c2c5d4", active: "#9da0b6" }, // darkest — clearly distinct
};

// Same four steps for a dark page: states sit just above the #121212 background.
const regionColorsDark: Record<string, { base: string; active: string }> = {
  west:     { base: "#26262e", active: "#4a4670" },
  mountain: { base: "#2e2e38", active: "#544f80" },
  central:  { base: "#363642", active: "#5e5890" },
  east:     { base: "#3f3f4d", active: "#6962a0" },
};

interface RegionInfo {
  label: string;
  subtitle: string;
  markets: number;
  href: string;
}

const regionInfo: Record<string, RegionInfo> = {
  west:     { label: "West",     subtitle: "CA, OR, WA, NV",         markets: 9,  href: "/gallery/models?region=West" },
  mountain: { label: "Mountain", subtitle: "ID, UT, CO, AZ",         markets: 4,  href: "/gallery/models?region=Mountain" },
  central:  { label: "Central",  subtitle: "TX, TN",                 markets: 5,  href: "/gallery/models?region=Central" },
  east:     { label: "East",     subtitle: "FL, GA, SC, NC, OH",     markets: 9,  href: "/gallery/models?region=East" },
};

const regionList = Object.entries(regionInfo).map(([id, v]) => ({ id, ...v }));

const marketPins = markets;

/** `linkPins` makes each pin open its market page. Leave it off where the map is only an illustration. */
export function RegionMap({ dark = false, linkPins = false }: { dark?: boolean; linkPins?: boolean } = {}) {
  const router = useRouter();
  const palette = dark ? regionColorsDark : regionColors;
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
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
                const colors = palette[region];
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={
                      activeRegion === region ? colors.active
                      : activeRegion !== null   ? (dark ? "#1e1e22" : "#efefef")
                      : colors.base
                    }
                    stroke={dark ? "#121212" : "#ffffff"}
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
            const anchor = pin.labelAnchor ?? "start";
            const labelX = anchor === "end" ? -8 : anchor === "middle" ? 0 : 8;

            return (
              <Marker key={pin.city} coordinates={pin.coords}>
                {/* Pins are plain dots unless linkPins is set, in which case each opens its market page. */}
                <g
                  style={linkPins ? { cursor: "pointer" } : { pointerEvents: "none" }}
                  onClick={linkPins ? () => router.push(`/markets/${pin.slug}`) : undefined}
                  role={linkPins ? "link" : undefined}
                  aria-label={linkPins ? `${pin.name} market page` : undefined}
                >
                  {linkPins && <circle r={11} fill="transparent" />}
                  {pin.isOffice ? (
                    <>
                      <circle r={7} fill={dark ? "#857AE0" : "#6A5ACD"} opacity={dark ? 0.3 : 0.15} />
                      <circle r={4} fill={dark ? "#857AE0" : "#6A5ACD"} stroke={dark ? "#121212" : "#ffffff"} strokeWidth={1.5} />
                      <circle r={1.5} fill="#ffffff" />
                    </>
                  ) : (
                    <circle r={3.5} fill={dark ? "#857AE0" : "#6A5ACD"} stroke={dark ? "#121212" : "#ffffff"} strokeWidth={1.5} />
                  )}
                  <text
                    className="map-city-label"
                    textAnchor={anchor}
                    x={labelX}
                    y={pin.labelY ?? -10}
                    fontSize={8.5}
                    fontWeight={pin.isOffice ? 600 : 400}
                    fill={dark ? "#C8C8C8" : "#555"}
                  >
                    {pin.city}
                  </text>
                </g>
              </Marker>
            );
          })}
        </ComposableMap>
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
                ? dark ? "border-accent bg-accent/20 text-text-light" : "border-accent bg-bg-dark text-text-light"
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
          Active market: click to see the work
        </span>
        <span>27 U.S. markets + growing</span>
      </div>
    </div>
  );
}
