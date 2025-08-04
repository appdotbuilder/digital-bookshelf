import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { BookCard } from '@/components/book-card';
import { BookSearch } from '@/components/book-search';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus } from 'lucide-react';

interface Book {
    id: number;
    title: string;
    author: string;
    category: string;
    description: string;
    cover_image?: string;
    google_drive_link?: string;
}

interface BooksIndexProps {
    books: {
        data: Book[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        meta: {
            total: number;
            per_page: number;
            current_page: number;
        };
    };
    categories: string[];
    filters: {
        search: string;
        category: string;
    };
    [key: string]: unknown;
}

export default function BooksIndex({ books, categories, filters }: BooksIndexProps) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');

    return (
        <AppShell>
            <Head title="Books - Admin" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Book Management</h1>
                        <p className="text-gray-600">Manage your digital library collection</p>
                    </div>
                    <Link href="/books/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Book
                        </Button>
                    </Link>
                </div>

                {/* Search */}
                <BookSearch
                    search={searchTerm}
                    category={selectedCategory}
                    categories={categories}
                    onSearchChange={setSearchTerm}
                    onCategoryChange={setSelectedCategory}
                />

                {/* Results Info */}
                <div className="flex justify-between items-center">
                    <p className="text-gray-600">
                        {books.meta?.total || 0} books found
                        {(searchTerm || selectedCategory) && (
                            <span className="ml-2">
                                {searchTerm && `for "${searchTerm}"`}
                                {selectedCategory && ` in ${selectedCategory}`}
                            </span>
                        )}
                    </p>
                </div>

                {/* Books Grid */}
                {books.data && books.data.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {books.data.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                        <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No books found</h3>
                        <p className="text-gray-600 mb-4">
                            {searchTerm || selectedCategory
                                ? "Try adjusting your search criteria"
                                : "No books have been added to the library yet"
                            }
                        </p>
                        <Link href="/books/create">
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add First Book
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Pagination */}
                {books.links && books.links.length > 3 && (
                    <div className="flex justify-center">
                        <div className="flex space-x-2">
                            {books.links.map((link, index: number) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-3 py-2 rounded-md text-sm ${
                                        link.active
                                            ? 'bg-blue-600 text-white'
                                            : link.url
                                            ? 'bg-white text-gray-700 hover:bg-gray-100 border'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}