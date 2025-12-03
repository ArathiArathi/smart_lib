<?php

namespace App\Http\Controllers;

use App\Models\AcademicCalendarEvent;
use Illuminate\Http\Request;

class AcademicCalendarController extends Controller
{
    public function index(Request $request)
    {
        $query = AcademicCalendarEvent::query();

        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        if ($request->has('date')) {
            $query->whereDate('event_date', $request->date);
        }

        return response()->json($query->orderBy('event_date')->paginate(20));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'event_date' => 'required|date',
            'end_date' => 'nullable|date|after:event_date',
            'type' => 'required|in:holiday,exam,library_closed,event',
            'document_path' => 'nullable|string',
        ]);

        return response()->json(AcademicCalendarEvent::create($validated), 201);
    }

    public function show(AcademicCalendarEvent $event)
    {
        return response()->json($event);
    }

    public function update(Request $request, AcademicCalendarEvent $event)
    {
        $validated = $request->validate([
            'title' => 'string',
            'description' => 'nullable|string',
            'event_date' => 'date',
            'end_date' => 'nullable|date|after:event_date',
            'type' => 'in:holiday,exam,library_closed,event',
            'document_path' => 'nullable|string',
        ]);

        $event->update($validated);

        return response()->json($event);
    }

    public function destroy(AcademicCalendarEvent $event)
    {
        $event->delete();

        return response()->json(['message' => 'Event deleted successfully']);
    }

    public function upload(Request $request)
    {
        $validated = $request->validate([
            'file' => 'required|file|mimes:pdf,jpg,png,jpeg',
        ]);

        $path = $request->file('file')->store('academic-calendar');

        return response()->json([
            'message' => 'Calendar uploaded successfully',
            'path' => $path,
        ], 201);
    }
}
