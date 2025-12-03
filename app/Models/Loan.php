<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Loan extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'book_copy_id',
        'issued_by',
        'issued_at',
        'due_date',
        'returned_at',
        'status',
    ];

    protected $casts = [
        'issued_at' => 'datetime',
        'due_date' => 'datetime',
        'returned_at' => 'datetime',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function bookCopy()
    {
        return $this->belongsTo(BookCopy::class);
    }

    public function issuedBy()
    {
        return $this->belongsTo(User::class, 'issued_by');
    }

    public function fine()
    {
        return $this->hasOne(Fine::class);
    }

    public function getIsOverdueAttribute()
    {
        return $this->status === 'active' && now() > $this->due_date;
    }

    public function getDaysUntilDueAttribute()
    {
        return $this->due_date->diffInDays(now());
    }
}
