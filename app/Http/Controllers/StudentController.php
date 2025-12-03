<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\LibraryCard;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        $query = Student::query();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where('first_name', 'like', "%$search%")
                ->orWhere('last_name', 'like', "%$search%")
                ->orWhere('registration_number', 'like', "%$search%")
                ->orWhere('email', 'like', "%$search%");
        }

        if ($request->has('department')) {
            $query->where('department', $request->department);
        }

        if ($request->has('course')) {
            $query->where('course', $request->course);
        }

        if ($request->has('semester')) {
            $query->where('semester', $request->semester);
        }

        if ($request->has('status')) {
            $status = $request->status;
            if ($status === 'approved') {
                $query->where('is_approved', true);
            } elseif ($status === 'pending') {
                $query->where('is_approved', false);
            } elseif ($status === 'blocked') {
                $query->where('is_blocked', true);
            }
        }

        return response()->json($query->paginate(15));
    }

    public function show(Student $student)
    {
        return response()->json($student->load('libraryCard', 'loans.bookCopy.book', 'notifications'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'registration_number' => 'required|unique:students',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email|unique:students',
            'phone' => 'nullable|string',
            'department' => 'required|string',
            'course' => 'required|string',
            'semester' => 'required|string',
            'photo_path' => 'nullable|string',
        ]);

        return response()->json(Student::create($validated), 201);
    }

    public function update(Request $request, Student $student)
    {
        $validated = $request->validate([
            'first_name' => 'string',
            'last_name' => 'string',
            'email' => 'email|unique:students,email,' . $student->id,
            'phone' => 'nullable|string',
            'department' => 'string',
            'course' => 'string',
            'semester' => 'string',
            'photo_path' => 'nullable|string',
        ]);

        $student->update($validated);

        return response()->json($student);
    }

    public function approve(Student $student)
    {
        $student->update(['is_approved' => true]);

        return response()->json(['message' => 'Student approved successfully']);
    }

    public function reject(Student $student)
    {
        $student->delete();

        return response()->json(['message' => 'Student rejected successfully']);
    }

    public function block(Student $student)
    {
        $student->update(['is_blocked' => true]);

        return response()->json(['message' => 'Student blocked successfully']);
    }

    public function unblock(Student $student)
    {
        $student->update(['is_blocked' => false]);

        return response()->json(['message' => 'Student unblocked successfully']);
    }

    public function suspend(Student $student)
    {
        $student->update(['is_suspended' => true]);

        return response()->json(['message' => 'Student suspended successfully']);
    }

    public function resetPassword(Request $request, Student $student)
    {
        $student->update(['password' => bcrypt($request->password)]);

        return response()->json(['message' => 'Password reset successfully']);
    }
}
