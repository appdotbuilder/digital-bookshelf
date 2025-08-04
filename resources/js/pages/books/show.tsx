import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Edit, ExternalLink, BookOpen, Trash2 } from 'lucide-react';
import { router } from '@inertiajs/react';

interface Book {
    id: number;
    title: string;
    author: string;
    category: string;
    description: string;
    cover_image?: string;
    google_drive_link?: string;
    created_at: string;
    updated_at: string;
}

interface BookShowProps {
    book: Book;
    [key: string]: unknown;
}

export default function BookShow({ book }: BookShowProps) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this book? This action cannot be undone.')) {
            router.delete(`/books/${book.id}`);
        }
    };

    return (
        <AppShell>
            <Head title={`${book.title} - Admin`} />
            
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/books">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Books
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{book.title}</h1>
                            <p className="text-gray-600">by {book.author}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Link href={`/books/${book.id}/edit`}>
                            <Button variant="outline">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                        </Link>
                        <Button variant="destructive" onClick={handleDelete}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </div>
                </div>

                {/* Book Details */}
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Cover Image */}
                    <div className="space-y-4">
                        <Card>
                            <CardContent className="p-6">
                                <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center overflow-hidden">
                                    {book.cover_image ? (
                                        <img 
                                            src={`/storage/${book.cover_image}`} 
                                            alt={`${book.title} cover`}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="text-center p-4">
                                            <BookOpen className="w-20 h-20 text-gray-400 mx-auto mb-2" />
                                            <p className="text-gray-500">No cover image</p>
                                        </div>
                                    )}
                                </div>
                                
                                {book.google_drive_link && (
                                    <div className="mt-4">
                                        <Button asChild className="w-full">
                                            <a 
                                                href={book.google_drive_link} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                Read Book
                                            </a>
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Book Information */}
                    <div className="md:col-span-2 space-y-6">
                        <Card>
                            <CardContent className="p-6 space-y-6">
                                {/* Basic Info */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">Title</h3>
                                        <p className="text-lg font-semibold text-gray-900">{book.title}</p>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">Author</h3>
                                        <p className="text-lg text-gray-900">{book.author}</p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-2">Category</h3>
                                    <Badge variant="secondary" className="text-sm">
                                        {book.category}
                                    </Badge>
                                </div>

                                {/* Description */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
                                    <div className="prose prose-sm max-w-none">
                                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                            {book.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Google Drive Link */}
                                {book.google_drive_link && (
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 mb-2">Google Drive Link</h3>
                                        <div className="flex items-center space-x-2">
                                            <code className="text-sm bg-gray-100 px-2 py-1 rounded flex-1 truncate">
                                                {book.google_drive_link}
                                            </code>
                                            <Button size="sm" variant="outline" asChild>
                                                <a 
                                                    href={book.google_drive_link} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* Metadata */}
                                <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">Added</h3>
                                        <p className="text-sm text-gray-700">
                                            {new Date(book.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">Last Updated</h3>
                                        <p className="text-sm text-gray-700">
                                            {new Date(book.updated_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}