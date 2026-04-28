# Task 04 — Responsive Webpage

Make the bookstore webpage responsive across screen sizes using CSS.

## File
- `index.html` — responsive bookstore page

## How to Run
1. Double-click `index.html` → opens in any browser
2. Resize the browser window to see responsive behavior
3. Or press **F12 → Toggle device toolbar** in Chrome to simulate mobile

## Techniques Used
| Technique | Purpose |
|-----------|---------|
| `grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))` | Cards auto-wrap on smaller screens |
| `clamp(1rem, 2.5vw, 1.5rem)` | Font size scales with screen width |
| `@media (max-width: 600px)` | Stack header elements vertically on mobile |

## Test
- Wide screen → multiple book cards per row
- Narrow screen (< 600px) → cards stack to single column
