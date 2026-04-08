"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface LightboxImage {
  id: number | "video";
  url: string;
  thumb_url: string;
  filename: string;
  description: string | null;
  youtubeId?: string;
}

interface ProjectInfo {
  name: string;
  builder: string;
  city: string;
  state: string;
  pipeline: string;
  model_name: string;
  scope: string;
  deliverables: string;
  production_date: string;
  address: string;
  project_website: string;
  qty_images: string;
  asset_count: string;
}

function formatMonthYear(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function combineDescription(scope: string, deliverables: string): string {
  const parts = [scope, deliverables].filter(Boolean);
  return parts.join(" ");
}

interface ProjectLightboxProps {
  dealId: string;
  pageSlug?: string;
  initialImageIndex?: number;
  onClose: () => void;
}

export function ProjectLightbox({ dealId, pageSlug, initialImageIndex = 0, onClose }: ProjectLightboxProps) {
  const [images, setImages] = useState<LightboxImage[]>([]);
  const [imageGroups, setImageGroups] = useState<Record<number, "vs" | "hdr">>({});
  const [project, setProject] = useState<ProjectInfo | null>(null);
  const [currentIndex, setCurrentIndex] = useState(initialImageIndex);
  const [loading, setLoading] = useState(true);
  const [infoOpen, setInfoOpen] = useState(true);

  function extractYoutubeId(url: string): string | null {
    const match = url?.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?\s]+)/);
    return match ? match[1] : null;
  }

  useEffect(() => {
    const metaFetch = fetch(`/api/media/metadata?dealId=${dealId}`).then((r) => r.json());
    const curateFetch = pageSlug
      ? fetch(`/api/gallery/curate?dealId=${dealId}&page=${encodeURIComponent(pageSlug)}`).then((r) => r.json())
      : Promise.resolve({ hiddenIds: [], coverId: null, imageGroups: {} });

    Promise.all([metaFetch, curateFetch])
      .then(([data, curate]) => {
        const hiddenSet = new Set<number>(curate.hiddenIds || []);
        const coverId: number | null = curate.coverId ?? null;
        const groups: Record<number, "vs" | "hdr"> = curate.imageGroups || {};

        // Filter out hidden images
        const allFiles: LightboxImage[] = data.files || [];
        const visibleFiles = allFiles.filter((f) => typeof f.id === "number" && !hiddenSet.has(f.id as number));

        // If groups are defined, sort: VS first, then HDR, then ungrouped
        const hasGroups = Object.keys(groups).length > 0;
        let orderedFiles: LightboxImage[];
        if (hasGroups) {
          const vsFiles = visibleFiles.filter((f) => groups[f.id as number] === "vs");
          const hdrFiles = visibleFiles.filter((f) => groups[f.id as number] === "hdr");
          const ungrouped = visibleFiles.filter((f) => !groups[f.id as number]);
          orderedFiles = [...vsFiles, ...hdrFiles, ...ungrouped];
        } else {
          // Fall back to cover-first ordering
          const coverFile = coverId ? visibleFiles.find((f) => f.id === coverId) : null;
          orderedFiles = coverFile
            ? [coverFile, ...visibleFiles.filter((f) => f.id !== coverId)]
            : visibleFiles;
        }

        const youtubeId = extractYoutubeId(data.deal?.youtube || "");
        const items: LightboxImage[] = youtubeId
          ? [
              {
                id: "video" as const,
                youtubeId,
                url: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
                thumb_url: `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`,
                filename: "Video",
                description: "Watch the video",
              },
              ...orderedFiles,
            ]
          : orderedFiles;
        setImages(items);
        setImageGroups(groups);
        setProject(data.deal || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [dealId, pageSlug]);

  // Keyboard navigation
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrentIndex((i) => Math.min(i + 1, images.length - 1));
      if (e.key === "ArrowLeft") setCurrentIndex((i) => Math.max(i - 1, 0));
      if (e.key === "i") setInfoOpen((o) => !o);
    },
    [images.length, onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  const current = images[currentIndex];

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#0a0a0a]">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-[#1E1E1E] px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="text-[#999] transition-colors hover:text-[#F5F5F5]">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {project && (
            <div>
              <p className="text-sm font-medium text-[#F5F5F5]">{project.name}</p>
              <p className="text-xs text-text-muted">{project.builder} | {project.city}{project.state ? `, ${project.state}` : ""}</p>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#999]">
            {currentIndex + 1} / {images.length}
          </span>
          {/* Group label for current image */}
          {current && typeof current.id === "number" && imageGroups[current.id as number] && (
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
              imageGroups[current.id as number] === "vs"
                ? "bg-[#6A5ACD]/20 text-[#A8A2D0]"
                : "bg-[#F9A825]/20 text-[#F9A825]"
            }`}>
              {imageGroups[current.id as number] === "vs" ? "Virtual Staging" : "HDR Photo"}
            </span>
          )}
          <button
            onClick={() => setInfoOpen(!infoOpen)}
            className={`rounded-full px-3 py-1 text-[10px] font-semibold transition-colors ${
              infoOpen ? "bg-[#6A5ACD] text-white" : "border border-[#2C2C2C] text-[#999] hover:text-[#A8A2D0]"
            }`}
          >
            {infoOpen ? "Hide Info" : "Show Info"}
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Image viewer */}
        <div className="relative flex flex-1 items-center justify-center p-4">
          {loading && <p className="text-sm text-[#999]">Loading project...</p>}

          {!loading && current && (
            <>
              {/* Main viewer — video or image */}
              <div className="relative h-full w-full">
                {current.youtubeId ? (
                  <iframe
                    key={current.youtubeId}
                    src={`https://www.youtube.com/embed/${current.youtubeId}?autoplay=1&rel=0`}
                    title={current.filename}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                ) : (
                  <Image
                    src={current.url}
                    alt={current.description || current.filename}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 75vw"
                    priority
                    quality={90}
                  />
                )}
              </div>

              {/* Nav arrows */}
              {currentIndex > 0 && (
                <button
                  onClick={() => setCurrentIndex(currentIndex - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white/70 backdrop-blur-sm transition-colors hover:bg-black/70 hover:text-white"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
              )}
              {currentIndex < images.length - 1 && (
                <button
                  onClick={() => setCurrentIndex(currentIndex + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white/70 backdrop-blur-sm transition-colors hover:bg-black/70 hover:text-white"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              )}
            </>
          )}
        </div>

        {/* Info sidebar */}
        {infoOpen && project && (
          <div className="hidden w-72 shrink-0 overflow-y-auto border-l border-[#1E1E1E] bg-[#121212] p-5 lg:block xl:w-80">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#A8A2D0]">
              Project Details
            </p>

            <div className="mt-4 space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#999]">Builder</p>
                <p className="mt-0.5 text-sm text-[#F5F5F5]">{project.builder}</p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#999]">Location</p>
                <p className="mt-0.5 text-sm text-[#F5F5F5]">
                  {project.address || `${project.city}${project.state ? `, ${project.state}` : ""}`}
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#999]">Service</p>
                <p className="mt-0.5 text-sm text-[#F5F5F5]">{project.pipeline || "Premium"}</p>
              </div>

              {combineDescription(project.scope, project.deliverables) && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#999]">Description</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-[#A8A2D0]">
                    {combineDescription(project.scope, project.deliverables)}
                  </p>
                </div>
              )}

              {(project.qty_images || project.asset_count) && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#999]">Assets</p>
                  <p className="mt-0.5 text-sm text-[#F5F5F5]">
                    {project.qty_images || project.asset_count} images
                  </p>
                </div>
              )}

              {project.production_date && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#999]">Produced</p>
                  <p className="mt-0.5 text-sm text-[#F5F5F5]">{formatMonthYear(project.production_date)}</p>
                </div>
              )}

              {project.project_website && (
                <div>
                  <a
                    href={project.project_website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#6A5ACD] hover:underline"
                  >
                    View community website &rarr;
                  </a>
                </div>
              )}
            </div>

            {/* Current image description */}
            {current?.description && (
              <div className="mt-6 border-t border-[#1E1E1E] pt-4">
                <p className="text-[10px] uppercase tracking-widest text-[#999]">Image Description</p>
                <p className="mt-1 text-xs leading-relaxed text-[#A8A2D0]">{current.description}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Filmstrip */}
      {images.length > 1 && (
        <div className="border-t border-[#1E1E1E] bg-[#0a0a0a] px-4 py-3">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {(() => {
              const hasGroups = Object.keys(imageGroups).length > 0;
              const items: React.ReactNode[] = [];
              let lastGroup: string | null = null;

              images.forEach((img, i) => {
                const group = img.id === "video" ? null : (imageGroups[img.id as number] || null);

                // Insert divider when transitioning into a new named group
                if (hasGroups && group !== lastGroup) {
                  if (group === "vs") {
                    items.push(
                      <div key={`div-vs`} className="flex shrink-0 flex-col items-center justify-center gap-0.5 px-2">
                        <div className="h-10 w-px bg-[#6A5ACD]/40" />
                        <span className="whitespace-nowrap text-[8px] font-bold uppercase tracking-wider text-[#A8A2D0]">VS</span>
                      </div>
                    );
                  } else if (group === "hdr") {
                    items.push(
                      <div key={`div-hdr`} className="flex shrink-0 flex-col items-center justify-center gap-0.5 px-2">
                        <div className="h-10 w-px bg-[#F9A825]/40" />
                        <span className="whitespace-nowrap text-[8px] font-bold uppercase tracking-wider text-[#F9A825]">HDR</span>
                      </div>
                    );
                  }
                  lastGroup = group;
                }

                items.push(
                  <button
                    key={String(img.id)}
                    onClick={() => setCurrentIndex(i)}
                    className={`relative h-14 w-20 shrink-0 overflow-hidden rounded transition-all ${
                      i === currentIndex
                        ? "ring-2 ring-[#6A5ACD] ring-offset-1 ring-offset-[#0a0a0a]"
                        : "opacity-50 hover:opacity-80"
                    }`}
                  >
                    <Image
                      src={img.thumb_url || img.url}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                    {img.youtubeId && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              });

              return items;
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
