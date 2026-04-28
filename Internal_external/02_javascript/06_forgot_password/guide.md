# Task 06 — Forgot Password Form

Validate email format and provide feedback using JavaScript.

## File
- `index.html` — form + validation logic

## How to Run
1. Double-click `index.html` → opens in any browser
2. Enter invalid email (e.g. `abc`) → see error
3. Enter valid email (e.g. `abc@gmail.com`) → see success message

## How It Works
- User enters email and submits
- JavaScript validates format using regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Valid email → shows success message
- Invalid email → shows error message
- No real DB check — just format validation
