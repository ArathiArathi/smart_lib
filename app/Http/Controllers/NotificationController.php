<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Models\Student;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function send(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'nullable|exists:students,id',
            'student_ids' => 'nullable|array',
            'title' => 'required|string',
            'message' => 'required|string',
            'type' => 'required|in:alert,announcement,due_reminder,approval_update,fine_notice',
        ]);

        $students = collect();

        if ($validated['student_id'] ?? null) {
            $students = Student::where('id', $validated['student_id'])->get();
        } elseif ($validated['student_ids'] ?? null) {
            $students = Student::whereIn('id', $validated['student_ids'])->get();
        } else {
            $students = Student::all();
        }

        $notifications = [];
        foreach ($students as $student) {
            $notifications[] = [
                'student_id' => $student->id,
                'title' => $validated['title'],
                'message' => $validated['message'],
                'type' => $validated['type'],
                'is_read' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        Notification::insert($notifications);

        return response()->json([
            'message' => 'Notifications sent successfully',
            'count' => count($notifications),
        ], 201);
    }

    public function history(Request $request)
    {
        $query = Notification::query();

        if ($request->has('student_id')) {
            $query->where('student_id', $request->student_id);
        }

        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        if ($request->has('is_read')) {
            $query->where('is_read', $request->is_read);
        }

        return response()->json($query->orderByDesc('created_at')->paginate(20));
    }

    public function getStudentNotifications(Request $request)
    {
        $student = Student::find($request->student_id);

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        return response()->json($student->notifications()->orderByDesc('created_at')->paginate(20));
    }

    public function markAsRead(Notification $notification)
    {
        $notification->markAsRead();

        return response()->json(['message' => 'Notification marked as read']);
    }

    public function markAllAsRead(Request $request)
    {
        Notification::where('student_id', $request->student_id)
            ->where('is_read', false)
            ->update(['is_read' => true, 'read_at' => now()]);

        return response()->json(['message' => 'All notifications marked as read']);
    }
}
