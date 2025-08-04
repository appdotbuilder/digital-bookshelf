<?php

namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create some sample books
        Book::create([
            'title' => 'The Great Gatsby',
            'author' => 'F. Scott Fitzgerald',
            'category' => 'Fiction',
            'description' => 'A classic American novel set in the summer of 1922, following the story of Jay Gatsby and his pursuit of the American Dream.',
            'google_drive_link' => 'https://drive.google.com/file/d/sample1/view',
        ]);

        Book::create([
            'title' => 'To Kill a Mockingbird',
            'author' => 'Harper Lee',
            'category' => 'Fiction',
            'description' => 'A novel about racial injustice and childhood innocence in the American South during the 1930s.',
            'google_drive_link' => 'https://drive.google.com/file/d/sample2/view',
        ]);

        Book::create([
            'title' => 'Dune',
            'author' => 'Frank Herbert',
            'category' => 'Science Fiction',
            'description' => 'An epic science fiction novel set on the desert planet Arrakis, following Paul Atreides and his journey to fulfill his destiny.',
            'google_drive_link' => 'https://drive.google.com/file/d/sample3/view',
        ]);

        Book::create([
            'title' => 'The Hobbit',
            'author' => 'J.R.R. Tolkien',
            'category' => 'Fantasy',
            'description' => 'A fantasy adventure following Bilbo Baggins on his unexpected journey to reclaim the lost Dwarf Kingdom of Erebor.',
            'google_drive_link' => 'https://drive.google.com/file/d/sample4/view',
        ]);

        Book::create([
            'title' => 'Sapiens',
            'author' => 'Yuval Noah Harari',
            'category' => 'Non-Fiction',
            'description' => 'A brief history of humankind, exploring how Homo sapiens came to dominate the planet.',
            'google_drive_link' => 'https://drive.google.com/file/d/sample5/view',
        ]);

        // Create additional random books
        Book::factory(15)->create();
    }
}