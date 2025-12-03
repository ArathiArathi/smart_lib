<?php

namespace App\Http\Controllers;

use App\Models\Loan;
use App\Models\BookCopy;
use App\Models\Student;
use App\Models\Fine;
use Illuminate\Http\Request;

class LoanController extends Controller
{
    public function issue(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'book_copy_id' => 'required|exists:book_copies,id',
        ]);

        $student = Student::find($validated['student_id']);
        $bookCopy = BookCopy::find($validated['book_copy_id']);

        if ($bookCopy->status !== 'available') {
            return response()->json(['message' => 'Book copy is not available'], 400);
        }

        if ($student->is_blocked || $student->is_suspended) {
            return response()->json(['message' => 'Student is blocked or suspended'], 400);
        }

        $loan = Loan::create([
            'student_id' => $student->id,
            'book_copy_id' => $bookCopy->id,
            'issued_by' => auth()->id(),
            'issued_at' => now(),
            'due_date' => now()->addDays(14),
            'status' => 'active',
        ]);

        $bookCopy->update(['status' => 'issued']);

        return response()->json([
            'message' => 'Book issued successfully',
            'loan' => $loan->load('student', 'bookCopy.book'),
        ], 201);
    }

    public function return(Request $request)
    {
        $validated = $request->validate([
            'book_copy_id' => 'required|exists:book_copies,id',
        ]);

        $bookCopy = BookCopy::find($validated['book_copy_id']);
        $loan = $bookCopy->activeLoan;

        if (!$loan) {
            return response()->json(['message' => 'No active loan found for this book copy'], 404);
        }

        $loan->update([
            'returned_at' => now(),
            'status' => 'returned',
        ]);

        $bookCopy->update(['status' => 'available']);

        if ($loan->is_overdue) {
            $daysOverdue = now()->diffInDays($loan->due_date);
            $fineAmount = $daysOverdue * 10;

            Fine::create([
                'loan_id' => $loan->id,
                'amount' => $fineAmount,
                'is_paid' => false,
            ]);
        }

        return response()->json([
            'message' => 'Book returned successfully',
            'loan' => $loan,
        ]);
    }

    public function index(Request $request)
    {
        $query = Loan::with('student', 'bookCopy.book');

        if ($request->has('student_id')) {
            $query->where('student_id', $request->student_id);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        return response()->json($query->paginate(20));
    }

    public function show(Loan $loan)
    {
        return response()->json($loan->load('student', 'bookCopy.book', 'fine'));
    }
}
