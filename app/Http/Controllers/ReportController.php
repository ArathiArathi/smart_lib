<?php

namespace App\Http\Controllers;

use App\Models\Loan;
use App\Models\Fine;
use App\Models\Book;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function issuedBooks(Request $request)
    {
        $startDate = $request->get('start_date', now()->subDays(30));
        $endDate = $request->get('end_date', now());

        $loans = Loan::whereBetween('issued_at', [$startDate, $endDate])
            ->with('student', 'bookCopy.book')
            ->get();

        $csv = "Student ID, Student Name, Book Title, ISBN, Issue Date, Due Date\n";
        foreach ($loans as $loan) {
            $csv .= "{$loan->student->registration_number}, {$loan->student->first_name} {$loan->student->last_name}, ";
            $csv .= "{$loan->bookCopy->book->title}, {$loan->bookCopy->book->isbn}, ";
            $csv .= "{$loan->issued_at->format('Y-m-d')}, {$loan->due_date->format('Y-m-d')}\n";
        }

        return response()->json([
            'message' => 'Issued books report',
            'total' => $loans->count(),
            'data' => $loans,
            'csv' => $csv,
        ]);
    }

    public function returnedBooks(Request $request)
    {
        $startDate = $request->get('start_date', now()->subDays(30));
        $endDate = $request->get('end_date', now());

        $loans = Loan::where('status', 'returned')
            ->whereBetween('returned_at', [$startDate, $endDate])
            ->with('student', 'bookCopy.book')
            ->get();

        return response()->json([
            'message' => 'Returned books report',
            'total' => $loans->count(),
            'data' => $loans,
        ]);
    }

    public function overdueList(Request $request)
    {
        $loans = Loan::where('status', 'active')
            ->where('due_date', '<', now())
            ->with('student', 'bookCopy.book', 'fine')
            ->get();

        return response()->json([
            'message' => 'Overdue books report',
            'total' => $loans->count(),
            'data' => $loans,
        ]);
    }

    public function studentWiseReport(Request $request)
    {
        $student = $request->get('student_id');

        $loans = Loan::where('student_id', $student)
            ->with('student', 'bookCopy.book', 'fine')
            ->get();

        return response()->json([
            'message' => 'Student-wise report',
            'total' => $loans->count(),
            'data' => $loans,
        ]);
    }

    public function bookWiseReport(Request $request)
    {
        $book = $request->get('book_id');

        $loans = Loan::whereHas('bookCopy', function ($q) use ($book) {
            $q->where('book_id', $book);
        })->with('student', 'bookCopy.book')->get();

        return response()->json([
            'message' => 'Book-wise report',
            'total' => $loans->count(),
            'data' => $loans,
        ]);
    }

    public function fineCollectionReport(Request $request)
    {
        $period = $request->get('period', 'monthly');
        $year = $request->get('year', now()->year);

        if ($period === 'monthly') {
            $fines = Fine::selectRaw('MONTH(created_at) as month, SUM(amount) as total_amount')
                ->where('is_paid', true)
                ->whereYear('created_at', $year)
                ->groupBy('month')
                ->get();
        } else {
            $quarter = $request->get('quarter');
            $fines = Fine::selectRaw('SUM(amount) as total_amount')
                ->where('is_paid', true)
                ->whereYear('created_at', $year);

            if ($quarter) {
                $fines = $fines->whereRaw('QUARTER(created_at) = ?', [$quarter]);
            }

            $fines = [$fines->first()];
        }

        return response()->json([
            'message' => 'Fine collection report',
            'period' => $period,
            'year' => $year,
            'data' => $fines,
        ]);
    }
}
