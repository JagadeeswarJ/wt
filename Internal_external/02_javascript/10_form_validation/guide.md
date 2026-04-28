# Task 10 — Real-Time Form Validation

Validate a 6-field form in real-time as the user types.

## File
- `index.html` — full form with live validation feedback

## How to Run
1. Double-click `index.html` → opens in any browser
2. Start typing in any field → validation runs instantly
3. Red message = invalid, Green = valid
4. All fields must be valid before form submits

## Fields & Rules
| Field | Rule |
|-------|------|
| Name | Not empty |
| Email | Valid format (regex) |
| Phone | Exactly 10 digits |
| Username | Min 3 characters |
| Password | Min 6 characters |
| Confirm Password | Must match password |

## How It Works
- Each field has an `input` event listener → validates on every keystroke
- `validate(id, errId, checkFn)` helper shows/hides error messages
- Submit button checks all fields before allowing submission
