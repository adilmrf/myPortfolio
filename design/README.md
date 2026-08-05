# `design/` — Flight Deck

A proposed redesign of the portfolio, delivered as a **design system** rather
than as site edits. Nothing in `src/` has been touched.

## Files

| File           | What it is                                                                 |
| -------------- | -------------------------------------------------------------------------- |
| `preview.html` | **Start here.** Open it in a browser. Renders the whole system with real content, plus Home and Project-detail mockups. Has a theme toggle. |
| `SPEC.md`      | The specification: concept, anti-gimmick rules, colour, type, the nine components, page layouts, accessibility contract, migration plan, risks. |
| `tokens.css`   | The actual CSS custom properties, ready to drop into `src/app/globals.css`. |

```
# Windows
start design/preview.html
```

No build step, no dependencies. `preview.html` pulls the three fonts from
Google Fonts so it renders accurately; offline it falls back to system faces
and still reads correctly.

## What this is

Direction: **mission control.** The site becomes an instrument panel reading
out an engineering career — dense, tabular, precise, one amber signal colour.
The rule that carries it: *data is monospace, prose is sans, never the
reverse.*

It suits this content specifically because the content is measurements — a
10 N class thruster, 10+ hot-fire tests, 100 mN, 10 Longbow satellites,
GPA 3.95, two IAC papers. The current design buries those in paragraphs.

## What it costs

Close to nothing in payload. No new webfonts (Space Grotesk, Inter and
JetBrains Mono are already self-hosted — the system only reassigns which is
used where), no new images, and several components get deleted rather than
added. The grid wash and corner marks are pure CSS.

## Content

**No content file is modified, and none will be without your say-so.**

Three things in the mockups are *derived* from existing content rather than
copied from it, and each is flagged inline in the preview:

1. **Project years** — read off the presentation venues (IAC 2024 Milan → 2024).
2. **Project status** — inferred; everything currently reads Complete.
3. **The four hero readouts** — see `SPEC.md` §8 for the source of each.

One thing genuinely needs new content: per-project `metrics`. The field already
exists in `types.ts` but is empty, and filling it means writing values like
`{ label: "Thrust class", value: "100", unit: "mN" }`. That's yours to approve.

`SPEC.md` §10 lists the honest risks — dark-first is a real commitment, the
aesthetic is opinionated, and it will look emptier than the current design
until the project media lands.
