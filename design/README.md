# `design/` — two proposed design systems

Two complete redesigns of the portfolio, delivered as **design systems** rather
than as site edits. Nothing in `src/` has been touched, and no content file has
been modified.

**Pick one.** They are alternatives, not layers.

```
# Windows
start design/flight-deck/preview.html
start design/swiss/preview.html
```

Each folder holds the same three files:

| File           | What it is                                                              |
| -------------- | ----------------------------------------------------------------------- |
| `preview.html` | **Start here.** The whole system rendered with real content, plus Home and Project-detail mockups. Has a theme toggle. |
| `SPEC.md`      | Concept, hard rules, colour, type, components, page layouts, accessibility contract, migration plan, honest risks. |
| `tokens.css`   | The CSS custom properties, ready to drop into `src/app/globals.css`.     |

No build step, no dependencies. Both previews pull fonts from Google Fonts so
they render accurately; offline they fall back to system faces and still read.

---

## The two options

### [`flight-deck/`](./flight-deck/) — mission control

An instrument panel reading out an engineering career. Dense, tabular,
precise. Dark-first, one amber signal colour, hairline structure everywhere,
and a set of small technical devices — bracketed indices, dot leaders, corner
registration marks, status pills.

**The rule that carries it:** data is monospace, prose is sans, never the
reverse.

### [`swiss/`](./swiss/) — grid

International Typographic Style applied straight. One typeface, a strict
12-column grid, dramatic scale contrast, and structure carried entirely by
alignment and whitespace. Light-first, one red accent used two or three times
per page, no boxes at all.

**The rules that carry it:** one typeface; no boxes; alignment is meaning.

---

## Side by side

|                        | Flight Deck                          | Grid                                  |
| ---------------------- | ------------------------------------ | ------------------------------------- |
| Primary theme          | Dark                                 | Light                                 |
| Typefaces              | 3 (Space Grotesk, Inter, JetBrains Mono) | **1** (Inter) — drops two          |
| Accent                 | Amber `#ff9e1b`                      | Red `#d62828`                         |
| Structure from         | Hairlines, panels, borders           | Alignment and whitespace              |
| Corner radius          | 2px                                  | **0**                                 |
| Page width             | 1120px                               | 1280px                                |
| Section spacing        | 64 / 96px                            | 128 / 192px                           |
| Components             | 9                                    | 6                                     |
| Buttons                | Filled + ghost                       | **None** — underlined text only       |
| Tags                   | Bracketed outlines                   | Stacked plain text                    |
| Says                   | *"This person measures things"*      | *"This person has judgement"*         |

### How they fail

This is the part worth weighing.

**Flight Deck fails gracefully.** Executed at 80% it is still unusual and still
clearly an engineer's site. Its risk is the opposite one: overplayed, it reads
as cosplay, which is why its spec opens with six anti-gimmick rules.

**Grid fails blandly.** Executed well it is timeless — the reference work is
seventy years old and has not dated. Executed at 90% it looks like every
minimal portfolio template on the internet. Its spec opens with six
anti-blandness rules for that reason.

### Cost to adopt

Grid is the cheaper migration: fewer new components, more deletions, two fewer
webfonts, and no dark-mode-default inversion to get wrong. Flight Deck adds
more components than it removes and has to flip the theme default, which is
the one genuinely fiddly step in either plan.

Neither adds meaningful payload. Flight Deck is roughly net zero; Grid is a
net saving.

### Which needs more from you

Both look better once project photos and CAD renders land — **that risk is
sharper for Grid**, whose whitespace is currently holding nothing.

Flight Deck asks for more derived content up front: four hero readouts, project
years, and project status. One of those readouts ("3+ yrs research") is on your
content-accuracy list, so it is flagged rather than used. Grid has no readout
bar, so that figure never has to appear at all — it only derives project years.

Neither writes new content. Per-project `metrics` are the one thing that would
need you: structural in Flight Deck, optional in Grid.

---

## Status

Proposed, not applied. Branch `design-system`. Verified in Chrome across both
themes and at a 390px viewport with no horizontal overflow.

Each `SPEC.md` ends with a **Known risks** section — read those before deciding.
