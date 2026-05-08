import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    description: String,
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

const categories = [
    { name: 'Peptides / Weight Management', slug: 'peptides-weight-management', description: 'GLP-1, GIP, and dual/triple agonists for weight loss and metabolic optimization' },
    { name: 'Growth Hormones', slug: 'growth-hormones', description: 'HGH, GHRH analogs, and GH secretagogues for growth, recovery, and anti-aging' },
    { name: 'Growth Factors', slug: 'growth-factors', description: 'IGF-1 variants and growth factor peptides for muscle development and tissue repair' },
    { name: 'Nootropics', slug: 'nootropics', description: 'Cognitive-enhancing peptides for mental clarity, focus, and neuroprotection' },
    { name: 'Cosmetic Peptides', slug: 'cosmetic-peptides', description: 'Peptides for skin rejuvenation, hair growth, and anti-aging aesthetics' },
    { name: 'Wellness & Recovery', slug: 'wellness-recovery', description: 'Peptides supporting sleep, stress management, and overall wellness' },
    { name: 'Anti-Aging Peptides', slug: 'anti-aging-peptides', description: 'Telomere-regulating and cellular longevity peptides' },
    { name: 'Metabolic Peptides', slug: 'metabolic-peptides', description: 'Mitochondrial and metabolic-regulating peptides for energy and endurance' },
    { name: 'Immune Support', slug: 'immune-support', description: 'Immune-modulating peptides for enhanced immune function' },
    { name: 'Supplies', slug: 'supplies', description: 'Reconstitution and dilution supplies' },
];

async function seedCategories() {
    try {
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            console.error('MONGODB_URI not found in .env.local');
            process.exit(1);
        }
        
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');

        for (const cat of categories) {
            await Category.findOneAndUpdate(
                { slug: cat.slug },
                { $set: cat },
                { upsert: true, new: true }
            );
            console.log(`✓ ${cat.name}`);
        }

        console.log(`\nTotal categories: ${await Category.countDocuments()}`);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

seedCategories();
