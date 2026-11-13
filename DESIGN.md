---
name: Marcus Gomez
description: An evening sky in black and white. A speckled black-to-charcoal header traced with contour lines and faint low mist, fluted glass panels over it, a light-gray reading field with white paper cards, and the night sky again at the close.
colors:
  ink: "#0a0a0a"
  sky-mid: "#161616"
  charcoal: "#2b2b2b"
  light: "#f4f4f4"
  paper: "#ffffff"
  light-deep: "#e6e6e6"
  meta: "#555555"
  gray: "#cccccc"
  graphite: "#1c1c1c"
  ink-soft: "#4a4a4a"
  on-dark: "#f4f4f4"
  on-dark-soft: "rgba(244, 244, 244, 0.74)"
  line: "rgba(0, 0, 0, 0.12)"
typography:
  display:
    fontFamily: "Schibsted Grotesk, Figtree, Segoe UI, sans-serif"
    fontSize: "clamp(3.2rem, 8vw, 5.6rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Schibsted Grotesk, Figtree, Segoe UI, sans-serif"
    fontSize: "clamp(2rem, 4vw, 2.8rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Schibsted Grotesk, Figtree, Segoe UI, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.01em"
  stat:
    fontFamily: "Schibsted Grotesk, Figtree, Segoe UI, sans-serif"
    fontSize: "2.1rem"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.02em"
    fontFeature: "lnum, pnum"
  lead:
    fontFamily: "Figtree, Segoe UI, system-ui, sans-serif"
    fontSize: "1.14rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Figtree, Segoe UI, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Figtree, Segoe UI, system-ui, sans-serif"
    fontSize: "0.84rem"
    fontWeight: 600
    lineHeight: 1.6
  meta:
    fontFamily: "Figtree, Segoe UI, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.6
    fontFeature: "tnum, lnum"
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "12px"
spacing:
  stack-sm: "12px"
  stack-md: "16px"
  stack-lg: "24px"
  gutter: "24px"
  gutter-phone: "18px"
  card: "clamp(24px, 3.4vw, 40px)"
  section: "clamp(80px, 10vw, 120px)"
  container: "1120px"
components:
  button-primary:
    backgroundColor: "{colors.light}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "12px 22px"
  button-primary-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  button-light:
    backgroundColor: "transparent"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.md}"
    padding: "12px 22px"
  button-light-hover:
    backgroundColor: "rgba(255, 255, 255, 0.1)"
    textColor: "{colors.on-dark}"
  nav-bar:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.xl}"
    padding: "5px"
  nav-brand:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.light}"
    rounded: "{rounded.md}"
    size: "36px"
  nav-link:
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.md}"
    padding: "8px 13px"
  nav-link-hover:
    textColor: "{colors.ink}"
  nav-link-current:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.light}"
    rounded: "{rounded.md}"
  card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card}"
  side-card:
    backgroundColor: "rgba(255, 255, 255, 0.07)"
    textColor: "{colors.light}"
    rounded: "{rounded.lg}"
    padding: "22px 24px 22px 26px"
  tag:
    backgroundColor: "{colors.light}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "3px 10px"
  copy-button:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "5px 12px"
  copy-button-hover:
    backgroundColor: "{colors.light-deep}"
  copy-button-done:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
---

# Design System: Marcus Gomez

## Overview

**Creative North Star: "The Evening Sky, in Black and White"**

The page reads like a night sky photographed in monochrome: it opens on a black-to-charcoal header, settles into a light-gray reading field for the résumé itself, and closes on black again behind the contact card. Professional comes first. The sky carries the materials (speckled graphite, contour lines, fluted glass) and a faint band of mist; the reading field stays quiet.

Everything that carries information sits on white paper cards with tight corners and soft black shadows. There is no hue anywhere: ink, white and a short ladder of grays carry every role, so hierarchy comes from value, weight and size. Type pairs an editorial grotesk for headings with a clean, friendly sans for reading. Density is calm: generous section spacing, short line lengths, nothing competing with the facts.

The owner moved the site to black and white on 2026-11-12. The earlier navy, royal, cream, magenta and plum palette, the botanical and aloha motifs, and the bright midday-blue cloudy pass are all retired.

**Key Characteristics:**
- Black-to-charcoal sky at the top, black again at the close, light-gray reading field between.
- Speckled graphite: seeded fleck tiles over the sky, the dusk, the MG tile and the tracker screen, and a faint pencil speckle on the light field.
- Topographic contour lines traced across both skies, with heavier index contours every fifth line.
- Fluted (reeded) glass for the two header side cards and a pane standing behind the contact card, blurring the contours through its ribs.
- Mist drawn on canvas: wide, flat, soft-edged ellipses at 7-11% alpha, low in the header and one band near the footer.
- White paper cards (6-12px corners, never pills) with soft black shadows.
- A black indicator slides under the current section in a floating white nav bar.
- Schibsted Grotesk headings at heavy weights with tight tracking; Figtree body.

## Colors

Black, white and grays only. Each value has one job.

### Dark
- **Ink** (ink, #0a0a0a): body and heading text; the top of the header gradient and the bottom of the close; the sliding nav indicator; actions on light surfaces (copied state, the "Now" marker, the current timeline segment); rules under skill-column headings; key numbers; text links; selection; scrollbar thumb; browser theme colour.
- **Sky Midpoint** (sky-mid, #161616): the single midpoint stop in both sky gradients. Not used anywhere else.
- **Charcoal** (charcoal, #2b2b2b): the bottom of the header gradient and the top of the close.
- **Graphite** (graphite, #1c1c1c): the speckled slab under the MG tile and the tracker screen.

### Light
- **Light** (light, #f4f4f4): the page ground; text on the dark sky; the primary button on the sky ("Email me"); tag fills.
- **Paper** (paper, #ffffff): every card and the floating nav bar.
- **Light Deep** (light-deep, #e6e6e6): hover fill for quiet controls on paper (the copy button).

### Grays
- **Meta** (meta, #555555): dates, years and contact keys, always weight 600. 7.5:1 on paper.
- **Soft Ink** (ink-soft, #4a4a4a): secondary text on paper: org lines, locations, nav links at rest, captions, timeline labels.
- **Thinned Light** (on-dark-soft): secondary text on the sky: the "From" line, side-card terms, the footer.
- **Hairline** (line, black at 12%): section-heading underlines, dividers between roles, ledger and contact rows.
- **Gray** (gray, #cccccc): physical hairlines that read as objects: tag borders, the copy button border, the timeline baseline and ticks, the past timeline segment, tracker object fills.

### Named Rules
**The No Hue Rule.** Every colour on the page is neutral. A tinted gray (blue-black, warm cream) breaks the system as surely as a bright accent does.

**The Value Carries Action Rule.** With no accent colour, actions are marked by the strongest value contrast on their ground: a solid light button on the black sky, solid ink on paper. Secondary actions are outlines.

**The Meta Is Gray Rule.** Dates, years and contact keys are meta gray at weight 600. Nothing else is meta gray.

## Materials

Three materials sit on top of the palette. They are texture and structure, never content, and they stay out of the reading cards.

### Speckled graphite
Drawn once by script.js into two repeating PNG tiles (seeded, so the pattern is identical on every load) and handed to CSS as `--speckle-dark` and `--speckle-light`. Both default to `none`, so every background still works without JavaScript.
- **Dark speckle** (240px tile): black grains (18-42%), a pale graphite sheen (#9e9e9e at 6-16%) and a few white flecks (8-20%). Laid over the header and dusk gradients, and over the **Graphite** slab (graphite, #1c1c1c) used for the MG brand tile and the object-tracker screen.
- **Light speckle** (220px tile): pencil-graphite flecks (#1c1c1c at 5-13%), mid-gray flecks and a few white flecks on the light page ground. Paper cards stay clean.

### Contour lines
A seeded height field (three octaves of value noise plus one or two smooth summits) is traced with marching squares on a canvas behind the mist. Light lines at 15% alpha, 1px; every fifth line is an index contour at 30% alpha, 1.4px, as on a survey sheet. The header summit sits up and to the right of the name, and a mask holds the lines to 30% strength across the left 34% so they never compete with the name or intro. The dusk summit sits top left. Static; redrawn only on resize.

### Fluted glass
`.fluted`: white at 7% over the sky, a 12px vertical reed (lit crest, clear face, shadowed trough) and a soft top sheen, `backdrop-filter: blur(6px) saturate(1.15)` so the contour lines and mist blur through it, a 1px inner white edge and a top highlight, and a deep black drop shadow. Without backdrop-filter it falls back to charcoal at 90%. Used on the two header side cards (light text, white arrows) and on the pane that stands 40px above and to the right of the contact card.

### Named Rules
**The Materials Stay Outside Rule.** Graphite, contours and glass live on the sky, the dusk and the two slabs. Reading cards on the light field never get speckle, contours or glass.

## Typography

**Display Font:** Schibsted Grotesk (with Figtree, Segoe UI, sans-serif), self-hosted variable 500-800
**Body Font:** Figtree (with Segoe UI, system-ui, sans-serif), self-hosted variable 400-600 plus italic 400

**Character:** An editorial newspaper grotesk set heavy and tight for names and headings, paired with a round, open sans for reading. Confident at the top, plain and approachable in the body.

### Hierarchy
- **Display** (800, clamp(3.2rem, 8vw, 5.6rem), 0.98, -0.035em): the name in the header only, in light on the sky.
- **Headline** (700, clamp(2rem, 4vw, 2.8rem), 1.08, -0.025em): section headings ("Where I've worked", "Let's talk"), each underlined by a hairline with 14px clearance.
- **Title** (700, 1.3rem, 1.08, -0.01em): card titles and column headings. Scales up in context: role titles 1.45rem, the project title 1.7rem; skill-column headings drop to 1.05rem over a 2px ink rule.
- **Stat** (800, 2.1rem, 1.05, -0.02em, lining proportional figures): ink key figures in the education card.
- **Lead** (400, 1.14rem, 1.6): the header intro, max 58ch; 1.05rem on phones.
- **Body** (400, 1.0625rem, 1.6): all reading text; point lists max 70ch; 1rem on phones.
- **Label** (600, 0.84-0.9rem): tags, nav links (0.9rem), copy button (0.8rem), contact keys (0.88rem). Sentence case, no tracking, never uppercase.
- **Meta** (600, body size, tabular lining figures): dates and years in meta gray.

### Named Rules
**The Sentence-Case Rule.** No uppercase labels, no letter-spaced kickers. Hierarchy comes from the grotesk's weight and size, not from small caps above headings.

**The Tabular Dates Rule.** Every date, year and time uses tabular lining numerals so columns of years align.

## Layout

A single centred column, max 1120px wide, with 24px side gutters (18px at 520px and below), extended by safe-area insets. Sections stack with a fluid gap of clamp(80px, 10vw, 120px); inside a section, heading and card sit 24px apart. Cards pad at clamp(24px, 3.4vw, 40px). Inner stacks step 12px, 16px and 24px.

The header is full-bleed sky with 148px top padding (clearing the floating nav) and the intro block capped at 720px; below it the two "side" cards sit in a two-column grid with a 16px gap. Content inside cards uses asymmetric two-column grids (190px date column plus fluid body for roles; 1fr / 1.05fr for the project; 1.45fr / 1fr for education; 1fr / 1.45fr for honors; three equal columns for skills).

At 860px and below every grid collapses to one column, the nav bar stretches full width, and the role date column stacks above its body. At 520px and below the gutters tighten, the body drops to 1rem, and the two header actions split the row evenly. Hover effects are gated behind `(hover: hover) and (pointer: fine)`, so touch devices never get stuck hover states.

## Elevation & Depth

A soft, ambient hybrid. Cards and the nav bar lift off the light ground with layered, soft black shadows (a tight 1-2px contact shadow plus a wide, negatively spread blur), never hard. Depth in the sky comes from the gradient itself and from the mist, not from shadows. Hover raises a card 2px and deepens its shadow; nothing else changes elevation.

### Shadow Vocabulary
- **Resting card** (`box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06), 0 8px 24px -12px rgba(0, 0, 0, 0.22)`): every paper card at rest.
- **Lifted card** (`box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08), 0 16px 32px -14px rgba(0, 0, 0, 0.3)`): side cards on hover, with translateY(-2px).
- **Floating nav** (`box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 10px 28px -12px rgba(0, 0, 0, 0.45)`): the fixed nav bar, which floats over both sky and the light field.
- **Action shadow** (`box-shadow: 0 6px 16px -8px rgba(0, 0, 0, 0.9)`): under the light primary button on the sky only.

### Named Rules
**The Quiet Mist Rule.** Mist is light gray at 7-11% alpha, drawn as wide, flat, soft-edged ellipses (height 30% of width, then squashed again to about 30%) that drift linearly at 3-5px per second. In the header it lives in two layers between 76% and 102% of the header's height, behind the side cards; at the close it is a single band at 94-106%, under the contact card. It never sits behind the name or intro, pauses offscreen, and is static under reduced motion.

**The Soft Shadow Rule.** Every shadow is soft black with a real blur. No hard offsets.

## Shapes

Tight, consistent corners: 6px for small controls (tags, copy button, skip link), 8px for buttons, nav links, the nav indicator, the brand tile and the tracker canvas, 10px for cards, 12px for the floating nav bar. Only true dots are round (the "Now" marker, the location dot). Nothing is a pill. Cards have no borders; separation comes from the white-on-light-gray tone step and the shadow. Hairlines are 1px; the only heavier rules are the 2px ink underline on skill-column headings and the 2px meta-gray bullet dashes.

### Named Rules
**The No-Pill Rule.** No element uses a full-height radius. Even the sliding nav indicator is an 8px rectangle.

## Components

### Buttons
Compact, solid and quick to respond.
- **Shape:** gently squared (8px), 12px 22px padding, label weight 600 at 0.98rem, optional 18px line icon.
- **Primary:** light fill with ink text and a soft black shadow beneath, on the sky. Used for the main action ("Email me"). Hover goes to pure white.
- **Outline:** transparent with a 1px light inner edge at 55% and light text on the sky ("Resume (PDF)"); hover adds a 10% white fill and brightens the edge.
- **Hover / Press:** background colour shifts in 160ms; press scales to 0.97 on a strong ease-out (cubic-bezier(0.23, 1, 0.32, 1)). Focus is a 2px outline offset 3px: ink on light surfaces, light on the dark sections.

### Chips (tags)
- **Style:** 6px corners, 1px gray border, light fill, ink label 0.84rem weight 600, 3px 10px padding, 7px gaps.
- **State:** static; tags are labels, not filters.

### Cards / Containers
- **Corner Style:** 10px.
- **Background:** white paper on the light ground (and on the sky, for side cards and the contact card).
- **Shadow Strategy:** resting card shadow; side cards lift on hover (see Elevation & Depth).
- **Border:** none.
- **Internal Padding:** clamp(24px, 3.4vw, 40px); the contact card uses clamp(28px, 5vw, 56px).

### Side cards (signature)
The two "In the field" / "In code" link cards in the header, in fluted glass (see Materials): 10px corners, light title in the grotesk at 1.3rem with a white arrow pinned right, a light one-line fact, then thinned-light terms at 0.88rem. Hover lifts 2px over 220ms, brightens the glass and its edge, and nudges the arrow 3px right; press scales to 0.99.

### Navigation
- **Style:** a fixed paper bar floating 14px below the top edge (10px on phones), 12px corners, 5px inner padding, floating-nav shadow. A speckled graphite 36px MG tile leads (32px on phones), then the section links.
- **Links:** Figtree 600 at 0.9rem, soft ink at rest, ink on hover, 8px 13px padding with 8px corners. Press scales to 0.97.
- **Current:** a black 8px indicator slides behind the current link (transform and width over 260ms ease-out), and the current link turns light. Under reduced motion it only fades.
- **Mobile:** the bar spans the width and its links scroll sideways with the scrollbar hidden; the current link is scrolled into the centre. Edge-fade masks show when more links are hidden: right edge fades from 78%, left edge from 22%, both edges fade at 18% and 82% when links are hidden on both sides.

### Copy button
Small outline control beside the email address: 6px corners, 1px gray border, transparent fill, ink 0.8rem label, light-deep hover. On copy the label blurs briefly (120ms swap) and the button turns solid ink with "Copied" for 1.8s; if the clipboard is blocked it selects the address and reads "Selected".

### Experience timeline (signature)
A measured month rule inside the experience card: a gray baseline with 9px gray month ticks and soft-ink month labels; the past internship as a gray 10px bar, the current one as an ink bar, ending in an 18px ink "Now" dot ringed in paper with a bold ink "Now · San Jose" label.

## Do's and Don'ts

### Do:
- **Do** keep every colour neutral and on its role: ink for text, dark grounds, structure and actions on light; light for the ground and actions on the sky; meta gray for dates and labels; gray for hairlines.
- **Do** put every block of content on a paper card with 10px corners and the resting soft black shadow.
- **Do** keep mist light gray at 7-11% alpha, flat and soft-edged, in the lower header and one band near the footer, drifting at 3-5px per second and still under reduced motion.
- **Do** keep corners on the 6 / 8 / 10 / 12px scale.
- **Do** run UI transitions under 260ms on cubic-bezier(0.23, 1, 0.32, 1), with press feedback (scale 0.95-0.99) on every control.
- **Do** set dates and years in meta gray, weight 600, with tabular lining numerals.
- **Do** gate hover styles behind `(hover: hover) and (pointer: fine)`.

### Don't:
- **Don't** introduce any hue, including tinted grays, warm creams or blue-blacks.
- **Don't** use pills or full-height radii anywhere, including the nav indicator.
- **Don't** let mist sit behind the name or intro, brighten past 11% alpha, or take on puffy, lobed cloud illustration shapes in the page.
- **Don't** reintroduce botanical or aloha motifs, or the bright midday-blue cloudy look; the owner rejected both.
- **Don't** add uppercase, letter-spaced kickers or eyebrows above headings.
- **Don't** use hard-offset shadows; shadows are soft black with a real blur.
