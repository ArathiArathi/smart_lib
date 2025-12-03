6. NON-FUNCTIONAL REQUIREMENTS (NFR)

6.1 Performance Requirements
 NFR1: All admin pages must load in under 2 seconds.
 NFR2: API response time &lt; 300 ms on average.
 NFR3: Book lists must support pagination for thousands of records.
 NFR4: Barcode scanning must respond in &lt; 500 ms.

6.2 Security Requirements
 NFR5: Only authenticated users can access admin pages.

 NFR6: Role-based access control enforced on all modules.
 NFR7: All communication must use HTTPS.
 NFR8: Passwords stored using bcrypt/argon2.
 NFR9: Prevent SQL injection, XSS, CSRF.

6.3 Reliability &amp; Availability
 NFR10: System uptime ≥ 99%
 NFR11: Auto-reconnect on network failures
 NFR12: Retry mechanism for notification delivery

6.4 Usability
 NFR13: Responsive design: desktop, tablet-friendly
 NFR14: Clean UI using Tailwind + Bootstrap
 NFR15: Search &amp; filter should be intuitive and fast

6.5 Maintainability
 NFR16: Component-based React architecture
 NFR17: Code must follow ESLint + Prettier standards
 NFR18: Proper folder structure for scalability

6.6 Scalability
 NFR19: Backend allows horizontal scaling
 NFR20: DB indexing for large datasets
 NFR21: Node.js gateway handles high request volume

6.7 Backup &amp; Recovery
 NFR22: Daily automated DB backup
 NFR23: Restore testing every 30 days
 NFR24: File storage backup (covers, cards, barcodes)