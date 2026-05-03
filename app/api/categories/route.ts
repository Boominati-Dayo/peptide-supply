import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Category from '@/models/Category';
import Product from '@/models/Product';

export async function GET() {
    try {
        await connectDB();
        
        // Get categories from Category collection
        const savedCategories = await Category.find({}).sort({ name: 1 });
        
        // Get unique categories from products that aren't in Category collection
        const productCategories = await Product.distinct('category');
        const savedCategoryNames = savedCategories.map((c: any) => c.name);
        const unsavedCategories = productCategories.filter((cat: string) => !savedCategoryNames.includes(cat));
        
        // Combine both
        const allCategories = [
            ...savedCategories,
            ...unsavedCategories.map((name: string) => ({
                _id: `dynamic-${name}`,
                name,
                slug: name.toLowerCase().replace(/ /g, '-'),
                isDynamic: true
            }))
        ].sort((a: any, b: any) => a.name.localeCompare(b.name));
        
        return NextResponse.json(allCategories);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching categories' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { name, description } = await request.json();
        const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

        await connectDB();
        const category = await Category.create({ name, slug, description });
        return NextResponse.json(category, { status: 201 });
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({ message: 'Category already exists' }, { status: 400 });
        }
        return NextResponse.json({ message: 'Error creating category' }, { status: 500 });
    }
}