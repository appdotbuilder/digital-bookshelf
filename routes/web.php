<?php

use App\Http\Controllers\BookController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Public book browsing
Route::get('/', [BookController::class, 'index'])->name('home');

// Admin routes for book management
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // Book management routes
    Route::resource('books', BookController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
