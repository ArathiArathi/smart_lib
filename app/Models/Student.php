<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'registration_number',
        'first_name',
        'last_name',
        'email',
        'phone',
        'department',
        'course',
        'semester',
        'is_approved',
        'is_blocked',
        'is_suspended',
        'photo_path',
    ];

    protected $casts = [
        'is_approved' => 'boolean',
        'is_blocked' => 'boolean',
        'is_suspended' => 'boolean',
    ];

    public function libraryCard()
    {
        return $this->hasOne(LibraryCard::class);
    }

    public function loans()
    {
        return $this->hasMany(Loan::class);
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function fines()
    {
        return $this->hasManyThrough(Fine::class, Loan::class);
    }
}
