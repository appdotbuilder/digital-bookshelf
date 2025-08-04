<?php

namespace Database\Factories;

use App\Models\Book;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Book>
     */
    protected $model = Book::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            'Fiction',
            'Non-Fiction',
            'Science Fiction',
            'Fantasy',
            'Mystery',
            'Romance',
            'Thriller',
            'Biography',
            'History',
            'Self-Help',
            'Technology',
            'Business'
        ];

        return [
            'title' => $this->faker->sentence(random_int(2, 5)),
            'author' => $this->faker->name(),
            'category' => $this->faker->randomElement($categories),
            'description' => $this->faker->paragraphs(3, true),
            'cover_image' => null,
            'google_drive_link' => $this->faker->optional(0.7)->url(),
        ];
    }
}