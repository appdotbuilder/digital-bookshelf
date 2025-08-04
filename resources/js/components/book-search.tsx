import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, X } from 'lucide-react';
import { router } from '@inertiajs/react';

interface BookSearchProps {
    search: string;
    category: string;
    categories: string[];
    onSearchChange: (value: string) => void;
    onCategoryChange: (value: string) => void;
}

export function BookSearch({ search, category, categories, onSearchChange, onCategoryChange }: BookSearchProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (category) params.append('category', category);
        
        router.get(`/?${params.toString()}`, {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleClear = () => {
        onSearchChange('');
        onCategoryChange('');
        router.get('/', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                    type="text"
                    placeholder="Search by title, author, or category..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10"
                />
            </div>
            
            <Select value={category} onValueChange={onCategoryChange}>
                <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                            {cat}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            
            <div className="flex gap-2">
                <Button type="submit" variant="default">
                    Search
                </Button>
                {(search || category) && (
                    <Button type="button" variant="outline" onClick={handleClear}>
                        <X className="w-4 h-4" />
                    </Button>
                )}
            </div>
        </form>
    );
}