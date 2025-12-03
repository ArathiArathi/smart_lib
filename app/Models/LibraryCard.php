<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LibraryCard extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'card_number',
        'barcode',
        'qr_code',
        'photo_path',
        'is_active',
        'issued_at',
        'valid_until',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'issued_at' => 'datetime',
        'valid_until' => 'datetime',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
