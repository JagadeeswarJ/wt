# Task 05 — User Registration Form Validation

Validate a registration form (username, password, confirm password) using JavaScript.

## File
- `index.html` — form + validation logic

## How to Run
1. Double-click `index.html` → opens in any browser
2. Try submitting empty form → see validation errors
3. Fill valid values → form submits successfully

## Validation Rules
| Field | Rule |
|-------|------|
| Username | Min 5 characters |
| Password | Min 8 characters |
| Confirm Password | Must match password |

## How It Works
- On form submit → `validateForm()` runs
- Checks each field, shows inline error `<span>` if invalid
- Returns `false` to stop form submission if any error exists
