# Task 12 — User Accounts XML

Create an XML structure for user account information with purchase history.

## File
- `user_accounts.xml` — 3 users with nested purchase history

## How to Run
1. Double-click `user_accounts.xml` → opens in browser as XML tree
2. Expand/collapse nodes to see the nested structure
3. Or open in VS Code to view the full file

## Structure
```xml
<users>
  <user id="U001">
    <username>...</username>
    <password>...</password>
    <email>...</email>
    <purchaseHistory>
      <purchase>
        <orderId>...</orderId>
        <bookTitle>...</bookTitle>
        <date>...</date>
        <amount>...</amount>
      </purchase>
    </purchaseHistory>
  </user>
</users>
```

## Key Points
- Nested elements: `purchaseHistory` contains multiple `purchase` entries
- Shows one-to-many relationship in XML
