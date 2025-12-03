<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\BookCopy;
use App\Models\Loan;
use App\Models\Student;
use App\Models\Fine;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function metrics()
    {
        return response()->json([
            'total_students' => Student::count(),
            'pending_approvals' => Student::where('is_approved', false)->count(),
            'total_books' => Book::count(),
            'total_book_copies' => BookCopy::count(),
            'books_issued_today' => Loan::whereDate('issued_at', today())->count(),
            'books_due_soon' => Loan::where('status', 'active')
                ->whereBetween('due_date', [now(), now()->addDays(7)])
                ->count(),
            'overdue_books' => Loan::where('status', 'active')
                ->where('due_date', '<', now())
                ->count(),
            'available_copies' => BookCopy::where('status', 'available')->count(),
            'fine_collected' => Fine::where('is_paid', true)->sum('amount'),
        ]);
    }

    public function analytics()
    {
        $dailyIssuance = Loan::selectRaw('DATE(issued_at) as date, COUNT(*) as count')
            ->whereDate('issued_at', '>=', now()->subDays(30))
            ->groupBy('date')
            ->get();

        $monthlyBorrowing = Loan::selectRaw('MONTH(issued_at) as month, COUNT(*) as count')
            ->whereYear('issued_at', now()->year)
            ->groupBy('month')
            ->get();

        $categoryUsage = BookCopy::selectRaw('books.category, COUNT(*) as count')
            ->join('books', 'book_copies.book_id', '=', 'books.id')
            ->groupBy('books.category')
            ->orderByDesc('count')
            ->limit(10)
            ->get();

        return response()->json([
            'daily_issuance' => $dailyIssuance,
            'monthly_borrowing' => $monthlyBorrowing,
            'category_usage' => $categoryUsage,
        ]);
    }
}
