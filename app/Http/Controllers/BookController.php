<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index(Request $request)
    {
        $query = Book::query();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where('title', 'like', "%$search%")
                ->orWhere('author', 'like', "%$search%")
                ->orWhere('isbn', 'like', "%$search%");
        }

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        if ($request->has('course')) {
            $query->where('course', $request->course);
        }

        if ($request->has('availability')) {
            if ($request->availability === 'available') {
                $query->whereHas('copies', function ($q) {
                    $q->where('status', 'available');
                });
            }
        }

        return response()->json($query->with('copies')->paginate(15));
    }

    public function show(Book $book)
    {
        return response()->json($book->load('copies'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'isbn' => 'required|unique:books',
            'title' => 'required|string',
            'author' => 'required|string',
            'edition' => 'nullable|string',
            'publisher' => 'nullable|string',
            'category' => 'required|string',
            'rack_location' => 'nullable|string',
            'shelf_location' => 'nullable|string',
            'course' => 'nullable|string',
            'semester' => 'nullable|string',
            'cover_image_path' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        return response()->json(Book::create($validated), 201);
    }

    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'title' => 'string',
            'author' => 'string',
            'edition' => 'nullable|string',
            'publisher' => 'nullable|string',
            'category' => 'string',
            'rack_location' => 'nullable|string',
            'shelf_location' => 'nullable|string',
            'course' => 'nullable|string',
            'semester' => 'nullable|string',
            'cover_image_path' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $book->update($validated);

        return response()->json($book);
    }

    public function destroy(Book $book)
    {
        $book->delete();

        return response()->json(['message' => 'Book archived successfully']);
    }

    public function restore(Book $book)
    {
        $book->restore();

        return response()->json(['message' => 'Book restored successfully']);
    }
}
