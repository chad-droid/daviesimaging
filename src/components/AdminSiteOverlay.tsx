"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminMediaPicker } from "./AdminMediaPicker";
import { AdminGalleryPicker } from "./AdminGalleryPicker";

const ADMIN_STORAGE_KEY = "dig-admin-auth";

export function AdminSiteOverlay() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [pickerSlot, setPickerSlot] = useState<string | null>(null);
  const [showGalleryPicker, setShowGalleryPicker] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    slotId: string;
  } | null>(null);

  // Check if user is admin
  useEffect(() => {
    const authed = sessionStorage.getItem(ADMIN_STORAGE_KEY);
    if (authed === "true") setIsAdmin(true);
  }, []);

  // Find the slot element from a click/right-click target
  const findSlotElement = useCallback((target: HTMLElement): HTMLElement | null => {
    return (
      target.closest("[data-slot]") as HTMLElement ||
      target.closest("img")?.closest("[data-slot]") as HTMLElement ||
      null
    );
  }, []);

  // Left-click on slot elements opens the picker directly
  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (!enabled) return;
      const slotEl = findSlotElement(e.target as HTMLElement);
      if (!slotEl || !slotEl.dataset.slot) return;
      e.preventDefault();
      e.stopPropagation();
      setPickerSlot(slotEl.dataset.slot);
    },
    [enabled, findSlotElement],
  );

  // Right-click shows context menu with before/after option
  const handleContextMenu = useCallback(
    (e: MouseEvent) => {
      if (!enabled) return;
      const slotEl = findSlotElement(e.target as HTMLElement);
      if (!slotEl || !slotEl.dataset.slot) return;
      e.preventDefault();
      setContextMenu({ x: e.clientX, y: e.clientY, slotId: slotEl.dataset.slot });
    },
    [enabled, findSlotElement],
  );

  // Close context menu on click outside
  useEffect(() => {
    const dismiss = () => setContextMenu(null);
    if (contextMenu) {
      document.addEventListener("click", dismiss);
      return () => document.removeEventListener("click", dismiss);
    }
  }, [contextMenu]);

  // Attach listeners
  useEffect(() => {
    if (enabled) {
      document.addEventListener("click", handleClick, true);
      document.addEventListener("contextmenu", handleContextMenu);
      return () => {
        document.removeEventListener("click", handleClick, true);
        document.removeEventListener("contextmenu", handleContextMenu);
      };
    }
  }, [enabled, handleClick, handleContextMenu]);

  // Add visual indicators to all swappable elements
  useEffect(() => {
    if (!enabled) return;

    const style = document.createElement("style");
    style.id = "admin-overlay-styles";
    style.textContent = `
      [data-slot] {
        outline: 2px dashed rgba(106, 90, 205, 0.4) !important;
        outline-offset: -2px;
        cursor: pointer !important;
      }
      [data-slot]:hover {
        outline-color: rgba(106, 90, 205, 0.8) !important;
        outline-style: solid !important;
      }
      [data-slot]::after {
        content: 'Click to swap';
        position: absolute;
        bottom: 4px;
        left: 4px;
        background: rgba(106, 90, 205, 0.9);
        color: white;
        font-size: 10px;
        font-weight: 600;
        padding: 2px 8px;
        border-radius: 4px;
        opacity: 0;
        transition: opacity 0.15s;
        z-index: 10;
        pointer-events: none;
      }
      [data-slot]:hover::after {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.getElementById("admin-overlay-styles")?.remove();
    };
  }, [enabled]);

  if (!isAdmin) return null;

  return (
    <>
      {/* Admin toolbar */}
      <div className="fixed bottom-4 right-4 z-[90] flex items-center gap-2">
        <button
          onClick={() => setEnabled(!enabled)}
          className={`rounded-full px-4 py-2 text-xs font-semibold shadow-lg transition-all ${
            enabled
              ? "bg-[#6A5ACD] text-white"
              : "bg-[#1E1E1E] text-[#A8A2D0] hover:bg-[#2C2C2C]"
          }`}
        >
          {enabled ? "Exit Edit Mode" : "Edit Images"}
        </button>
        <button
          onClick={() => setShowGalleryPicker(true)}
          className="rounded-full bg-[#1E1E1E] px-4 py-2 text-xs font-semibold text-[#4CAF50] shadow-lg transition-colors hover:bg-[#2C2C2C]"
        >
          Manage Gallery
        </button>
        <a
          href="/admin/assets"
          className="rounded-full bg-[#1E1E1E] px-4 py-2 text-xs font-semibold text-[#A8A2D0] shadow-lg transition-colors hover:bg-[#2C2C2C]"
        >
          Admin
        </a>
        <button
          onClick={() => {
            sessionStorage.removeItem(ADMIN_STORAGE_KEY);
            setIsAdmin(false);
            setEnabled(false);
          }}
          className="rounded-full bg-[#1E1E1E] px-4 py-2 text-xs font-semibold text-[#E57373] shadow-lg transition-colors hover:bg-[#2C2C2C]"
        >
          Logout
        </button>
      </div>

      {/* Context menu */}
      {contextMenu && (
        <div
          className="fixed z-[95] rounded-lg border border-[#2C2C2C] bg-[#1E1E1E] py-1 shadow-xl"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <button
            onClick={() => {
              setPickerSlot(contextMenu.slotId);
              setContextMenu(null);
            }}
            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-[#F5F5F5] transition-colors hover:bg-[#6A5ACD]/20"
          >
            <svg
              className="h-4 w-4 text-[#6A5ACD]"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            Swap Image
          </button>
          <button
            onClick={() => {
              setPickerSlot(contextMenu.slotId + ":ba");
              setContextMenu(null);
            }}
            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-[#F5F5F5] transition-colors hover:bg-[#6A5ACD]/20"
          >
            <svg
              className="h-4 w-4 text-[#4CAF50]"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
              />
            </svg>
            Before & After
          </button>
        </div>
      )}

      {/* Media picker */}
      {pickerSlot && (
        <AdminMediaPicker
          slotId={pickerSlot.replace(":ba", "")}
          onClose={() => setPickerSlot(null)}
          onSave={() => window.location.reload()}
        />
      )}

      {/* Gallery picker */}
      {showGalleryPicker && (
        <AdminGalleryPicker
          pageSlug={typeof window !== "undefined" ? window.location.pathname : "/"}
          onClose={() => setShowGalleryPicker(false)}
        />
      )}
    </>
  );
}

function generateSlotId(el: HTMLElement): string {
  // Build a slot ID from the element's path in the DOM
  const parts: string[] = [];
  let current: HTMLElement | null = el;
  let depth = 0;

  while (current && depth < 5) {
    const tag = current.tagName.toLowerCase();
    const section = current.closest("section");
    if (section) {
      const sectionIndex = Array.from(
        document.querySelectorAll("section"),
      ).indexOf(section);
      const imgIndex = Array.from(section.querySelectorAll("img, .bg-gradient-to-br, .bg-gradient-to-b")).indexOf(el);
      return `section-${sectionIndex}-img-${imgIndex}`;
    }
    parts.unshift(tag);
    current = current.parentElement;
    depth++;
  }

  return parts.join("-") + "-" + Math.random().toString(36).slice(2, 6);
}
