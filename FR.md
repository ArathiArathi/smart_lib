FUNCTIONAL REQUIREMENTS (FR)
(Complete list covering every module – nothing missing)

5.1 Authentication &amp; Authorization
FR1: Admin Login
 Login using Admin ID + Password
 JWT authentication tokens
 Role-based access control
FR2: Admin Registration
 Only Super Admin can add admins
 Auto-send credentials to admin email
FR3: Logout
 Token invalidation
 Session cleanup

5.2 Dashboard Module
FR4: Display Summary Metrics
Dashboard must show:
 Total Students
 Pending Approvals
 Total Books
 Total Book Copies
 Books Issued Today

 Due Soon
 Overdue
 Total Staff
 Fine Collected (optional)
FR5: Analytics &amp; Charts
Dashboard graphs:
 Daily issuance chart
 Monthly borrowing trends
 Category-wise most borrowed books
 Department/semester usage stats

5.3 Student Management Module
FR6: View Students List
Search, filter, sort by:
 Name
 ID number
 Department
 Course
 Semester
 Status (Approved/Blocked/Pending)
FR7: Approve/Reject Students
 Approve pending student registrations
 Auto-generate library card, barcode, QR
 Send approval notification to student
FR8: Student Profile View
 Complete student info
 Borrowing history
 Active loans
 Fines
FR9: Manage Student Status
 Block/Unblock students

 Suspend account
 Force logout
FR10: Reset Password
Admin can reset student login password.

5.4 Library Card Management
FR11: Generate Library Card
 Auto-generate Card Number
 Generate Barcode &amp; QR Code
 Assign to student
FR12: Reissue Card
 Re-generate card if lost
 Old card marked inactive
FR13: Print/Download Card
Generate printable PDF card with:
 Student photo
 Name
 ID number
 Card number
 Barcode / QR

5.5 Book Management Module
FR14: Add New Book
Input fields:
 Title
 Author
 Edition
 Publisher
 ISBN
 Category
 Rack &amp; Shelf

 Course &amp; Semester (if applicable)
 Cover image
FR15: Update Book Details
 Edit any book information
 Replace cover image
FR16: Delete/Archive Book
 Archive (soft delete) recommended
FR17: View Books List
 Search by title, author, category
 Filters: Category, course, availability

5.6 Book Copies &amp; Inventory
FR18: Add Book Copies
 Add single or bulk copies
 Auto-generate unique copy codes
 Auto-generate barcode/QR for each copy
FR19: Track Copy Status
Copy statuses:
 Available
 Issued
 Lost
 Damaged
FR20: Print Barcode Stickers
Generate printable sheet (PDF) of barcodes.

5.7 Issue &amp; Return Module
FR21: Issue Book
Steps:
1. Scan/Enter Student Card Barcode
2. Scan/Enter Book Copy Barcode
3. Validate:

o Student status
o Book availability
o Loan limit
4. Confirm issue
5. Generate due date
6. Notify student
FR22: Return Book
Steps:
1. Scan/Enter Book Copy Barcode
2. System auto-detects:
o Loan record
o Student
3. Check overdue
4. Calculate fine
5. Mark as returned
6. Update book availability
FR23: Manual Override (Super Admin Only)
 Force return
 Waive fine

5.8 Loan Tracking
FR24: View All Loans
Filter by:
 Student
 Book
 Issue date
 Due date
 Status
FR25: Due Soon
Books due within X days.
FR26: Overdue List

Books not returned by due date.
FR27: Send Reminders
 Bulk reminder notifications
 Individual reminders

5.9 Academic Calendar Module
FR28: Add Academic Event
Fields:
 Title
 Description
 Date(s)
 Type (Holiday, Exam, Library Closed)
FR29: View/Edit/Delete Events**
FR30: Upload Academic Calendar PDF/Image**
Visible on student app.

5.10 Notifications Module
FR31: Send Notifications
Admin can send:
 Alerts
 Announcements
 Due reminders
 Approval updates
FR32: Notification History**
Log of sent notifications.

5.11 Reports &amp; Analytics
FR33: Export Reports (CSV/PDF)**
Types:
 Issued books
 Returned books

 Overdue list
 Student-wise report
 Book-wise report
 Department usage report
FR34: Fine Collection Report**

5.12 System Administration (Super Admin)
FR35: Manage Admins**
 Create admins
 Assign roles
 Activate/Deactivate
FR36: Global Settings**
 Loan rules (max books, max days)
 Fine rules
 Auto-reminder schedule
FR37: Audit Logs**
Track:
 Admin actions
 Issue/Return logs
 Data changes
