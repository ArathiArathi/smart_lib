<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\BookCopyController;
use App\Http\Controllers\LibraryCardController;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\LoanTrackingController;
use App\Http\Controllers\AcademicCalendarController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::get('/dashboard/metrics', [DashboardController::class, 'metrics']);
    Route::get('/dashboard/analytics', [DashboardController::class, 'analytics']);

    Route::apiResource('students', StudentController::class);
    Route::post('/students/{student}/approve', [StudentController::class, 'approve']);
    Route::post('/students/{student}/reject', [StudentController::class, 'reject']);
    Route::post('/students/{student}/block', [StudentController::class, 'block']);
    Route::post('/students/{student}/unblock', [StudentController::class, 'unblock']);
    Route::post('/students/{student}/suspend', [StudentController::class, 'suspend']);
    Route::post('/students/{student}/reset-password', [StudentController::class, 'resetPassword']);

    Route::apiResource('books', BookController::class);
    Route::post('/books/{book}/restore', [BookController::class, 'restore']);

    Route::post('/book-copies', [BookCopyController::class, 'store']);
    Route::get('/book-copies', [BookCopyController::class, 'index']);
    Route::get('/book-copies/{bookCopy}', [BookCopyController::class, 'show']);
    Route::patch('/book-copies/{bookCopy}/status', [BookCopyController::class, 'updateStatus']);
    Route::post('/book-copies/print-barcodes', [BookCopyController::class, 'printBarcodes']);

    Route::post('/library-cards/generate', [LibraryCardController::class, 'generate']);
    Route::get('/students/{student}/library-card', [LibraryCardController::class, 'show']);
    Route::post('/students/{student}/library-card/reissue', [LibraryCardController::class, 'reissue']);
    Route::get('/students/{student}/library-card/print', [LibraryCardController::class, 'printCard']);

    Route::post('/loans/issue', [LoanController::class, 'issue']);
    Route::post('/loans/return', [LoanController::class, 'return']);
    Route::get('/loans', [LoanController::class, 'index']);
    Route::get('/loans/{loan}', [LoanController::class, 'show']);

    Route::get('/loans/due-soon', [LoanTrackingController::class, 'dueSoon']);
    Route::get('/loans/overdue', [LoanTrackingController::class, 'overdue']);
    Route::get('/loans-history', [LoanTrackingController::class, 'history']);
    Route::post('/loans/send-reminders', [LoanTrackingController::class, 'sendReminders']);

    Route::apiResource('academic-calendar', AcademicCalendarController::class);
    Route::post('/academic-calendar/upload', [AcademicCalendarController::class, 'upload']);

    Route::post('/notifications/send', [NotificationController::class, 'send']);
    Route::get('/notifications/history', [NotificationController::class, 'history']);
    Route::get('/students/{student}/notifications', [NotificationController::class, 'getStudentNotifications']);
    Route::post('/notifications/{notification}/read', [NotificationController::class, 'markAsRead']);
    Route::post('/notifications/mark-all-read', [NotificationController::class, 'markAllAsRead']);

    Route::get('/reports/issued-books', [ReportController::class, 'issuedBooks']);
    Route::get('/reports/returned-books', [ReportController::class, 'returnedBooks']);
    Route::get('/reports/overdue-list', [ReportController::class, 'overdueList']);
    Route::get('/reports/student-wise', [ReportController::class, 'studentWiseReport']);
    Route::get('/reports/book-wise', [ReportController::class, 'bookWiseReport']);
    Route::get('/reports/fine-collection', [ReportController::class, 'fineCollectionReport']);

    Route::get('/admins', [AdminController::class, 'listAdmins']);
    Route::post('/admins', [AdminController::class, 'createAdmin']);
    Route::patch('/admins/{user}/role', [AdminController::class, 'updateAdminRole']);
    Route::patch('/admins/{user}/toggle-status', [AdminController::class, 'toggleAdminStatus']);
    Route::get('/roles', [AdminController::class, 'listRoles']);
    Route::post('/roles', [AdminController::class, 'createRole']);
    Route::patch('/roles/{role}', [AdminController::class, 'updateRole']);
    Route::get('/settings', [AdminController::class, 'getSettings']);
    Route::post('/settings', [AdminController::class, 'updateSettings']);
});
