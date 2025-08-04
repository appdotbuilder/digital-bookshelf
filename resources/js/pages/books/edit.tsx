import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Upload, BookOpen } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface Book {
    id: number;
    title: string;
    author: string;
    category: string;
    description: string;
    cover_image?: string;
    google_drive_link?: string;
}

interface EditBookProps {
    book: Book;
    [key: string]: unknown;
}

export default function EditBook({ book }: EditBookProps) {
    const { data, setData, post, processing, errors } = useForm({
        title: book.title,
        author: book.author,
        category: book.category,
        description: book.description,
        cover_image: null as File | null,
        google_drive_link: book.google_drive_link || '',
        _method: 'PUT' as const,
    });

    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('cover_image', file);
            
            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/books/${book.id}`);
    };

    return (
        <AppShell>
            <Head title={`Edit ${book.title} - Admin`} />
            
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center space-x-4">
                    <Link href={`/books/${book.id}`}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Book
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Edit Book</h1>
                        <p className="text-gray-600">Update the book details</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
                    {/* Book Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <BookOpen className="mr-2 h-5 w-5" />
                                Book Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className={errors.title ? 'border-red-500' : ''}
                                />
                                {errors.title && (
                                    <p className="text-sm text-red-600 mt-1">{errors.title}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="author">Author *</Label>
                                <Input
                                    id="author"
                                    type="text"
                                    value={data.author}
                                    onChange={(e) => setData('author', e.target.value)}
                                    className={errors.author ? 'border-red-500' : ''}
                                />
                                {errors.author && (
                                    <p className="text-sm text-red-600 mt-1">{errors.author}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="category">Category *</Label>
                                <Input
                                    id="category"
                                    type="text"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    placeholder="e.g., Fiction, Science Fiction, Non-Fiction"
                                    className={errors.category ? 'border-red-500' : ''}
                                />
                                {errors.category && (
                                    <p className="text-sm text-red-600 mt-1">{errors.category}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="description">Description *</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={6}
                                    placeholder="Enter a detailed description of the book..."
                                    className={errors.description ? 'border-red-500' : ''}
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-600 mt-1">{errors.description}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="google_drive_link">Google Drive Link</Label>
                                <Input
                                    id="google_drive_link"
                                    type="url"
                                    value={data.google_drive_link}
                                    onChange={(e) => setData('google_drive_link', e.target.value)}
                                    placeholder="https://drive.google.com/file/d/..."
                                    className={errors.google_drive_link ? 'border-red-500' : ''}
                                />
                                {errors.google_drive_link && (
                                    <p className="text-sm text-red-600 mt-1">{errors.google_drive_link}</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Cover Image */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Upload className="mr-2 h-5 w-5" />
                                Cover Image
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="cover_image">Upload New Cover Image (Optional)</Label>
                                    <Input
                                        id="cover_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className={errors.cover_image ? 'border-red-500' : ''}
                                    />
                                    {errors.cover_image && (
                                        <p className="text-sm text-red-600 mt-1">{errors.cover_image}</p>
                                    )}
                                    <p className="text-sm text-gray-500 mt-1">
                                        Leave empty to keep current image. Accepted formats: JPEG, PNG, JPG, GIF (max 2MB)
                                    </p>
                                </div>

                                {/* Preview */}
                                <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center overflow-hidden">
                                    {previewImage ? (
                                        <img 
                                            src={previewImage} 
                                            alt="New cover preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : book.cover_image ? (
                                        <img 
                                            src={`/storage/${book.cover_image}`} 
                                            alt="Current cover"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="text-center p-4">
                                            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                                            <p className="text-gray-500 text-sm">No cover image</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit Buttons */}
                    <div className="md:col-span-2 flex justify-end space-x-4 pt-6 border-t">
                        <Link href={`/books/${book.id}`}>
                            <Button variant="outline">Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Updating Book...' : 'Update Book'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppShell>
    );
}