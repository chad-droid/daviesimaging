---
name: All pages must be editable
description: Every new page created must use EditableSection components so all text content is admin-editable
type: feedback
---

All pages on the site must be editable via the admin interface. When creating any new page, use `EditableSection` components (from `@/components/EditableSection`) for every text section instead of hardcoded JSX.

**Why:** Chad needs to edit all site copy without code changes. Nicole (marketing director) also reviews and suggests copy updates via Slack.

**How to apply:**
- Every text section on every page uses `<EditableSection>` with a unique `slotId`
- Variants: `hero-dark`, `light`, `dark`, `light-split`, `dark-split`
- Use `**word**` syntax for bold in default text
- Keep `export const metadata` for SEO (server component wrapper is fine)
- Image slots use `<DynamicImage>` as children in split variants
- SlotId convention: `{page-path-segment}-hero`, `{page-path-segment}-section1`, etc.
