<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Book extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'isbn',
        'title',
        'author',
        'edition',
        'publisher',
        'category',
        'rack_location',
        'shelf_location',
        'course',
        'semester',
        'cover_image_path',
        'description',
    ];

    public function copies()
    {
        return $this->hasMany(BookCopy::class);
    }

    public function loans()
    {
        return $this->hasManyThrough(Loan::class, BookCopy::class);
    }

    public function getTotalCopieslAttribute()
    {
        return $this->copies()->count();
    }

    public function getAvailableCopiesAttribute()
    {
        return $this->copies()->where('status', 'available')->count();
    }
}
