<?php

namespace App\Http\Controllers;

use App\Models\BookCopy;
use App\Models\Book;
use Illuminate\Http\Request;

class BookCopyController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'book_id' => 'required|exists:books,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $copies = [];
        for ($i = 0; $i < $validated['quantity']; $i++) {
            $copies[] = [
                'book_id' => $validated['book_id'],
                'copy_code' => 'CP-' . uniqid(),
                'barcode' => 'BC-' . uniqid(),
                'qr_code' => null,
                'status' => 'available',
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        BookCopy::insert($copies);

        return response()->json([
            'message' => 'Book copies added successfully',
            'count' => count($copies),
        ], 201);
    }

    public function index(Request $request)
    {
        $query = BookCopy::with('book');

        if ($request->has('book_id')) {
            $query->where('book_id', $request->book_id);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('barcode')) {
            $query->where('barcode', $request->barcode);
        }

        return response()->json($query->paginate(20));
    }

    public function show(BookCopy $bookCopy)
    {
        return response()->json($bookCopy->load('book', 'activeLoan'));
    }

    public function updateStatus(Request $request, BookCopy $bookCopy)
    {
        $validated = $request->validate([
            'status' => 'required|in:available,issued,lost,damaged',
        ]);

        $bookCopy->update($validated);

        return response()->json($bookCopy);
    }

    public function printBarcodes(Request $request)
    {
        $validated = $request->validate([
            'book_id' => 'required|exists:books,id',
        ]);

        $copies = BookCopy::where('book_id', $validated['book_id'])->get();

        return response()->json([
            'message' => 'Barcodes ready for printing',
            'copies' => $copies,
            'count' => $copies->count(),
        ]);
    }
}
