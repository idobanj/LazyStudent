---
name: Academic Modernism Dark
colors:
  surface: '#131316'
  surface-dim: '#131316'
  surface-bright: '#39393c'
  surface-container-lowest: '#0e0e11'
  surface-container-low: '#1b1b1e'
  surface-container: '#1f1f22'
  surface-container-high: '#2a2a2d'
  surface-container-highest: '#353438'
  on-surface: '#e4e1e6'
  on-surface-variant: '#e2bec0'
  inverse-surface: '#e4e1e6'
  inverse-on-surface: '#303033'
  outline: '#a9898b'
  outline-variant: '#5a4042'
  surface-tint: '#ffb2b8'
  primary: '#ffb2b8'
  on-primary: '#67001e'
  primary-container: '#ff506f'
  on-primary-container: '#5b0019'
  inverse-primary: '#ba1340'
  secondary: '#ffb2ba'
  on-secondary: '#640921'
  secondary-container: '#832336'
  on-secondary-container: '#ff97a4'
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#ca8100'
  on-tertiary-container: '#3e2400'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdadb'
  primary-fixed-dim: '#ffb2b8'
  on-primary-fixed: '#40000f'
  on-primary-fixed-variant: '#91002d'
  secondary-fixed: '#ffd9dc'
  secondary-fixed-dim: '#ffb2ba'
  on-secondary-fixed: '#400010'
  on-secondary-fixed-variant: '#832336'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#131316'
  on-background: '#e4e1e6'
  surface-variant: '#353438'
typography:
  display-lg:
    fontFamily: Newsreader
    fontSize: 3.5rem
    fontWeight: '400'
    lineHeight: 4.25rem
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Newsreader
    fontSize: 2.25rem
    fontWeight: '400'
    lineHeight: 2.75rem
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 2.25rem
    fontWeight: '500'
    lineHeight: 2.75rem
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Newsreader
    fontSize: 1.75rem
    fontWeight: '500'
    lineHeight: 2.25rem
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Newsreader
    fontSize: 1.5rem
    fontWeight: '500'
    lineHeight: 2rem
    letterSpacing: -0.01em
  title-md:
    fontFamily: Geist
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.5rem
    letterSpacing: 0em
  body-lg:
    fontFamily: Geist
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.625rem
    letterSpacing: 0.01em
  body-md:
    fontFamily: Geist
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.375rem
    letterSpacing: 0.005em
  label-md:
    fontFamily: Geist
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: 1rem
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Geist
    fontSize: 0.6875rem
    fontWeight: '600'
    lineHeight: 0.875rem
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2.5rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system synthesizes classical academic rigor with high-performance digital ergonomics. Designed specifically for low-light lecture halls, research archives, and presentation auditoriums, the aesthetic rejects clinical utility in favor of an atmospheric, intellectual presence.

The visual direction marries traditional editorial authority with sleek modernism:
- **Atmosphere:** Deep obsidian surfaces evoke leather-bound volumes and dim auditorium tiers, providing zero visual glare while sustaining intense legibility.
- **Accents:** Luminous ruby and electric crimson highlights direct immediate attention toward primary conclusions, citations, and active data states.
- **Tone:** Authoritative, focused, contemplative, and technologically precise.

## Colors

The palette establishes an obsidian hierarchy built to prevent eye fatigue in darkened environments while retaining crisp typographic contrast:

- **Surface Tiers:**
  - Base Ground: `#0e0e11` (Pure deep obsidian for primary app shell)
  - Surface Container 1: `#16161c` (Velvety dark slate for structural panels and drawers)
  - Surface Container 2: `#1f1f26` (Card modules, secondary regions)
  - Surface Container 3: `#282832` (Interactive surfaces, active states, popovers)
- **Primary & Accent Tokens:**
  - Primary Ruby: `#ff4d6d` (High-visibility actionable controls, focal points, cursor focus)
  - Secondary Wine: `#e63956` (Hover and pressed states for primary elements)
  - Velvet Burgundy: `#7a1c30` (Muted categorical badges, subtle backings)
  - Wine Radiance: `#40101a` (Tonal glow foundations, tinted card backdrops)
  - Tertiary Amber: `#f59e0b` (Annotations, highlighted citations, critical review states)
- **Typographic & Outline Tokens:**
  - On-Surface High: `#f5f5f7` (Primary readings, title glyphs, key data)
  - On-Surface Muted: `#a0a0ab` (Metadata, body paragraphs, captions)
  - Ghost Outline: `rgba(255, 255, 255, 0.08)` (Delicate boundaries, section dividers)
  - Accent Hairline: `rgba(255, 77, 109, 0.28)` (Active focus boundary)

## Typography

Typographic scale balances the literary prestige of variable serifs with technical monoline legibility:

- **Display & Headlines (Newsreader):** Retains italic flourishes and bracketed serifs for academic paper titles, presentation section headings, and keynote quotes. Optical sizing should target editorial layouts.
- **Body & Numerical Readouts (Geist):** Chosen for uncompromised precision in tables, metric dashboards, and long-form research notes. Monospaced numerals (`tnum`) must be enforced for tabular comparison.
- **Labels & Micro-copy:** Uppercase transformations are coupled with generous letter-spacing (`0.04em`–`0.06em`) to ensure legibility when projected at a distance in auditorium environments.

## Layout & Spacing

The layout model is governed by an asymmetric 12-column dynamic fluid grid on desktop systems (`>= 1024px`), a 6-column grid on tablet viewports (`768px - 1023px`), and a 4-column compact flow on mobile screens (`< 768px`).

- **Column Distributions:** Primary reading columns adhere strictly to an 8-column center-aligned measure (max 68ch) to prevent eye drift, while data sidebars and citation rails consume the remaining 4 columns.
- **Rhythm & Safe Insets:** Margins scale from `1.25rem` on mobile to `2.5rem` on widescreen workstations. Sections preserve vertical breathing room using `space-xl` gaps to differentiate thematic units within lengthy manuscripts and lecture archives.

## Elevation & Depth

Spatial layering relies on translucent edge boundaries and luminous backglow rather than conventional drop shadows, which wash out in dark lecture environments:

- **Layer 0 (Base Canvas):** Solid `#0e0e11`.
- **Layer 1 (Card / Module):** `#16161c` bounded by a 1px border stroke of `rgba(255, 255, 255, 0.08)`. No directional shadow.
- **Layer 2 (Hover & Active Elements):** Elevated to `#1f1f26` with an inner border stroke of `rgba(255, 255, 255, 0.12)`.
- **Layer 3 (Modals & Command Palettes):** `#282832` surface with a diffuse, perimeter ruby-tinted shadow (`box-shadow: 0 16px 40px -8px rgba(0, 0, 0, 0.8), 0 0 24px -4px rgba(255, 77, 109, 0.15)`).
- **Luminous Radiance:** Key interactive focal points employ a concentrated underglow via `box-shadow: 0 0 16px rgba(255, 77, 109, 0.35)`.

## Shapes

The design system embraces an architectural, slightly softened contour:
- **Base Components:** 0.25rem (`rounded`) corner radius across buttons, input fields, and tags, reinforcing precise, crystalline discipline.
- **Structural Modules:** 0.5rem (`rounded-lg`) for primary container cards, academic paper panels, and dialog surfaces.
- **Pill Exception:** Status indicators, glowing citation tags, and audio playback indicators utilize full pill radii (`9999px`) to create clear contrast against orthogonal data structures.

## Components

### Buttons
- **Primary:** Solid `#ff4d6d` fill, `#0e0e11` bold text, with subtle edge glow (`0 0 12px rgba(255, 77, 109, 0.3)`). Hover transitions to `#e63956` with enhanced luminosity.
- **Secondary / Ghost:** Transparent background with `rgba(255, 255, 255, 0.08)` hairline border and `#f5f5f7` text. On hover, background shifts to `#1f1f26` with a border tint of `rgba(255, 77, 109, 0.4)`.
- **Tertiary Link:** Borderless, `#a0a0ab` text, transitioning to `#ff4d6d` with an underline offset of 4px.

### Badges & Chips
- **Academic Metadata Badges:** Velvet burgundy background (`#40101a`), hairline stroke (`rgba(255, 77, 109, 0.3)`), ruby label (`#ff4d6d`), small uppercase styling (`label-sm`).
- **Citation Indicators:** Pill-shaped, `#1f1f26` backdrop, `#f59e0b` amber text, highlighting critical peer-reviewed sources and verified references.

### Lists & Data Tables
- **Lecture Outline Rows:** `#0e0e11` surface with bottom hairline dividers (`rgba(255, 255, 255, 0.06)`). Active segment displays a 2px left border strip of `#ff4d6d` and a `#16161c` background tint.
- **Table Cells:** Compact vertical padding (`space-sm`), monospaced alignment for figures, `#a0a0ab` column headers transformed uppercase.

### Checkboxes & Radios
- **Control Shell:** 16px square (checkbox) or circle (radio), `#16161c` background, bounded by `rgba(255, 255, 255, 0.16)`.
- **Selected State:** `#ff4d6d` background with `#0e0e11` check icon, accompanied by a subtle 4px ruby ambient aura.

### Input Fields
- **Container:** `#16161c` background, 1px border `rgba(255, 255, 255, 0.1)`. Typography renders at `#f5f5f7`, with placeholder in `#a0a0ab`.
- **Active Focus:** Border transitions instantly to `#ff4d6d` with an inner ring shadow `0 0 0 1px #ff4d6d`.

### Cards & Module Panes
- **Research Panels:** Crafted from `#16161c` with delicate 1px boundary (`rgba(255, 255, 255, 0.08)`). Header sections feature a serif Newsreader title over a faint linear divider.
- **Keynote Abstract Cards:** Integrated dark wine gradient tint (`linear-gradient(180deg, rgba(64, 16, 26, 0.25) 0%, rgba(22, 22, 28, 0.8) 100%)`) providing subtle depth beneath primary theorem blocks.