<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('book_copies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('book_id')->constrained('books')->onDelete('cascade');
            $table->string('copy_code')->unique();
            $table->string('barcode')->unique();
            $table->string('qr_code')->nullable();
            $table->enum('status', ['available', 'issued', 'lost', 'damaged'])->default('available');
            $table->timestamps();
            $table->index('book_id');
            $table->index('copy_code');
            $table->index('barcode');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('book_copies');
    }
};
