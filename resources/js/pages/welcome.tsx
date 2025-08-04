import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { BookCard } from '@/components/book-card';
import { BookSearch } from '@/components/book-search';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Search, Shield, Library, Users, Plus } from 'lucide-react';

interface Book {
    id: number;
    title: string;
    author: string;
    category: string;
    description: string;
    cover_image?: string;
    google_drive_link?: string;
}

interface WelcomeProps {
    books?: {
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
    categories?: string[];
    filters?: {
        search: string;
        category: string;
    };
    auth?: {
        user?: {
            name: string;
            email: string;
        };
    };
    [key: string]: unknown;
}

export default function Welcome({ books, categories = [], filters = { search: '', category: '' }, auth }: WelcomeProps) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');

    // If no books data, show the landing page
    if (!books) {
        return (
            <>
                <Head title="Digital Bookshelf" />
                <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                    {/* Navigation */}
                    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-16">
                                <div className="flex items-center space-x-2">
                                    <BookOpen className="h-8 w-8 text-blue-600" />
                                    <h1 className="text-xl font-bold text-gray-900">Digital Bookshelf</h1>
                                </div>
                                <div className="flex items-center space-x-4">
                                    {auth?.user ? (
                                        <div className="flex items-center space-x-4">
                                            <span className="text-gray-700">Welcome, {auth.user.name}!</span>
                                            <Link href="/dashboard">
                                                <Button variant="outline">Dashboard</Button>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="flex items-center space-x-4">
                                            <Link href="/login">
                                                <Button variant="outline">Login</Button>
                                            </Link>
                                            <Link href="/register">
                                                <Button>Get Started</Button>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </nav>

                    {/* Hero Section */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <div className="text-center mb-16">
                            <div className="flex justify-center mb-6">
                                <div className="relative">
                                    <BookOpen className="h-20 w-20 text-blue-600" />
                                    <div className="absolute -top-2 -right-2 bg-purple-100 rounded-full p-2">
                                        <Library className="h-6 w-6 text-purple-600" />
                                    </div>
                                </div>
                            </div>
                            <h1 className="text-5xl font-bold text-gray-900 mb-6">
                                📚 Digital Bookshelf
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                                Discover and explore an amazing collection of books. Browse by category, search by author or title, 
                                and access your favorite reads through our integrated Google Drive library.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/books">
                                    <Button size="lg" className="text-lg px-8 py-3">
                                        <BookOpen className="mr-2 h-5 w-5" />
                                        Browse Books
                                    </Button>
                                </Link>
                                {!auth?.user && (
                                    <Link href="/register">
                                        <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                                            Join Our Library
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                                <CardContent className="pt-6">
                                    <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                        <Search className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">🔍 Smart Search</h3>
                                    <p className="text-gray-600">
                                        Find books instantly by title, author, or category with our powerful search functionality.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                                <CardContent className="pt-6">
                                    <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                        <Library className="h-8 w-8 text-green-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">📖 Vast Collection</h3>
                                    <p className="text-gray-600">
                                        Access hundreds of books across multiple genres, from fiction to technical manuals.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                                <CardContent className="pt-6">
                                    <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                        <Shield className="h-8 w-8 text-purple-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">☁️ Cloud Access</h3>
                                    <p className="text-gray-600">
                                        Read your books anywhere with direct links to our secure Google Drive storage.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Admin Features */}
                        {auth?.user && (
                            <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
                                <div className="text-center">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-4">⚡ Admin Features</h2>
                                    <p className="text-gray-600 mb-6">
                                        Manage your digital library with powerful admin tools
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-6 text-left">
                                        <div className="flex items-start space-x-3">
                                            <Plus className="h-6 w-6 text-blue-600 mt-1" />
                                            <div>
                                                <h4 className="font-semibold">Add New Books</h4>
                                                <p className="text-gray-600 text-sm">Upload covers, add descriptions, and link to Google Drive files</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <Users className="h-6 w-6 text-green-600 mt-1" />
                                            <div>
                                                <h4 className="font-semibold">Manage Collection</h4>
                                                <p className="text-gray-600 text-sm">Edit book details, categories, and organize your library</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Call to Action */}
                        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-12 text-white">
                            <h2 className="text-3xl font-bold mb-4">Ready to Start Reading? 📚</h2>
                            <p className="text-xl mb-8 opacity-90">
                                Join thousands of readers who have discovered their next favorite book
                            </p>
                            <Link href="/books">
                                <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                                    <BookOpen className="mr-2 h-5 w-5" />
                                    Explore Library Now
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // Show the bookshelf with books
    return (
        <>
            <Head title="Digital Bookshelf" />
            <div className="min-h-screen bg-gray-50">
                {/* Navigation */}
                <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-2">
                                <BookOpen className="h-8 w-8 text-blue-600" />
                                <h1 className="text-xl font-bold text-gray-900">Digital Bookshelf</h1>
                            </div>
                            <div className="flex items-center space-x-4">
                                {auth?.user ? (
                                    <div className="flex items-center space-x-4">
                                        <span className="text-gray-700">Welcome, {auth.user.name}!</span>
                                        <Link href="/dashboard">
                                            <Button variant="outline">Dashboard</Button>
                                        </Link>
                                        <Link href="/books/create">
                                            <Button>
                                                <Plus className="mr-2 h-4 w-4" />
                                                Add Book
                                            </Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-4">
                                        <Link href="/login">
                                            <Button variant="outline">Admin Login</Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            📚 Browse Our Digital Library
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Discover amazing books across all genres. Click on any book cover to read more and access the full text.
                        </p>
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
                    <div className="flex justify-between items-center mb-6">
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                            {books.data.map((book) => (
                                <BookCard key={book.id} book={book} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No books found</h3>
                            <p className="text-gray-600 mb-4">
                                {searchTerm || selectedCategory
                                    ? "Try adjusting your search criteria"
                                    : "No books have been added to the library yet"
                                }
                            </p>
                            {auth?.user && (
                                <Link href="/books/create">
                                    <Button>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add First Book
                                    </Button>
                                </Link>
                            )}
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
            </div>
        </>
    );
}