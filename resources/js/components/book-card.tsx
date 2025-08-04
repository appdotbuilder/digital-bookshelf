import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ExternalLink, Book as BookIcon } from 'lucide-react';

interface Book {
    id: number;
    title: string;
    author: string;
    category: string;
    description: string;
    cover_image?: string;
    google_drive_link?: string;
}

interface BookCardProps {
    book: Book;
}

export function BookCard({ book }: BookCardProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleCoverClick = () => {
        setIsDialogOpen(true);
    };

    return (
        <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200">
            <div className="relative">
                <div 
                    className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg cursor-pointer flex items-center justify-center overflow-hidden"
                    onClick={handleCoverClick}
                >
                    {book.cover_image ? (
                        <img 
                            src={`/storage/${book.cover_image}`} 
                            alt={`${book.title} cover`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                        />
                    ) : (
                        <div className="text-center p-4">
                            <BookIcon className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600 font-medium">{book.title}</p>
                        </div>
                    )}
                </div>
                <Badge variant="secondary" className="absolute top-2 right-2">
                    {book.category}
                </Badge>
            </div>
            
            <CardContent className="flex-1 flex flex-col p-4">
                <h3 className="font-semibold text-lg mb-1 line-clamp-2">{book.title}</h3>
                <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
                <p className="text-gray-700 text-sm line-clamp-3 flex-1">{book.description}</p>
            </CardContent>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl">{book.title}</DialogTitle>
                    </DialogHeader>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center overflow-hidden">
                            {book.cover_image ? (
                                <img 
                                    src={`/storage/${book.cover_image}`} 
                                    alt={`${book.title} cover`}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="text-center p-4">
                                    <BookIcon className="w-20 h-20 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-600 font-medium">{book.title}</p>
                                </div>
                            )}
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-gray-900">Author</h4>
                                <p className="text-gray-700">{book.author}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">Category</h4>
                                <Badge variant="secondary">{book.category}</Badge>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">Description</h4>
                                <p className="text-gray-700 text-sm leading-relaxed">{book.description}</p>
                            </div>
                            {book.google_drive_link && (
                                <div className="pt-4">
                                    <Button asChild className="w-full">
                                        <a 
                                            href={book.google_drive_link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            Read Book
                                        </a>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </Card>
    );
}