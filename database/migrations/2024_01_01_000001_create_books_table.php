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
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('author');
            $table->string('category');
            $table->text('description');
            $table->string('cover_image')->nullable();
            $table->string('google_drive_link')->nullable();
            $table->timestamps();
            
            // Indexes for search functionality
            $table->index('title');
            $table->index('author');
            $table->index('category');
            $table->index(['category', 'title']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};