# MENG 4450 — PLC & Robotics: in-class activities

Interactive activities run during class meetings of MENG 4450 at Saint Louis University.

**This site is not a textbook.** It carries no lessons and no reading. Principle comes from assigned published sources; this repository holds only the interactive work done in the room, in pairs, on a shared screen.

Live at <https://madibabaiasl.github.io/industrial-automation-course/>

---

## What is here

```
index.html                          activity hub
assets/css/styles.css               shared design system, one file
assets/js/activity.js               shared activity engine, no dependencies
assets/mecharithm-lab-logo.png
activities/
  syllabus-card-game.html           "Read the Syllabus" — day one, three rounds
```

## Design constraints, deliberately kept

- **No build step.** Plain HTML, CSS and JavaScript. Edit a file, commit, it is live.
- **No dependencies** beyond the Inter webfont, and the page still works if that fails to load.
- **No accounts, no backend, no storage.** Nothing an activity records leaves the tab. Close it and the state is gone. Scores are feedback for the pair playing, never a grade.
- **Tap, not drag.** Every interaction works with a single tap so a phone is as usable as a laptop. HTML5 drag-and-drop is avoided because it is unreliable on touch.
- **Palette and type unchanged** from the previous version of this site: Mecharithm indigo `#383890`, gold `#F0C040`, black and white, on the system SF stack with Inter as the fallback.

## Adding an activity

1. Copy `activities/syllabus-card-game.html` to a new file in `activities/`.
2. Keep the top bar, breadcrumb and footer as they are.
3. Replace the data arrays near the top of the inline script. The shared engine in `assets/js/activity.js` supplies:

   | Helper | What it does |
   |---|---|
   | `Activity.shuffle(list)` | Fisher-Yates, returns a new array |
   | `Activity.Deck({deck, mount, render, onDone})` | plays a set of cards one at a time |
   | `Activity.Score()` | `.tally(ok)`, `.right`, `.asked`, `.pct()` |
   | `Activity.dots(node, total, index)` | progress dots in the round bar |
   | `Activity.reveal(mount, ok, body, source)` | feedback panel with an optional quoted source |
   | `Activity.option(text, onPick)` | one option button |
   | `Activity.lock(node)` | disables every button inside a node |

4. Add a card for it on `index.html`, changing the `flag plan` to `flag live` and pointing the `href` at the new file.

### The rule every activity follows

Wherever it can, an activity turns on something the student must read off the equipment in front of them: which slot holds the input module on *this* bench, what the ungraduated timing dial actually gives, which jacks carry 115 V on a panel that is otherwise 24 V. Those are the questions that cannot be answered from anywhere except the room.

### When an activity states a course rule

Quote the syllabus rather than paraphrasing it, and show the quotation in the feedback panel using the `source` argument to `Activity.reveal`. If the syllabus changes, search the repository for the quoted phrase so no activity is left teaching a rule that no longer exists.

---

© 2026 Mecharithm Lab · Developed for MENG 4450 at Saint Louis University
