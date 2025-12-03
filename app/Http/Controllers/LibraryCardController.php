<?php

namespace App\Http\Controllers;

use App\Models\LibraryCard;
use App\Models\Student;
use Illuminate\Http\Request;

class LibraryCardController extends Controller
{
    public function generate(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
        ]);

        $student = Student::find($validated['student_id']);

        $card = LibraryCard::create([
            'student_id' => $student->id,
            'card_number' => 'LC-' . strtoupper(substr(md5(uniqid()), 0, 8)),
            'barcode' => 'BAR-' . uniqid(),
            'qr_code' => 'QR-' . uniqid(),
            'is_active' => true,
            'issued_at' => now(),
            'valid_until' => now()->addYear(),
        ]);

        return response()->json([
            'message' => 'Library card generated successfully',
            'card' => $card,
        ], 201);
    }

    public function show(Student $student)
    {
        $card = $student->libraryCard;

        if (!$card) {
            return response()->json(['message' => 'No library card found'], 404);
        }

        return response()->json($card);
    }

    public function reissue(Request $request, Student $student)
    {
        $oldCard = $student->libraryCard;

        if ($oldCard) {
            $oldCard->update(['is_active' => false]);
        }

        $newCard = LibraryCard::create([
            'student_id' => $student->id,
            'card_number' => 'LC-' . strtoupper(substr(md5(uniqid()), 0, 8)),
            'barcode' => 'BAR-' . uniqid(),
            'qr_code' => 'QR-' . uniqid(),
            'is_active' => true,
            'issued_at' => now(),
            'valid_until' => now()->addYear(),
        ]);

        return response()->json([
            'message' => 'Card reissued successfully',
            'card' => $newCard,
        ], 201);
    }

    public function printCard(Student $student)
    {
        $card = $student->libraryCard;

        if (!$card) {
            return response()->json(['message' => 'No library card found'], 404);
        }

        return response()->json([
            'message' => 'Card ready for printing',
            'card' => $card->load('student'),
        ]);
    }
}
