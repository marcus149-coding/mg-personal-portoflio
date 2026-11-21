---
name: Marcus Gomez
description: Liquid glass at night. Translucent glass panels float over slow pools of coral and mist light on a deep blue-black ground. Three colors only, dark and easy on the eyes, with coral as the single pop. Motion follows Emil Kowalski's design-engineering rules.
colors:
  ink: "#0c0f14"
  mist: "#e7ecf2"
  coral: "#ff7a5c"
typography:
  display:
    fontFamily: "Neuton, Georgia, Times New Roman, serif"
    fontSize: "clamp(3.4rem, 9vw, 6.4rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Neuton, Georgia, Times New Roman, serif"
    fontSize: "clamp(2rem, 4vw, 2.8rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Neuton, Georgia, Times New Roman, serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
---

# Design

## Palette: three colors, nothing else

| Token | Value | Role |
| --- | --- | --- |
| Ink | `#0c0f14` | The ground. A blue-black that is softer on the eyes than pure black. Also text on coral. |
| Mist | `#e7ecf2` | All text and the glass itself, used at different alphas. |
| Coral | `#ff7a5c` | The pop: primary action, "you are here", bullets, focus ring, and light refracted in the glass rim. |

Every other tone is one of these three at an alpha, through the `--ink-rgb`, `--mist-rgb` and `--coral-rgb` channel tokens in `style.css`. Don't introduce a fourth hue.

Text strengths on the ink ground: `--text` (mist, 100%), `--text-soft` (74%), `--text-meta` (58%). All pass WCAG AA. Coral on ink is about 7.4:1, and so is ink on coral.

## Material: liquid glass

- `.glass` is the material: a faint mist gradient, `backdrop-filter: blur(22px) saturate(170%)`, an inner top highlight, an inner bottom shade and a deep soft drop shadow.
- `.glass::before` is the rim, a 1px gradient border. Light catches the top-left edge in mist and refracts coral along the bottom-right.
- `.ambient` is a fixed layer of three slow-drifting radial pools (two coral, one mist) plus fine grain. Because it's fixed, the glass panels slide over it as you scroll, and what they refract keeps changing.
- `.lens` adds a soft specular highlight that trails the pointer on a critically damped spring (no overshoot). It's decorative, so it's gated to fine pointers and switched off under reduced motion.
- Color sits on solid layers, never on the translucent foreground. The primary button and brand mark are solid coral.
- Glass is never stacked on glass. Chips and fills inside a panel are flat tints without blur.
- Shapes: panels have a 26px radius (22px on phones). Buttons, chips, the nav and the nav indicator are full capsules.

## Motion (Emil Kowalski)

- Curves: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` for UI, and `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)` for on-screen movement (the ambient pools). Never `ease-in`.
- Press feedback: `scale(0.97)` on buttons and nav links, `0.98` on large cards and `0.95–0.96` on small targets, at 160ms.
- Hover effects only inside `@media (hover: hover) and (pointer: fine)`.
- UI transitions stay under 300ms. The nav indicator takes 280ms.
- The first-visit hero entrance is one choreographed group with non-uniform delays (40–370ms), each item rising 14px out of a 6px blur.
- Sections materialize once on arrival: opacity, an 18px lift and blur resolve together over 560ms. Visibility never depends on this. Without JS, nothing is hidden.
- The copy button crossfades its label through a 2px blur.
- Reduced motion keeps the fades and drops movement, blur, the drifting pools and the lens.
- Reduced transparency gives the glass a solid fill with no blur. Increased contrast raises the text alpha and strengthens the hairlines.

## Layout

The page is single-column with a 1120px max width. The nav is a floating glass capsule centered at the top. Section headings get a hairline that starts in coral and fades out. The page ends with a contact panel lit by a warmer coral pool, then a quiet footer.
