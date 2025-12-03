# Smart Library Admin Panel - Project Modular Documentation

## Project Overview

**Project Name**: Smart Library System - Web Admin Panel  
**Purpose**: Management console for librarians, staff, and super admins to control all library operations  
**Status**: In Development  
**Last Updated**: December 2025

### Core Capabilities
- Student verification & approvals
- Book and inventory management
- Barcode & QR code generation
- Book issuing & returning
- Academic calendar management
- Statistics, analytics & reports
- Fine and overdue tracking
- System administration & audit logs

---

## User Roles & Permissions

| Role | Permission Level | Responsibilities |
|------|------------------|------------------|
| **Super Admin** | Full system control | Manages colleges, admins, system rules, audit logs |
| **Library Admin** | Standard operations | Manages students, books, issues, returns, notifications |
| **Staff** | Limited operations | Issue/return books, basic student management |

---

## Technology Stack

### Frontend (Web Admin Panel)
- **Framework**: React.js (Single Page Application)
- **Routing**: React Router
- **Styling**: Tailwind CSS + Bootstrap 5
- **HTTP Client**: Axios
- **Analytics**: Chart.js / Recharts
- **Tables**: React Data Table / Bootstrap Table
- **Scanning**: React QR/Barcode reader (webcam support)
- **Authentication**: JWT Token Handling

### Backend APIs
- **API Gateway**: Node.js (Express / NestJS) + Notifications
- **Business Logic**: Laravel (PHP)
- **Authentication**: Laravel Sanctum/Passport
- **Barcode/QR Libraries**: 
  - Milon Barcode (Laravel)
  - BaconQrCode (Simple QrCode)

### Database
- **System**: MySQL 8
- **Encoding**: InnoDB, UTF8MB4
- **Indexing**: Students, Loans, Book Copies, Barcodes, Due dates

---

## Project Modules & Features

### 1. Authentication & Authorization (FR1-FR3)

**Status**: Pending Development

| Feature | Description | Priority |
|---------|-------------|----------|
| **FR1: Admin Login** | Login with Admin ID + Password; JWT token generation; Role-based access control | High |
| **FR2: Admin Registration** | Only Super Admin can add admins; Auto-send credentials to admin email | High |
| **FR3: Logout** | Token invalidation; Session cleanup | High |

**Implementation Notes**:
- Use JWT for stateless authentication
- Implement role-based middleware
- Secure password transmission over HTTPS

---

### 2. Dashboard Module (FR4-FR5)

**Status**: Pending Development

#### FR4: Display Summary Metrics
**Metrics to Display**:
- Total Students
- Pending Approvals
- Total Books
- Total Book Copies
- Books Issued Today
- Books Due Soon
- Overdue Books
- Total Staff
- Fine Collected (optional)

#### FR5: Analytics & Charts
**Dashboard Visualizations**:
- Daily issuance chart
- Monthly borrowing trends
- Category-wise most borrowed books
- Department/semester usage statistics

**Priority**: High  
**Implementation Notes**: Use Chart.js or Recharts for responsive visualizations

---

### 3. Student Management Module (FR6-FR10)

**Status**: Pending Development

| Feature | Description | Priority |
|---------|-------------|----------|
| **FR6: View Students List** | Search, filter, sort by: Name, ID, Department, Course, Semester, Status | High |
| **FR7: Approve/Reject Students** | Approve pending registrations; Auto-generate library card, barcode, QR; Send notifications | High |
| **FR8: Student Profile View** | Complete info, borrowing history, active loans, fines | High |
| **FR9: Manage Student Status** | Block/Unblock, Suspend, Force logout | Medium |
| **FR10: Reset Password** | Admin can reset student login passwords | Medium |

---

### 4. Library Card Management (FR11-FR13)

**Status**: Pending Development

| Feature | Description | Priority |
|---------|-------------|----------|
| **FR11: Generate Library Card** | Auto-generate card number; Generate Barcode & QR; Assign to student | High |
| **FR12: Reissue Card** | Re-generate if lost; Mark old card as inactive | Medium |
| **FR13: Print/Download Card** | Generate printable PDF with student photo, name, ID, card number, barcode, QR | High |

---

### 5. Book Management Module (FR14-FR17)

**Status**: Pending Development

#### FR14: Add New Book
**Input Fields**:
- Title
- Author
- Edition
- Publisher
- ISBN
- Category
- Rack & Shelf
- Course & Semester (if applicable)
- Cover image

#### FR15: Update Book Details
- Edit any book information
- Replace cover image

#### FR16: Delete/Archive Book
- Soft delete (Archive) recommended

#### FR17: View Books List
- Search by title, author, category
- Filters: Category, course, availability

**Priority**: High

---

### 6. Book Copies & Inventory (FR18-FR20)

**Status**: Pending Development

| Feature | Description | Priority |
|---------|-------------|----------|
| **FR18: Add Book Copies** | Add single or bulk copies; Auto-generate unique copy codes; Auto-generate barcode/QR | High |
| **FR19: Track Copy Status** | Status types: Available, Issued, Lost, Damaged | High |
| **FR20: Print Barcode Stickers** | Generate printable PDF sheet of barcodes | Medium |

---

### 7. Issue & Return Module (FR21-FR23)

**Status**: Pending Development

#### FR21: Issue Book
**Process**:
1. Scan/Enter Student Card Barcode
2. Scan/Enter Book Copy Barcode
3. Validate: Student status, Book availability, Loan limit
4. Confirm issue
5. Generate due date
6. Notify student

#### FR22: Return Book
**Process**:
1. Scan/Enter Book Copy Barcode
2. System auto-detects: Loan record, Student
3. Check overdue status
4. Calculate fine
5. Mark as returned
6. Update book availability

#### FR23: Manual Override
- Super Admin only
- Force return capability
- Waive fine authority

**Priority**: High  
**Critical**: Core functionality of library system

---

### 8. Loan Tracking Module (FR24-FR27)

**Status**: Pending Development

| Feature | Description | Priority |
|---------|-------------|----------|
| **FR24: View All Loans** | Filter by: Student, Book, Issue date, Due date, Status | High |
| **FR25: Due Soon** | Display books due within X days | High |
| **FR26: Overdue List** | Display books not returned by due date | High |
| **FR27: Send Reminders** | Bulk & individual reminder notifications | Medium |

---

### 9. Academic Calendar Module (FR28-FR30)

**Status**: Pending Development

| Feature | Description | Priority |
|---------|-------------|----------|
| **FR28: Add Academic Event** | Title, Description, Date(s), Type (Holiday, Exam, Library Closed) | Medium |
| **FR29: View/Edit/Delete Events** | Full CRUD operations | Medium |
| **FR30: Upload Academic Calendar** | PDF/Image upload; Visible on student app | Medium |

---

### 10. Notifications Module (FR31-FR32)

**Status**: Pending Development

| Feature | Description | Priority |
|---------|-------------|----------|
| **FR31: Send Notifications** | Alerts, Announcements, Due reminders, Approval updates | Medium |
| **FR32: Notification History** | Log of all sent notifications | Low |

---

### 11. Reports & Analytics (FR33-FR34)

**Status**: Pending Development

#### FR33: Export Reports (CSV/PDF)
**Report Types**:
- Issued books
- Returned books
- Overdue list
- Student-wise report
- Book-wise report
- Department usage report

#### FR34: Fine Collection Report
- Monthly/Quarterly summary
- Student-wise breakdown

**Priority**: Medium

---

### 12. System Administration (FR35-FR37)

**Status**: Pending Development

| Feature | Description | Priority |
|---------|-------------|----------|
| **FR35: Manage Admins** | Create admins, Assign roles, Activate/Deactivate | Medium |
| **FR36: Global Settings** | Loan rules (max books, max days), Fine rules, Auto-reminder schedule | Medium |
| **FR37: Audit Logs** | Track admin actions, Issue/Return logs, Data changes | Low |

---

## Non-Functional Requirements (NFR)

### Performance (NFR1-NFR4)
| ID | Requirement | Target |
|----|-------------|--------|
| **NFR1** | Admin page load time | < 2 seconds |
| **NFR2** | API response time (average) | < 300 ms |
| **NFR3** | Book list pagination | Support thousands of records |
| **NFR4** | Barcode scanning response | < 500 ms |

### Security (NFR5-NFR9)
- **NFR5**: Only authenticated users access admin pages
- **NFR6**: Role-based access control enforced on all modules
- **NFR7**: All communication over HTTPS
- **NFR8**: Passwords stored using bcrypt/argon2
- **NFR9**: Prevent SQL injection, XSS, CSRF attacks

### Reliability & Availability (NFR10-NFR12)
- **NFR10**: System uptime ≥ 99%
- **NFR11**: Auto-reconnect on network failures
- **NFR12**: Retry mechanism for notification delivery

### Usability (NFR13-NFR15)
- **NFR13**: Responsive design (desktop, tablet-friendly)
- **NFR14**: Clean UI using Tailwind + Bootstrap
- **NFR15**: Intuitive and fast search & filter

### Maintainability (NFR16-NFR18)
- **NFR16**: Component-based React architecture
- **NFR17**: Code follows ESLint + Prettier standards
- **NFR18**: Proper folder structure for scalability

### Scalability (NFR19-NFR21)
- **NFR19**: Backend allows horizontal scaling
- **NFR20**: Database indexing for large datasets
- **NFR21**: Node.js gateway handles high request volume

### Backup & Recovery (NFR22-NFR24)
- **NFR22**: Daily automated database backup
- **NFR23**: Restore testing every 30 days
- **NFR24**: File storage backup (covers, cards, barcodes)

---

## Development Status Summary

### Module Completion Status

| Module | FR Count | Status | Priority | ETA |
|--------|----------|--------|----------|-----|
| Authentication & Authorization | 3 | Pending | High | - |
| Dashboard | 2 | Pending | High | - |
| Student Management | 5 | Pending | High | - |
| Library Cards | 3 | Pending | High | - |
| Book Management | 4 | Pending | High | - |
| Book Copies & Inventory | 3 | Pending | High | - |
| Issue & Return | 3 | Pending | High | - |
| Loan Tracking | 4 | Pending | High | - |
| Academic Calendar | 3 | Pending | Medium | - |
| Notifications | 2 | Pending | Medium | - |
| Reports & Analytics | 2 | Pending | Medium | - |
| System Administration | 3 | Pending | Medium | - |
| **TOTAL** | **37 FR** | **Pending** | - | - |

### Non-Functional Requirements Status

| Category | Count | Status |
|----------|-------|--------|
| Performance | 4 | Pending |
| Security | 5 | Pending |
| Reliability | 3 | Pending |
| Usability | 3 | Pending |
| Maintainability | 3 | Pending |
| Scalability | 3 | Pending |
| Backup & Recovery | 3 | Pending |
| **TOTAL** | **24 NFR** | **Pending** |

---

## Project Statistics

- **Total Functional Requirements**: 37
- **Total Non-Functional Requirements**: 24
- **Total Modules**: 12
- **Primary Users**: 3 roles
- **Frontend Stack**: React.js + Tailwind CSS + Bootstrap 5
- **Backend Stack**: Node.js + Laravel
- **Database**: MySQL 8

---

## Key Development Priorities

### Phase 1: Core Authentication & Dashboard (High Priority)
1. Admin authentication system
2. Dashboard with metrics
3. Student management approvals

### Phase 2: Book & Inventory Management (High Priority)
4. Book CRUD operations
5. Book copies management
6. Barcode/QR generation

### Phase 3: Issue & Return Operations (High Priority)
7. Book issuing workflow
8. Book return workflow
9. Loan tracking

### Phase 4: Extended Features (Medium Priority)
10. Academic calendar
11. Notifications system
12. Reports & analytics

### Phase 5: System Administration (Medium Priority)
13. Admin management
14. Global settings
15. Audit logs

---

## Notes & Recommendations

1. **Security First**: Implement authentication and RBAC before any feature development
2. **Database Design**: Create proper indexing strategy from the beginning
3. **API Rate Limiting**: Implement on Node.js gateway to prevent abuse
4. **Testing**: Comprehensive unit and integration tests for all modules
5. **Documentation**: Maintain API documentation as development progresses
6. **Monitoring**: Set up logging and monitoring for production readiness
7. **Backup Strategy**: Implement daily backups before going live
8. **Performance Testing**: Regular load testing to ensure NFR compliance

---

## File References & Related Documentation

- **fr.md**: Detailed functional requirements
- **nfr.md**: Detailed non-functional requirements
- **intro.md**: Project introduction and tech stack details
- **Summary.md**: Module overview summary

---

**Document Prepared For**: Smart Library System Development Team  
**Classification**: Internal Project Documentation  
**Version**: 1.0
