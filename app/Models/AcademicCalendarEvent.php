<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademicCalendarEvent extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'event_date',
        'end_date',
        'type',
        'document_path',
    ];

    protected $casts = [
        'event_date' => 'datetime',
        'end_date' => 'datetime',
    ];
}
