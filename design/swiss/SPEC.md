# GRID — design system

Portfolio of Adil Mahroof · `adilmrf.github.io/myPortfolio`
Status: **proposed**, not applied. Branch `design-system`.
Sibling option: [`../flight-deck/SPEC.md`](../flight-deck/SPEC.md). Pick one.

Open `design/swiss/preview.html` in a browser to see it rendered with real
content.

---

## 1. The idea

**The grid is the design.**

International Typographic Style, applied straight: one typeface, a strict
12-column grid, dramatic scale contrast, and structure carried entirely by
alignment and whitespace rather than by boxes, borders or fills. The reference
points are Müller-Brockmann's concert posters and the Neue Grafik house style —
work that is 70 years old and has not dated, which is the argument for it.

Where Flight Deck says *"this person measures things,"* Grid says *"this person
has judgement."* It is quieter, more confident, and it ages better. It is also
less immediately identifiable as an aerospace portfolio.

### The three rules that carry the identity

> **1. One typeface.** Inter, at many weights and sizes. No monospace anywhere,
> no second family for headings. All the differentiation comes from size,
> weight and position.
>
> **2. No boxes.** No cards, no panels, no fills, no rounded corners, no
> shadows. The only drawn elements are full-width horizontal rules, and they
> are ink-coloured, not grey.
>
> **3. Alignment is meaning.** If two things line up, they are related. Nothing
> is centred. Everything sits on the grid, and the grid is asymmetric on
> purpose.

### Anti-blandness rules

Swiss done timidly becomes a generic minimal template. These stop that:

1. **Do not compress the scale.** Display type runs to 120px while body stays
   at 16px. That 7.5× jump *is* the design. Shrinking the display to be
   "tasteful" removes the only drama in the system.
2. **Do not centre anything.** Ever. Not the hero, not headings, not the
   footer. Asymmetry is the signature.
3. **Whitespace is not padding.** 128–192px between sections. If it feels
   excessive, it is probably correct; if it feels comfortable, it is too tight.
4. **Red appears two or three times per page.** Not per section — per page.
5. **Ragged right, never justified.** Flush left, natural rag, no hyphenation.
6. **Numerals are graphic elements.** Section indices and years are set large
   and left in the margin, not shrunk into captions.

---

## 2. Colour

Full values in [`tokens.css`](./tokens.css). Near-monochrome by design —
there is very little for colour to do when structure comes from alignment.

| Token           | Light     | Dark      | Use                                     |
| --------------- | --------- | --------- | --------------------------------------- |
| `--paper`       | `#ffffff` | `#0a0a0a` | Page                                    |
| `--surface`     | `#f4f4f2` | `#141414` | The system's only fill — used sparingly |
| `--ink`         | `#101010` | `#f2f2f0` | Text and rules                          |
| `--ink-muted`   | `#4a4a48` | `#a3a3a0` | Secondary text                          |
| `--ink-subtle`  | `#6e6e6b` | `#7d7d7a` | Labels — **contrast floor**, 4.9:1      |
| `--line-strong` | `#101010` | `#f2f2f0` | Rules. **Ink-coloured, not grey.**      |
| `--line`        | `#d8d8d5` | `#2a2a2a` | Rare secondary rule                     |
| `--accent`      | `#d62828` | `#ff4d4d` | Red. 2–3 uses per page.                 |

**Light is primary.** This system descends from print and it wants paper. Dark
is provided and works, but it is the secondary state — the reverse of Flight
Deck.

**Red rather than amber** is a deliberate maximal contrast with the sibling
option, and it is the canonical Swiss accent. Both values clear 4.5:1 as text.

---

## 3. Type

One family: **Inter**, weights 400/500/700/800.

This means **Space Grotesk and JetBrains Mono are removed from the build.**
Adopting this system is a net *reduction* in font payload — two fewer families
than the site loads today, and three fewer than Flight Deck would.

| Role     | Size                       | Weight | Notes                            |
| -------- | -------------------------- | ------ | -------------------------------- |
| Display  | `clamp(3rem → 7.5rem)`     | 800    | −0.045em, line-height 0.88       |
| Numeral  | `clamp(2rem → 3.5rem)`     | 700    | Tabular. Margin indices, years.  |
| H1       | `clamp(2rem → 3.5rem)`     | 700    | −0.03em                          |
| H2       | `clamp(1.5rem → 2.25rem)`  | 700    | −0.02em                          |
| H3       | `1.125rem`                 | 600    |                                  |
| Lede     | `clamp(1.125rem → 1.5rem)` | 400    | Genuinely large — second-biggest thing on the page |
| Body     | `1rem` / 1.6               | 400    | Capped at 60ch                   |
| Small    | `0.875rem`                 | 400    |                                  |
| Label    | `0.75rem` / +0.1em         | 500    | Uppercase. Inter, not mono.      |

`font-variant-numeric: tabular-nums` on every year, date and figure, so the
left-margin numeral columns align down the page.

If you ever want to go further, **Inter Tight** or a licensed **Neue Haas
Grotesk** would be more authentic. Inter is already in the build and the
difference is marginal at these sizes.

---

## 4. Components

Six, against Flight Deck's nine. The reduction is the point — most of what
that system solves with a component, this one solves with the grid.

### 4.1 Grid

The layout primitive, and the only one that really matters.

- 12 columns, `--gutter` (32px), max `--measure` (1280px).
- Below `md` everything collapses to one column. The grid is a desktop and
  tablet device; it does not fake itself on a phone.
- The standard asymmetric split: **content in columns 1–7, meta in 9–12**,
  with column 8 left empty. That empty column is doing real work — do not
  reclaim it.
- Section indices (`01`, `02`) sit in the left margin as large numerals,
  outside the text column.

### 4.2 Display

The hero treatment. Name set at `--text-display`, weight 800, tracked to
−0.045em, wrapped across two lines by choice rather than by accident. Sentence
case, not uppercase — the size is doing the shouting.

### 4.3 Rule

A 1px `--line-strong` horizontal line spanning the full grid width. No end
caps, no gradients, no inset. One between sections; never two in a row.

This is the only drawn element in the entire system.

### 4.4 WorkEntry

A row on the projects list.

```
2023        Green Propellant Space Propulsion for          Propulsion
            Mode Changeable Micro Thrust Generation        Research
                                                           Space
────────────────────────────────────────────────────────────────────
```

- Year in columns 1–2, tabular, `--text-label`.
- Title in columns 3–9 at `--text-h3`, weight 600.
- Tags in columns 10–12, stacked, `--text-label`, `--ink-subtle`. **Stacked,
  not chips** — there is no chip in this system.
- 1px rule beneath. The whole row is the link target; minimum height 72px.
- Hover: title goes `--accent`, nothing moves.

### 4.5 MetaList

Label above value, stacked, aligned to a grid column. Replaces Flight Deck's
dot-leader DataRow, which would be far too fussy here.

```
LOCATION            ROLE                    PERIOD
Dubai, UAE          Satellite AIT Intern    2025.08 — 2025.11
```

Marked up `<dl>`; label `--text-label` uppercase `--ink-subtle`, value
`--text-body` `--ink`.

### 4.6 Link

Body links get `text-decoration: underline` with `text-underline-offset: 0.2em`
and `text-decoration-thickness: 1px`. On hover the offset tightens to `0.12em`
and the colour goes `--accent`. That underline shift is the only animation in
the system.

Standalone links (nav, CTAs) are unadorned text with a 1px bottom rule that
goes red on hover. **There are no filled buttons** — a solid rectangle would
be the loudest object on the page.

---

## 5. Layout

- **Page width `--measure` (1280px)**, page padding 24px / 48px from `sm`.
- **Section rhythm: 128px mobile, 192px desktop.** This is roughly double
  Flight Deck and it is not negotiable — see anti-blandness rule 3.
- **Header**: no background, no blur, no border. Name at left in `--text-label`
  uppercase, nav at right, 24px from the top edge, and it **scrolls away** with
  the page rather than sticking. A fixed bar is a box, and this system has no
  boxes. (Mobile keeps a minimal sticky nav for reachability — the one
  concession.)

### Page compositions

**Home**
1. Display block — name across two lines in columns 1–7; role, location and
   availability as a MetaList in columns 9–12. Rule beneath.
2. Lede in columns 1–7, large.
3. `01 / Selected work` — WorkEntry rows, full width.
4. `02 / Experience` — two-column: years in the margin, role and organisation
   in columns 3–9, bullets beneath at `--text-small`.
5. `03 / Education` — same, more compact.
6. `04 / References` — three columns, no cards, rules between rows.
7. `05 / Contact` — MetaList, large.

**Project detail**
1. Year in the margin, title in columns 1–9 at `--text-h1`.
2. Lede, columns 1–7.
3. MetaList strip — role, period, presented, tools.
4. Full-width image, caption flush left beneath it.
5. Context / Approach / Results as headed text blocks in columns 1–7, section
   labels in the left margin. **No panels.**
6. Publications, links.
7. Prev/next as two WorkEntry rows.

**Projects index** — the same WorkEntry list, unfiltered by default, with tags
as plain text links in a row above rather than a chip cloud.

---

## 6. Accessibility

- 4.5:1 minimum for all text in both themes; `--ink-subtle` sits at 4.9:1 and
  is the floor.
- Focus: 2px `--accent` outline, 2px offset. Visible on every interactive
  element.
- Underlines on all body links — this system leans on colour less than most,
  which helps here.
- Touch targets ≥44px; WorkEntry rows are 72px.
- The 12-column grid collapses fully to one column below `md`, so nothing
  depends on horizontal space to be readable.
- Large display type must still reflow: `text-wrap: balance` on headings,
  and the display clamp bottoms out at 48px so it never overflows a 320px
  screen.

---

## 7. Content dependencies — needs your confirmation

**No content file is modified by this proposal.**

Grid asks for *less* derived content than Flight Deck, because it has no
readout bar and no status column:

| Element             | Source                                                  |
| ------------------- | ------------------------------------------------------- |
| Project years       | Derived from presentation venues (IAC 2024 → 2024)      |
| "Available for work"| Paraphrase of `profile.ts` summary — **your call**       |
| Everything else     | Verbatim from the content files                          |

Notably it does **not** need the four hero readouts, so the disputed
`3+ yrs research` figure never has to appear. That is a genuine advantage of
this option while your content-accuracy pass is still outstanding.

Per-project `metrics` are optional here rather than structural — they would
render as an extra MetaList column if you fill them, and their absence leaves
no visible hole.

---

## 8. Migration

| Area                  | Work                                                        |
| --------------------- | ----------------------------------------------------------- |
| `globals.css`         | Swap `:root` / `.dark` for `tokens.css`.                     |
| `layout.tsx`          | **Delete two `next/font` imports** (Space Grotesk, JetBrains Mono). Net payload saving. |
| Theme default         | Stays light-first — no change to the existing no-flash script. **Simpler than Flight Deck**, which has to invert it. |
| `ui/Card.tsx`         | **Deleted.** There are no cards.                             |
| `ui/Container.tsx`    | Width to 1280px; add the 12-column grid helper.              |
| `Timeline.tsx`        | Restyle: margin years, no spine, no logo markers.            |
| `TagChip.tsx`         | **Deleted.** Tags become stacked text.                       |
| `ProjectListCard.tsx` | Replaced by `WorkEntry`. Net deletion.                       |
| **New**               | `Grid`, `Display`, `Rule`, `WorkEntry`, `MetaList`.          |
| Content files         | **Untouched.**                                               |

This is the cheaper migration of the two: fewer new components, more deletions,
two fewer fonts, and no dark-mode-default inversion to get wrong.

---

## 9. Known risks

1. **It is less distinctive.** Executed well it is timeless; executed at 90% it
   looks like every minimal portfolio template. Flight Deck fails more
   gracefully — a mediocre instrument panel is still unusual.
2. **It demands real images.** All that whitespace is currently holding nothing.
   With hardware photos and CAD renders it becomes striking; without them the
   home page is a lot of white with some text in the corner. **This is the
   sharper version of the same risk both options carry.**
3. **Long titles fight the grid.** Your project titles run to 90 characters
   ("Design of a Novel Water Desalination Spacer Using Biomimicry Techniques to
   Reduce Biofouling"). At `--text-h3` in columns 3–9 they wrap to three lines,
   which is fine — but they cannot be set at `--text-h1` on the index page the
   way a shorter title could.
4. **The empty column 8 will look like a bug** to anyone who does not know the
   convention, including possibly you. It is not.
