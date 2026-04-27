# Week 6 — User Account XML: Concept & Implementation

---

## 1. What is XML and why use it here?

XML (eXtensible Markup Language) is a text format for storing structured data.
Unlike HTML (which describes *presentation*), XML describes *meaning*.
You define your own tags; there is no fixed vocabulary.

```xml
<book id="B001">
  <title>Dune</title>
</book>
```

The tag names `<book>` and `<title>` mean whatever you want them to mean — XML
just enforces that the file is well-formed (tags are properly nested and closed).

**Why XML for user accounts?**
This week's goal is to practise storing and reading structured, relational data
in XML. In production you would use a database, but XML teaches the same
concepts (schema design, relationships between records, parsing) without needing
a server.

---

## 2. Designing the XML schema (from first principles)

A user account needs to hold several kinds of data:

| Piece of data | Type | Notes |
|---|---|---|
| Username | string | unique identifier |
| Password | string | must NOT be stored in plaintext |
| Email | string | |
| Purchase history | list of orders | each order has items |

### 2.1 Attributes vs. child elements

XML lets you store values as **attributes** (`<user id="U001">`) or as **child
elements** (`<username>alice</username>`). The common convention:

- Use **attributes** for metadata / identifiers (things that describe the
  element itself): `id`, `date`, `currency`, `algorithm`.
- Use **child elements** for the actual content / data: username, email,
  password hash, item title.

### 2.2 The resulting structure

```xml
<users>
  <user id="U001">
    <username>alice_reads</username>
    <password algorithm="sha256">9f4c26b4…</password>
    <email>alice@example.com</email>
    <purchaseHistory>
      <purchase orderId="ORD001" date="2025-01-10">
        <item bookId="B001" title="Dune" price="14.99" currency="USD"/>
      </purchase>
    </purchaseHistory>
  </user>
</users>
```

`<purchaseHistory>` is a container element — it groups zero or more `<purchase>`
children. `<purchase>` groups zero or more `<item>` children. This nesting
creates a natural one-to-many relationship (one user → many orders → many items)
without needing a foreign key like a relational database would.

---

## 3. Password hashing — why and how

### 3.1 Why you cannot store plaintext passwords

If `users.xml` is ever leaked (or just shared with a classmate), everyone's
password is immediately exposed. Users often reuse passwords across sites, so a
single leak can compromise their email, bank, etc.

**The solution:** store a *one-way transformation* of the password, not the
password itself.

### 3.2 What a hash function does

A hash function takes an input of any length and produces a fixed-length output
called a **digest**. Two key properties:

1. **Deterministic** — same input always gives the same digest.
2. **One-way (pre-image resistant)** — given the digest, it is computationally
   infeasible to recover the original input.

```
sha256("password123") → "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f"
sha256("Password123") → "b6f28a9e4f...  (completely different — one capital letter changes everything)"
```

When a user logs in, you hash what they typed and compare it to the stored hash.
You never need to know the original password.

### 3.3 SHA-256

SHA-256 (Secure Hash Algorithm, 256-bit output) is part of the SHA-2 family,
standardised by NIST. It produces a 64-character hexadecimal string.

In the XML the `algorithm` attribute records which hash was used:

```xml
<password algorithm="sha256">9f4c26b4b7d1e839…</password>
```

This matters because hash algorithms can become weak over time; recording the
algorithm lets you migrate to a stronger one later.

> **Lab note:** The hashes in `users.xml` are pre-computed placeholders that
> look like SHA-256 digests. In a real application you would hash on the server
> using a library (`bcrypt`, `argon2`, or Node's built-in `crypto` module) and
> never do it in the browser.

---

## 4. Parsing XML in the browser (the DOM way)

The browser exposes a `DOMParser` API that turns an XML string into a navigable
tree — the same kind of tree it builds for HTML.

```js
const text = await fetch('users.xml').then(r => r.text());
const xml  = new DOMParser().parseFromString(text, 'application/xml');
```

Now `xml` is a document object. You navigate it with the same methods you use
for HTML:

```js
xml.getElementsByTagName('user')   // HTMLCollection of all <user> elements
element.getAttribute('id')         // read an attribute
element.textContent                // read inner text of an element
```

### 4.1 Walking the tree

```js
Array.from(xml.getElementsByTagName('user')).map(u => {
  const username = u.getElementsByTagName('username')[0].textContent;
  const purchases = Array.from(u.getElementsByTagName('purchase'));
  // ...
});
```

`getElementsByTagName` searches *within* the element it is called on, so
`u.getElementsByTagName('purchase')` only finds purchases belonging to user `u`.

---

## 5. The JavaScript in this week's lab

### `loadUsers()` — fetch + parse

```js
async function loadUsers() {
  const res  = await fetch('users.xml');
  const text = await res.text();
  const xml  = new DOMParser().parseFromString(text, 'application/xml');

  return Array.from(xml.getElementsByTagName('user')).map(u => {
    const passwordEl = u.getElementsByTagName('password')[0];
    const purchases  = Array.from(u.getElementsByTagName('purchase')).map(p => ({
      orderId: p.getAttribute('orderId'),
      date:    p.getAttribute('date'),
      items:   Array.from(p.getElementsByTagName('item')).map(i => ({
        title:    i.getAttribute('title'),
        price:    i.getAttribute('price'),
        currency: i.getAttribute('currency'),
      })),
    }));

    return {
      id:        u.getAttribute('id'),
      username:  u.getElementsByTagName('username')[0].textContent,
      password:  passwordEl.textContent,          // the hash, never the real pwd
      algorithm: passwordEl.getAttribute('algorithm'),
      email:     u.getElementsByTagName('email')[0].textContent,
      purchases,
    };
  });
}
```

### `renderUsers(users)` — build DOM cards

Each user becomes a collapsible card. Clicking the header toggles the details
panel. The password hash is shown truncated (`abc123…`) with the full hash
available on hover via the `title` attribute.

### `applyFilters(allUsers)` — search + filter

The same pattern as Week 5: filter the in-memory array, then call `renderUsers`
with the subset. No re-fetching needed.

---

## 6. Security considerations shown in this lab

| Concept | Where you see it |
|---|---|
| Never store plaintext passwords | `<password algorithm="sha256">hash…</password>` |
| Record which algorithm was used | `algorithm` attribute |
| Never display the full hash | JS truncates to first 12 chars in the UI |
| Escape user data before inserting into HTML | `esc()` helper prevents XSS |

### The `esc()` helper (XSS prevention)

```js
function esc(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
```

If a username in the XML were `<script>alert(1)</script>`, inserting it raw into
`innerHTML` would execute that script. `esc()` converts the angle brackets to
HTML entities so they render as text, not markup.

---

## 7. File structure

```
week_06/
├── users.xml           ← data: user accounts with hashed passwords + history
├── users_view.html     ← the page (load this in a browser via a local server)
├── users.css           ← styling
├── users.js            ← fetch, parse, render, filter
└── WEEK6_CONCEPT.md    ← this file
```

**To run:** start a local HTTP server in the `week_06/` folder (e.g.
`python -m http.server 8000`) and open `http://localhost:8000/users_view.html`.
You cannot open `users_view.html` by double-clicking because `fetch()` is
blocked on `file://` URLs by the browser's same-origin policy.

---

## 8. Relation to previous weeks

| Week | Concept introduced | How week 6 builds on it |
|---|---|---|
| 1–2 | HTML structure, frames | Basic page layout reused |
| 3 | Forms, JS validation | Registration collects the data that would populate `users.xml` |
| 4 | `localStorage`, cart | Purchase history in XML is the persistent, server-side equivalent of the cart |
| 5 | XML + `DOMParser` | Same technique, now applied to user/account data instead of book catalog |
| **6** | **Password hashing, relational XML, account data** | — |
