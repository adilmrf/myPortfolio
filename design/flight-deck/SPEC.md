# FLIGHT DECK — design system

Portfolio of Adil Mahroof · `adilmrf.github.io/myPortfolio`
Status: **proposed**, not applied. Branch `design-system`.
Sibling option: [`../swiss/SPEC.md`](../swiss/SPEC.md). Pick one.

Open `design/flight-deck/preview.html` in a browser to see everything below
rendered with real content.

---

## 1. The idea

The site is an **instrument panel reading out an engineering career.**

Not a scrapbook, not a CV, not a dashboard for its own sake. The organising
metaphor is a flight-readiness review: dense, precise, tabular, entirely
legible at a glance, with a single amber signal colour that only appears where
something is worth signalling.

This works here for a reason that is not decorative. The content is
*measurements* — a 10 N class thruster, 10+ hot-fire tests, 100 mN, 10 Longbow
satellites, GPA 3.95, two IAC papers. A design language built for readouts
lets those numbers do the persuading. The current design buries them in
paragraphs.

### The one rule that carries the identity

> **Data is monospace. Prose is sans. Never the reverse.**

Dates, IDs, metrics, statuses, tags, grades, counts, indices, coordinates →
`--font-mono`, tabular figures, often uppercase.
Sentences → `--font-sans`, sentence case, normal figures.

Almost everything else follows from that.

### Anti-gimmick rules

A mission-control aesthetic collapses into cosplay very fast. These are hard
constraints, not preferences:

1. **No fake telemetry.** Every number, status and label on screen must be true
   and traceable to a content file. No decorative "SYS NOMINAL", no invented
   coordinates, no fake progress bars. See §8.
2. **Uppercase is for labels of three words or fewer**, plus the name. Never
   body copy, never headings longer than a few words.
3. **One accent per viewport region.** Amber marks the single most important
   thing in view. If two things are amber, neither is.
4. **Status colour is semantic.** Green means *ongoing*. Grey means *complete*.
   They are never used to make something look interesting.
5. **No glow, no scanlines, no CRT flicker, no terminal-typing animation.**
   The restraint is the point. The one texture allowed is a 3–5% grid wash,
   hero panel only.
6. **Density serves scanning, not density.** If a section is not a list, a
   table or a set of readouts, it gets ordinary generous prose spacing.

---

## 2. Colour

Full values in [`tokens.css`](./tokens.css). Dark is primary; light is a
designed counterpart, not an inversion.

| Token             | Dark      | Light     | Use                                        |
| ----------------- | --------- | --------- | ------------------------------------------ |
| `--paper`         | `#08090b` | `#ffffff` | Page background                            |
| `--surface`       | `#0f1114` | `#f7f8f9` | Recessed panels, table header rows         |
| `--surface-raised`| `#15181c` | `#ffffff` | Cards, raised panels                       |
| `--line`          | `#1e2227` | `#e3e6e9` | Default hairline                           |
| `--line-strong`   | `#2c3238` | `#c8cdd3` | Emphasised divider, dot leaders            |
| `--ink`           | `#e6e9ed` | `#0f1114` | Primary text                               |
| `--ink-muted`     | `#98a1ab` | `#4a535c` | Secondary text, bullets                    |
| `--ink-subtle`    | `#7a848e` | `#6b747d` | Labels, meta — **contrast floor**          |
| `--accent`        | `#ff9e1b` | `#b45309` | The one signal                             |
| `--status-active` | `#3dd68c` | `#047857` | Ongoing only                               |
| `--status-idle`   | `#7a848e` | `#6b747d` | Complete / past                            |

**Contrast.** Every foreground token clears 4.5:1 against its intended
background in both themes, including `--ink-subtle` at 11px, which is the
tightest case (4.9:1 dark / 4.6:1 light). The light-mode accent is a different
hue value on purpose: `#ff9e1b` on white is roughly 1.9:1 and is unusable for
text or icons.

**Structure comes from hairlines, not shadows.** There is one shadow in the
system (§4, Panel/floating) and it exists only to lift the mobile menu above
the page. Everything else is a 1px line.

---

## 3. Type

No new fonts. Space Grotesk, Inter and JetBrains Mono are already self-hosted
via `next/font`; this system just reassigns them. **Adding zero kilobytes of
font payload was a design constraint**, since `images.unoptimized: true` means
this site has no CDN-side optimisation to fall back on.

| Role        | Family         | Size                    | Notes                          |
| ----------- | -------------- | ----------------------- | ------------------------------ |
| Callsign    | Space Grotesk  | `clamp(2.25 → 3.75rem)` | The name only. Uppercase in CSS. |
| H1          | Space Grotesk  | `clamp(1.75 → 2.5rem)`  | Page titles                    |
| H2          | Space Grotesk  | `clamp(1.25 → 1.5rem)`  | Section titles                 |
| H3          | Space Grotesk  | `1.0625rem`             | Card / entry titles            |
| Readout     | JetBrains Mono | `clamp(1.5 → 2rem)`     | Stat numbers. Tabular.         |
| Lede        | Inter          | `clamp(1 → 1.125rem)`   | Intro paragraph                |
| Body        | Inter          | `1rem` / 1.6            | Running text                   |
| Small       | Inter          | `0.875rem`              | Bullets, captions              |
| Label       | JetBrains Mono | `0.6875rem` / +0.12em   | Panel headers, tags. Uppercase.|
| Micro       | JetBrains Mono | `0.625rem` / +0.14em    | Index numbers, status          |

**`font-variant-numeric: tabular-nums` is mandatory on every mono element.**
Columns of dates and metrics that don't align are the difference between this
reading as an instrument and reading as a theme.

**Prose is capped at `--measure-prose` (62ch)** regardless of container width.
The 1120px page width is for tables and column layouts; paragraphs never use
all of it.

---

## 4. Components

Nine components carry the whole system. Each is specified as anatomy → rules →
accessibility.

### 4.1 Panel

The base container; replaces `ui/Card.tsx`.

```
┌ LABEL ──────────────────────── META ┐   ← optional header bar
│                                     │
│  content                            │
└─────────────────────────────────────┘
```

- 1px `--line` border, `--radius` (2px), `--surface-raised` fill.
- Optional header bar: `--surface` fill, bottom hairline, mono `--text-label`
  on the left, optional right-aligned meta. Header is `--space-2`/`--space-4`
  padded; body is `--space-5`.
- `interactive` variant: border goes `--line-strong` and the header label goes
  `--accent` on hover/focus-within. **No lift, no scale, no shadow.**
- `framed` variant adds corner registration marks (§4.9). Hero and media only.

### 4.2 Readout

A single measurement. The signature component.

```
 3+          10+         ×2          3.95
 YRS         TESTS       PAPERS      GPA
 RESEARCH    HOT-FIRE    IAC         UAEU
```

- Value: mono, `--text-readout`, `--ink`, tabular. Unit suffix at
  `--text-label` in `--ink-subtle`, baseline-aligned.
- Label beneath: mono `--text-label`, uppercase, `--ink-subtle`.
- Optional third line of context: `--text-micro`, `--ink-subtle`.
- Laid out in a `ReadoutBar`: 2 columns at mobile, 4 from `sm`, separated by
  vertical hairlines, never by gaps alone.
- **Exactly one readout per bar may take the `accent` variant.** Usually none.

### 4.3 Status

```
● ACTIVE        ○ COMPLETE       ◆ 2023
```

- Mono `--text-micro`, uppercase, 6px square indicator (not a circle), 2px
  radius.
- `active` → `--status-active` + `--status-active-wash` background.
- `complete` → `--status-idle`, no background.
- Under `prefers-reduced-motion: no-preference`, the `active` indicator gets a
  2s opacity pulse between 1 and 0.45. **At most one pulsing indicator per
  page** — it goes on the hero, nowhere else.
- Accessibility: the indicator is `aria-hidden`; the word carries the meaning.

### 4.4 DataRow

Label, dot leader, value. For any list of name/value pairs — spec strips,
project meta, contact details.

```
ROLE ·································· Satellite AIT Intern
PERIOD ································ Aug 2025 – Nov 2025
```

- Implemented as flex: fixed label, `flex:1` element with a
  `border-bottom: 1px dotted --line-strong` nudged up 4px, fixed value.
- Label mono uppercase `--ink-subtle`; value sans `--ink` (mono if it is data).
- Semantic markup is `<dl>` / `<dt>` / `<dd>`, not a table.

### 4.5 IndexList

Numbered entries. Projects, missions, publications.

```
[01]  MINI ROCKET PROPULSION SYSTEM              2022  ● COMPLETE
      10 N class thruster · designed, machined, fired
      PROPULSION   RESEARCH   SPACE
```

- Index is mono `--accent`, bracketed, `--text-label`, `tabular-nums`.
- Rows separated by hairlines, not gaps. Entire row is the link target;
  minimum height 56px for touch.
- Hover/focus: row background `--surface`, index goes `--accent-hover`.
- Accessibility: `<ol>`; the index is `aria-hidden` decoration, the title is
  the accessible name.

### 4.6 LogEntry (timeline)

Replaces the current `Timeline`. Same zero-JS document flow, restyled as a
mission log: a fixed-width mono date column on the left, entry on the right,
hairline rule between rows. The vertical spine goes away — the date column
*is* the spine, and it carries information the spine didn't.

```
2026.02 ┃ ROBOTICS INTERN                        ● ACTIVE
PRESENT ┃ Besomi Electronics
        ┃ · Led Sumo Robot workshops …
────────┼──────────────────────────────────────────────────
2026.01 ┃ AI TUTOR                               ● ACTIVE
PRESENT ┃ xAI
```

- Date column: `7ch` wide, mono, `--text-label`, `YYYY.MM` over `YYYY.MM` or
  `PRESENT`. Collapses above the entry at `<640px`.
- Org logo becomes a **32px square** with a hairline border — not a circle.
- The `--text-h3` role title is uppercase; the organisation is sentence-case
  sans beneath it. This inverts the current emphasis and is correct: the role
  is what's being scanned for.

### 4.7 Tag

```
[ PROPULSION ]   [ RESEARCH ]   [ SPACE ]
```

- Mono `--text-micro`, uppercase, 1px `--line` border, 2px radius, no fill.
- Selected: `--accent` border + `--accent-wash` fill + `--accent` text.
- **No pills.** The current `rounded-full` chips are the most generic element
  on the site and their removal does a lot of work.

### 4.8 Rule

The end-capped divider — a 1px `--line-strong` rule with 3px solid caps at
each end. Used between major page sections, once per section, never twice in
a row and never inside a panel.

### 4.9 CornerMarks

Four 8px L-brackets in `--line-strong` at the corners of a frame. **Hero panel
and media figures only** — three or four instances per page maximum. Purely
`::before`/`::after`, no extra DOM.

### 4.10 Buttons

Two variants only.

- **Primary**: `--accent` fill, `--accent-contrast` text, mono `--text-label`
  uppercase, 2px radius, 44px min height.
- **Ghost**: transparent, 1px `--line-strong` border, `--ink` text. Border goes
  `--accent` on hover.

Focus ring on both: `2px solid --accent`, `offset 2px`. Never removed.

---

## 5. Layout

- **Page width `--measure` (1120px)**, up from the current 896px. The system is
  column- and table-led and needs the room; prose stays capped at 62ch inside
  it.
- **12-column grid**, `--gutter` (24px). Mobile is a single column; the grid
  starts at `md`.
- **Page padding** 20px, 32px from `sm`.
- **Section rhythm**: `--space-24` (96px) between major sections at desktop,
  `--space-16` (64px) at mobile. Within a section, `--space-8`.
- **Header**: 56px tall, `--paper` at 85% with backdrop blur, bottom hairline.
  Left is a mono wordmark `ADIL MAHROOF`; right is nav + theme toggle. On
  scroll past 100px the bottom hairline goes `--line-strong`. Nothing else
  moves.

### Page compositions

**Home**
1. Hero panel — framed, grid wash, callsign, role, focus line, location +
   `● ACTIVE` status, two buttons.
2. ReadoutBar — four readouts (§8).
3. `> SELECTED WORK` — IndexList of all five projects.
4. `> LOG` — LogEntry timeline, four most recent roles, link to full.
5. `> EDUCATION` — LogEntry, all three.
6. `> REFERENCES` — 3-column panel grid.
7. `> CONTACT` — DataRows.

**Project detail**
1. Back link, index `[0N]`, H1, lede.
2. Spec strip — DataRows for role, period, organisation, status.
3. ReadoutBar of that project's metrics, when it has any.
4. Hero figure — framed, corner marks.
5. `CONTEXT` / `APPROACH` / `RESULTS` panels.
6. Gallery, publications, links.
7. Prev/next pager as two IndexList rows.

**Projects index** — filter bar of Tags above a full-width IndexList. The
current card grid goes away; a table scans better for five items and would
still scan well at fifty.

**About / Experience** — DataRow-driven. Skills, languages and hobbies become
labelled rows rather than pill clouds.

---

## 6. Motion

- `--motion-fast` (100ms linear) for colour changes.
- `--motion-base` (160ms) for anything positional.
- Maximum positional movement is **4px**. No scale, no rotation, no parallax.
- The status pulse (§4.3) is the only ambient animation on the site.
- Everything above is wrapped in `@media (prefers-reduced-motion: reduce)` →
  `animation: none; transition: none`.

---

## 7. Accessibility contract

Non-negotiable, and cheaper to hold now than to retrofit:

- 4.5:1 minimum for all text including 10px micro labels, both themes.
- Visible `2px --accent` focus ring on every interactive element.
- Colour is never the only carrier of meaning — status has a word, not just a
  dot; selected tags change border *and* fill *and* carry `aria-pressed`.
- All decorative glyphs (indices, dot leaders, corner marks, indicators) are
  `aria-hidden` or CSS-generated, so a screen reader hears
  "Mini rocket propulsion system, 2022, complete" and not "[ 0 1 ]".
- Touch targets ≥44px; IndexList rows are 56px.
- Uppercase is applied via `text-transform` only, so assistive tech and
  `<title>` receive normal casing.

---

## 8. Content dependencies — needs your confirmation

**No content file is modified by this proposal.** But the ReadoutBar surfaces
four numbers as headline claims, and although each is already in the repo,
*promoting* them is an editorial decision that is yours, not mine.

Proposed home readouts, with sources:

| Readout          | Value    | Source                                                     |
| ---------------- | -------- | ---------------------------------------------------------- |
| RESEARCH         | `3+ YRS` | `profile.ts` → `highlights[0]`                              |
| HOT-FIRE TESTS   | `10+`    | `projects.ts` → `mbrsc-propulsion.results[0]`               |
| IAC PAPERS       | `×2`     | `projects.ts` → IAC 2023 Baku + IAC 2024 Milan              |
| GPA              | `3.95`   | `education.ts` → `edu-1.grade`                              |

⚠️ **`3+ YRS` is on your deferred content-accuracy list** and I'd rather not
put a number you plan to revise into the largest type on the page. Available
substitutes, all already in the content: `100+ STUDENTS TAUGHT` (SpacePoint),
`10 SATELLITES` (Orbitworks Longbow), `10 N CLASS` (mini-rocket), `100 mN
CLASS` (green propellant).

Per-project readouts would need a `metrics` array populated in `projects.ts` —
the field already exists in `types.ts` from the last pass, but it is empty.
Filling it means writing values like `{ label: "Thrust class", value: "10", unit: "N" }`.
**That is new content and I won't write it without you.**

---

## 9. Migration

The token *names* are unchanged, so most of the codebase moves for free.

| Area                    | Work                                                            |
| ----------------------- | --------------------------------------------------------------- |
| `globals.css`           | Swap the `:root` / `.dark` blocks for `tokens.css`. Add `--color-status-*` to `@theme inline`. |
| Dark-mode default       | Site becomes dark-first. The `@custom-variant dark` and the no-flash script invert to a `.light` opt-out. **Only genuinely fiddly step.** |
| `ui/Card.tsx`           | Becomes `Panel` — gains the optional header bar.                 |
| `ui/Container.tsx`      | Width bumps to `--measure`; add a `prose` cap.                    |
| `Timeline.tsx`          | Restyle to LogEntry. Structure and sorting logic unchanged.       |
| `TagChip.tsx`           | Drop `rounded-full`, adopt bracket styling.                       |
| `ProjectsList` / `ProjectListCard` | Replaced by `IndexList`. Net deletion.            |
| **New**                 | `Readout`, `ReadoutBar`, `Status`, `DataRow`, `IndexList`, `Rule`, `CornerMarks`. |
| Content files           | **Untouched**, pending §8.                                        |

Payload impact is close to zero: no new fonts, no new images, several
components deleted. The grid wash and corner marks are pure CSS.

---

## 10. Known risks

1. **Dark-first is a real commitment.** If this is ever printed, PDF'd or
   screenshotted into a light document, it will look heavy. The light theme is
   designed rather than derived, which mitigates it, but the default matters.
2. **The aesthetic is opinionated.** It reads strongly to engineers and may
   read as *stylised* to a non-technical recruiter or an admissions reader.
   You chose "general professional presence", which I'd argue this still fits —
   but it is a louder choice than the Swiss option.
3. **It rewards content this site doesn't have yet.** IndexLists with status
   columns and per-project readouts look thin without metrics and images. This
   system will look noticeably better once §8 is resolved and the project
   photos land — and noticeably emptier than the current design until then.
