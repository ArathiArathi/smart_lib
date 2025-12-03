1. INTRODUCTION
The Web Admin Panel is the management console used by librarians, staff, and super admins to
control all operations of the Smart Library System. It enables:
 Student verification &amp; approvals
 Book and inventory management
 Barcode &amp; QR generation
 Issuing &amp; returning books
 Managing academic calendar
 Viewing statistics, analytics &amp; reports
 Fine and overdue tracking
The panel must be secure, fast, scalable, and easy to use.

2. PURPOSE
This document defines:
 Complete functional requirements
 Non-functional requirements
 Full tech stack
 Core modules
 Workflow details
This ensures the Web Admin Panel is developed as a production-level, coherent, and maintainable
system.

3. USERS
3.1 User Roles
Role Permission Level
Super Admin Full control of system (colleges, admins, rules)

Library
Admin Manages students, books, issues, returns
Staff Limited permissions (issue/return, basic

operations)

4. TECHNOLOGY STACK
4.1 Frontend (Web Admin Panel)
 React.js (SPA)
 React Router
 Tailwind CSS
 Bootstrap 5 (Components &amp; Tables)
 Axios (API Calls)
 Chart.js / Recharts (Analytics)
 React Data Table / Bootstrap Table (sorting, filtering, pagination)
 React QR/Barcode reader (for webcam scanning)
 JWT Token Handling
4.2 Backend APIs
 Node.js (Express / NestJS) – API Gateway &amp; Notifications
 Laravel (PHP) – Main business logic (books, students, loans, cards)
 Laravel Sanctum/Passport – Authentication
 Barcode &amp; QR Libraries:
o Milon Barcode (Laravel)
o Simple QrCode (BaconQrCode)

4.3 Database
 MySQL 8
 InnoDB, UTF8MB4
 Indexed for:
o Students
o Loans
o Book copies
o Barcodes

o Due date queries