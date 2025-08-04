<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Book::query();

        // Search functionality
        if ($request->has('search') && $request->search) {
            $query->search($request->search);
        }

        // Category filter
        if ($request->has('category') && $request->category) {
            $query->where('category', $request->category);
        }

        $books = $query->latest()->paginate(12);
        $categories = Book::distinct()->pluck('category')->sort();

        // Check if this is an admin route or public home page
        $isAdminRoute = $request->route()->getName() === 'books.index';
        
        if ($isAdminRoute) {
            // Admin view
            return Inertia::render('books/index', [
                'books' => $books,
                'categories' => $categories,
                'filters' => [
                    'search' => $request->search ?? '',
                    'category' => $request->category ?? '',
                ]
            ]);
        } else {
            // Public home page view
            return Inertia::render('welcome', [
                'books' => $books,
                'categories' => $categories,
                'filters' => [
                    'search' => $request->search ?? '',
                    'category' => $request->category ?? '',
                ]
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('books/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookRequest $request)
    {
        $validated = $request->validated();

        // Handle cover image upload
        if ($request->hasFile('cover_image')) {
            $validated['cover_image'] = $request->file('cover_image')->store('book-covers', 'public');
        }

        $book = Book::create($validated);

        return redirect()->route('books.show', $book)
            ->with('success', 'Book added successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        return Inertia::render('books/show', [
            'book' => $book
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book $book)
    {
        return Inertia::render('books/edit', [
            'book' => $book
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookRequest $request, Book $book)
    {
        $validated = $request->validated();

        // Handle cover image upload
        if ($request->hasFile('cover_image')) {
            // Delete old image if exists
            if ($book->cover_image) {
                Storage::disk('public')->delete($book->cover_image);
            }
            $validated['cover_image'] = $request->file('cover_image')->store('book-covers', 'public');
        }

        $book->update($validated);

        return redirect()->route('books.show', $book)
            ->with('success', 'Book updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        // Delete cover image if exists
        if ($book->cover_image) {
            Storage::disk('public')->delete($book->cover_image);
        }

        $book->delete();

        return redirect()->route('books.index')
            ->with('success', 'Book deleted successfully.');
    }
}