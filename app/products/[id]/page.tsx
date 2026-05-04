import { Metadata } from 'next';
import ProductDetailContent from './ProductDetailContent';
import connectDB from '@/lib/db/mongodb';
import Product from '@/models/Product';

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    
    try {
        await connectDB();
        const product = await Product.findById(id).lean();
        
        if (!product) {
            return {
                title: 'Product Not Found | PeptideMint',
            };
        }

        const productImage = product.images?.[0] || '/thumbnail.png';
        
        return {
            title: `${product.name} | PeptideMint`,
            description: product.description?.slice(0, 160) || 'Shop high-quality peptides at PeptideMint',
            openGraph: {
                title: `${product.name} | PeptideMint`,
                description: product.description?.slice(0, 160) || 'Shop high-quality peptides at PeptideMint',
                images: [
                    {
                        url: productImage,
                        width: 1200,
                        height: 630,
                        alt: product.name,
                    },
                ],
                type: 'website',
            },
            twitter: {
                card: 'summary_large_image',
                title: `${product.name} | PeptideMint`,
                description: product.description?.slice(0, 160) || 'Shop high-quality peptides at PeptideMint',
                images: [productImage],
            },
        };
    } catch (error) {
        return {
            title: 'PeptideMint | Premium Peptides',
        };
    }
}

export default async function ProductDetailPage({ params }: Props) {
    const { id } = await params;
    return <ProductDetailContent id={id} />;
}