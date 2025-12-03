<?php

namespace App\Http\Controllers;

use App\Models\Loan;
use Illuminate\Http\Request;

class LoanTrackingController extends Controller
{
    public function dueSoon(Request $request)
    {
        $days = $request->get('days', 7);

        $loans = Loan::where('status', 'active')
            ->whereBetween('due_date', [now(), now()->addDays($days)])
            ->with('student', 'bookCopy.book')
            ->orderBy('due_date')
            ->get();

        return response()->json([
            'message' => "Books due within $days days",
            'count' => $loans->count(),
            'loans' => $loans,
        ]);
    }

    public function overdue(Request $request)
    {
        $loans = Loan::where('status', 'active')
            ->where('due_date', '<', now())
            ->with('student', 'bookCopy.book', 'fine')
            ->orderByDesc('due_date')
            ->paginate(20);

        return response()->json($loans);
    }

    public function history(Request $request)
    {
        $query = Loan::query();

        if ($request->has('student_id')) {
            $query->where('student_id', $request->student_id);
        }

        return response()->json($query->with('student', 'bookCopy.book')->paginate(20));
    }

    public function sendReminders(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:due_soon,overdue,individual',
            'loan_ids' => 'nullable|array',
            'days' => 'nullable|integer',
        ]);

        $loans = collect();

        if ($validated['type'] === 'due_soon') {
            $days = $validated['days'] ?? 7;
            $loans = Loan::where('status', 'active')
                ->whereBetween('due_date', [now(), now()->addDays($days)])
                ->get();
        } elseif ($validated['type'] === 'overdue') {
            $loans = Loan::where('status', 'active')
                ->where('due_date', '<', now())
                ->get();
        } elseif ($validated['type'] === 'individual' && $validated['loan_ids']) {
            $loans = Loan::whereIn('id', $validated['loan_ids'])->get();
        }

        foreach ($loans as $loan) {
            $loan->student->notify(
                new \Notification('Reminder', "Your book is due on {$loan->due_date->format('Y-m-d')}")
            );
        }

        return response()->json([
            'message' => 'Reminders sent successfully',
            'count' => $loans->count(),
        ]);
    }
}
